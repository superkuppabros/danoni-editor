import { compact, fromPairs } from "lodash";
import { CustomKeyConfig } from "@/model/KeyConfig";
import { Timing } from "@/model/Timing";
import { KeyKind } from "@/model/KeyKind";
import { ScoreData } from "@/model/ScoreData";
import { frameToPagePosition } from "../helper/Calculator";
import { Speed, SpeedType } from "@/model/Speed";
import { PageScore } from "@/model/PageScore";

export class ScoreRevivalService {
  constructor(private keyConfig: CustomKeyConfig) {}

  private delimiter = "|";

  dosConvert(dosData: string): ScoreData | null {
    const regRes = /scoreNumber=(\d+)/.exec(dosData);
    const extractedScoreNumber: string = regRes ? regRes[1] : "1";
    const regExp = RegExp(extractedScoreNumber + "_", "g");

    const splitArray = compact(
      dosData.replace(regExp, "_").replace(/&/g, "|").replace(/\|es_/g, "|").replace(/\n/g, "").split(this.delimiter)
    );

    const rawDict: { [name: string]: string } = fromPairs(splitArray.map((elem) => elem.split("=")));
    try {
      const dict = this.fromOldCWToNewCW(rawDict);
      const keyKind: string = dict["keyKind"];
      const blankFrame: number = parseInt(dict["blankFrame"]) || 200;
      const labels: number[] = dict["label"]?.split(",").map((x: string) => parseInt(x)) ?? [1];
      const startNumbers: number[] = dict["startNumber"]?.split(",").map((x: string) => parseFloat(x)) ?? [0];
      const pageBlockNumbers: number[] =
        dict["pageBlockNumber"]?.split(",").map((x: string) => parseFloat(x)) ?? Array(labels.length).fill(8);
      const bpms: number[] = dict["bpm"]?.split(",").map((x: string) => parseFloat(x)) ?? [140];
      const scoreNumber: number = parseInt(dict["scoreNumber"]) || 1;
      const scorePrefix: string = dict["scorePrefix"] ?? "";

      const timings: Timing[] = labels.map((label, index) => ({
        label,
        startNum: startNumbers[index],
        bpm: bpms[index],
        pageBlockNum: pageBlockNumbers[index],
      }));
      const scoreData: ScoreData = {
        keyKind,
        blankFrame,
        timings,
        scoreNumber,
        scorePrefix,
        scores: [],
      };
      return this.calcScoreData(dict, timings, scoreData);
    } catch {
      return null;
    }
  }

  private calcScoreData = (dict: { [name: string]: string }, timings: Timing[], scoreData: ScoreData) => {
    const keyKind = scoreData.keyKind as KeyKind;
    const scoreNumber = scoreData.scoreNumber as number;
    const scorePrefix = scoreData.scorePrefix as string;

    const noteNames: string[] = this.keyConfig[keyKind].noteNames.map((v) => `${scorePrefix}${v}`);
    const freezeNames: string[] = this.keyConfig[keyKind].freezeNames.map((v) => `${scorePrefix}${v}`);
    const speedChangeNames: string[] = "speed_data" in dict ? ["speed_data", "boost_data"] : ["speed_change", "boost_data"];

    const [noteFrames, freezeFrames, speedChangeFrames]: number[][][] = [noteNames, freezeNames, speedChangeNames].map((names) =>
      names
        .map((keyNameWithNum: string) => keyNameWithNum.replace(scoreNumber.toString(), ""))
        .map((keyName: string) =>
          (dict[keyName] ?? "")
            .split(",")
            .filter((x) => x)
            .map((x: string) => Number(x))
        )
    );

    const maxFrame = Math.max(this.findMaxNumber(noteFrames), this.findMaxNumber(freezeFrames));
    const maxPage = frameToPagePosition(timings.slice(-1)[0], maxFrame, scoreData.blankFrame).page;
    const noteScores = this.makeScores(noteFrames, timings, scoreData, maxPage);
    const freezeScores = this.makeScores(freezeFrames, timings, scoreData, maxPage);

    const speedFrames = speedChangeFrames[0].filter((_, i) => i % 2 == 0);
    const speedValues = speedChangeFrames[0].filter((_, i) => i % 2 == 1);
    const boostFrames = speedChangeFrames[1].filter((_, i) => i % 2 == 0);
    const boostValues = speedChangeFrames[1].filter((_, i) => i % 2 == 1);

    const frameSpeeds: {
      frame: number;
      value: number;
      type: SpeedType;
    }[] = speedFrames
      .map((frame, i) => {
        return { frame, value: speedValues[i], type: "speed" as SpeedType };
      })
      .concat(
        boostFrames.map((frame, i) => {
          return { frame, value: boostValues[i], type: "boost" as SpeedType };
        })
      )
      .sort((a, b) => a.frame - b.frame);

    const speedsArr: Speed[][] = new Array(maxPage).fill([]).map(() => []);
    frameSpeeds.forEach((frameSpeed) => {
      const frame = frameSpeed.frame;
      const value = frameSpeed.value;
      const type = frameSpeed.type;
      const blankFrame = scoreData.blankFrame;
      let labelCounter = 0;
      while (labelCounter + 1 < timings.length && frame >= timings[labelCounter + 1].startNum + blankFrame) {
        labelCounter++;
      }
      const pagePosition = frameToPagePosition(timings[labelCounter], frame, blankFrame);
      const page = pagePosition.page;
      const position = pagePosition.position;
      if (page >= 1 && position >= 0) speedsArr[page - 1].push({ position, value, type });
    });

    const pageScores: PageScore[] = new Array(maxPage).fill({}).map((_, i) => {
      return {
        notes: noteScores[i],
        freezes: freezeScores[i],
        speeds: speedsArr[i],
      };
    });

    scoreData.scores = pageScores;
    return scoreData;
  };

  private findMaxNumber(frames: number[][]): number {
    return frames.reduce((acc, curr) => Math.max(acc, curr.slice(-1)[0] | 0), 0);
  }

  private makeScores(frames: number[][], timings: Timing[], scoreData: ScoreData, maxPage: number): number[][][] {
    const laneLen = frames.length;
    const blankFrame = scoreData.blankFrame;
    const arr: number[][][] = new Array(maxPage).fill([]).map(() => {
      return new Array(laneLen).fill([]).map(() => []);
    });

    frames.forEach((laneFrames, lane) => {
      let labelCounter = 0;
      laneFrames.forEach((frame) => {
        while (labelCounter + 1 < timings.length && frame >= timings[labelCounter + 1].startNum + blankFrame) {
          labelCounter++;
        }
        const pagePosition = frameToPagePosition(timings[labelCounter], frame, blankFrame);
        const page = pagePosition.page;
        const position = pagePosition.position;
        if (page >= 1 && position >= 0) arr[page - 1][lane].push(position);
      });
    });

    return arr;
  }

  private fromOldCWToNewCW(dict: { [name: string]: string }): {
    [name: string]: string;
  } {
    try {
      const difData: string[] = (dict["difData"] || dict["difStep"]).split(",");
      const firstNum: number[] = dict["first_num"].split(",").map((x: string) => Number(x));
      const habaNum: number[] = dict["haba_num"].split(",").map((x: string) => Number(x));
      const habaPageNum: number[] = dict["haba_page_num"].split(",").map((x: string) => Number(x));
      dict.keyKind = difData[0];
      dict.blankFrame = "200";
      let counter = 0; // ページの端数をカウント
      dict.label = habaPageNum
        .map((x) => x * 2 + 1)
        .map((x, i) => {
          if (i != 0 && habaPageNum[i] - habaPageNum[i - 1]) counter++;
          return Math.ceil(x + counter);
        })
        .join(",");
      dict.startNumber = firstNum.map((x) => x - 200).join(",");
      dict.bpm = habaNum.map((x) => 1800 / x).join(",");
      const dictKeys = Object.keys(dict).join(",");
      const regRes = /(\d+)_/.exec(dictKeys);
      dict.scoreNumber = regRes ? regRes[1] : "1";
      return dict;
    } catch {
      return dict;
    }
  }
}

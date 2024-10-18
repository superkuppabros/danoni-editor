import { cloneDeep, isEqual } from "lodash";
import { CustomKeyConfig } from "@/model/KeyConfig";
import { ScoreData } from "@/model/ScoreData";
import { CustomKeyKind } from "@/model/KeyKind";
import { PageScore, DefaultPageScore } from "@/model/PageScore";
import { quarterInterval } from "../EditorConstant";
import { Speed } from "@/model/Speed";
import { positionToFrame } from "../helper/Calculator";

export type FrameData = {
  notes: number[][];
  freezes: number[][];
  speeds: Speed[];
};

export type OutputData = {
  notes: number[][];
  freezes: number[][];
  speeds: Speed[];
  boosts: Speed[];
};

export class ScoreConvertService {
  private keyNum: number;
  private defaultPageScore: PageScore;
  constructor(private keyKind: CustomKeyKind, private keyConfig: CustomKeyConfig) {
    this.keyNum = keyConfig[this.keyKind].num;
    this.defaultPageScore = new DefaultPageScore(this.keyNum);
  }

  toFrameData(scoreData: ScoreData): FrameData[] {
    const initialPageScore = new DefaultPageScore(this.keyNum);
    const blankFrame = scoreData.blankFrame;
    const timings = scoreData.timings.sort((a, b) => a.label - b.label);
    const scores = scoreData.scores;

    let labelCounter = 0;
    const maxPageNum = scores.length + 1;
    const frameScores: PageScore[] = [];

    for (let pageNum = 1; pageNum < maxPageNum; pageNum++) {
      const pageScore = scores[pageNum - 1];
      if (pageScore === undefined) frameScores.push(initialPageScore);
      else {
        if (timings[labelCounter] && pageNum === timings[labelCounter].label) labelCounter++;
        const timing = timings[labelCounter - 1];
        const calculateFrame = (position: number) => Math.round(positionToFrame(timing, pageNum, position, blankFrame));

        const pageNoteFrames = pageScore.notes.map((notesArr) => notesArr.sort((a, b) => a - b).map(calculateFrame));
        const freezeNoteFrames = pageScore.freezes.map((freezesArr) => freezesArr.sort((a, b) => a - b).map(calculateFrame));
        const speedsNoteFrames = pageScore.speeds.map((speed) => {
          const newSpeed: Speed = cloneDeep(speed);
          newSpeed.position = calculateFrame(speed.position);
          return newSpeed;
        });
        frameScores.push({
          notes: pageNoteFrames,
          freezes: freezeNoteFrames,
          speeds: speedsNoteFrames,
        });
      }
    }
    return frameScores;
  }

  framesToOutputData(frameScores: FrameData[]) {
    const initialData = {
      notes: new Array(this.keyNum).fill([]).map(() => []),
      freezes: new Array(this.keyNum).fill([]).map(() => []),
      speeds: [],
      boosts: [],
    };

    const outputData: OutputData = frameScores.reduce((data: OutputData, currentPage) => {
      for (let i = 0; i < this.keyNum; i++) {
        data.notes[i] = data.notes[i].concat(currentPage.notes[i]);
        data.freezes[i] = data.freezes[i].concat(currentPage.freezes[i]);
      }
      data.speeds = data.speeds.concat(currentPage.speeds.filter((speed) => speed.type === "speed"));
      data.boosts = data.boosts.concat(currentPage.speeds.filter((speed) => speed.type === "boost"));
      return data;
    }, initialData);

    return outputData;
  }

  private makeEasySave(scoreData: ScoreData): string {
    const keyKind: string = scoreData.keyKind as string;
    const blankFrame: number = scoreData.blankFrame;
    const labels: number[] = scoreData.timings.map((timing) => timing.label);
    const startNumbers: number[] = scoreData.timings.map((timing) => timing.startNum);
    const bpms: number[] = scoreData.timings.map((timing) => timing.bpm);
    const scoreNumber = scoreData.scoreNumber || 1;
    const scorePrefix = scoreData.scorePrefix || "";

    const easySave =
      `|es_keyKind=${keyKind}` +
      `|es_blankFrame=${blankFrame}` +
      `|es_label=${labels.join(",")}` +
      `|es_startNumber=${startNumbers.join(",")}` +
      `|es_bpm=${bpms.join(",")}` +
      `|es_scoreNumber=${scoreNumber}` +
      `|es_scorePrefix=${scorePrefix}|`;

    return easySave;
  }

  convert(scoreData: ScoreData): string {
    const frameScores = this.toFrameData(scoreData);
    const data = this.framesToOutputData(frameScores);
    const prefix = scoreData.scorePrefix || "";
    const postfix = scoreData.scoreNumber !== 1 && scoreData.scoreNumber ? scoreData.scoreNumber.toString() : "";

    data.speeds.sort((a, b) => a.position - b.position);
    data.boosts.sort((a, b) => a.position - b.position);

    const noteStr = data.notes
      .reduce(
        (str, notesArr, laneNum) => `${str}${prefix}${this.keyConfig[this.keyKind].noteNames[laneNum]}=${notesArr.join(",")}|`,
        "|"
      )
      .replace(/_/g, `${postfix}_`);

    const freezeStr = data.freezes
      .reduce(
        (str, freezesArr, laneNum) =>
          `${str}${prefix}${this.keyConfig[this.keyKind].freezeNames[laneNum]}=${freezesArr.join(",")}|`,
        ""
      )
      .replace(/_/g, `${postfix}_`);

    const speedStr = ("speed_data=" + data.speeds.map((speed) => `${speed.position},${speed.value}`).join(",") + "|").replace(
      /_/g,
      `${postfix}_`
    );
    const boostStr = ("boost_data=" + data.boosts.map((speed) => `${speed.position},${speed.value}`).join(",") + "|").replace(
      /_/g,
      `${postfix}_`
    );

    const easySave = this.makeEasySave(scoreData);

    return `${noteStr + freezeStr}
|${speedStr + boostStr}
${easySave}
`;
  }

  cutLastDefault(scoreData: ScoreData): ScoreData {
    const len = scoreData.scores.length;
    const copiedScoreData = cloneDeep(scoreData);
    let i = len - 1;
    while (i >= 0) {
      if (isEqual(copiedScoreData.scores[i], this.defaultPageScore)) {
        copiedScoreData.scores.pop();
        i--;
      } else break;
    }
    return copiedScoreData;
  }

  // 四分譜面の作成・変換
  convertWithQuarters(scoreData: ScoreData): string {
    const quarterNotes: number[] = [];

    // Todo: 四分譜面を出力するページ数を変更できるようにする
    const pushQuartersPageNum = 20;

    let testPatternStr = JSON.parse(localStorage.getItem("testPattern") ?? "1");
    testPatternStr = typeof testPatternStr == "string" ? testPatternStr : "1";

    const newScoreData = this.cutLastDefault(cloneDeep(scoreData));
    const pageBlockNum = scoreData.timings.at(-1)?.pageBlockNum || 8;

    try {
      for (let i = 0; i < pushQuartersPageNum; i++) {
        const quartersPageScore: PageScore = new DefaultPageScore(this.keyNum);

        const testPattern = testPatternStr.split(",");
        const testPatternLength = testPattern.length;

        for (let j = 0; j < pageBlockNum; j++) {
          const lane = parseInt(testPattern[j % testPatternLength]) - 1;
          quartersPageScore.notes[lane].push(j * quarterInterval);
        }
        newScoreData.scores.push(quartersPageScore);
      }
    } catch (e) {
      console.log(e);
      alert("パターンが不適切なためデフォルトのテストデータを出力します。");

      const pushQuartersLane = 0;
      for (let i = 0; i < pushQuartersPageNum; i++) {
        const quartersPageScore: PageScore = new DefaultPageScore(this.keyNum);
        quartersPageScore.notes[pushQuartersLane] = quarterNotes;
        newScoreData.scores.push(quartersPageScore);
      }
    }

    return this.convert(this.cutLastDefault(newScoreData));
  }

  save(scoreData: ScoreData): string {
    return JSON.stringify(this.cutLastDefault(scoreData));
  }
}

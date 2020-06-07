import _ from "lodash";
import { KeyConfig } from "@/model/KeyConfig";
import { ScoreData } from "@/model/ScoreData";
import { KeyKind } from "@/model/KeyKind";
import { PageScore, DefaultPageScore } from "@/model/PageScore";
import { quarterInterval, verticalSizeNum, fps } from "./EditorConstant";
import { Speed } from "@/model/Speed";

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

export class ScoreConverter {
  constructor(private keyKind: KeyKind, private keyConfig: KeyConfig) {}

  private keyNum = this.keyConfig[this.keyKind].num;
  private defaultPageScore = new DefaultPageScore(this.keyNum);

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
        if (timings[labelCounter] && pageNum === timings[labelCounter].label)
          labelCounter++;
        const timing = timings[labelCounter - 1];
        const framePerPosition = (60 * fps) / quarterInterval / timing.bpm;
        const startFrame =
          blankFrame +
          timing.startNum +
          (pageNum - timing.label) * verticalSizeNum * framePerPosition;
        const positionToFrame = (position: number) =>
          Math.round(startFrame + position * framePerPosition);

        const pageNoteFrames = pageScore.notes.map(notesArr =>
          notesArr.map(positionToFrame)
        );
        const freezeNoteFrames = pageScore.freezes.map(freezesArr =>
          freezesArr.map(positionToFrame)
        );
        const speedsNoteFrames = pageScore.speeds.map(speed => {
          const newSpeed: Speed = _.cloneDeep(speed);
          newSpeed.position = positionToFrame(speed.position);
          return newSpeed;
        });
        frameScores.push({
          notes: pageNoteFrames,
          freezes: freezeNoteFrames,
          speeds: speedsNoteFrames
        });
      }
    }
    return frameScores;
  }

  convert(scoreData: ScoreData): string {
    const frameScores = this.toFrameData(scoreData);
    const initialData = {
      notes: new Array(this.keyNum).fill([]).map(() => []),
      freezes: new Array(this.keyNum).fill([]).map(() => []),
      speeds: [],
      boosts: []
    };

    const data: OutputData = frameScores.reduce(
      (data: OutputData, currentPage) => {
        for (let i = 0; i < this.keyNum; i++) {
          data.notes[i] = data.notes[i].concat(currentPage.notes[i]);
          data.freezes[i] = data.freezes[i].concat(currentPage.freezes[i]);
        }
        data.speeds = data.speeds.concat(
          currentPage.speeds.filter(speed => speed.type === "speed")
        );
        data.boosts = data.boosts.concat(
          currentPage.speeds.filter(speed => speed.type === "boost")
        );
        return data;
      },
      initialData
    );

    data.speeds.sort((a, b) => a.position - b.position);
    data.boosts.sort((a, b) => a.position - b.position);

    const noteStr = data.notes.reduce(
      (str, notesArr, laneNum) =>
        str +
        this.keyConfig[this.keyKind].noteNames[laneNum] +
        "=" +
        notesArr.join(",") +
        "|",
      "|"
    );

    const freezeStr = data.freezes.reduce(
      (str, freezesArr, laneNum) =>
        str +
        this.keyConfig[this.keyKind].freezeNames[laneNum] +
        "=" +
        freezesArr.join(",") +
        "|",
      ""
    );

    const speedStr =
      "speed_data=" +
      data.speeds.map(speed => `${speed.position},${speed.value}`).join(",") +
      "|";
    const boostStr =
      "boost_data=" +
      data.boosts.map(speed => `${speed.position},${speed.value}`).join(",") +
      "|";

    return `
${noteStr + freezeStr}
|${speedStr + boostStr}`;
  }

  cutLastDefault(scoreData: ScoreData): ScoreData {
    const len = scoreData.scores.length;
    const copiedScoreData = _.cloneDeep(scoreData);
    let i = len - 1;
    while (i >= 0) {
      if (_.isEqual(copiedScoreData.scores[i], this.defaultPageScore)) {
        copiedScoreData.scores.pop();
        i--;
      } else break;
    }
    return copiedScoreData;
  }

  convertWithQuarters(scoreData: ScoreData): string {
    const quarterNotes: number[] = [];
    for (let i = 0; i < 8; i++) {
      quarterNotes.push(i * quarterInterval);
    }

    // Todo: 四分譜面を出力するページ数を変更できるようにする
    const pushQuartersPageNum = 20;

    // Todo: ノーツを置く位置を変更できるようにする
    const pushQuartersLane = 0;

    const newScoreData = this.cutLastDefault(_.cloneDeep(scoreData));

    for (let i = 0; i < pushQuartersPageNum; i++) {
      const quartersPageScore: PageScore = new DefaultPageScore(this.keyNum);
      quartersPageScore.notes[pushQuartersLane] = quarterNotes;
      newScoreData.scores.push(quartersPageScore);
    }

    return this.convert(this.cutLastDefault(newScoreData));
  }

  save(scoreData: ScoreData): string {
    return JSON.stringify(this.cutLastDefault(scoreData));
  }
}

import { KeyConfig } from "@/model/KeyConfig";
import { ScoreData } from "@/model/ScoreData";
import { KeyKind } from "@/model/KeyKind";
import { PageScore } from "@/model/PageScore";
import { quarterInterval, verticalSizeNum } from "./EditorConstant";

type FrameData = {
  notes: number[][];
  freezes: number[][];
};

export class ScoreConverter {
  constructor(private keyKind: KeyKind, private keyConfig: KeyConfig) {}

  keyNum = this.keyConfig[this.keyKind].num;

  private toFrameData(scoreData: ScoreData): PageScore[] {
    const initialPageScore = {
      notes: new Array(this.keyNum).fill([]).map(() => []),
      freezes: new Array(this.keyNum).fill([]).map(() => []),
    };
    const timings = scoreData.timings.sort((a, b) => a.label - b.label);
    const scores = scoreData.scores;

    let labelCounter = 0;
    const maxPageNum = scores.length + 1;
    const frameScores: PageScore[] = [];

    for (let pageNum = 1; pageNum < maxPageNum; pageNum++) {
      const pageScore = scores[pageNum - 1];
      if (pageScore === undefined) frameScores.push(initialPageScore);
      else {
        if (timings[labelCounter] && pageNum + 1 === timings[labelCounter].label) labelCounter++;
        const timing = timings[labelCounter - 1];
        const fps = 60;
        const framePerPosition = (60 * fps) / quarterInterval / timing.bpm;
        const startFrame =
          timing.firstNum + (pageNum + 1 - timing.label) * verticalSizeNum * framePerPosition;

        const pageNoteFrames = pageScore.notes.map((notesArr) =>
          notesArr.map((position) => Math.round(startFrame + position * framePerPosition))
        );
        const freezeNoteFrames = pageScore.freezes.map((freezesArr) =>
          freezesArr.map((position) => Math.round(startFrame + position * framePerPosition))
        );
        frameScores.push({
          notes: pageNoteFrames,
          freezes: freezeNoteFrames,
        });
      }
    }
    return frameScores;
  }

  convert(scoreData: ScoreData) {
    const frameScores = this.toFrameData(scoreData);
    const length = frameScores.length;
    const initialData = {
      notes: new Array(this.keyNum).fill([]).map(() => []),
      freezes: new Array(this.keyNum).fill([]).map(() => []),
    };

    const data: FrameData = frameScores.reduce((data: FrameData, currentPage) => {
      for (let i = 0; i < length; i++) {
        data.notes.concat(currentPage.notes);
        data.freezes.concat(currentPage.freezes);
      }
      return data;
    }, initialData);

    const noteStr = data.notes.reduce(
      (str, notesArr) =>
        str + this.keyConfig[this.keyKind].noteNames + "=" + notesArr.join(",") + "|",
      "|"
    );

    const dataStr = data.freezes.reduce(
      (str, freezesArr) =>
        str + this.keyConfig[this.keyKind].freezeNames + "=" + freezesArr.join(",") + "|",
      noteStr
    );

    //Todo: 速度変化なんとかする
    //Todo: クリップボードにコピーする
    console.log(dataStr)

  }
}

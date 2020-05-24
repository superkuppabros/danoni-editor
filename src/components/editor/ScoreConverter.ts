import { KeyConfig } from "@/model/KeyConfig";
import { ScoreData } from "@/model/ScoreData";
import { KeyKind } from "@/model/KeyKind";
import { PageScore } from "@/model/PageScore";
import { quarterInterval, verticalSizeNum } from "./EditorConstant";

export type FrameData = {
  notes: number[][];
  freezes: number[][];
};

export class ScoreConverter {
  constructor(private keyKind: KeyKind, private keyConfig: KeyConfig) {}

  private keyNum = this.keyConfig[this.keyKind].num;

  toFrameData(scoreData: ScoreData): FrameData[] {
    const initialPageScore = {
      notes: new Array(this.keyNum).fill([]).map(() => []),
      freezes: new Array(this.keyNum).fill([]).map(() => [])
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
        if (timings[labelCounter] && pageNum === timings[labelCounter].label)
          labelCounter++;
        const timing = timings[labelCounter - 1];
        const fps = 60;
        const framePerPosition = (60 * fps) / quarterInterval / timing.bpm;
        const startFrame =
          timing.firstNum +
          (pageNum - timing.label) * verticalSizeNum * framePerPosition;

        const pageNoteFrames = pageScore.notes.map(notesArr =>
          notesArr.map(position =>
            Math.round(startFrame + position * framePerPosition)
          )
        );
        const freezeNoteFrames = pageScore.freezes.map(freezesArr =>
          freezesArr.map(position =>
            Math.round(startFrame + position * framePerPosition)
          )
        );
        frameScores.push({
          notes: pageNoteFrames,
          freezes: freezeNoteFrames
        });
      }
    }
    return frameScores;
  }

  convert(scoreData: ScoreData): string {
    const frameScores = this.toFrameData(scoreData);
    const initialData = {
      notes: new Array(this.keyNum).fill([]).map(() => []),
      freezes: new Array(this.keyNum).fill([]).map(() => [])
    };

    const data: FrameData = frameScores.reduce(
      (data: FrameData, currentPage) => {
        for (let i = 0; i < this.keyNum; i++) {
          data.notes[i] = data.notes[i].concat(currentPage.notes[i]);
          data.freezes[i] = data.freezes[i].concat(currentPage.freezes[i]);
        }
        return data;
      },
      initialData
    );

    const noteStr = data.notes.reduce(
      (str, notesArr, laneNum) =>
        str +
        this.keyConfig[this.keyKind].noteNames[laneNum] +
        "=" +
        notesArr.join(",") +
        "|",
      "|"
    );

    const dataStr = data.freezes.reduce(
      (str, freezesArr, laneNum) =>
        str +
        this.keyConfig[this.keyKind].freezeNames[laneNum] +
        "=" +
        freezesArr.join(",") +
        "|",
      noteStr
    );

    //Todo: 速度変化なんとかする
    console.log(dataStr);
    return dataStr;
  }
}

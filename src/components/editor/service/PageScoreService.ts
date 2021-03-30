import { PageScore, DefaultPageScore } from "@/model/PageScore";
import { ScoreData } from "@/model/ScoreData";
import { cloneDeep } from "lodash";

export class PageScoreService {
  constructor(
    private scoreData: ScoreData,
    private copyScoreStore: PageScore,
    private keyNum: number,
    private displayPageScore: (page: number) => void
  ) {}

  // ページコピー
  copy(page: number) {
    const pageScore = cloneDeep(this.scoreData.scores[page - 1]);
    this.copyScoreStore = pageScore;
  }

  // ページカット
  cut(page: number) {
    this.copy(page);
    this.scoreData.scores.splice(
      page - 1,
      1,
      new DefaultPageScore(this.keyNum)
    );
    this.displayPageScore(page);
  }

  // ページ貼り付け
  paste(page: number) {
    const pageScore = cloneDeep(this.copyScoreStore);
    this.scoreData.scores.splice(page - 1, 1, pageScore);
    this.displayPageScore(page);
  }

  // ページ追加
  add(page: number) {
    const pageScore = cloneDeep(this.copyScoreStore);
    this.scoreData.scores.splice(page - 1, 0, pageScore);

    const timings = this.scoreData.timings;
    this.scoreData.timings = timings.map(timing => {
      if (timing.label > page) timing.label++;
      return timing;
    });

    this.displayPageScore(page);
  }

  // ページ削除
  delete(page: number) {
    this.copy(page);
    this.scoreData.scores.splice(page - 1, 1);

    const timings = this.scoreData.timings;
    this.scoreData.timings = timings.map(timing => {
      if (timing.label > page) timing.label--;
      return timing;
    });
    this.displayPageScore(page);
  }
}

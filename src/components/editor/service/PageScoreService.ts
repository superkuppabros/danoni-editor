import { PageScore, DefaultPageScore } from "@/model/PageScore";
import { ScoreData } from "@/model/ScoreData";
import _ from "lodash";

export class PageScoreService {
  constructor(
    private scoreData: ScoreData,
    private copyScoreStore: PageScore,
    private keyNum: number,
    private displayPageScore: (page: number) => void
  ) {}

  // ページコピー
  copy(page: number) {
    const pageScore = _.cloneDeep(this.scoreData.scores[page - 1]);
    this.copyScoreStore = pageScore;
  }

  // ページカット
  cut(page: number) {
    this.copy(page);
    this.scoreData.scores[page - 1] = new DefaultPageScore(this.keyNum);
    this.displayPageScore(page);
  }

  // ページ貼り付け
  paste(page: number) {
    const pageScore = _.cloneDeep(this.copyScoreStore);
    this.scoreData.scores[page - 1] = pageScore;
    this.displayPageScore(page);
  }
}
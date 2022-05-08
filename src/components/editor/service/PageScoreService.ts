import { Operation } from "@/model/OperationQueue";
import { PageScore, DefaultPageScore } from "@/model/PageScore";
import { ScoreData } from "@/model/ScoreData";
import { cloneDeep } from "lodash";

export class PageScoreService {
  constructor(
    private scoreData: ScoreData,
    private copyScoreStore: PageScore,
    private keyNum: number,
    private displayPageScore: (page: number) => void,
    private operationStack: Operation[]
  ) {}

  private stackPush(operation: Operation): void {
    const maxStackSize = 1000;
    this.operationStack.push(operation);
    if (this.operationStack.length > maxStackSize) this.operationStack.shift();
  }

  // ページコピー
  copy(page: number) {
    const pageScore = cloneDeep(this.scoreData.scores[page - 1]);
    this.copyScoreStore = pageScore;
  }

  // ページクリア
  clear(page: number) {
    this.scoreData.scores.splice(page - 1, 1, new DefaultPageScore(this.keyNum));
    this.displayPageScore(page);
  }

  // ページカット
  cut(page: number) {
    this.copy(page);
    this.clear(page);

    const copyScoreStore = cloneDeep(this.copyScoreStore);
    this.stackPush({
      type: "CUT",
      page,
      copyScoreStore,
    });
  }

  // ページにノーツを転写する
  write(page: number, pageScore: PageScore) {
    this.scoreData.scores.splice(page - 1, 1, pageScore);
    this.displayPageScore(page);
  }

  // ページ貼り付け
  paste(page: number, pageScore = cloneDeep(this.copyScoreStore)) {
    const originalPageScore = cloneDeep(this.scoreData.scores[page - 1]);
    this.write(page, pageScore);
    this.stackPush({
      type: "PASTE",
      page,
      originalPageScore,
    });
  }

  // ページ追加(操作のみ)
  insert(page: number, pageScore: PageScore) {
    this.scoreData.scores.splice(page - 1, 0, pageScore);

    const timings = this.scoreData.timings;
    this.scoreData.timings = timings.map((timing) => {
      if (timing.label > page) timing.label++;
      return timing;
    });

    this.displayPageScore(page);
  }

  // ページ追加
  add(page: number, pageScore = cloneDeep(this.copyScoreStore)) {
    this.insert(page, pageScore);
    this.stackPush({
      type: "ADD_PAGE",
      page,
    });
  }

  // ページ削除(操作のみ)
  remove(page: number) {
    this.scoreData.scores.splice(page - 1, 1);

    const timings = this.scoreData.timings;
    this.scoreData.timings = timings.map((timing) => {
      if (timing.label > page) timing.label--;
      return timing;
    });
    this.displayPageScore(page);
  }

  // ページ削除
  delete(page: number) {
    this.copy(page);
    this.remove(page);

    const copyScoreStore = cloneDeep(this.copyScoreStore);
    this.stackPush({
      type: "REMOVE_PAGE",
      page,
      copyScoreStore,
    });
  }
}

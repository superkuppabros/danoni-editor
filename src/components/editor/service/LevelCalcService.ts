/**
 * レベル計算ツール
 * cf.) https://github.com/cwtickle/danoniplus/blob/v15.1.3/js/danoni_main.js#L1400-L1594
 */

import _ from "lodash";

export type FlattenData = {
  allScorebook: number[];
  frzStartData: number[];
  frzEndData: number[];
};

export type AdjustValue = {
  single: number;
  double: number;
  overTriple: number;
  laneContinuous: number;
};

export class LevelCalcService {
  // データの準備
  calcFlattenData(
    noteFrames: number[][],
    freezeFrames: number[][]
  ): FlattenData {
    const flattenData: FlattenData = {
      allScorebook: [],
      frzStartData: [],
      frzEndData: []
    };

    freezeFrames.forEach(laneFreezes => {
      flattenData.frzStartData = flattenData.frzStartData.concat(
        laneFreezes.filter((value, index) => index % 2 == 0)
      );
      flattenData.frzEndData = flattenData.frzEndData.concat(
        laneFreezes.filter((value, index) => index % 2 == 1)
      );
    });

    flattenData.frzStartData.sort();
    flattenData.frzEndData.sort();
    flattenData.allScorebook = _.flattenDeep(
      noteFrames.concat(flattenData.frzStartData)
    ).sort();

    return flattenData;
  }

  // 縦連補正の計算
  calcLaneContinuous(noteFrames: number[][], freezeFrames: number[][]): number {
    const keyNum = noteFrames.length;
    let laneContinuous = 0;
    for (let i = 0; i < keyNum; i++) {
      const frames = noteFrames[i]
        .concat(freezeFrames[i].filter((_value, index) => index % 2 == 0))
        .sort();
      laneContinuous += frames.reduce((acc, value, index) => {
        const continuousFrame = 10; // 縦連補正のフレーム範囲
        const diff = index !== 0 ? value - frames[index - 1] : continuousFrame;
        const adj =
          diff < continuousFrame
            ? continuousFrame / diff ** 2 - 1 / continuousFrame
            : 0;
        return acc + adj;
      }, 0);
    }
    return laneContinuous;
  }

  // 補正値の計算
  calcAdjustValue(flattenData: FlattenData): AdjustValue {
    const data = _.cloneDeep(flattenData);
    const allScorebook = data.allScorebook;
    const frzStartData = data.frzStartData;
    const frzEndData = data.frzEndData;

    allScorebook.unshift(allScorebook[0] - 100);
    allScorebook.push(allScorebook[allScorebook.length - 1] + 100);
    let currentFrzNum = 0;
    const uniqueScorebook = _.uniq(allScorebook);
    const adjustValue: AdjustValue = {
      single: 0,
      double: 0,
      overTriple: 0,
      laneContinuous: 0
    };

    uniqueScorebook.forEach((frame, index) => {
      const decreaseFrzNum = frzEndData.filter(f => f < frame).length;
      currentFrzNum -= decreaseFrzNum;
      frzEndData.splice(0, decreaseFrzNum);

      // 3押し以上でも同時押し補正や単体上昇は存在する

      if (index !== uniqueScorebook.length - 1 && index !== 0) {
        const hitsNum = allScorebook.filter(f => f === frame).length;
        if (hitsNum + currentFrzNum > 2)
          adjustValue.overTriple += Math.min(
            hitsNum,
            hitsNum + currentFrzNum - 2
          );
        if (hitsNum >= 2 && currentFrzNum === 0) {
          const doubleAdj =
            40 /
            ((frame - uniqueScorebook[index - 1]) *
              (uniqueScorebook[index + 1] - frame));
          adjustValue.double += doubleAdj;
        }
        if (currentFrzNum < 2) {
          const singleAdj =
            2 / ((2 - currentFrzNum) * (uniqueScorebook[index + 1] - frame));
          adjustValue.single += singleAdj;
        }
      }

      const increaseFrzNum = frzStartData.filter(f => f === frame).length;
      currentFrzNum += increaseFrzNum;
      frzStartData.splice(0, increaseFrzNum);
    });
    return adjustValue;
  }

  calcLevel(noteFrames: number[][], freezeFrames: number[][]) {
    const flattenData = this.calcFlattenData(noteFrames, freezeFrames);
    const laneContinuous = this.calcLaneContinuous(noteFrames, freezeFrames);
    const adjustValue = this.calcAdjustValue(flattenData);
    adjustValue.laneContinuous = laneContinuous;

    const totalNotes = flattenData.allScorebook.length;
    if (totalNotes === 1) return 0.01;
    else {
      const adjFunc = (adj: number) =>
        (adj / Math.sqrt(totalNotes - 1 - adjustValue.overTriple)) * 4;
      const totalAdj = adjFunc(
        adjustValue.single + adjustValue.double + adjustValue.laneContinuous
      );
      adjustValue.single = adjFunc(adjustValue.single);
      adjustValue.double = adjFunc(adjustValue.double);
      adjustValue.laneContinuous = adjFunc(adjustValue.laneContinuous);

      const tripleCorrectedLevel =
        (totalAdj * (totalNotes - 1)) /
        (totalNotes - 1 - adjustValue.overTriple);
      const roundedLevel = Math.round(tripleCorrectedLevel * 100) / 100;
      console.log(adjustValue);
      console.log(roundedLevel);

      return roundedLevel;
    }
  }
}

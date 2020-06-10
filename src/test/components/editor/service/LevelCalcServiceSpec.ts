import {
  LevelCalcService,
  FlattenData
} from "@/components/editor/service/LevelCalcService";

describe("levelCalcService", () => {
  const levelCalcService = new LevelCalcService();
  it("calcFlattenData", () => {
    const noteFrames = [[200, 280], [240, 280], [], [], []];
    const freezeFrames = [[260, 290], [], [200, 220, 240, 260], [], []];
    const expectedData: FlattenData = {
      allScorebook: [200, 200, 240, 240, 260, 280, 280],
      frzStartData: [200, 240, 260],
      frzEndData: [220, 260, 290]
    };
    expect(
      levelCalcService["calcFlattenData"](noteFrames, freezeFrames)
    ).toStrictEqual(expectedData);
  });

  it("calcLaneContinuous", () => {
    const noteFrames = [[200, 205, 210, 230], [240, 242], [], [300], []];
    const freezeFrames = [[], [], [], [305, 333], []];
    const expectedValue = 3.3;
    expect(levelCalcService.calcLaneContinuous(noteFrames, freezeFrames)).toBe(
      expectedValue
    );
  });

  it("calcAdjustValue", () => {
    const flattenData: FlattenData = {
      allScorebook: [200, 200, 240, 240, 240, 260, 300],
      frzStartData: [200, 240],
      frzEndData: [220, 280]
    };
    const adjustValue = levelCalcService.calcAdjustValue(flattenData);
    expect(adjustValue.single).toBeCloseTo(0.135);
    expect(adjustValue.double).toBeCloseTo(0.06);
    expect(adjustValue.overTriple).toBe(1);
  });

  it("calcLevel", () => {
    const noteFrames = [
      [305, 315, 340, 350],
      [350],
      [240, 350],
      [200, 240, 260, 300],
      [310, 320, 325, 330, 340, 350]
    ];
    const freezeFrames = [[200, 220], [240, 280], [], [], []];
    console.log(levelCalcService.calcLevel(noteFrames, freezeFrames));
    //tool says 3.29* but this says 3.27
  });

  it("countNotes", () => {
    const noteFrames = [[200, 205, 210, 230], [240, 242], [], [300], []];
    const freezeFrames = [[], [], [], [305, 333], []];
    const expectedValue = {
      notesCountArr: [4, 2, 0, 1, 0],
      freezesCountArr: [0, 0, 0, 2, 0]
    };
    expect(levelCalcService.countNotes(noteFrames, freezeFrames)).toStrictEqual(
      expectedValue
    );
  });
});

export type BrewingMethod = 'espresso' | 'v60';

export interface BaseBeanInfo {
  name: string;
  roaster: string;
  roastDate: string;
}

export interface BaseRecipeParams {
  grindSize: number;
  doseWeight: number;
  waterTemperature?: number;
}

export interface EspressoParams {
  yield: number;
  brewTime: number;
  pressure?: number;
}

export interface V60Params {
  totalWater: number;
  bloomWater: number;
  bloomTime: number;
  pourStages: PourStage[];
  totalTime: number;
  drawdownTime?: number;
}

export interface PourStage {
  water: number;
  time: number;
}

export interface TasteResults {
  rating: number;
  taste: {
    sour: boolean;
    bitter: boolean;
    balanced: boolean;
    strength: 'weak' | 'good' | 'strong';
    notes: string;
  };
}

export interface Recipe {
  id: string;
  createdAt: string;
  brewingMethod: BrewingMethod;
  beanInfo: BaseBeanInfo;
  baseParams: BaseRecipeParams;
  methodParams: EspressoParams | V60Params;
  results: TasteResults;
}
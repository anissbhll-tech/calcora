import React from 'react';
import { MortgageCalculator } from './MortgageCalculator';
import { CompoundInterestCalculator } from './CompoundInterestCalculator';
import { RoiCalculator } from './RoiCalculator';
import { AutoLoanCalculator } from './AutoLoanCalculator';
import { CreditCardPayoffCalculator } from './CreditCardPayoffCalculator';
import { BmiCalculator } from './BmiCalculator';
import { CalorieCalculator } from './CalorieCalculator';
import { BodyFatCalculator } from './BodyFatCalculator';
import { TargetHeartRateCalculator } from './TargetHeartRateCalculator';
import { WaterIntakeCalculator } from './WaterIntakeCalculator';
import { ScientificCalculator } from './ScientificCalculator';
import { PercentageCalculator } from './PercentageCalculator';
import { StatisticsCalculator } from './StatisticsCalculator';
import { AlgebraSolver } from './AlgebraSolver';
import { TriangleCalculator } from './TriangleCalculator';
import { UnitConverter } from './UnitConverter';
import { SalesTaxTipCalculator } from './SalesTaxTipCalculator';
import { DiscountCalculator } from './DiscountCalculator';
import { TimeDateCalculator } from './TimeDateCalculator';
import { GpaCalculator } from './GpaCalculator';
import { FuelTripCalculator } from './FuelTripCalculator';
import { ConstructionCalculator } from './ConstructionCalculator';
import { StudentLoanRefinanceCalculator } from './StudentLoanRefinanceCalculator';
import { Retirement401kCalculator } from './Retirement401kCalculator';
import { MacroNutrientCalculator } from './MacroNutrientCalculator';
import { HourlyToSalaryCalculator } from './HourlyToSalaryCalculator';
import { MarkupMarginCalculator } from './MarkupMarginCalculator';
import { PaintCoverageCalculator } from './PaintCoverageCalculator';
import { TileGroutCalculator } from './TileGroutCalculator';
import { CircleCalculator } from './CircleCalculator';
import { FractionCalculator } from './FractionCalculator';
import { SleepCycleCalculator } from './SleepCycleCalculator';
import { DebtSnowballAvalancheCalculator } from './DebtSnowballAvalancheCalculator';
import { InflationPurchasingPowerCalculator } from './InflationPurchasingPowerCalculator';
import { IdealBodyWeightCalculator } from './IdealBodyWeightCalculator';
import { PregnancyDueDateCalculator } from './PregnancyDueDateCalculator';
import { PolynomialSolverCalculator } from './PolynomialSolverCalculator';
import { MatrixMultiplicationCalculator } from './MatrixMultiplicationCalculator';
import { RoofPitchRafterCalculator } from './RoofPitchRafterCalculator';
import { BrickMortarCalculator } from './BrickMortarCalculator';
import { SavingsGoalTimelineCalculator } from './SavingsGoalTimelineCalculator';
import { TipSplitBillCalculator } from './TipSplitBillCalculator';
import { PersonalLoanPaymentCalculator } from './PersonalLoanPaymentCalculator';
import { NetWorthCalculator } from './NetWorthCalculator';
import { EmergencyFundCalculator } from './EmergencyFundCalculator';
import { LeanBodyMassCalculator } from './LeanBodyMassCalculator';
import { PythagoreanTheoremCalculator } from './PythagoreanTheoremCalculator';
import { RatioProportionCalculator } from './RatioProportionCalculator';
import { FlooringSquareFootageCalculator } from './FlooringSquareFootageCalculator';
import { OvertimePayCalculator } from './OvertimePayCalculator';
import { ReadingTimeWordCountCalculator } from './ReadingTimeWordCountCalculator';
import { ConcreteFootingSlabCalculator } from './ConcreteFootingSlabCalculator';
import { LumpSumVsDcaCalculator } from './LumpSumVsDcaCalculator';

// 48 New Calculators
import { RentalPropertyRoiCalculator } from './RentalPropertyRoiCalculator';
import { AmortizationScheduleCalculator } from './AmortizationScheduleCalculator';
import { PresentValueCalculator } from './PresentValueCalculator';
import { BusinessBreakEvenCalculator } from './BusinessBreakEvenCalculator';
import { CarDepreciationCalculator } from './CarDepreciationCalculator';
import { BmrCalculator } from './BmrCalculator';
import { MacroSplitCalculator } from './MacroSplitCalculator';
import { OneRepMaxCalculator } from './OneRepMaxCalculator';
import { PaceRunnerCalculator } from './PaceRunnerCalculator';
import { BodySurfaceAreaCalculator } from './BodySurfaceAreaCalculator';
import { BloodAlcoholEbacCalculator } from './BloodAlcoholEbacCalculator';
import { ChildHeightPredictorCalculator } from './ChildHeightPredictorCalculator';
import { PeriodOvulationCalculator } from './PeriodOvulationCalculator';
import { StandardDeviationZScoreCalculator } from './StandardDeviationZScoreCalculator';
import { LogarithmCalculator } from './LogarithmCalculator';
import { ExponentPowerCalculator } from './ExponentPowerCalculator';
import { PrimeFactorizationCalculator } from './PrimeFactorizationCalculator';
import { CombinationPermutationCalculator } from './CombinationPermutationCalculator';
import { VectorCrossDotCalculator } from './VectorCrossDotCalculator';
import { SequenceSeriesCalculator } from './SequenceSeriesCalculator';
import { StandardFormConverterCalculator } from './StandardFormConverterCalculator';
import { VolumeSurface3DCalculator } from './VolumeSurface3DCalculator';
import { BinaryHexConverterCalculator } from './BinaryHexConverterCalculator';
import { ConcreteSlabVolumeCalculator } from './ConcreteSlabVolumeCalculator';
import { DrywallSheetCalculator } from './DrywallSheetCalculator';
import { FlooringTileCalculator } from './FlooringTileCalculator';
import { RoofingShingleCalculator } from './RoofingShingleCalculator';
import { MulchSoilVolumeCalculator } from './MulchSoilVolumeCalculator';
import { FencePostSpacingCalculator } from './FencePostSpacingCalculator';
import { DeckBoardCalculator } from './DeckBoardCalculator';
import { StairRiserTreadCalculator } from './StairRiserTreadCalculator';
import { GravelPavingCalculator } from './GravelPavingCalculator';
import { ScreenTimeFocusCalculator } from './ScreenTimeFocusCalculator';
import { MeetingCostCalculator } from './MeetingCostCalculator';
import { DataStorageConverterCalculator } from './DataStorageConverterCalculator';
import { CookingUnitConverterCalculator } from './CookingUnitConverterCalculator';
import { PetAgeCalculator } from './PetAgeCalculator';
import { ElectricityBillCalculator } from './ElectricityBillCalculator';
import { TipSplitTaxCalculator } from './TipSplitTaxCalculator';
import { WaterHydrationCalculator } from './WaterHydrationCalculator';
import { MortgageRefinanceSavingsCalculator } from './MortgageRefinanceSavingsCalculator';
import { SubnetCidrCalculator } from './SubnetCidrCalculator';
import { TimeCardWorkHoursCalculator } from './TimeCardWorkHoursCalculator';
import { SinkingFundCalculator } from './SinkingFundCalculator';
import { BloodPressureCategoryCalculator } from './BloodPressureCategoryCalculator';
import { ReadingTimeCalculator } from './ReadingTimeCalculator';
import { FederalIncomeTaxBracketCalculator } from './FederalIncomeTaxBracketCalculator';
import { FireNumberCalculator } from './FireNumberCalculator';
import { RothVsTraditionalCalculator } from './RothVsTraditionalCalculator';
import { SelfEmploymentTaxCalculator } from './SelfEmploymentTaxCalculator';
import { CapitalGainsTaxCalculator } from './CapitalGainsTaxCalculator';
import { AutoLeaseVsBuyCalculator } from './AutoLeaseVsBuyCalculator';
import { StudentLoanIdrCalculator } from './StudentLoanIdrCalculator';
import { BiweeklyMortgageCalculator } from './BiweeklyMortgageCalculator';
import { KetoMacroCarbManagerCalculator } from './KetoMacroCarbManagerCalculator';
import { BenchPressMaxCalculator } from './BenchPressMaxCalculator';
import { StockDividendYieldCalculator } from './StockDividendYieldCalculator';
import { DcaCalculator } from './DcaCalculator';
import { DebtToIncomeAdvancedCalculator } from './DebtToIncomeAdvancedCalculator';
import { Vo2MaxFitnessCalculator } from './Vo2MaxFitnessCalculator';
import { MarathonRaceFinishCalculator } from './MarathonRaceFinishCalculator';

export interface BaseCalculatorProps {
  onSaveHistory?: (summary: string, inputs: Record<string, any>, results: Record<string, any>) => void;
  resetSignal?: number;
  initialPreset?: Record<string, any> | null;
}

export const CALCULATOR_COMPONENT_MAP: Record<string, React.FC<BaseCalculatorProps>> = {
  'federal-income-tax-bracket': FederalIncomeTaxBracketCalculator as any,
  'fire-number-calculator': FireNumberCalculator as any,
  '401k-roth-ira-comparison': RothVsTraditionalCalculator as any,
  'self-employment-tax-1099': SelfEmploymentTaxCalculator as any,
  'capital-gains-tax-estimate': CapitalGainsTaxCalculator as any,
  'auto-lease-vs-buy': AutoLeaseVsBuyCalculator as any,
  'student-loan-income-driven-idr': StudentLoanIdrCalculator as any,
  'biweekly-mortgage-payoff': BiweeklyMortgageCalculator as any,
  'macro-keto-carb-manager': KetoMacroCarbManagerCalculator as any,
  'bench-press-max-calculator': BenchPressMaxCalculator as any,
  'stock-dividend-yield': StockDividendYieldCalculator as any,
  'dca-crypto-stocks': DcaCalculator as any,
  'debt-to-income-dti-advanced': DebtToIncomeAdvancedCalculator as any,
  'vo2-max-fitness-score': Vo2MaxFitnessCalculator as any,
  'marathon-race-finish-time': MarathonRaceFinishCalculator as any,
  'mortgage': MortgageCalculator,
  'compound-interest': CompoundInterestCalculator,
  'roi-margin': RoiCalculator,
  'auto-loan': AutoLoanCalculator,
  'credit-card-payoff': CreditCardPayoffCalculator,
  'bmi': BmiCalculator,
  'calorie-tdee': CalorieCalculator,
  'body-fat': BodyFatCalculator,
  'target-heart-rate': TargetHeartRateCalculator,
  'water-intake': WaterIntakeCalculator,
  'scientific': ScientificCalculator,
  'percentage': PercentageCalculator,
  'statistics': StatisticsCalculator,
  'algebra-solver': AlgebraSolver,
  'triangle': TriangleCalculator,
  'unit-converter': UnitConverter,
  'sales-tax-tip': SalesTaxTipCalculator,
  'discount-savings': DiscountCalculator,
  'time-date': TimeDateCalculator,
  'gpa': GpaCalculator,
  'fuel-trip': FuelTripCalculator,
  'construction': ConstructionCalculator,
  'student-loan-refinance': StudentLoanRefinanceCalculator,
  'retirement-401k': Retirement401kCalculator,
  'macro-nutrient': MacroNutrientCalculator,
  'hourly-to-salary': HourlyToSalaryCalculator,
  'markup-margin': MarkupMarginCalculator,
  'paint-coverage': PaintCoverageCalculator,
  'tile-grout': TileGroutCalculator,
  'circle-calculator': CircleCalculator,
  'fraction-calculator': FractionCalculator,
  'sleep-cycle': SleepCycleCalculator,
  'debt-snowball-avalanche': DebtSnowballAvalancheCalculator,
  'inflation-purchasing-power': InflationPurchasingPowerCalculator,
  'ideal-body-weight': IdealBodyWeightCalculator,
  'pregnancy-due-date': PregnancyDueDateCalculator,
  'polynomial-solver': PolynomialSolverCalculator,
  'matrix-multiplication': MatrixMultiplicationCalculator,
  'roof-pitch-rafter': RoofPitchRafterCalculator,
  'brick-mortar': BrickMortarCalculator,
  'savings-goal-timeline': SavingsGoalTimelineCalculator,
  'tip-split-bill': TipSplitBillCalculator,
  'personal-loan-payment': PersonalLoanPaymentCalculator,
  'net-worth': NetWorthCalculator,
  'emergency-fund': EmergencyFundCalculator,
  'lean-body-mass': LeanBodyMassCalculator,
  'pythagorean-theorem': PythagoreanTheoremCalculator,
  'ratio-proportion': RatioProportionCalculator,
  'flooring-square-footage': FlooringSquareFootageCalculator,
  'overtime-pay': OvertimePayCalculator,
  'reading-time-word-count': ReadingTimeWordCountCalculator,
  'concrete-footing-slab': ConcreteFootingSlabCalculator,
  'lump-sum-vs-dca': LumpSumVsDcaCalculator,

  // 48 New Calculators
  'rental-property-roi': RentalPropertyRoiCalculator,
  'amortization-schedule': AmortizationScheduleCalculator,
  'present-value-npv': PresentValueCalculator,
  'business-break-even': BusinessBreakEvenCalculator,
  'car-depreciation': CarDepreciationCalculator,
  'bmr-calculator': BmrCalculator,
  'macro-split': MacroSplitCalculator,
  'one-rep-max': OneRepMaxCalculator,
  'pace-runner': PaceRunnerCalculator,
  'body-surface-area': BodySurfaceAreaCalculator,
  'blood-alcohol-ebac': BloodAlcoholEbacCalculator,
  'child-height-predictor': ChildHeightPredictorCalculator,
  'period-ovulation': PeriodOvulationCalculator,
  'standard-deviation-zscore': StandardDeviationZScoreCalculator,
  'logarithm-calculator': LogarithmCalculator,
  'exponent-power': ExponentPowerCalculator,
  'prime-factorization': PrimeFactorizationCalculator,
  'combination-permutation': CombinationPermutationCalculator,
  'vector-cross-dot': VectorCrossDotCalculator,
  'sequence-series': SequenceSeriesCalculator,
  'standard-form-converter': StandardFormConverterCalculator,
  'volume-surface-3d': VolumeSurface3DCalculator,
  'binary-hex-converter': BinaryHexConverterCalculator,
  'concrete-slab-volume': ConcreteSlabVolumeCalculator,
  'drywall-sheet': DrywallSheetCalculator,
  'flooring-tile': FlooringTileCalculator,
  'roofing-shingle': RoofingShingleCalculator,
  'mulch-soil-volume': MulchSoilVolumeCalculator,
  'fence-post-spacing': FencePostSpacingCalculator,
  'deck-board': DeckBoardCalculator,
  'stair-riser-tread': StairRiserTreadCalculator,
  'paint-coverage-detail': PaintCoverageCalculator,
  'gravel-paving': GravelPavingCalculator,
  'sleep-cycle-tracker': SleepCycleCalculator,
  'reading-time-calculator': ReadingTimeCalculator,
  'screen-time-focus': ScreenTimeFocusCalculator,
  'meeting-cost': MeetingCostCalculator,
  'data-storage-converter': DataStorageConverterCalculator,
  'cooking-unit-converter': CookingUnitConverterCalculator,
  'pet-age-calculator': PetAgeCalculator,
  'electricity-bill': ElectricityBillCalculator,
  'tip-split-tax': TipSplitTaxCalculator,
  'water-hydration': WaterHydrationCalculator,
  'mortgage-refinance-savings': MortgageRefinanceSavingsCalculator,
  'subnet-cidr': SubnetCidrCalculator,
  'time-card-work-hours': TimeCardWorkHoursCalculator,
  'sinking-fund': SinkingFundCalculator,
  'blood-pressure-category': BloodPressureCategoryCalculator,
};

import { UniversalFormulaCalculator } from './UniversalFormulaCalculator';

export function getCalculatorComponent(calculatorId: string): React.FC<any> | null {
  if (CALCULATOR_COMPONENT_MAP[calculatorId]) {
    return CALCULATOR_COMPONENT_MAP[calculatorId];
  }
  // Universal fallback component for expanded 250+ calculators library
  return (props: any) => React.createElement(UniversalFormulaCalculator, { calculatorId, ...props });
}



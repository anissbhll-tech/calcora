export * from './types/index';

export type CategoryId = 
  | 'finance'
  | 'health'
  | 'math'
  | 'conversions'
  | 'everyday'
  | 'construction'
  | 'investing'
  | 'taxes'
  | 'mortgage'
  | 'loans'
  | 'business'
  | 'fitness'
  | 'nutrition'
  | 'engineering'
  | 'electrical'
  | 'statistics'
  | 'physics'
  | 'chemistry'
  | 'time'
  | 'education'
  | 'ai';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  badgeColor: string;
  count?: number;
}

export interface CalculatorMeta {
  id: string;
  title: string;
  slug: string;
  categoryId: CategoryId;
  shortDescription: string;
  description: string;
  keywords: string[];
  iconName: string;
  isPopular?: boolean;
  isNew?: boolean;
  formulaDescription?: string;
  formulaLatex?: string;
  relatedCalculatorIds?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  stepByStepInstructions?: string[];
  educationalDisclaimer?: string;
  schemaType?: string;
}

export interface CalculationHistoryItem {
  id: string;
  calculatorId: string;
  calculatorTitle: string;
  timestamp: number;
  summaryText: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
}

export interface PresetScenario {
  label: string;
  description?: string;
  values: Record<string, any>;
}

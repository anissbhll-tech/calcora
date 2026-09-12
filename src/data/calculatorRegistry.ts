import { CALCULATORS } from './calculatorsList';
import { CATEGORIES } from './categories';
import { CalculatorMeta, CategoryId } from '../types';

/**
 * Known Legacy Aliases, Alternative Slugs & Keyword Mappings
 */
export const CALCULATOR_ALIASES: Record<string, string> = {
  // Legacy short / alternate names from earlier iterations
  'probability': 'combination-permutation',
  'z-score-p-value': 'standard-deviation-zscore',
  'cooking-measurement-converter': 'cooking-unit-converter',
  'currency-exchange': 'currency-fx-rate-converter',
  'salary-hourly-converter': 'hourly-to-salary',
  'fuel-cost-trip-estimator': 'fuel-trip',
  'profit-margin-markup': 'markup-margin',
  'ideal-weight': 'ideal-body-weight',
  'bac': 'blood-alcohol-ebac',
  'concrete-slab': 'concrete-slab-volume',
  'rebar-weight': 'rebar-grid-spacing',
  'sinking-fund-target': 'sinking-fund',
  'bmi-calculator': 'bmi',
  'tdee-calculator': 'calorie-tdee',
  'mortgage-calculator': 'mortgage',
  'compound-interest-calculator': 'compound-interest',
  'auto-loan-calculator': 'auto-loan',
  'credit-card-calculator': 'credit-card-payoff',
  'loan-payoff': 'credit-card-payoff',
  '401k': 'retirement-401k',
  'sales-tax': 'sales-tax-tip',
  'tip-calculator': 'tip-split-bill',
  'gpa-calculator': 'gpa',
  'bmr': 'bmr-calculator',
  'tdee': 'calorie-tdee',
  'ebac': 'blood-alcohol-ebac',
  'macro-calculator': 'macro-nutrient',
  'water-calculator': 'water-intake',
  'heart-rate': 'target-heart-rate',
  'options-pricing': 'option-greek-delta',
  'black-scholes': 'option-greek-delta',
  'va-loan': 'va-loan-funding-fee',
  'pmi': 'pmi-removal-timeline',
  'jumbo-loan': 'jumbo-mortgage-qualification',
  'reverse-tax': 'sales-tax-reverse',
  'reverse-vat': 'sales-tax-reverse',
  'lump-sum-dca': 'lump-sum-vs-dca',
};

/**
 * Calcora Centralized Calculator Registry Manager
 */

export function getCalculatorById(id: string): CalculatorMeta | undefined {
  if (!id) return undefined;
  const canonicalId = CALCULATOR_ALIASES[id] || id;
  return CALCULATORS.find(
    (calc) =>
      calc.id === canonicalId ||
      calc.slug === canonicalId ||
      calc.id === id ||
      calc.slug === id
  );
}

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  if (!slug) return undefined;
  const canonicalId = CALCULATOR_ALIASES[slug] || slug;
  return CALCULATORS.find(
    (calc) =>
      calc.slug === canonicalId ||
      calc.id === canonicalId ||
      calc.slug === slug ||
      calc.id === slug
  );
}

export function getCalculatorsByCategory(categoryId: CategoryId): CalculatorMeta[] {
  return CALCULATORS.filter((calc) => calc.categoryId === categoryId);
}

export function getPopularCalculators(): CalculatorMeta[] {
  return CALCULATORS.filter((calc) => calc.isPopular);
}

export function getRelatedCalculators(calcId: string, limit: number = 3): CalculatorMeta[] {
  const currentCalc = getCalculatorById(calcId);
  if (!currentCalc) return CALCULATORS.slice(0, limit);

  // 1. First priority: explicitly defined related calculator IDs
  if (currentCalc.relatedCalculatorIds && currentCalc.relatedCalculatorIds.length > 0) {
    const explicit = currentCalc.relatedCalculatorIds
      .map((id) => getCalculatorById(id))
      .filter((c): c is CalculatorMeta => Boolean(c) && c.id !== calcId);
    if (explicit.length >= limit) return explicit.slice(0, limit);
  }

  // 2. Second priority: same category calculators
  const sameCategory = CALCULATORS.filter(
    (c) => c.categoryId === currentCalc.categoryId && c.id !== calcId
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // 3. Fallback: backfill with popular tools from other categories
  const otherPopular = CALCULATORS.filter(
    (c) => c.id !== calcId && c.categoryId !== currentCalc.categoryId
  );

  return [...sameCategory, ...otherPopular].slice(0, limit);
}

export function searchCalculators(query: string): CalculatorMeta[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  return CALCULATORS.filter((calc) => {
    return (
      calc.title.toLowerCase().includes(clean) ||
      calc.shortDescription.toLowerCase().includes(clean) ||
      calc.description.toLowerCase().includes(clean) ||
      calc.keywords.some((k) => k.toLowerCase().includes(clean))
    );
  });
}

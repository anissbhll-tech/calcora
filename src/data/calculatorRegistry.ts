import { CALCULATORS } from './calculatorsList';
import { CATEGORIES } from './categories';
import { CalculatorMeta, CategoryId } from '../types';

/**
 * Calcora Centralized Calculator Registry Manager
 */

export function getCalculatorById(id: string): CalculatorMeta | undefined {
  return CALCULATORS.find((calc) => calc.id === id || calc.slug === id);
}

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find((calc) => calc.slug === slug || calc.id === slug);
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

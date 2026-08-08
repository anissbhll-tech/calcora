import { CALCULATORS } from '../data/calculatorsList';
import { CalculatorMeta } from '../types';

export interface CalculatorSeoBlueprint {
  calculatorId: string;
  calculatorTitle: string;
  category: string;
  futureArticleTitle: string;
  targetKeywords: string[];
  searchIntent: 'Informational' | 'Commercial' | 'Transactional';
  articleOutline: string[];
  faqTopics: string[];
  internalLinks: Array<{ anchorText: string; targetUrl: string }>;
  suggestedRelatedTopics: string[];
}

/**
 * Dynamically builds an SEO Knowledge Blueprint for every calculator in Calcora's registry (256+ tools).
 * Prepares scalable architecture for 250+ future SEO articles without generating bloat content.
 */
export function getCalculatorSeoBlueprint(calc: CalculatorMeta): CalculatorSeoBlueprint {
  const title = calc.title;
  const keywords = calc.keywords || [calc.slug.replace(/-/g, ' ')];
  const primaryKw = keywords[0] || calc.title.toLowerCase();

  return {
    calculatorId: calc.id,
    calculatorTitle: calc.title,
    category: calc.categoryId,
    futureArticleTitle: `The Complete Guide to ${title}: Formulas, Calculations & Real-World Examples`,
    targetKeywords: [
      `how to calculate ${primaryKw}`,
      `${primaryKw} formula`,
      `free ${primaryKw} calculator online`,
      `step by step ${primaryKw} guide`,
      ...keywords.slice(0, 3),
    ],
    searchIntent: 'Informational',
    articleOutline: [
      `Understanding the Fundamentals of ${title}`,
      `The Core Mathematical Formula: ${calc.formulaDescription || 'Formula Breakdown'}`,
      `Step-by-Step Practical Calculation Walkthrough`,
      `Key Variables and Factors Influencing Your Results`,
      `Common Mistakes and How to Avoid Them`,
      `Frequently Asked Questions and Expert Tips`,
    ],
    faqTopics: [
      `What is the main formula used in ${title}?`,
      `How accurate are the results calculated by this tool?`,
      `What units or variables do I need before calculating?`,
      `How can I export or print my calculation schedule?`,
    ],
    internalLinks: [
      { anchorText: `Free ${calc.title} Tool`, targetUrl: `/#calculator/${calc.id}` },
      { anchorText: `Explore ${calc.categoryId} Calculators`, targetUrl: `/#category/${calc.categoryId}` },
    ],
    suggestedRelatedTopics: (calc.relatedCalculatorIds || []).map((relId) => {
      const relCalc = CALCULATORS.find((c) => c.id === relId);
      return relCalc ? `Mastering ${relCalc.title}` : `Related Tool (${relId})`;
    }),
  };
}

/**
 * Returns complete SEO Blueprints for all registered calculators
 */
export function getAllSeoBlueprints(): CalculatorSeoBlueprint[] {
  return CALCULATORS.map((calc) => getCalculatorSeoBlueprint(calc));
}

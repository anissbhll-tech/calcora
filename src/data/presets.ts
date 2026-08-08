import { PresetScenario } from '../types';

export const PRESETS: Record<string, PresetScenario[]> = {
  mortgage: [
    {
      label: 'Standard US Home Loan ($350k)',
      description: '30-year fixed loan at 6.5% interest with 20% down payment',
      values: {
        homePrice: 437500,
        downPaymentPercent: 20,
        interestRate: 6.5,
        loanTermYears: 30,
        propertyTaxRate: 1.2,
        homeInsuranceAnnual: 1500,
        hoaMonthly: 100,
      }
    },
    {
      label: '15-Year Fast Equity ($250k)',
      description: '15-year fixed loan at 5.75% for quick interest savings',
      values: {
        homePrice: 300000,
        downPaymentPercent: 16.67,
        interestRate: 5.75,
        loanTermYears: 15,
        propertyTaxRate: 1.1,
        homeInsuranceAnnual: 1200,
        hoaMonthly: 0,
      }
    },
    {
      label: 'First-Time Buyer (3.5% FHA)',
      description: '30-year loan with 3.5% low down payment',
      values: {
        homePrice: 320000,
        downPaymentPercent: 3.5,
        interestRate: 6.85,
        loanTermYears: 30,
        propertyTaxRate: 1.25,
        homeInsuranceAnnual: 1400,
        hoaMonthly: 50,
      }
    }
  ],

  'compound-interest': [
    {
      label: 'Retirement Index Fund ($500/mo)',
      description: 'Starting with $5,000, saving $500 monthly for 30 years at 8% annual return',
      values: {
        initialDeposit: 5000,
        monthlyContribution: 500,
        annualRate: 8,
        years: 30,
        compoundFrequency: 12,
      }
    },
    {
      label: 'Aggressive Growth Portfolio',
      description: '10-year tech fund investment at 10% expected return',
      values: {
        initialDeposit: 10000,
        monthlyContribution: 1000,
        annualRate: 10,
        years: 10,
        compoundFrequency: 12,
      }
    },
    {
      label: 'High Yield Savings Account',
      description: '$20,000 emergency fund at 4.5% risk-free APY for 5 years',
      values: {
        initialDeposit: 20000,
        monthlyContribution: 250,
        annualRate: 4.5,
        years: 5,
        compoundFrequency: 12,
      }
    }
  ],

  bmi: [
    {
      label: 'Average Adult Male (Imperial)',
      description: '5 ft 10 in (70 inches), 175 lbs',
      values: { unitSystem: 'imperial', heightFt: 5, heightIn: 10, weightLbs: 175, age: 32, sex: 'male' }
    },
    {
      label: 'Average Adult Female (Metric)',
      description: '165 cm height, 62 kg weight',
      values: { unitSystem: 'metric', heightCm: 165, weightKg: 62, age: 28, sex: 'female' }
    }
  ],

  'calorie-tdee': [
    {
      label: 'Moderate Weight Loss (Desk Job)',
      description: '30 yo, male, 180 lbs, lightly active, aim for 0.5kg / 1 lb per week fat loss',
      values: { unitSystem: 'imperial', age: 30, sex: 'male', heightFt: 5, heightIn: 11, weightLbs: 180, activityLevel: 'light', goal: 'lose' }
    },
    {
      label: 'Muscle Gain (Active Athlete)',
      description: '25 yo, female, 140 lbs, very active training 5x/week',
      values: { unitSystem: 'imperial', age: 25, sex: 'female', heightFt: 5, heightIn: 6, weightLbs: 140, activityLevel: 'heavy', goal: 'gain' }
    }
  ],

  'sales-tax-tip': [
    {
      label: 'Group Dinner Split (4 People)',
      description: '$140 meal subtotal, 8.875% tax, 20% tip split 4 ways',
      values: { subtotal: 140, taxRate: 8.875, tipPercent: 20, numberOfPeople: 4 }
    },
    {
      label: 'Quick Lunch for Two',
      description: '$38 meal subtotal, 7% tax, 18% tip split 2 ways',
      values: { subtotal: 38, taxRate: 7, tipPercent: 18, numberOfPeople: 2 }
    }
  ]
};

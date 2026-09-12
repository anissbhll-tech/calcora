import { CalculatorMeta } from '../types';
import { EXPANDED_CALCULATORS } from './expandedCalculatorsList';

const BASE_CALCULATORS: CalculatorMeta[] = [
  // Finance
  {
    id: 'mortgage',
    title: 'Mortgage Payment & PITI Calculator',
    slug: 'mortgage-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate total monthly mortgage payments including Principal, Interest, Property Taxes, Homeowners Insurance, PMI, and HOA dues.',
    description: 'Estimate your true monthly housing payment (PITI + HOA) and amortization trajectory. Accurately models down payment percentages, private mortgage insurance (PMI) automatic cancellation at 80% LTV, property tax rates, homeowners insurance, and accelerated early payoff with extra monthly principal.',
    keywords: [
      'mortgage calculator',
      'piti mortgage calculator',
      'monthly house payment calculator',
      'home loan calculator with taxes and insurance',
      'mortgage amortization schedule',
      'pmi calculator mortgage',
      '30 year fixed mortgage payment',
      'extra principal payment mortgage payoff'
    ],
    iconName: 'Home',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Monthly P&I: M = P × [r(1 + r)^n] / [(1 + r)^n - 1]; Total PITI = M + Property Tax + Hazard Insurance + PMI + HOA',
    formulaLatex: 'M = P \\times \\left[ \\frac{r(1 + r)^n}{(1 + r)^n - 1} \\right], \\quad \\text{PITI} = M + \\text{Tax}_{\\text{mo}} + \\text{Ins}_{\\text{mo}} + \\text{PMI}_{\\text{mo}} + \\text{HOA}',
    relatedCalculatorIds: [
      'debt-to-income-dti-advanced',
      'biweekly-mortgage-payoff',
      'mortgage-refinance-savings',
      'amortization-schedule',
      'rental-property-roi'
    ],
    stepByStepInstructions: [
      'Enter the Total Home Purchase Price.',
      'Specify your Down Payment percentage (e.g. 5%, 10%, 20%).',
      'Input the Mortgage Interest Rate (APR) and select your Loan Term (30, 20, 15, or 10 years).',
      'Enter local Property Tax % and annual Homeowners Insurance premium.',
      'Include monthly HOA dues and Private Mortgage Insurance (PMI) rate if putting down less than 20%.',
      'Review your comprehensive Monthly PITI payment breakdown and visual composition pie chart.',
      'Optionally test Extra Monthly Principal payments to see years shaved off and interest saved.',
      'Examine the Year-by-Year Amortization Schedule and loan balance reduction curve.'
    ],
    faqs: [
      {
        question: 'What does PITI stand for in a mortgage payment?',
        answer: 'PITI stands for Principal, Interest, Taxes, and Insurance. It represents the complete monthly cost of owning a home: Principal (repaying the loan balance), Interest (the lender financing fee), Property Taxes (local county/city taxes held in escrow), and Hazard Insurance (homeowners policy covering structural damage).'
      },
      {
        question: 'What is Private Mortgage Insurance (PMI) and when does it cancel?',
        answer: 'PMI is an insurance policy required by conventional mortgage lenders when a borrower puts down less than 20% down payment (Loan-to-Value > 80%). Under the Homeowners Protection Act of 1998, lenders must automatically cancel PMI once your mortgage balance reaches 78% of the original purchase price, or you can request cancellation when you hit 80% LTV.'
      },
      {
        question: 'What is the financial difference between a 15-year and a 30-year mortgage?',
        answer: 'A 15-year mortgage has higher monthly payments because you amortize the debt over half the time, but typically offers a 0.5%–1.0% lower interest rate and saves tens or hundreds of thousands of dollars in lifetime interest compared to a 30-year fixed loan.'
      },
      {
        question: 'How do extra principal payments affect my mortgage payoff?',
        answer: 'Extra payments go directly toward reducing the loan principal balance rather than interest. Because monthly interest is calculated on the remaining balance, paying an extra $100–$300/month accelerates amortization, shaving 4 to 8 years off a 30-year mortgage and saving thousands in interest.'
      },
      {
        question: 'What percentage of my income should go toward a mortgage payment?',
        answer: 'Under standard mortgage underwriting guidelines (the 28/36 rule), your monthly housing payment (Front-End DTI including PITI and HOA) should not exceed 28% of your gross monthly income, and your total monthly debt payments (Back-End DTI including mortgage, auto, student loans, cards) should not exceed 36% to 43%.'
      },
      {
        question: 'What is mortgage escrow and how does it work?',
        answer: 'An escrow account is a holding account managed by your loan servicer. Each month, 1/12th of your annual property taxes and homeowners insurance is collected along with your principal and interest payment. When taxes and insurance bills are due, the lender pays them on your behalf from the escrow fund.'
      },
      {
        question: 'What is the difference between mortgage APR and the note interest rate?',
        answer: 'The note interest rate is the percentage applied to your principal to calculate monthly interest charges. The Annual Percentage Rate (APR) reflects the true annual cost of borrowing, incorporating discount points, lender origination fees, mortgage broker fees, and closing costs.'
      },
      {
        question: 'Can I recast my mortgage instead of refinancing?',
        answer: 'Yes. Mortgage recasting allows you to make a lump-sum principal payment (usually $5,000+) while keeping your existing interest rate and loan term. The lender re-amortizes the remaining lower balance over the remaining term, lowering your future monthly payment without closing costs.'
      }
    ],
    educationalDisclaimer: 'This mortgage calculator provides educational estimates based on standard fixed-rate amortization formulas. Official loan qualifications, property taxes, insurance premiums, and closing fees vary by lender underwriting and local municipality guidelines.'
  },
  {
    id: 'compound-interest',
    title: 'Compound Interest & Investment Growth Calculator',
    slug: 'compound-interest-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate compound interest growth, recurring monthly deposits, compounding frequencies, and inflation-adjusted future purchasing power.',
    description: 'Calculate how your initial investment principal and recurring monthly contributions grow exponentially through compounding interest. Models daily, monthly, quarterly, and annual compounding frequencies, start vs end-of-period deposits, interactive visual growth curves, and real inflation-adjusted wealth.',
    keywords: [
      'compound interest calculator',
      'investment growth calculator',
      'compound interest with monthly contributions',
      'future value calculator',
      'annual compounding interest formula',
      'daily compound interest calculator',
      'wealth multiplier calculator',
      's&p 500 compound growth calculator'
    ],
    iconName: 'TrendingUp',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Future Value A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)] × (1 + r/n)^timing',
    formulaLatex: 'A = P \\left(1 + \\frac{r}{n}\\right)^{nt} + \\text{PMT} \\times \\left[ \\frac{\\left(1 + \\frac{r}{n}\\right)^{nt} - 1}{\\frac{r}{n}} \\right] \\times \\left(1 + \\frac{r}{n}\\right)^{\\text{timing}}',
    relatedCalculatorIds: [
      'dca-crypto-stocks',
      'stock-dividend-yield',
      '401k-roth-ira-comparison',
      'fire-number-calculator',
      'roi-margin'
    ],
    stepByStepInstructions: [
      'Enter your Starting Initial Principal investment balance.',
      'Specify your Recurring Monthly Contribution deposited into the account.',
      'Enter the Expected Annual Return / Interest Rate (e.g. 7%–10% for index funds, 4%–5% for HYSA).',
      'Set the Investment Time Horizon in years (1 to 50 years).',
      'Select the Compounding Frequency (Daily, Monthly, Quarterly, or Annually).',
      'Choose Deposit Timing (End of Month vs Beginning of Month).',
      'Review the Future Portfolio Value, Total Principal Contributed, Pure Compound Interest Earned, and Wealth Multiplier (x).',
      'Examine the interactive visual area chart and the Year-by-Year Amortization Schedule.'
    ],
    faqs: [
      {
        question: 'What is compound interest and why is it called the 8th wonder of the world?',
        answer: 'Compound interest is the mathematical process where interest is earned not only on your initial principal deposit, but also on the accumulated interest from previous periods. Over long time horizons (20–40 years), compound interest creates an exponential growth curve where interest earnings dwarf total principal contributions.'
      },
      {
        question: 'What is the mathematical difference between Simple and Compound Interest?',
        answer: 'Simple interest is calculated solely on the original principal (Interest = Principal × Rate × Time). Compound interest continuously adds earned interest back into the principal balance, so subsequent interest is calculated on an ever-increasing base amount (A = P(1 + r/n)^(nt)).'
      },
      {
        question: 'How does compounding frequency (daily vs monthly vs annually) affect returns?',
        answer: 'More frequent compounding generates slightly higher effective annual yields (APY). For example, $10,000 at 8% compounded annually grows to $68,485 after 25 years. Compounded daily (365 times/year), it grows to $73,870—yielding over $5,385 in additional wealth without saving an extra dollar.'
      },
      {
        question: 'What is the Rule of 72 in compound interest?',
        answer: 'The Rule of 72 is a quick mental shortcut to estimate how many years it takes for an investment to double: Years to Double ≈ 72 / Annual Interest Rate. At an 8% annual return, your money doubles approximately every 9 years (72 / 8 = 9).'
      },
      {
        question: 'What is the difference between Nominal Interest Rate and Real Purchasing Power?',
        answer: 'Nominal interest is the raw dollar percentage earned on your balance. Real Purchasing Power adjusts nominal returns for inflation (CPI). If your portfolio grows at 8% nominal but annual inflation is 3%, your real purchasing power growth is approximately 5% per year.'
      },
      {
        question: 'Does starting early matter more than contributing larger amounts later?',
        answer: 'Yes. Due to the compounding runway, an investor who invests $500/month from age 20 to 30 ($60,000 total) and then stops will frequently end up with more money at age 65 than someone who starts at age 30 and contributes $500/month continuously until age 65 ($210,000 total).'
      },
      {
        question: 'What is the difference between Annuity Due and Ordinary Annuity deposit timing?',
        answer: 'An Ordinary Annuity deposits funds at the end of each period, meaning the first month deposit earns interest only in subsequent months. An Annuity Due deposits funds at the beginning of each period, allowing each monthly deposit to start earning compound interest immediately in month one.'
      },
      {
        question: 'How do taxes impact compound investment growth?',
        answer: 'In a taxable brokerage account, annual dividend and realized capital gains taxes drag down the compounding rate. In tax-advantaged accounts (Roth IRA, Traditional 401(k), HSA), 100% of dividends and capital gains compound untaxed year after year, yielding substantially higher final wealth.'
      }
    ],
    educationalDisclaimer: 'This compound interest calculator provides theoretical future value projections based on constant mathematical compounding rates. Actual investment returns fluctuate with market volatility, and past performance is no guarantee of future results.'
  },
  {
    id: 'roi-margin',
    title: 'ROI & Profit Margin Calculator (Annualized CAGR & Markup)',
    slug: 'roi-margin-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate Return on Investment (ROI %), Net Profit, Annualized CAGR, Profit Margin %, Markup %, and Multiple on Invested Capital (MOIC).',
    description: 'Evaluate the profitability and efficiency of financial investments, real estate deals, marketing ad campaigns, and retail pricing models. Compute total net profit, simple ROI, compounded annualized growth rates (CAGR), gross profit margin, price markup percentage, and benefit-cost ratios.',
    keywords: [
      'roi calculator',
      'return on investment calculator',
      'profit margin calculator',
      'markup calculator',
      'annualized roi calculator',
      'cagr calculator',
      'multiple on invested capital moic',
      'business investment profitability'
    ],
    iconName: 'PieChart',
    isPopular: true,
    isNew: false,
    formulaDescription: 'ROI % = ((Net Profit) / Total Cost) × 100; Annualized ROI = ((Revenue / Total Cost)^(1/years) - 1) × 100; Profit Margin % = (Net Profit / Revenue) × 100; Markup % = (Net Profit / Total Cost) × 100.',
    formulaLatex: '\\text{ROI} = \\frac{R - C}{C} \\times 100\\%, \\quad \\text{CAGR} = \\left( \\frac{R}{C} \\right)^{\\frac{1}{t}} - 1, \\quad \\text{Margin} = \\frac{R - C}{R} \\times 100\\%, \\quad \\text{Markup} = \\frac{R - C}{C} \\times 100\\%',
    relatedCalculatorIds: [
      'rental-property-roi',
      'business-break-even',
      'compound-interest',
      'lump-sum-vs-dca',
      'present-value-npv'
    ],
    stepByStepInstructions: [
      'Select a Quick Scenario preset (Stock Portfolio, Real Estate Flip, Digital Ad Campaign, or Retail Markup) or enter custom figures.',
      'Enter your Initial Capital Investment Cost ($).',
      'Enter any Additional Ongoing Expenses / Budget ($) incurred during the holding period.',
      'Enter your Final Gross Realized Revenue / Terminal Value ($).',
      'Specify the Investment Duration (Years and Months) to compute the Annualized Compound Growth Rate (CAGR).',
      'Review your Net Profit, Total ROI %, Annualized ROI %, Profit Margin %, Price Markup %, and Multiple on Invested Capital (MOIC).'
    ],
    faqs: [
      {
        question: 'What is Return on Investment (ROI) and how is it calculated?',
        answer: 'Return on Investment (ROI) is a fundamental financial performance metric measuring the profitability of an investment relative to its cost. The formula is: ROI = [(Gross Revenue - Total Cost) / Total Cost] × 100. A positive percentage represents net profit, while a negative percentage denotes a financial loss.'
      },
      {
        question: 'What is the difference between simple ROI and Annualized ROI (CAGR)?',
        answer: 'Simple ROI calculates total cumulative percentage gain regardless of time. For example, a 100% gain over 10 years equals an Annualized Compound Annual Growth Rate (CAGR) of 7.18% per year. Annualized ROI standardizes returns across different time horizons, allowing direct comparisons between short-term flips and long-term investments.'
      },
      {
        question: 'What is the difference between Profit Margin and Price Markup?',
        answer: 'Profit Margin expresses profit as a percentage of selling price/revenue: (Profit ÷ Revenue) × 100. Price Markup expresses profit as a percentage of original cost: (Profit ÷ Cost) × 100. For example, an item bought for $50 and sold for $100 has a $50 profit, yielding a 100% markup but a 50% profit margin.'
      },
      {
        question: 'What is Multiple on Invested Capital (MOIC)?',
        answer: 'MOIC (Multiple on Invested Capital) is a metric widely used in private equity and venture capital that divides total cash returned by total cash invested: MOIC = Gross Realized Value / Total Invested Capital. An MOIC of 2.0x means your capital doubled.'
      },
      {
        question: 'What is a "good" ROI for business investments vs stock markets?',
        answer: 'For broad public equity markets (e.g., S&P 500), historical long-term average annualized ROI is approximately 10% (7–8% after inflation). For corporate capital projects, private equity, or early-stage ventures, target Hurdle Rates or ROIs typically range from 15% to 25%+ to compensate for operational risk and illiquidity.'
      },
      {
        question: 'How do additional costs affect ROI?',
        answer: 'Failing to include transaction fees, taxes, renovation expenses, freight, or carrying interest artificially inflates calculated ROI. Calcora includes an "Additional Costs" parameter to capture true all-in cost basis and prevent distorted profitability assessments.'
      },
      {
        question: 'What is the Benefit-Cost Ratio (BCR)?',
        answer: 'The Benefit-Cost Ratio (BCR) summarizes the overall relationship between the relative costs and benefits of a proposed project. A BCR greater than 1.0 indicates that the financial benefits outweigh the costs.'
      }
    ],
    educationalDisclaimer: 'This calculator provides mathematical profitability and return estimates. It does not account for specific local tax treatments, inflation adjustments, or transaction slippage. Consult a certified financial planner or CPA for investment advisory services.'
  },
  {
    id: 'auto-loan',
    title: 'Auto Loan & Car Payment Calculator (Financing & Trade-In)',
    slug: 'auto-loan-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate monthly auto loan payments, trade-in equity credits, sales tax reductions, dealer doc fees, and accelerated early payoff savings.',
    description: 'Estimate your true monthly car payment and total out-the-door vehicle financing costs. Accurately factors in trade-in allowances, existing loan balances (negative equity rollovers), state sales tax trade-in credits, dealer documentation fees, and extra monthly principal reduction.',
    keywords: [
      'auto loan calculator',
      'car payment calculator',
      'vehicle financing calculator',
      'car loan interest calculator',
      'trade in value calculator car loan',
      'car sales tax calculator',
      'auto loan amortization schedule',
      'out the door price car calculator'
    ],
    iconName: 'Car',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Monthly Payment = [P × r × (1 + r)^n] / [(1 + r)^n - 1] where P = Vehicle Price - Down Payment - Net Trade-In Equity + Sales Tax + Dealer Fees',
    formulaLatex: 'M = P \\times \\left[ \\frac{r(1 + r)^n}{(1 + r)^n - 1} \\right], \\quad P = \\text{Price} - \\text{Down} - (\\text{TradeIn} - \\text{LoanOwed}) + \\text{Tax} + \\text{Fees}',
    relatedCalculatorIds: [
      'auto-lease-vs-buy',
      'debt-to-income-dti-advanced',
      'amortization-schedule',
      'compound-interest',
      'credit-card-payoff'
    ],
    stepByStepInstructions: [
      'Enter the Negotiated Vehicle Purchase Price (MSRP or negotiated sale price before tax/fees).',
      'Input your Cash Down Payment amount.',
      'Enter the Dealer Trade-In Allowance for your current car, along with any Remaining Loan Balance owed on it.',
      'Set your State & Local Sales Tax percentage.',
      'Enter the Quoted Loan Interest Rate (APR) and select your Loan Term (24, 36, 48, 60, 72, or 84 months).',
      'Add Dealer Documentation and DMV Title/Registration Fees.',
      'Review your Estimated Monthly Payment, Total Financed Amount, Total Interest Paid, and Total Vehicle Out-of-Pocket Outlay.',
      'Optionally test adding an Extra Monthly Principal Payment to see months shaved off and interest saved.'
    ],
    faqs: [
      {
        question: 'How is a monthly auto loan payment calculated?',
        answer: 'Monthly car payments are calculated using standard fixed-rate amortization: M = P[r(1+r)^n] / [(1+r)^n - 1], where P is total financed principal (vehicle price minus down payment and net trade-in equity, plus sales tax and dealer fees), r is monthly interest rate (APR / 12), and n is total loan term in months.'
      },
      {
        question: 'What is the 20/4/10 rule for buying a car?',
        answer: 'The 20/4/10 financial rule recommends: 1) Putting down at least a 20% down payment to avoid negative equity; 2) Financing the vehicle for no longer than 4 years (48 months); 3) Keeping total vehicle transportation costs (payment, auto insurance, fuel, maintenance) below 10% of your gross monthly income.'
      },
      {
        question: 'Does a trade-in reduce the sales tax on a new car purchase?',
        answer: 'In most US states (42 out of 50 states), trade-in value provides a sales tax credit. The state sales tax rate is applied only to the net difference between the new car price and the trade-in allowance (e.g. $40,000 car minus $10,000 trade-in = taxes paid only on $30,000).'
      },
      {
        question: 'What happens if I owe more on my trade-in than it is worth (negative equity)?',
        answer: 'If you owe $15,000 on a car that is only worth $10,000, you have $5,000 in "negative equity" (being upside-down). If rolled into your new car financing, that $5,000 is added directly to your new loan principal, increasing your monthly payment and interest costs.'
      },
      {
        question: 'Is a 72-month or 84-month auto loan a good idea?',
        answer: 'While 72-month and 84-month loans lower your monthly payment, they significantly increase total interest paid and keep you in negative equity for years. As the car depreciates faster than the loan balance decreases, you risk owing more than the car is worth if it is totaled or traded in.'
      },
      {
        question: 'What is the difference between APR and the interest rate on a car loan?',
        answer: 'The interest rate is the raw annual cost of borrowing the principal balance. The Annual Percentage Rate (APR) reflects the true annual cost of financing, including lender origination fees, prepaid finance charges, and dealer administrative costs.'
      },
      {
        question: 'Can I pay off my auto loan early without penalty?',
        answer: 'Most modern auto loans are simple interest loans with no prepayment penalties. Making extra principal payments directly reduces the outstanding principal balance, immediately shortening the loan duration and eliminating future interest charges.'
      },
      {
        question: 'What credit score do I need to get the best auto loan interest rates?',
        answer: 'Prime and super-prime auto loan rates (typically 4%–6% APR) are reserved for borrowers with FICO credit scores of 720 and above. Non-prime or subprime scores (below 660) often face rates ranging from 10% to 20%+ APR.'
      }
    ],
    educationalDisclaimer: 'This auto loan calculator provides estimates based on standard amortization formulas. Official financing terms, interest rates, doc fees, and taxes depend on lender credit underwriting, dealer pricing policies, and state motor vehicle laws.'
  },
  {
    id: 'credit-card-payoff',
    title: 'Credit Card Payoff & Interest Calculator',
    slug: 'credit-card-payoff-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate credit card debt payoff timelines, total interest paid, and savings compared to the minimum payment trap.',
    description: 'Create an aggressive debt payoff strategy to eliminate credit card balances. Accurately models fixed monthly payments, target payoff dates, compounding APR interest, and reveals exactly how much time and money you save versus standard minimum monthly payments.',
    keywords: [
      'credit card payoff calculator',
      'credit card interest calculator',
      'how long to pay off credit card',
      'credit card minimum payment calculator',
      'debt payoff calculator',
      'credit card balance payoff',
      'credit card debt free timeline',
      'interest saved credit card'
    ],
    iconName: 'CreditCard',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Months to Payoff: N = -ln(1 - (B × r) / P) / ln(1 + r); Required Monthly Payment: P = B × [r(1 + r)^N] / [(1 + r)^N - 1]',
    formulaLatex: 'N = -\\frac{\\ln\\left(1 - \\frac{B \\cdot r}{P}\\right)}{\\ln(1 + r)}, \\quad P = B \\cdot \\left[ \\frac{r(1 + r)^N}{(1 + r)^N - 1} \\right]',
    relatedCalculatorIds: [
      'debt-snowball-avalanche',
      'personal-loan-payment',
      'debt-to-income-dti-advanced',
      'amortization-schedule',
      'emergency-fund'
    ],
    stepByStepInstructions: [
      'Enter your Total Outstanding Credit Card Balance.',
      'Input the Annual Percentage Rate (APR) from your credit card statement.',
      'Select your strategy mode: "Fixed Monthly Payment" or "Target Payoff Timeline".',
      'Enter your planned monthly dollar payment OR your target payoff timeline in months.',
      'Review the exact months and years required to become completely debt-free.',
      'Compare your structured payoff plan against the standard Minimum Payment Trap to see total interest and years saved.',
      'Examine the interactive Balance Reduction Chart comparing your plan against the minimum payment trajectory.'
    ],
    faqs: [
      {
        question: 'Why is paying only the minimum credit card payment dangerous?',
        answer: 'Credit card minimum payments are structured to keep you in debt for decades. Card issuers typically set minimums at just 1% of the balance plus monthly accrued interest (or a flat $25–$35). As your balance slowly decreases, your required minimum payment also decreases, stretching a $7,500 balance into a 15-to-25-year repayment cycle costing thousands in excess interest.'
      },
      {
        question: 'How is daily and monthly credit card interest calculated?',
        answer: 'Credit card interest is compounded daily using your Daily Periodic Rate (DPR = APR / 365). Your average daily balance across the billing cycle is multiplied by the DPR and the number of days in the month to calculate the monthly interest finance charge.'
      },
      {
        question: 'What is the difference between the Debt Snowball and Debt Avalanche methods?',
        answer: 'The Debt Avalanche prioritizes paying off debts with the highest APR first, mathematically minimizing total interest paid. The Debt Snowball prioritizes the smallest balance first, providing quick psychological wins to build momentum.'
      },
      {
        question: 'What happens if my monthly payment is less than the monthly interest charge?',
        answer: 'This creates negative amortization. When your payment does not cover the accrued monthly interest, the unpaid interest is added to your principal balance, causing your debt to grow larger every month despite making payments.'
      },
      {
        question: 'Is a 0% APR balance transfer credit card worth it?',
        answer: 'A 0% introductory APR balance transfer card can save hundreds in interest if you pay off the balance before the promotional period ends (usually 12 to 21 months). However, beware of the upfront balance transfer fee (typically 3% to 5%) and ensure you do not accumulate new charges on the card.'
      },
      {
        question: 'Can I negotiate a lower interest rate with my credit card company?',
        answer: 'Yes. If you have a solid on-time payment history, calling your credit card issuer customer retention line and asking for a promotional interest rate reduction or hardship program can often lower your APR by 5% to 10%.'
      },
      {
        question: 'How does paying off credit card debt affect my credit score?',
        answer: 'Paying down credit card balances reduces your Credit Utilization Ratio (the percentage of available credit used, which accounts for 30% of your FICO score). Lowering utilization below 30%—and ideally below 10%—often results in an immediate 20 to 50+ point credit score boost.'
      },
      {
        question: 'Should I use my emergency fund to pay off credit card debt?',
        answer: 'Maintain a starter emergency buffer of at least $1,000 to $2,000 in cash to prevent resorting to credit cards for unexpected car or medical repairs. Any additional surplus cash should generally be used to eliminate high-interest (20%+) credit card debt immediately.'
      }
    ],
    educationalDisclaimer: 'This credit card payoff calculator provides mathematical estimates based on constant monthly payments and standard compound interest. Actual payoff schedules may vary based on daily average balance calculations, varying month lengths, and new transaction fees.'
  },

  // Health
  {
    id: 'bmi',
    title: 'BMI (Body Mass Index) & Healthy Weight Calculator',
    slug: 'bmi-calculator',
    categoryId: 'health',
    shortDescription: 'Calculate WHO Body Mass Index, New Oxford BMI, healthy weight boundaries, and BMI Prime.',
    description: 'Calculate standard WHO Body Mass Index and Oxford University formula BMI across metric and imperial systems. Includes detailed 8-tier weight classifications, healthy target weight ranges for your height, and Ponderal Index metrics.',
    keywords: [
      'bmi calculator',
      'body mass index calculator',
      'who bmi classifications',
      'healthy weight range calculator',
      'oxford new bmi formula',
      'bmi prime calculator',
      'ideal bmi for height',
      'underweight overweight obesity scale'
    ],
    iconName: 'Activity',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Standard BMI = weight (kg) / [height (m)]²; Imperial BMI = [weight (lbs) / height (in)²] × 703; New Oxford BMI = 1.3 × weight (kg) / [height (m)]^2.5',
    formulaLatex: '\\text{BMI} = \\frac{W_{\\text{kg}}}{H_{\\text{m}}^2} = 703 \\cdot \\frac{W_{\\text{lbs}}}{H_{\\text{in}}^2}, \\quad \\text{BMI}_{\\text{Oxford}} = \\frac{1.3 \\cdot W_{\\text{kg}}}{H_{\\text{m}}^{2.5}}, \\quad \\text{BMI Prime} = \\frac{\\text{BMI}}{25}',
    relatedCalculatorIds: [
      'ideal-body-weight',
      'body-fat',
      'calorie-tdee',
      'lean-body-mass',
      'macro-nutrient'
    ],
    stepByStepInstructions: [
      'Select your preferred Unit System (Imperial ft/in/lbs or Metric cm/kg).',
      'Optionally specify your Biological Sex and Age for contextual health insights.',
      'Enter your Height (feet & inches or total centimeters).',
      'Enter your current Body Weight (pounds or kilograms).',
      'View your Standard WHO BMI score, active health classification badge, and color-coded needle meter.',
      'Check the New Oxford BMI metric (which adjusts for height bias in tall and short individuals).',
      'Review the Healthy Weight Target Range (18.5 – 24.9 BMI) and weight delta needed to reach normal range.'
    ],
    faqs: [
      {
        question: 'What is Body Mass Index (BMI) and how is it used?',
        answer: 'Body Mass Index (BMI), developed by Belgian mathematician Adolphe Quetelet, is a screening tool used by the World Health Organization (WHO) and CDC to categorize adult weight status relative to height (Underweight < 18.5, Normal 18.5–24.9, Overweight 25–29.9, and Obese ≥ 30).'
      },
      {
        question: 'What is the New Oxford BMI formula and why was it created?',
        answer: 'Professor Nick Trefethen of Oxford University introduced an updated formula (1.3 × weight / height^2.5) to correct mathematical distortion in the standard Quetelet formula, which tends to overestimate body fat in tall people and underestimate body fat in shorter people.'
      },
      {
        question: 'Why doesn\'t BMI distinguish between muscle mass and body fat?',
        answer: 'BMI only evaluates total body weight against height. Because muscle tissue is denser and heavier than adipose fat tissue, highly muscular athletes and bodybuilders may register as "overweight" or "obese" on BMI scales despite possessing low body fat percentages. In such cases, Body Fat Percentage and Waist-to-Height Ratio provide superior clinical assessments.'
      },
      {
        question: 'What is BMI Prime?',
        answer: 'BMI Prime is the ratio of an individual\'s actual BMI to the upper boundary of normal weight (BMI 25.0). A BMI Prime between 0.74 and 0.99 indicates normal weight; a score greater than 1.0 indicates overweight status.'
      },
      {
        question: 'What are the health risks associated with a high BMI (≥ 30)?',
        answer: 'Clinical obesity (BMI ≥ 30) is correlated with increased risk of cardiovascular disease, hypertension, type 2 diabetes, obstructive sleep apnea, osteoarthritis, and certain cancers.'
      },
      {
        question: 'What are the health risks associated with a low BMI (< 18.5)?',
        answer: 'A BMI under 18.5 may indicate malnutrition, compromised immune function, osteoporosis, hormonal imbalances, and anemia.'
      },
      {
        question: 'Do BMI categories vary by ethnicity?',
        answer: 'Yes. The World Health Organization acknowledges that for Asian populations, the cut-off points for public health action and increased risk of cardiovascular disease are lower: Overweight is often defined as BMI ≥ 23.0 and Obesity as BMI ≥ 27.5.'
      },
      {
        question: 'What is Ponderal Index (Corpulence Index)?',
        answer: 'The Ponderal Index divides body weight by height cubed (kg/m³). Unlike BMI which uses height squared, Ponderal Index is a 3-dimensional volumetric measure that yields consistent scaling across all heights.'
      }
    ],
    educationalDisclaimer: 'BMI is an epidemiological screening tool, not a standalone diagnostic measure of body composition or metabolic health. Consult a physician for individualized health evaluations.'
  },
  {
    id: 'calorie-tdee',
    title: 'TDEE & Calorie Deficit / Surplus Calculator',
    slug: 'calorie-tdee-calculator',
    categoryId: 'health',
    shortDescription: 'Calculate Total Daily Energy Expenditure (TDEE), BMR, and tailored macronutrient diet targets.',
    description: 'Determine exact daily caloric needs using clinical Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle equations. Calculates caloric targets for fat loss, maintenance, or muscle hypertrophy alongside custom macronutrient splits (carbs, protein, fat).',
    keywords: [
      'tdee calculator',
      'calorie calculator',
      'calorie deficit calculator',
      'bmr calculator',
      'macro calculator for weight loss',
      'mifflin st jeor formula',
      'katch mcardle tdee',
      'daily caloric expenditure counter'
    ],
    iconName: 'Flame',
    isPopular: true,
    isNew: false,
    formulaDescription: 'BMR (Mifflin) = 10W + 6.25H - 5A + s; TDEE = BMR × Activity Multiplier; Target = TDEE ± Goal Deficit/Surplus',
    formulaLatex: '\\text{BMR} = 10 W_{\\text{kg}} + 6.25 H_{\\text{cm}} - 5 A + s, \\quad \\text{TDEE} = \\text{BMR} \\cdot \\text{PAL}, \\quad \\text{Target} = \\text{TDEE} + \\Delta_{\\text{kcal}}',
    relatedCalculatorIds: [
      'macro-split',
      'macro-nutrient',
      'bmr-calculator',
      'body-fat',
      'bmi',
      'ideal-body-weight'
    ],
    stepByStepInstructions: [
      'Select your preferred Unit System (Imperial ft/in/lbs or Metric cm/kg).',
      'Enter your Biological Sex, Age, Height, and current Body Weight.',
      'Select your preferred BMR equation (Mifflin-St Jeor clinical standard, Revised Harris-Benedict, or Katch-McArdle if body fat % is known).',
      'Choose your Daily Physical Activity Level (Sedentary, Light, Moderate, Heavy, or Athlete).',
      'Select your Primary Body Composition Goal (Maintain, Mild Fat Loss -250 kcal, Standard Fat Loss -500 kcal, Aggressive Cut -750 kcal, or Lean Bulk).',
      'Select a Macronutrient Preset (Balanced, High Protein/Hypertrophy, Low Carb/Keto, or Endurance).',
      'Review your exact daily caloric budget, macronutrient gram allocations, and energy distribution donut chart.'
    ],
    faqs: [
      {
        question: 'What is Total Daily Energy Expenditure (TDEE)?',
        answer: 'TDEE is the total number of calories your body burns in a 24-hour day. It is composed of Basal Metabolic Rate (BMR ~60-70%), Non-Exercise Activity Thermogenesis (NEAT ~15%), Exercise Activity Thermogenesis (EAT ~5-10%), and the Thermic Effect of Food (TEF ~10%).'
      },
      {
        question: 'Which BMR formula is the most accurate?',
        answer: 'The Mifflin-St Jeor equation is widely recognized by the Academy of Nutrition and Dietetics as the most accurate formula for the general population. However, if your body fat percentage is measured reliably via DEXA or hydrostatic weighing, the Katch-McArdle formula provides superior precision by isolating lean body mass.'
      },
      {
        question: 'How large of a calorie deficit should I aim for when losing fat?',
        answer: 'A moderate deficit of 300 to 500 calories per day (equivalent to losing approximately 0.5 to 1.0 pound of body fat per week) is ideal for preserving lean muscle mass, maintaining metabolic rate, and ensuring long-term adherence without extreme hunger or hormonal disruption.'
      },
      {
        question: 'How much protein should I eat per day for muscle retention?',
        answer: 'Sports nutrition research published in the Journal of the International Society of Sports Nutrition (ISSN) recommends 0.7 to 1.0 grams of protein per pound of body weight (1.6 to 2.2 g/kg) for individuals engaged in resistance training, especially during caloric deficits.'
      },
      {
        question: 'What is "metabolic adaptation" during extended dieting?',
        answer: 'As you lose weight and remain in a caloric deficit, your body adapts by downregulating spontaneous physical activity (NEAT) and lowering basal metabolic output. Periodic diet breaks, refeeds, and recalculating your TDEE every 10 lbs lost help maintain continuous progress.'
      },
      {
        question: 'How many calories are in 1 pound of body fat?',
        answer: 'One pound of human adipose tissue contains approximately 3,500 kcal of stored chemical energy. A cumulative weekly deficit of 3,500 kcal (500 kcal/day × 7 days) translates to roughly 1 pound of fat loss.'
      },
      {
        question: 'What is the Thermic Effect of Food (TEF)?',
        answer: 'TEF is the energy required to digest, absorb, and assimilate dietary nutrients. Protein has the highest thermic cost (20-30% of its calories burned during digestion), compared to carbohydrates (5-10%) and dietary fats (0-3%).'
      },
      {
        question: 'Can I build muscle and lose fat at the same time (body recomposition)?',
        answer: 'Yes. Beginners to resistance training, individuals returning from a training hiatus, or those with higher body fat percentages can achieve simultaneous muscle gain and fat loss by maintaining a slight deficit (200-300 kcal), consuming high protein (≥0.8g/lb), and practicing progressive overload.'
      }
    ],
    educationalDisclaimer: 'This calculator provides mathematical energy estimates. Individual metabolic rates vary based on genetics, hormonal health, gut microbiome, and medication. Consult a registered dietitian for medical nutrition therapy.'
  },
  {
    id: 'body-fat',
    title: 'Body Fat Percentage & Lean Mass Calculator',
    slug: 'body-fat-calculator',
    categoryId: 'health',
    shortDescription: 'Calculate body fat percentage, lean body mass, and target fat loss using the U.S. Navy and Deurenberg methods.',
    description: 'Calculate body fat percentage and body composition metrics using the U.S. Navy circumference method (Hodgdon & Beckett), Deurenberg BMI formula, and YMCA equation. Includes American Council on Exercise (ACE) standards and goal weight target planning.',
    keywords: [
      'body fat calculator',
      'navy body fat calculator',
      'lean body mass calculator',
      'body composition calculator',
      'ace body fat percentage chart',
      'fat mass vs lean mass calculator',
      'how to calculate body fat with tape measure',
      'ideal body fat percentage men women'
    ],
    iconName: 'UserCheck',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Male BF% = 86.010 × log10(Waist - Neck) - 70.041 × log10(Height) + 36.76; Female BF% = 163.205 × log10(Waist + Hip - Neck) - 97.684 × log10(Height) - 78.387',
    formulaLatex: '\\text{BF}_{\\text{male}} = 86.010 \\log_{10}(\\text{Waist} - \\text{Neck}) - 70.041 \\log_{10}(\\text{Height}) + 36.76',
    relatedCalculatorIds: [
      'lean-body-mass',
      'ideal-body-weight',
      'bmi',
      'calorie-tdee',
      'macro-nutrient'
    ],
    stepByStepInstructions: [
      'Select your preferred Unit System (Imperial inches/lbs or Metric cm/kg).',
      'Select your Biological Sex and enter your Age, Height, and current Body Weight.',
      'Measure your Waist Circumference horizontally around the narrowest point or across the navel.',
      'Measure your Neck Circumference below the larynx (Adam’s apple).',
      'If Female, measure your Hip Circumference around the widest protrusion of the buttocks.',
      'View your U.S. Navy Body Fat Percentage score, active ACE classification badge, and Lean vs Fat mass breakdown.',
      'Set a Goal Body Fat % to calculate the exact pounds or kilograms of pure fat to lose while preserving 100% of lean muscle.'
    ],
    faqs: [
      {
        question: 'How accurate is the U.S. Navy circumference method?',
        answer: 'The U.S. Navy circumference equation (developed by Drs. Hodgdon and Beckett at the Naval Health Research Center) correlates strongly with hydrostatic (underwater) weighing and DEXA scans, typically maintaining an error margin within ±3–4% when measurements are taken accurately with a tension-calibrated tape.'
      },
      {
        question: 'What are healthy body fat percentage ranges for men and women?',
        answer: 'According to the American Council on Exercise (ACE): For Men: Essential fat 2–5%, Athletes 6–13%, Fitness 14–17%, Average 18–24%, Obese ≥ 25%. For Women: Essential fat 10–13%, Athletes 14–20%, Fitness 21–24%, Average 25–31%, Obese ≥ 32%.'
      },
      {
        question: 'Why do biological women require a higher essential body fat percentage than men?',
        answer: 'Women require approximately 10–13% essential body fat (compared to 2–5% in men) to support hormone production (estrogen and progesterone), reproductive health, menstrual cycle regularity, mammary gland tissue, and insulation for internal reproductive organs.'
      },
      {
        question: 'How do I ensure accurate tape measurements?',
        answer: 'Measure against bare skin without compressing subcutaneous soft tissue. Take measurements in the morning before eating or working out, keep the tape completely horizontal/level, and take the average of 2–3 consecutive readings.'
      },
      {
        question: 'What is the difference between Lean Body Mass (LBM) and Fat-Free Mass (FFM)?',
        answer: 'Fat-Free Mass refers exclusively to non-lipid tissue (water, muscle, bone, and connective tissue). Lean Body Mass includes all fat-free mass plus essential lipids stored in cell membranes, central nervous system, and bone marrow (~3-5% of total mass).'
      },
      {
        question: 'How does DEXA compare to tape measurements?',
        answer: 'Dual-Energy X-ray Absorptiometry (DEXA) scans are considered the clinical gold standard for regional body composition, measuring bone mineral density alongside visceral and subcutaneous fat depots. Circumference methods provide a free, accessible, and highly practical proxy for routine progress tracking.'
      },
      {
        question: 'What happens if body fat drops below essential levels?',
        answer: 'Dropping below essential body fat thresholds (<5% for men, <12% for women) risks severe hormonal disruption, suppression of testosterone/estrogen, extreme fatigue, bradycardia, immune compromise, and bone density loss.'
      },
      {
        question: 'How do I calculate target weight at a lower body fat percentage?',
        answer: 'Target Weight = Current Lean Body Mass / (1 - Target Body Fat Decimal). For example, if you weigh 200 lbs with 20% body fat (160 lbs lean mass), your target weight at 10% body fat is 160 / 0.90 = 177.7 lbs, requiring a loss of 22.3 lbs of pure fat.'
      }
    ],
    educationalDisclaimer: 'Body fat equations provide mathematical estimates and should not replace clinical diagnostic imaging. Consult a healthcare provider or sports dietitian for personalized assessments.'
  },
  {
    id: 'target-heart-rate',
    title: 'Target Heart Rate & Training Zones (Karvonen & Tanaka)',
    slug: 'target-heart-rate-calculator',
    categoryId: 'health',
    shortDescription: 'Calculate maximum heart rate and 5-zone Karvonen aerobic/anaerobic training zones for fat loss, stamina, and peak performance.',
    description: 'Determine your personalized heart rate training zones using the Tanaka, Gulati (women-specific), Gellish, and Karvonen Heart Rate Reserve (HRR) formulas. Accurately target Zone 2 mitochondrial fat oxidation, Zone 3 aerobic tempo, Zone 4 lactate threshold, and Zone 5 VO2 max intervals.',
    keywords: [
      'target heart rate calculator',
      'karvonen formula calculator',
      'zone 2 heart rate calculator',
      'fat burn zone calculator',
      'max heart rate calculator tanaka',
      'heart rate reserve hrr calculator',
      'exercise intensity zones bpm',
      'cardio training zones'
    ],
    iconName: 'Heart',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Tanaka HRmax = 208 - (0.7 × Age); Gulati (Women) HRmax = 206 - (0.88 × Age); Karvonen Target BPM = RestHR + ((HRmax - RestHR) × Intensity %).',
    formulaLatex: '\\text{HR}_{\\text{max}} = 208 - 0.7(\\text{Age}), \\quad \\text{THR} = \\text{HR}_{\\text{rest}} + \\%\\text{Intensity} \\times (\\text{HR}_{\\text{max}} - \\text{HR}_{\\text{rest}})',
    relatedCalculatorIds: [
      'vo2-max-fitness-score',
      'calorie-tdee',
      'marathon-race-finish-time',
      'pace-runner',
      'bmi'
    ],
    stepByStepInstructions: [
      'Select an Athlete or Lifestyle preset (Endurance Runner, Fitness & Fat Loss, Masters Athlete, Senior) or enter custom biometric data.',
      'Enter your Age (years) and Resting Heart Rate (BPM measured upon waking).',
      'Select your Biological Sex to enable sex-specific clinical calibration (such as the Gulati equation for women).',
      'Choose your Max Heart Rate formula (Tanaka, Gulati, Gellish, or Fox & Haskell).',
      'Review your calculated Max HR ($HR_{max}$), Heart Rate Reserve (HRR), and the 5-Tier Karvonen Exercise Intensity Spectrum.',
      'Click on any zone (Zone 1 through Zone 5) to inspect target BPM ranges, physiological benefits, and metabolic substrate/fuel utilization.'
    ],
    faqs: [
      {
        question: 'What is the Karvonen Heart Rate Reserve (HRR) method?',
        answer: 'The Karvonen formula calculates target training zones based on your Heart Rate Reserve (HRR = Max HR - Resting HR) rather than simple percentages of maximum heart rate. Because it factors in resting pulse, it accurately reflects individual cardiovascular fitness levels.'
      },
      {
        question: 'Why is Zone 2 cardio training so heavily recommended for fat burning and longevity?',
        answer: 'Zone 2 (60%–70% HRR) stimulates Type I slow-twitch muscle fibers and maximizes mitochondrial density and capillary growth. At this intensity, cellular energy is primarily derived from fatty acid beta-oxidation rather than glycogen stores.'
      },
      {
        question: 'Which formula is most accurate for estimating Max Heart Rate (HRmax)?',
        answer: 'The Tanaka formula [208 - (0.7 × Age)] has been validated across extensive meta-analyses as significantly more accurate than the traditional Fox formula [220 - Age], which tends to overestimate HRmax in young adults and underestimate it in older adults. For women, the Gulati formula [206 - (0.88 × Age)] provides clinical precision.'
      },
      {
        question: 'How do I accurately measure my Resting Heart Rate (RHR)?',
        answer: 'Measure your pulse immediately upon waking in the morning while still lying quietly in bed, before consuming caffeine or getting up. Count beats for 60 seconds, or check the lowest baseline reading on your biometric smartwatch/chest strap.'
      },
      {
        question: 'What is the difference between Zone 4 (Lactate Threshold) and Zone 5 (VO2 Max)?',
        answer: 'Zone 4 (80%–90% HRR) is the highest sustained pace before blood lactate accumulates faster than the body can clear it (sustainable for ~30–60 minutes). Zone 5 (90%–100% HRR) requires near-maximal neuromuscular power and oxygen uptake, sustainable for only 1–4 minute intervals.'
      },
      {
        question: 'Do medications affect target heart rate zones?',
        answer: 'Yes. Medications like beta-blockers, calcium channel blockers, and asthma inhalers directly alter heart rate kinetics. Individuals taking cardiac medications should consult their physician or use the Rating of Perceived Exertion (RPE / Borg Scale) for training intensity.'
      }
    ],
    educationalDisclaimer: 'Heart rate formulas provide statistical approximations. Actual maximum heart rate varies with individual genetics, temperature, hydration, and fitness. Consult a physician before undertaking vigorous exercise programs.'
  },
  {
    id: 'water-intake',
    title: 'Daily Water Intake & Hydration Calculator',
    slug: 'water-intake-calculator',
    categoryId: 'health',
    shortDescription: 'Calculate personalized daily water intake in Liters, Ounces, and Cups based on body weight, exercise sweat loss, climate, and pregnancy.',
    description: 'Determine your optimal daily fluid intake based on National Academies of Sciences, Engineering, and Medicine (NASEM) and European Food Safety Authority (EFSA) clinical standards. Factors in body mass, sweat rate from physical workouts, ambient heat/humidity, altitude, pregnancy, and lactation with an hourly intake pacing schedule.',
    keywords: [
      'water intake calculator',
      'daily hydration calculator',
      'how much water should i drink a day',
      'fluid ounces of water per day',
      'water intake for weight loss',
      'gallons of water per day calculator',
      'hydration tracker schedule',
      'water intake by body weight'
    ],
    iconName: 'Droplets',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Base Intake = Weight (kg) × 35 mL + (Exercise Minutes × Sweat Rate mL/min) + Climate & Lactation allowances.',
    formulaLatex: '\\text{Water (mL)} = 35 \\times \\text{Weight}_{\\text{kg}} + (\\text{Exercise Min} \\times 12) + \\text{Climate Allowance}',
    relatedCalculatorIds: [
      'calorie-tdee',
      'bmi',
      'target-heart-rate',
      'macro-keto-carb-manager',
      'vo2-max-fitness-score'
    ],
    stepByStepInstructions: [
      'Select your preferred Unit System (Imperial lbs/oz or Metric kg/liters).',
      'Enter your current Body Weight.',
      'Enter your average Daily Exercise Duration (minutes) and select Workout Intensity (Moderate, Intense/HIIT, Endurance).',
      'Select your Environmental Climate (Temperate, Hot & Humid, Arid/Altitude, or Cold & Dry).',
      'Select your Life Stage (Standard Adult, Pregnant, or Breastfeeding).',
      'Optionally choose your Reusable Water Bottle Size (500ml, 750ml, 1L, or 40oz) to see exact daily bottle refills.',
      'Review your total fluid requirements in Liters, Ounces, Glasses, and check the Suggested Hourly Pacing Schedule.'
    ],
    faqs: [
      {
        question: 'How much water should I drink per day based on body weight?',
        answer: 'Clinical guidelines from NASEM recommend a baseline of approximately 35 mL per kilogram of body weight (about 0.5 to 0.6 ounces per pound) in temperate conditions with minimal sweating. A 160 lb person requires roughly 80–95 fluid ounces baseline.'
      },
      {
        question: 'How does exercise sweating affect water requirements?',
        answer: 'Sweat rates range from 0.5 to 2.0 liters per hour during exercise. For moderate workouts, adding 12–16 mL per minute of exercise (about 12–16 oz per 30 minutes) replaces lost fluids and prevents thermal strain and performance degradation.'
      },
      {
        question: 'Does coffee, tea, or soda count towards daily water intake?',
        answer: 'Yes. Research confirms that caffeinated beverages like coffee and tea contribute to total daily fluid intake in habitual consumers without causing significant net dehydration, though pure water remains the ideal non-caloric choice.'
      },
      {
        question: 'What are the physiological risks of drinking too much water (hyponatremia)?',
        answer: 'Over-hydrating without adequate electrolyte intake can dilute blood sodium levels below 135 mEq/L, causing exercise-associated hyponatremia (water intoxication). Signs include headache, nausea, confusion, and muscle swelling. Always balance heavy fluid intake with sodium during intense endurance sessions.'
      },
      {
        question: 'Why do pregnant and breastfeeding women need more fluids?',
        answer: 'During pregnancy, maternal blood volume expands by 40–50% and amniotic fluid is continuously generated (+300 mL/day). Breastfeeding mothers produce ~750–850 mL of breast milk daily, requiring an additional 700–1,000 mL of fluids daily to sustain lactation.'
      },
      {
        question: 'How can I quickly check if I am adequately hydrated?',
        answer: 'The most reliable daily indicator is urine color. Pale straw or lemonade-colored urine indicates optimal hydration. Dark amber indicates dehydration, while completely clear urine throughout the entire day may indicate mild over-hydration.'
      }
    ],
    educationalDisclaimer: 'Hydration formulas provide generalized health estimates. Individuals with congestive heart failure, chronic kidney disease, or on diuretic medications must follow fluid restrictions prescribed by their nephrologist or physician.'
  },

  // Math & Science
  {
    id: 'scientific',
    title: 'Scientific Calculator (Trig, Log, Powers & History Tape)',
    slug: 'scientific-calculator',
    categoryId: 'math',
    shortDescription: 'Full-featured online scientific calculator with trigonometry, inverse functions, logarithms, exponents, roots, factorials, and memory tape.',
    description: 'Perform advanced mathematical, scientific, engineering, and statistical calculations with precision. Includes trigonometric (sin, cos, tan), inverse/hyperbolic functions, natural log (ln) and base-10 log, custom powers ($x^y$), roots ($\\sqrt{x}, \\sqrt[3]{x}$), factorials ($n!$), modulo arithmetic, degree/radian angle switching, and an interactive calculation tape.',
    keywords: [
      'scientific calculator online',
      'free scientific calculator',
      'trigonometry calculator sin cos tan',
      'logarithm natural log ln calculator',
      'exponent and power calculator',
      'factorial calculator n!',
      'radians to degrees calculator',
      'advanced engineering math calculator'
    ],
    iconName: 'Calculator',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Evaluates standard algebraic order of operations (PEMDAS/BODMAS) across transcendental, exponential, trigonometric, and logarithmic functions.',
    formulaLatex: 'f(x) = \\sin(\\theta), \\quad \\log_{10}(x), \\quad \\ln(x), \\quad x^y, \\quad \\sqrt[n]{x}, \\quad n!',
    relatedCalculatorIds: [
      'percentage',
      'algebra-solver',
      'statistics',
      'logarithm-calculator',
      'exponent-power'
    ],
    stepByStepInstructions: [
      'Toggle between RAD (Radians) and DEG (Degrees) depending on your trigonometric problem requirements.',
      'Click INV (Inverse) to switch between standard trig (sin, cos, tan) and inverse functions (arcsin, arccos, arctan) or logarithms and powers ($10^x, e^x$).',
      'Use standard arithmetic operators (+, −, ×, ÷, mod) and parentheses ( ) to group nested expressions.',
      'Compute powers with $x^y$, square roots with $\\sqrt{x}$, cube roots with $\\sqrt[3]{x}$, and factorials with $x!$.',
      'Use memory registers: MC (Memory Clear), MR (Memory Recall), and M+ (Memory Add).',
      'Review your calculated result or click any entry in the Calculation Tape to reload and reuse previous values.'
    ],
    faqs: [
      {
        question: 'What is the difference between Radian (RAD) and Degree (DEG) modes?',
        answer: 'Degrees divide a full circle into 360 units, commonly used in geometry, navigation, and everyday engineering. Radians measure angles based on arc length along a circle ($2\\pi\\text{ radians} = 360^\\circ$), standard in calculus, physics, and advanced mathematical analysis. Be sure to select the correct mode for trigonometry calculations.'
      },
      {
        question: 'What is the order of operations used by this calculator?',
        answer: 'Calcora strictly follows standard PEMDAS/BODMAS algebraic precedence: Parentheses/Brackets first, Exponents/Roots second, Multiplication and Division third (from left to right), and Addition and Subtraction last.'
      },
      {
        question: 'What is the difference between log and ln?',
        answer: 'The log function computes the common logarithm with base 10 [$\\log_{10}(x)$], meaning $\\log(100) = 2$. The ln function computes the natural logarithm with mathematical base $e \\approx 2.71828$ [$\\ln(x)$], fundamental in continuous compounding, physics, and calculus.'
      },
      {
        question: 'Can I use keyboard shortcuts on desktop?',
        answer: 'Yes. You can type numbers (0–9), operators (+, -, *, /), parentheses (), decimal point (.), press Enter or = to evaluate, Backspace to delete, and Escape to clear the display.'
      },
      {
        question: 'How do memory functions (MC, MR, M+) work?',
        answer: 'M+ adds the current displayed value into stored memory. MR (Memory Recall) pastes the stored value onto the screen. MC (Memory Clear) resets the stored memory back to 0.'
      },
      {
        question: 'What is the maximum factorial the calculator can compute?',
        answer: 'Factorials are supported up to $170!$ (which equals $\\approx 7.257 \\times 10^{306}$). Factorials above 170 exceed standard 64-bit IEEE 754 floating-point limits and evaluate to Infinity.'
      }
    ],
    educationalDisclaimer: 'Scientific calculator results are computed using standard IEEE-754 floating-point mathematics. For high-precision cryptographic or quantum physics applications requiring thousands of decimal digits, dedicated arbitrary-precision tools are recommended.'
  },
  {
    id: 'percentage',
    title: 'Percentage Calculator (Value, Share, Change & Reverse %)',
    slug: 'percentage-calculator',
    categoryId: 'math',
    shortDescription: 'Calculate percentages, percentage change, price markups/discounts, percentage share, and reverse percentages with step-by-step solutions.',
    description: 'Solve all fundamental percentage problems instantly: find what $X\\%$ of $Y$ is, determine what percentage one number is of another ($X$ is what $\%$ of $Y$), compute percentage increases or declines between two values, calculate discounts and price markups, and solve reverse percentages (find the original whole).',
    keywords: [
      'percentage calculator',
      'percent change calculator',
      'percent increase calculator',
      'percent decrease calculator',
      'how to calculate percentages',
      'reverse percentage calculator',
      'percent difference calculator',
      'fraction to percent calculator'
    ],
    iconName: 'Percent',
    isPopular: true,
    isNew: false,
    formulaDescription: 'What is P% of X = (P / 100) × X; X is what % of Y = (X / Y) × 100; % Change = ((V2 - V1) / |V1|) × 100; Reverse % = Part / (P / 100).',
    formulaLatex: 'P\\% \\times X = \\frac{P}{100} \\times X, \\quad \\Delta\\% = \\frac{V_2 - V_1}{|V_1|} \\times 100\\%, \\quad \\text{Total} = \\frac{\\text{Part}}{P / 100}',
    relatedCalculatorIds: [
      'scientific',
      'discount-savings',
      'sales-tax-tip',
      'roi-margin',
      'ratio-proportion'
    ],
    stepByStepInstructions: [
      'Select your calculation mode from the top tabs: "What is X% of Y?", "X is what % of Y?", "Percentage Change (%)", "Increase / Decrease", or "Reverse %".',
      'Enter your given numbers in the designated input fields.',
      'Instantly view the calculated result in large bold display typography.',
      'Examine the step-by-step arithmetic breakdown showing decimal conversions and multiplication steps.',
      'Click the "Copy Value" button to copy the answer to your clipboard.'
    ],
    faqs: [
      {
        question: 'How do you calculate a percentage of a number (e.g., 15% of 250)?',
        answer: 'To find a percentage of a number, convert the percentage into a decimal by dividing by 100 (15 ÷ 100 = 0.15), then multiply by the total number (0.15 × 250 = 37.5).'
      },
      {
        question: 'How is percentage change (increase or decrease) calculated?',
        answer: 'Percentage change equals the difference between the new value and original value, divided by the absolute original value, multiplied by 100: % Change = [ (New - Original) ÷ |Original| ] × 100. A positive result indicates growth, while a negative result indicates a decrease.'
      },
      {
        question: 'What is a reverse percentage and how is it solved?',
        answer: 'A reverse percentage finds the original 100% whole when you only know a portion and its percentage. For example, if $75 is 25% of a total amount, the original total is 75 ÷ (25 ÷ 100) = 75 ÷ 0.25 = $300.'
      },
      {
        question: 'What is the difference between percentage change and percentage points?',
        answer: 'Percentage change measures relative growth or decay (e.g., an interest rate moving from 4% to 5% is a 25% relative increase). Percentage points measure direct arithmetic subtraction (5% - 4% = 1 percentage point increase).'
      },
      {
        question: 'How do you calculate a discount (e.g., 20% off $80)?',
        answer: 'Multiply the original price by the discount percentage to get the savings ($80 × 0.20 = $16 savings), then subtract from original price ($80 - $16 = $64 final sale price). Alternatively, multiply by (1 - 0.20) = $80 × 0.80 = $64.'
      },
      {
        question: 'Can percentage change be greater than 100%?',
        answer: 'Yes. If a stock rises from $10 to $30, the increase is $20. (20 ÷ 10) × 100 = 200% increase (the value has tripled).'
      }
    ],
    educationalDisclaimer: 'Percentage calculations are based on standard arithmetic. In business invoicing, always verify whether taxes, shipping fees, or early-payment terms apply before or after discounts.'
  },
  {
    id: 'statistics',
    title: 'Descriptive Statistics & Data Analysis (Mean, Median, Std Dev)',
    slug: 'statistics-calculator',
    categoryId: 'math',
    shortDescription: 'Calculate sample & population mean, median, mode, variance, standard deviation, IQR, quartiles, and frequency histogram.',
    description: 'Perform comprehensive descriptive statistical analysis on any numerical dataset. Computes arithmetic & geometric mean, median, multi-modal identification, sample ($s$) and population ($\\sigma$) standard deviations, variances, standard error of the mean (SEM), quartiles ($Q_1, Q_3$), interquartile range (IQR), skewness, and visualizes data frequency distributions with interactive histograms.',
    keywords: [
      'statistics calculator',
      'mean median mode calculator',
      'standard deviation calculator',
      'sample variance calculator',
      'descriptive statistics calculator',
      'interquartile range IQR calculator',
      'frequency distribution histogram',
      'standard error of mean SEM calculator'
    ],
    iconName: 'BarChart2',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Mean: x̄ = ∑x / n; Sample Variance: s² = ∑(x - x̄)² / (n - 1); Population Std Dev: σ = √(∑(x - μ)² / N); SEM = s / √n.',
    formulaLatex: '\\bar{x} = \\frac{\\sum x_i}{n}, \\quad s = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}}, \\quad \\sigma = \\sqrt{\\frac{\\sum (x_i - \\mu)^2}{N}}, \\quad \\text{IQR} = Q_3 - Q_1',
    relatedCalculatorIds: [
      'scientific',
      'percentage',
      'combination-permutation',
      'standard-deviation-zscore',
      'algebra-solver'
    ],
    stepByStepInstructions: [
      'Enter or paste your dataset into the input area, separating numbers with commas, spaces, or new lines.',
      'Alternatively, click any of the preset example buttons (Exam Scores, Sales Revenue, Reaction Times) for an instant sample.',
      'Review the top summary KPI cards for instant access to Mean, Median, Sample Standard Deviation, and Mode.',
      'Inspect the detailed table for sample vs. population metrics, variance, standard error, quartiles ($Q_1, Q_3$), and skewness.',
      'View the frequency distribution histogram to assess data spread and normality.'
    ],
    faqs: [
      {
        question: 'What is the difference between Sample Standard Deviation (s) and Population Standard Deviation (σ)?',
        answer: 'Sample standard deviation uses Bessel\'s correction dividing by (n - 1) to eliminate downward bias when estimating population parameters from a sample. Population standard deviation divides by N because the entire dataset is known.'
      },
      {
        question: 'What is the Interquartile Range (IQR) and how does it detect outliers?',
        answer: 'IQR is the difference between the 75th percentile (Q3) and 25th percentile (Q1), representing the middle 50% of your data. The standard Tukey outlier fences are Lower Fence = Q1 - 1.5 × IQR and Upper Fence = Q3 + 1.5 × IQR. Values outside these fences are statistical outliers.'
      },
      {
        question: 'When should I use Median instead of Mean?',
        answer: 'Use the median when dealing with skewed distributions or datasets containing severe outliers (e.g., household incomes, real estate house prices). The mean is heavily pulled by extreme values, while the median remains stable.'
      },
      {
        question: 'What does Skewness tell you about the dataset?',
        answer: 'Skewness measures asymmetry. A skewness near 0 indicates a symmetric distribution (bell curve). Positive skewness (> 0) means a long right tail with a few high outliers. Negative skewness (< 0) indicates a long left tail with low outliers.'
      },
      {
        question: 'What is Standard Error of the Mean (SEM)?',
        answer: 'SEM estimates how far the sample mean is likely to be from the true population mean. It is calculated as SEM = s ÷ √n, meaning larger sample sizes yield smaller standard errors and higher precision.'
      }
    ],
    educationalDisclaimer: 'Descriptive statistics describe the features of a specific dataset. For hypothesis testing, confidence intervals, or inferential conclusions about larger populations, verify that your sample meets required distributional and sampling assumptions.'
  },
  {
    id: 'algebra-solver',
    title: 'Algebra & Quadratic Equation Solver (Roots, Vertex & 2x2 Systems)',
    slug: 'algebra-solver',
    categoryId: 'math',
    shortDescription: 'Solve quadratic equations $ax^2 + bx + c = 0$, real/complex roots, discriminant analysis, vertex coordinates, and 2x2 linear systems.',
    description: 'Comprehensive algebraic equation solving engine for mathematics, physics, and engineering. Solves second-degree quadratic polynomials $ax^2 + bx + c = 0$ with full discriminant ($\\Delta = b^2 - 4ac$) analysis, distinct real roots, repeated roots, complex conjugate roots ($u \\pm vi$), parabola vertex $(h, k)$, axis of symmetry, factored polynomials, interactive parabola graphing, and 2x2 systems of linear equations using Cramer\'s determinant rule.',
    keywords: [
      'quadratic equation solver',
      'quadratic formula calculator',
      'roots of quadratic equation',
      'discriminant b2 - 4ac calculator',
      'parabola vertex calculator',
      'system of 2 linear equations calculator',
      'cramer rule calculator 2x2',
      'complex roots calculator algebra'
    ],
    iconName: 'Variable',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Quadratic Formula: x = (-b ± √(b² - 4ac)) / (2a); Discriminant Δ = b² - 4ac; Vertex (h, k) = (-b / 2a, f(h)); Cramer 2x2: x = Dx / D, y = Dy / D.',
    formulaLatex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\Delta = b^2 - 4ac, \\quad (h, k) = \\left(-\\frac{b}{2a}, c - \\frac{b^2}{4a}\\right)',
    relatedCalculatorIds: [
      'scientific',
      'polynomial-solver',
      'pythagorean-theorem',
      'matrix-multiplication',
      'exponent-power'
    ],
    stepByStepInstructions: [
      'Choose between "Quadratic Equation (ax² + bx + c = 0)" or "System of 2 Linear Equations (Cramer\'s Rule)".',
      'Enter the coefficients $a, b,$ and constant $c$ (or choose a preset like Projectile Motion or Factoring Practice).',
      'View the computed roots ($x_1, x_2$), discriminant type (Real vs Complex), vertex coordinates $(h, k)$, and axis of symmetry.',
      'Inspect the factored polynomial form and interactive parabola curve graph.',
      'For linear systems, enter $a_1, b_1, c_1$ and $a_2, b_2, c_2$ to view unique solutions $(x, y)$ or dependency status.'
    ],
    faqs: [
      {
        question: 'What does the Discriminant (Δ = b² - 4ac) indicate?',
        answer: 'The discriminant reveals the nature and number of roots: If Δ > 0, there are two distinct real roots (parabola crosses x-axis twice). If Δ = 0, there is exactly one repeated real root (parabola touches x-axis at vertex). If Δ < 0, there are two complex conjugate roots (parabola never touches x-axis).'
      },
      {
        question: 'How do you find the vertex (h, k) of a parabola?',
        answer: 'The x-coordinate of the vertex is h = -b / (2a). The y-coordinate is found by substituting h back into the equation: k = a(h)² + b(h) + c = c - (b² / 4a). If a > 0, the vertex is the absolute minimum point; if a < 0, it is the maximum point.'
      },
      {
        question: 'What happens if the coefficient a = 0?',
        answer: 'If a = 0, the equation reduces from a quadratic to a linear equation bx + c = 0, which has a single root x = -c / b (provided b ≠ 0).'
      },
      {
        question: 'How does Cramer\'s rule solve a system of 2 linear equations?',
        answer: 'For a system a₁x + b₁y = c₁ and a₂x + b₂y = c₂, Cramer\'s rule computes three 2x2 determinants: D = a₁b₂ - a₂b₁, Dx = c₁b₂ - c₂b₁, and Dy = a₁c₂ - a₂c₁. If D ≠ 0, the unique solution is x = Dx / D and y = Dy / D.'
      },
      {
        question: 'What do complex roots mean in real-world physics?',
        answer: 'In physics (such as harmonic oscillators or AC circuit RLC analysis), complex roots indicate underdamped oscillatory behavior where sinusoidal frequencies are represented by imaginary components.'
      }
    ],
    educationalDisclaimer: 'Algebraic equations are solved using exact closed-form algebraic and trigonometric roots. In physical kinematics and engineering simulations, ensure physical units (e.g. feet vs meters, seconds) remain consistent.'
  },
  {
    id: 'triangle',
    title: 'Triangle Geometry Calculator (SAS, SSS, ASA & Right Triangle)',
    slug: 'triangle-calculator',
    categoryId: 'math',
    shortDescription: 'Solve sides, angles, area (Heron\'s formula), perimeter, altitudes, inradius, circumradius, and live SVG geometry visualizer.',
    description: 'Universal trigonometric and geometric triangle solving engine. Solves all triangle configurations: Side-Angle-Side (SAS), Side-Side-Side (SSS), Angle-Side-Angle (ASA), and 90-degree Right Triangles using the Law of Cosines, Law of Sines, and Pythagorean theorem. Generates exact triangle classifications (Equilateral, Isosceles, Scalene, Acute, Right, Obtuse), altitudes ($h_a, h_b, h_c$), inradius ($r$), circumradius ($R$), and an interactive rendered polygon diagram.',
    keywords: [
      'triangle calculator',
      'triangle solver',
      'law of cosines calculator',
      'law of sines calculator',
      'heron formula area of triangle',
      'right triangle hypotenuse solver',
      'triangle angles and sides calculator',
      'inradius and circumradius calculator'
    ],
    iconName: 'Triangle',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Law of Cosines: c² = a² + b² - 2ab cos(C); Law of Sines: a/sin(A) = b/sin(B) = c/sin(C); Heron\'s Area: A = √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2.',
    formulaLatex: 'c = \\sqrt{a^2 + b^2 - 2ab\\cos(C)}, \\quad \\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)}, \\quad r = \\frac{\\text{Area}}{s}, \\quad R = \\frac{abc}{4\\text{Area}}',
    relatedCalculatorIds: [
      'pythagorean-theorem',
      'circle-calculator',
      'volume-surface-3d',
      'scientific',
      'roof-pitch-rafter'
    ],
    stepByStepInstructions: [
      'Select your given triangle configuration: "Side-Angle-Side (SAS)", "Side-Side-Side (SSS)", "Angle-Side-Angle (ASA)", or "Right Triangle (90°)".',
      'Input the known side lengths or angle degrees in the input fields.',
      'Examine the live SVG triangle preview showing labeled vertices ($A, B, C$) and side lengths.',
      'Review the calculated side lengths, interior angles, total area, perimeter, and inradius/circumradius.',
      'Inspect the complete dimensions and altitudes ($h_a, h_b, h_c$) breakdown table.'
    ],
    faqs: [
      {
        question: 'What is Heron\'s formula for triangle area?',
        answer: 'Heron\'s formula calculates the area of any triangle when all three side lengths (a, b, c) are known without needing the height. Let semi-perimeter s = (a + b + c) / 2. Then Area = √[s(s - a)(s - b)(s - c)].'
      },
      {
        question: 'What is the Triangle Inequality Theorem?',
        answer: 'For three lengths to form a valid geometric triangle, the sum of the lengths of any two sides must be strictly greater than the third side: a + b > c, a + c > b, and b + c > a. If any sum is less than or equal to the third side, no triangle can exist.'
      },
      {
        question: 'What is the difference between the Inradius (r) and Circumradius (R)?',
        answer: 'The Inradius (r = Area / s) is the radius of the largest circle that fits completely inside the triangle (tangent to all 3 sides). The Circumradius (R = abc / 4Area) is the radius of the circle that passes through all three triangle vertices.'
      },
      {
        question: 'When should I use the Law of Cosines vs. the Law of Sines?',
        answer: 'Use the Law of Cosines when you know two sides and the included angle (SAS) or all three sides (SSS). Use the Law of Sines when you know two angles and any side (ASA or AAS) or two sides and a non-included angle (SSA).'
      }
    ],
    educationalDisclaimer: 'Geometric solutions assume Euclidean flat two-dimensional geometry where the sum of angles strictly equals 180 degrees. For spherical surface navigation (e.g. aviation great circles), spherical trigonometry is required.'
  },

  // Conversions
  {
    id: 'unit-converter',
    title: 'Universal Unit Converter (Metric, Imperial & Engineering Units)',
    slug: 'unit-converter',
    categoryId: 'conversions',
    shortDescription: 'Convert 11 categories: length, mass, temperature, volume, area, speed, pressure, energy, power, digital storage, and time.',
    description: 'Universal multi-dimensional unit converter supporting precision metric, imperial, US customary, and SI scientific units. Features real-time two-way conversion, unit swapping, conversion factor display, and a live simultaneous matrix showing converted values across every supported unit in the category.',
    keywords: [
      'unit converter',
      'metric to imperial converter',
      'length converter meters feet inches',
      'weight converter kg lbs ounces',
      'celsius to fahrenheit converter',
      'volume converter liters gallons',
      'pressure converter psi bar kpa',
      'digital storage converter mb gb tb'
    ],
    iconName: 'ArrowLeftRight',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Target Value = (Input Value × Source Ratio) / Target Ratio; Temperature: °F = (°C × 9/5) + 32, K = °C + 273.15, °R = (°C + 273.15) × 1.8.',
    formulaLatex: 'V_{\\text{target}} = \\frac{V_{\\text{input}} \\times R_{\\text{source}}}{R_{\\text{target}}}, \\quad T_{^{\\circ}\\text{F}} = T_{^{\\circ}\\text{C}} \\times \\frac{9}{5} + 32',
    relatedCalculatorIds: [
      'cooking-unit-converter',
      'currency-fx-rate-converter',
      'scientific',
      'percentage',
      'volume-surface-3d'
    ],
    stepByStepInstructions: [
      'Select a measurement category from the top bar (Length, Mass, Temperature, Volume, Area, Speed, Pressure, Energy, Power, Digital Data, Time).',
      'Enter the numerical value you want to convert.',
      'Select the source ("From") unit and the destination ("To") unit from the dropdown menus.',
      'Use the swap button (⇄) to reverse the conversion direction instantly.',
      'Explore the simultaneous equivalents grid below to see the value mapped across all other available units.'
    ],
    faqs: [
      {
        question: 'What is the exact definition of an inch in the metric system?',
        answer: 'Since the 1959 International Yard and Pound agreement, one international inch is defined as exactly 25.4 millimeters (0.0254 meters).'
      },
      {
        question: 'What is the difference between Decimal (KB, MB, GB) and Binary (KiB, MiB, GiB) data prefixes?',
        answer: 'Decimal prefixes (SI standard) use powers of 10 (1 KB = 1,000 bytes, 1 MB = 1,000,000 bytes), commonly used by hard drive manufacturers. Binary prefixes (IEC standard) use powers of 2 (1 KiB = 1,024 bytes, 1 MiB = 1,048,576 bytes), used by operating systems like Windows.'
      },
      {
        question: 'How does US liquid gallon compare to UK imperial gallon?',
        answer: 'A US liquid gallon is defined as 231 cubic inches (~3.78541 liters), whereas a UK Imperial gallon is defined as 4.54609 liters (~1.20095 US gallons).'
      },
      {
        question: 'What is absolute zero in Celsius and Fahrenheit?',
        answer: 'Absolute zero (0 Kelvin) is the theoretical temperature where all thermodynamic entropy and molecular motion cease. It corresponds to -273.15 °C and -459.67 °F.'
      }
    ],
    educationalDisclaimer: 'Conversion factors are based on standard NIST and ISO dimensional definitions. Digital conversions clearly differentiate decimal SI (powers of 10) from binary IEC (powers of 2).'
  },

  // Everyday
  {
    id: 'sales-tax-tip',
    title: 'Sales Tax, Restaurant Tip & Group Bill Splitter',
    slug: 'sales-tax-tip-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate food subtotal, state/local sales tax, gratuity percentage, round-up options, and even group bill splitting.',
    description: 'Comprehensive restaurant dining and hospitality gratuity calculator. Computes exact sales tax, custom tip percentages (10% to 25%+ with quality ratings), pre-tax vs. post-tax gratuity options, dollar round-up formatting, and itemized per-person payment breakdowns with visual cost composition.',
    keywords: [
      'tip calculator',
      'bill splitter calculator',
      'restaurant tip calculator',
      'sales tax calculator',
      'gratuity calculator',
      'split bill per person',
      'dining tip etiquette calculator'
    ],
    iconName: 'Receipt',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Tax = Subtotal × Tax Rate; Tip = (Pre-tax Subtotal) × Tip Rate; Total per Person = (Subtotal + Tax + Tip) / Number of People.',
    formulaLatex: '\\text{Total} = S + S \\cdot r_{\\text{tax}} + S \\cdot r_{\\text{tip}}, \\quad \\text{Per Person} = \\frac{\\text{Total}}{N}',
    relatedCalculatorIds: [
      'discount-savings',
      'percentage',
      'hourly-to-salary',
      'fuel-trip'
    ],
    stepByStepInstructions: [
      'Enter the meal subtotal before taxes and gratuity.',
      'Specify your local sales tax rate percentage.',
      'Select a tip tier (15% Good, 18% Great, 20% Superior, 25% Exceptional) or input a custom tip percentage.',
      'Choose the number of diners splitting the check.',
      'Toggle whether to calculate tip on pre-tax subtotal (standard etiquette) or post-tax total, and optionally round up to the nearest dollar.',
      'View the exact per-person owed amount and itemized subtotal, tax, and tip breakdown.'
    ],
    faqs: [
      {
        question: 'Should tip be calculated on the pre-tax or post-tax subtotal?',
        answer: 'Standard dining etiquette in the United States dictates calculating gratuity on the pre-tax food and beverage subtotal, because tax is a government fee rather than hospitality service provided by the staff.'
      },
      {
        question: 'What are standard tipping percentages in US restaurants?',
        answer: 'Common US restaurant benchmarks are: 15% for acceptable/standard service, 18% for good attentive service, 20% for superior/great service, and 22–25%+ for exceptional fine dining hospitality.'
      },
      {
        question: 'How does rounding up to the nearest dollar work?',
        answer: 'When enabled, the total bill is rounded up to the next whole dollar integer (e.g. $124.32 becomes $125.00), and the difference is automatically added to the server\'s tip.'
      },
      {
        question: 'Does sales tax apply to services or tips?',
        answer: 'In nearly all US jurisdictions, discretionary tips and gratuities are exempt from sales tax. Sales tax is strictly assessed on the food, beverages, and mandatory service charges.'
      }
    ],
    educationalDisclaimer: 'Gratuity customs vary significantly worldwide. In the US and Canada, 15–20% is customary for table service, whereas in many European or East Asian countries, service charges are built into menu prices.'
  },
  {
    id: 'discount-savings',
    title: 'Discount, Sale Price & Stacked Coupon Savings Calculator',
    slug: 'discount-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate final markdown sale prices, stacked multi-coupons, fixed dollar off, BOGO deals, and sales tax.',
    description: 'Advanced retail shopping and commercial pricing discount calculator. Accurately calculates four discount models: Percentage Off (% markdown + secondary stacked promo code + flat coupons), Fixed Dollar Off ($ markdown), BOGO promotional deals (Buy X Get Y Free/Discounted), and Multi-Unit Wholesale Bulk Volume Discounts with state and local sales tax calculations.',
    keywords: [
      'discount calculator',
      'sale price calculator',
      'stacked coupons calculator',
      'percent off calculator',
      'bogo calculator buy one get one',
      'black friday shopping calculator',
      'clearance price savings calculator'
    ],
    iconName: 'Tag',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Net Price = (Original × (1 - Discount1) × (1 - Discount2)) - FixedCoupon; Final Price = Net Price × (1 + SalesTax); Savings = Original - Net Price.',
    formulaLatex: 'P_{\\text{net}} = P_0 (1 - d_1)(1 - d_2) - C, \\quad P_{\\text{final}} = P_{\\text{net}} (1 + r_{\\text{tax}}), \\quad S = P_0 - P_{\\text{net}}',
    relatedCalculatorIds: [
      'sales-tax-tip',
      'percentage',
      'markup-margin',
      'hourly-to-salary'
    ],
    stepByStepInstructions: [
      'Choose a discount model: "Percentage Off (% + Stacked)", "Fixed Amount Off ($ Off)", "BOGO Deals (Buy X, Get Y)", or "Bulk Quantity Tier".',
      'Enter the original item price or select a preset deal (e.g. Black Friday Double Stack, Clearance Markdown, BOGO 50% Off).',
      'Add stacked promotional percentage coupons or fixed dollar vouchers.',
      'Input your local sales tax rate percentage.',
      'Instantly view your final out-of-pocket price, total cash saved, and true effective percentage markdown.'
    ],
    faqs: [
      {
        question: 'How do stacked percentage discounts work (e.g., 40% off + extra 15% off)?',
        answer: 'Stacked discounts apply successively, not additively. For a $100 item with 40% off + 15% off: First, 40% off reduces the price to $60. Then, 15% off $60 saves an additional $9, bringing the subtotal to $51 (an effective 49% discount, not 55%).'
      },
      {
        question: 'How is a BOGO 50% off promotion calculated?',
        answer: 'In a "Buy 1, Get 1 50% Off" deal on two $60 items: The first item costs $60 and the second costs $30, for a total of $90 for two items ($45 each). This equates to an overall 25% discount across the pair.'
      },
      {
        question: 'Is sales tax calculated before or after the store discount?',
        answer: 'In retail purchases, store discounts and manufacturer instant coupons reduce the taxable purchase price, so sales tax is assessed on the discounted net subtotal.'
      },
      {
        question: 'What is the difference between markup and discount?',
        answer: 'A discount is calculated as a percentage deduction from the retail price, whereas markup is the percentage added to the wholesale cost to establish the retail price.'
      }
    ],
    educationalDisclaimer: 'Pricing calculations reflect standard retail cash register point-of-sale algorithms. Some jurisdictions have specific rules regarding manufacturer mail-in rebates or bottle deposit fees.'
  },
  {
    id: 'time-date',
    title: 'Date Duration, Business Days & Chronological Age Calculator',
    slug: 'time-date-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate exact days between dates, business workdays, date addition/subtraction, chronological age, and birthday countdown.',
    description: 'Comprehensive calendar computation and time duration engine. Features exact calendar breakdown (years, months, days), total elapsed days, hours, minutes, seconds, Monday–Friday business workday counts, weekend totals, forward/backward date shift offsets, exact chronological age, next birthday countdown, and astrological zodiac identification.',
    keywords: [
      'date calculator',
      'days between dates calculator',
      'business days calculator',
      'exact age calculator',
      'date addition subtraction calculator',
      'calendar day counter',
      'how many days until date'
    ],
    iconName: 'Calendar',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Elapsed Time = (Date2 - Date1) in milliseconds / 86,400,000; Business Days exclude Saturdays (day 6) and Sundays (day 0); Age computes leap-year adjusted year/month/day calendar offsets.',
    formulaLatex: '\\Delta D = \\left\\lfloor \\frac{t_2 - t_1}{86{,}400{,}000} \\right\\rfloor + 1_{\\text{inclusive}}',
    relatedCalculatorIds: [
      'unit-converter',
      'sales-tax-tip',
      'gpa',
      'scientific'
    ],
    stepByStepInstructions: [
      'Select your calculation mode: "Date Difference & Span", "Add / Subtract Days & Years", or "Exact Age & Birthday Countdown".',
      'For Date Difference: Pick start and end dates from the calendar and toggle inclusive end-day counting.',
      'For Add/Subtract: Pick a base date, select Add or Subtract, and enter the number of years, months, weeks, or days.',
      'For Age: Select your birthdate and target date to view your exact age in years, months, and days, along with biological lifetime heartbeats and breath counts.'
    ],
    faqs: [
      {
        question: 'How are business working days calculated?',
        answer: 'Business working days iterate through every calendar day between the start and end dates, counting Mondays through Fridays while excluding Saturdays and Sundays.'
      },
      {
        question: 'How does the calculator handle leap years?',
        answer: 'The calculator uses standard Gregorian calendar epoch time algorithms, correctly accounting for 29 days in February during leap years (years divisible by 4, except century years not divisible by 400).'
      },
      {
        question: 'What is the difference between calendar months and 30-day months?',
        answer: 'Calendar month calculations respect actual month lengths (28, 29, 30, or 31 days) rather than assuming a fixed 30-day average.'
      },
      {
        question: 'How are lifetime heartbeats and breaths estimated?',
        answer: 'Lifetime biological metrics are estimated using standard resting human physiological averages: approximately 75 heartbeats per minute and 16 breaths per minute over the elapsed lifespan.'
      }
    ],
    educationalDisclaimer: 'Calendar calculations follow the international standard ISO-8601 and Gregorian calendar rules. Statutory public holidays are not automatically excluded from business day totals due to varying regional jurisdictions.'
  },
  {
    id: 'gpa',
    title: 'GPA, Cumulative Grade Target & Final Exam Score Calculator',
    slug: 'gpa-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate college semester GPA, weighted high school AP/Honors GPA, cumulative graduation targets, and required final exam scores.',
    description: 'Comprehensive academic grade point average calculation suite. Computes standard unweighted 4.0 GPA, weighted 5.0 scales (Honors +0.5, AP/IB +1.0), Latin honorific distinctions (Cum Laude, Magna, Summa), cumulative multi-semester target trajectories, and final exam score thresholds needed to secure specific course letter grades.',
    keywords: [
      'gpa calculator',
      'college gpa calculator',
      'weighted gpa calculator',
      'high school ap gpa calculator',
      'final exam grade calculator',
      'target gpa planner',
      'cumulative gpa calculation'
    ],
    iconName: 'GraduationCap',
    isPopular: true,
    isNew: false,
    formulaDescription: 'GPA = ∑(Grade Points × Credits) / ∑(Credits); Required Exam = [Target% - Current% × (1 - ExamWeight%)] / ExamWeight%.',
    formulaLatex: '\\text{GPA} = \\frac{\\sum_{i=1}^n (P_i + w_i) \\cdot C_i}{\\sum_{i=1}^n C_i}, \\quad S_{\\text{final}} = \\frac{G_{\\text{target}} - G_{\\text{cur}}(1 - W)}{W}',
    relatedCalculatorIds: [
      'percentage',
      'time-date',
      'scientific',
      'discount-savings'
    ],
    stepByStepInstructions: [
      'Choose a mode: "Semester / Coursework GPA", "Target Cumulative GPA Planner", or "Final Exam Grade Target".',
      'For Semester GPA: Add your enrolled courses, pick letter grades, specify credit hours, and select academic rigor levels (Regular, Honors, AP/IB).',
      'For Cumulative Target: Input your current GPA and completed credit hours along with your goal GPA to find your required future semester performance.',
      'For Final Exam Target: Enter your current class average, your desired final course grade, and the final exam weight percentage.'
    ],
    faqs: [
      {
        question: 'What is the standard 4.0 college GPA grade conversion scale?',
        answer: 'The standard US college scale assigns: A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, and F = 0.0.'
      },
      {
        question: 'What is the difference between weighted and unweighted GPA?',
        answer: 'Unweighted GPA caps all courses at 4.0 regardless of difficulty. Weighted GPA adds extra grade points for rigorous curricula (typically +0.5 for Honors courses and +1.0 for Advanced Placement / International Baccalaureate courses).'
      },
      {
        question: 'What GPA is required for Latin Honors (Dean\'s List, Cum Laude)?',
        answer: 'While requirements vary by institution, typical benchmarks are: Dean\'s List / Cum Laude (3.50–3.69), Magna Cum Laude (3.70–3.89), and Summa Cum Laude (3.90–4.00).'
      },
      {
        question: 'How do credit hours affect GPA calculation?',
        answer: 'Credit hours serve as mathematical weights. A 4-credit science lab or calculus course affects your cumulative GPA twice as heavily as a 2-credit elective seminar.'
      }
    ],
    educationalDisclaimer: 'Academic grading policies and honors cutoffs vary across universities and school districts. Check with your institution\'s registrar for official transcript weighting guidelines.'
  },
  {
    id: 'fuel-trip',
    title: 'Fuel Cost, Road Trip & EV vs Gas Travel Calculator',
    slug: 'fuel-trip-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate road trip gasoline expenses, carpool passenger splits, EV electricity savings vs gas, and annual commute budgets.',
    description: 'Comprehensive automotive travel and fuel economy calculator. Supports three specialized modes: Road Trip Cost & Carpool Splitting (including highway tolls and round-trip routes), Electric Vehicle (EV) vs Gasoline cost comparison ($/kWh vs $/gal), and Annual Work Commute budget forecasting with wear and toll expenses.',
    keywords: [
      'fuel cost calculator',
      'gas calculator for road trip',
      'trip cost calculator',
      'ev vs gas calculator',
      'carpool gas splitter',
      'commute cost calculator',
      'mpg fuel cost per mile'
    ],
    iconName: 'Fuel',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Gallons = Distance / MPG; Fuel Cost = Gallons × Gas Price; Total = Fuel Cost + Tolls; Per Person = Total / Passengers.',
    formulaLatex: 'C_{\\text{total}} = \\left( \\frac{D}{r_{\\text{mpg}}} \\cdot P_{\\text{fuel}} \\right) + T_{\\text{tolls}}, \\quad C_{\\text{person}} = \\frac{C_{\\text{total}}}{N}',
    relatedCalculatorIds: [
      'sales-tax-tip',
      'unit-converter',
      'hourly-to-salary',
      'discount-savings'
    ],
    stepByStepInstructions: [
      'Choose a mode: "Road Trip Cost & Carpool Split", "Electric Vehicle vs Gas Comparison", or "Annual Work Commute Budget".',
      'For Road Trip: Enter driving distance, toggle round trip if applicable, specify vehicle MPG, gas price per gallon, highway tolls, and number of passengers.',
      'For EV vs Gas: Compare the electricity consumption rate (kWh/100mi) against traditional gasoline MPG to see net dollar energy savings.',
      'For Commute: Input daily one-way commute distance, annual workdays, and tolls to calculate monthly and yearly transportation budgets.'
    ],
    faqs: [
      {
        question: 'How is fuel consumption calculated from distance and MPG?',
        answer: 'Gallons consumed is calculated by dividing total miles driven by your vehicle\'s fuel efficiency rating (MPG). Multiplying gallons by the price per gallon yields the net fuel expense.'
      },
      {
        question: 'How much cheaper is driving an EV compared to a gasoline car?',
        answer: 'On average in the US, an EV consuming 30 kWh per 100 miles at residential electricity rates ($0.16/kWh) costs approximately $0.048 per mile, compared to ~ $0.14 per mile for a 26 MPG gas vehicle at $3.65/gal—yielding a 60–70% energy cost reduction.'
      },
      {
        question: 'Should highway tolls and bridge fees be split equally among carpoolers?',
        answer: 'Yes, fair carpool etiquette splits all direct shared transit costs (fuel, turnpike tolls, and parking fees) evenly across all vehicle occupants.'
      },
      {
        question: 'How does city vs highway driving affect trip estimates?',
        answer: 'Stop-and-go city driving reduces internal combustion vehicle efficiency by 20–30% compared to highway cruising, while regenerative braking in EVs often makes city driving more efficient than high-speed highway travel.'
      }
    ],
    educationalDisclaimer: 'Fuel consumption varies based on driving habits, terrain, vehicle cargo payload, tire pressure, and air conditioning usage.'
  },

  // Construction
  {
    id: 'construction',
    title: 'Concrete Slabs, Mulch, Drywall & Framing Material Calculator',
    slug: 'concrete-material-calculator',
    categoryId: 'construction',
    shortDescription: 'Calculate concrete cubic yards and bag counts, landscape gravel/mulch volume, drywall sheets, and wall framing studs.',
    description: 'Comprehensive general construction, masonry, and DIY building material calculator. Computes exact cubic yards, cubic feet, 80lb/60lb/50lb pre-mixed concrete bags for rectangular slabs and round sonotube piers, bulk landscape mulch and stone tons, sheetrock drywall panels with mud/screw estimates, and 16"/24" on-center wall framing studs with plates.',
    keywords: [
      'concrete calculator',
      'concrete slab calculator',
      'cubic yards calculator',
      'how many bags of concrete',
      'mulch yardage calculator',
      'drywall sheet calculator',
      'wall framing stud calculator',
      'diy construction calculator'
    ],
    iconName: 'Hammer',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Concrete Yardage = (Length × Width × Depth / 27) × (1 + Waste%); 80lb Bags = Total Cu Ft / 0.60; Studs = (Wall Inches / Spacing) + 1 + Waste.',
    formulaLatex: 'V_{\\text{yd}^3} = \\frac{L \\cdot W \\cdot (D/12)}{27} \\cdot (1 + w), \\quad N_{\\text{bags}} = \\left\\lceil \\frac{V_{\\text{ft}^3}}{0.60} \\right\\rceil',
    relatedCalculatorIds: [
      'unit-converter',
      'triangle',
      'fuel-trip',
      'discount-savings'
    ],
    stepByStepInstructions: [
      'Select a construction material category: "Concrete Slabs & Piers", "Gravel, Mulch & Soil", "Drywall & Sheathing", or "Wall Framing Studs".',
      'For Concrete: Enter length, width, and thickness in inches (or diameter and depth for round piers) and select a waste factor (typically 10%).',
      'For Gravel/Mulch: Enter square footage and bed depth to calculate required bulk cubic yards and crushed stone tonnage.',
      'For Drywall & Framing: Calculate total sheets, screws, compound mud, or on-center 2×4 framing studs with top/bottom plates.'
    ],
    faqs: [
      {
        question: 'How many cubic feet does an 80 lb bag of concrete yield?',
        answer: 'A standard 80-pound bag of pre-mixed concrete yields approximately 0.60 cubic feet of mixed concrete. A 60-pound bag yields 0.45 cubic feet, and a 50-pound bag yields 0.375 cubic feet.'
      },
      {
        question: 'How many bags of 80 lb concrete make one cubic yard?',
        answer: 'One cubic yard equals 27 cubic feet. Dividing 27 by 0.60 yields 45 bags of 80 lb concrete per cubic yard (without waste).'
      },
      {
        question: 'Why is a 10% waste factor recommended for concrete slabs?',
        answer: 'A 5–10% margin accounts for subgrade soil unevenness, formwork deflection, spillage during pouring, and minor measurement inaccuracies.'
      },
      {
        question: 'What is standard wall stud spacing (16" vs 24" on-center)?',
        answer: '16 inches on-center (OC) is standard for load-bearing and residential structural walls. 24 inches OC is often used in non-load-bearing interior partition walls or advanced framing systems.'
      }
    ],
    educationalDisclaimer: 'Material estimates are based on standard nominal manufacturing dimensions and theoretical geometries. Verify specific local building codes and structural engineer requirements before ordering.'
  },

  // Batch 1 New Calculators
  {
    id: 'student-loan-refinance',
    title: 'Student Loan Refinancing & Interest Savings Calculator',
    slug: 'student-loan-refinance-calculator',
    categoryId: 'finance',
    shortDescription: 'Compare current vs refinanced student loan interest rates, monthly payment changes, origination fees, and lifetime interest savings.',
    description: 'Calculate potential interest savings and monthly payment reductions by refinancing federal or private student loans at lower market interest rates. Accurately compares existing monthly payments, lifetime financing charges, term length adjustments, and upfront processing fees.',
    keywords: [
      'student loan refinance calculator',
      'student debt payoff calculator',
      'student loan interest savings',
      'refinance student loans',
      'lower student loan payment',
      'private student loan refinancing'
    ],
    iconName: 'GraduationCap',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Monthly Payment M = P × [r(1+r)^n] / [(1+r)^n - 1]; Lifetime Savings = Total Interest (Current) - [Total Interest (New) + Fees].',
    formulaLatex: 'M = P \\cdot \\frac{r(1+r)^n}{(1+r)^n - 1}, \\quad S = I_{\\text{old}} - (I_{\\text{new}} + F_{\\text{fees}})',
    relatedCalculatorIds: ['mortgage', 'credit-card-payoff', 'compound-interest', 'gpa'],
    stepByStepInstructions: [
      'Enter your current remaining student loan balance.',
      'Input your current annual interest rate and remaining repayment term in years.',
      'Specify the new lower interest rate and loan term offered by the refinancing lender.',
      'Add any upfront origination or processing fees included in the new loan.',
      'Evaluate your new monthly payment, total lifetime interest savings, and net payoff comparison.'
    ],
    educationalDisclaimer: 'Refinancing federal student loans with a private commercial lender will permanently forfeit federal benefits including Income-Driven Repayment (IDR/SAVE), Public Service Loan Forgiveness (PSLF), and federal administrative forbearance.',
    faqs: [
      {
        question: 'When is student loan refinancing most beneficial?',
        answer: 'Refinancing is most advantageous when you have high-interest private student loans, an improved credit score (typically 670+), a stable income, and the ability to lock in a significantly lower interest rate.'
      },
      {
        question: 'Will refinancing federal student loans eliminate federal protections?',
        answer: 'Yes. Transferring federal student loans to a private lender permanently removes eligibility for Income-Driven Repayment plans, Public Service Loan Forgiveness (PSLF), and government deferment programs.'
      },
      {
        question: 'What is the difference between refinancing and federal consolidation?',
        answer: 'Federal Direct Consolidation combines multiple federal loans into a single federal loan with a weighted average interest rate rounded up to the nearest 1/8%. Private refinancing replaces loans with a new private loan at a lower market interest rate based on your creditworthiness.'
      },
      {
        question: 'How does extending the loan term affect total interest?',
        answer: 'Extending your repayment term (e.g. from 10 to 15 years) lowers your monthly payment obligation, but may increase the total cumulative interest paid over the life of the loan even with a lower interest rate.'
      }
    ],
  },
  {
    id: 'retirement-401k',
    title: '401(k) Retirement Savings, Employer Match & 4% Withdrawal Calculator',
    slug: 'retirement-401k-calculator',
    categoryId: 'finance',
    shortDescription: 'Project 401(k) nest egg growth, employer matching contributions, annual salary raises, and safe monthly withdrawal income.',
    description: 'Determine your projected retirement nest egg based on current age, target retirement age, current savings, salary growth, employee elective deferral rate, employer company match tiers, and compound annual investment return rates. Includes the Trinity Study 4% safe withdrawal rule forecast.',
    keywords: [
      '401k calculator',
      'retirement calculator',
      '401k employer match calculator',
      'nest egg growth calculator',
      'retirement savings projection',
      '4% safe withdrawal rule',
      'ira 401k investment growth'
    ],
    iconName: 'PiggyBank',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Balance_{t} = (Balance_{t-1} + C_{\\text{employee}} + C_{\\text{employer}}) × (1 + r); Safe Monthly Income = (Nest Egg × 0.04) / 12.',
    formulaLatex: 'B_{t} = \\left( B_{t-1} + C_{e,t} + C_{m,t} \\right) \\cdot (1 + r), \\quad I_{\\text{monthly}} = \\frac{B_{\\text{final}} \\cdot 0.04}{12}',
    relatedCalculatorIds: ['compound-interest', 'roi-margin', 'mortgage', 'hourly-to-salary'],
    stepByStepInstructions: [
      'Enter your current age and planned retirement age to establish your investment time horizon.',
      'Input your current 401(k) balance and current annual gross salary.',
      'Specify your elective contribution percentage (e.g. 8% or 10%).',
      'Configure your employer matching terms (e.g. 50% match up to 6% of salary).',
      'Set an estimated annual investment rate of return (historically 6%–8% for diversified stock/bond portfolios) and expected annual salary growth.',
      'Review your projected total nest egg, total employer matching received, compound gains, and estimated 4% rule monthly retirement income.'
    ],
    educationalDisclaimer: 'Retirement projections are educational estimates based on assumed constant annual rates of return. They do not account for future market volatility, sequence-of-returns risk, inflation adjustments, IRS annual contribution limits, or income taxation upon distribution.',
    faqs: [
      {
        question: 'What is an employer 401(k) match and how does it work?',
        answer: 'An employer match is company-sponsored compensation added directly to your retirement account based on your contributions. For example, a "50% match up to 6%" means if you contribute 6% of your salary, your employer contributes an additional 3%—delivering an immediate 50% return on your contributed capital.'
      },
      {
        question: 'What is the 4% safe withdrawal rule?',
        answer: 'Originating from the Trinity Study, the 4% rule states that retirees who withdraw 4% of their portfolio in the first year of retirement (adjusted for inflation thereafter) have a historically high probability of maintaining their savings across a 30-year retirement.'
      },
      {
        question: 'What happens if I contribute beyond the employer match cap?',
        answer: 'Contributing above the company match cap continues to grow tax-advantaged (or tax-free in a Roth 401k) up to IRS annual elective deferral limits ($23,000 in 2024, plus $7,500 catch-up for age 50+).'
      },
      {
        question: 'How does compound interest accelerate a 401(k) over 30 years?',
        answer: 'In the early years, personal contributions make up the majority of account growth. Over 20–30 years, compounding returns on accumulated balances begin generating more growth annually than annual salary contributions combined.'
      }
    ],
  },
  {
    id: 'macro-nutrient',
    title: 'Macro Nutrient Split & Meal Grams Calculator',
    slug: 'macro-nutrient-calculator',
    categoryId: 'health',
    shortDescription: 'Calculate daily protein, carbohydrate, and fat gram targets and per-meal distributions for fitness goals.',
    description: 'Tailor daily macronutrient targets in grams and calories based on your total caloric target and dietary strategy: balanced nutrition, high-protein fat cutting, muscle-building bulking, low-carb, ketogenic, or custom percentage splits. Includes per-meal breakdown for 3 to 6 meals per day.',
    keywords: [
      'macro calculator',
      'macronutrient ratio calculator',
      'protein grams calculator',
      'carbs and fats calculator',
      'keto macro calculator',
      'cutting bulking macros',
      'macro meal split calculator'
    ],
    iconName: 'Apple',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Protein (g) = (Calories × P%) / 4; Carbs (g) = (Calories × C%) / 4; Fat (g) = (Calories × F%) / 9.',
    formulaLatex: 'P_g = \\frac{E_{\\text{cal}} \\cdot \\%P}{4}, \\quad C_g = \\frac{E_{\\text{cal}} \\cdot \\%C}{4}, \\quad F_g = \\frac{E_{\\text{cal}} \\cdot \\%F}{9}',
    relatedCalculatorIds: ['calorie-tdee', 'bmi', 'body-fat', 'ideal-body-weight'],
    stepByStepInstructions: [
      'Enter your total target daily calorie intake in kilocalories (kcal).',
      'Select a goal preset (Balanced, Cutting/High-Protein, Bulking/High-Carb, Low-Carb, Ketogenic, or Custom).',
      'Adjust macro ratio percentages if using a custom split (ensuring total equals 100%).',
      'Select your daily meal frequency (3, 4, 5, or 6 meals per day).',
      'View your daily protein, carbohydrate, and fat targets in grams, along with per-meal targets.'
    ],
    educationalDisclaimer: 'Macronutrient targets are general dietary guidelines for healthy adults. Nutritional requirements vary based on medical conditions, training intensity, and metabolic individuality. Consult a registered sports dietitian before making drastic dietary changes.',
    faqs: [
      {
        question: 'How many calories are in 1 gram of protein, carb, and fat?',
        answer: 'Protein provides 4 kcal per gram, Carbohydrates provide 4 kcal per gram, and Dietary Fats provide 9 kcal per gram.'
      },
      {
        question: 'What is the optimal macro ratio for fat loss while preserving muscle?',
        answer: 'A high-protein cutting split (e.g. 40% protein, 30% carbohydrates, 30% fats) provides ample amino acids to preserve lean skeletal muscle mass during caloric restriction.'
      },
      {
        question: 'Why are fats higher in calories per gram than protein and carbs?',
        answer: 'Dietary triglycerides possess a higher ratio of carbon-hydrogen bonds and less oxygen, allowing them to store more concentrated chemical energy (9 kcal/g vs 4 kcal/g).'
      },
      {
        question: 'How much protein should strength athletes consume daily?',
        answer: 'Clinical sports nutrition guidelines generally recommend 1.6 to 2.2 grams of protein per kilogram of body weight (0.7–1.0 g per pound) for active resistance training individuals.'
      }
    ],
  },
  {
    id: 'hourly-to-salary',
    title: 'Hourly Wage to Salary & Paycheck Converter',
    slug: 'hourly-to-salary-calculator',
    categoryId: 'everyday',
    shortDescription: 'Convert hourly wages to gross annual salary, monthly, semi-monthly, bi-weekly, weekly, and daily paychecks.',
    description: 'Convert between hourly wages and annual gross salaries in both directions. Accurately factors in work hours per week, unpaid vacation weeks, overtime pay (1.5x / 2.0x rates), annual bonuses, and standard 26 bi-weekly vs 24 semi-monthly pay periods.',
    keywords: [
      'hourly to salary calculator',
      'hourly wage converter',
      'salary to hourly calculator',
      'biweekly paycheck calculator',
      'convert hourly rate to annual income',
      'overtime pay converter',
      'unpaid vacation salary impact',
      '2080 work hours conversion'
    ],
    iconName: 'DollarSign',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Annual Salary = (Hours/Week × Hourly Wage + Overtime Hours × 1.5 × Wage) × Paid Weeks + Bonus; Bi-Weekly = Annual / 26; Monthly = Annual / 12',
    formulaLatex: 'S_{\\text{annual}} = \\left( H_{\\text{reg}} \\cdot W_{\\text{base}} + 1.5 H_{\\text{OT}} \\cdot W_{\\text{base}} \\right) \\cdot (52 - U_{\\text{unpaid}}) + B_{\\text{bonus}}, \\quad P_{\\text{biweekly}} = \\frac{S_{\\text{annual}}}{26}',
    relatedCalculatorIds: [
      'overtime-pay',
      'self-employment-tax-1099',
      'federal-income-tax-bracket',
      'emergency-fund',
      'savings-goal-timeline'
    ],
    stepByStepInstructions: [
      'Select your conversion mode: "Hourly Rate → Salary" or "Salary → Hourly Rate".',
      'Enter your base Hourly Wage OR target Gross Annual Salary.',
      'Specify your standard working hours per week (default 40 hrs/week) and working days per week.',
      'Input any Unpaid Vacation Weeks / Time Off per year (e.g. 2 weeks).',
      'Optionally add regular weekly Overtime Hours (compensated at 1.5x) and Annual Bonuses.',
      'Review your comprehensive gross income breakdown across Annual, Monthly, Semi-Monthly, Bi-Weekly, Weekly, and Daily frequencies.',
      'Examine the interactive Pay Period Allocation Chart comparing base earnings against overtime and bonuses.'
    ],
    faqs: [
      {
        question: 'How do you convert an hourly wage to an annual salary?',
        answer: 'Multiply your hourly wage by the number of hours you work per week, then multiply by the number of paid working weeks in a year (typically 52 weeks for full-time salaried or PTO positions). A standard quick rule of thumb is multiplying your hourly wage by 2,080 (40 hours × 52 weeks).'
      },
      {
        question: 'What is the quick "double the hourly rate" rule of thumb?',
        answer: 'To quickly estimate full-time annual salary, multiply your hourly rate by 2 and add three zeros. For example, $35/hour × 2 = 70 → ~$70,000/year (exact is 35 × 2,080 = $72,800).'
      },
      {
        question: 'How many paychecks are in a bi-weekly vs semi-monthly pay schedule?',
        answer: 'Bi-weekly employees receive 26 paychecks per year (paid every two weeks, meaning two months each year have three paychecks). Semi-monthly employees receive 24 paychecks per year (paid twice a month, typically on the 1st and 15th).'
      },
      {
        question: 'How do unpaid vacation weeks affect annual salary calculations?',
        answer: 'If you take 2 weeks of unpaid vacation, you only work and get paid for 50 weeks per year (2,000 hours instead of 2,080). At $30/hour, taking 2 unpaid weeks reduces gross annual pay from $62,400 to $60,000 ($2,400 reduction).'
      },
      {
        question: 'How is overtime calculated for non-exempt hourly employees under the FLSA?',
        answer: 'Under the Fair Labor Standards Act (FLSA), covered non-exempt employees must receive overtime pay for hours worked over 40 in a workweek at a rate of at least 1.5 times their regular rate of pay.'
      },
      {
        question: 'Does this calculator display gross or net take-home pay?',
        answer: 'This calculator computes gross earnings before federal and state income taxes, FICA (Social Security & Medicare), health insurance premiums, and 401(k) retirement contributions are withheld.'
      },
      {
        question: 'How do I convert my annual salary into an hourly wage when negotiating pay?',
        answer: 'Divide your target annual salary by total annual hours worked (e.g. $85,000 / 2,080 = $40.87/hour). If you are expected to work 45 hours per week uncompensated, divide by 2,340 hours ($36.32/hour).'
      },
      {
        question: 'What is the difference between exempt and non-exempt employment?',
        answer: 'Exempt employees receive a fixed annual salary and do not qualify for overtime pay, regardless of how many hours they work. Non-exempt employees must be paid overtime (1.5x) for every hour worked beyond 40 per week.'
      }
    ],
    educationalDisclaimer: 'This wage and salary calculator provides gross pre-tax income estimates based on standard pay period schedules. Actual take-home pay depends on payroll tax withholdings and benefit deductions.'
  },
  {
    id: 'markup-margin',
    title: 'Markup & Profit Margin Pricing Calculator',
    slug: 'markup-margin-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate gross profit margin %, cost markup %, dollar profit, and target retail selling prices.',
    description: 'Master the essential difference between Markup % (profit relative to wholesale cost) and Profit Margin % (profit relative to retail selling price). Supports 3 calculation modes: finding margin/markup from cost and selling price, calculating price from target markup, or solving target selling price from desired gross margin.',
    keywords: [
      'markup calculator',
      'profit margin calculator',
      'gross margin percentage',
      'cogs selling price calculator',
      'markup vs margin',
      'retail pricing formula',
      'gross profit dollar calculator'
    ],
    iconName: 'TrendingUp',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Markup % = (Gross Profit / Cost) × 100; Profit Margin % = (Gross Profit / Revenue) × 100; Selling Price = Cost / (1 - Margin%).',
    formulaLatex: '\\text{Markup}\\% = \\frac{P - C}{C} \\cdot 100, \\quad \\text{Margin}\\% = \\frac{P - C}{P} \\cdot 100, \\quad P = \\frac{C}{1 - m}',
    relatedCalculatorIds: ['roi-margin', 'discount-savings', 'sales-tax-tip', 'hourly-to-salary'],
    stepByStepInstructions: [
      'Select your calculation goal: "Given Cost Price & Selling Price", "Given Cost Price & Desired Markup %", or "Given Cost Price & Desired Profit Margin %".',
      'Enter your item Cost of Goods Sold (COGS).',
      'Provide the second variable (Selling Price, Markup %, or Margin %).',
      'Instantly calculate dollar gross profit, profit margin percentage, markup percentage, and required customer retail price.'
    ],
    educationalDisclaimer: 'This calculator computes gross profit margin before operating overhead, sales commissions, merchant payment processing fees, and income taxes are applied.',
    faqs: [
      {
        question: 'What is the fundamental difference between markup and profit margin?',
        answer: 'Markup measures the percentage added on top of your wholesale cost price (Profit / Cost), whereas profit margin measures what percentage of your final revenue is retained as profit (Profit / Selling Price).'
      },
      {
        question: 'Why is profit margin percentage always lower than markup percentage?',
        answer: 'Because selling price (the revenue denominator in margin) is always larger than cost (the denominator in markup). For example, a 50% markup ($50 cost sold for $75) produces a 33.33% profit margin.'
      },
      {
        question: 'How do you price an item to guarantee a 40% profit margin?',
        answer: 'Divide your cost by (1 - 0.40) or 0.60. If your wholesale cost is $60, price the item at $60 / 0.60 = $100. (Note: adding 40% to $60 yields $84, which is only a 28.5% margin).'
      },
      {
        question: 'Can a profit margin ever exceed 100%?',
        answer: 'No. Since profit cannot exceed total revenue (unless cost is negative), gross margin cannot mathematically exceed 100%. Markup, however, can exceed 100%, 500%, or 1000%.'
      }
    ],
  },
  {
    id: 'paint-coverage',
    title: 'Paint Coverage, Gallons & Room Surface Estimator',
    slug: 'paint-coverage-calculator',
    categoryId: 'construction',
    shortDescription: 'Estimate paint gallons, quarts, primer coats, and total material cost for walls and ceilings minus windows and doors.',
    description: 'Accurately calculate interior paint gallons and quarts required for home renovation and DIY painting projects. Computes net wall surface area by deducting standard doors (21 sq ft) and windows (15 sq ft), supports optional ceiling painting and primer coats, and adapts to standard latex (350 sq ft/gal), high-hide premium (400 sq ft/gal), or porous masonry surfaces.',
    keywords: [
      'paint calculator',
      'paint coverage calculator',
      'how many gallons of paint',
      'room paint estimator',
      'wall square footage paint',
      'ceiling paint calculator',
      'interior painting cost estimator'
    ],
    iconName: 'Palette',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Net Area = [2(L + W) × H] - (Doors × 21 + Windows × 15) + Ceiling Area; Gallons = ⌈(Net Area × Coats) / Coverage Rating⌉.',
    formulaLatex: 'A_{\\text{net}} = 2(L + W)H - (21 D + 15 W_n) + A_{\\text{ceil}}, \\quad N_{\\text{gal}} = \\left\\lceil \\frac{A_{\\text{net}} \\cdot C_{\\text{coats}}}{\\text{Cov}_{\\text{gal}}} \\right\\rceil',
    relatedCalculatorIds: ['construction', 'tile-grout', 'unit-converter', 'discount-savings'],
    stepByStepInstructions: [
      'Select a common room preset (Bedroom, Living Room, Master Suite, Bathroom) or enter custom dimensions.',
      'Input the room length, width, and ceiling wall height.',
      'Specify the number of doors and windows to deduct their non-painted surface area.',
      'Choose the number of paint coats (2 coats recommended for optimal color depth).',
      'Toggle whether to include ceiling surface area or add a separate coat of primer.',
      'Select the paint coverage rating and gallon price to view purchased gallons, quarts equivalent, and total estimated paint cost.'
    ],
    educationalDisclaimer: 'Paint absorption depends heavily on surface texture, substrate porosity, and existing paint color depth. Painting unprimed raw drywall or shifting from dark to light shades often requires additional primer and paint.',
    faqs: [
      {
        question: 'How many square feet does 1 gallon of paint cover?',
        answer: 'One standard gallon of interior wall paint covers approximately 350 to 400 square feet with a single coat on smooth, pre-primed surfaces. Heavily textured or unprimed surfaces yield closer to 250 square feet per gallon.'
      },
      {
        question: 'How many coats of paint are typically necessary?',
        answer: 'Two coats are standard for interior walls to achieve uniform sheen, hide underlying drywall patches, and ensure true color vibrancy. Drastic color transitions (e.g. dark navy to off-white) may require a tinted primer plus two topcoats.'
      },
      {
        question: 'How much area do standard doors and windows occupy?',
        answer: 'A standard interior passage door occupies approximately 21 square feet (3×7 ft), while an average window frame occupies roughly 15 square feet (3×5 ft).'
      },
      {
        question: 'When should I purchase quarts instead of full gallons?',
        answer: 'If your remaining paint requirement after full gallons is less than 0.25 gallons (or for small accent walls/powder rooms under 100 sq ft), purchasing quarts (1 quart = 1/4 gallon) is more economical than opening an extra gallon.'
      }
    ],
  },
  {
    id: 'tile-grout',
    title: 'Tile Count & Dry Grout Weight Estimator',
    slug: 'tile-grout-calculator',
    categoryId: 'construction',
    shortDescription: 'Calculate individual floor or wall tile counts, cutting waste factor %, and dry grout pounds.',
    description: 'Accurately estimate individual tile quantities and dry grout powder weight (in pounds) needed for floor, shower wall, backsplash, or outdoor patio installations. Accurately factors in tile dimensions (length, width, thickness), grout joint spacing width, pattern cutting waste (10–20%), and material cost per square foot.',
    keywords: [
      'tile calculator',
      'grout calculator',
      'how many tiles do i need',
      'tile square footage calculator',
      'grout coverage calculator',
      'dry grout pounds estimator',
      'tile waste percentage'
    ],
    iconName: 'Grid',
    isPopular: false,
    isNew: false,
    formulaDescription: 'Tile Count = ⌈(Room Area Sq In / Effective Tile Area Sq In) × (1 + Waste%)⌉; Grout (lbs) = Area Sq Ft × [((L + W) × Joint × Thickness × 1.55) / (L × W)] × 1.15.',
    formulaLatex: 'N_{\\text{tiles}} = \\left\\lceil \\frac{144 \\cdot A_{\\text{room}}}{(L + j)(W + j)} \\cdot (1 + w) \\right\\rceil, \\quad G_{\\text{lbs}} = 1.15 A_{\\text{room}} \\cdot \\frac{(L + W) \\cdot j \\cdot t \\cdot 1.55}{L \\cdot W}',
    relatedCalculatorIds: ['flooring-tile', 'construction', 'paint-coverage', 'unit-converter'],
    stepByStepInstructions: [
      'Enter the room floor or wall length and width in feet to calculate total square footage.',
      'Input the length and width of individual tiles in inches (e.g. 12×12, 12×24 subway, or 24×24 porcelain).',
      'Enter the grout joint spacing width (e.g. 1/8" = 0.125 in, 1/16" = 0.0625 in) and tile thickness.',
      'Specify the tile cutting waste percentage (10% standard straight grid, 15% diagonal/herringbone).',
      'Provide your tile price per square foot to compute overall material expense.',
      'Review the total individual tile count, total square feet to order, estimated dry grout bags/weight, and total estimated cost.'
    ],
    educationalDisclaimer: 'Always purchase 10% to 15% extra tile beyond calculated square footage to accommodate edge cuts, transit breakage, pattern matching, and future dye-lot replacements.',
    faqs: [
      {
        question: 'How much tile cutting waste buffer should I purchase?',
        answer: 'For standard straight grid layouts in square rooms, add 10% for cutting waste. For diagonal/herringbone patterns, offset brick joints, or rooms with numerous doors and alcoves, budget 15% to 20% extra tile.'
      },
      {
        question: 'How do tile dimensions affect dry grout weight required?',
        answer: 'Smaller tiles (like 2×2 or 3×6 subway tiles) create significantly more linear feet of grout joints per square foot of surface area, requiring 3 to 5 times more grout powder than large-format 24×24 tiles.'
      },
      {
        question: 'What is the standard grout joint width for rectified porcelain vs ceramic tiles?',
        answer: 'Rectified porcelain with machine-cut sharp 90-degree edges typically uses 1/16" to 1/8" grout joints. Non-rectified or handmade ceramic tiles with pillowed/uneven edges generally require 3/16" to 1/4" joints.'
      },
      {
        question: 'Should I use sanded or unsanded grout?',
        answer: 'Use unsanded grout for narrow joints under 1/8" (such as polished marble or wall tiles) to prevent scratching. Use sanded grout for joints 1/8" or wider for increased structural strength and shrink resistance.'
      }
    ],
  },
  {
    id: 'circle-calculator',
    title: 'Circle Area, Circumference, Arc & Sector Calculator',
    slug: 'circle-calculator',
    categoryId: 'math',
    shortDescription: 'Solve circle radius, diameter, circumference, surface area, arc length, and sector area.',
    description: 'Perform instantaneous geometric solutions for any circle. Given any single known property (radius, diameter, circumference, or total surface area), this engine computes all remaining properties along with circular arc lengths and sector areas for any central angle in degrees.',
    keywords: [
      'circle calculator',
      'area of a circle',
      'circumference of a circle',
      'circle radius solver',
      'diameter to area',
      'arc length calculator',
      'circle sector area calculator'
    ],
    iconName: 'Circle',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Area A = πr²; Circumference C = 2πr = πd; Arc Length s = (θ/360) × 2πr; Sector Area = (θ/360) × πr².',
    formulaLatex: 'A = \\pi r^2, \\quad C = 2\\pi r = \\pi d, \\quad s = \\frac{\\theta}{360^\\circ} \\cdot 2\\pi r, \\quad A_{\\text{sector}} = \\frac{\\theta}{360^\\circ} \\cdot \\pi r^2',
    relatedCalculatorIds: ['triangle', 'scientific', 'unit-converter', 'percentage'],
    stepByStepInstructions: [
      'Select the known circle measurement (Radius r, Diameter d, Circumference C, or Area A).',
      'Enter the numerical value for your selected parameter.',
      'Optionally specify a Central Angle in degrees (0° to 360°) to solve sub-circular segments.',
      'Instantly view calculated Radius, Diameter, Circumference, Total Area, Arc Length, and Sector Area.'
    ],
    educationalDisclaimer: 'Calculations utilize double-precision mathematical constant π (approx 3.141592653589793). Results are displayed rounded to four decimal places for precision engineering and academic applications.',
    faqs: [
      {
        question: 'How do you find the area of a circle from circumference?',
        answer: 'First solve for radius: r = C / (2π). Then compute area using A = πr², or directly using the single equation A = C² / (4π).'
      },
      {
        question: 'What is the relationship between diameter and circumference?',
        answer: 'Circumference is always exactly π (approximately 3.14159) times the diameter: C = π × d.'
      },
      {
        question: 'How is the area of a circular sector calculated?',
        answer: 'A sector is a proportional slice of the whole circle. The sector area equals the total circular area multiplied by the fraction (central angle θ / 360°).'
      },
      {
        question: 'What is the difference between an arc and a sector?',
        answer: 'An arc is the curved portion of the perimeter (circumference), whereas a sector is the entire two-dimensional pie-shaped surface bounded by the arc and two radii.'
      }
    ],
  },
  {
    id: 'fraction-calculator',
    title: 'Fraction Arithmetic & Reduction Calculator',
    slug: 'fraction-calculator',
    categoryId: 'math',
    shortDescription: 'Add, subtract, multiply, divide, and simplify fractions with step-by-step LCM/GCD and mixed numbers.',
    description: 'Perform exact arithmetic calculations on fractions with comprehensive step-by-step solutions. Computes Least Common Multiples (LCM), adjusts cross-numerators, reduces results via the Greatest Common Divisor (GCD), and formats output into simplified proper/improper fractions, mixed numbers, exact decimals, and percentage equivalents.',
    keywords: [
      'fraction calculator',
      'add fractions calculator',
      'subtracting fractions',
      'multiplying dividing fractions',
      'simplify fraction calculator',
      'fraction to decimal',
      'mixed number fraction calculator'
    ],
    iconName: 'Divide',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Addition: (a/b) + (c/d) = (ad + bc)/bd; Multiplication: (a/b) × (c/d) = ac/bd; Division: (a/b) ÷ (c/d) = ad/bc; Reduction: divide numerator and denominator by GCD(numerator, denominator).',
    formulaLatex: '\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{ad \\pm bc}{bd}, \\quad \\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{ac}{bd}, \\quad \\frac{a}{b} \\div \\frac{c}{d} = \\frac{ad}{bc}',
    relatedCalculatorIds: ['percentage', 'scientific', 'circle-calculator', 'unit-converter'],
    stepByStepInstructions: [
      'Select the arithmetic operation: Addition (+), Subtraction (-), Multiplication (×), Division (÷), or Simplify Single Fraction.',
      'Enter the integer Numerator and Denominator for Fraction 1.',
      'Enter the Numerator and Denominator for Fraction 2 (if performing two-fraction operations).',
      'View the reduced simplified fraction result, mixed number notation, decimal expansion, and step-by-step common denominator working.'
    ],
    educationalDisclaimer: 'Fraction operations require non-zero denominators. Mathematical steps reflect standard elementary and algebraic reduction theorems.',
    faqs: [
      {
        question: 'How do you add fractions with different denominators?',
        answer: 'First find a common denominator by multiplying denominators (or finding LCM), multiply each numerator by the opposing denominator (cross-multiplication), add the resulting numerators, and reduce using the GCD.'
      },
      {
        question: 'How do you divide two fractions?',
        answer: 'Keep the first fraction, flip the second fraction to find its reciprocal (inverse numerator and denominator), and multiply straight across: (a/b) ÷ (c/d) = (a/b) × (d/c) = (ad) / (bc).'
      },
      {
        question: 'What is a mixed number versus an improper fraction?',
        answer: 'An improper fraction has a numerator greater than or equal to its denominator (e.g. 7/4). A mixed number expresses the same quantity as an integer quotient plus a proper fraction (e.g. 1 3/4).'
      },
      {
        question: 'How do you convert a fraction into a percentage?',
        answer: 'Divide the numerator by the denominator to compute the decimal representation, then multiply by 100 (e.g. 3/8 = 0.375 → 37.5%).'
      }
    ],
  },
  {
    id: 'sleep-cycle',
    title: 'Sleep Cycle, Bedtime & REM Awakening Calculator',
    slug: 'sleep-cycle-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate optimal bedtimes and wake-up times aligned with 90-minute ultradian REM sleep cycles.',
    description: 'Prevent grogginess and sleep inertia by synchronizing your sleep schedule with natural 90-minute NREM-to-REM ultradian sleep cycles. Calculate recommended bedtimes based on target wake-up alarm times, or compute ideal wake times if going to bed right now, factoring in custom sleep onset latency (default 15 minutes).',
    keywords: [
      'sleep calculator',
      'sleep cycle calculator',
      'bedtime calculator',
      'wake up time calculator',
      'rem sleep cycle time',
      '90 minute sleep cycle',
      'sleep latency calculator'
    ],
    iconName: 'Moon',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Bedtime = Wake Time - [(Cycles × 90 mins) + Latency]; Wake Time = Bedtime + [(Cycles × 90 mins) + Latency].',
    formulaLatex: 'T_{\\text{bed}} = T_{\\text{wake}} - (90 \\cdot N + L_{\\text{mins}}), \\quad T_{\\text{wake}} = T_{\\text{bed}} + (90 \\cdot N + L_{\\text{mins}})',
    relatedCalculatorIds: ['time-date', 'water-intake', 'calorie-tdee', 'blood-alcohol-ebac'],
    stepByStepInstructions: [
      'Select your scheduling objective: "I want to wake up at a specific time" or "I am going to sleep right now".',
      'Enter your desired target wake-up alarm time or target bedtime.',
      'Adjust your average sleep onset latency in minutes (the typical adult takes 10 to 20 minutes to fall asleep).',
      'Review the 4 recommended sleep windows spanning 3 cycles (4.5 hours), 4 cycles (6.0 hours), 5 cycles (7.5 hours - optimal), and 6 cycles (9.0 hours).'
    ],
    educationalDisclaimer: 'Ultradian sleep cycle durations vary physiologically between 70 and 110 minutes per person. This tool uses the standard 90-minute clinical average for healthy adult sleep architecture.',
    faqs: [
      {
        question: 'Why does waking up at the end of a sleep cycle prevent morning grogginess?',
        answer: 'During deep slow-wave sleep (Stage 3 NREM), brain wave frequency drops significantly. Being abruptly jarred awake by an alarm during deep sleep triggers sleep inertia (grogginess and cognitive impairment). Waking at the completion of a REM cycle occurs in lighter Stage 1 sleep, allowing effortless awakening.'
      },
      {
        question: 'How many sleep cycles do adults need per night?',
        answer: 'Most healthy adults require 5 complete sleep cycles per night (7.5 hours of sleep plus time to fall asleep). Young adults and athletes often benefit from 6 full cycles (9 hours).'
      },
      {
        question: 'What is sleep onset latency?',
        answer: 'Sleep onset latency is the length of time it takes to transition from full wakefulness to sleep. For healthy adults, normal latency is between 10 and 20 minutes.'
      },
      {
        question: 'Is getting 7.5 hours better than getting 8 hours of sleep?',
        answer: 'Yes, if 8 hours causes you to awaken in the middle of your 6th sleep cycle (deep sleep), you will likely feel more fatigued than if you woke up naturally at 7.5 hours (at the conclusion of the 5th cycle).'
      }
    ],
  },

  // Batch 2 New Calculators
  {
    id: 'debt-snowball-avalanche',
    title: 'Debt Snowball vs Avalanche Calculator',
    slug: 'debt-snowball-avalanche-calculator',
    categoryId: 'finance',
    shortDescription: 'Compare Debt Snowball vs Debt Avalanche payoff timelines, interest savings, and exact debt-free dates.',
    description: 'Compare the two most effective debt elimination strategies side-by-side. Accurately simulates the psychological momentum of the Debt Snowball (lowest balance first) against the mathematical efficiency of the Debt Avalanche (highest APR first) with dynamic payment rollover.',
    keywords: [
      'debt snowball calculator',
      'debt avalanche calculator',
      'debt snowball vs avalanche',
      'debt payoff calculator multiple debts',
      'debt reduction spreadsheet calculator',
      'how to get out of debt faster',
      'credit card debt payoff plan',
      'debt rollover calculator'
    ],
    iconName: 'CreditCard',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Snowball Priority: Sort by Balance Ascending; Avalanche Priority: Sort by APR Descending. Payment = Min_i + (Rollover Pool + Extra)',
    formulaLatex: '\\text{Priority}_{\\text{Snowball}} = \\arg\\min_i(B_i), \\quad \\text{Priority}_{\\text{Avalanche}} = \\arg\\max_i(r_i), \\quad P_{\\text{target}} = M_{\\text{target}} + P_{\\text{extra}} + \\sum_{j \\in \\text{paid}} M_j',
    relatedCalculatorIds: [
      'credit-card-payoff',
      'personal-loan-payment',
      'debt-to-income-dti-advanced',
      'emergency-fund',
      'amortization-schedule'
    ],
    stepByStepInstructions: [
      'Enter all your current debt accounts (Credit Cards, Auto Loans, Student Loans, Medical Bills, Personal Loans).',
      'Input the Current Balance, Interest Rate (APR %), and Minimum Monthly Payment for each account.',
      'Specify an Extra Monthly Accelerator Budget you can commit toward debt elimination.',
      'Examine the side-by-side comparison between the Debt Avalanche (highest APR first) and Debt Snowball (lowest balance first).',
      'Review your projected Debt-Free date, total lifetime interest paid, and interest saved versus minimum payments.',
      'Observe the interactive Debt Balance Payoff Curve showing the rollover acceleration effect over time.'
    ],
    faqs: [
      {
        question: 'What is the difference between the Debt Snowball and Debt Avalanche methods?',
        answer: 'The Debt Snowball method lists debts from smallest balance to largest balance, regardless of interest rates. You pay minimums on all debts and throw all extra money at the smallest balance. Once paid off, its payment rolls into the next smallest. The Debt Avalanche method lists debts from highest interest rate (APR) to lowest, mathematically saving the most money and finishing debt-free the fastest.'
      },
      {
        question: 'Which method should I choose: Snowball or Avalanche?',
        answer: 'If you need quick psychological wins and motivational momentum to stay disciplined, choose the Debt Snowball. If you are analytical, disciplined, and want to pay the absolute least amount of total interest, choose the Debt Avalanche.'
      },
      {
        question: 'How does the "debt rollover" (snowball effect) work?',
        answer: 'When a debt is completely paid off, you do not absorb that freed-up minimum payment back into your lifestyle. Instead, you roll that entire minimum payment amount directly into the monthly payment of the next priority debt, creating an expanding snowball payment pool.'
      },
      {
        question: 'Should I stop investing in my 401(k) while paying off debt?',
        answer: 'Always contribute enough to capture your full employer 401(k) company match (e.g. 100% immediate return on investment). For non-matched investing, pause contributions temporarily while aggressively eliminating high-interest (10%+) credit card debt.'
      },
      {
        question: 'What should I do if a debt interest rate changes or goes up?',
        answer: 'If using the Debt Avalanche method, recalculate your debt priority list when an APR increases, as a higher APR debt moves up the payoff hierarchy.'
      },
      {
        question: 'Should I consolidate my debts with a personal loan instead?',
        answer: 'A debt consolidation personal loan can make sense if you qualify for an interest rate significantly lower than your current credit card APRs (e.g. 10% vs 24%). However, you must address the underlying spending habits so you do not run up new credit card balances.'
      },
      {
        question: 'How does an emergency fund help with debt payoff?',
        answer: 'A starter emergency fund of $1,000 to $2,500 acts as a financial shock absorber. When unexpected car repairs or medical bills occur, you pay cash from the emergency fund instead of putting new charges onto credit cards.'
      },
      {
        question: 'Can I combine or customize the Snowball and Avalanche methods?',
        answer: 'Yes (the "Debt Snowflake" or Hybrid method). Many people pay off 1 or 2 small nuisance debts first using the Snowball to gain immediate momentum and simplify their finances, then switch to the Avalanche to tackle high-APR debts.'
      }
    ],
    educationalDisclaimer: 'This debt snowball and avalanche calculator is for educational planning. Projections assume consistent monthly payments, fixed APR interest rates, and all freed-up cash flow being dedicated toward debt elimination.'
  },
  {
    id: 'inflation-purchasing-power',
    title: 'Inflation & Purchasing Power Erosion Calculator',
    slug: 'inflation-purchasing-power-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate how annual inflation erodes dollar purchasing power, future living costs, and real investment returns.',
    description: 'Calculate future purchasing power decay of cash reserves and the escalating future cost of goods over 1 to 50 years. Incorporates historical CPI rates, the Rule of 72 halving period, and real vs nominal investment portfolio returns.',
    keywords: [
      'inflation calculator',
      'purchasing power erosion calculator',
      'cpi inflation impact',
      'future value of money inflation',
      'cost of living inflation calculator',
      'rule of 72 inflation halving',
      'real vs nominal return calculator',
      'dollar buying power depreciation'
    ],
    iconName: 'TrendingDown',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Future Purchasing Power = Present Value / (1 + r)^t; Future Cost of Goods = Present Value × (1 + r)^t; Rule of 72 Halving Time ≈ 72 / (r × 100)',
    formulaLatex: 'V_{\\text{real}} = \\frac{PV}{(1 + r)^t}, \\quad C_{\\text{future}} = PV \\cdot (1 + r)^t, \\quad T_{\\text{half}} \\approx \\frac{72}{100 \\cdot r}',
    relatedCalculatorIds: [
      'compound-interest',
      'savings-goal-timeline',
      'emergency-fund',
      'fire-number-calculator',
      '401k-roth-ira-comparison'
    ],
    stepByStepInstructions: [
      'Enter your Current Cash Baseline or lump sum purchasing amount (e.g. $50,000).',
      'Select your Time Horizon in years (e.g. 15 years to retirement).',
      'Choose an Expected Annual Inflation Rate or click a benchmark preset (e.g. 2.0% Fed Target, 3.2% US Historical Average, or 5.0% Elevated).',
      'Optionally enter an expected Nominal Investment Return Rate to see net real portfolio growth after inflation.',
      'Examine the Future Purchasing Power metric and the total cumulative percentage loss of real buying power.',
      'Check the Rule of 72 purchasing power half-life (how many years before money loses 50% of its value).',
      'Review the interactive multi-decade erosion chart and itemized schedule table.'
    ],
    faqs: [
      {
        question: 'What is purchasing power loss and how does inflation cause it?',
        answer: 'Purchasing power represents the quantity of goods and services that one unit of currency can buy. As price levels rise across the economy (inflation), each dollar buys fewer goods, meaning fixed nominal cash balances continuously lose real economic value over time.'
      },
      {
        question: 'What is the long-term historical inflation rate in the United States?',
        answer: 'Over the past century (1913 to present), the average annual inflation rate measured by the US Consumer Price Index (CPI-U) has been approximately 3.2%. The Federal Reserve aims for a long-term target inflation rate of 2.0%.'
      },
      {
        question: 'What is the Rule of 72 when applied to inflation?',
        answer: 'The Rule of 72 is a mental shortcut used to estimate how many years it will take for your money to lose half (50%) of its purchasing power. Simply divide 72 by the annual inflation rate (e.g., at 3.0% inflation, your cash purchasing power is cut in half in 72 / 3 = 24 years; at 6.0%, it is halved in just 12 years).'
      },
      {
        question: 'What is the difference between nominal returns and real returns?',
        answer: 'Nominal return is the percentage gain on an investment before accounting for inflation. Real return is the inflation-adjusted gain that reflects actual purchasing power growth, calculated via the Fisher equation: Real Return ≈ Nominal Return − Inflation Rate.'
      },
      {
        question: 'Why is inflation often described as a "hidden" or "stealth" tax on savers?',
        answer: 'Unlike income or sales taxes, inflation does not appear on a receipt or paystub. Instead, it quietly erodes the real value of uninvested cash sitting in low-yield checking or savings accounts, reducing what that money can buy in the future without any formal tax assessment.'
      },
      {
        question: 'How do retirees protect their retirement nest eggs from inflation risk?',
        answer: 'Retirees protect purchasing power by maintaining a diversified asset allocation including equities (which historically outpace inflation over long horizons), Treasury Inflation-Protected Securities (TIPS), Series I Savings Bonds, real estate, and dividend-growth stocks.'
      },
      {
        question: 'What is the Consumer Price Index (CPI) and how is it calculated?',
        answer: 'The Consumer Price Index (CPI), published monthly by the US Bureau of Labor Statistics (BLS), measures the average change over time in prices paid by urban consumers for a market basket of consumer goods and services (including shelter, food, transportation, energy, and medical care).'
      },
      {
        question: 'What happens to fixed-rate debts (like mortgages) during inflationary periods?',
        answer: 'Inflation actually benefits borrowers with fixed-rate debt. While price levels and nominal wages rise over time, monthly fixed mortgage payments remain unchanged in dollar terms, effectively allowing borrowers to repay debts with "cheaper" depreciated dollars.'
      }
    ],
    educationalDisclaimer: 'This calculator models mathematical purchasing power decay based on constant compounding inflation rates. Actual future inflation varies year-to-year across specific expenditure categories.'
  },
  {
    id: 'lump-sum-vs-dca',
    title: 'Lump Sum vs Dollar Cost Averaging (DCA) Calculator',
    slug: 'lump-sum-vs-dca-calculator',
    categoryId: 'finance',
    shortDescription: 'Compare terminal portfolio wealth between immediate Lump Sum investing and Dollar Cost Averaging (DCA).',
    description: 'Simulate lump sum investing versus phased dollar-cost averaging across multi-year investment horizons. Evaluates market return drag, cash yields on uninvested balances, Vanguard empirical historical probabilities, and drawdown psychology.',
    keywords: [
      'lump sum vs dca calculator',
      'dollar cost averaging calculator',
      'lump sum investing vs dca',
      'vanguard lump sum vs dca',
      'invest windfall calculator',
      'dca schedule calculator',
      'market timing vs dca',
      'cash drag investment comparison'
    ],
    iconName: 'Scale',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Lump Sum FV = PV × (1 + r)^t; DCA FV = Σ [ (PV/N) × (1 + r)^(t - i/12) ] + Uninvested Cash Yield',
    formulaLatex: 'V_{\\text{Lump}} = P_0 (1 + r)^t, \\quad V_{\\text{DCA}} = \\sum_{k=1}^{N} \\frac{P_0}{N} (1 + r)^{t - \\frac{k}{12}} + \\text{HYSA Yield}',
    relatedCalculatorIds: [
      'dca-crypto-stocks',
      'compound-interest',
      'stock-dividend-yield',
      'fire-number-calculator',
      '401k-roth-ira-comparison'
    ],
    stepByStepInstructions: [
      'Enter your Total Investment Windfall / Capital amount (e.g. $100,000).',
      'Set your Long-Term Investment Horizon in years (e.g. 10 or 20 years).',
      'Input the Expected Annual Equity Market Return (e.g. 9.0% S&P 500 average).',
      'Select your DCA Deployment Schedule (e.g. 12 monthly tranches).',
      'Set the Cash Yield earned on uninvested capital in your HYSA or money market fund during the DCA period (e.g. 4.5%).',
      'Choose a Market Scenario (Steady Bull, Early Market Dip of -20%, or Sideways Volatility) to test resilience.',
      'Review the terminal wealth comparison, strategy delta gap, and interactive trajectory line chart.'
    ],
    faqs: [
      {
        question: 'What does historical research say about Lump Sum vs Dollar Cost Averaging?',
        answer: 'Extensive empirical research by Vanguard, Morningstar, and Nobel laureates shows that immediate Lump Sum investing outperforms Dollar Cost Averaging approximately 68% of the time over 10-year rolling periods in the US stock market (and ~75% globally). This is because equities trend upward over time, making immediate market exposure statistically superior to holding cash.'
      },
      {
        question: 'Why do so many investors still choose Dollar Cost Averaging (DCA)?',
        answer: 'DCA provides psychological insurance against regret. If you invest a lump sum and the market drops 15% the next week, the emotional pain can cause panic selling. DCA allows investors to view early market drops as opportunities to purchase shares at lower prices, improving behavioral adherence.'
      },
      {
        question: 'What is "cash drag" in DCA investing?',
        answer: 'Cash drag refers to the reduced overall portfolio return caused by holding large portions of your capital in cash or money market funds while waiting to deploy them in future DCA tranches, missing out on equity market gains.'
      },
      {
        question: 'What is the optimal DCA timeframe if I choose not to invest all at once?',
        answer: 'Most financial researchers recommend keeping the DCA period to 6 to 12 months maximum. Extending DCA beyond 12 to 18 months dramatically increases cash drag and rarely improves risk-adjusted returns.'
      },
      {
        question: 'In what market conditions does DCA actually beat Lump Sum investing?',
        answer: 'DCA outperforms Lump Sum investing when the market experiences a prolonged bear market or sharp drop early in the investment period, allowing the staggered installments to acquire shares at steep discounts before an eventual recovery.'
      },
      {
        question: 'Should I keep DCA cash in a High-Yield Savings Account (HYSA)?',
        answer: 'Yes. When dollar-cost averaging a large windfall over 6 to 12 months, the remaining undeployed cash should be held in a high-yield savings account, Treasury bills, or money market fund yielding 4% to 5% to minimize opportunity cost.'
      },
      {
        question: 'Does this comparison apply to regular monthly paycheck contributions?',
        answer: 'No. Automatically investing a portion of every bi-weekly or monthly paycheck as you earn it is "continuous investing as funds become available" (the purest form of lump sum investing per paycheck). The Lump Sum vs DCA dilemma only applies when you possess a large existing pool of cash (inheritance, bonus, home sale, business exit).'
      },
      {
        question: 'How should taxes affect my decision to Lump Sum or DCA?',
        answer: 'If investing in a taxable brokerage account, DCA results in many distinct tax lots with varying cost bases, requiring careful tracking (handled automatically by modern brokerages). Lump Sum creates fewer initial tax lots, simplifying long-term capital gains tracking.'
      }
    ],
    educationalDisclaimer: 'This calculator is for educational and scenario planning purposes. Past market returns and historical empirical win rates do not guarantee future performance in any specific economic cycle.'
  },
  {
    id: 'ideal-body-weight',
    title: 'Ideal Body Weight (IBW) & Formula Benchmark Calculator',
    slug: 'ideal-body-weight-calculator',
    categoryId: 'health',
    shortDescription: 'Calculate ideal body weight using Devine, Robinson, Miller, and Hamwi clinical formulas alongside healthy WHO BMI ranges.',
    description: 'Calculate target ideal body weight in pounds (lbs) or kilograms (kg) using the 4 classical clinical pharmacology equations (Devine, Robinson, Miller, and Hamwi) alongside the World Health Organization healthy BMI boundary spectrum (18.5 to 24.9 kg/m²).',
    keywords: [
      'ideal body weight calculator',
      'devine formula calculator',
      'ibw calculator',
      'target healthy weight',
      'robinson formula',
      'hamwi formula',
      'miller formula ideal weight',
      'healthy weight for height'
    ],
    iconName: 'Activity',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Devine Male: 50 kg + 2.3 kg/in (>60 in); Devine Female: 45.5 kg + 2.3 kg/in (>60 in); Healthy BMI Range: 18.5 × H(m)² to 24.9 × H(m)².',
    formulaLatex: '\\text{IBW}_{\\text{Devine, M}} = 50 + 2.3(h - 60), \\quad \\text{IBW}_{\\text{Devine, F}} = 45.5 + 2.3(h - 60), \\quad W_{\\text{BMI}} = \\text{BMI} \\cdot h_{\\text{m}}^2',
    relatedCalculatorIds: ['bmi', 'calorie-tdee', 'body-fat', 'lean-body-mass'],
    stepByStepInstructions: [
      'Select your biological sex (Male or Female) as clinical metabolic equations differ by sex.',
      'Enter your height in feet and inches (or total inches).',
      'Select your preferred display unit system (Pounds lbs or Kilograms kg).',
      'Review the gold-standard Devine formula benchmark, the WHO healthy BMI weight spectrum, and cross-comparison values from Robinson, Miller, and Hamwi.'
    ],
    educationalDisclaimer: 'Ideal Body Weight formulas were originally engineered for pharmaceutical pharmacokinetic dosing and clinical ventilator volume calibration. They serve as generalized population benchmarks and do not distinguish between athletic skeletal muscle hypertrophy and adipose tissue.',
    faqs: [
      {
        question: 'Which ideal body weight formula is considered the clinical gold standard?',
        answer: 'The Devine formula (published in 1974 by Dr. Ben J. Devine) is the most widely cited and utilized formula in clinical pharmacology, intensive care medicine, and pharmacokinetic drug clearance dosing.'
      },
      {
        question: 'Why do the Devine, Robinson, Miller, and Hamwi formulas produce slightly different numbers?',
        answer: 'Each formula was derived from distinct epidemiological datasets and historical clinical cohorts between 1964 and 1983. Devine and Robinson are closest in modern practice, while Miller yields slightly higher targets for shorter stature and Hamwi represents the earliest 1964 rule-of-thumb.'
      },
      {
        question: 'Why is the healthy BMI range often wider than a single formula number?',
        answer: 'Clinical IBW formulas return a single point estimate tailored to median population frame sizes, whereas the WHO BMI healthy range (18.5 to 24.9 kg/m²) accommodates natural human variance in bone density, frame width, and lean muscle mass.'
      },
      {
        question: 'Should muscular bodybuilders or strength athletes use IBW formulas?',
        answer: 'No. Because IBW formulas depend solely on height and sex without measuring body fat percentage, heavily muscled individuals will naturally exceed their calculated IBW while remaining exceptionally healthy and lean.'
      }
    ],
  },
  {
    id: 'pregnancy-due-date',
    title: 'Pregnancy Due Date & Gestational Age Calculator',
    slug: 'pregnancy-due-date-calculator',
    categoryId: 'health',
    shortDescription: 'Estimate due date (EDD), current gestational age (weeks + days), trimester stage, and key fetal milestones.',
    description: 'Calculate estimated date of delivery (EDD) and real-time gestational progress using Naegele\'s rule (Last Menstrual Period LMP), exact conception date (266 days post-ovulation), or biometric ultrasound dating. Tracks 1st, 2nd, and 3rd trimesters alongside 37-week early full term and 39-week full term clinical milestones.',
    keywords: [
      'pregnancy due date calculator',
      'gestational age calculator',
      'edd calculator',
      'trimester calculator',
      'lmp due date calculator',
      'conception date calculator',
      'ultrasound due date calculator',
      'how many weeks pregnant'
    ],
    iconName: 'Heart',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Naegele\'s Rule: Due Date = LMP + 280 days (40 weeks); Conception Method: Due Date = Conception + 266 days; Ultrasound Method: Due Date = Scan Date + (280 - Scan Gestational Days).',
    formulaLatex: '\\text{EDD}_{\\text{LMP}} = \\text{LMP} + 280\\text{ days}, \\quad \\text{EDD}_{\\text{Conc}} = T_{\\text{conc}} + 266\\text{ days}, \\quad \\text{GA} = \\lfloor (T_{\\text{today}} - \\text{LMP}) / 7 \\rfloor\\text{ wks}',
    relatedCalculatorIds: ['period-ovulation', 'time-date', 'ideal-body-weight', 'child-height-predictor'],
    stepByStepInstructions: [
      'Select your dating method: First Day of Last Period (LMP), Known Conception Date, or Ultrasound Scan Date.',
      'Enter the relevant date in the date picker.',
      'If using ultrasound dating, enter the crown-rump length / gestational weeks and days recorded during the sonogram.',
      'View your Estimated Due Date (EDD), real-time gestational age (weeks and days elapsed today), current trimester stage, and 37-week full-term threshold date.'
    ],
    educationalDisclaimer: 'Due date estimations are statistical targets; only 4% to 5% of infants are delivered on their precise calculated due date, with approximately 90% arriving within a 2-week window before or after the EDD. Clinical decisions should always be directed by an obstetrician-gynecologist or certified midwife.',
    faqs: [
      {
        question: 'Why is gestational age calculated from LMP rather than conception?',
        answer: 'Because most women know the exact first day of their menstrual period, whereas the exact day of ovulation and egg fertilization varies. Counting from LMP adds 14 biological days (40 weeks total) compared to fertilization age (38 weeks total).'
      },
      {
        question: 'How accurate is an early first-trimester ultrasound compared to LMP?',
        answer: 'A crown-rump length (CRL) ultrasound scan performed between weeks 8 and 13 is considered the most accurate medical method for establishing gestational age (margin of error ±5 to 7 days).'
      },
      {
        question: 'What are the clinical trimester cutoffs?',
        answer: '1st Trimester: Conception through 12 weeks 6 days; 2nd Trimester: 13 weeks 0 days through 27 weeks 6 days; 3rd Trimester: 28 weeks 0 days through delivery.'
      },
      {
        question: 'When is a pregnancy officially considered "full term"?',
        answer: 'The American College of Obstetricians and Gynecologists (ACOG) defines "Early Term" as 37 weeks 0 days to 38 weeks 6 days, "Full Term" as 39 weeks 0 days to 40 weeks 6 days, and "Late Term" as 41 weeks 0 days to 41 weeks 6 days.'
      }
    ],
  },
  {
    id: 'polynomial-solver',
    title: 'Polynomial & Cubic Equation Solver',
    slug: 'polynomial-solver-calculator',
    categoryId: 'math',
    shortDescription: 'Solve quadratic and cubic polynomials for real and complex roots with Cardano\'s method and discriminant analysis.',
    description: 'Calculate all exact and numerical roots for 2nd-degree quadratic polynomials (ax² + bx + c = 0) and 3rd-degree cubic polynomials (ax³ + bx² + cx + d = 0). Evaluates polynomial discriminants, real roots, and complex conjugate imaginary pairs with full Cardano depressed cubic step-by-step algebraic breakdowns.',
    keywords: [
      'polynomial solver',
      'cubic equation solver',
      'quadratic roots calculator',
      'cardano formula solver',
      'complex roots polynomial',
      'polynomial discriminant calculator',
      'depressed cubic calculator'
    ],
    iconName: 'Variable',
    isPopular: false,
    isNew: false,
    formulaDescription: 'Quadratic: x = (-b ± √(b² - 4ac)) / (2a); Cubic: Tschirnhaus transformation x = t - b/(3a) into t³ + pt + q = 0 solved via Cardano\'s formula.',
    formulaLatex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad t^3 + pt + q = 0 \\implies t = \\sqrt[3]{-\\frac{q}{2} + \\sqrt{\\Delta}} + \\sqrt[3]{-\\frac{q}{2} - \\sqrt{\\Delta}}',
    relatedCalculatorIds: ['algebra-solver', 'scientific', 'matrix-multiplication', 'vector-cross-dot'],
    stepByStepInstructions: [
      'Select the polynomial degree: Quadratic (Degree 2) or Cubic (Degree 3).',
      'Enter the numerical leading and polynomial coefficients (a, b, c, and d). The leading coefficient a must not be zero.',
      'Review the calculated real and complex conjugate roots (x₁, x₂, x₃).',
      'Inspect the step-by-step discriminant evaluation and intermediate algebraic parameters.'
    ],
    educationalDisclaimer: 'Cubic equations with negative discriminant (Δ < 0,casus irreducibilis) have 3 distinct real roots evaluated via trigonometric substitution. Complex numbers are expressed in standard a + bi format.',
    faqs: [
      {
        question: 'What is Cardano\'s formula for cubic polynomials?',
        answer: 'Cardano\'s formula (published by Gerolamo Cardano in 1545) solves cubic equations by first eliminating the quadratic x² term through substitution x = t - b/(3a) to produce a "depressed cubic" t³ + pt + q = 0, and then solving for t using cube roots.'
      },
      {
        question: 'What does a negative discriminant indicate in quadratic vs cubic equations?',
        answer: 'For quadratics, Δ = b² - 4ac < 0 means there are 2 complex conjugate imaginary roots. For cubics, discriminant Δ = (q/2)² + (p/3)³ < 0 actually indicates three distinct real roots (known historically as the irreducible case), whereas Δ > 0 yields one real root and two complex conjugate roots.'
      },
      {
        question: 'What is the Fundamental Theorem of Algebra?',
        answer: 'The Fundamental Theorem of Algebra proves that every non-zero single-variable polynomial of degree n with complex coefficients has exactly n complex roots (counting multiplicity).'
      },
      {
        question: 'Can this solver handle decimal or negative coefficients?',
        answer: 'Yes, coefficients can be positive, negative, integer, or floating-point decimals.'
      }
    ],
  },
  {
    id: 'matrix-multiplication',
    title: 'Matrix Multiplication & Determinant Calculator',
    slug: 'matrix-multiplication-calculator',
    categoryId: 'math',
    shortDescription: 'Multiply 2x2 and 3x3 matrices, solve matrix product C = A × B, and calculate determinants det(A) and det(B).',
    description: 'Perform row-by-column matrix multiplication (A × B = C) for 2×2 and 3×3 square matrices in linear algebra. Calculates exact dot products, resulting product matrices, and determinants det(A) and det(B) using Laplace cofactor expansion.',
    keywords: [
      'matrix multiplication calculator',
      'matrix multiplier',
      'matrix determinant calculator',
      '2x2 matrix multiplication',
      '3x3 matrix multiplication',
      'linear algebra calculator',
      'matrix dot product'
    ],
    iconName: 'Grid',
    isPopular: false,
    isNew: false,
    formulaDescription: 'C[i][j] = ∑ (A[i][k] × B[k][j]) for k=1 to n; 2x2 det(A) = ad - bc; 3x3 det(A) via cofactor expansion along first row.',
    formulaLatex: 'C_{ij} = \\sum_{k=1}^{n} A_{ik} B_{kj}, \\quad \\det(A_{2\\times2}) = ad - bc, \\quad \\det(A_{3\\times3}) = a(ei - fh) - b(di - fg) + c(dh - eg)',
    relatedCalculatorIds: ['vector-cross-dot', 'polynomial-solver', 'algebra-solver', 'scientific'],
    stepByStepInstructions: [
      'Select matrix dimensions: 2×2 Matrices or 3×3 Matrices.',
      'Enter the numerical values for all cells in Matrix A.',
      'Enter the numerical values for all cells in Matrix B.',
      'Instantly view the computed product Matrix C = A × B alongside the scalar determinants det(A) and det(B).'
    ],
    educationalDisclaimer: 'Matrix multiplication requires that the number of columns in Matrix A equals the number of rows in Matrix B. In square matrices (n×n), multiplication is defined, associative, and distributive, but strictly non-commutative (A × B ≠ B × A in general).',
    faqs: [
      {
        question: 'Why is matrix multiplication non-commutative (A × B ≠ B × A)?',
        answer: 'Matrix multiplication represents geometric linear transformations. Applying transformation B followed by transformation A (A × B) produces a fundamentally different geometric mapping than applying transformation A followed by B (B × A).'
      },
      {
        question: 'What does a determinant of zero mean?',
        answer: 'A matrix with det(A) = 0 is called a "singular" or "degenerate" matrix. Singular matrices cannot be inverted (they have no multiplicative inverse A⁻¹), and their transformation collapses n-dimensional volume down to a lower dimension (line or plane).'
      },
      {
        question: 'How is the determinant of a 3x3 matrix calculated?',
        answer: 'Using the rule of Sarrus or Laplace cofactor expansion across the first row: det(A) = a₁₁(a₂₂a₃₃ - a₂₃a₃₂) - a₁₂(a₂₁a₃₃ - a₂₃a₃₁) + a₁₃(a₂₁a₃₂ - a₂₂a₃₁).'
      },
      {
        question: 'What is an Identity Matrix in multiplication?',
        answer: 'An Identity Matrix (I) has 1s on the main diagonal and 0s elsewhere. Multiplying any square matrix A by the Identity Matrix yields A itself: A × I = I × A = A.'
      }
    ],
  },
  {
    id: 'roof-pitch-rafter',
    title: 'Roof Pitch, Slope Angle & Common Rafter Calculator',
    slug: 'roof-pitch-rafter-calculator',
    categoryId: 'construction',
    shortDescription: 'Calculate roof pitch ratio (rise/run), slope angle degrees, common rafter length with overhang, and total roofing squares.',
    description: 'Calculate framing dimensions for gable and pitched roofs. Computes roof pitch ratios (e.g., 4/12, 6/12, 8/12, 12/12), pitch multiplier coefficients, true rafter line lengths with eave overhangs, total roof deck surface area, and required roofing squares (100 sq ft per square).',
    keywords: [
      'roof pitch calculator',
      'rafter length calculator',
      'roof slope calculator',
      'roof angle degrees',
      'common rafter calculation',
      'roof squares calculator',
      'eave overhang rafter',
      'roof pitch multiplier'
    ],
    iconName: 'HardHat',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Pitch Angle θ = arctan(Rise / 12); Pitch Multiplier = √(1 + (Rise/12)²); Rafter Length = (Span/2 + Overhang) × Pitch Multiplier; Roof Area = 2 × (Length + 2×Overhang) × Rafter Length.',
    formulaLatex: '\\theta = \\arctan\\left(\\frac{\\text{Rise}}{12}\\right), \\quad L_{\\text{rafter}} = \\left(\\frac{S}{2} + O\\right) \\sqrt{1 + \\left(\\frac{\\text{Rise}}{12}\\right)^2}, \\quad A_{\\text{roof}} = 2(L + 2O) L_{\\text{rafter}}',
    relatedCalculatorIds: ['roofing-shingle', 'construction', 'triangle', 'deck-board', 'drywall-sheet'],
    stepByStepInstructions: [
      'Enter the Roof Rise in inches per 12 inches of horizontal run (e.g. 6 for a 6/12 pitch).',
      'Enter the total Building Span (outer building wall-to-wall width) in feet.',
      'Enter the total Building Length in feet.',
      'Enter the desired Eave Overhang extension in inches (standard is typically 12 to 24 inches).',
      'Review the calculated Common Rafter Length (feet and total inches), Slope Pitch Angle, and Total Roof Surface Area in square feet and roofing squares.'
    ],
    educationalDisclaimer: 'Rafter calculations represent theoretical line lengths from ridge to tail. Actual timber framing requires subtracting half the ridge board thickness from the plumb cut and adding the birdsmouth seat depth.',
    faqs: [
      {
        question: 'What does a 6/12 roof pitch mean in slope and degrees?',
        answer: 'A 6/12 pitch means the roof ascends 6 inches vertically for every 12 inches (1 foot) of horizontal run. This equates to an angle of 26.57° with a pitch multiplier of 1.118.'
      },
      {
        question: 'What is a "roofing square"?',
        answer: 'In the construction and roofing trades, one "square" equals exactly 100 square feet of roof surface area. For standard 3-tab or architectural shingles, 3 bundles typically cover 1 roofing square.'
      },
      {
        question: 'How do you adjust rafter length for a ridge board?',
        answer: 'When cutting rafters on-site, subtract half the actual thickness of the central ridge beam (e.g., subtract 0.75 inches for a standard 1.5-inch 2x nominal board) perpendicularly from the plumb cut line at the top.'
      },
      {
        question: 'What is considered a low pitch vs steep pitch roof?',
        answer: 'Conventional roof pitch classifications: Flat/Low Slope (< 3/12, 14°), Standard Conventional Pitch (4/12 to 8/12, 18° to 34°), and Steep Pitch (9/12 to 12/12+, 37° to 45°+).'
      }
    ],
  },
  {
    id: 'brick-mortar',
    title: 'Brick, Mortar & Masonry Estimator',
    slug: 'brick-mortar-calculator',
    categoryId: 'construction',
    shortDescription: 'Estimate exact brick counts, pre-mixed mortar bags (80 lb), masonry sand tonnage, and cut waste allowances.',
    description: 'Calculate materials for single-wythe brick masonry walls, facades, and retaining walls. Accurately estimates brick counts based on standard modular, queen, king, or utility sizes with standard 3/8" mortar joints, calculating 80-lb pre-mixed mortar bags and raw masonry sand tons needed.',
    keywords: [
      'brick calculator',
      'mortar estimator',
      'brick wall calculator',
      'masonry mortar bags',
      'bricks per square foot',
      'masonry sand tonnage',
      'standard modular brick'
    ],
    iconName: 'Grid',
    isPopular: false,
    isNew: false,
    formulaDescription: 'Net Bricks = Length × Height × Bricks/sq ft; Total Bricks = Net Bricks × (1 + Waste %); Mortar Bags (80 lb) = (Total Bricks / 1000) × 6.5; Sand Tons = (Total Bricks / 1000) × 1.0.',
    formulaLatex: 'N_{\\text{bricks}} = L \\times H \\times D_{\\text{brick}} \\times (1 + W), \\quad N_{\\text{mortar}} = \\left\\lceil \\frac{N_{\\text{bricks}}}{1000} \\times 6.5 \\right\\rceil, \\quad M_{\\text{sand}} = \\frac{N_{\\text{bricks}}}{1000} \\times 1.0',
    relatedCalculatorIds: ['tile-grout', 'concrete-slab-volume', 'deck-board', 'drywall-sheet', 'gravel-paving'],
    stepByStepInstructions: [
      'Enter the Wall Length in feet.',
      'Enter the Wall Height in feet.',
      'Select the Brick Size Type: Standard Modular (6.85 bricks/sq ft), Queen Size (5.80 bricks/sq ft), King Size (4.80 bricks/sq ft), or Utility Size (4.50 bricks/sq ft).',
      'Specify the Cut & Breakage Waste Allowance percentage (typically 10% for straight walls, 15% for complex corners and openings).',
      'Review the Total Bricks Required, Pre-Mixed Mortar Bags (80 lb Type N/S), and Bulk Masonry Sand tonnage.'
    ],
    educationalDisclaimer: 'Material quantities are estimates based on standard 3/8" (9.5 mm) mortar bed and head joints. Thick mortar joints (1/2") or heavily indented decorative bond patterns will require additional mortar.',
    faqs: [
      {
        question: 'How many standard modular bricks are in one square foot of wall?',
        answer: 'With standard 3/8-inch mortar joints, standard modular bricks (3-5/8" × 2-1/4" × 7-5/8") require approximately 6.85 bricks per square foot of wall surface area (or roughly 7 bricks/sq ft without waste).'
      },
      {
        question: 'What type of mortar mix is best for general bricklaying?',
        answer: 'ASTM C270 Type N mortar (medium compressive strength ~750 psi) is the standard recommendation for above-grade exterior walls, interior brick, and veneers. Type S (higher compressive strength ~1,800 psi) is used below grade or for retaining walls.'
      },
      {
        question: 'How many bags of mortar mix are required per 1,000 bricks?',
        answer: 'On average, laying 1,000 standard modular bricks with 3/8" joints requires approximately 6.5 bags (80 lb each) of pre-mixed masonry cement mix.'
      },
      {
        question: 'Why should waste allowance be added to brick orders?',
        answer: 'Bricks must be clipped and cut to fit corners, window openings, and wall ends. Furthermore, ordering all bricks in a single batch ensures color consistency across the entire facade.'
      }
    ],
  },
  {
    id: 'savings-goal-timeline',
    title: 'Savings Goal & Timeline Calculator',
    slug: 'savings-goal-timeline-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate required monthly savings deposits to reach a target goal or compute the timeline to hit your target.',
    description: 'Determine exact monthly contributions required to reach any financial milestone (down payment, wedding, college, vacation, or car purchase). Accurately models compound APY growth, starting balances, target time horizons, and optional inflation adjustments.',
    keywords: [
      'savings goal calculator',
      'how much to save each month calculator',
      'target savings timeline calculator',
      'monthly deposit savings calculator',
      'compound interest savings goal',
      'down payment savings calculator',
      'financial goal timeline calculator',
      'savings plan calculator'
    ],
    iconName: 'PiggyBank',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Required Monthly Deposit: PMT = [FV - PV(1 + r)^n] × [r / ((1 + r)^n - 1)]; Future Value: FV = PV(1 + r)^n + PMT[((1 + r)^n - 1) / r]',
    formulaLatex: '\\text{PMT} = \\frac{\\text{FV} - \\text{PV}(1 + r)^n}{\\frac{(1 + r)^n - 1}{r}}, \\quad \\text{FV} = \\text{PV}(1 + r)^n + \\text{PMT} \\left[ \\frac{(1 + r)^n - 1}{r} \\right]',
    relatedCalculatorIds: [
      'compound-interest',
      'emergency-fund',
      'inflation-purchasing-power',
      'net-worth',
      'fire-number-calculator'
    ],
    stepByStepInstructions: [
      'Enter your Target Savings Goal amount (e.g. $50,000 for a house down payment).',
      'Input your Current Starting Savings Balance.',
      'Select your strategy mode: "Find Required Monthly Savings" (for a fixed deadline) or "Find Timeline for Fixed Budget".',
      'Enter your Target Timeframe in years OR your Fixed Monthly Contribution.',
      'Specify your expected Annual Return Rate / HYSA APY (e.g. 4.5% to 7%).',
      'Toggle Inflation Adjustment if you want to calculate goals in real future purchasing power.',
      'Review your Required Monthly Deposit, total principal contributed, and compound interest gains.',
      'Examine the interactive Savings Accumulation Stacked Area Chart and Annual Milestones table.'
    ],
    faqs: [
      {
        question: 'How do I calculate how much I need to save each month for a goal?',
        answer: 'Subtract the future value of your initial savings from your target goal, then divide the remainder by the future value of an ordinary annuity factor based on your monthly interest rate and time horizon in months.'
      },
      {
        question: 'What is the difference between saving in a regular bank vs a High-Yield Savings Account (HYSA)?',
        answer: 'Traditional brick-and-mortar banks often pay negligible interest (e.g. 0.01% APY), whereas FDIC-insured High-Yield Savings Accounts (HYSAs) typically offer 4.0% to 5.0% APY. On a $50,000 balance over 5 years, an HYSA can generate over $11,000 in free compound interest.'
      },
      {
        question: 'Should I invest my short-term savings in the stock market?',
        answer: 'For goals with a timeline under 3 to 5 years (like a home down payment or wedding), keep your money in guaranteed capital-preserving vehicles like HYSAs, Certificates of Deposit (CDs), or short-term Treasury bills. The stock market is too volatile over short horizons.'
      },
      {
        question: 'How does inflation affect my long-term savings goal?',
        answer: 'Inflation erodes purchasing power over time. If you need $50,000 in 10 years and inflation averages 3% per year, you will actually need approximately $67,195 in future nominal dollars to buy what $50,000 buys today.'
      },
      {
        question: 'What is the "Pay Yourself First" principle?',
        answer: 'Pay Yourself First means automatically routing your target monthly savings deposit directly into your savings or investment account on payday, before paying discretionary bills or spending money.'
      },
      {
        question: 'What is a sinking fund?',
        answer: 'A sinking fund is a dedicated savings bucket created for a specific planned expense occurring in the near future (e.g. holiday gifts, annual car insurance, home maintenance, or a vacation), preventing surprise budget blowouts.'
      },
      {
        question: 'Can I set up multiple savings goals simultaneously?',
        answer: 'Yes. Many modern online banks allow you to create distinct "vaults", "buckets", or sub-accounts within a single savings account to track different goals independently.'
      },
      {
        question: 'How does compound interest compound on monthly deposits?',
        answer: 'Interest is calculated at the end of each monthly period on the total accumulated balance (both previous deposits and previously credited interest), allowing your money to grow exponentially.'
      }
    ],
    educationalDisclaimer: 'This savings goal calculator provides educational projections based on compound interest formulas. Actual returns may vary depending on fluctuating bank APYs, tax brackets, and market volatility.'
  },
  {
    id: 'tip-split-bill',
    title: 'Tip & Split Bill Gratuity Calculator',
    slug: 'tip-split-bill-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate standard and custom dining tips, total restaurant bill with gratuity, and equal per-person bill split amounts.',
    description: 'Instantly compute dining gratuity (15%, 18%, 20%, 22%, 25%, or custom percentage) and split restaurant checks, sales tax, and tips equally among dinner party guests with exact individual cost shares.',
    keywords: [
      'tip calculator',
      'split bill calculator',
      'restaurant tip calculator',
      'bill split per person',
      'gratuity calculator',
      'dinner split check',
      'tip percentage calculator'
    ],
    iconName: 'Receipt',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Tip Amount = Subtotal × Tip%; Total Bill = Subtotal + Tip; Per Person Total = Total Bill / Number of Guests; Per Person Tip = Tip Amount / Number of Guests.',
    formulaLatex: 'T = B \\cdot \\frac{r_{\\text{tip}}}{100}, \\quad C_{\\text{total}} = B + T, \\quad C_{\\text{person}} = \\frac{C_{\\text{total}}}{N}, \\quad T_{\\text{person}} = \\frac{T}{N}',
    relatedCalculatorIds: ['sales-tax-tip', 'discount-savings', 'hourly-to-salary', 'fuel-trip'],
    stepByStepInstructions: [
      'Enter the pre-tax or total Subtotal Bill Amount in dollars.',
      'Enter the total Number of Guests splitting the bill (1 to 100).',
      'Select a quick-preset gratuity percentage button (15%, 18%, 20%, 22%, 25%) or type a custom percentage.',
      'Review the Total Per Person share, Total Bill with Gratuity, and individual tip contribution.'
    ],
    educationalDisclaimer: 'Tipping customs vary globally. In North American sit-down dining, standard gratuity ranges between 15% and 22% for attentive table service.',
    faqs: [
      {
        question: 'Should gratuity be calculated on the pre-tax subtotal or post-tax total?',
        answer: 'Standard restaurant etiquette recommends calculating tip percentage on the pre-tax food and beverage subtotal, ensuring you are not tipping on government sales tax.'
      },
      {
        question: 'What are standard tipping percentage guidelines in restaurants?',
        answer: 'In the US and Canada: 15% for acceptable basic service, 18% for good service, 20% for excellent service, and 22% to 25%+ for exceptional dining service and fine dining.'
      },
      {
        question: 'What is automatic gratuity for large dining parties?',
        answer: 'Many restaurants automatically add an 18% to 20% gratuity for parties of 6 or more guests. Always verify your itemized receipt before adding additional tip.'
      },
      {
        question: 'How do you handle bill splitting when guests order vastly different items?',
        answer: 'Equal splitting works well for shared family-style dining. For disparate orders, calculate individual food subtotals, apply the agreed tip percentage to each subtotal, and add proportionate sales tax.'
      }
    ],
  },

  // Batch 3 New Calculators
  {
    id: 'personal-loan-payment',
    title: 'Personal Loan Payment & Total Cost Calculator',
    slug: 'personal-loan-payment-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate fixed monthly personal loan payments, upfront origination fees, total interest, and effective APR.',
    description: 'Calculate exact monthly personal loan payments for debt consolidation, home improvements, or major purchases. Accurately factors in nominal APR, upfront lender origination fees, net disbursed cash, total lifetime borrowing costs, and accelerated payoff savings.',
    keywords: [
      'personal loan calculator',
      'personal loan monthly payment calculator',
      'debt consolidation loan calculator',
      'personal loan interest calculator',
      'loan origination fee calculator',
      'effective apr personal loan',
      'unsecured loan payment schedule',
      'personal loan amortization table'
    ],
    iconName: 'DollarSign',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Monthly Payment: M = P × [r(1 + r)^n] / [(1 + r)^n - 1]; Net Disbursed = P - (P × Origination%); Total Cost = Total Interest + Origination Fee',
    formulaLatex: 'M = P \\left[ \\frac{r(1 + r)^n}{(1 + r)^n - 1} \\right], \\quad P_{\\text{disbursed}} = P(1 - f_{\\text{orig}}), \\quad C_{\\text{total}} = (M \\cdot n - P) + P \\cdot f_{\\text{orig}}',
    relatedCalculatorIds: [
      'credit-card-payoff',
      'debt-snowball-avalanche',
      'auto-loan',
      'amortization-schedule',
      'debt-to-income-dti-advanced'
    ],
    stepByStepInstructions: [
      'Enter your desired Personal Loan Amount.',
      'Input the nominal Annual Interest Rate (APR) offered by the lender.',
      'Select your Loan Term in months (12, 24, 36, 48, or 60 months).',
      'Specify any Lender Origination Fee percentage (typically 0% to 8%).',
      'Optionally specify an Extra Monthly Principal prepayment to see interest savings.',
      'Review your Fixed Monthly Payment, Net Cash Disbursed, and True Effective APR.',
      'Examine the Annual Amortization Schedule and Loan Balance Decay chart.'
    ],
    faqs: [
      {
        question: 'What is an origination fee and how does it affect my personal loan?',
        answer: 'An origination fee is an upfront administrative fee charged by lenders (typically 1% to 8% of the loan amount). Most lenders deduct this fee directly from the loan funds before disbursing cash to your bank account. For example, on a $10,000 loan with a 5% ($500) origination fee, you receive $9,500 in cash but still owe monthly payments on the full $10,000.'
      },
      {
        question: 'What is the difference between nominal interest rate and APR on a personal loan?',
        answer: 'The nominal interest rate is the base percentage charged on your outstanding balance. The Annual Percentage Rate (APR) includes both the nominal interest rate AND upfront lender fees (like origination fees), providing a true all-in annualized borrowing cost.'
      },
      {
        question: 'How do personal loans differ from credit cards?',
        answer: 'Personal loans are fixed-rate installment loans with a set end date (typically 2 to 5 years) and predictable monthly payments. Credit cards are revolving credit lines with variable interest rates that fluctuate with the prime rate, making personal loans much safer for debt consolidation.'
      },
      {
        question: 'Are there prepayment penalties for paying off a personal loan early?',
        answer: 'Most reputable online lenders and banks (such as SoFi, Discover, LightStream, Marcus) do not charge prepayment penalties. However, always verify your loan agreement before making extra principal payments.'
      },
      {
        question: 'What credit score is needed to qualify for a personal loan?',
        answer: 'Borrowers with excellent credit (720+) qualify for the lowest rates (typically 7% to 12% APR). Good credit (660–719) qualifies for 13% to 19% APR. Fair or poor credit (below 640) may face rates of 20% to 35.99% or higher origination fees.'
      },
      {
        question: 'Can I use a personal loan to consolidate high-interest credit card debt?',
        answer: 'Yes. Debt consolidation is the most common use of personal loans. If you replace 24% credit card debt with an 11% fixed personal loan, you save substantial interest and establish a guaranteed debt-free date.'
      },
      {
        question: 'Is a personal loan secured or unsecured?',
        answer: 'Most personal loans are unsecured, meaning they require no collateral (such as your home or car). Secured personal loans require collateral (like a savings CD or vehicle title) in exchange for lower interest rates or higher borrowing limits.'
      },
      {
        question: 'How quickly are personal loan funds disbursed?',
        answer: 'Many modern online lenders approve applications within minutes and disburse funds via direct deposit within 1 to 2 business days after document verification.'
      }
    ],
    educationalDisclaimer: 'This personal loan payment calculator provides estimates based on standard fixed amortization mathematics. Official interest rates, origination fees, loan terms, and approvals depend on lender credit underwriting.'
  },
  {
    id: 'net-worth',
    title: 'Net Worth Calculator & Wealth Solvency Tracker',
    slug: 'net-worth-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate your total household net worth, debt-to-asset ratio, liquidity reserves, and wealth accumulator status.',
    description: 'Calculate your complete financial balance sheet by itemizing liquid cash, retirement accounts (401k/IRA), investment portfolios, real estate, and vehicle equity against consumer debt, mortgages, and student loans. Includes "Millionaire Next Door" age and income wealth benchmarking.',
    keywords: [
      'net worth calculator',
      'how to calculate net worth',
      'assets vs liabilities calculator',
      'debt to asset ratio calculator',
      'millionaire next door formula',
      'household balance sheet calculator',
      'financial solvency calculator',
      'wealth benchmark by age'
    ],
    iconName: 'ShieldCheck',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Net Worth = Total Assets - Total Liabilities; Expected Net Worth = (Age × Pre-Tax Annual Income) / 10; Debt-to-Asset Ratio = (Liabilities / Assets) × 100%',
    formulaLatex: '\\text{NW} = \\sum_{i} A_i - \\sum_{j} L_j, \\quad \\text{NW}_{\\text{expected}} = \\frac{\\text{Age} \\cdot \\text{Income}_{\\text{annual}}}{10}, \\quad D/A = \\frac{\\sum L_j}{\\sum A_i} \\times 100\\%',
    relatedCalculatorIds: [
      'fire-number-calculator',
      'savings-goal-timeline',
      'emergency-fund',
      'retirement-401k',
      'debt-to-income-dti-advanced'
    ],
    stepByStepInstructions: [
      'Itemize your liquid and tangible assets (Cash/Checking, Retirement 401(k)/IRA, Brokerage Investments, Real Estate Market Value, and Vehicles).',
      'Click "+ Add Asset" to include custom assets such as business equity, collectibles, or secondary property.',
      'Itemize all outstanding liabilities (Mortgages, Auto Loans, Student Loans, and Credit Card Debt).',
      'Click "+ Add Liability" to include personal loans or tax debts.',
      'Input your Age and Annual Pre-Tax Income to evaluate your wealth accumulation efficiency ratio.',
      'Review your Total Net Worth, Debt-to-Asset Solvency Ratio, and your Wealth Accumulator benchmark classification (UAW, AAW, or PAW).',
      'Examine the Balance Sheet visual comparison chart comparing Assets, Liabilities, and Equity.'
    ],
    faqs: [
      {
        question: 'What is net worth and why is it the ultimate measure of financial health?',
        answer: 'Net worth is the total dollar value of everything you own (assets) minus everything you owe (debts and liabilities). Unlike high income (which can be erased by high spending), net worth measures the real wealth and financial cushion you have built.'
      },
      {
        question: 'What is the "Millionaire Next Door" expected net worth formula?',
        answer: 'Developed by Dr. Thomas Stanley and Dr. William Danko, the formula is: Expected Net Worth = (Age × Annual Pre-Tax Household Income) / 10. If your net worth is twice this figure, you are a Prodigious Accumulator of Wealth (PAW); if under 0.8x, you are an Under Accumulator of Wealth (UAW).'
      },
      {
        question: 'Should I include my primary home in my net worth calculation?',
        answer: 'Yes, but include only the home equity (Current Market Value minus Remaining Mortgage Balance). If you sell your house, you must pay transaction fees and still need a place to live, which is why liquid net worth is also tracked separately.'
      },
      {
        question: 'What is a healthy Debt-to-Asset Ratio?',
        answer: 'A debt-to-asset ratio under 35% indicates high financial solvency and low financial risk. Ratios between 35% and 60% are typical for younger homeowners with new mortgages. Ratios over 75% signify high financial leverage and vulnerability to economic shocks.'
      },
      {
        question: 'What items should NOT be counted as assets in net worth?',
        answer: 'Do not count depreciating personal consumer goods like clothing, consumer electronics, or furniture, as they have little resale value in an emergency. Only include vehicles at realistic wholesale/trade-in KBB value.'
      },
      {
        question: 'Can someone have a negative net worth?',
        answer: 'Yes. Young professionals and recent college graduates often have negative net worth when their student loans and early career debts exceed their initial savings. Consistently paying down debt and investing will transition net worth into positive territory.'
      },
      {
        question: 'How often should I calculate and track my net worth?',
        answer: 'Tracking your net worth quarterly or at the end of each calendar year provides optimal perspective without obsessing over day-to-day stock market fluctuations.'
      },
      {
        question: 'What is the difference between Net Worth and Liquid Net Worth?',
        answer: 'Total Net Worth includes illiquid property like real estate equity, private business value, and cars. Liquid Net Worth includes only assets that can be converted into cash within days (checking, savings, CDs, and taxable brokerage accounts).'
      }
    ],
    educationalDisclaimer: 'This net worth calculator is for educational tracking and budgeting purposes. Market valuations of real estate and private investments are estimates and subject to market fluctuations.'
  },
  {
    id: 'emergency-fund',
    title: 'Emergency Fund Target & Safety Net Calculator',
    slug: 'emergency-fund-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate your target emergency cash cushion (3, 6, 9, or 12 months) based on essential bare-bones living costs.',
    description: 'Determine exactly how much cash to keep in a high-yield emergency reserve based on detailed essential living expenses (housing, groceries, utilities, debt, health, and dependents). Simulates monthly savings deposits, HYSA compound interest growth, and time to full financial security.',
    keywords: [
      'emergency fund calculator',
      'how much emergency fund do i need',
      'emergency savings calculator',
      '3 month emergency fund',
      '6 month emergency fund',
      'bare bones monthly expenses calculator',
      'high yield savings account calculator',
      'financial safety net calculator'
    ],
    iconName: 'ShieldCheck',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Target Fund = (Housing + Utilities + Groceries + Debt + Health + Transport + Care) × Target Months; Gap = Target - Current',
    formulaLatex: 'E_{\\text{target}} = N_{\\text{months}} \\cdot \\sum_{k=1}^7 C_k, \\quad \\text{Gap} = \\max(0, E_{\\text{target}} - S_{\\text{current}}), \\quad B_t = B_{t-1}(1 + r_{\\text{HYSA}}) + D_{\\text{monthly}}',
    relatedCalculatorIds: [
      'savings-goal-timeline',
      'net-worth',
      'credit-card-payoff',
      'debt-snowball-avalanche',
      'inflation-purchasing-power'
    ],
    stepByStepInstructions: [
      'Enter your monthly essential bare-bones living expenses (Housing, Utilities, Groceries, Minimum Debt Payments, Health/Insurance, Transportation, Childcare).',
      'Select your emergency cushion target duration: 3 months (high stability/dual income), 6 months (standard), 9 months, or 12 months (freelance/single earner).',
      'Input your Current Emergency Cash Savings balance.',
      'Specify your planned Monthly Savings Contribution and your High-Yield Savings Account (HYSA) APY %.',
      'Review your Target Emergency Fund size, current percentage funded, and remaining cash gap.',
      'Examine the interactive Savings Accumulation Trajectory chart showing your month-by-month path to a fully funded safety net.'
    ],
    faqs: [
      {
        question: 'How many months of emergency savings do I really need?',
        answer: 'Financial planners recommend 3 months of essential expenses for dual-income households with stable jobs; 6 months for single-income households or families with children; and 9 to 12 months for freelancers, business owners, commission-based earners, or those in volatile industries.'
      },
      {
        question: 'What expenses should be included in an emergency fund calculation?',
        answer: 'Only essential bare-bones survival expenses: rent/mortgage, utilities, essential groceries, healthcare prescriptions, basic transportation/gas, minimum debt obligations, and dependent care. Discretionary spending (dining out, streaming subscriptions, vacations, shopping) should be excluded.'
      },
      {
        question: 'Where should I store my emergency fund?',
        answer: 'Your emergency fund should be held in an FDIC-insured High-Yield Savings Account (HYSA) or Money Market Fund (MMF). This keeps your money 100% liquid, safe from stock market downturns, and earning competitive interest (typically 4% to 5% APY).'
      },
      {
        question: 'Should I invest my emergency fund in stocks or mutual funds?',
        answer: 'No. The stock market is volatile and can drop 20% to 40% during economic recessions—precisely when you are most likely to experience a job loss or emergency. Emergency funds are insurance, not growth investments.'
      },
      {
        question: 'What is a "Starter Emergency Fund"?',
        answer: 'A starter emergency fund is a temporary cash buffer of $1,000 to $2,500 established before aggressively attacking high-interest credit card debt. Once high-interest debt is eliminated, you scale the emergency fund to a full 3 to 6 months of expenses.'
      },
      {
        question: 'What qualifies as a genuine emergency to withdraw from the fund?',
        answer: 'A genuine emergency is unexpected, necessary, and urgent: sudden job loss or income reduction, major car engine failure required for commuting, emergency medical or dental procedures, or critical home repairs (broken furnace, roof leak). Planned expenses like holiday gifts or car tires should be budgeted in sinking funds.'
      },
      {
        question: 'How often should I recalculate my emergency fund target?',
        answer: 'Recalculate your target annually or whenever you experience a major life transition: moving to a new home, getting a raise or changing jobs, having a child, or paying off a significant recurring loan.'
      },
      {
        question: 'How do I replenish my emergency fund after using it?',
        answer: 'When an emergency occurs and you spend part of your fund, temporarily pause extra investing and discretionary spending to redirect that cash flow back into your savings account until your target cushion is fully restored.'
      }
    ],
    educationalDisclaimer: 'This emergency fund calculator provides educational savings targets based on user-provided expense inputs. Individual safety net needs may vary based on job stability, insurance deductibles, and family circumstances.'
  },
  {
    id: 'lean-body-mass',
    title: 'Lean Body Mass & Fat-Free Mass Index (FFMI) Calculator',
    slug: 'lean-body-mass-calculator',
    categoryId: 'health',
    shortDescription: 'Calculate Lean Body Mass (LBM), body fat mass, and Fat-Free Mass Index (FFMI) using Boer, James, and Hume formulas.',
    description: 'Estimate fat-free muscle tissue weight and body composition percentages using validated clinical formulas (Boer 1984, James 1976, Hume 1966). Computes dual Imperial (lbs) and Metric (kg) breakdowns, body fat percentage, and Fat-Free Mass Index (FFMI) athletic build rating.',
    keywords: [
      'lean body mass calculator',
      'lbm calculator',
      'fat free mass index',
      'ffmi calculator',
      'boer formula lean mass',
      'james formula body composition',
      'body fat mass calculator',
      'natural muscle mass index'
    ],
    iconName: 'Activity',
    isPopular: false,
    isNew: false,
    formulaDescription: 'Boer Male LBM = (0.407 × W) + (0.267 × H) - 19.2; Boer Female LBM = (0.252 × W) + (0.473 × H) - 48.3; FFMI = LBM (kg) / Height (m)²',
    formulaLatex: '\\text{LBM}_{\\text{Boer, M}} = 0.407 W_{\\text{kg}} + 0.267 H_{\\text{cm}} - 19.2, \\quad \\text{FFMI} = \\frac{\\text{LBM}_{\\text{kg}}}{(H_{\\text{m}})^2}',
    relatedCalculatorIds: ['ideal-body-weight', 'macro-nutrient', 'bmr-calculator', 'macro-split'],
    stepByStepInstructions: [
      'Select biological gender: Male or Female.',
      'Select preferred measurement unit system: Imperial (lbs / inches) or Metric (kg / cm).',
      'Enter your total body weight and height.',
      'Review your estimated Lean Body Mass (LBM) in pounds and kilograms, total body fat mass, and body fat percentage.',
      'Check your Fat-Free Mass Index (FFMI) score and natural muscular development rating.'
    ],
    educationalDisclaimer: 'Lean Body Mass equations provide physiological estimates based on clinical population averages. Direct imaging modalities like dual-energy X-ray absorptiometry (DEXA) or hydrostatic weighing provide higher precision.',
    faqs: [
      {
        question: 'What is Lean Body Mass (LBM)?',
        answer: 'Lean Body Mass represents the total weight of your body minus all fat tissue. It includes skeletal muscle, bones, organs, water, tendons, and connective tissues.'
      },
      {
        question: 'What is Fat-Free Mass Index (FFMI) and how is it interpreted?',
        answer: 'FFMI measures muscularity independent of height. Scores below 18 indicate below-average muscle mass; 18–20 is average; 21–22 is athletic/above-average; 23–25 is elite natural bodybuilder level; and above 25 is near the natural physiological ceiling.'
      },
      {
        question: 'How do the Boer, James, and Hume formulas differ?',
        answer: 'The Boer formula (1984) is the current gold standard in clinical pharmacology for dosing. The James formula (1976) uses quadratic height/weight ratios, and Hume (1966) uses linear regression. This calculator averages all three validated models for balanced precision.'
      },
      {
        question: 'Why is Lean Body Mass more important than total body weight?',
        answer: 'LBM determines your Basal Metabolic Rate (BMR)—muscular tissue burns more calories at rest than adipose fat. Tracking LBM during weight loss ensures you are losing fat while preserving metabolically active muscle.'
      }
    ],
  },
  {
    id: 'pythagorean-theorem',
    title: 'Pythagorean Theorem & Right Triangle Geometry Solver',
    slug: 'pythagorean-theorem-calculator',
    categoryId: 'math',
    shortDescription: 'Solve side a, side b, or hypotenuse c (a² + b² = c²), acute interior angles, triangle area, perimeter, and altitude.',
    description: 'Calculate any missing side of a right-angled triangle using the Pythagorean Theorem (a² + b² = c²). Computes hypotenuse length, leg lengths, acute interior angles in degrees and radians, triangle area, perimeter, and altitude to hypotenuse with step-by-step proofs.',
    keywords: [
      'pythagorean theorem calculator',
      'hypotenuse calculator',
      'right triangle solver',
      'a2 b2 c2 calculator',
      'find missing side triangle',
      'right triangle area perimeter',
      'pythagorean triples calculator'
    ],
    iconName: 'Triangle',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Hypotenuse c = √(a² + b²); Leg a = √(c² - b²); Leg b = √(c² - a²); Area = (a × b) / 2; Altitude h = (a × b) / c',
    formulaLatex: 'a^2 + b^2 = c^2 \\implies c = \\sqrt{a^2 + b^2}, \\quad \\alpha = \\arctan\\left(\\frac{a}{b}\\right), \\quad A = \\frac{ab}{2}, \\quad h = \\frac{ab}{c}',
    relatedCalculatorIds: ['triangle', 'circle-calculator', 'scientific', 'vector-cross-dot'],
    stepByStepInstructions: [
      'Select the target parameter to solve for: Hypotenuse (c), Leg Side (a), or Leg Side (b).',
      'Enter the known positive numerical lengths for the remaining two sides.',
      'Instantly view the calculated third side length, acute angles (α and β in degrees), area, perimeter, and altitude.'
    ],
    educationalDisclaimer: 'The Pythagorean Theorem applies strictly to planar Euclidean right triangles where one interior angle equals exactly 90 degrees (π/2 radians).',
    faqs: [
      {
        question: 'What is the Pythagorean Theorem?',
        answer: 'In any Euclidean right triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the lengths of the other two sides: a² + b² = c².'
      },
      {
        question: 'What is a Pythagorean Triple?',
        answer: 'A Pythagorean Triple consists of three positive integers (a, b, c) that satisfy a² + b² = c². The most famous primitive triples are (3, 4, 5), (5, 12, 13), (8, 15, 17), and (7, 24, 25).'
      },
      {
        question: 'Can the hypotenuse be shorter than a side leg?',
        answer: 'No. In a right triangle, the hypotenuse is always strictly the longest side because it lies opposite the largest interior angle (90°).'
      },
      {
        question: 'How do you find the altitude to the hypotenuse?',
        answer: 'The altitude (perpendicular height from the right angle to the hypotenuse) is calculated by dividing double the area by the hypotenuse: h = (a × b) / c.'
      }
    ],
  },
  {
    id: 'ratio-proportion',
    title: 'Ratio & Direct/Inverse Proportion Solver',
    slug: 'ratio-proportion-calculator',
    categoryId: 'math',
    shortDescription: 'Solve missing ratio proportion terms (A:B = C:X), direct/inverse cross-multiplication, and GCD ratio simplification.',
    description: 'Find unknown missing fourth terms in direct and inverse proportions (A/B = C/X), reduce arbitrary ratios to simplest coprime integer form using Euclidean Greatest Common Divisor (GCD), and compute decimal ratios and scaling factors.',
    keywords: [
      'ratio calculator',
      'proportion solver',
      'cross multiplication calculator',
      'solve for x ratio',
      'simplify ratio calculator',
      'direct proportion calculator',
      'inverse proportion calculator',
      'ratio to fraction simplifier'
    ],
    iconName: 'Percent',
    isPopular: false,
    isNew: false,
    formulaDescription: 'Direct Proportion: X = (B × C) / A; Inverse Proportion: X = (A × B) / C; Simplification: A / GCD(A,B) : B / GCD(A,B)',
    formulaLatex: '\\frac{A}{B} = \\frac{C}{X} \\implies X = \\frac{B \\cdot C}{A}, \\quad A \\cdot B = C \\cdot X \\implies X = \\frac{A \\cdot B}{C}',
    relatedCalculatorIds: ['fraction-calculator', 'percentage', 'algebra-solver', 'scientific'],
    stepByStepInstructions: [
      'In the Proportion Solver section, enter the known terms A, B, and C to solve for missing term X in A:B = C:X.',
      'Inspect the Direct Proportion cross-multiplication result and the Inverse Proportion product-equality result.',
      'In the Ratio Simplifier section, enter two integers to compute the Greatest Common Divisor (GCD) and view the simplest irreducible integer ratio.'
    ],
    educationalDisclaimer: 'Proportions assume linear scaling relationships between quantities. For inverse proportions, the product of terms remains constant (A × B = C × X).',
    faqs: [
      {
        question: 'How do you solve a direct ratio proportion A:B = C:X?',
        answer: 'By cross-multiplication: set the products of the extremes and means equal (A × X = B × C), then divide by A: X = (B × C) / A.'
      },
      {
        question: 'What is the difference between direct and inverse proportions?',
        answer: 'In direct proportions, as one value increases, the other increases proportionally (constant quotient A/B). In inverse proportions (e.g. workers vs time), as one value increases, the other decreases proportionally (constant product A × B).'
      },
      {
        question: 'How do you simplify a ratio to lowest terms?',
        answer: 'Find the Greatest Common Divisor (GCD) of both numbers using the Euclidean algorithm, then divide both terms by that GCD.'
      },
      {
        question: 'Can ratios contain decimals or fractions?',
        answer: 'Yes. Decimal ratios can be converted to standard integer ratios by multiplying both terms by 10, 100, or the lowest common denominator.'
      }
    ],
  },
  {
    id: 'flooring-square-footage',
    title: 'Flooring Square Footage & Box Carton Calculator',
    slug: 'flooring-square-footage-calculator',
    categoryId: 'construction',
    shortDescription: 'Calculate room square footage, required flooring boxes/cartons, cut waste factor %, and total material cost.',
    description: 'Determine exact square footage for hardwood, luxury vinyl plank (LVP), laminate, or ceramic tile flooring. Computes 5% to 20% pattern cutting waste allowances, total cartons/boxes to purchase, and total material cost with price per square foot.',
    keywords: [
      'flooring calculator',
      'flooring square footage calculator',
      'how many boxes of flooring do i need',
      'vinyl plank flooring calculator',
      'lvp flooring estimator',
      'hardwood flooring calculator',
      'flooring waste factor calculator',
      'tile square footage calculator'
    ],
    iconName: 'Grid',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Raw Area = Length × Width; Total Sq Ft = Raw Area × (1 + Waste %); Boxes Needed = Ceil(Total Sq Ft / Sq Ft per Box); Total Cost = Boxes × Sq Ft per Box × Price per Sq Ft.',
    formulaLatex: 'A_{\\text{raw}} = L \\times W, \\quad A_{\\text{total}} = A_{\\text{raw}}(1 + W_{\\text{pct}}), \\quad N_{\\text{boxes}} = \\left\\lceil \\frac{A_{\\text{total}}}{S_{\\text{box}}} \\right\\rceil, \\quad C_{\\text{total}} = N_{\\text{boxes}} \\cdot S_{\\text{box}} \\cdot P_{\\text{sqft}}',
    relatedCalculatorIds: ['tile-grout', 'paint-coverage', 'deck-board', 'drywall-sheet', 'construction'],
    stepByStepInstructions: [
      'Enter the Room Length and Room Width in feet.',
      'Specify the Cut & Layout Waste Factor % (standard rectangular room: 10%, diagonal plank or herringbone layout: 15-20%).',
      'Enter the coverage per carton (Square Feet per Box, typically 18 to 25 sq ft for LVP/hardwood).',
      'Enter the Material Price per Square Foot in dollars.',
      'Review total square footage required, exact boxes/cartons to purchase, actual purchased square footage, and total cost.'
    ],
    educationalDisclaimer: 'Always round up to full carton quantities as retailers sell flooring by the sealed box. Retain an extra unopened carton for future plank repairs.',
    faqs: [
      {
        question: 'How much waste percentage should I add when ordering flooring?',
        answer: 'Standard rectangular rooms with parallel plank layouts require a 10% waste allowance. Rooms with numerous closets, alcoves, or diagonal installations require 15%. Herringbone or chevron patterns require 20% waste.'
      },
      {
        question: 'How many square feet are in a standard box of flooring?',
        answer: 'Carton coverage varies by manufacturer and plank thickness, typically ranging from 18 to 24 sq ft per box for Luxury Vinyl Plank (LVP) and 20 to 25 sq ft for solid hardwood.'
      },
      {
        question: 'Why can I not purchase the exact net square footage?',
        answer: 'Flooring materials are sold only in sealed whole boxes. Purchasing whole boxes ensures batch color consistency and provides spare planks for future board replacement.'
      },
      {
        question: 'Should I calculate closet floor area separately?',
        answer: 'Yes. Measure closet lengths and widths separately and add their square footage to the room\'s raw total before applying the waste percentage.'
      }
    ],
  },
  {
    id: 'overtime-pay',
    title: 'Overtime & Double-Time Pay Calculator',
    slug: 'overtime-pay-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate regular earnings, 1.5x time-and-a-half overtime, 2.0x double-time pay, shift differentials, and blended hourly rates.',
    description: 'Accurately calculate weekly and bi-weekly gross pay with standard 1.5x overtime and 2.0x double-time compensation. Includes FLSA 40-hour rules, California daily overtime thresholds, shift differentials, and annualized projections.',
    keywords: [
      'overtime pay calculator',
      'time and a half calculator',
      'double time pay rate',
      'FLSA overtime calculation',
      'california daily overtime calculator',
      'shift differential overtime rate',
      'effective blended hourly rate',
      'gross paycheck overtime estimator'
    ],
    iconName: 'Clock',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Gross Pay = (Regular Hours × Base Rate) + (1.5 × Base Rate × Overtime Hours) + (2.0 × Base Rate × Double-Time Hours)',
    formulaLatex: 'P_{\\text{gross}} = H_{\\text{reg}} \\cdot R_{\\text{base}} + 1.5 H_{\\text{OT}} \\cdot R_{\\text{base}} + 2.0 H_{\\text{DT}} \\cdot R_{\\text{base}}, \\quad R_{\\text{blended}} = \\frac{P_{\\text{gross}}}{H_{\\text{total}}}',
    relatedCalculatorIds: [
      'hourly-to-salary',
      'federal-income-tax-bracket',
      'self-employment-tax-1099',
      'emergency-fund',
      'personal-loan-payment'
    ],
    stepByStepInstructions: [
      'Select your pay period cycle: Weekly (40-hour overtime threshold) or Bi-Weekly (80-hour cycle).',
      'Enter your standard Base Hourly Wage (e.g. $28.50/hr).',
      'Specify your Regular Hours worked (up to 40 hours per workweek).',
      'Input 1.5x Time-and-a-Half Overtime Hours worked during the period.',
      'Optionally enter 2.0x Double-Time Hours (e.g. Sundays, 7th consecutive workday, or holidays).',
      'Include any Night / Weekend Shift Differentials ($ or % premium added to regular rate).',
      'Review your total gross paycheck, effective blended hourly rate, and annualized earnings breakdown.'
    ],
    faqs: [
      {
        question: 'When does federal overtime pay apply under the FLSA?',
        answer: 'Under the federal Fair Labor Standards Act (FLSA), covered non-exempt employees must receive overtime pay of at least 1.5 times their regular rate of pay for all hours worked exceeding 40 in a single standard workweek (7 consecutive 24-hour periods).'
      },
      {
        question: 'What is California\'s daily overtime law and how does it work?',
        answer: 'California law requires daily overtime pay: non-exempt employees earn 1.5x for all hours worked beyond 8 up to 12 in a single workday, and 2.0x (double time) for all hours worked beyond 12 in a workday. Additionally, the first 8 hours on the 7th consecutive day of work in a workweek are paid at 1.5x, and hours beyond 8 on that 7th day are paid at 2.0x.'
      },
      {
        question: 'How do shift differentials affect overtime calculations?',
        answer: 'Under FLSA regulations, non-discretionary shift differentials (such as night or weekend premiums) must be included in the employee\'s "regular rate of pay" before multiplying by 1.5x or 2.0x to determine the overtime rate.'
      },
      {
        question: 'Who is exempt from overtime pay under federal law?',
        answer: 'Executive, administrative, professional, outside sales, and certain computer employees may be exempt from overtime if they meet specific salary level tests and job duties tests defined by the Department of Labor.'
      },
      {
        question: 'Is overtime mandatory or can employees decline overtime shifts?',
        answer: 'Unless restricted by a collective bargaining agreement (union contract) or specific state nurse/safety regulations, employers can generally require mandatory overtime, provided employees are properly compensated under overtime laws.'
      },
      {
        question: 'What is an "effective blended hourly rate"?',
        answer: 'The blended hourly rate is calculated as total gross earnings divided by total hours worked. Because overtime and double-time hours pay a premium, your effective hourly rate is higher than your nominal base rate.'
      },
      {
        question: 'Are employers required to pay double time on holidays or weekends?',
        answer: 'Federal law does not require extra pay for work on weekends or holidays unless those hours push total hours over 40 in the workweek. However, company policies, union agreements, or state laws (like California) may mandate premium double-time pay.'
      },
      {
        question: 'Can employers offer compensatory time off ("comp time") instead of cash overtime?',
        answer: 'Private sector employers cannot offer comp time in lieu of overtime pay to non-exempt employees under the FLSA. Only public sector government agencies may provide comp time at a rate of 1.5 hours of PTO for each hour of overtime worked.'
      }
    ],
    educationalDisclaimer: 'This calculator estimates gross pre-tax earnings under FLSA standard rates and optional state provisions. Exact payroll net amounts may vary depending on local labor laws, union contracts, and statutory tax withholdings.'
  },
  {
    id: 'reading-time-word-count',
    title: 'Reading Time, Speaking Speed & Word Count Calculator',
    slug: 'reading-time-word-count-calculator',
    categoryId: 'everyday',
    shortDescription: 'Analyze document word count, character count, silent reading time, and spoken speech presentation duration.',
    description: 'Calculate silent reading duration (180–300 WPM), public speech/presentation time (120–160 WPM), word count, sentence count, and character metrics (with and without spaces) for essays, articles, speeches, and video scripts.',
    keywords: [
      'reading time calculator',
      'word count calculator',
      'speaking time calculator',
      'speech duration calculator',
      'words per minute reading time',
      'script duration calculator',
      'text analyzer character count',
      'presentation time estimator'
    ],
    iconName: 'FileText',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Reading Time (Minutes) = Word Count / Reading WPM; Speaking Time (Minutes) = Word Count / Speaking WPM; Total Seconds = Minutes × 60.',
    formulaLatex: 'T_{\\text{read}} = \\frac{N_{\\text{words}}}{\\text{WPM}_{\\text{read}}}, \\quad T_{\\text{speak}} = \\frac{N_{\\text{words}}}{\\text{WPM}_{\\text{speak}}}',
    relatedCalculatorIds: ['time-date', 'gpa', 'unit-converter', 'screen-time-focus'],
    stepByStepInstructions: [
      'Type or paste your document, essay, or speech script into the text area.',
      'Adjust the Silent Reading Speed slider (standard adult average is 200–250 WPM; slow/technical is 150 WPM; speed reading is 350+ WPM).',
      'Adjust the Speaking / Presentation Speed slider (standard presentation pace is 130–150 WPM; auctioneer/fast pace is 180+ WPM).',
      'Inspect total words, characters (with and without spaces), sentence count, paragraph count, and formatted reading/speaking durations.'
    ],
    educationalDisclaimer: 'Reading and speaking speeds vary based on material complexity, audience comprehension requirements, vocal pauses, and slide transitions in live presentations.',
    faqs: [
      {
        question: 'What is the average silent reading speed for adults?',
        answer: 'Most adults read non-technical prose at an average speed of 200 to 250 words per minute (WPM). Technical, medical, or academic literature drops to 120–160 WPM.'
      },
      {
        question: 'What is the recommended speaking speed for public speeches and presentations?',
        answer: 'A comfortable conversational presentation rate is 130 to 150 words per minute (WPM). Speaking slower than 120 WPM can sound sluggish, while exceeding 160 WPM reduces audience retention.'
      },
      {
        question: 'How many words is a 5-minute speech?',
        answer: 'At an average speaking pace of 130 to 140 WPM, a 5-minute speech is approximately 650 to 700 words.'
      },
      {
        question: 'How long does it take to read 1,000 words?',
        answer: 'At an average reading speed of 230 WPM, reading 1,000 words takes approximately 4 minutes and 20 seconds silently, or roughly 7 minutes if spoken aloud.'
      }
    ],
  },
  {
    id: 'concrete-footing-slab',
    title: 'Concrete Slab, Footing & Bag Estimator',
    slug: 'concrete-footing-slab-calculator',
    categoryId: 'construction',
    shortDescription: 'Calculate concrete volume in cubic yards, cubic meters, pre-mixed 80lb/60lb bags, and ready-mix truck costs.',
    description: 'Determine required concrete volume for slabs, driveways, patios, and foundation footings. Computes cubic yards, cubic meters, pre-mixed bag quantities (80 lb and 60 lb bags), and delivered ready-mix truck cost with customizable excavation waste margins.',
    keywords: [
      'concrete calculator',
      'concrete slab calculator',
      'cubic yards concrete',
      'how many bags of concrete do i need',
      'concrete footing calculator',
      '80lb concrete bags',
      'ready mix concrete cost',
      'concrete volume calculator'
    ],
    iconName: 'HardHat',
    isPopular: true,
    isNew: false,
    formulaDescription: 'Volume (Cubic Feet) = Length (ft) × Width (ft) × Thickness (ft); Cubic Yards = Cubic Feet / 27; Total Yards = Cubic Yards × (1 + Waste %); 80lb Bags = Total Cu Ft / 0.60; 60lb Bags = Total Cu Ft / 0.45.',
    formulaLatex: 'V_{\\text{cu yd}} = \\frac{L \\cdot W \\cdot \\left(\\frac{T_{\\text{in}}}{12}\\right)}{27} \\times (1 + W_{\\text{pct}}), \\quad N_{80\\text{lb}} = \\left\\lceil \\frac{V_{\\text{cu ft}}}{0.60} \\right\\rceil',
    relatedCalculatorIds: ['brick-mortar', 'roof-pitch-rafter', 'construction', 'concrete-slab-volume', 'gravel-paving'],
    stepByStepInstructions: [
      'Select structure type: Slab / Patio / Driveway or Continuous Footing.',
      'Enter the Length and Width of the pour in feet.',
      'Enter the Slab or Footing Thickness/Depth in inches (standard patio/walkway: 4", heavy vehicle driveway: 6", garage foundation: 8-12").',
      'Specify the Excavation & Spillage Waste allowance percentage (typically 10%).',
      'Enter the local supplier Price per Delivered Cubic Yard ($120 - $160/cu yd typical).',
      'Review total concrete volume in cubic yards and cubic meters, number of 80 lb or 60 lb bags needed for DIY batch mixing, and estimated ready-mix truck cost.'
    ],
    educationalDisclaimer: 'Excavation ground irregularities, sub-base compaction, and formwork bowing typically consume 10% more concrete than theoretical dimensions. For orders over 1 cubic yard, ready-mix truck delivery is significantly more economical than hand-mixing bags.',
    faqs: [
      {
        question: 'How many 80 lb bags of pre-mixed concrete equal 1 cubic yard?',
        answer: 'One cubic yard of solid concrete requires 45 pre-mixed 80 lb bags (or 60 pre-mixed 60 lb bags). Each 80 lb bag yields approximately 0.60 cubic feet of wet mixed concrete.'
      },
      {
        question: 'When should I order a ready-mix concrete truck vs mixing bags?',
        answer: 'If your project requires more than 1.0 to 1.5 cubic yards (45 to 65+ bags), ordering a ready-mix delivery truck saves immense physical labor and ensures consistent compressive strength across the entire slab.'
      },
      {
        question: 'What thickness is recommended for concrete slabs?',
        answer: 'Sidewalks, walkways, and residential patios are typically poured 4 inches thick (4,000 psi). Driveways supporting standard passenger cars should be 4 to 5 inches thick with rebar or wire mesh; heavy truck driveways should be 6 inches thick.'
      },
      {
        question: 'How do you calculate concrete for a foundation footing?',
        answer: 'Multiply the total linear length of the footing by its width (in feet) and its depth (in feet), divide by 27 to get cubic yards, and add 10% to 15% for soil trench unevenness.'
      }
    ],
  },

  // 48 New Calculators
  {
    id: 'rental-property-roi',
    title: 'Rental Property ROI & Cap Rate Calculator',
    slug: 'rental-property-roi-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate Real Estate Net Operating Income (NOI), Cap Rate, Cash-on-Cash Return, Monthly Cash Flow, and 10-year wealth equity.',
    description: 'Evaluate real estate investment properties with institutional accuracy. Accurately models gross rental revenue, vacancy reserves, property management fees, maintenance/CapEx budgets, mortgage debt service, Cash-on-Cash ROI, Cap Rate, DSCR, and 10-year equity accumulation.',
    keywords: [
      'rental property calculator',
      'cap rate calculator real estate',
      'cash on cash return calculator',
      'rental property roi calculator',
      'net operating income noi calculator',
      'dscr calculator rental property',
      '1 percent rule real estate calculator',
      'real estate cash flow calculator'
    ],
    iconName: 'Building',
    isPopular: true,
    isNew: true,
    formulaDescription: 'NOI = Effective Gross Income - Operating Expenses; Cap Rate = (NOI / Purchase Price) × 100; Cash-on-Cash = (Annual Cash Flow / Total Cash Invested) × 100',
    formulaLatex: '\\text{NOI} = \\text{EGI} - \\text{OpEx}, \\quad \\text{Cap Rate} = \\frac{\\text{NOI}}{\\text{Price}} \\times 100, \\quad \\text{CoC ROI} = \\frac{\\text{Cash Flow}_{\\text{annual}}}{\\text{Cash Invested}} \\times 100',
    relatedCalculatorIds: [
      'mortgage',
      'debt-to-income-dti-advanced',
      'amortization-schedule',
      'roi-margin',
      'net-worth'
    ],
    stepByStepInstructions: [
      'Enter the Property Purchase Price, Down Payment %, Closing Costs %, and Initial Renovation/Rehab budget.',
      'Specify the Mortgage Interest Rate and Loan Term (years) for the debt service financing.',
      'Enter Gross Monthly Rent and any other income (parking, laundry, storage fees).',
      'Set an estimated Vacancy Reserve percentage (typically 5% to 8%).',
      'Input operating expenses: Annual Property Taxes, Hazard Insurance, Management Fee %, and Maintenance/CapEx reserve %.',
      'Review your Net Monthly Cash Flow, Capitalization Rate (Cap Rate), Cash-on-Cash Return (CoC ROI), and DSCR ratio.',
      'Examine the 1% Rule check, Expense Outflows Pie Chart, and 10-Year Wealth Accumulation Schedule.'
    ],
    faqs: [
      {
        question: 'What is Capitalization Rate (Cap Rate) and how is it calculated?',
        answer: 'Cap Rate measures the unleveraged, annual rate of return on a real estate investment based solely on its income potential: Cap Rate = (Net Operating Income / Purchase Price) × 100. It excludes mortgage debt service to allow direct comparison between properties regardless of how they are financed.'
      },
      {
        question: 'What is the difference between Cap Rate and Cash-on-Cash Return?',
        answer: 'Cap Rate evaluates the property as if it were purchased 100% in cash (NOI / Total Price). Cash-on-Cash Return measures the actual cash return on your out-of-pocket money invested after paying mortgage debt service: Cash-on-Cash = (Annual Net Cash Flow / Total Cash Invested) × 100.'
      },
      {
        question: 'What is Net Operating Income (NOI)?',
        answer: 'NOI is the total revenue generated by a rental property (gross rents plus fees, minus vacancy loss) minus all operating expenses (property taxes, insurance, repairs, maintenance, management fees, HOA). NOI does NOT subtract mortgage principal, interest, or capital depreciation.'
      },
      {
        question: 'What is the 1% Rule in real estate investing?',
        answer: 'The 1% Rule is a rapid screening guideline stating that a rental property gross monthly rent should equal at least 1% of its total acquisition cost (purchase price + rehab). For a $300,000 property, target rent is $3,000/month. If met, the property typically generates positive net cash flow.'
      },
      {
        question: 'What is the Debt Service Coverage Ratio (DSCR)?',
        answer: 'DSCR measures the property ability to cover its annual mortgage debt with net operating income: DSCR = Annual NOI / Annual Mortgage Debt Service. Lenders typically require a DSCR of at least 1.20 to 1.25 to qualify for investment property loans.'
      },
      {
        question: 'How much should I reserve for rental property maintenance and CapEx?',
        answer: 'Real estate investors typically allocate 5% to 10% of monthly gross rent for ongoing routine maintenance, and an additional 5% to 10% for Capital Expenditures (CapEx—roof replacement, HVAC systems, water heaters, plumbing overhauls).'
      },
      {
        question: 'What are the four pillars of real estate wealth generation?',
        answer: 'Real estate builds wealth through four simultaneous channels: 1) Cash Flow (monthly rental profit); 2) Principal Paydown (tenants paying down your mortgage); 3) Property Appreciation (long-term increase in home value); and 4) Tax Advantages (depreciation write-offs, 1031 exchanges, and interest deductions).'
      },
      {
        question: 'What is a good Cash-on-Cash return for a residential rental property?',
        answer: 'In most US real estate markets, an 8% to 12% Cash-on-Cash return is considered strong for residential properties. In high-appreciation coastal markets, investors may accept 4%–6% cash-on-cash in exchange for higher long-term property equity growth.'
      }
    ],
    educationalDisclaimer: 'This rental property calculator provides educational cash flow and ROI projections based on user-supplied assumptions. Actual real estate returns vary due to tenant vacancies, property management performance, unexpected capital repairs, and local housing market fluctuations.'
  },
  {
    id: 'amortization-schedule',
    title: 'Loan Amortization Schedule & Prepayment Calculator',
    slug: 'amortization-schedule-calculator',
    categoryId: 'finance',
    shortDescription: 'Generate complete monthly and annual loan amortization schedules with extra principal prepayments and interest savings.',
    description: 'Calculate detailed month-by-month and year-by-year loan amortization schedules for mortgages, auto loans, and personal loans. Accurately simulates recurring extra monthly payments, one-time lump sum principal paydowns, lifetime interest savings, and accelerated payoff dates.',
    keywords: [
      'amortization schedule calculator',
      'loan amortization calculator with extra payments',
      'mortgage amortization schedule',
      'principal and interest breakdown',
      'loan payoff schedule table',
      'extra principal payment calculator',
      'lump sum loan payoff calculator',
      'monthly loan payment breakdown'
    ],
    iconName: 'Table',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Monthly Payment M = P × [r(1 + r)^n] / [(1 + r)^n - 1]; Period Interest I_t = B_{t-1} × r; Period Principal P_t = M - I_t + Extra',
    formulaLatex: 'M = P \\left[ \\frac{r(1 + r)^n}{(1 + r)^n - 1} \\right], \\quad I_t = B_{t-1} \\cdot r, \\quad P_t = M - I_t + \\text{Extra}, \\quad B_t = B_{t-1} - P_t',
    relatedCalculatorIds: [
      'mortgage',
      'biweekly-mortgage-payoff',
      'auto-loan',
      'personal-loan-payment',
      'debt-snowball-avalanche'
    ],
    stepByStepInstructions: [
      'Enter your initial Loan Principal Amount.',
      'Input the Annual Interest Rate (APR) and select your Loan Term in years.',
      'Optionally specify an Extra Monthly Principal prepayment amount.',
      'Optionally specify a One-Time Lump Sum payment (e.g. from an annual bonus or tax refund) and the target month.',
      'Review your Standard Monthly Payment (Principal & Interest) and total interest savings.',
      'Examine the interactive Standard vs Accelerated Loan Trajectory comparison chart.',
      'Toggle between Year-by-Year summary and Month-by-Month detailed Amortization Tables.'
    ],
    faqs: [
      {
        question: 'What is loan amortization and how does it work?',
        answer: 'Amortization is the process of spreading a loan into a series of fixed periodic payments. In the early years, the majority of each payment goes toward interest charges because the outstanding loan balance is high. As the principal balance declines over time, a progressively larger percentage of each monthly payment reduces the principal.'
      },
      {
        question: 'How do extra principal payments accelerate loan payoff?',
        answer: 'When you make an extra payment designated for principal, 100% of that money directly reduces your remaining loan balance. Because the next month interest charge is calculated on a smaller balance, more of your regular payment goes toward principal, creating an accelerating compound payoff cycle.'
      },
      {
        question: 'What is the difference between a monthly amortization schedule and a bi-weekly schedule?',
        answer: 'A monthly schedule involves 12 payments per year. A bi-weekly schedule involves paying half your monthly payment every two weeks (26 half-payments = 13 full payments per year). This extra one full monthly payment per year can shorten a 30-year mortgage by 4 to 6 years and save tens of thousands in interest.'
      },
      {
        question: 'What is the crossover point in an amortization schedule?',
        answer: 'The crossover point is the exact month in your loan term when the principal portion of your payment becomes larger than the interest portion. On a 30-year mortgage at 6.5% interest, the crossover point typically occurs around year 14 to 16.'
      },
      {
        question: 'Is it better to make extra monthly payments or a one-time lump sum?',
        answer: 'Both reduce interest and shorten the loan, but timing matters: making a lump-sum payment early in the loan life has the greatest impact because it eliminates years of compounding interest on that principal chunk.'
      },
      {
        question: 'Can I request my lender to recast my loan after a lump sum payment?',
        answer: 'Yes. Loan recasting keeps your existing interest rate and remaining maturity date while recalculating a lower monthly payment based on the newly reduced principal balance. This provides cash-flow relief without paying mortgage refinance fees.'
      },
      {
        question: 'What types of loans follow standard amortization schedules?',
        answer: 'Standard fixed-rate mortgages (conventional, FHA, VA), auto loans, personal installment loans, and student loans all follow standard fixed amortization formulas. Credit cards and revolving lines of credit (HELOCs) do not, as their payments adjust based on current balances.'
      },
      {
        question: 'Are amortization schedules affected by compounding frequency?',
        answer: 'In the United States, most consumer installment loans and mortgages use monthly compounding, where annual APR is divided by 12. In Canada and certain other countries, mortgages are compounded semi-annually by law, resulting in slightly different effective rates.'
      }
    ],
    educationalDisclaimer: 'This amortization schedule calculator is for educational illustration based on standard fixed amortization mathematics. Actual loan payoff balances may vary slightly based on lender per-diem interest calculations, escrow adjustments, and grace period policies.'
  },
  {
    id: 'present-value-npv',
    title: 'Present Value & Net Present Value (NPV)',
    slug: 'present-value-npv-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate the present discounted value of future lump sums or recurring cash flows.',
    description: 'Determine the present value of future cash flows discounted at a specified rate to evaluate investment decisions.',
    keywords: ['present value', 'npv', 'discount rate', 'time value of money', 'future cash flow'],
    iconName: 'DollarSign',
    isPopular: false,
    isNew: true,
    formulaDescription: 'PV = FV / (1 + r)^n where FV is future value, r is discount rate, and n is periods; NPV = Σ [CF_t / (1 + r)^t] - Initial Investment',
    formulaLatex: 'PV = \\frac{FV}{(1 + r)^n}, \\quad NPV = \\sum_{t=1}^n \\frac{CF_t}{(1 + r)^t} - C_0',
    relatedCalculatorIds: ['compound-interest', 'inflation-purchasing-power', 'savings-goal-timeline', 'roi-margin'],
    stepByStepInstructions: [
      'Enter the Future Value (FV) or sequence of annual expected cash flows.',
      'Specify the annual Discount Rate (hurdle rate or required rate of return %).',
      'Input the Time Horizon in years.',
      'For NPV projects, enter the upfront Initial Investment Capital (Cash Outflow).',
      'Review the discounted Present Value (PV) and Net Present Value (NPV).',
      'Examine the year-by-year cash flow discounting breakdown and net profitability summary.'
    ],
    faqs: [
      {
        question: 'What is the Present Value (PV) concept in finance?',
        answer: 'Present Value is the principle that a dollar received today is worth more than a dollar received in the future due to its earning potential and the erosion of purchasing power over time.'
      },
      {
        question: 'What is Net Present Value (NPV)?',
        answer: 'NPV is the sum of all discounted future cash inflows minus the initial cash outlay. A positive NPV indicates that projected earnings exceed anticipated costs in today dollars, signaling a profitable investment.'
      },
      {
        question: 'How do you choose an appropriate Discount Rate?',
        answer: 'The discount rate typically represents the cost of capital, inflation rate plus risk premium, or opportunity cost of capital (e.g. weighted average cost of capital / WACC).'
      },
      {
        question: 'What does a negative NPV mean?',
        answer: 'A negative NPV means the investment fails to generate the required rate of return specified by the discount rate, suggesting capital would be better deployed elsewhere.'
      },
      {
        question: 'What is the difference between PV of a lump sum and PV of an annuity?',
        answer: 'A lump sum calculates the current worth of a single future payment, while an annuity calculates the current worth of a series of equal, regular periodic cash flows.'
      },
      {
        question: 'How does inflation impact present value calculations?',
        answer: 'Higher inflation increases the required discount rate, thereby decreasing the present value of distant future cash flows.'
      },
      {
        question: 'Can NPV be used to compare projects of different sizes?',
        answer: 'NPV measures absolute dollar value added. For comparing projects of significantly different capital scales, Internal Rate of Return (IRR) or Profitability Index (PI) is often evaluated alongside NPV.'
      },
      {
        question: 'How sensitive is NPV to changes in the discount rate?',
        answer: 'Cash flows further in the future are exponentially sensitive to discount rate adjustments; higher discount rates sharply reduce the present value of long-term revenues.'
      }
    ],
    educationalDisclaimer: 'This present value calculator is for financial modeling and educational purposes. Projected cash flows and discount rates are estimates and subject to market risks.'
  },
  {
    id: 'business-break-even',
    title: 'Business Break-Even Analysis',
    slug: 'business-break-even-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate sales volume units and revenue required to cover fixed overhead costs.',
    description: 'Find your break-even point in units and dollars based on fixed overhead expenses, variable unit costs, and selling prices.',
    keywords: ['break even point', 'break even analysis', 'fixed costs', 'variable costs', 'business revenue'],
    iconName: 'PieChart',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Break-Even Units = Fixed Costs / (Price per Unit - Variable Cost per Unit); Break-Even Revenue = Break-Even Units × Price per Unit',
    formulaLatex: '\\text{BEP}_{\\text{units}} = \\frac{\\text{Fixed Costs}}{P - V}, \\quad \\text{BEP}_{\\text{rev}} = \\text{BEP}_{\\text{units}} \\times P, \\quad \\text{Contribution Margin} = \\frac{P - V}{P}',
    relatedCalculatorIds: ['markup-margin', 'roi-margin', 'hourly-to-salary', 'meeting-cost'],
    stepByStepInstructions: [
      'Enter your Total Fixed Operating Costs (rent, salaries, insurance, software).',
      'Enter your Selling Price per Unit.',
      'Enter the Variable Cost per Unit (materials, direct labor, packaging, shipping).',
      'Optionally set a Target Profit Dollar Goal to see units needed for profitability.',
      'Review the Break-Even Volume in units, Break-Even Gross Revenue, and Contribution Margin ratio.',
      'Inspect the cost vs. revenue chart showing the crossover point from operating loss to net profit.'
    ],
    faqs: [
      {
        question: 'What is a business break-even point?',
        answer: 'The break-even point is the exact sales volume at which total revenues equal total expenses (both fixed and variable), resulting in exactly zero operating profit or loss.'
      },
      {
        question: 'What is the difference between fixed and variable costs?',
        answer: 'Fixed costs remain constant regardless of production volume (e.g. rent, administrative salaries, insurance). Variable costs change directly in proportion to production volume (e.g. raw materials, packaging, transaction fees).'
      },
      {
        question: 'What is Contribution Margin per unit?',
        answer: 'Contribution Margin is the selling price per unit minus variable cost per unit. It represents the incremental dollar amount each unit sold contributes toward paying down fixed overhead costs.'
      },
      {
        question: 'How do price changes affect the break-even volume?',
        answer: 'Raising the selling price increases unit contribution margin, lowering the number of units required to break even. Lowering prices demands higher unit volume.'
      },
      {
        question: 'What is the Margin of Safety in break-even analysis?',
        answer: 'The Margin of Safety is the percentage by which current sales volume can decline before the business begins operating at a financial loss.'
      },
      {
        question: 'How does automation change a company cost structure?',
        answer: 'Automation typically increases fixed costs (machinery capital expenditure) while dramatically lowering variable costs per unit, resulting in a higher break-even threshold but steeper profit scaling thereafter.'
      },
      {
        question: 'Can this model calculate target net profit goals?',
        answer: 'Yes. Adding your desired target profit to total fixed costs in the numerator reveals the exact units required to hit that net income milestone.'
      },
      {
        question: 'Why is break-even analysis critical for business plans and loans?',
        answer: 'Lenders and investors use break-even analysis to evaluate operational feasibility and assess whether market demand is realistically sufficient to cover debt obligations.'
      }
    ],
    educationalDisclaimer: 'This break-even analysis model assumes constant unit selling prices and linear variable costs. Real-world economies of scale and tiered volume pricing may alter practical operating results.'
  },
  {
    id: 'car-depreciation',
    title: 'Car Depreciation Estimator',
    slug: 'car-depreciation-calculator',
    categoryId: 'finance',
    shortDescription: 'Project vehicle resale value loss over 1 to 10 years by brand depreciation curves.',
    description: 'Estimate future used car resale value and annual depreciation losses based on vehicle mileage and condition.',
    keywords: ['car depreciation', 'vehicle value', 'used car value', 'car resale value', 'auto depreciation'],
    iconName: 'Car',
    isPopular: false,
    isNew: true,
    formulaDescription: 'Year 1: -20% value loss; Years 2-5: -15% value loss per year compound; Total Value(t) = Purchase Price × (1 - d)^t',
    formulaLatex: 'V(t) = P_0 \\cdot \\prod_{i=1}^t (1 - d_i), \\quad \\text{Loss}(t) = P_0 - V(t)',
    relatedCalculatorIds: ['auto-loan', 'fuel-trip', 'roi-margin', 'auto-lease-vs-buy'],
    stepByStepInstructions: [
      'Enter the Vehicle Purchase Price (MSRP or negotiated price).',
      'Select whether the vehicle is Brand New or Pre-Owned.',
      'Choose the Vehicle Class / Brand Category (Luxury, Electric, Truck/SUV, Economy Sedan).',
      'Enter Expected Annual Mileage and vehicle ownership duration in years.',
      'Review the projected Year-by-Year Resale Value, Total Dollar Depreciation, and Cumulative % Retained Value.',
      'Analyze the annual depreciation cost curve to find the optimal selling or trading sweet spot.'
    ],
    faqs: [
      {
        question: 'How fast do new cars depreciate in their first year?',
        answer: 'On average, a brand-new vehicle loses 15% to 25% of its purchase value during the first 12 months, with a steep drop occurring immediately after driving off the dealership lot.'
      },
      {
        question: 'What is a car expected value after 5 years?',
        answer: 'Most standard consumer passenger vehicles retain approximately 40% to 50% of their original MSRP after 5 years, meaning roughly 50%–60% of original value is lost to depreciation.'
      },
      {
        question: 'Which vehicle categories hold their value best?',
        answer: 'Body-on-frame trucks, popular midsize SUVs (like Toyota Tacoma or 4Runner), and iconic sports cars historically experience the lowest depreciation rates.'
      },
      {
        question: 'How does high annual mileage impact resale value?',
        answer: 'Every 10,000 miles above standard benchmarks (12,000 to 15,000 miles/year) accelerates depreciation by approximately 3% to 6% due to accelerated mechanical wear and tear.'
      },
      {
        question: 'Why is buying a 2 to 3-year-old used car often financially advantageous?',
        answer: 'Buying a 2-3 year old vehicle lets the initial owner absorb the steepest first-stage depreciation cliff (30%–45%), allowing you to purchase reliable transportation on a flatter depreciation curve.'
      },
      {
        question: 'How does depreciation affect auto insurance gap coverage?',
        answer: 'If you finance a new car with a low down payment, rapid early depreciation can cause you to owe more on the loan than the car market value (negative equity). Gap insurance pays that difference if totaled.'
      },
      {
        question: 'Do electric vehicles (EVs) depreciate faster than gas vehicles?',
        answer: 'Due to rapid battery advancements, federal tax credit dynamics, and technological obsolescence, many EVs have historically experienced higher first 3-year depreciation than gas-powered vehicles.'
      },
      {
        question: 'What maintenance practices help preserve car resale value?',
        answer: 'Maintaining complete dealership service records, garage parking, regular paint detailing, and fixing minor cosmetic blemishes preserve maximum trade-in value.'
      }
    ],
    educationalDisclaimer: 'Vehicle depreciation rates are estimates based on broad automotive industry averages and historical trends. Actual market resale values vary based on condition, location, economic climate, and supply-chain factors.'
  },
  {
    id: 'bmr-calculator',
    title: 'Basal Metabolic Rate (BMR) Calculator',
    slug: 'bmr-calculator',
    categoryId: 'health',
    shortDescription: 'Calculate minimum daily calories burned at complete rest using Mifflin-St Jeor and Harris-Benedict formulas.',
    description: 'Find your baseline metabolic rate (BMR) to understand baseline physiological caloric expenditure before activity.',
    keywords: ['bmr', 'basal metabolic rate', 'mifflin st jeor', 'harris benedict', 'resting calories'],
    iconName: 'Activity',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Mifflin-St Jeor BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) + s (+5 male, -161 female); Harris-Benedict & Katch-McArdle models',
    formulaLatex: '\\text{BMR}_{\\text{male}} = 10W + 6.25H - 5A + 5, \\quad \\text{BMR}_{\\text{female}} = 10W + 6.25H - 5A - 161',
    relatedCalculatorIds: ['calorie-tdee', 'bmi', 'macro-split', 'lean-body-mass', 'ideal-body-weight'],
    stepByStepInstructions: [
      'Select your Biological Sex (Male / Female).',
      'Enter your Current Age in years.',
      'Input your Height (feet/inches or centimeters) and Body Weight (lbs or kg).',
      'Optionally input Body Fat % for lean-mass Katch-McArdle formula calculations.',
      'Review your baseline BMR calories per day across Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle models.',
      'See your estimated TDEE activity multipliers and resting hourly calorie burn.'
    ],
    faqs: [
      {
        question: 'What is Basal Metabolic Rate (BMR)?',
        answer: 'BMR is the absolute minimum number of calories your body requires to perform essential involuntary survival functions (heart pumping, lungs breathing, cellular repair, brain activity) while at complete rest in a temperate environment.'
      },
      {
        question: 'What is the difference between BMR and TDEE?',
        answer: 'BMR accounts only for basal survival calories (roughly 60%–70% of total daily energy). Total Daily Energy Expenditure (TDEE) adds physical movement, structured exercise, and the Thermic Effect of Food (TEF) to BMR.'
      },
      {
        question: 'Which BMR formula is considered most accurate?',
        answer: 'The Mifflin-St Jeor formula is considered the clinical standard for non-obese individuals. For individuals with known low body fat, the Katch-McArdle equation (which uses lean body mass) provides the highest accuracy.'
      },
      {
        question: 'Does gaining muscle mass increase BMR?',
        answer: 'Yes. Muscle tissue is metabolically active, burning approximately 6 kcal per pound per day at rest, compared to adipose fat tissue which burns roughly 2 kcal per pound.'
      },
      {
        question: 'Why does BMR decrease as we age?',
        answer: 'BMR naturally declines approximately 1% to 2% per decade after age 20, largely due to gradual sarcopenia (age-related muscle loss) and cellular metabolic slowdown.'
      },
      {
        question: 'Should I ever eat fewer calories than my BMR for weight loss?',
        answer: 'Consistently eating below your BMR is generally not recommended without medical supervision, as severe restriction can trigger muscle wasting, hormonal disruption, and metabolic adaptation.'
      },
      {
        question: 'How do thyroid hormones influence BMR?',
        answer: 'Thyroid hormones (T3 and T4) regulate cellular metabolic speed; hyperthyroidism substantially elevates BMR, while hypothyroidism depresses baseline caloric burn.'
      },
      {
        question: 'How does ambient temperature affect resting energy expenditure?',
        answer: 'Extreme cold or extreme heat forces the body to expend additional calories on thermoregulation (shivering, sweating, blood vessel dilation), increasing resting metabolic burn.'
      }
    ],
    educationalDisclaimer: 'This BMR calculation is an estimation based on validated clinical equations. Individual metabolic rates may vary based on genetics, hormonal profile, muscle mass, and medical conditions.'
  },
  {
    id: 'macro-split',
    title: 'Macro Split Ratio Calculator',
    slug: 'macro-split-calculator',
    categoryId: 'health',
    shortDescription: 'Calculate daily protein, carbohydrate, and fat gram targets for fitness diets.',
    description: 'Determine macro targets for Keto, High Protein, Balanced, or Low Carb diet plans based on caloric targets.',
    keywords: ['macro split', 'protein grams', 'carbs grams', 'keto macros', 'nutrition targets'],
    iconName: 'Utensils',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Protein & Carbs = 4 kcal/gram; Fats = 9 kcal/gram; Grams = (Total Calories × Macro %) / Caloric Density',
    formulaLatex: 'P_{\\text{grams}} = \\frac{\\text{Calories} \\times \\%P}{4}, \\quad C_{\\text{grams}} = \\frac{\\text{Calories} \\times \\%C}{4}, \\quad F_{\\text{grams}} = \\frac{\\text{Calories} \\times \\%F}{9}',
    relatedCalculatorIds: ['calorie-tdee', 'lean-body-mass', 'bmr-calculator', 'macro-keto-carb-manager'],
    stepByStepInstructions: [
      'Enter your Daily Caloric Target (from your TDEE deficit, maintenance, or surplus).',
      'Select a popular Macro Preset (Balanced 40/30/30, High Protein 40/40/20, Keto 5/25/70, or Low Carb 25/40/35).',
      'Alternatively customize your Protein, Carbohydrate, and Fat percentages to equal 100%.',
      'Specify your daily Meal Frequency (e.g. 3, 4, 5 meals/day).',
      'Review your exact Daily Grams and Per-Meal breakdown for Protein, Carbs, and Fats.',
      'Check the caloric density pie chart and macro energy distribution summary.'
    ],
    faqs: [
      {
        question: 'What are macronutrients?',
        answer: 'Macronutrients are the primary dietary nutrients your body requires in large quantities for energy and physiological repair: Proteins (4 kcal/g), Carbohydrates (4 kcal/g), and Fats (9 kcal/g).'
      },
      {
        question: 'How much protein should I eat per day for muscle retention?',
        answer: 'For active individuals and weightlifters in a caloric deficit, sports nutrition guidelines recommend 0.7 to 1.0 grams of protein per pound of total body weight (1.6 to 2.2 g/kg).'
      },
      {
        question: 'What is the standard macro ratio for a Ketogenic diet?',
        answer: 'A standard Ketogenic diet allocates roughly 70%–75% of calories to healthy fats, 20%–25% to protein, and 5%–10% to carbohydrates (typically under 30–50 grams of net carbs daily).'
      },
      {
        question: 'Why do dietary fats contain more calories per gram than carbs and protein?',
        answer: 'Fats are more chemically energy-dense due to their hydrocarbon chain structure, yielding 9 calories per gram compared to 4 calories per gram for proteins and carbohydrates.'
      },
      {
        question: 'What is a balanced macro ratio for general health and performance?',
        answer: 'A classic balanced macro split is 45%–55% carbohydrates, 25%–30% protein, and 20%–30% healthy fats, supporting cardiovascular endurance and recovery.'
      },
      {
        question: 'Does macro timing matter as much as total daily intake?',
        answer: 'Total daily caloric and protein intake accounts for roughly 80%–90% of body composition outcomes. Nutrient timing (pre/post-workout meals) provides marginal optimization for athletic recovery.'
      },
      {
        question: 'How do I convert food label grams into total calories?',
        answer: 'Multiply protein grams by 4, carbohydrate grams by 4, and fat grams by 9. Summing these values gives the total caloric content of the meal.'
      },
      {
        question: 'What is the role of dietary fiber in carb tracking?',
        answer: 'Fiber is a carbohydrate that passes through the digestive tract largely undigested. Net Carbohydrates are calculated by subtracting dietary fiber grams from total carbohydrate grams.'
      }
    ],
    educationalDisclaimer: 'Macro nutrient recommendations are based on standard nutritional science guidelines. Consult a registered dietitian or physician for personalized medical dietary advice.'
  },
  {
    id: 'one-rep-max',
    title: 'One-Rep Max (1RM) Weightlifting Calculator',
    slug: 'one-rep-max-calculator',
    categoryId: 'health',
    shortDescription: 'Estimate 1RM strength maximum and training percentage loads using Epley and Brzycki formulas.',
    description: 'Calculate maximum single-repetition lift capacity and gym weight percentages for bench press, squat, and deadlift.',
    keywords: ['one rep max', '1rm', 'weightlifting max', 'epley formula', 'brzycki max', 'gym strength'],
    iconName: 'Dumbbell',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Epley 1RM = Weight × (1 + Reps / 30); Brzycki 1RM = Weight × (36 / (37 - Reps)); Lander, Lombardi, OConner, Mayhew formulas',
    formulaLatex: '\\text{1RM}_{\\text{Epley}} = w \\cdot \\left(1 + \\frac{r}{30}\\right), \\quad \\text{1RM}_{\\text{Brzycki}} = w \\cdot \\left(\\frac{36}{37 - r}\\right)',
    relatedCalculatorIds: ['bench-press-max-calculator', 'pace-runner', 'lean-body-mass', 'calorie-tdee'],
    stepByStepInstructions: [
      'Enter the Lift Weight lifted (lbs or kg).',
      'Enter the Number of Completed Repetitions (1 to 12 reps for highest accuracy).',
      'Select your exercise type (Bench Press, Barbell Squat, Deadlift, Overhead Press).',
      'Review your estimated 1RM Maximum across Epley, Brzycki, Lander, Lombardi, and Mayhew models.',
      'Inspect the full Training Percentage Chart (50% to 95% 1RM) for workout load planning.',
      'Check recommended rep max loads for 2RM, 3RM, 5RM, 8RM, 10RM, and 12RM sets.'
    ],
    faqs: [
      {
        question: 'What is a One-Rep Max (1RM)?',
        answer: 'A One-Rep Max is the maximum amount of weight an athlete can successfully lift for a single, full-range-of-motion repetition with proper biomechanical technique.'
      },
      {
        question: 'Why use a submaximal calculator instead of testing a true 1RM?',
        answer: 'Estimating 1RM from 3 to 8 repetition sets minimizes the risk of acute injury, joint strain, and excessive central nervous system (CNS) fatigue associated with true maximal attempts.'
      },
      {
        question: 'What rep range gives the most accurate 1RM estimate?',
        answer: 'Sets performed between 2 and 6 repetitions close to muscular failure yield the most accurate predictions. Sets above 10-12 reps become biased by cardiovascular and muscular endurance.'
      },
      {
        question: 'What is the difference between the Epley and Brzycki formulas?',
        answer: 'The Epley formula tends to predict slightly higher 1RMs and is popular in strength sports, whereas the Brzycki formula is slightly more conservative on higher repetition sets.'
      },
      {
        question: 'How do I use percentage training in strength programming?',
        answer: 'Strength routines (like 5/3/1 or Texas Method) prescribe training loads as percentages of 1RM: 85%–95% for maximal strength, 70%–80% for hypertrophy, and 50%–65% for explosive power.'
      },
      {
        question: 'What is RPE (Rating of Perceived Exertion) in 1RM tracking?',
        answer: 'RPE measures exertion on a 1-10 scale based on Repetitions in Reserve (RIR). RPE 10 represents zero reps left in reserve (true max), RPE 9 means 1 rep left, RPE 8 means 2 reps left.'
      },
      {
        question: 'How often should powerlifters test their 1RM?',
        answer: 'Competitive strength athletes generally test true 1RMs only at competitions or at the conclusion of 8 to 16-week periodized training cycles.'
      },
      {
        question: 'Can 1RM formulas be used for isolation exercises like bicep curls?',
        answer: '1RM equations are designed and validated primarily for compound multi-joint movements (squat, bench press, deadlift, overhead press). They are less reliable for single-joint isolation exercises.'
      }
    ],
    educationalDisclaimer: 'Always use proper safety equipment, collars, and experienced spotters when performing heavy resistance training. Warm up thoroughly prior to heavy sets.'
  },
  {
    id: 'pace-runner',
    title: 'Running Pace & Finish Time Calculator',
    slug: 'pace-runner-calculator',
    categoryId: 'health',
    shortDescription: 'Calculate running pace per mile/km, target race finish time, or distance for 5K, 10K, Half, and Full Marathon.',
    description: 'Plan race day splits and target running speeds for 5K, 10K, 13.1 mile half marathon, and 26.2 mile marathon.',
    keywords: ['running pace', 'marathon finish time', '5k pace', '10k runner', 'half marathon pace'],
    iconName: 'Timer',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Pace = Total Time / Total Distance; Time = Pace × Distance; Distance = Time / Pace; Split times and speed (mph / km/h)',
    formulaLatex: '\\text{Pace} = \\frac{\\text{Time}}{\\text{Distance}}, \\quad v = \\frac{\\text{Distance}}{\\text{Time}}, \\quad T_2 = T_1 \\times \\left(\\frac{D_2}{D_1}\\right)^{1.06}',
    relatedCalculatorIds: ['marathon-race-finish-time', 'target-heart-rate', 'calorie-tdee', 'vo2-max-fitness-score'],
    stepByStepInstructions: [
      'Choose what to calculate: Pace, Race Finish Time, or Running Distance.',
      'Select a standard race distance preset (5K, 10K, 10 Miles, Half Marathon, Marathon) or enter a custom distance in miles/km.',
      'Enter your Target Time (Hours, Minutes, Seconds) or your desired Running Pace (min/mile or min/km).',
      'Review your exact Minute/Mile Pace, Minute/KM Pace, and Speed in MPH and km/h.',
      'Inspect the full Mile-by-Mile and Kilometer-by-Kilometer Split Times table for race pacing.',
      'Examine projected race finish times across other standard distances using Riegel endurance scaling.'
    ],
    faqs: [
      {
        question: 'How do you calculate running pace?',
        answer: 'Divide total elapsed time in minutes by total distance covered. For example, running 3.1 miles (5K) in 31 minutes yields a pace of exactly 10:00 minutes per mile.'
      },
      {
        question: 'What is the Pete Riegel race prediction formula?',
        answer: 'The Riegel formula (T2 = T1 × [D2 / D1]^1.06) predicts race performance across distances based on a recent race result, accounting for cardiovascular fatigue over longer mileage.'
      },
      {
        question: 'What is a good average 5K finish time for recreational runners?',
        answer: 'The average 5K finish time for recreational runners ranges between 25 and 35 minutes (approximately 8:00 to 11:15 min/mile pace).'
      },
      {
        question: 'What pace is required to run a Sub-4 Hour Marathon?',
        answer: 'To break 4 hours in a marathon (26.219 miles), you must maintain an average pace of at least 9:09 minutes per mile (5:41 minutes per kilometer).'
      },
      {
        question: 'What is the difference between positive splits and negative splits?',
        answer: 'A positive split means running the first half of a race faster than the second half. A negative split means running the second half faster than the first, widely recognized as the optimal pacing strategy.'
      },
      {
        question: 'How does treadmill speed in MPH convert to minute/mile pace?',
        answer: 'Divide 60 by the treadmill speed in MPH. For example, 6.0 MPH = 60 / 6.0 = 10:00 min/mile pace; 7.5 MPH = 8:00 min/mile pace.'
      },
      {
        question: 'How does weather temperature affect running pace?',
        answer: 'Temperatures above 60°F (15°C) increase cardiovascular strain; runners typically slow down by 1% to 3% for every 5°F increase above optimal racing temperatures (45°–55°F).'
      },
      {
        question: 'How do cadence and stride length determine running speed?',
        answer: 'Running speed equals Cadence (steps per minute) multiplied by Stride Length (meters per step). Optimal running cadence is typically 170 to 185 steps per minute.'
      }
    ],
    educationalDisclaimer: 'Pacing models provide mathematical estimates. Real-world race times are influenced by elevation profiles, weather conditions, hydration, and training conditioning.'
  },
  {
    id: 'body-surface-area',
    title: 'Body Surface Area (BSA) Calculator',
    slug: 'body-surface-area-calculator',
    categoryId: 'health',
    shortDescription: 'Calculate total body surface area in m² using Mosteller and DuBois clinical formulas.',
    description: 'Compute body surface area (BSA) for medical dosage and physiological index benchmarking.',
    keywords: ['body surface area', 'bsa', 'mosteller formula', 'dubois bsa', 'medical dosage area'],
    iconName: 'Activity',
    isPopular: false,
    isNew: true,
    formulaDescription: 'Mosteller BSA (m²) = √([Height(cm) × Weight(kg)] / 3600); DuBois, Haycock, Boyd, Gehan-George formulas',
    formulaLatex: '\\text{BSA}_{\\text{Mosteller}} = \\sqrt{\\frac{H_{\\text{cm}} \\times W_{\\text{kg}}}{3600}}, \\quad \\text{BSA}_{\\text{DuBois}} = 0.007184 \\times W^{0.425} \\times H^{0.725}',
    relatedCalculatorIds: ['bmi', 'lean-body-mass', 'body-fat', 'ideal-body-weight'],
    stepByStepInstructions: [
      'Enter your Height in feet/inches or centimeters.',
      'Enter your Weight in pounds or kilograms.',
      'Select your biological sex (for specialized formulas).',
      'Review your total Body Surface Area in square meters (m²) across clinical formulas (Mosteller, DuBois & DuBois, Haycock, Boyd, Gehan & George).',
      'Examine your Cardiac Index and GFR normalizations based on BSA.',
      'Compare your BSA result against standard adult population averages.'
    ],
    faqs: [
      {
        question: 'What is Body Surface Area (BSA)?',
        answer: 'Body Surface Area is the measured or calculated total surface area of a human body expressed in square meters (m²), widely used as a physiological metric in medicine.'
      },
      {
        question: 'Why is BSA used instead of body weight for medical dosages?',
        answer: 'BSA correlates much more closely with metabolic rate, cardiac output, renal glomerular filtration rate (GFR), and blood volume than body weight alone, especially for chemotherapy dosing.'
      },
      {
        question: 'What is the average BSA for adult men and women?',
        answer: 'The average adult male has a BSA of approximately 1.9 m², while the average adult female has a BSA of approximately 1.6 m².'
      },
      {
        question: 'Which BSA equation is the most widely adopted in clinical practice?',
        answer: 'The Mosteller formula (square root of [height in cm × weight in kg / 3600]) is the most commonly used formula in clinical practice due to its mathematical simplicity and high accuracy.'
      },
      {
        question: 'What is the Haycock formula used for?',
        answer: 'The Haycock formula is frequently favored in pediatric medicine for calculating BSA in infants and young children.'
      },
      {
        question: 'How is BSA used in cardiology (Cardiac Index)?',
        answer: 'Cardiac Index (CI) divides Cardiac Output (liters/min) by BSA (m²). Normal resting Cardiac Index is 2.6 to 4.2 L/min/m².'
      },
      {
        question: 'How does obesity affect BSA calculations?',
        answer: 'In severe obesity, adipose tissue increases surface area disproportionately to metabolic organ size, leading clinicians to evaluate adjusted ideal body weight metrics.'
      },
      {
        question: 'How is BSA used in burn triage (Rule of Nines)?',
        answer: 'Emergency burn medicine utilizes BSA to estimate the percentage of total body surface affected by burns to calculate intravenous fluid resuscitation volumes (Parkland formula).'
      }
    ],
    educationalDisclaimer: 'This calculator is intended for educational reference. Clinical drug dosages and medical decisions must always be validated by licensed healthcare professionals.'
  },
  {
    id: 'blood-alcohol-ebac',
    title: 'Blood Alcohol Content (EBAC) Estimator',
    slug: 'blood-alcohol-ebac-calculator',
    categoryId: 'health',
    shortDescription: 'Estimate Blood Alcohol Concentration (BAC %) using Widmark formula and metabolic decay.',
    description: 'Estimate BAC percentage based on alcoholic drinks consumed, body weight, gender, and hours elapsed.',
    keywords: ['bac calculator', 'blood alcohol content', 'widmark formula', 'alcohol level', 'sobriety time'],
    iconName: 'ShieldAlert',
    isPopular: false,
    isNew: true,
    formulaDescription: 'Widmark BAC = [(Alcohol in grams) / (Body Weight in grams × r)] × 100 - (0.015 × Hours); r = 0.68 male, 0.55 female',
    formulaLatex: '\\text{BAC} = \\left( \\frac{A}{W \\times r} \\times 100 \\right) - (\\beta \\times t)',
    relatedCalculatorIds: ['water-intake', 'calorie-tdee', 'bmi', 'water-hydration'],
    stepByStepInstructions: [
      'Select your Biological Sex (affects body water distribution ratio r).',
      'Enter your Body Weight in pounds or kilograms.',
      'Enter the Number of Standard Drinks consumed (12 oz beer 5%, 5 oz wine 12%, 1.5 oz spirit 40%).',
      'Specify the Drinking Duration in hours since the first sip.',
      'Review your estimated Blood Alcohol Concentration (BAC %), impairment tier, and estimated hours until 0.00% sobriety.',
      'Inspect the BAC elimination timeline graph over subsequent hours.'
    ],
    faqs: [
      {
        question: 'What is a standard drink in the United States?',
        answer: 'A standard drink contains roughly 14 grams (0.6 fluid ounces) of pure alcohol: one 12-oz regular beer (~5% ABV), one 5-oz glass of wine (~12% ABV), or one 1.5-oz shot of distilled spirits (~40% ABV).'
      },
      {
        question: 'What is the legal BAC limit for driving in the United States?',
        answer: 'In all 50 US states, the legal limit for driving is 0.08% BAC for non-commercial drivers aged 21+, and 0.04% for commercial drivers (with zero-tolerance 0.00%–0.02% for drivers under 21).'
      },
      {
        question: 'At what rate does the human liver metabolize alcohol?',
        answer: 'On average, the human liver metabolizes alcohol at a constant rate of approximately 0.015% BAC per hour (roughly one standard drink per hour).'
      },
      {
        question: 'Why do biological sex differences affect BAC?',
        answer: 'Women typically have a lower percentage of body water (52% vs 61% in men) and lower concentrations of gastric alcohol dehydrogenase, resulting in higher peak BAC for identical alcohol quantities.'
      },
      {
        question: 'Does drinking water or coffee speed up sobriety?',
        answer: 'No. Water prevents dehydration and coffee increases alertness, but neither accelerates liver enzymatic metabolism of alcohol; only time reduces BAC.'
      },
      {
        question: 'How does food in the stomach influence alcohol absorption?',
        answer: 'A full stomach delays gastric emptying into the small intestine, slowing peak alcohol absorption and reducing peak BAC levels.'
      },
      {
        question: 'What symptoms occur at 0.05% BAC vs 0.15% BAC?',
        answer: 'At 0.05% BAC, mild euphoria and lowered inhibition occur with reduced coordination. At 0.15% BAC, severe motor impairment, slurred speech, loss of balance, and major cognitive deficits occur.'
      },
      {
        question: 'Can medications amplify alcohol effects?',
        answer: 'Yes. Sedatives, antihistamines, antidepressants, and pain medications can dangerously amplify central nervous system depression when combined with alcohol.'
      }
    ],
    educationalDisclaimer: 'This calculator provides theoretical estimates only and must NEVER be used to decide whether it is safe or legal to drive. Never drink and drive.'
  },
  {
    id: 'child-height-predictor',
    title: 'Child Adult Height Predictor',
    slug: 'child-height-predictor-calculator',
    categoryId: 'health',
    shortDescription: 'Predict child adult height using Mid-Parental Method and Khamis-Roche growth models.',
    description: 'Estimate your child future adult height potential based on biological parents heights and current age.',
    keywords: ['child height predictor', 'adult height forecast', 'mid parental height', 'khamis roche', 'growth chart'],
    iconName: 'UserPlus',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Boys: [(Father Height + Mother Height + 13 cm) / 2]; Girls: [(Father Height - 13 cm + Mother Height) / 2]; Khamis-Roche statistical regression',
    formulaLatex: 'H_{\\text{boy}} = \\frac{H_{\\text{father}} + H_{\\text{mother}} + 13}{2}, \\quad H_{\\text{girl}} = \\frac{H_{\\text{father}} - 13 + H_{\\text{mother}}}{2}',
    relatedCalculatorIds: ['bmi', 'pregnancy-due-date', 'period-ovulation', 'ideal-body-weight'],
    stepByStepInstructions: [
      'Select the Child Biological Sex (Boy / Girl).',
      'Enter the Biological Father Height (feet/inches or cm).',
      'Enter the Biological Mother Height (feet/inches or cm).',
      'Optionally enter the child current age, current height, and current weight for Khamis-Roche regression modeling.',
      'Review the predicted Adult Target Height in feet/inches and centimeters.',
      'Inspect the ±2 inch (±5 cm) target genetic growth range band and CDC growth percentile trajectory.'
    ],
    faqs: [
      {
        question: 'What is the Mid-Parental Height formula?',
        answer: 'The Mid-Parental Height (Tanner) method calculates the genetic target height by averaging biological parents heights and adjusting by +2.5 inches (13 cm) for boys or -2.5 inches (13 cm) for girls.'
      },
      {
        question: 'What is the Khamis-Roche height prediction method?',
        answer: 'The Khamis-Roche method predicts adult height in children over age 4 without bone age X-rays by analyzing current child height, weight, age, and mid-parental stature using statistical regression coefficients.'
      },
      {
        question: 'What is the margin of error for genetic height predictors?',
        answer: 'Most genetic formulas have a normal variation range of ±2 inches (±5 cm) to account for polygenic inheritance and environmental factors.'
      },
      {
        question: 'What environmental factors influence childhood growth and final stature?',
        answer: 'Adequate childhood nutrition (protein, calcium, vitamin D), sufficient sleep (growth hormone pulses during deep sleep), physical exercise, and absence of chronic illness.'
      },
      {
        question: 'At what age do boys and girls typically stop growing in height?',
        answer: 'Girls typically reach their final adult height around age 14 to 16 (approximately 2 years after menarche). Boys generally complete linear growth between ages 16 and 18 when growth plates fuse.'
      },
      {
        question: 'What is bone age and when is it evaluated?',
        answer: 'Bone age assesses skeletal maturity via an X-ray of the left wrist and hand. Pediatric endocrinologists use it when children experience growth delays or precocious puberty.'
      },
      {
        question: 'Can a child end up much taller or shorter than both parents?',
        answer: 'Yes. Polygenic traits involve hundreds of genetic variants inherited from grandparents and ancestors, which can combine to produce heights outside direct parental averages.'
      },
      {
        question: 'When should parents consult a pediatrician about childhood growth?',
        answer: 'Parents should seek evaluation if a child drops across two major percentile curves on CDC growth charts or grows less than 2 inches (5 cm) per year after age 4.'
      }
    ],
    educationalDisclaimer: 'Height prediction calculations are statistical estimations. Final adult stature is influenced by complex genetics, endocrine health, nutrition, and environmental factors.'
  },
  {
    id: 'period-ovulation',
    title: 'Ovulation & Fertility Window Calculator',
    slug: 'period-ovulation-calculator',
    categoryId: 'health',
    shortDescription: 'Calculate fertile window days, ovulation date, and next menstrual cycle onset.',
    description: 'Track peak fertility days and estimated ovulation dates based on menstrual cycle length.',
    keywords: ['ovulation calculator', 'fertile window', 'period cycle', 'fertility tracker', 'ovulation date'],
    iconName: 'Calendar',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Ovulation Date = Next Period Expected Date - 14 Days; Fertile Window = Days -5 to +1 of Ovulation; 6-day fertile window model',
    formulaLatex: '\\text{Ovulation} = \\text{LMP} + \\text{Cycle Length} - 14, \\quad \\text{Fertile Window} = [\\text{Ovulation} - 5, \\; \\text{Ovulation} + 1]',
    relatedCalculatorIds: ['pregnancy-due-date', 'child-height-predictor', 'time-date'],
    stepByStepInstructions: [
      'Select the First Day of your Last Menstrual Period (LMP).',
      'Enter your Average Menstrual Cycle Length in days (typical range: 21 to 35 days, default 28).',
      'Optionally specify your Luteal Phase length (default 14 days).',
      'Review your Estimated Ovulation Date, Peak Fertile Days, and Next Period Start Date.',
      'Inspect the monthly calendar visual showing low fertility, high fertility, peak ovulation, and period phases.',
      'Check future cycle projections for the next 3 to 6 months.'
    ],
    faqs: [
      {
        question: 'How is the ovulation date calculated in a menstrual cycle?',
        answer: 'In an average 28-day cycle, ovulation occurs approximately 14 days before the start of the next period. In longer or shorter cycles, ovulation shifts accordingly (e.g. Day 18 of a 32-day cycle).'
      },
      {
        question: 'What is the fertile window and how long does it last?',
        answer: 'The fertile window spans approximately 6 days: the 5 days leading up to ovulation plus the day of ovulation itself, because sperm can survive in cervical mucus for up to 5 days.'
      },
      {
        question: 'Which days offer the highest probability of conception?',
        answer: 'The highest probability of conception occurs during the 2 days prior to ovulation and the actual day of ovulation.'
      },
      {
        question: 'What physical signs and symptoms indicate ovulation?',
        answer: 'Common signs include clear, stretchy "egg-white" cervical mucus, a slight rise in Basal Body Temperature (BBT), mild pelvic twinges (Mittelschmerz), and elevated luteinizing hormone (LH).'
      },
      {
        question: 'How do Ovulation Predictor Kits (OPKs) work?',
        answer: 'OPKs detect the surge of Luteinizing Hormone (LH) in urine, which typically occurs 24 to 36 hours before an egg is released from the ovary.'
      },
      {
        question: 'What is the luteal phase and why is it important?',
        answer: 'The luteal phase is the second half of the cycle from ovulation until menstruation. A healthy luteal phase (typically 11 to 16 days) produces progesterone necessary for embryo implantation.'
      },
      {
        question: 'How do irregular cycles affect ovulation prediction accuracy?',
        answer: 'Irregular cycles make calendar-based calculations less predictable; combining calendar estimates with basal body temperature charting and LH test strips improves accuracy.'
      },
      {
        question: 'Can ovulation occur on different cycle days each month?',
        answer: 'Yes. Stress, illness, travel, extreme exercise, and hormonal fluctuations can delay or advance the follicular phase, altering the ovulation day from month to month.'
      }
    ],
    educationalDisclaimer: 'This ovulation calculator is for educational tracking and family planning awareness. It should not be relied upon as a primary method of contraception or as clinical fertility diagnosis.'
  },
  {
    id: 'standard-deviation-zscore',
    title: 'Standard Deviation & Z-Score Calculator',
    slug: 'standard-deviation-zscore-calculator',
    categoryId: 'math',
    shortDescription: 'Calculate sample and population standard deviation, variance, mean, and individual Z-scores.',
    description: 'Compute statistical variance, standard deviation (σ / s), mean, median, and Z-score probability metrics.',
    keywords: ['standard deviation', 'z score', 'variance', 'sample standard deviation', 'statistics solver'],
    iconName: 'BarChart2',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Sample Standard Deviation s = √[ Σ(x_i - x_mean)² / (n - 1) ]; Population σ = √[ Σ(x_i - μ)² / N ]; Z-Score = (X - μ) / σ',
    formulaLatex: 's = \\sqrt{\\frac{\\sum_{i=1}^n (x_i - \\bar{x})^2}{n - 1}}, \\quad \\sigma = \\sqrt{\\frac{\\sum_{i=1}^N (x_i - \\mu)^2}{N}}, \\quad Z = \\frac{X - \\mu}{\\sigma}',
    relatedCalculatorIds: ['statistics', 'percentage', 'gpa', 'algebra-solver'],
    stepByStepInstructions: [
      'Enter your data set numbers separated by commas, spaces, or new lines.',
      'Select whether your data represents a Sample (uses n - 1 Bessel correction) or entire Population (N).',
      'Optionally enter a specific raw value X to calculate its exact Z-Score and percentile ranking.',
      'Review the Mean, Median, Sum, Variance (s²), and Standard Deviation (s or σ).',
      'Inspect the step-by-step deviations calculation table showing (x_i - mean) and squared deviations.',
      'Examine the interactive Normal Distribution bell curve showing empirical rule intervals (68-95-99.7%).'
    ],
    faqs: [
      {
        question: 'What is standard deviation in statistics?',
        answer: 'Standard deviation is a measure of dispersion that quantifies the average distance or spread of individual data points around the arithmetic mean.'
      },
      {
        question: 'What is the difference between sample and population standard deviation?',
        answer: 'Sample standard deviation divides by (n - 1) using Bessel correction to provide an unbiased estimate of the broader population, whereas population standard deviation divides by N.'
      },
      {
        question: 'What is a Z-score (standard score)?',
        answer: 'A Z-score indicates how many standard deviations a specific raw data value falls above (positive Z) or below (negative Z) the mean (Z = [X - μ] / σ).'
      },
      {
        question: 'What is the Empirical Rule (68-95-99.7 Rule) for normal distributions?',
        answer: 'In a bell-shaped normal distribution, approximately 68.2% of data falls within ±1σ of the mean, 95.4% falls within ±2σ, and 99.7% falls within ±3σ.'
      },
      {
        question: 'What is the relationship between variance and standard deviation?',
        answer: 'Variance is the average of squared deviations from the mean; standard deviation is the positive square root of variance, returning dispersion to original measurement units.'
      },
      {
        question: 'What does a high vs low standard deviation indicate?',
        answer: 'A low standard deviation means data points are clustered closely around the mean. A high standard deviation means data is spread out across a wide range of values.'
      },
      {
        question: 'How do outliers influence standard deviation?',
        answer: 'Because deviations are squared in the formula, extreme outliers exert a substantial inflating effect on variance and standard deviation.'
      },
      {
        question: 'What is the standard error of the mean (SEM)?',
        answer: 'Standard error (SEM = s / √n) measures the precision of the sample mean as an estimate of the true population mean, decreasing as sample size increases.'
      }
    ],
    educationalDisclaimer: 'This statistical calculator computes exact mathematical properties of entered datasets according to standard probability and statistical formulas.'
  },
  {
    id: 'logarithm-calculator',
    title: 'Logarithm & Natural Log (ln) Solver',
    slug: 'logarithm-calculator-calculator',
    categoryId: 'math',
    shortDescription: 'Calculate common log base 10, natural log (ln), binary log base 2, and arbitrary log base b.',
    description: 'Solve logarithmic equations for log₁₀(x), ln(x), log₂(x), or log_b(x) with step-by-step algebraic properties.',
    keywords: ['logarithm calculator', 'natural log', 'ln solver', 'log base 10', 'log base 2', 'log solver', 'change of base'],
    iconName: 'Divide',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Change of base: log_b(x) = ln(x) / ln(b) = log₁₀(x) / log₁₀(b); Natural log ln(x) = log_e(x)',
    formulaLatex: '\\log_b(x) = \\frac{\\ln(x)}{\\ln(b)}, \\quad \\ln(x) = \\log_e(x), \\quad b^y = x \\iff y = \\log_b(x)',
    relatedCalculatorIds: ['exponent-power', 'scientific', 'algebra-solver', 'standard-form-converter'],
    stepByStepInstructions: [
      'Enter the Argument Value (x > 0) to evaluate.',
      'Select a standard Log Base Preset (Base 10 Common Log, Base e Natural Log ln, Base 2 Binary Log) or choose Custom Base.',
      'If using a Custom Base, enter the Base value (b > 0 and b ≠ 1).',
      'Review the calculated Logarithm Output, inverse exponent verification (b^y = x), and reciprocal log (log_x(b)).',
      'Inspect the step-by-step Change of Base identity breakdown using both natural and common logarithms.',
      'Review essential logarithmic identity rules: Product Rule, Quotient Rule, Power Rule, and Zero/Identity properties.'
    ],
    faqs: [
      {
        question: 'What is a logarithm and how is it defined?',
        answer: 'A logarithm is the mathematical inverse of exponentiation. The logarithm log_b(x) answers the question: "To what power must base b be raised to equal x?" For example, log₂(8) = 3 because 2³ = 8.'
      },
      {
        question: 'What is the difference between log(x) and ln(x)?',
        answer: 'Common logarithm log(x) typically implies base 10 (used in decibels, Richter scale, and pH). Natural logarithm ln(x) uses Euler constant base e ≈ 2.71828 (used in continuous compounding and calculus).'
      },
      {
        question: 'Can you take the logarithm of a negative number or zero?',
        answer: 'In real numbers, logarithms of zero and negative values are undefined because no real power of a positive base can yield zero or a negative number. In complex analysis, ln(-1) = iπ.'
      },
      {
        question: 'What is the Change of Base formula?',
        answer: 'The Change of Base formula states that log_b(x) = ln(x) / ln(b) = log₁₀(x) / log₁₀(b), allowing evaluation of any arbitrary base logarithm on standard scientific calculators.'
      },
      {
        question: 'What are the three primary logarithm algebraic rules?',
        answer: '1. Product Rule: log_b(xy) = log_b(x) + log_b(y). 2. Quotient Rule: log_b(x/y) = log_b(x) - log_b(y). 3. Power Rule: log_b(x^k) = k × log_b(x).'
      },
      {
        question: 'What is a binary logarithm log₂(x) used for?',
        answer: 'Binary logarithms (base 2) are fundamental in computer science for calculating algorithm time complexity (O(log n)), binary search tree depths, information entropy (Shannon bits), and data structures.'
      },
      {
        question: 'Why is log_b(1) always equal to 0?',
        answer: 'Because any non-zero number raised to the zero power equals 1 (b⁰ = 1), log_b(1) is always exactly 0 regardless of the base.'
      },
      {
        question: 'How do logarithms linearize exponential growth curves?',
        answer: 'Plotting exponential data (like viral spread or stock market growth) on a semi-logarithmic scale converts exponential curves into straight lines, making constant percentage growth rates easily readable.'
      }
    ],
    educationalDisclaimer: 'This calculator evaluates real-valued logarithmic expressions. Inputs must be strictly positive (x > 0) and bases must be positive and non-unity (b > 0, b ≠ 1).'
  },
  {
    id: 'exponent-power',
    title: 'Exponent & Scientific Power Calculator',
    slug: 'exponent-power-calculator',
    categoryId: 'math',
    shortDescription: 'Calculate base x raised to power y (x^y), square roots, cube roots, and fractional exponents.',
    description: 'Evaluate exponent powers, scientific notation exponents, integer powers, and fractional radicals with step-by-step simplification.',
    keywords: ['exponent calculator', 'power calculator', 'x to the power of y', 'square root', 'cube root', 'fractional exponent'],
    iconName: 'Zap',
    isPopular: true,
    isNew: true,
    formulaDescription: 'x^y = e^(y × ln(x)); Negative exponent: x^(-y) = 1 / x^y; Fractional exponent: x^(m/n) = ⁿ√(xᵐ)',
    formulaLatex: 'x^y = \\exp(y \\cdot \\ln(x)), \\quad x^{-n} = \\frac{1}{x^n}, \\quad x^{\\frac{m}{n}} = \\sqrt[n]{x^m}',
    relatedCalculatorIds: ['logarithm-calculator', 'scientific', 'standard-form-converter', 'algebra-solver'],
    stepByStepInstructions: [
      'Enter the Base value (x).',
      'Enter the Exponent power (y) as an integer, decimal, or fraction.',
      'Select calculation mode: Standard Power (x^y), Nth Root (ⁿ√x), or Scientific Notation (a × 10^b).',
      'Review the calculated Power Result, fractional radical form, and inverse root evaluation.',
      'Inspect the step-by-step power laws applied: Product of Powers, Power of a Power, Quotient Rule, and Negative Exponents.',
      'View magnitude comparisons showing scientific notation and significant digit formatting.'
    ],
    faqs: [
      {
        question: 'What are the fundamental laws of exponents?',
        answer: 'Key laws include: xᵃ · xᵇ = xᵃ⁺ᵇ, (xᵃ)ᵇ = xᵃᵇ, xᵃ / xᵇ = xᵃ⁻ᵇ, (xy)ᵃ = xᵃ yᵃ, (x/y)ᵃ = xᵃ / yᵃ, x⁰ = 1 (for x ≠ 0), and x⁻ᵃ = 1 / xᵃ.'
      },
      {
        question: 'What does a fractional exponent like x^(1/2) or x^(2/3) mean?',
        answer: 'A fractional exponent represents a radical root: x^(1/n) is the nth root (ⁿ√x). A power of x^(m/n) means taking the nth root of x raised to the mth power (ⁿ√(xᵐ)).'
      },
      {
        question: 'Why is any number to the zero power equal to 1 (x⁰ = 1)?',
        answer: 'Using the quotient rule: xᵃ / xᵃ = xᵃ⁻ᵃ = x⁰. Since any non-zero number divided by itself equals 1, x⁰ must equal 1.'
      },
      {
        question: 'What is 0^0 (zero to the zero power)?',
        answer: 'In algebra and combinatorics, 0⁰ is commonly defined as 1 by convention for polynomials and series; in calculus analysis, it is considered an indeterminate form.'
      },
      {
        question: 'How do negative exponents work?',
        answer: 'A negative exponent indicates the reciprocal of the base raised to the positive power: x⁻² = 1 / x². For fractions, (a/b)⁻ⁿ = (b/a)ⁿ.'
      },
      {
        question: 'Can you raise a negative base to a fractional power?',
        answer: 'If the denominator of the fraction is even (e.g. (-4)^(1/2)), the result is an imaginary/complex number (2i). If the denominator is odd (e.g. (-8)^(1/3)), the result is a real number (-2).'
      },
      {
        question: 'How does continuous exponential growth compound mathematically?',
        answer: 'Continuous compounding uses Euler constant e in the formula A = P · e^(rt), where r is continuous growth rate and t is elapsed time.'
      },
      {
        question: 'What is the difference between polynomial growth (x²) and exponential growth (2^x)?',
        answer: 'In polynomial growth, the base is the variable and exponent is constant. In exponential growth, the base is constant and exponent grows, eventually surpassing every polynomial rate of growth.'
      }
    ],
    educationalDisclaimer: 'This calculator evaluates real and scientific exponent calculations according to established algebraic power theorems.'
  },
  {
    id: 'prime-factorization',
    title: 'Prime Factorization & GCD / LCM Calculator',
    slug: 'prime-factorization-calculator',
    categoryId: 'math',
    shortDescription: 'Find prime factors of any integer, Greatest Common Divisor (GCD), and Least Common Multiple (LCM).',
    description: 'Decompose numbers into prime factor trees, find greatest common factors (GCF), and calculate LCMs with step-by-step factorization.',
    keywords: ['prime factorization', 'gcd', 'lcm', 'greatest common divisor', 'prime numbers', 'factor tree', 'coprime'],
    iconName: 'Grid',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Prime factorization n = p₁^{a₁} · p₂^{a₂} · ... · p_k^{a_k}; LCM(a,b) = (a × b) / GCD(a,b); Euclidean algorithm GCD(a,b)',
    formulaLatex: 'N = \\prod_{i=1}^k p_i^{a_i}, \\quad \\text{GCD}(a,b) = \\text{Euclid}(a,b), \\quad \\text{LCM}(a,b) = \\frac{|a \\cdot b|}{\\text{GCD}(a,b)}',
    relatedCalculatorIds: ['fraction-calculator', 'ratio-proportion', 'algebra-solver', 'standard-deviation-zscore'],
    stepByStepInstructions: [
      'Enter an integer to factor (or two integers to calculate GCD/LCM).',
      'Select analysis mode: Single Number Factorization or Multi-Number GCD/LCM comparison.',
      'Review the Exponential Prime Factorization canonical form (e.g. 360 = 2³ × 3² × 5¹).',
      'Inspect the full list of all positive divisors, total divisor count, and sum of divisors.',
      'Check whether the entered number is Prime, Composite, Square, or Perfect.',
      'View the step-by-step Euclidean Algorithm division steps and prime factor tree breakdown.'
    ],
    faqs: [
      {
        question: 'What is the Fundamental Theorem of Arithmetic?',
        answer: 'The Fundamental Theorem of Arithmetic states that every integer greater than 1 is either a prime number itself or can be uniquely represented as a product of prime numbers, up to the order of factors.'
      },
      {
        question: 'What is the difference between GCD (GCF) and LCM?',
        answer: 'The Greatest Common Divisor (GCD/GCF) is the largest integer that divides both numbers evenly without a remainder. The Least Common Multiple (LCM) is the smallest positive integer that is divisible by both numbers.'
      },
      {
        question: 'How does the Euclidean Algorithm find GCD so quickly?',
        answer: 'The Euclidean algorithm repeatedly takes the remainder of dividing the larger number by the smaller number: GCD(a, b) = GCD(b, a mod b) until the remainder reaches 0.'
      },
      {
        question: 'What is the relationship between GCD and LCM for two numbers?',
        answer: 'For any two positive integers a and b, the product of their GCD and LCM always equals the product of the numbers: GCD(a, b) × LCM(a, b) = a × b.'
      },
      {
        question: 'What are coprime (relatively prime) numbers?',
        answer: 'Two integers are coprime if their only common positive divisor is 1 (i.e. GCD(a, b) = 1). For example, 8 and 15 are coprime even though neither number is individually prime.'
      },
      {
        question: 'Why is the number 1 not considered a prime number?',
        answer: 'Number 1 is excluded from prime numbers to preserve the uniqueness clause of the Fundamental Theorem of Arithmetic; if 1 were prime, factorizations could have infinitely many 1s.'
      },
      {
        question: 'What is a prime factor tree?',
        answer: 'A factor tree is a visual hierarchical diagram where a composite number branches into pairs of factors until all terminal branches are prime numbers.'
      },
      {
        question: 'How are prime factorizations used in real-world modern cryptography (RSA)?',
        answer: 'RSA public-key encryption relies on the fact that multiplying two huge 1024-bit prime numbers is instantaneous, but factoring their 2048-bit product back into primes is computationally infeasible.'
      }
    ],
    educationalDisclaimer: 'This calculator computes exact prime factorizations, divisors, and GCD/LCM metrics using deterministic trial division and Euclidean algorithms.'
  },
  {
    id: 'combination-permutation',
    title: 'Combinations & Permutations (nCr / nPr)',
    slug: 'combination-permutation-calculator',
    categoryId: 'math',
    shortDescription: 'Calculate combinations nCr and permutations nPr with or without repetition.',
    description: 'Find total possible selection combinations and ordered arrangements for probability and combinatorics problems.',
    keywords: ['combinations', 'permutations', 'ncr', 'npr', 'probability calculator', 'factorial', 'choose formula'],
    iconName: 'Percent',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Combinations nCr = n! / [r! (n - r)!]; Permutations nPr = n! / (n - r)!; With repetition: nCr = (n+r-1)! / [r!(n-1)!], nPr = n^r',
    formulaLatex: 'nCr = \\binom{n}{r} = \\frac{n!}{r!(n-r)!}, \\quad nPr = \\frac{n!}{(n-r)!}, \\quad \\text{Repetition } n^r, \\quad \\binom{n+r-1}{r}',
    relatedCalculatorIds: ['statistics', 'standard-deviation-zscore', 'fraction-calculator', 'algebra-solver'],
    stepByStepInstructions: [
      'Enter the Total Number of Items in the set (n ≥ 0).',
      'Enter the Number of Items to Select or Arrange (r, where 0 ≤ r ≤ n).',
      'Select whether Order Matters: Permutations (Order Matters) or Combinations (Order Does NOT Matter).',
      'Specify whether Repetition / Replacement is allowed.',
      'Review the calculated Combinations (nCr) and Permutations (nPr) totals.',
      'Inspect the factorial formula expansion, step-by-step cancellations, and odds / probability representation.'
    ],
    faqs: [
      {
        question: 'What is the primary difference between a permutation and a combination?',
        answer: 'Order matters in permutations (e.g. PIN codes, race finishes 1st-2nd-3rd), while order does NOT matter in combinations (e.g. lottery numbers, hands of poker cards, committee members).'
      },
      {
        question: 'Why is 0! (zero factorial) defined as 1?',
        answer: '0! is defined as 1 so that the combination formula nCn = n! / (n! 0!) = 1 (there is exactly 1 way to choose all n items from n) and the recursive property n! = n × (n-1)! holds for n = 1.'
      },
      {
        question: 'How do you calculate combinations when repetition is allowed?',
        answer: 'Combinations with repetition (stars and bars theorem) use the formula: (n + r - 1)! / [r! × (n - 1)!] = C(n + r - 1, r).'
      },
      {
        question: 'How do you calculate permutations when repetition is allowed?',
        answer: 'When items can be reused with replacement, total arrangements equal n^r. For example, a 4-digit PIN code with digits 0-9 has 10⁴ = 10,000 permutations.'
      },
      {
        question: 'What is Pascal Triangle and how does it relate to combinations?',
        answer: 'Each entry in Pascal Triangle corresponds to a binomial coefficient nCr, where the nth row and rth element equal nCr, representing the coefficients of (x + y)ⁿ.'
      },
      {
        question: 'How are combinations used in lottery probability calculations?',
        answer: 'In a 6/49 lottery, total possible combinations are 49C6 = 49! / (6! × 43!) = 13,983,816. The probability of winning the jackpot with 1 ticket is 1 in 13.98 million.'
      },
      {
        question: 'What is the handshake problem in combinatorics?',
        answer: 'If n people in a room all shake hands with each other once, total handshakes equal nC2 = n(n - 1) / 2.'
      },
      {
        question: 'How do circular permutations differ from linear permutations?',
        answer: 'When arranging n distinct items in a circle where rotations are identical, total circular permutations equal (n - 1)!.'
      }
    ],
    educationalDisclaimer: 'This calculator evaluates combinatorics expressions according to standard discrete mathematics and factorial probability formulas.'
  },
  {
    id: 'vector-cross-dot',
    title: '3D Vector Cross Product & Dot Product Calculator',
    slug: 'vector-cross-dot-calculator',
    categoryId: 'math',
    shortDescription: 'Calculate vector dot product, cross product A × B, vector magnitude, and angle between 3D vectors.',
    description: 'Compute vector operations in 3D Cartesian coordinates (i, j, k) for physics, mechanics, and 3D geometry.',
    keywords: ['vector cross product', 'dot product', 'vector magnitude', 'angle between vectors', '3d vector', 'unit vector'],
    iconName: 'Compass',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Dot Product A · B = Ax Bx + Ay By + Az Bz; Cross Product A × B = (Ay Bz - Az By)i - (Ax Bz - Az Bx)j + (Ax By - Ay Bx)k; cos(θ) = (A · B) / (|A| |B|)',
    formulaLatex: '\\mathbf{A} \\cdot \\mathbf{B} = A_x B_x + A_y B_y + A_z B_z, \\quad \\mathbf{A} \\times \\mathbf{B} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ A_x & A_y & A_z \\\\ B_x & B_y & B_z \\end{vmatrix}, \\quad \\theta = \\arccos\\left(\\frac{\\mathbf{A} \\cdot \\mathbf{B}}{\\|\\mathbf{A}\\| \\|\\mathbf{B}\\|}\\right)',
    relatedCalculatorIds: ['matrix-multiplication', 'triangle', 'scientific', 'pythagorean-theorem'],
    stepByStepInstructions: [
      'Enter the 3D components of Vector A: (Ax, Ay, Az).',
      'Enter the 3D components of Vector B: (Bx, By, Bz).',
      'Review Vector Magnitudes |A| and |B| and Normalized Unit Vectors.',
      'Inspect the Scalar Dot Product (A · B) and determine whether vectors are orthogonal, parallel, or acute/obtuse.',
      'Review the Vector Cross Product (A × B) result vector and its magnitude representing parallelogram area.',
      'Check the exact Angle θ between vectors in both degrees and radians, plus vector projection of A onto B.'
    ],
    faqs: [
      {
        question: 'What is the geometric meaning of the Dot Product (scalar product)?',
        answer: 'The dot product measures directional alignment: A · B = |A| |B| cos(θ). If A · B = 0, vectors are perpendicular (orthogonal). If positive, the angle is acute; if negative, obtuse.'
      },
      {
        question: 'What is the geometric meaning of the Cross Product (vector product)?',
        answer: 'The cross product produces a new vector perpendicular to both input vectors following the right-hand rule. Its magnitude |A × B| equals the area of the parallelogram formed by the vectors.'
      },
      {
        question: 'Why is the Cross Product anti-commutative (A × B = -[B × A])?',
        answer: 'Reversing the order of vectors in the 3x3 determinant flips the sign of all minor expansions, reversing the direction of the resulting perpendicular vector.'
      },
      {
        question: 'How is vector magnitude calculated in 3D Cartesian space?',
        answer: 'By 3D Pythagorean distance: |A| = √(Ax² + Ay² + Az²).'
      },
      {
        question: 'What is a Unit Vector and how is it constructed?',
        answer: 'A unit vector is a vector with length exactly 1 that indicates pure direction: û = A / |A| = (Ax/|A|, Ay/|A|, Az/|A|).'
      },
      {
        question: 'How is the vector projection of Vector A onto Vector B calculated?',
        answer: 'The scalar projection is (A · B) / |B|. The vector projection is proj_B(A) = [(A · B) / |B|²] · B.'
      },
      {
        question: 'What physical quantities use Cross Products in engineering?',
        answer: 'Torque (τ = r × F), magnetic Lorentz force (F = q(v × B)), angular momentum (L = r × p), and fluid vorticity all utilize vector cross products.'
      },
      {
        question: 'What happens to the Cross Product if two vectors are parallel or collinear?',
        answer: 'If two vectors are parallel or antiparallel, the angle θ is 0° or 180° (sin θ = 0), so the cross product A × B is the zero vector [0, 0, 0].'
      }
    ],
    educationalDisclaimer: 'This calculator computes vector operations in standard Euclidean 3D space according to linear algebra and vector calculus rules.'
  },
  {
    id: 'sequence-series',
    title: 'Arithmetic & Geometric Sequence Calculator',
    slug: 'sequence-series-calculator',
    categoryId: 'math',
    shortDescription: 'Calculate nth term and sum of arithmetic or geometric progression series.',
    description: 'Find terms and cumulative sum of numbers in arithmetic sequences (constant difference) or geometric sequences (common ratio).',
    keywords: ['arithmetic sequence', 'geometric progression', 'series sum', 'nth term', 'math sequence', 'infinite geometric series'],
    iconName: 'Layers',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Arithmetic: a_n = a₁ + (n - 1)d, S_n = (n/2)(2a₁ + (n-1)d); Geometric: a_n = a₁ · r^(n-1), S_n = a₁(1 - r^n) / (1 - r)',
    formulaLatex: 'a_n = a_1 + (n-1)d, \\quad S_n = \\frac{n(a_1 + a_n)}{2}, \\quad g_n = a_1 r^{n-1}, \\quad S_{\\infty} = \\frac{a_1}{1 - r} \\; (|r| < 1)',
    relatedCalculatorIds: ['algebra-solver', 'compound-interest', 'polynomial-solver', 'logarithm-calculator'],
    stepByStepInstructions: [
      'Select Sequence Type: Arithmetic Progression (constant difference d) or Geometric Progression (common ratio r).',
      'Enter the First Term (a₁).',
      'Enter the Common Difference (d) or Common Ratio (r).',
      'Enter the Target Term Number (n) to calculate.',
      'Review the calculated Nth Term Value (a_n) and Partial Sum of First n Terms (S_n).',
      'For geometric series with |r| < 1, review the Infinite Sum to Convergence (S_∞) and term sequence table.'
    ],
    faqs: [
      {
        question: 'What is an Arithmetic Progression (AP)?',
        answer: 'An arithmetic sequence is a sequence of numbers where the difference between consecutive terms is constant (common difference d). Examples include 3, 7, 11, 15, 19 (d = 4).'
      },
      {
        question: 'What is a Geometric Progression (GP)?',
        answer: 'A geometric sequence is a sequence where each term after the first is found by multiplying the previous term by a fixed non-zero number (common ratio r). Examples include 2, 6, 18, 54 (r = 3).'
      },
      {
        question: 'How did Carl Friedrich Gauss sum an arithmetic series so quickly?',
        answer: 'Gauss paired the first and last terms: S_n = n(a₁ + a_n) / 2. For summing numbers 1 to 100, pairing (1+100), (2+99) yields 50 pairs of 101 = 5,050.'
      },
      {
        question: 'When does an infinite geometric series converge?',
        answer: 'An infinite geometric series converges to a finite sum if and only if the absolute value of the common ratio is strictly less than 1 (|r| < 1). The sum is S_∞ = a₁ / (1 - r).'
      },
      {
        question: 'What is the arithmetic mean between two numbers?',
        answer: 'The arithmetic mean between a and b is (a + b) / 2. In an arithmetic progression, any intermediate term is the arithmetic mean of its adjacent terms.'
      },
      {
        question: 'What is the geometric mean between two positive numbers?',
        answer: 'The geometric mean between positive numbers a and b is √(ab). In a geometric progression, any term is the geometric mean of its adjacent neighbors.'
      },
      {
        question: 'How is compound interest related to geometric sequences?',
        answer: 'Compound interest is a geometric progression where the principal balance multiplies by (1 + r) in each successive compounding period.'
      },
      {
        question: 'What is a harmonic progression?',
        answer: 'A harmonic progression is a sequence of numbers whose reciprocals form an arithmetic progression (e.g. 1, 1/2, 1/3, 1/4, 1/5).'
      }
    ],
    educationalDisclaimer: 'This calculator evaluates finite and convergent infinite mathematical sequences according to standard discrete series theorems.'
  },
  {
    id: 'standard-form-converter',
    title: 'Scientific Notation & Standard Form Converter',
    slug: 'standard-form-converter-calculator',
    categoryId: 'math',
    shortDescription: 'Convert numbers between standard decimal form, scientific notation (a × 10^b), and E-notation.',
    description: 'Format large or small numbers into scientific notation (a × 10^k), engineering notation, or plain decimal with significant figures.',
    keywords: ['scientific notation', 'standard form', 'e notation', 'engineering notation', 'decimal converter', 'significant figures'],
    iconName: 'Binary',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Scientific Notation: N = a × 10^b where 1 ≤ |a| < 10 and b is an integer; Engineering Notation: 1 ≤ |a| < 1000 where b is multiple of 3',
    formulaLatex: 'N = a \\times 10^b \\quad (1 \\le |a| < 10, \\; b \\in \\mathbb{Z}), \\quad N = a \\times 10^{3k} \\; (\\text{Engineering})',
    relatedCalculatorIds: ['exponent-power', 'binary-hex-converter', 'unit-converter', 'logarithm-calculator'],
    stepByStepInstructions: [
      'Enter any number in standard decimal form (e.g. 0.000456), scientific notation (4.56e-4), or scientific product (4.56 x 10^-4).',
      'Select desired output precision (Significant Figures: 1 to 12).',
      'Review converted Scientific Notation (a × 10^b).',
      'Inspect Engineering Notation (powers in multiples of 3 matching SI metric prefixes like kilo, mega, micro, nano).',
      'View E-Notation (e.g. 4.56E-4) commonly displayed in computer programming and scientific calculators.',
      'Examine full word-form verbal representation and SI metric prefix identification.'
    ],
    faqs: [
      {
        question: 'What is scientific notation (standard form)?',
        answer: 'Scientific notation expresses very large or small numbers as a coefficient (mantissa) between 1 and 10 multiplied by a power of 10: a × 10^b, where 1 ≤ |a| < 10.'
      },
      {
        question: 'What is the difference between scientific notation and engineering notation?',
        answer: 'In scientific notation, the exponent b can be any integer, and the coefficient is between 1 and 10. In engineering notation, the exponent must be a multiple of 3 (10³, 10⁶, 10⁻³, 10⁻⁶), matching SI metric prefixes (kilo, mega, micro).'
      },
      {
        question: 'What does the "e" or "E" mean on a calculator display?',
        answer: '"E" stands for "exponent of base 10". For example, 3.2E+6 represents 3.2 × 10⁶ (3,200,000), while 5.1E-4 represents 5.1 × 10⁻⁴ (0.00051).'
      },
      {
        question: 'How do you determine the power of 10 when converting decimals?',
        answer: 'Count the number of places the decimal point moves. Moving left yields a positive exponent (345,000 → 3.45 × 10⁵). Moving right yields a negative exponent (0.0078 → 7.8 × 10⁻³).'
      },
      {
        question: 'What are significant figures (sig figs)?',
        answer: 'Significant figures represent the meaningful digits in a measurement that contribute to its precision, excluding leading zeros used solely as decimal placeholders.'
      },
      {
        question: 'How do you multiply two numbers written in scientific notation?',
        answer: 'Multiply their coefficients and add their exponents: (2 × 10³) × (4 × 10⁵) = (2 × 4) × 10³⁺⁵ = 8 × 10⁸.'
      },
      {
        question: 'How do you divide two numbers in scientific notation?',
        answer: 'Divide their coefficients and subtract the denominator exponent from the numerator exponent: (8 × 10⁶) / (2 × 10²) = (8/2) × 10⁶⁻² = 4 × 10⁴.'
      },
      {
        question: 'What are common real-world examples of scientific notation?',
        answer: 'Speed of light (3.0 × 10⁸ m/s), Avogadro number (6.022 × 10²³ mol⁻¹), mass of an electron (9.109 × 10⁻³¹ kg), and Earth mass (5.972 × 10²⁴ kg).'
      }
    ],
    educationalDisclaimer: 'This converter formats numbers across decimal, scientific, engineering, and programming notations with exact significant figure rounding.'
  },
  {
    id: 'volume-surface-3d',
    title: '3D Geometry Volume & Surface Area Calculator',
    slug: 'volume-surface-3d-calculator',
    categoryId: 'math',
    shortDescription: 'Calculate volume and total surface area for spheres, cylinders, cones, cubes, and rectangular prisms.',
    description: 'Compute 3D shape capacity, volume in cubic units, and exterior surface area for common geometric solids.',
    keywords: ['volume calculator', '3d surface area', 'cylinder volume', 'sphere volume', 'cone volume', 'rectangular prism', 'geometric solids'],
    iconName: 'Box',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Cylinder: V = π r² h, SA = 2πr(r + h); Sphere: V = (4/3)π r³, SA = 4π r²; Cone: V = (1/3)π r² h, SA = π r(r + √(r² + h²)); Prism: V = lwh',
    formulaLatex: 'V_{\\text{cyl}} = \\pi r^2 h, \\quad V_{\\text{sph}} = \\frac{4}{3}\\pi r^3, \\quad V_{\\text{cone}} = \\frac{1}{3}\\pi r^2 h, \\quad V_{\\text{prism}} = l \\cdot w \\cdot h',
    relatedCalculatorIds: ['circle-calculator', 'triangle', 'pythagorean-theorem', 'concrete-slab-volume'],
    stepByStepInstructions: [
      'Select the 3D Geometric Solid (Sphere, Cylinder, Cone, Cube, Rectangular Prism, Pyramid, Torus).',
      'Enter required dimension parameters (Radius, Height, Length, Width).',
      'Choose measurement unit system (Inches, Feet, Yards, Centimeters, Meters).',
      'Review total 3D Volume in cubic units, gallons, liters, and cubic yards.',
      'Review total Lateral Surface Area and Total Exterior Surface Area (including bases).',
      'Inspect step-by-step geometric formula substitution and unit conversion multipliers.'
    ],
    faqs: [
      {
        question: 'What is the difference between volume and surface area?',
        answer: 'Volume measures the 3-dimensional internal space enclosed within a solid (cubic units). Surface area measures the total 2-dimensional area of the solid exterior boundary faces (square units).'
      },
      {
        question: 'Why does a cone have exactly one-third the volume of a cylinder with identical radius and height?',
        answer: 'By calculus integration of cross-sectional circular disks (or Cavalieri principle), a cone volume is V = (1/3)πr²h, exactly 1/3 of the cylinder V = πr²h.'
      },
      {
        question: 'How do you calculate the volume and surface area of a sphere?',
        answer: 'Sphere volume is V = (4/3)πr³ and surface area is SA = 4πr² (derived from the derivative of volume with respect to radius: d/dr[(4/3)πr³] = 4πr²).'
      },
      {
        question: 'How do you convert cubic inches to gallons?',
        answer: '1 US liquid gallon equals exactly 231 cubic inches. Divide total cubic inches by 231 to obtain liquid volume in US gallons.'
      },
      {
        question: 'What is lateral surface area versus total surface area?',
        answer: 'Lateral surface area includes only the side surfaces (excluding top and bottom end bases). Total surface area adds the base areas to the lateral area.'
      },
      {
        question: 'How does scaling dimensions affect volume and surface area (Square-Cube Law)?',
        answer: 'If you scale all linear dimensions of a solid by factor k, surface area increases by k² (area scales quadratically), while volume increases by k³ (volume scales cubically).'
      },
      {
        question: 'What is the slant height of a cone and how is it found?',
        answer: 'Slant height (s) is the distance from the vertex along the outer surface to the base rim: s = √(r² + h²) using the Pythagorean theorem.'
      },
      {
        question: 'How do you calculate the volume of a rectangular prism?',
        answer: 'Multiply length by width by height: V = l × w × h. Total surface area equals 2(lw + lh + wh).'
      }
    ],
    educationalDisclaimer: 'This calculator computes exact geometric volume and surface area based on Euclidean 3D geometry theorems.'
  },
  {
    id: 'binary-hex-converter',
    title: 'Binary, Hexadecimal & Decimal Converter',
    slug: 'binary-hex-converter-calculator',
    categoryId: 'math',
    shortDescription: 'Convert numbers between Decimal (base 10), Binary (base 2), Hexadecimal (base 16), and Octal (base 8).',
    description: 'Convert integer values between computer numbering bases: Binary, Hexadecimal, Octal, and Decimal with bitwise representation.',
    keywords: ['binary to decimal', 'hex to binary', 'hexadecimal converter', 'base converter', 'binary converter', 'octal converter', 'bitwise'],
    iconName: 'Binary',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Base b conversion: Value = Σ d_i × b^i; Hex: 4-bit nibbles; Octal: 3-bit groups; Two complement for signed integers',
    formulaLatex: 'N = \\sum_{i=0}^{k-1} d_i \\cdot b^i, \\quad \\text{Hex Nibble } [b_3 b_2 b_1 b_0]_2 = h_{16}',
    relatedCalculatorIds: ['standard-form-converter', 'subnet-cidr', 'data-storage-converter', 'scientific'],
    stepByStepInstructions: [
      'Enter an integer value in any format (Decimal, Binary with 0s and 1s, Hexadecimal 0-9/A-F, or Octal 0-7).',
      'Select the Input Base (Base 10 Decimal, Base 2 Binary, Base 16 Hex, Base 8 Octal).',
      'Choose Signed (Two Complement) or Unsigned integer mode (8-bit, 16-bit, 32-bit, or 64-bit).',
      'Review synchronized conversions across all four numbering bases simultaneously.',
      'Inspect 8-bit / 16-bit byte breakdown with highlighted high and low nibbles.',
      'View ASCII character representation and bitwise bit-shift operations.'
    ],
    faqs: [
      {
        question: 'Why do digital computers use binary (base 2)?',
        answer: 'Computer hardware is built from semiconductor transistors that operate reliably in two discrete electronic states: ON (voltage high = 1) and OFF (voltage low = 0).'
      },
      {
        question: 'Why is hexadecimal (base 16) widely used in programming?',
        answer: 'Hexadecimal provides a compact human-readable shorthand for binary: exactly 4 binary bits (a nibble) map to a single hex character (0-9 and A-F), so one byte (8 bits) is represented by 2 hex digits.'
      },
      {
        question: 'What do the letters A through F represent in hexadecimal?',
        answer: 'A = 10, B = 11, C = 12, D = 13, E = 14, and F = 15 in base 10 decimal.'
      },
      {
        question: 'How do you convert binary to decimal manually?',
        answer: 'Multiply each binary digit by its power of 2 positional weight: for example, binary 1101₂ = (1 × 2³) + (1 × 2²) + (0 × 2¹) + (1 × 2⁰) = 8 + 4 + 0 + 1 = 13₁₀.'
      },
      {
        question: 'What is Two Complement representation for negative binary numbers?',
        answer: 'Two complement represents signed integers: to negate a binary number, invert all bits (one complement) and add 1. This allows subtraction to be performed using standard adder circuits.'
      },
      {
        question: 'What is an octal number system (base 8)?',
        answer: 'Octal uses digits 0 through 7. Each octal digit represents exactly 3 binary bits, historically popular in computing and still used in Unix file permission codes (e.g. chmod 755).'
      },
      {
        question: 'What is the maximum value an 8-bit unsigned byte can hold?',
        answer: 'An unsigned 8-bit byte can store values from 0 to 2⁸ - 1 = 255 (binary 11111111₂ = hex FF₁₆).'
      },
      {
        question: 'How are HTML / CSS hex color codes structured?',
        answer: 'A 6-digit hex color (#RRGGBB) consists of three 2-digit hex bytes representing Red, Green, and Blue intensities from 00 (0) to FF (255).'
      }
    ],
    educationalDisclaimer: 'This calculator converts values between positional number bases according to standard discrete mathematics and computer science bitwise rules.'
  },
  {
    id: 'concrete-slab-volume',
    title: 'Concrete Slab & Foundation Volume Calculator',
    slug: 'concrete-slab-volume-calculator',
    categoryId: 'construction',
    shortDescription: 'Calculate concrete cubic yards, cubic feet, and 80lb/60lb bag counts for slab pours.',
    description: 'Estimate required concrete material in cubic yards for slab patios, garage floors, driveways, and footings with waste buffers.',
    keywords: ['concrete volume', 'cubic yards concrete', 'concrete slab', 'concrete bag count', 'patio pour', 'concrete driveway'],
    iconName: 'HardHat',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Cubic Feet = Length(ft) × Width(ft) × (Thickness(in) / 12); Cubic Yards = Cubic Feet / 27 × (1 + Waste %); 80lb Bags = Cubic Yards × 45',
    formulaLatex: '\\text{Cu. Yds} = \\frac{L_{\\text{ft}} \\times W_{\\text{ft}} \\times (T_{\\text{in}} / 12)}{27} \\times (1 + W_{\\%}), \\quad \\text{Bags}_{80\\text{lb}} = \\text{Cu. Yds} \\times 45',
    relatedCalculatorIds: ['concrete-footing-slab', 'brick-mortar', 'mulch-soil-volume', 'flooring-tile'],
    stepByStepInstructions: [
      'Enter Slab Length in feet.',
      'Enter Slab Width in feet.',
      'Enter Slab Thickness/Depth in inches (e.g. 4 inches for patios/walkways, 6 inches for heavy driveways).',
      'Select a Safety Waste Factor (recommended 10% for excavation irregularities and spillage).',
      'Review total Concrete Volume in Cubic Yards, Cubic Feet, and Cubic Meters.',
      'Check required Pre-Mixed Bag counts (80 lb bags = 0.60 cu ft each, 60 lb bags = 0.45 cu ft each) versus ready-mix truck delivery thresholds.'
    ],
    faqs: [
      {
        question: 'How do you calculate cubic yards of concrete for a slab?',
        answer: 'Multiply Length (ft) × Width (ft) × Thickness (in / 12) to get cubic feet, then divide by 27 to convert to cubic yards. Multiply by 1.10 for 10% waste buffer.'
      },
      {
        question: 'How many 80-pound bags of concrete are in a cubic yard?',
        answer: 'One cubic yard equals 27 cubic feet. An 80 lb bag yields approximately 0.60 cubic feet, requiring 45 bags of 80 lb concrete per cubic yard (or 60 bags of 60 lb mix).'
      },
      {
        question: 'What is the standard thickness for residential concrete slabs?',
        answer: 'Sidewalks and patio slabs are typically poured 4 inches thick. Residential driveways and garage floors subject to vehicle loads should be at least 5 to 6 inches thick.'
      },
      {
        question: 'When should I order a ready-mix concrete truck instead of mixing bags?',
        answer: 'For projects exceeding 1.0 to 1.5 cubic yards (approx. 45 to 65 bags of 80lb concrete), ordering a ready-mix truck is significantly faster, physically easier, and ensures consistent batch strength.'
      },
      {
        question: 'Why is a 10% waste allowance recommended for concrete pours?',
        answer: 'A 10% buffer compensates for uneven subgrade grading, bowing formwork, spilled mix, and grade depth variations. Running out of concrete mid-pour creates weak cold joints.'
      },
      {
        question: 'What is concrete PSI and which strength should I choose?',
        answer: 'PSI measures compressive strength. Walkways and patios typically use 3,000 to 3,500 PSI. Driveways and structural foundations in freeze-thaw climates require 4,000+ PSI.'
      },
      {
        question: 'How long does concrete take to cure and reach full strength?',
        answer: 'Concrete reaches initial set in 24 to 48 hours (safe for light walking), achieves 70% strength in 7 days, and reaches design 28-day cure compressive strength.'
      },
      {
        question: 'What base material is required under a concrete slab?',
        answer: 'A compacted gravel or crushed stone base (4 to 6 inches of 3/4" crushed gravel with fines) provides proper drainage, prevents frost heaving, and distributes slab weight.'
      }
    ],
    educationalDisclaimer: 'Concrete estimates provide theoretical volume. Verify formwork grade depths and consult local ready-mix suppliers before placing orders.'
  },
  {
    id: 'drywall-sheet',
    title: 'Drywall Sheet & Mud Estimator',
    slug: 'drywall-sheet-calculator',
    categoryId: 'construction',
    shortDescription: 'Calculate 4x8 or 4x12 drywall panel counts, joint compound mud gallons, and drywall screws.',
    description: 'Estimate required sheetrock panels, joint compound buckets, seam tape rolls, and screws for wall or ceiling hanging.',
    keywords: ['drywall calculator', 'sheetrock count', 'drywall mud', 'drywall screws', 'wall panel count', 'joint compound'],
    iconName: 'Square',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Room Wall Area = 2 × (L + W) × H - Openings; Sheets = Ceil(Total Area / Sheet Area × (1 + Waste %)); Mud = Area × 0.053 lbs/sq ft',
    formulaLatex: '\\text{Sheets} = \\left\\lceil \\frac{\\text{Net Area}}{\\text{Sheet Area}} \\times (1 + W_{\\%}) \\right\\rceil, \\quad \\text{Compound} = \\text{Total Area} \\times 0.053 \\; \\text{gal/sq ft}',
    relatedCalculatorIds: ['paint-coverage-detail', 'flooring-tile', 'brick-mortar', 'fence-post-spacing'],
    stepByStepInstructions: [
      'Enter Room Length, Width, and Ceiling Height in feet.',
      'Select whether to include the Ceiling in drywall calculations.',
      'Specify number of standard Doors and Windows to subtract from wall surface area.',
      'Select Sheet Size: 4x8 ft (32 sq ft) or 4x12 ft (48 sq ft for fewer seams).',
      'Set Waste Allowance percentage (typically 10% to 15% for cuts around openings).',
      'Review required Drywall Sheets count, 4.5-gal Joint Compound mud buckets, paper tape rolls (500 ft), and drywall screw count (approx 1 lb per 4 sheets).'
    ],
    faqs: [
      {
        question: 'Should I use 4x8 sheets or 4x12 sheets of drywall?',
        answer: '4x12 sheets reduce the total number of butt joints by 25% to 30%, creating a smoother finish with less taping labor, but they are heavier (approx. 70-80 lbs) and harder to maneuver in tight hallways.'
      },
      {
        question: 'What thickness of drywall is standard for walls vs ceilings?',
        answer: 'Standard interior walls use 1/2-inch drywall. Ceilings with 24-inch on-center joist spacing require 5/8-inch drywall or specialized sag-resistant 1/2-inch panels. Multi-family shared walls use 5/8-inch Type X fire-rated boards.'
      },
      {
        question: 'How much joint compound (drywall mud) is needed per square foot?',
        answer: 'A rule of thumb is approximately 0.053 gallons (or 0.14 lbs) of ready-mixed joint compound per square foot of drywall (roughly one 4.5-gallon bucket per 100-120 sq ft of sheetrock across 3 coats).'
      },
      {
        question: 'How many drywall screws do I need per sheet?',
        answer: 'A standard 4x8 sheet requires approximately 32 to 36 screws (spaced 12 inches on-center along ceiling joists and 16 inches along wall studs). 1 pound of 1-1/4" screws contains about 300 screws (enough for ~9 sheets).'
      },
      {
        question: 'How much drywall tape is needed?',
        answer: 'Estimate approximately 1 linear foot of joint tape for every 2 square feet of drywall area. A standard 500-foot roll of paper or fiberglass mesh tape covers roughly 1,000 sq ft of board.'
      },
      {
        question: 'Should drywall be hung horizontally or vertically?',
        answer: 'Drywall is typically hung horizontally on walls in residential construction to bridge minor stud misalignment and place continuous tape joints at comfortable working waist height.'
      },
      {
        question: 'What is the purpose of the 3 separate coats of drywall mud?',
        answer: '1st coat (taping coat): Embeds paper seam tape. 2nd coat (filler coat): Feathers joints 8-10 inches wide. 3rd coat (finish coat): Ultra-thin skim feathered 12-14 inches wide to conceal all ridges.'
      },
      {
        question: 'What is greenboard or purple drywall used for?',
        answer: 'Greenboard and purple drywall are moisture-resistant and mold-resistant gypsum boards designed for bathrooms, kitchens, and basements where humidity levels are elevated.'
      }
    ],
    educationalDisclaimer: 'This drywall estimator provides material approximations based on standard construction standards and hanging practices.'
  },
  {
    id: 'flooring-tile',
    title: 'Flooring & Tile Square Footage Calculator',
    slug: 'flooring-tile-calculator',
    categoryId: 'construction',
    shortDescription: 'Calculate floor tile count, square footage, waste allowance %, and thinset mortar requirements.',
    description: 'Find required tile boxes, individual tile counts, and waste buffer for porcelain, ceramic, hardwood, or LVP flooring.',
    keywords: ['tile calculator', 'floor tile count', 'tile waste percentage', 'thinset mortar', 'tile sq ft', 'lvp flooring'],
    iconName: 'Grid',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Room Area = Length × Width; Total Tiles = Ceil((Room Area Sq Ft / Tile Area Sq Ft) × (1 + Waste %)); Boxes = Ceil(Total Sq Ft with Waste / Sq Ft per Box)',
    formulaLatex: '\\text{Total Tiles} = \\left\\lceil \\frac{L \\times W}{\\text{Tile Area}} \\times (1 + W_{\\%}) \\right\\rceil, \\quad \\text{Boxes} = \\left\\lceil \\frac{\\text{Gross Sq Ft}}{\\text{Box Sq Ft}} \\right\\rceil',
    relatedCalculatorIds: ['flooring-square-footage', 'tile-grout', 'paint-coverage-detail', 'concrete-slab-volume'],
    stepByStepInstructions: [
      'Enter Room Length and Room Width in feet.',
      'Select or enter Individual Tile Dimensions (e.g. 12x12, 12x24, 6x24, 24x24 inches).',
      'Enter Square Feet per Purchase Box (typically 10 to 18 sq ft per carton).',
      'Select Installation Pattern and Waste Factor (10% for straight grid, 15% for diagonal or herringbone, 20% for intricate mosaics).',
      'Review total Net Floor Area, Gross Square Footage including waste, Individual Tile count, and full Cartons/Boxes to buy.',
      'Check estimated 50-lb thinset mortar bags (approx 1 bag per 50-75 sq ft with 1/2" notch trowel) and dry grout requirements.'
    ],
    faqs: [
      {
        question: 'What percentage of tile waste should I factor into my order?',
        answer: 'For standard straight grid layouts in rectangular rooms, add 10% waste. For offset brick patterns or rooms with angles, add 12-15%. For diagonal, herringbone, or complex shapes, add 15-20%.'
      },
      {
        question: 'Why must I always round up to whole tile cartons/boxes?',
        answer: 'Flooring retailers sell porcelain, ceramic, and vinyl plank products exclusively in sealed whole cartons to protect tile edges during shipping and ensure consistent color dye lots.'
      },
      {
        question: 'What is a tile "Dye Lot" and why does it matter?',
        answer: 'Tile manufactured in different kiln batches has slight color and dimensional variations. Purchasing all needed boxes (plus spare tiles for future repairs) from a single dye lot guarantees color uniformity.'
      },
      {
        question: 'How many 50 lb bags of thinset mortar do I need?',
        answer: 'One 50 lb bag of modified thinset mortar covers approximately 40 to 50 sq ft with a 1/2" × 1/2" square-notch trowel (for large format 12x24 tiles) or 60 to 75 sq ft with a 1/4" trowel (for smaller tiles).'
      },
      {
        question: 'What size trowel notch should I use for large format tiles (12x24)?',
        answer: 'Large format tiles (any tile with one side 15 inches or longer) require at least a 1/2" × 1/2" square notch or 1/2" U-notch trowel plus back-buttering to achieve minimum 85-95% mortar coverage.'
      },
      {
        question: 'What is the difference between porcelain and ceramic tile?',
        answer: 'Porcelain is made from denser, finer clay fired at higher temperatures, making it impervious to water (absorption rate < 0.5%) and suitable for outdoor or high-moisture shower floors. Ceramic is softer and suitable for walls and dry residential floors.'
      },
      {
        question: 'How many extra tiles should I keep after installation?',
        answer: 'Keep 1 to 2 extra full cartons (or 10-15 loose tiles) in storage for future plumbing repairs, cracked tile replacements, or subfloor access.'
      },
      {
        question: 'How does tile grout joint width affect grout quantity?',
        answer: 'Wider grout joints (e.g. 1/4" vs 1/16") require substantially more dry grout powder. A 25 lb bag of sanded grout typically covers 100 to 150 sq ft of 12x12 tile with 1/8" joints.'
      }
    ],
    educationalDisclaimer: 'This tile calculator provides material estimations based on room dimensions and selected waste factors. Always verify box square footage with your tile manufacturer.'
  },
  {
    id: 'roofing-shingle',
    title: 'Roofing Shingle Square & Bundle Estimator',
    slug: 'roofing-shingle-calculator',
    categoryId: 'construction',
    shortDescription: 'Calculate roofing squares (100 sq ft), shingle bundles, ridge caps, and underlayment rolls.',
    description: 'Estimate roof shingle bundle requirements based on roof pitch, footprint square footage, and waste factor.',
    keywords: ['roofing shingles', 'roofing squares', 'shingle bundles', 'roof pitch shingles', 'roof estimator', 'ridge cap shingles'],
    iconName: 'Home',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Pitch Multiplier = sqrt(1 + (Pitch / 12)^2); Roof Area = Ground Area × Multiplier; Squares = Area / 100; Bundles = Ceil(Squares × 3 × (1 + Waste %))',
    formulaLatex: '\\text{Squares} = \\frac{A_{\\text{ground}} \\times \\sqrt{1 + (P/12)^2}}{100}, \\quad \\text{Bundles} = \\left\\lceil \\text{Squares} \\times 3 \\times (1 + W_{\\%}) \\right\\rceil',
    relatedCalculatorIds: ['roof-pitch-rafter', 'drywall-sheet', 'deck-board', 'paint-coverage-detail'],
    stepByStepInstructions: [
      'Enter the Ground Footprint Length and Width of the building in feet.',
      'Select or input the Roof Pitch (e.g. 4/12, 6/12, 8/12, 12/12).',
      'Select Roof Complexity / Waste Factor (10% for simple gable roofs, 15% for hip roofs, 20% for complex dormers and valleys).',
      'Specify Ridge and Hip linear feet to calculate Ridge Cap bundles (typically 35 linear ft per bundle).',
      'Review total Roof Area (sq ft), Roofing Squares (100 sq ft per square), and 3-Tab or Architectural Shingle Bundles (3 bundles per square).',
      'Check recommended #15 or #30 asphalt felt Underlayment rolls and roofing nail count (approx 320 nails per square).'
    ],
    faqs: [
      {
        question: 'What is a "Roofing Square"?',
        answer: 'A roofing square is a standard unit of construction measurement equal to 100 square feet of roof surface area.'
      },
      {
        question: 'How many shingle bundles make up one roofing square?',
        answer: 'Standard architectural and 3-tab asphalt shingles are packaged at 3 bundles per roofing square (33.3 square feet of coverage per bundle). Heavyweight designer shingles may require 4 or 5 bundles per square.'
      },
      {
        question: 'How does roof pitch affect square footage?',
        answer: 'Steeper roofs have significantly more surface area than the building flat ground footprint. For example, a 6/12 pitch multiplies ground area by 1.118, while a steep 12/12 pitch multiplies ground area by 1.414 (+41.4% more surface area).'
      },
      {
        question: 'What waste percentage should I add for roof shingles?',
        answer: 'Add 10% for simple two-sided gable roofs. Add 12% to 15% for hip roofs with valleys. Add 15% to 20% for multi-level roofs with dormers, valleys, turrets, and skylights.'
      },
      {
        question: 'How many nails are needed per shingle?',
        answer: 'Standard installations require 4 nails per shingle (approx 320 nails per square). High-wind or hurricane zones require 6 nails per shingle (approx 480 nails per square).'
      },
      {
        question: 'What is the difference between 3-tab and architectural shingles?',
        answer: '3-tab shingles are flat, single-layer asphalt strips rated for 20-25 years. Architectural (dimensional) shingles are multi-layered, thicker, resist winds up to 130 mph, and carry 30-year to lifetime limited warranties.'
      },
      {
        question: 'How much underlayment felt do I need?',
        answer: 'A standard roll of #15 felt underlayment covers approximately 400 sq ft (4 squares), while heavier #30 felt covers roughly 200 sq ft (2 squares) accounting for overlaps.'
      },
      {
        question: 'How do you calculate starter shingles and ridge cap shingles?',
        answer: 'Starter shingles are required along all eaves and rakes (perimeter linear feet). Ridge cap shingles cover hips and ridges, with one standard bundle covering approximately 30 to 35 linear feet.'
      }
    ],
    educationalDisclaimer: 'Roof estimates provide material approximations based on geometric slope multipliers. Verify on-site dimensions, local building code wind zones, and flashing requirements.'
  },
  {
    id: 'mulch-soil-volume',
    title: 'Mulch & Topsoil Volume Calculator',
    slug: 'mulch-soil-volume-calculator',
    categoryId: 'construction',
    shortDescription: 'Calculate landscaping mulch and topsoil volume in cubic yards and 2 cu. ft bagged counts.',
    description: 'Determine required bulk cubic yards or bagged volume of mulch, compost, or topsoil for garden beds.',
    keywords: ['mulch calculator', 'topsoil volume', 'cubic yards mulch', 'garden bed coverage', 'mulch bags', 'compost calculator'],
    iconName: 'Trees',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Cubic Feet = Area Sq Ft × (Depth Inches / 12); Cubic Yards = Cubic Feet / 27; Bag Count (2 cu ft) = Ceil(Cubic Feet / 2)',
    formulaLatex: '\\text{Cubic Yards} = \\frac{A_{\\text{sq ft}} \\times (D_{\\text{in}} / 12)}{27}, \\quad \\text{Bags}_{\\text{2 cu ft}} = \\left\\lceil \\frac{A_{\\text{sq ft}} \\times (D_{\\text{in}} / 12)}{2} \\right\\rceil',
    relatedCalculatorIds: ['gravel-paving', 'concrete-slab-volume', 'fence-post-spacing', 'flooring-tile'],
    stepByStepInstructions: [
      'Enter Garden Bed Total Square Footage (or Length × Width for rectangular beds, or Radius for circular beds).',
      'Select Desired Layer Depth in inches (e.g. 2 to 3 inches for annual mulch freshening, 4 inches for weed suppression).',
      'Select Material Type (Bark Mulch, Wood Chips, Topsoil, Compost, or Raised Bed Mix).',
      'Review required Bulk Volume in Cubic Yards and Cubic Feet.',
      'Check standard 2.0 cu ft and 1.5 cu ft Retail Bag purchase counts.',
      'Compare Bulk Truck Delivery pricing versus retail bags for cost optimization.'
    ],
    faqs: [
      {
        question: 'How deep should landscape mulch be applied?',
        answer: 'Apply 2 to 3 inches of mulch for standard garden and shrub beds. Applying more than 4 inches can suffocate plant roots, while less than 2 inches allows sunlight to stimulate weed germination.'
      },
      {
        question: 'How many square feet does 1 cubic yard of mulch cover?',
        answer: 'One cubic yard (27 cubic feet) covers 324 sq ft at 1 inch depth, 162 sq ft at 2 inches depth, 108 sq ft at 3 inches depth, or 81 sq ft at 4 inches depth.'
      },
      {
        question: 'How many 2 cubic foot bags make 1 cubic yard?',
        answer: 'It takes 13.5 bags of 2.0 cu ft mulch (or 18 bags of 1.5 cu ft mulch) to equal one cubic yard (27 cubic feet).'
      },
      {
        question: 'When is bulk delivery cheaper than buying bagged mulch?',
        answer: 'Bulk delivery is generally cheaper for quantities of 3 or more cubic yards (approx 40+ bags), even after factoring in local dump truck delivery delivery fees.'
      },
      {
        question: 'What is the difference between shredded hardwood mulch and bark nuggets?',
        answer: 'Shredded hardwood knits together on slopes and decomposes into soil nutrients within 1-2 years. Large pine bark nuggets resist decomposition longer (2-3 years) but can float away during torrential rains.'
      },
      {
        question: 'How much topsoil is needed for a 4x8 raised garden bed?',
        answer: 'A 4ft × 8ft raised bed (32 sq ft) built 12 inches (1 foot) deep requires exactly 32 cubic feet of soil mix (1.19 cubic yards or sixteen 2-cu-ft bags).'
      },
      {
        question: 'Should mulch touch tree trunks?',
        answer: 'No! Avoid "mulch volcanoes". Keep mulch 3 to 4 inches away from tree bark and root flares to prevent fungal rot, insect burrowing, and rodent girdling.'
      },
      {
        question: 'How much does a cubic yard of topsoil weigh compared to mulch?',
        answer: 'A cubic yard of dry wood mulch weighs 400 to 800 lbs. A cubic yard of damp topsoil weighs 2,000 to 2,700 lbs (over 1 ton), requiring a heavy-duty pickup truck or trailer.'
      }
    ],
    educationalDisclaimer: 'Mulch and soil volume calculations reflect loose-fill cubic dimensions. Organic materials compact by 5-10% after settling and watering.'
  },
  {
    id: 'fence-post-spacing',
    title: 'Fence Post & Picket Layout Calculator',
    slug: 'fence-post-spacing-calculator',
    categoryId: 'construction',
    shortDescription: 'Calculate fence post counts, post spacing on-center, and vertical picket board counts.',
    description: 'Plan perimeter fence post layouts, section bays, and wood or vinyl fence pickets.',
    keywords: ['fence calculator', 'fence posts', 'post spacing', 'fence pickets', 'privacy fence', 'fence rails'],
    iconName: 'Maximize2',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Sections = Ceil(Total Length / Max Spacing); Exact Spacing = Total Length / Sections; Total Posts = Sections + 1; Pickets = Ceil(Total Length Inches / (Picket Width + Gap))',
    formulaLatex: 'N_{\\text{sections}} = \\left\\lceil \\frac{L}{S_{\\text{max}}} \\right\\rceil, \\quad N_{\\text{posts}} = N_{\\text{sections}} + 1, \\quad N_{\\text{pickets}} = \\left\\lceil \\frac{L \\times 12}{W_{\\text{picket}} + G} \\right\\rceil',
    relatedCalculatorIds: ['deck-board', 'mulch-soil-volume', 'stair-riser-tread', 'concrete-slab-volume'],
    stepByStepInstructions: [
      'Enter Total Fence Run Length in feet.',
      'Select Maximum Post Spacing on-center (typically 6 ft or 8 ft standard for 2x4 rails).',
      'Enter Number of Gates or Corner Terminals.',
      'Select Picket Width in inches (e.g. 3.5", 5.5", 6.0") and spacing gap (0" for privacy, 0.5" or 2" for spaced pickets).',
      'Select Number of Horizontal Rails per Section (2 rails for 4ft fence, 3 rails for 6ft privacy fence).',
      'Review total 4x4 Posts, Horizontal 2x4 Rails, 1x6 Vertical Pickets, and 50lb Fast-Setting Concrete bags for post footings.'
    ],
    faqs: [
      {
        question: 'What is the standard spacing between fence posts?',
        answer: 'Standard fence post spacing is 6 feet or 8 feet on-center. 8 feet is standard for flat terrain and wood fences using 8-foot 2x4 rails. 6-foot spacing provides higher wind resistance.'
      },
      {
        question: 'How deep should fence posts be buried in the ground?',
        answer: 'Fence posts should be buried at least 1/3 of their total height (e.g. 2 feet deep for a 6-foot fence post) and at least 6 inches below the local frost line to prevent winter frost heaving.'
      },
      {
        question: 'How many bags of concrete are needed per fence post hole?',
        answer: 'Most 4x4 posts in 8" to 10" diameter holes require 1.5 to 2 bags of 50-lb fast-setting concrete mix, plus 3 to 4 inches of crushed drainage gravel at the bottom.'
      },
      {
        question: 'How many horizontal rails are needed for a 6-foot privacy fence?',
        answer: 'A 6-foot wooden privacy fence requires 3 horizontal 2x4 rails per section (top, middle, and bottom) to prevent vertical pickets from warping or bowing in sunlight.'
      },
      {
        question: 'What size screws or nails should be used for fence pickets?',
        answer: 'Use 1-5/8" to 2" exterior-rated galvanized, polymer-coated, or stainless steel ring-shank nails or screws to prevent black tannin bleed streaks on cedar and pressure-treated pine.'
      },
      {
        question: 'Should fence pickets touch the ground?',
        answer: 'No. Fence pickets should be elevated 2 inches above the ground level or grass to prevent moisture absorption, premature rot, weed-trimmer damage, and insect infestation.'
      },
      {
        question: 'How do you calculate post count for an enclosed perimeter versus an open run?',
        answer: 'An open straight run requires Posts = Sections + 1 (an end post at each side). A fully closed rectangular loop requires Posts = Sections (since the final corner connects back to the start post).'
      },
      {
        question: 'What is the difference between pressure-treated pine and cedar for fence posts?',
        answer: 'Pressure-treated pine posts are chemically infused to resist ground rot and termites (lasting 15-20 years). Cedar is naturally rot-resistant and aesthetic but can degrade faster when buried directly in damp soil without gravel drainage.'
      }
    ],
    educationalDisclaimer: 'Fence layouts provide material estimates. Always check municipal property setbacks, call 811 before digging, and confirm HOA fence height covenants.'
  },
  {
    id: 'deck-board',
    title: 'Deck Board & Lumber Material Estimator',
    slug: 'deck-board-calculator',
    categoryId: 'construction',
    shortDescription: 'Calculate total deck boards, linear footage, board gaps, and material lumber costs.',
    description: 'Estimate deck surface decking board counts and linear footage for 8ft, 10ft, 12ft, or 16ft lumber.',
    keywords: ['decking calculator', 'deck boards', 'deck lumber', 'linear feet decking', 'deck surface', 'composite decking'],
    iconName: 'Layout',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Effective Width = Board Width + Gap; Rows = Ceil(Deck Width Inches / Effective Width); Linear Feet = Rows × Deck Length Feet; Board Count = Ceil(Linear Feet / Board Length)',
    formulaLatex: '\\text{Rows} = \\left\\lceil \\frac{W_{\\text{deck}} \\times 12}{W_{\\text{board}} + G} \\right\\rceil, \\quad \\text{Linear Feet} = \\text{Rows} \\times L_{\\text{deck}}, \\quad N_{\\text{boards}} = \\left\\lceil \\frac{\\text{LF}}{L_{\\text{stock}}} \\times (1 + W_{\\%}) \\right\\rceil',
    relatedCalculatorIds: ['fence-post-spacing', 'stair-riser-tread', 'concrete-slab-volume', 'flooring-tile'],
    stepByStepInstructions: [
      'Enter Deck Overall Length and Width in feet.',
      'Select Decking Material (Composite Trex/TimberTech, Pressure Treated 5/4x6, Redwood, or Ipe Hardwood).',
      'Input Nominal Board Width (e.g. 5.5 inches for standard 5/4x6 decking) and Gap Spacing (typically 1/8" to 1/4").',
      'Select Stock Board Purchase Length (12 ft, 16 ft, or 20 ft).',
      'Set Waste Allowance Percentage (10% for straight parallel layouts, 15% for diagonal 45-degree layouts).',
      'Review total Surface Area (sq ft), Total Linear Feet, Number of Deck Boards to order, and hidden fastener clips or deck screws.'
    ],
    faqs: [
      {
        question: 'What is the actual width of a 5/4 x 6 deck board?',
        answer: 'A nominal 5/4 × 6 wood deck board has an actual milled width of 5-1/2 inches (5.5") and an actual thickness of 1 inch.'
      },
      {
        question: 'Why is a gap required between deck boards?',
        answer: 'Gaps (1/8" to 1/4") allow rainwater and melted snow to drain, allow airflow to dry joists below, and accommodate seasonal wood expansion and contraction.'
      },
      {
        question: 'How far apart should deck joists be spaced?',
        answer: 'Standard parallel wood decking requires joists spaced 16 inches on-center (O.C.). Composite decking or diagonal 45-degree wood decking requires tighter 12-inch on-center joist spacing to prevent sagging.'
      },
      {
        question: 'How many deck screws are needed per square foot?',
        answer: 'Estimate approximately 3.5 screws per square foot of decking (each 5.5" board requires 2 screws at every joist intersection spaced 16" apart).'
      },
      {
        question: 'Should deck boards be installed bark side up or bark side down?',
        answer: 'Install deck boards bark side up (growth rings curving downward like a rainbow) so the board crowns slightly when drying, shedding water rather than cupping and forming puddles.'
      },
      {
        question: 'What length deck boards should I buy to minimize butt joints?',
        answer: 'Purchasing 16-foot or 20-foot deck boards allows single continuous runs on decks under 16 to 20 feet wide, eliminating unsightly staggered butt joints where moisture collects.'
      },
      {
        question: 'How do composite decking boards compare to pressure treated pine?',
        answer: 'Composite decking (polyethylene + wood fiber) never splinters, warps, or requires annual staining, lasting 25-50 years, but costs 2x to 3x more upfront than pressure-treated pine.'
      },
      {
        question: 'What is picture framing on a deck?',
        answer: 'Picture framing is a perimeter border of deck boards installed around the outer edges of the deck, covering raw cut board ends and creating a clean architectural finish.'
      }
    ],
    educationalDisclaimer: 'Decking material estimates cover surface boards. Verify structural joist spans, beam dimensions, ledger attachments, and local building code permits.'
  },
  {
    id: 'stair-riser-tread',
    title: 'Stair Riser & Tread Building Code Calculator',
    slug: 'stair-riser-tread-calculator',
    categoryId: 'construction',
    shortDescription: 'Calculate exact stair riser heights, tread depths, and total horizontal run for IRC code compliance.',
    description: 'Plan staircases with equal riser heights, tread runs, and building code compliance checks.',
    keywords: ['stair calculator', 'stair riser height', 'tread depth', 'irc stair code', 'stair stringer', 'staircase angle'],
    iconName: 'Layers',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Risers = Round(Total Rise / Target Riser Height); Exact Riser = Total Rise / Risers; Treads = Risers - 1; Total Run = Treads × Tread Depth; Blondel Rule: 2 × Riser + Tread = 24" to 25"',
    formulaLatex: 'N_{\\text{risers}} = \\text{round}\\left(\\frac{H_{\\text{rise}}}{7.75}\\right), \\quad h_{\\text{riser}} = \\frac{H_{\\text{rise}}}{N_{\\text{risers}}}, \\quad N_{\\text{treads}} = N_{\\text{risers}} - 1, \\quad L_{\\text{run}} = N_{\\text{treads}} \\times d_{\\text{tread}}',
    relatedCalculatorIds: ['deck-board', 'roof-pitch-rafter', 'concrete-slab-volume', 'fence-post-spacing'],
    stepByStepInstructions: [
      'Measure Total Rise (the exact vertical distance from finished lower floor to finished upper floor/deck) in inches.',
      'Enter Target Riser Height (IRC maximum standard is 7.75 inches; 7.0 inches is ideal for comfortable walking).',
      'Enter Target Tread Depth (IRC minimum standard is 10.0 inches; 11.0 inches with 1" nosing is standard).',
      'Review calculated Number of Risers, Number of Treads, and exact Riser Height down to the nearest 1/16 inch.',
      'Check Blondel Ergonomic Comfort Rule score (2 × Rise + Tread should equal 24 to 25 inches).',
      'Review Total Horizontal Run in feet and inches, Stringer Cut Length, and Stair Incline Slope Angle (typically 30° to 37°).'
    ],
    faqs: [
      {
        question: 'What is the maximum stair riser height under the International Residential Code (IRC)?',
        answer: 'Under IRC Section R311.7.5.1, the maximum riser height is 7-3/4 inches (7.75"). The greatest riser height within any flight of stairs cannot exceed the smallest by more than 3/8 inch.'
      },
      {
        question: 'What is the minimum stair tread depth under building code?',
        answer: 'Under IRC code, the minimum tread depth is 10 inches measured horizontally from the nosing of one step to the nosing of the next (or 11 inches if no nosing overhang is used).'
      },
      {
        question: 'Why are all stair risers required to be identical heights?',
        answer: 'Human motor coordination relies on subconscious muscle memory when climbing stairs. A variation of just 1/4 inch (6mm) between consecutive steps is a leading cause of missteps and trip-and-fall injuries.'
      },
      {
        question: 'What is the Blondel rule for comfortable stairs?',
        answer: 'Formulated by French architect François Blondel in 1675, the rule states: 2 × Riser Height + Tread Depth = 24 to 25 inches (62 to 64 cm). This matches natural human walking pace.'
      },
      {
        question: 'How do you calculate stringer length?',
        answer: 'Using the Pythagorean theorem: Stringer Length = sqrt(Total Rise^2 + Total Run^2). For cutting layout, 2x12 lumber is standard for cutting notched stair stringers.'
      },
      {
        question: 'How many stringers are required across stair width?',
        answer: 'Standard residential stairs (36 inches wide) require at least 3 stringers (spaced max 16 inches O.C.) for wood treads, or 4 stringers (spaced 12 inches O.C.) for composite decking treads.'
      },
      {
        question: 'What is minimum stair headroom clearance?',
        answer: 'The IRC requires a minimum vertical headroom clearance of 6 feet 8 inches (80 inches) measured continuously from the sloped plane of the stair nosings to the ceiling above.'
      },
      {
        question: 'What is the standard stair handrail height?',
        answer: 'Handrail height must be between 34 and 38 inches measured vertically from the leading edge of the stair tread nosing.'
      }
    ],
    educationalDisclaimer: 'Stair calculations provide layout dimensions. Always verify IRC/IBC building code amendments with your local municipal building department inspection authority.'
  },
  {
    id: 'paint-coverage-detail',
    title: 'Paint Coverage & Gallon Estimator',
    slug: 'paint-coverage-detail-calculator',
    categoryId: 'construction',
    shortDescription: 'Calculate wall paint gallons required for rooms accounting for doors, windows, and multiple coats.',
    description: 'Determine exact paint gallons required for interior or exterior walls minus door/window cutouts.',
    keywords: ['paint calculator', 'gallons of paint', 'wall paint coverage', 'paint coats', 'room paint', 'primer gallons'],
    iconName: 'Edit3',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Gross Wall Area = 2 × (L + W) × H; Net Area = Gross Area - (Doors × 21) - (Windows × 15); Total Area = (Net Wall Area + Ceiling Area) × Coats; Gallons = Ceil(Total Area / Spreading Rate)',
    formulaLatex: 'A_{\\text{net}} = 2(L + W)H - (21 D + 15 W_{\\text{win}}), \\quad \\text{Gallons} = \\left\\lceil \\frac{A_{\\text{net}} \\times N_{\\text{coats}}}{\\text{Coverage per Gal (350)}} \\right\\rceil',
    relatedCalculatorIds: ['drywall-sheet', 'flooring-tile', 'deck-board', 'mulch-soil-volume'],
    stepByStepInstructions: [
      'Enter Room Length, Width, and Wall Ceiling Height in feet.',
      'Specify Number of Standard Doors (deducts 21 sq ft each) and Windows (deducts 15 sq ft each).',
      'Toggle whether to include Ceiling painting in calculations.',
      'Select Number of Coats (typically 2 coats for color changes or new drywall; 1 coat for same-color refresh).',
      'Select Paint Spreading Rate (standard is 350 to 400 sq ft per gallon on smooth primed walls).',
      'Review Net Wall Square Footage, Total Paint Gallons and Quarts needed, and separate Primer requirements.'
    ],
    faqs: [
      {
        question: 'How many square feet does one gallon of paint cover?',
        answer: 'One gallon of quality interior paint covers approximately 350 to 400 square feet on smooth, primed drywall. Textured walls or unprimed drywall absorb more paint, reducing coverage to 250-300 sq ft per gallon.'
      },
      {
        question: 'How many coats of paint are usually needed?',
        answer: 'Two coats are standard for uniform sheen, durability, and true color saturation. A single coat may suffice when refreshing the exact same color, while dramatic color changes (dark to light) may require 1 coat of primer plus 2 topcoats.'
      },
      {
        question: 'How much area does a standard door and window subtract?',
        answer: 'A standard interior door subtracts approximately 21 square feet (3ft × 7ft). A standard window subtracts approximately 15 square feet (3ft × 5ft).'
      },
      {
        question: 'Do I need primer before painting?',
        answer: 'Primer is essential for: 1) Bare unpainted drywall or patched joint compound; 2) Bare wood; 3) Painting light colors over dark walls; 4) Painting over glossy oil-based enamel with water-based latex.'
      },
      {
        question: 'What paint sheen should I choose for each room?',
        answer: 'Flat/Matte: Ceilings and low-traffic bedrooms (hides wall flaws). Eggshell/Satin: Living rooms, hallways, and dining rooms (wipable, gentle sheen). Semi-Gloss: Kitchens, bathrooms, trim, and doors (moisture resistant and scrubbable).'
      },
      {
        question: 'How long should I wait between paint coats?',
        answer: 'Water-based latex paint dries to the touch in 1 hour but requires 2 to 4 hours before applying the second coat. Oil-based paint requires 24 hours between coats.'
      },
      {
        question: 'How much extra paint should I keep for future touch-ups?',
        answer: 'Keep at least 1 quart (or 1/4 gallon) of leftover paint in an airtight, temperature-controlled container (avoid freezing garages) for future scuff and drywall patch touch-ups.'
      },
      {
        question: 'What is the difference between latex and oil-based paint?',
        answer: 'Latex (acrylic water-based) cleans up with water, emits low VOC odors, dries quickly, and resists yellowing. Oil-based (alkyd) provides superior leveling and rock-hard adhesion on exterior metal and interior wood trim.'
      }
    ],
    educationalDisclaimer: 'Paint estimates provide theoretical coverage based on 350-400 sq ft/gal spreading rates. Porous surfaces and textured masonry require additional paint volume.'
  },
  {
    id: 'gravel-paving',
    title: 'Gravel & Driveway Paving Calculator',
    slug: 'gravel-paving-calculator',
    categoryId: 'construction',
    shortDescription: 'Calculate crushed stone gravel weight in tons and cubic yards for driveways or walkways.',
    description: 'Estimate gravel tonnage and bulk cost based on driveway dimensions and layer depth.',
    keywords: ['gravel calculator', 'driveway gravel', 'crushed stone tons', 'gravel volume', 'paving gravel', 'pea gravel'],
    iconName: 'Truck',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Cubic Yards = (Length × Width × (Depth / 12)) / 27; Tons = Cubic Yards × Density Factor (typically 1.4 tons/yd³ for crushed stone)',
    formulaLatex: '\\text{Cubic Yards} = \\frac{L \\times W \\times (D / 12)}{27}, \\quad \\text{Tons} = \\text{Cubic Yards} \\times 1.40 \\times (1 + W_{\\%})',
    relatedCalculatorIds: ['mulch-soil-volume', 'concrete-slab-volume', 'flooring-tile', 'fence-post-spacing'],
    stepByStepInstructions: [
      'Enter Driveway or Walkway Length and Width in feet.',
      'Select Gravel Layer Depth in inches (e.g. 2" for top dressing, 4" for walkways, 6" to 8" for new driveway base).',
      'Select Stone Aggregate Type (Crushed #57 Stone 1.4 tons/yd³, Pea Gravel 1.35 tons/yd³, Crusher Run / Dense Grade 1.5 tons/yd³).',
      'Set Waste / Compaction Allowance (typically 10% to 15% for subgrade settling).',
      'Review Total Volume in Cubic Yards and Total Weight in Short Tons (2,000 lbs).',
      'Calculate estimated 15-ton Tri-Axle Dump Truck delivery loads.'
    ],
    faqs: [
      {
        question: 'How many tons of gravel are in a cubic yard?',
        answer: 'One cubic yard of crushed stone or gravel weighs approximately 1.4 tons (2,800 lbs). Dense-graded aggregate (crusher run with stone dust) weighs about 1.5 tons per cubic yard.'
      },
      {
        question: 'How deep should a gravel driveway be?',
        answer: 'A durable gravel driveway requires a total depth of 8 to 12 inches installed in 3 compacted layers: 4-6" of large base stone (#3 or #4), 4" of #57 crushed stone, and 2" of surface topping.'
      },
      {
        question: 'What type of gravel is best for a driveway surface?',
        answer: '#57 crushed angular stone (3/4-inch) or crushed limestone/granite with fines (crusher run) is best because angular edges interlock under tire weight. Smooth rounded pea gravel rolls under tires and should be avoided for driveways.'
      },
      {
        question: 'How much gravel does a standard dump truck hold?',
        answer: 'A standard single-axle dump truck carries 5 to 7 tons. A large tandem or tri-axle dump truck carries 12 to 16 tons (approx 9 to 12 cubic yards).'
      },
      {
        question: 'Should geotextile landscape fabric be placed under driveway gravel?',
        answer: 'Yes! Installing heavy-duty woven geotextile fabric between the subsoil and gravel base prevents stone from sinking into mud, stops weed growth, and doubles driveway lifespan.'
      },
      {
        question: 'How do you calculate tons from square footage and depth?',
        answer: 'Formula: (Square Feet × Depth in Inches / 12) / 27 × 1.4 = Tons of gravel.'
      },
      {
        question: 'Why does gravel compact after installation?',
        answer: 'Vibratory plate compaction or vehicle traffic packs aggregate particles tightly together, reducing loose volume by 10% to 15%. Always factor in this compaction allowance when ordering.'
      },
      {
        question: 'How often does a gravel driveway need top dressing?',
        answer: 'A gravel driveway typically needs a fresh 1 to 2 inch top dressing of #57 stone every 2 to 3 years to maintain grade crown and fill tire ruts.'
      }
    ],
    educationalDisclaimer: 'Gravel tonnage calculations are approximations based on average bulk aggregate densities. Quarry stone densities vary with moisture content and mineral composition.'
  },
  {
    id: 'sleep-cycle-tracker',
    title: 'Sleep Cycle & Bedtime Optimizer',
    slug: 'sleep-cycle-tracker-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate optimal bedtimes and wake times based on 90-minute REM sleep cycles.',
    description: 'Wake up feeling refreshed by aligning alarm clocks with natural 90-minute sleep cycles.',
    keywords: ['sleep cycle', 'bedtime calculator', 'wake up time', 'rem sleep', 'sleep duration', 'circadian rhythm'],
    iconName: 'Moon',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Cycle Length = 90 Minutes; Sleep Latency = 15 Minutes; Target Wake/Bed Time = Base Time ± (N × 90 mins + 15 mins)',
    formulaLatex: 'T_{\\text{wake}} = T_{\\text{bed}} + T_{\\text{latency}} + (N \\times 90 \\; \\text{min}), \\quad N \\in \\{4, 5, 6\\}',
    relatedCalculatorIds: ['sleep-cycle', 'screen-time-focus', 'time-date', 'reading-time-calculator'],
    stepByStepInstructions: [
      'Choose Mode: "I want to wake up at..." (finds optimal bedtimes) or "If I go to bed now..." (finds optimal wake-up alarms).',
      'Input Target Wake-Up Time or Bedtime.',
      'Adjust Sleep Latency (the time it takes you to fall asleep, standard default is 15 minutes).',
      'Review recommended sleep windows corresponding to 4 cycles (6.0 hrs), 5 cycles (7.5 hrs - recommended), and 6 cycles (9.0 hrs).',
      'Select a sleep target that aligns with your natural circadian rhythm and morning schedule.'
    ],
    faqs: [
      {
        question: 'How long is a natural human sleep cycle?',
        answer: 'An average adult sleep cycle lasts approximately 90 to 110 minutes, progressing through 4 distinct stages: Stage 1 (light sleep), Stage 2 (deeper sleep), Stage 3 (deep slow-wave delta sleep), and Stage 4 (REM - Rapid Eye Movement dream sleep).'
      },
      {
        question: 'Why does waking up in the middle of a sleep cycle cause grogginess (Sleep Inertia)?',
        answer: 'Waking during Stage 3 deep delta wave sleep causes severe sleep inertia—a groggy, disoriented brain fog caused by high adenosine levels and abrupt cortisol disruption. Waking at the end of a 90-minute cycle during light REM sleep feels effortless.'
      },
      {
        question: 'How many sleep cycles per night are ideal for healthy adults?',
        answer: '5 full sleep cycles (7.5 hours of actual sleep + 15 minutes falling asleep = 7 hours 45 minutes in bed) is optimal for most adults. 6 cycles (9 hours) is ideal for athletes and recovery.'
      },
      {
        question: 'What is Sleep Latency?',
        answer: 'Sleep latency is the amount of time it takes to transition from full wakefulness to light sleep. A normal, healthy sleep latency is 10 to 20 minutes. Falling asleep in under 5 minutes often indicates severe sleep deprivation.'
      },
      {
        question: 'Does going to bed earlier make up for waking up mid-cycle?',
        answer: 'Not necessarily. Sleeping 7 hours (waking mid-cycle during deep sleep) can make you feel more tired than sleeping 6 hours (waking cleanly at the conclusion of 4 full cycles).'
      },
      {
        question: 'How does blue light from screens disrupt sleep cycles?',
        answer: 'Short-wavelength blue light from smartphones and monitors suppresses nocturnal melatonin secretion by the pineal gland, delaying sleep onset latency and shortening restorative REM stages.'
      },
      {
        question: 'What is the 3-2-1 rule for optimal sleep hygiene?',
        answer: 'Stop eating heavy meals 3 hours before bed; stop drinking liquids/caffeine 2 hours before bed; eliminate screen time and digital devices 1 hour before bed.'
      },
      {
        question: 'Can you catch up on sleep debt on weekends?',
        answer: 'Sleeping in on weekends can partially relieve cognitive fatigue but shifts your circadian clock (social jetlag), making it harder to fall asleep on Sunday night and wake on Monday morning.'
      }
    ],
    educationalDisclaimer: 'Sleep cycle calculations are based on average 90-minute ultradian rhythms. Individual cycle lengths vary from 80 to 120 minutes. Consult a sleep specialist for chronic insomnia.'
  },
  {
    id: 'reading-time-calculator',
    title: 'Reading Duration & WPM Speed Calculator',
    slug: 'reading-time-calculator-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate reading duration in hours and minutes for books or documents based on word count.',
    description: 'Estimate reading duration based on custom Words Per Minute (WPM) speeds and page counts.',
    keywords: ['reading time', 'reading speed', 'wpm calculator', 'book reading time', 'word count time', 'speech duration'],
    iconName: 'BookOpen',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Reading Minutes = Word Count / Words Per Minute (WPM); Speech Minutes = Word Count / 130 WPM; Pages = Word Count / 250 Words per Page',
    formulaLatex: 'T_{\\text{read}} = \\frac{N_{\\text{words}}}{\\text{WPM}}, \\quad T_{\\text{speech}} = \\frac{N_{\\text{words}}}{130}',
    relatedCalculatorIds: ['reading-time-word-count', 'screen-time-focus', 'time-date', 'gpa'],
    stepByStepInstructions: [
      'Enter Total Word Count (or paste text to automatically count words) or Number of Book Pages.',
      'Select Reader Speed Profile (Slow / Comprehension: 150 WPM, Average Adult: 200-250 WPM, Fast Reader: 350 WPM, Speed Reader: 500+ WPM).',
      'Optionally toggle Public Speaking / Audio Narration Mode (standard 130 to 150 WPM).',
      'Review Total Estimated Reading Time in Hours and Minutes.',
      'Check daily reading completion schedules (e.g. reading 20 minutes/day to finish a 300-page book).'
    ],
    faqs: [
      {
        question: 'What is the average reading speed for adults?',
        answer: 'The average adult reads non-technical prose at approximately 200 to 250 Words Per Minute (WPM), or roughly 1 page every 1 to 1.5 minutes.'
      },
      {
        question: 'How many words are on a standard book page?',
        answer: 'A standard trade paperback or hardcover book page contains approximately 250 to 300 words (based on 12-point font, 1-inch margins, and standard line spacing).'
      },
      {
        question: 'How long does it take to read an average 300-page book?',
        answer: 'A 300-page book contains roughly 75,000 to 90,000 words. At an average reading speed of 250 WPM, it takes approximately 5 to 6 hours of continuous reading to complete.'
      },
      {
        question: 'What is the standard speed for public speaking and podcasting?',
        answer: 'Comfortable public speaking pace is 130 to 150 WPM. Speeches faster than 160 WPM hinder audience comprehension, while under 110 WPM can cause listener disengagement.'
      },
      {
        question: 'How does technical or academic reading affect speed?',
        answer: 'Complex technical, legal, or scientific texts require active cognitive processing and re-reading, dropping reading speeds to 100 to 150 WPM.'
      },
      {
        question: 'Can you increase reading speed without sacrificing comprehension?',
        answer: 'Yes. Techniques like eliminating sub-vocalization (inner voice speech), using a visual pacer (finger or pen guide), and expanding peripheral vision can increase speeds to 350-400 WPM with high retention.'
      },
      {
        question: 'How fast do audiobook narrators speak?',
        answer: 'Professional audiobook narrators (Audible standards) record at 150 to 160 WPM. Many listeners listen at 1.25x (190 WPM) or 1.5x (230 WPM) for efficient information absorption.'
      },
      {
        question: 'How many minutes per day should I read to finish 20 books a year?',
        answer: 'Reading just 20 minutes per day at 250 WPM covers 5,000 words daily (1.8 million words per year), which equals approximately 20 to 24 full books annually.'
      }
    ],
    educationalDisclaimer: 'Reading duration calculations provide estimates based on selected WPM metrics. Complex vocabulary, technical diagrams, and conceptual density alter real-world reading speeds.'
  },
  {
    id: 'screen-time-focus',
    title: 'Screen Time & Digital Wellness Calculator',
    slug: 'screen-time-focus-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate percentage of waking life spent on digital screens and lifetime screen years.',
    description: 'Understand annual screen time hours, full 24-hour days on devices, and lifetime impact.',
    keywords: ['screen time', 'digital wellness', 'phone usage', 'screen hours', 'waking life screens', 'digital detox'],
    iconName: 'Smartphone',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Waking Hours = 24 - Sleep Hours; Waking Screen % = (Daily Screen Hours / Waking Hours) × 100; Annual Screen Days = (Daily Hours × 365) / 24; Lifetime Screen Years = (Daily Hours / 24) × Remaining Life Years',
    formulaLatex: '\\%_{\\text{waking}} = \\frac{H_{\\text{screen}}}{24 - H_{\\text{sleep}}} \\times 100, \\quad \\text{Years}_{\\text{lifetime}} = \\frac{H_{\\text{screen}}}{24} \\times (\\text{Life Expectancy} - \\text{Age})',
    relatedCalculatorIds: ['sleep-cycle-tracker', 'meeting-cost', 'time-date', 'reading-time-calculator'],
    stepByStepInstructions: [
      'Enter your Daily Phone / Mobile Screen Time in hours and minutes.',
      'Enter your Daily Computer / Laptop / Tablet Screen Time.',
      'Enter your Daily TV / Streaming Screen Time.',
      'Input your Current Age, Target Life Expectancy (e.g. 80 years), and Average Nightly Sleep (e.g. 7.5 hours).',
      'Review your Percentage of Waking Life Spent on Screens, Total Annual Hours, and Equivalent 24-Hour Days.',
      'Explore the Time Reclamation Simulator (reducing 2 hours daily reclaims months of productive life).'
    ],
    faqs: [
      {
        question: 'What is the average daily screen time for adults in the US?',
        answer: 'According to DataReportal and Nielsen research, the average American adult spends 6 hours and 58 minutes per day looking at screens across smartphones, work computers, and televisions.'
      },
      {
        question: 'How many full days per year is 6 hours of daily screen time?',
        answer: '6 hours of daily screen time equals 2,190 hours per year, which translates to exactly 91.25 full 24-hour days (or over 3 solid months of continuous non-stop screen viewing per year).'
      },
      {
        question: 'How much of my waking life is 7 hours of daily screen time?',
        answer: 'Assuming 8 hours of sleep per night (16 waking hours), 7 hours of daily screen time consumes 43.8% of your entire conscious waking life.'
      },
      {
        question: 'What is the lifetime impact of 5 hours of daily screen time over 50 years?',
        answer: '5 hours per day over 50 years equals 91,250 hours, which equals 10.4 solid years of continuous 24/7 screen time.'
      },
      {
        question: 'What are effective strategies to reduce smartphone screen time?',
        answer: '1) Turn display to grayscale (removes dopamine color hooks); 2) Disable all non-human notifications; 3) Keep phone outside the bedroom overnight; 4) Implement app time limits and app deletion.'
      },
      {
        question: 'What is the 20-20-20 rule for digital eye strain?',
        answer: 'To prevent digital eye strain (asthenopia), every 20 minutes of screen use, look at an object at least 20 feet away for at least 20 seconds to relax ciliary eye muscles.'
      },
      {
        question: 'How does excessive screen time impact mental health and sleep?',
        answer: 'Prolonged passive social media scrolling increases cortisol and anxiety, while evening blue light suppresses melatonin release, delaying sleep latency and reducing restorative deep sleep.'
      },
      {
        question: 'What could you accomplish by cutting 2 hours of screen time daily?',
        answer: 'Reclaiming 2 hours daily yields 730 hours per year—enough time to read 120 books, learn a fluent second language, or build a profitable side business.'
      }
    ],
    educationalDisclaimer: 'Digital wellness metrics provide mathematical representations of time allocation. Use results to foster intentional technology habits.'
  },
  {
    id: 'meeting-cost',
    title: 'Meeting Cost & Man-Hour Burn Rate',
    slug: 'meeting-cost-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate the true financial salary cost of business meetings based on attendees and duration.',
    description: 'Determine single meeting and annual recurring cost based on attendee hourly rates.',
    keywords: ['meeting cost', 'meeting burn rate', 'salary burn', 'meeting expense', 'man hours', 'corporate meeting cost'],
    iconName: 'DollarSign',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Meeting Cost = Attendees × (Duration Mins / 60) × Average Loaded Hourly Rate; Annual Cost = Single Cost × Frequency Multiplier',
    formulaLatex: 'C_{\\text{meeting}} = N_{\\text{attendees}} \\times \\left(\\frac{T_{\\text{mins}}}{60}\\right) \\times R_{\\text{loaded}}, \\quad C_{\\text{annual}} = C_{\\text{meeting}} \\times N_{\\text{annual}}',
    relatedCalculatorIds: ['hourly-to-salary', 'overtime-pay', 'business-break-even', 'screen-time-focus'],
    stepByStepInstructions: [
      'Enter the Number of Attendees in the meeting.',
      'Enter Meeting Duration in minutes (e.g. 30, 45, 60 mins).',
      'Input Average Annual Salary of attendees (or Average Hourly Wage).',
      'Toggle Employer Loaded Cost Multiplier (typically 1.25x to 1.35x for benefits, payroll taxes, 401k, and office overhead).',
      'Select Meeting Recurring Frequency (Single, Weekly, Bi-Weekly, Daily Standup).',
      'Review Total Cost per Meeting, Annual Cumulative Burn, Total Man-Hours consumed, and cost per minute.'
    ],
    faqs: [
      {
        question: 'What is the "loaded salary cost" of an employee?',
        answer: 'Loaded cost (typically 1.25x to 1.40x base salary) accounts for employee benefits, health insurance, payroll taxes (FICA/FUTA), 401(k) matching, software licenses, and workplace overhead.'
      },
      {
        question: 'How much does a weekly 1-hour team meeting of 8 engineers cost annually?',
        answer: 'With 8 engineers earning an average loaded salary of $130,000 ($62.50/hr × 1.3 loaded = $81.25/hr), one 1-hour meeting costs $650. Held 50 weeks per year, this single recurring meeting costs $32,500 and consumes 400 engineering man-hours.'
      },
      {
        question: 'What is the "Two-Pizza Rule" for meetings?',
        answer: 'Popularized by Amazon founder Jeff Bezos, the rule states that no internal meeting should have more attendees than can be fed by two pizzas (roughly 5 to 8 people) to maintain high efficiency and decisive action.'
      },
      {
        question: 'What percentage of corporate meetings are considered unproductive?',
        answer: 'Harvard Business Review and Korn Ferry surveys reveal that 67% to 71% of meetings are considered unproductive by employees and executives, costing US businesses over $37 billion annually in lost productivity.'
      },
      {
        question: 'How can companies reduce meeting costs?',
        answer: '1) Default 30-minute meetings to 20 minutes and 60-minute meetings to 45 minutes; 2) Mandate a written agenda sent 24 hours in advance; 3) Replace status updates with asynchronous Loom videos or Slack threads; 4) Make attendance optional for non-decision makers.'
      },
      {
        question: 'What is the opportunity cost of excessive meetings?',
        answer: 'Beyond direct salary burn, fragmented meeting schedules disrupt "deep work" focus states. Research by Gloria Mark at UC Irvine shows it takes an average of 23 minutes and 15 seconds to regain deep focus after a meeting interruption.'
      },
      {
        question: 'What is a "No-Meeting Day"?',
        answer: 'A company-wide policy (e.g. "No-Meeting Wednesdays") where all recurring internal meetings are banned, allowing engineers, writers, and designers uninterrupted blocks for deep project execution.'
      },
      {
        question: 'Should 1-on-1 meetings be eliminated to cut costs?',
        answer: 'No. Regular 1-on-1 mentoring and feedback meetings between managers and direct reports have very high ROI in preventing employee turnover, clarifying priorities, and unblocking blockers.'
      }
    ],
    educationalDisclaimer: 'Meeting cost calculations provide direct payroll approximations. Actual business productivity impacts vary based on decision velocity and collaborative outcomes.'
  },
  {
    id: 'data-storage-converter',
    title: 'Data Storage Unit Converter (KB, MB, GB, TB)',
    slug: 'data-storage-converter-calculator',
    categoryId: 'everyday',
    shortDescription: 'Convert digital data quantities between Bytes, KB, MB, GB, TB, and total Bits.',
    description: 'Convert computer memory and drive storage between Bytes, Kilobytes, Megabytes, Gigabytes, and Terabytes.',
    keywords: ['data converter', 'gb to tb', 'mb to gb', 'bytes converter', 'data storage', 'gib vs gb', 'terabytes to gigabytes'],
    iconName: 'HardDrive',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Decimal (SI Base 10): 1 KB = 1,000 Bytes; 1 MB = 1,000 KB; 1 GB = 1,000 MB; 1 TB = 1,000 GB. Binary (IEC Base 2): 1 KiB = 1,024 Bytes; 1 MiB = 1,024 KiB; 1 GiB = 1,024 MiB; 1 TiB = 1,024 GiB.',
    formulaLatex: 'V_{\\text{bytes}}^{\\text{SI}} = V \\times 10^{3k}, \\quad V_{\\text{bytes}}^{\\text{IEC}} = V \\times 2^{10k}, \\quad k \\in \\{1, 2, 3, 4, 5\\}',
    relatedCalculatorIds: ['binary-hex-converter', 'unit-converter', 'subnet-cidr'],
    stepByStepInstructions: [
      'Enter the Data Value to convert.',
      'Select Source Unit (Bits, Bytes, KB, MB, GB, TB, PB, KiB, MiB, GiB, TiB).',
      'Select Standard Standard: Decimal (SI 1000x - used by drive manufacturers) or Binary (IEC 1024x - used by Windows OS / RAM).',
      'Review converted matrix across all digital storage denominations instantly.',
      'Check Download Time Estimator for the converted file size across various internet speeds.'
    ],
    faqs: [
      {
        question: 'Why does my 1TB hard drive only show 931 GB in Windows?',
        answer: 'Storage drive manufacturers use the Decimal SI standard (1 TB = 1,000,000,000,000 bytes). Microsoft Windows measures storage in Binary GiB (1 GiB = 1,073,741,824 bytes). Dividing 1,000,000,000,000 by 1,073,741,824 yields exactly 931.32 GiB.'
      },
      {
        question: 'What is the difference between a Bit (b) and a Byte (B)?',
        answer: 'A Bit (lowercase b) is a single binary digit (0 or 1). A Byte (uppercase B) consists of exactly 8 bits. Internet connection speeds are measured in Megabits per second (Mbps), while file sizes are measured in Megabytes (MB).'
      },
      {
        question: 'How many Megabytes (MB) are in a Gigabyte (GB)?',
        answer: 'In the Decimal SI standard (macOS, Linux storage, drive labels), 1 GB = 1,000 MB. In the Binary IEC standard (RAM, Windows), 1 GiB = 1,024 MiB.'
      },
      {
        question: 'How long does it take to download a 50 GB game on a 100 Mbps internet connection?',
        answer: '50 GB = 400 Gigabits (50 × 8). At 100 Mbps, it takes 4,000 seconds (approx 1 hour and 6 minutes) under ideal conditions with no network overhead.'
      },
      {
        question: 'What is a Petabyte (PB) and Exabyte (EB)?',
        answer: '1 Petabyte (PB) equals 1,000 Terabytes (approx 500 billion pages of standard printed text). 1 Exabyte (EB) equals 1,000 Petabytes (1 million Terabytes).'
      },
      {
        question: 'How many photos or songs fit on a 128 GB smartphone?',
        answer: '128 GB holds approximately 32,000 high-resolution 12MP photos (at 4MB each) or 25,000 high-quality MP3 songs (at 5MB each) or 20 hours of 4K video.'
      },
      {
        question: 'What are KiB, MiB, and GiB kibibytes?',
        answer: 'To resolve confusion between base-10 and base-2 prefixes, the International Electrotechnical Commission (IEC) standardized Kibibyte (KiB = 1024 B), Mebibyte (MiB = 1024 KiB), and Gibibyte (GiB = 1024 MiB).'
      },
      {
        question: 'Why do operating systems reserve storage space?',
        answer: 'Operating systems reserve 5% to 10% of drive space for system files, virtual memory swap files, and SSD wear-leveling / TRIM maintenance.'
      }
    ],
    educationalDisclaimer: 'Conversions reflect standard SI (10^n) and IEC (2^n) computing definitions. Usable filesystem storage varies with partition tables and cluster block allocation sizes.'
  },
  {
    id: 'cooking-unit-converter',
    title: 'Recipe & Kitchen Cooking Unit Converter',
    slug: 'cooking-unit-converter-calculator',
    categoryId: 'everyday',
    shortDescription: 'Convert recipe volumes between cups, tablespoons, teaspoons, fluid ounces, and milliliters.',
    description: 'Convert culinary liquid and dry volume measurements accurately for baking and cooking.',
    keywords: ['cooking converter', 'recipe converter', 'cups to tbsp', 'tbsp to tsp', 'kitchen measurements', 'baking converter', 'grams to cups'],
    iconName: 'Coffee',
    isPopular: true,
    isNew: true,
    formulaDescription: '1 US Cup = 16 Tablespoons = 48 Teaspoons = 8 Fluid Ounces = 236.588 mL; 1 Tablespoon = 3 Teaspoons = 0.5 fl oz = 14.787 mL',
    formulaLatex: '1 \\; \\text{Cup} = 16 \\; \\text{tbsp} = 48 \\; \\text{tsp} = 8 \\; \\text{fl oz} = 236.59 \\; \\text{mL}',
    relatedCalculatorIds: ['unit-converter', 'tip-split-tax', 'water-hydration'],
    stepByStepInstructions: [
      'Enter the Measurement Quantity to convert.',
      'Select Source Culinary Unit (Teaspoon, Tablespoon, US Cup, UK Cup, Fluid Ounce, Milliliter, Liter, Pint, Quart, Gallon).',
      'Select Target Culinary Unit or view the complete kitchen quick-reference matrix.',
      'Optionally scale recipe servings (e.g. double a recipe 2x or cut in half 0.5x).',
      'Review equivalent conversions for common baking ingredients (All-Purpose Flour, White Sugar, Butter).'
    ],
    faqs: [
      {
        question: 'How many tablespoons are in one US cup?',
        answer: 'There are exactly 16 tablespoons in 1 US cup (or 48 teaspoons).'
      },
      {
        question: 'How many teaspoons are in one tablespoon?',
        answer: 'There are exactly 3 teaspoons in 1 tablespoon (1/2 fluid ounce or ~15 mL).'
      },
      {
        question: 'What is the difference between a US Cup and a Metric / UK Cup?',
        answer: '1 US Customary Cup is 236.59 mL (8 fl oz). 1 US Legal Cup (food labeling) is exactly 240 mL. 1 Metric Cup (UK, Australia, NZ) is 250 mL (~8.45 fl oz).'
      },
      {
        question: 'How much does 1 stick of butter equal in cups and tablespoons?',
        answer: 'In the US, 1 stick of butter = 1/2 cup = 8 tablespoons = 4 ounces = 113.4 grams.'
      },
      {
        question: 'Why is measuring baking ingredients by weight (grams) more accurate than cups?',
        answer: 'Flour can settle and pack tightly into measuring cups. Depending on whether flour is scooped directly or fluffed and spooned, 1 cup of flour can weigh anywhere from 120g to 160g (+33% error), ruining delicate baking recipes.'
      },
      {
        question: 'How many fluid ounces are in a pint, quart, and gallon?',
        answer: '1 Pint = 16 fl oz (2 cups); 1 Quart = 32 fl oz (4 cups); 1 Gallon = 128 fl oz (16 cups or 4 quarts).'
      },
      {
        question: 'How do you convert liquid fluid ounces to dry weight ounces?',
        answer: 'Fluid ounces (fl oz) measure volume; dry ounces (oz) measure weight. 8 fluid ounces of water weighs exactly 8 dry ounces, but 8 fluid ounces of flour weighs only ~4.4 dry ounces.'
      },
      {
        question: 'How many grams is 1 cup of all-purpose flour versus 1 cup of granulated sugar?',
        answer: '1 cup of all-purpose flour weighs approximately 120 to 125 grams. 1 cup of granulated white sugar is denser and weighs approximately 200 grams.'
      }
    ],
    educationalDisclaimer: 'Kitchen volume conversions adhere to NIST and USDA culinary standards. For precision baking, weighing ingredients on a digital gram scale is recommended.'
  },
  {
    id: 'pet-age-calculator',
    title: 'Dog & Cat Human Age Converter',
    slug: 'pet-age-calculator-calculator',
    categoryId: 'everyday',
    shortDescription: 'Convert dog and cat years into human equivalent age using veterinary AVMA weight benchmarks.',
    description: 'Calculate your pet human equivalent age accounting for breed size class and feline aging.',
    keywords: ['dog age calculator', 'cat age calculator', 'pet years to human years', 'canine age', 'feline age', 'dog life expectancy'],
    iconName: 'Heart',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Canine: Year 1 = 15 human yrs; Year 2 = +9 yrs (24 total); Year 3+ = +4 to +7 yrs based on size (Small <20lbs: +4/yr, Medium 20-50lbs: +5/yr, Large 50-90lbs: +6/yr, Giant 90+lbs: +7-8/yr). Feline: Year 1 = 15 yrs; Year 2 = +9 yrs; Year 3+ = +4 yrs/yr.',
    formulaLatex: '\\text{Age}_{\\text{human}} = \\begin{cases} 15 & \\text{if } t = 1 \\\\ 24 & \\text{if } t = 2 \\\\ 24 + (t - 2) \\times k_{\\text{size}} & \\text{if } t > 2 \\end{cases}',
    relatedCalculatorIds: ['time-date', 'water-hydration', 'bmi'],
    stepByStepInstructions: [
      'Select Pet Type: Dog (Canine) or Cat (Feline).',
      'If Dog, select Breed Size Class (Small <20 lbs, Medium 20-50 lbs, Large 50-90 lbs, Giant 90+ lbs).',
      'Enter Pet Calendar Age in Years and Months.',
      'Review calculated Equivalent Human Age, Life Stage classification (Puppy/Kitten, Junior, Adult, Senior, Geriatric).',
      'Check recommended veterinary care milestones and wellness screening schedules.'
    ],
    faqs: [
      {
        question: 'Why is the "1 dog year = 7 human years" rule inaccurate?',
        answer: 'The 7-year rule is an outdated myth. Dogs and cats mature rapidly in their first two years (reaching roughly age 24 in human terms by year two), then age more gradually. Furthermore, large and giant dog breeds age significantly faster than small breeds in later years.'
      },
      {
        question: 'How do canine breed sizes affect aging and lifespan?',
        answer: 'Small dogs (like Chihuahuas) age around 4 human years per calendar year after year 2, living 14-17 years. Giant dogs (like Great Danes) age 7-8 human years per calendar year, living 7-10 years due to accelerated cellular growth.'
      },
      {
        question: 'How does cat aging compare to dog aging?',
        answer: 'Cats age similarly to small dogs: Year 1 = 15 human years; Year 2 = 24 human years; each subsequent year adds approximately 4 human years. Indoor cats frequently reach 15-20 calendar years (76-96 human years).'
      },
      {
        question: 'When is a dog or cat considered a "senior" pet?',
        answer: 'Small dogs and cats enter senior status around age 10-11. Medium dogs around age 8-9. Large and giant dogs reach senior status as early as age 5-6.'
      },
      {
        question: 'What health screenings should senior pets receive?',
        answer: 'Veterinarians recommend bi-annual (every 6 months) wellness exams for senior pets, including comprehensive blood chemistry panels, urinalysis, blood pressure checks, and joint arthritis evaluations.'
      },
      {
        question: 'What factors help pets live longer human-equivalent lives?',
        answer: 'Key factors include: maintaining a lean body weight (prevents osteoarthritis and diabetes), daily physical activity, routine dental cleanings (prevents kidney/heart bacteremia), and high-quality nutrition.'
      },
      {
        question: 'How old is an 8-year-old medium dog in human years?',
        answer: 'An 8-year-old medium dog is approximately 54 human years old (15 for year 1 + 9 for year 2 + 6 years × 5 = 54).'
      },
      {
        question: 'What is the oldest recorded dog and cat age in history?',
        answer: 'The oldest verified cat, Creme Puff, lived to 38 years and 3 days (approx 168 human years). The oldest verified dog lived to over 30 years.'
      }
    ],
    educationalDisclaimer: 'Pet age conversions reflect American Veterinary Medical Association (AVMA) and AAHA life-stage guidelines. Individual longevity depends on genetics, diet, and veterinary care.'
  },
  {
    id: 'electricity-bill',
    title: 'Appliance Electricity Cost Calculator',
    slug: 'electricity-bill-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate monthly and annual electric bill costs for home appliances based on wattage and kWh rates.',
    description: 'Find operating costs for air conditioners, space heaters, computers, or refrigerators.',
    keywords: ['electricity cost', 'appliance energy', 'kwh calculator', 'electric bill', 'power consumption', 'watts to kwh', 'energy cost'],
    iconName: 'Zap',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Daily kWh = (Power Watts × Daily Hours) / 1000; Monthly Cost = Daily kWh × 30.4 × Utility Rate ($/kWh); Annual Cost = Daily kWh × 365 × Utility Rate',
    formulaLatex: '\\text{kWh}_{\\text{daily}} = \\frac{P_{\\text{watts}} \\times H_{\\text{daily}}}{1000}, \\quad \\text{Cost}_{\\text{monthly}} = \\text{kWh}_{\\text{daily}} \\times 30.417 \\times R_{\\text{kWh}}',
    relatedCalculatorIds: ['meeting-cost', 'fuel-trip', 'hourly-to-salary', 'data-storage-converter'],
    stepByStepInstructions: [
      'Select a common home appliance preset (Space Heater, Central AC, Refrigerator, Gaming PC, EV Charger, LED Bulb) or enter custom wattage.',
      'Enter Appliance Power in Watts (or Volts × Amps).',
      'Input Daily Usage Hours.',
      'Enter your local Electric Utility Rate in $/kWh (US national average is approx $0.16/kWh).',
      'Review Daily, Monthly, and Annual electricity operating costs.',
      'Compare energy-saving upgrades to see annual dollar savings.'
    ],
    faqs: [
      {
        question: 'What is a kilowatt-hour (kWh)?',
        answer: 'A kilowatt-hour (kWh) is a unit of energy equal to 1,000 watts of continuous electricity consumption for one hour. For example, running a 1,000-watt space heater for 1 hour consumes exactly 1 kWh.'
      },
      {
        question: 'What is the average cost of electricity per kWh in the United States?',
        answer: 'According to the US Energy Information Administration (EIA), the national average residential electricity rate is approximately $0.16 to $0.17 per kWh (ranging from ~$0.11/kWh in states like Washington and Idaho to ~$0.30+/kWh in California and Hawaii).'
      },
      {
        question: 'How much does it cost to run a 1,500-watt space heater?',
        answer: 'A 1,500W heater uses 1.5 kWh per hour. Running it 8 hours a day at $0.16/kWh costs $1.92 per day, or approximately $58.40 per month on your electric bill.'
      },
      {
        question: 'How much electricity does a modern refrigerator consume?',
        answer: 'An Energy Star certified refrigerator consumes 350 to 500 kWh per year, costing roughly $55 to $80 annually ($4.50 to $6.70 per month) because the compressor cycles on and off rather than running continuously.'
      },
      {
        question: 'How do you calculate appliance wattage if only Volts and Amps are listed?',
        answer: 'Multiply Volts by Amps to find Watts: Watts = Volts × Amps. For example, a 120V appliance drawing 10 Amps uses 1,200 Watts.'
      },
      {
        question: 'What are "phantom loads" or vampire power?',
        answer: 'Phantom loads are electricity consumed by electronic devices while turned off or in standby mode (TVs, cable boxes, chargers, microwave clocks). Vampire power accounts for 5% to 10% of average residential electric bills.'
      },
      {
        question: 'How much does it cost to charge an Electric Vehicle (EV) at home?',
        answer: 'Charging an average EV with a 60 kWh battery from empty costs about $9.60 at $0.16/kWh, providing roughly 200 to 250 miles of driving range (~$0.04 per mile vs ~$0.14/mile for gasoline).'
      },
      {
        question: 'How much money do LED light bulbs save over incandescent bulbs?',
        answer: 'An LED bulb uses 9 Watts to produce the same brightness as a 60-Watt incandescent bulb. Running 10 LED bulbs for 4 hours daily saves approximately $30 to $35 per year on electric bills.'
      }
    ],
    educationalDisclaimer: 'Electricity cost calculations reflect constant wattage draw. Appliances with variable compressors (refrigerators, heat pumps) cycle intermittently, altering true power consumption.'
  },
  {
    id: 'tip-split-tax',
    title: 'Restaurant Tip, Sales Tax & Bill Splitter',
    slug: 'tip-split-tax-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate meal gratuity %, sales tax, and equal bill splits per person.',
    description: 'Split dining bills evenly among friends with pre-tax tip calculation and tax rates.',
    keywords: ['tip calculator', 'split bill', 'restaurant tip', 'bill splitter', 'gratuity calculator', 'sales tax tip'],
    iconName: 'CreditCard',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Tip Amount = Subtotal × Tip %; Tax Amount = Subtotal × Tax %; Total Bill = Subtotal + Tip + Tax; Per Person = Total Bill / Number of People',
    formulaLatex: 'T_{\\text{tip}} = B_{\\text{sub}} \\times \\%_{\\text{tip}}, \\quad B_{\\text{total}} = B_{\\text{sub}} + T_{\\text{tip}} + T_{\\text{tax}}, \\quad P_{\\text{person}} = \\frac{B_{\\text{total}}}{N}',
    relatedCalculatorIds: ['tip-split-bill', 'sales-tax-tip', 'discount-savings', 'cooking-unit-converter'],
    stepByStepInstructions: [
      'Enter Food & Drink Bill Subtotal before tax.',
      'Select Tip Percentage (15% standard, 18% good, 20% excellent, 25% superior, or custom %).',
      'Select whether Tip is calculated on Pre-Tax Subtotal (standard etiquette) or Post-Tax Total.',
      'Enter Local Sales Tax % (or dollar tax amount from receipt).',
      'Enter Number of People splitting the check.',
      'Review Total Tip $, Total Bill $, and Exact Share Per Person with clean dollar round-up options.'
    ],
    faqs: [
      {
        question: 'Should restaurant tip be calculated before or after sales tax?',
        answer: 'Traditional dining etiquette dictates calculating tips on the pre-tax food and beverage subtotal. Tipping post-tax means tipping on government taxes.'
      },
      {
        question: 'What is the standard tipping percentage in the United States?',
        answer: 'Standard US sit-down restaurant tipping benchmarks: 15% for adequate service, 18% for good service, 20% for excellent service, and 22%-25% for exceptional fine dining service.'
      },
      {
        question: 'What is an "Auto-Gratuity" on group dining bills?',
        answer: 'Many restaurants automatically add an 18% to 20% automatic gratuity (service charge) for parties of 6 or more guests. Always check the receipt before adding an additional tip.'
      },
      {
        question: 'How much should you tip for food delivery or takeout?',
        answer: 'Food delivery drivers: 15% to 20% (minimum $3 to $5 for short trips, more during bad weather). Takeout / counter pickup: 0% to 10% (tipping is optional for simple counter pickup).'
      },
      {
        question: 'How do you easily calculate a 20% tip in your head?',
        answer: 'Take the pre-tax subtotal, move the decimal point one place to the left (to find 10%), then double that number. Example: On a $65.00 bill, 10% is $6.50; doubling it gives exactly $13.00 (20%).'
      },
      {
        question: 'How do you calculate an 18% tip in your head?',
        answer: 'Find 20% (move decimal and double), then subtract 2% (one-tenth of 20%). On a $50 bill, 20% is $10.00; minus $1.00 (2%) equals $9.00 (18%).'
      },
      {
        question: 'What is the difference between a tip and a mandatory service charge?',
        answer: 'Tips are voluntary payments given directly to service staff (protected under the FLSA). Mandatory service charges belong to the restaurant business entity and may or may not be distributed to servers.'
      },
      {
        question: 'Is tipping customary outside the United States and Canada?',
        answer: 'In most European countries, service is included (service compris) and leaving 5% to 10% cash is a polite extra. In Japan and South Korea, tipping is not customary and can be considered impolite.'
      }
    ],
    educationalDisclaimer: 'Tip calculations provide mathematical splits based on user parameters. Gratuity customs vary by geographic region and service type.'
  },
  {
    id: 'water-hydration',
    title: 'Daily Water Intake & Hydration Calculator',
    slug: 'water-hydration-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate daily fluid hydration targets in liters, ounces, and glasses based on body weight.',
    description: 'Determine recommended daily water intake based on body weight, workout minutes, and weather climate.',
    keywords: ['water intake', 'daily hydration', 'how much water to drink', 'water glasses target', 'fluid intake', 'hydration calculator'],
    iconName: 'Droplet',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Base Intake (oz) = Body Weight (lbs) × 0.5; Exercise Addition = (Workout Minutes / 30) × 12 oz; Metric: Base (mL) = Weight (kg) × 35 mL + (Mins / 30) × 350 mL',
    formulaLatex: 'V_{\\text{water}} = W_{\\text{lbs}} \\times 0.5 + \\left(\\frac{T_{\\text{exercise}}}{30}\\right) \\times 12 \\; \\text{oz}, \\quad V_{\\text{metric}} = W_{\\text{kg}} \\times 35 + \\left(\\frac{T_{\\text{exercise}}}{30}\\right) \\times 350 \\; \\text{mL}',
    relatedCalculatorIds: ['water-intake', 'calorie-tdee', 'pet-age-calculator', 'macro-keto-carb-manager'],
    stepByStepInstructions: [
      'Enter your Body Weight in pounds (lbs) or kilograms (kg).',
      'Enter your Daily Exercise / Workout Duration in minutes.',
      'Select Climate / Weather Condition (Normal / Temperate, Hot / Humid, or Dry High-Altitude).',
      'Optionally toggle Pregnancy or Lactation / Breastfeeding additions (+16 to +24 oz daily).',
      'Review recommended Daily Fluid Intake in Ounces, Liters, and standard 8-oz Glasses.',
      'Check hourly drinking schedule to distribute hydration evenly throughout the day.'
    ],
    faqs: [
      {
        question: 'How much water should I drink per day based on my weight?',
        answer: 'A general baseline is to drink 0.5 to 1.0 ounces of water per pound of body weight daily (30 to 35 mL per kilogram). For example, a 160-lb person should drink 80 to 110 ounces (2.4 to 3.2 liters) per day.'
      },
      {
        question: 'Does the "8 glasses of 8 ounces a day" (64 oz) rule apply to everyone?',
        answer: 'The "8x8 rule" (64 oz / 1.9L) is an easy baseline guideline, but individual hydration requirements vary substantially based on body size, physical activity sweat rates, and climate heat.'
      },
      {
        question: 'How much extra water should I drink during exercise?',
        answer: 'Drink an additional 12 to 16 ounces (350-500 mL) of water for every 30 minutes of moderate-to-vigorous exercise to replace fluids lost through sweating and respiration.'
      },
      {
        question: 'Do coffee, tea, and fruits count toward daily water intake?',
        answer: 'Yes! Food provides approximately 20% of daily water intake (especially fruits like watermelon and vegetables like cucumbers). Moderate coffee and tea also contribute to hydration, as their mild diuretic effect does not offset the total liquid volume.'
      },
      {
        question: 'How can you tell if you are properly hydrated?',
        answer: 'The simplest indicator is urine color: pale straw or light lemonade color indicates optimal hydration. Dark amber indicates dehydration, while completely clear urine may signal overhydration.'
      },
      {
        question: 'What is Hyponatremia (Water Toxicity)?',
        answer: 'Hyponatremia occurs when drinking excessive water in a short time dilutes blood sodium levels to dangerously low levels. The kidneys can excrete approximately 0.8 to 1.0 liter (27-33 oz) of water per hour; avoid exceeding this rate without electrolytes.'
      },
      {
        question: 'Why does hydration need increase in hot or high-altitude environments?',
        answer: 'In hot climates, the body sweats to cool via evaporation. At high altitudes, faster breathing in dry air increases respiratory moisture loss, requiring an additional 16 to 32 oz of fluid daily.'
      },
      {
        question: 'How does water intake affect weight loss and metabolism?',
        answer: 'Drinking 500 mL of water temporarily boosts metabolic rate by 24-30% for 60 minutes (water-induced thermogenesis) and drinking water before meals reduces caloric intake.'
      }
    ],
    educationalDisclaimer: 'Hydration recommendations reflect National Academies of Sciences guidelines. Individuals with congestive heart failure or renal disease should follow physician fluid limits.'
  },
  {
    id: 'mortgage-refinance-savings',
    title: 'Mortgage Refinance Savings & Break-Even',
    slug: 'mortgage-refinance-savings-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate monthly mortgage payment reduction and closing cost break-even timeline.',
    description: 'Determine if refinancing your home mortgage reduces interest and calculate exact break-even months.',
    keywords: ['mortgage refinance', 'refi savings', 'break even refinance', 'lower mortgage rate', 'closing costs refi', 'refinance calculator'],
    iconName: 'Home',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Monthly Savings = Current Monthly P&I - New Monthly P&I; Break-Even Months = Total Closing Costs / Monthly Payment Savings; Lifetime Interest Savings = Total Remaining Interest Old - Total Interest New - Closing Costs',
    formulaLatex: '\\Delta M = M_{\\text{old}} - M_{\\text{new}}, \\quad T_{\\text{break-even}} = \\frac{\\text{Closing Costs}}{\\Delta M}, \\quad S_{\\text{net}} = I_{\\text{rem,old}} - I_{\\text{new}} - C_{\\text{closing}}',
    relatedCalculatorIds: ['mortgage', 'amortization-schedule', 'student-loan-refinance', 'biweekly-mortgage-payoff'],
    stepByStepInstructions: [
      'Enter Current Mortgage Balance, Current Interest Rate, and Current Monthly Principal & Interest Payment.',
      'Enter New Refinanced Mortgage Loan Term (e.g. 30, 20, or 15 years) and Proposed New Interest Rate.',
      'Enter Estimated Refinance Closing Costs (typically 2% to 4% of loan amount, or approx $3,000 to $6,000).',
      'Select whether Closing Costs are paid in cash or rolled into the new loan balance.',
      'Input Planned Stay Duration in the home (years).',
      'Review Monthly Payment Savings, Exact Break-Even Horizon in Months, and Net Lifetime Interest Saved.'
    ],
    faqs: [
      {
        question: 'How do you calculate the mortgage refinance break-even point?',
        answer: 'Divide Total Closing Costs by Monthly Payment Savings. For example, if refinancing costs $4,000 in closing fees and saves $200 per month, your break-even point is exactly 20 months ($4,000 / $200 = 20 months).'
      },
      {
        question: 'How much should interest rates drop to make refinancing worthwhile?',
        answer: 'Traditionally, a rate reduction of 0.75% to 1.00% is considered worthwhile. However, on large loan balances ($400,000+), even a 0.50% drop can save thousands and break even within 2 to 3 years.'
      },
      {
        question: 'What closing costs are involved in a mortgage refinance?',
        answer: 'Refinance closing costs (typically 2% to 5% of loan balance) include loan origination fees, home appraisal ($400-$700), title search and title insurance ($800-$2,000), recording fees, and credit report charges.'
      },
      {
        question: 'What is a "No-Closing-Cost" refinance?',
        answer: 'A no-closing-cost refinance is not free. The lender either rolls the closing costs into your total loan balance or charges a slightly higher interest rate (lender credits) to cover upfront fees.'
      },
      {
        question: 'What are the risks of resetting the loan clock back to 30 years?',
        answer: 'If you have paid 7 years on a 30-year mortgage and refinance into a new 30-year loan, you reset the amortization clock to year one. Even with a lower monthly payment, you may pay more total interest over 37 total years unless you make extra principal payments.'
      },
      {
        question: 'What is a Cash-Out Refinance versus Rate-and-Term Refinance?',
        answer: 'A Rate-and-Term refinance only alters the interest rate and repayment timeline. A Cash-Out refinance borrows against built-up home equity, replacing the existing mortgage with a larger loan and paying the difference to the homeowner in cash.'
      },
      {
        question: 'Can refinancing eliminate Private Mortgage Insurance (PMI)?',
        answer: 'Yes. If rising home values or principal paydown have increased your home equity to 20% or more (LTV ≤ 80%), refinancing into a conventional mortgage completely eliminates monthly PMI payments.'
      },
      {
        question: 'How does refinancing impact my credit score?',
        answer: 'Refinancing causes a temporary 5-to-15 point credit score dip due to the lender hard inquiry and closing an older loan account. Score recovers within a few months of on-time payments.'
      }
    ],
    educationalDisclaimer: 'Refinance calculations provide amortization comparisons. Actual lender terms, rate locks, and appraisal valuations are subject to underwriting approval.'
  },
  {
    id: 'subnet-cidr',
    title: 'IPv4 Subnet & CIDR Network Calculator',
    slug: 'subnet-cidr-calculator',
    categoryId: 'math',
    shortDescription: 'Calculate subnet mask, usable host range, network ID, and broadcast address from CIDR notation.',
    description: 'Analyze IPv4 networks for subnet masks, broadcast addresses, and usable host IP capacity.',
    keywords: ['subnet calculator', 'cidr calculator', 'ipv4 subnet', 'subnet mask', 'usable hosts', 'network address', 'slash notation'],
    iconName: 'Globe',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Total IPs = 2^(32 - CIDR); Usable Hosts = 2^(32 - CIDR) - 2 (for CIDR <= 30); Wildcard Mask = 255.255.255.255 - Subnet Mask; Network ID = IP bitwise-AND Mask; Broadcast = Network ID bitwise-OR Wildcard',
    formulaLatex: 'N_{\\text{total}} = 2^{32 - \\text{CIDR}}, \\quad N_{\\text{usable}} = \\max\\left(0, 2^{32 - \\text{CIDR}} - 2\\right), \\quad \\text{NetID} = \\text{IP} \\;\\&\\; \\text{Mask}',
    relatedCalculatorIds: ['binary-hex-converter', 'data-storage-converter', 'scientific'],
    stepByStepInstructions: [
      'Enter an IPv4 Address (e.g. 192.168.1.50 or 10.0.0.1).',
      'Select or enter CIDR Prefix Length (/0 through /32, e.g. /24 for standard 255.255.255.0).',
      'Review calculated Subnet Mask, Wildcard Inverted Mask, Network ID (first IP), and Broadcast IP (last IP).',
      'Check Usable Host IP Address Range (First Host through Last Host) and Total Usable Host Capacity.',
      'Inspect IP Address and Subnet Mask in full 32-bit Binary notation and IPv4 Address Class (Class A, B, C, Private/Public).'
    ],
    faqs: [
      {
        question: 'What is CIDR notation in computer networking?',
        answer: 'CIDR (Classless Inter-Domain Routing) notation represents an IP address and its subnet mask using a slash followed by the prefix length (e.g. 192.168.1.0/24). The number represents the count of leading 1-bits in the 32-bit subnet mask.'
      },
      {
        question: 'Why are 2 IP addresses subtracted from the usable host count in a subnet?',
        answer: 'The first address in any subnet (all host bits 0) is reserved as the Network ID. The last address (all host bits 1) is reserved as the Subnet Broadcast address. Usable hosts = 2^(32 - CIDR) - 2.'
      },
      {
        question: 'How many usable IP addresses are in a /24 subnet?',
        answer: 'A /24 subnet has 8 host bits (32 - 24 = 8). Total addresses = 2^8 = 256. Subtracting 2 gives exactly 254 usable host IP addresses.'
      },
      {
        question: 'What is a subnet mask and how does it work?',
        answer: 'A 32-bit subnet mask divides an IP address into two parts: the Network Prefix (identifying the network) and the Host Identifier (identifying the specific device). Bitwise ANDing an IP address with the subnet mask yields the Network ID.'
      },
      {
        question: 'What are the RFC 1918 Private IPv4 address ranges?',
        answer: '10.0.0.0 to 10.255.255.255 (10.0.0.0/8 - Class A); 172.16.0.0 to 172.31.255.255 (172.16.0.0/12 - Class B); 192.168.0.0 to 192.168.255.255 (192.168.0.0/16 - Class C). These are non-routable on the public internet.'
      },
      {
        question: 'What is a Wildcard Mask used for in routers?',
        answer: 'A wildcard mask is the bitwise inverse of the subnet mask (e.g., 0.0.0.255 for a 255.255.255.0 mask). Routers and firewalls (Cisco ACLs, OSPF) use wildcard masks to specify which IP bits to check (0 = match, 1 = ignore).'
      },
      {
        question: 'What is a /30 subnet used for in networking?',
        answer: 'A /30 subnet provides 4 total IPs and exactly 2 usable host addresses (e.g. 10.0.0.1 and 10.0.0.2), making it the classic standard for point-to-point router links to prevent wasted IP addresses.'
      },
      {
        question: 'What is the purpose of CIDR /31 and /32 subnets?',
        answer: '/31 subnets (RFC 3021) allocate 2 addresses for point-to-point links with no broadcast/network deduction. /32 represents a single host route (loopback address or VPN client).'
      }
    ],
    educationalDisclaimer: 'IPv4 calculations follow IETF RFC 791, RFC 1918, and RFC 4632 networking standards. Verify firewall routing and VLAN assignments with network engineering teams.'
  },
  {
    id: 'time-card-work-hours',
    title: 'Time Card & Work Shift Hours Calculator',
    slug: 'time-card-work-hours-calculator',
    categoryId: 'everyday',
    shortDescription: 'Calculate gross work shift hours, unpaid lunch breaks, and gross pay earnings.',
    description: 'Calculate net daily work hours from clock-in and clock-out times minus unpaid breaks.',
    keywords: ['time card', 'work hours calculator', 'clock in clock out', 'shift hours', 'paycheck calculator', 'timesheet calculator', 'overtime hours'],
    iconName: 'Clock',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Shift Minutes = Clock Out - Clock In; Net Paid Minutes = Shift Minutes - Unpaid Break Minutes; Net Hours = Net Paid Minutes / 60; Gross Pay = (Regular Hours × Rate) + (Overtime Hours × Rate × 1.5)',
    formulaLatex: 'H_{\\text{net}} = \\frac{(T_{\\text{out}} - T_{\\text{in}}) - T_{\\text{break}}}{60}, \\quad P_{\\text{gross}} = (H_{\\text{reg}} \\times R) + (H_{\\text{OT}} \\times 1.5 R)',
    relatedCalculatorIds: ['overtime-pay', 'hourly-to-salary', 'meeting-cost', 'time-date'],
    stepByStepInstructions: [
      'Enter Clock-In Time and Clock-Out Time for each day of the work week (Monday through Sunday).',
      'Enter Unpaid Lunch / Break Duration in minutes for each shift (e.g. 30, 45, or 60 mins).',
      'Enter Base Hourly Wage Rate ($/hr).',
      'Select Overtime Rule (Standard FLSA: >40 hours/week, or Daily Overtime: >8 hours/day).',
      'Review Daily Net Work Hours, Weekly Total Regular Hours, Overtime Hours (1.5x), and Estimated Gross Paycheck.'
    ],
    faqs: [
      {
        question: 'How do you calculate net work hours with a lunch break?',
        answer: 'Subtract the Clock-In time from the Clock-Out time to get total shift duration, then subtract unpaid lunch break minutes and divide by 60. For example: 8:00 AM to 5:00 PM (9 hours) minus a 30-minute lunch equals 8.5 paid work hours.'
      },
      {
        question: 'Are lunch breaks and rest breaks required to be paid under the FLSA?',
        answer: 'Under US Federal Fair Labor Standards Act (FLSA) regulations, short rest breaks (5 to 20 minutes) must be counted as paid work hours. Bona fide meal breaks (typically 30 minutes or longer where the employee is completely relieved of all duties) are unpaid.'
      },
      {
        question: 'How does standard weekly overtime (1.5x) work?',
        answer: 'Under federal FLSA rules, non-exempt hourly employees must receive overtime pay at 1.5 times their regular hourly rate for all hours worked in excess of 40 hours during a single 7-day work week.'
      },
      {
        question: 'What is daily overtime in states like California?',
        answer: 'In California, overtime (1.5x) is required for any work exceeding 8 hours in a single workday (or after 40 weekly hours), and double-time (2.0x) is required for all hours worked beyond 12 hours in a single day.'
      },
      {
        question: 'How do you convert minutes to decimal hours for payroll (e.g. 8 hours and 15 minutes)?',
        answer: 'Divide minutes by 60: 15 mins = 0.25 hrs; 30 mins = 0.50 hrs; 45 mins = 0.75 hrs. 8 hours and 15 minutes equals exactly 8.25 decimal hours.'
      },
      {
        question: 'What is the 7-minute rounding rule in payroll time clocks?',
        answer: 'Under the FLSA 15-minute rounding rule (29 CFR 785.48), employers may round employee time to the nearest 15 minutes: 1 to 7 minutes rounds down, while 8 to 14 minutes rounds up to the next quarter hour.'
      },
      {
        question: 'Does holiday pay or paid time off (PTO) count toward 40 hours for overtime?',
        answer: 'No. Under federal law, only actual physical hours worked count toward the 40-hour overtime threshold. Unworked PTO, holiday pay, and sick leave do not count toward overtime accumulation.'
      },
      {
        question: 'How should overnight shifts crossing midnight be calculated?',
        answer: 'If a shift crosses midnight (e.g. 10:00 PM to 6:00 AM), calculate total elapsed time as (24:00 - 22:00) + 6:00 = 8.0 hours minus lunch.'
      }
    ],
    educationalDisclaimer: 'Timesheet calculations provide gross pay estimates. Deductions for federal, state, and local income taxes and FICA payroll taxes will reduce net take-home pay.'
  },
  {
    id: 'sinking-fund',
    title: 'Sinking Fund Savings Goal Calculator',
    slug: 'sinking-fund-calculator',
    categoryId: 'finance',
    shortDescription: 'Calculate monthly, bi-weekly, and weekly automatic savings deposits needed to hit future purchase goals.',
    description: 'Plan and schedule target sinking funds for vacations, car replacements, weddings, holiday shopping, and annual insurance/property taxes. Calculates compound interest earnings in High-Yield Savings Accounts (HYSA) and inflation adjustments.',
    keywords: [
      'sinking fund calculator',
      'savings goal calculator',
      'target purchase savings planner',
      'hysa sinking fund',
      'vacation savings calculator',
      'car down payment savings plan',
      'wedding savings timeline',
      'annual property tax savings fund'
    ],
    iconName: 'PiggyBank',
    isPopular: true,
    isNew: true,
    formulaDescription: 'PMT = [ (Goal - PV × (1 + r)^n) × r ] / [ (1 + r)^n - 1 ]',
    formulaLatex: 'PMT = \\frac{\\left(FV - PV(1 + r)^n\\right) \\cdot r}{(1 + r)^n - 1}, \\quad \\text{Bi-Weekly} = \\frac{12 \\cdot PMT}{26}, \\quad \\text{Weekly} = \\frac{12 \\cdot PMT}{52}',
    relatedCalculatorIds: [
      'savings-goal-timeline',
      'emergency-fund',
      'compound-interest',
      'lump-sum-vs-dca',
      'inflation-purchasing-power'
    ],
    stepByStepInstructions: [
      'Select a popular preset (Vacation, Car Replacement, Wedding, Annual Taxes) or enter a custom target goal.',
      'Enter the Target Purchase Cost or Goal Amount (e.g. $6,000).',
      'Specify your Timeline in Months until the money is needed (e.g. 12 months).',
      'Enter any Starting Balance / Seed Money already saved in this bucket.',
      'Provide your High-Yield Savings Account (HYSA) APY Rate (e.g. 4.5%).',
      'Optionally toggle Inflation Protection to adjust future costs upward for rising price levels.',
      'Review your Required Monthly, Bi-Weekly, and Weekly deposit amounts, total interest earned, and accumulation growth chart.'
    ],
    faqs: [
      {
        question: 'What is a sinking fund and how is it different from an emergency fund?',
        answer: 'An emergency fund is reserved exclusively for unpredictable catastrophic events (such as job loss, unexpected medical emergencies, or sudden major home disasters). In contrast, a sinking fund is dedicated savings for a known, planned, or recurring future expenditure with a predictable timeline (such as holiday gifts, car maintenance, semi-annual insurance premiums, or a vacation).'
      },
      {
        question: 'Why should I use a sinking fund instead of charging expenses to a credit card?',
        answer: 'Sinking funds allow you to earn compound interest leading up to a purchase rather than paying 20%+ APR credit card interest afterward. They smooth out budget spikes and eliminate the anxiety of large lump-sum bills.'
      },
      {
        question: 'How many sinking funds can I have at the same time?',
        answer: 'You can maintain as many sinking funds as your cash flow allows. Many modern banks (like Ally, Capital One 360, SoFi, or Marcus) offer "savings buckets" or sub-accounts under one login, allowing you to organize separate digital vaults for travel, car repairs, and holidays.'
      },
      {
        question: 'Where is the best place to keep my sinking fund money?',
        answer: 'Sinking funds should be held in liquid, FDIC-insured High-Yield Savings Accounts (HYSA) or money market funds. Never invest short-term sinking funds (needed in under 3 to 5 years) in volatile stock markets where short-term drops could compromise your purchasing deadline.'
      },
      {
        question: 'How does a High-Yield Savings APY accelerate my savings timeline?',
        answer: 'Compound monthly interest directly reduces the total out-of-pocket cash you need to deposit. For example, saving $10,000 over 2 years at 4.5% APY generates several hundred dollars in risk-free yield that counts toward your goal.'
      },
      {
        question: 'What happens if I need to use my sinking fund early?',
        answer: 'Because your funds reside in a high-yield savings account without early withdrawal penalties (unlike CDs or retirement accounts), you have full liquidity to deploy the cash whenever the expense arises.'
      },
      {
        question: 'Should I adjust my sinking fund goals for inflation?',
        answer: 'For short-term goals (under 12 months), inflation has a minor effect. However, for multi-year sinking funds (such as buying a car in 3 years or a major home renovation in 4 years), adjusting your target by 3% to 4% annually ensures your saved dollars match future price tags.'
      },
      {
        question: 'Can sinking funds be funded on a bi-weekly or per-paycheck schedule?',
        answer: 'Yes! Aligning your automatic sinking fund transfers with your payroll deposit date (every two weeks or on the 1st and 15th) automates savings before you have a chance to spend the discretionary income.'
      }
    ],
    educationalDisclaimer: 'This calculator is for informational savings planning. APY interest rates are variable and subject to change by financial institutions over time.'
  },
  {
    id: 'blood-pressure-category',
    title: 'Blood Pressure Category & MAP Calculator',
    slug: 'blood-pressure-category-calculator',
    categoryId: 'health',
    shortDescription: 'Evaluate AHA Blood Pressure categories, Pulse Pressure, and Mean Arterial Pressure (MAP).',
    description: 'Check systolic and diastolic blood pressure readings against AHA/ACC 2017 clinical guidelines. Calculates Mean Arterial Pressure (MAP) and Pulse Pressure for cardiovascular health monitoring.',
    keywords: [
      'blood pressure calculator',
      'hypertension category',
      'systolic diastolic',
      'map calculator',
      'pulse pressure',
      'aha blood pressure categories',
      'stage 1 hypertension',
      'stage 2 hypertension'
    ],
    iconName: 'Heart',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Pulse Pressure = Systolic - Diastolic; Mean Arterial Pressure (MAP) = Diastolic + (1/3) × Pulse Pressure',
    formulaLatex: '\\text{PP} = S - D, \\quad \\text{MAP} = D + \\frac{1}{3}(S - D) = \\frac{2D + S}{3}',
    relatedCalculatorIds: [
      'target-heart-rate',
      'bmi',
      'water-hydration',
      'calorie-tdee'
    ],
    stepByStepInstructions: [
      'Enter your Systolic Blood Pressure (top number in mmHg).',
      'Enter your Diastolic Blood Pressure (bottom number in mmHg).',
      'Review your AHA/ACC Classification: Normal (<120 and <80), Elevated (120-129 and <80), Stage 1 Hypertension (130-139 or 80-89), Stage 2 Hypertension (≥140 or ≥90), or Hypertensive Crisis (>180 and/or >120).',
      'Check Mean Arterial Pressure (MAP) in mmHg (healthy normal range is 70 to 100 mmHg).',
      'Check Pulse Pressure in mmHg (normal resting range is 40 to 60 mmHg).',
      'Review lifestyle recommendations for blood pressure management.'
    ],
    faqs: [
      {
        question: 'What are the 2017 AHA/ACC Blood Pressure Categories?',
        answer: 'Normal: Systolic < 120 and Diastolic < 80 mmHg. Elevated: Systolic 120-129 and Diastolic < 80 mmHg. Stage 1 Hypertension: Systolic 130-139 or Diastolic 80-89 mmHg. Stage 2 Hypertension: Systolic ≥ 140 or Diastolic ≥ 90 mmHg. Hypertensive Crisis: Systolic > 180 and/or Diastolic > 120 mmHg.'
      },
      {
        question: 'What is Mean Arterial Pressure (MAP) and why is it important?',
        answer: 'Mean Arterial Pressure (MAP) is the average arterial pressure throughout one complete cardiac cycle of systole and diastole. A MAP of 70 to 100 mmHg is necessary to ensure adequate perfusion to vital organs (brain, kidneys, heart).'
      },
      {
        question: 'What is Pulse Pressure?',
        answer: 'Pulse Pressure is the numeric difference between systolic and diastolic pressure (PP = Systolic - Diastolic). A resting pulse pressure persistently above 60 mmHg indicates arterial stiffness (arteriosclerosis) and increased cardiovascular risk.'
      },
      {
        question: 'What should you do during a Hypertensive Crisis reading?',
        answer: 'If your reading exceeds 180/120 mmHg, wait 5 minutes and re-test. If readings remain elevated, or if accompanied by chest pain, shortness of breath, back pain, numbness, or difficulty speaking, seek emergency medical care (call 911) immediately.'
      },
      {
        question: 'How should blood pressure be measured accurately at home?',
        answer: '1) Rest quietly for 5 minutes before reading; 2) Avoid caffeine, exercise, and smoking for 30 minutes prior; 3) Sit with back supported and feet flat on the floor; 4) Support arm at heart level; 5) Use a calibrated upper-arm cuff of correct size.'
      },
      {
        question: 'What is "White Coat Hypertension"?',
        answer: 'White coat hypertension is a temporary spike in blood pressure occurring in clinical environments due to situational stress or anxiety, while home readings remain normal.'
      },
      {
        question: 'How does the DASH diet reduce blood pressure?',
        answer: 'The Dietary Approaches to Stop Hypertension (DASH) diet—rich in potassium, magnesium, calcium, and fiber while restricting dietary sodium to <1,500–2,300 mg/day—can lower systolic BP by 8 to 14 mmHg.'
      },
      {
        question: 'Why does diastolic pressure matter if systolic is the primary metric?',
        answer: 'Diastolic pressure reflects vascular resistance when the heart is at rest between beats. Persistently high diastolic pressure damages delicate capillaries in the kidneys and retina.'
      }
    ],
    educationalDisclaimer: 'This blood pressure evaluator provides educational information based on AHA/ACC guidelines. It is not a substitute for clinical medical diagnosis or physician evaluation.'
  }
];

export const CALCULATORS: CalculatorMeta[] = [
  ...BASE_CALCULATORS,
  ...EXPANDED_CALCULATORS,
];



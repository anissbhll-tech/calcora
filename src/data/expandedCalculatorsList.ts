import { CalculatorMeta } from '../types';

export const EXPANDED_CALCULATORS: CalculatorMeta[] = [
  // Personal Finance & Investing
  {
    id: 'stock-dividend-yield',
    title: 'Stock Dividend Yield & DRIP Growth Calculator',
    slug: 'stock-dividend-yield',
    categoryId: 'investing',
    shortDescription: 'Calculate dividend yield %, passive annual income, DRIP compounding growth, and long-term Yield on Cost.',
    description: 'Calculate your dividend yield, recurring cash flow, and multi-decade wealth compounding through Dividend Reinvestment Plans (DRIP). Models dividend growth rates (DGR), annual capital price appreciation, recurring monthly contributions, tax treatment (taxable vs tax-advantaged retirement accounts), and lifetime Yield on Cost (YoC).',
    keywords: [
      'dividend yield calculator',
      'drip calculator dividend reinvestment',
      'dividend growth rate dgr calculator',
      'yield on cost calculator',
      'passive income dividend stock calculator',
      'dividend aristocrat compound growth',
      'monthly dividend income calculator'
    ],
    iconName: 'TrendingUp',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Dividend Yield = (Annual Dividend per Share / Stock Price) × 100; DRIP Compounding: Shares(t) = Shares(t-1) + [Net Dividends(t) + Contributions(t)] / Price(t); Yield on Cost = (Annual Dividends(t) / Total Invested Capital) × 100',
    formulaLatex: '\\text{Yield}_{\\text{div}} = \\frac{D}{P} \\times 100, \\quad \\text{YoC}_t = \\frac{S_t \\times D_t}{\\text{Total Invested}} \\times 100',
    relatedCalculatorIds: [
      'compound-interest',
      'fire-number-calculator',
      '401k-roth-ira-comparison',
      'capital-gains-tax-estimate',
      'roi-margin'
    ],
    stepByStepInstructions: [
      'Enter your Initial Portfolio Value or starting lump-sum capital.',
      'Enter the Current Share Price and the Annual Dividend Payout per Share.',
      'Enter your Recurring Monthly Investment Contribution.',
      'Enter the Expected Annual Dividend Growth Rate (DGR %) and Annual Share Price Appreciation Rate %.',
      'Set your Investment Horizon in years (1 to 40 years).',
      'Toggle Dividend Reinvestment Plan (DRIP) on or off to compare reinvestment versus cash payouts.',
      'Select your Account Tax Treatment (0% for Roth/Traditional IRA, 15% or 20% for taxable accounts).',
      'Review your Projected Portfolio Value, Monthly Passive Cash Flow, Cumulative Dividends, and Yield on Cost milestones.'
    ],
    faqs: [
      {
        question: 'What is dividend yield and how is it calculated?',
        answer: 'Dividend yield is a financial ratio that shows how much a company pays out in dividends each year relative to its current share price. Formula: Dividend Yield % = (Annual Dividend per Share / Current Stock Price) × 100. For example, a $100 stock paying $4.00 per year has a 4.0% dividend yield.'
      },
      {
        question: 'What is a Dividend Reinvestment Plan (DRIP)?',
        answer: 'A DRIP automatically uses cash dividend payments to purchase additional shares (or fractional shares) of the underlying stock or ETF on the dividend payment date, with no commission fees. Over time, these new shares generate their own dividends, creating an exponential compounding snowball.'
      },
      {
        question: 'What is Yield on Cost (YoC) and why does it matter?',
        answer: 'Yield on Cost measures the annual dividend income you receive divided by your original purchase cost basis, rather than the current market price. If you buy a stock at $50 paying $2 (4% yield), and 10 years later the dividend grows to $6 while the stock rises to $150, your Yield on Cost is 12% ($6 / $50) even though the current yield is 4% ($6 / $150).'
      },
      {
        question: 'What is the Dividend Growth Rate (DGR)?',
        answer: 'Dividend Growth Rate is the annualized percentage rate at which a company increases its dividend payout over time. Dividend Aristocrats (companies in the S&P 500 that have raised dividends for 25+ consecutive years) typically maintain DGRs between 5% and 10% per year, outpacing inflation.'
      },
      {
        question: 'How are stock dividends taxed in the United States?',
        answer: 'Qualified dividends (from US corporations held for at least 61 days) are taxed at preferential long-term capital gains rates (0%, 15%, or 20%, plus potential 3.8% NIIT). Non-qualified (ordinary) dividends (like REITs) are taxed at standard ordinary income brackets. Inside a Roth IRA or 401(k), dividends compound 100% tax-free.'
      },
      {
        question: 'Is a higher dividend yield always better?',
        answer: 'No. Extremely high yields (e.g., above 8%–10%) often indicate a "dividend trap"—where a plunging stock price inflates the trailing yield or the company payout ratio exceeds earnings, risking an imminent dividend cut. Sustainable dividend growth typically ranges from 2.5% to 5.5% with a payout ratio under 65%.'
      },
      {
        question: 'How often are stock dividends paid?',
        answer: 'Most US public companies pay dividends quarterly (four times per year). Some specialized ETFs, closed-end funds (CEFs), and REITs (like Realty Income) pay monthly dividends, while international companies often pay semi-annually or annually.'
      },
      {
        question: 'Can you live off dividends in retirement?',
        answer: 'Yes. Living off dividends allows retirees to generate living expenses entirely from passive cash flow without ever selling underlying shares, eliminating sequence of returns risk during market downturns.'
      }
    ],
    educationalDisclaimer: 'This dividend yield and DRIP growth calculator provides mathematical projections based on historical compounding assumptions. Dividend payments and growth rates are not guaranteed and are subject to board of directors approval and company corporate financial health.'
  },
  {
    id: 'dca-crypto-stocks',
    title: 'Dollar Cost Averaging (DCA) Calculator (Stocks, ETF & Crypto)',
    slug: 'dca-crypto-stocks',
    categoryId: 'investing',
    shortDescription: 'Simulate recurring DCA investments vs lump sum market timing across stocks, index funds, ETFs, and cryptocurrency.',
    description: 'Calculate the mathematical power of Dollar Cost Averaging (DCA) to build wealth, reduce downside volatility, and eliminate emotional market timing. Compare weekly, bi-weekly, and monthly recurring investment schedules against lump-sum deployment with exact average cost basis calculations.',
    keywords: [
      'dca calculator',
      'dollar cost averaging calculator',
      'crypto dca calculator bitcoin eth',
      'dca vs lump sum calculator',
      'recurring investment calculator',
      'etf index fund dca simulation',
      'average cost basis calculator'
    ],
    iconName: 'PieChart',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Average Cost Basis = Total Invested Capital / Total Units Purchased; DCA Value = Total Units × Ending Asset Price; Periodic Rate = (1 + r)^(1/n) - 1',
    formulaLatex: '\\bar{C} = \\frac{\\sum_{k=1}^N I_k}{\\sum_{k=1}^N \\frac{I_k}{P_k}}, \\quad V_{\\text{end}} = P_{\\text{end}} \\times \\sum_{k=1}^N U_k',
    relatedCalculatorIds: [
      'compound-interest',
      'stock-dividend-yield',
      'fire-number-calculator',
      'roi-margin',
      'capital-gains-tax-estimate'
    ],
    stepByStepInstructions: [
      'Enter your Recurring Investment Amount (the fixed dollar amount deposited each period).',
      'Select your Investment Frequency (Weekly, Bi-Weekly, or Monthly).',
      'Enter an optional Starting Lump Sum Capital deployed at inception.',
      'Enter the Starting Asset Price (e.g. $100 for an ETF share or $60,000 for Bitcoin).',
      'Specify the Expected Annual Return (CAGR %) based on asset historical averages.',
      'Select your Investment Time Horizon in years (1 to 40 years).',
      'Analyze your Projected Portfolio Value, Total Net Profit, and Average Cost Basis per Unit.',
      'Review the Strategy Comparison between Dollar Cost Averaging and Upfront Lump Sum investing.'
    ],
    faqs: [
      {
        question: 'What is Dollar Cost Averaging (DCA)?',
        answer: 'Dollar Cost Averaging (DCA) is an investment strategy where you invest a fixed amount of money at regular intervals (such as weekly or monthly), regardless of the asset price. When prices are high, your fixed dollars buy fewer units; when prices drop, your dollars automatically buy more units, lowering your average purchase cost over time.'
      },
      {
        question: 'Is Dollar Cost Averaging better than Lump Sum investing?',
        answer: 'Statistically, Vanguard research shows that Lump Sum investing outperforms DCA approximately 68% of the time in broad stock indices because markets trend upward over long horizons. However, DCA provides vital behavioral and risk protection, preventing investors from experiencing severe emotional panic if the market crashes immediately after deploying capital.'
      },
      {
        question: 'How does DCA work for high-volatility assets like Bitcoin and Crypto?',
        answer: 'DCA is widely considered the gold standard strategy for cryptocurrencies and volatile growth stocks. Because crypto experiences frequent 50%+ drawdowns, automated recurring purchases ensure you accumulate the maximum number of coins during bear market bottoms without needing to predict cyclical tops and bottoms.'
      },
      {
        question: 'How do you calculate average cost per share/coin?',
        answer: 'Divide the total dollars invested across all purchase periods by the total number of shares or coins acquired. Formula: Average Cost Basis = Total Capital Invested / Total Units Owned.'
      },
      {
        question: 'What frequency is best for DCA: Daily, Weekly, or Monthly?',
        answer: 'For long-term investors (5+ years), empirical studies show virtually identical performance between weekly and monthly DCA schedules. Monthly DCA aligned with your employer paycheck deposit schedule is generally the most practical and minimizes potential trading fees.'
      },
      {
        question: 'Does DCA protect against losing money in a declining asset?',
        answer: 'No. DCA cannot turn a bad investment into a good one. If the underlying company or asset permanently goes to zero or declines indefinitely, DCA only averages your losses downward. DCA works best on diversified, productive index funds (like the S&P 500 or Total World Stock) and assets with strong long-term adoption.'
      },
      {
        question: 'Can I combine Lump Sum and DCA strategies?',
        answer: 'Yes. A hybrid approach involves deploying 50% of available cash as an initial lump sum to capture immediate market exposure, while dollar-cost averaging the remaining 50% in equal tranches over the next 6 to 12 months.'
      },
      {
        question: 'Are there tax implications when dollar-cost averaging in taxable accounts?',
        answer: 'Buying assets through DCA does not trigger any taxable event. However, each recurring purchase creates an individual "tax lot" with its own date and cost basis. When you eventually sell, you can choose specific identification (e.g. Highest-In, First-Out) to optimize capital gains taxes.'
      }
    ],
    educationalDisclaimer: 'This Dollar Cost Averaging calculator provides mathematical simulations based on user-defined rate-of-return assumptions. Past asset performance and historical returns do not guarantee future investment results.'
  },
  {
    id: 'portfolio-rebalancing',
    title: 'Portfolio Rebalancing & Target Asset Allocation Calculator',
    slug: 'portfolio-rebalancing-calculator',
    categoryId: 'investing',
    shortDescription: 'Calculate exact buy, sell, and new cash contribution amounts to rebalance investment portfolios back to target asset allocation weights.',
    description: 'Calculate exact dollar buy, sell, and rebalancing transactions required to align an investment portfolio with target asset allocations across stocks, bonds, international equities, real estate, crypto, and cash. Supports two strategies: pure rebalancing (selling overweight assets to buy underweight assets) and cash-flow rebalancing (directing new capital deposits to underweight assets to minimize taxable capital gains events).',
    keywords: [
      'portfolio rebalancing calculator',
      'asset allocation calculator',
      'target allocation rebalancer',
      'rebalance 3 fund portfolio',
      'bogleheads rebalancing tool',
      'tax efficient portfolio rebalance',
      'buy sell rebalance orders',
      'investment allocation drift'
    ],
    iconName: 'Scale',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Target Value_i = Total Portfolio Value × Target Weight_i; Delta Trade_i = Target Value_i - Current Value_i; If Delta > 0, Buy; If Delta < 0, Sell; Cash-Flow Target = (Total Portfolio + New Deposit) × Target Weight_i.',
    formulaLatex: 'V_{\\text{target}, i} = (V_{\\text{total}} + D_{\\text{new}}) \\times w_i, \\quad \\Delta_i = V_{\\text{target}, i} - V_{\\text{current}, i}',
    relatedCalculatorIds: [
      'compound-interest',
      '401k-roth-ira-comparison',
      'fire-number-calculator',
      'capital-gains-tax-estimate',
      'stock-dividend-yield'
    ],
    stepByStepInstructions: [
      'Enter the current market value and current target percentage weight for each asset class (e.g. US Stocks, International Stocks, Bonds, Real Estate, Cash).',
      'Ensure the sum of all target asset allocation weights equals exactly 100.0%.',
      'Optionally input an incoming New Cash Contribution / Deposit amount if you plan to rebalance through fresh capital inflows.',
      'Select your Rebalancing Strategy: "Pure Rebalance (Buy & Sell to Target)" or "Cash Inflow Only (Buy Underweight Assets Without Selling)".',
      'Review the Rebalancing Summary: Total Portfolio Value, Current vs Target Weight Deviations (Drift %), and Exact Trade Orders ($ to Buy or $ to Sell).',
      'Review the visual Asset Allocation Distribution chart to compare Before and After allocations.'
    ],
    faqs: [
      {
        question: 'What is portfolio rebalancing and why is it essential?',
        answer: 'Portfolio rebalancing is the systematic process of realigning the weightings of your portfolio asset classes back to your target risk profile. As certain assets (like equities) appreciate faster than others (like fixed-income bonds), your portfolio drifts into a higher-risk allocation than intended. Rebalancing restores your original risk tolerance and enforces buying low and selling high.'
      },
      {
        question: 'How often should an investment portfolio be rebalanced?',
        answer: 'Most financial advisors recommend either a calendar-based schedule (annual or semi-annual review) or a tolerance band threshold (e.g. the 5/25 rule, where you only rebalance when an asset drifts by more than 5 absolute percentage points or 25% relative to its target weight).'
      },
      {
        question: 'What is cash-flow rebalancing and how does it save taxes?',
        answer: 'Cash-flow rebalancing directs new contributions (such as monthly savings, dividends, or bonus deposits) exclusively into underweight asset classes. This realigns your portfolio without selling appreciated assets in taxable brokerage accounts, completely avoiding taxable capital gains events.'
      },
      {
        question: 'What is portfolio drift and how does it increase investment risk?',
        answer: 'Portfolio drift occurs when high-performing assets grow to represent a disproportionately large percentage of your portfolio. In a multi-year bull market, an intended 60/40 stock/bond portfolio can drift to 80/20, exposing you to severe downside drawdowns during market corrections.'
      },
      {
        question: 'Should I rebalance inside tax-advantaged accounts first?',
        answer: 'Yes. It is best practice to execute buy and sell rebalancing trades inside tax-sheltered accounts (such as 401k, Traditional IRA, or Roth IRA) because trades inside these accounts generate zero immediate federal or state capital gains tax obligations.'
      },
      {
        question: 'What is a 3-Fund Bogleheads portfolio and how is it rebalanced?',
        answer: 'The classic 3-Fund Bogleheads portfolio consists of Total US Stock Market, Total International Stock Market, and Total Bond Market index funds. Rebalancing calculates the drift across these three broad index funds and re-allocates dollars to maintain target stock/bond and domestic/international splits.'
      },
      {
        question: 'Can rebalancing boost long-term risk-adjusted investment returns?',
        answer: 'While rebalancing primarily controls downside risk rather than maximizing peak returns, systematic rebalancing across volatile, non-correlated assets creates a "rebalancing bonus" by systematically taking profits from overvalued assets to acquire undervalued assets.'
      },
      {
        question: 'How do transaction trading fees affect rebalancing frequency?',
        answer: 'With zero-commission brokerage trading across major platforms (Vanguard, Fidelity, Schwab), transaction costs are minimal. However, bid-ask spreads and potential capital gains taxes should still be considered before rebalancing small portfolio deviations.'
      }
    ],
    educationalDisclaimer: 'This portfolio rebalancing calculator provides mathematical asset allocation simulations for educational and investment planning purposes. It does not constitute financial, investment, or tax advice. Rebalancing in taxable accounts may trigger taxable capital gains.'
  },
  {
    id: '401k-roth-ira-comparison',
    title: 'Roth vs Traditional IRA & 401(k) Calculator',
    slug: '401k-roth-ira-comparison',
    categoryId: 'investing',
    shortDescription: 'Compare pre-tax vs after-tax retirement growth to find whether Roth or Traditional maximises your after-tax wealth.',
    description: 'Determine whether contributing to a Roth IRA/401(k) or Traditional IRA/401(k) produces higher spendable wealth in retirement. Models upfront tax deductions, tax-deferred vs tax-free compound growth, retirement withdrawal taxes, 2024 IRS statutory contribution limits, and the break-even tax rate.',
    keywords: [
      'roth vs traditional ira calculator',
      'roth vs traditional 401k',
      'roth or traditional ira',
      'tax deferred vs tax free',
      'roth ira conversion',
      'break even retirement tax rate',
      'pre tax vs post tax retirement',
      'traditional ira tax deduction'
    ],
    iconName: 'ShieldCheck',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Roth Net = Annual Contribution × [((1 + r)^n - 1) / r]; Traditional Net = (Annual Contribution × [((1 + r)^n - 1) / r] × (1 - Retirement Tax Rate)) + Reinvested Tax Savings Net',
    formulaLatex: '\\text{Roth Net} = PMT \\cdot \\left[\\frac{(1+r)^n - 1}{r}\\right], \\quad \\text{Trad Net} = PMT \\cdot \\left[\\frac{(1+r)^n - 1}{r}\\right](1 - T_{\\text{ret}}) + \\text{Taxable Brokerage Net}',
    relatedCalculatorIds: [
      'federal-income-tax-bracket',
      'fire-number-calculator',
      'retirement-401k',
      'compound-interest',
      'savings-goal-timeline'
    ],
    stepByStepInstructions: [
      'Select your retirement vehicle: IRA (2024 statutory limit: $7,000 / $8,000 for age 50+), 401(k) (2024 limit: $23,000 / $30,500 for age 50+), or Custom Annual Contribution.',
      'Enter your Current Age and Target Retirement Age to establish the total compounding horizon in years.',
      'Input your Current Marginal Income Tax Rate (the highest federal + state tax bracket your top dollar of income falls into today).',
      'Input your Expected Effective/Marginal Retirement Tax Rate (the estimated tax rate you anticipate paying when taking distributions in retirement).',
      'Set your Expected Annual Investment Return rate (typically 6.0% to 8.5% nominal for diversified index funds).',
      'Toggle whether you will reinvest the upfront Traditional annual tax savings (Tax Refund) in a taxable brokerage account for a fair, economically equivalent comparison.',
      'Review the recommended vehicle (Roth vs Traditional), net wealth advantage, break-even tax rate, and the multi-decade growth schedule.'
    ],
    faqs: [
      {
        question: 'What is the fundamental difference between a Roth and Traditional account?',
        answer: 'The core difference is the timing of taxation. Traditional accounts (Traditional IRA / Traditional 401k) allow you to contribute pre-tax dollars today, lowering your current taxable income, but all withdrawals in retirement are taxed as ordinary income. Roth accounts (Roth IRA / Roth 401k) are funded with after-tax dollars today (no upfront deduction), but all future investment growth and qualified withdrawals in retirement are 100% tax-free.'
      },
      {
        question: 'How does the break-even tax rate determine whether Roth or Traditional is better?',
        answer: 'Mathematically, if your current tax rate during your working years is identical to your tax rate during retirement (and you invest the tax savings), Roth and Traditional produce the exact same after-tax cash. If your current tax rate is higher than your expected retirement tax rate, Traditional wins. If your current tax rate is lower than your expected retirement tax rate, Roth wins.'
      },
      {
        question: 'What are the 2024 IRS contribution limits for IRAs and 401(k)s?',
        answer: 'For tax year 2024, the IRA contribution limit is $7,000 ($8,000 for individuals aged 50 and older due to catch-up contributions). For 401(k), 403(b), and most 457 plans, the 2024 employee elective deferral limit is $23,000 ($30,500 for individuals aged 50 and older).'
      },
      {
        question: 'Why does maxing out a Roth account give an implicit tax-shelter advantage?',
        answer: 'Because IRS contribution limits apply to nominal dollars regardless of tax status, contributing $7,000 of post-tax money into a Roth IRA shelters more purchasing power than contributing $7,000 of pre-tax money into a Traditional IRA. Unless you conscientiously reinvest the $1,680+ upfront tax deduction from the Traditional contribution into an external taxable brokerage account, Roth effectively allows you to store more pure tax-exempt wealth inside the IRS shelter.'
      },
      {
        question: 'Are employer 401(k) matching contributions Roth or Traditional?',
        answer: 'Historically, all employer matching contributions are deposited on a pre-tax basis into a Traditional 401(k) sub-account (and are taxed upon distribution in retirement). Under the SECURE 2.0 Act, employers may now offer employees the option to receive matching funds directly into a Roth 401(k) bucket, but those match amounts must be reported as taxable income on the employee’s W-2 in the year received.'
      },
      {
        question: 'What are Required Minimum Distributions (RMDs) and how do they differ between Roth and Traditional?',
        answer: 'Traditional IRAs and Traditional 401(k)s mandate Required Minimum Distributions starting at age 73 (rising to age 75 in 2033 under SECURE 2.0). These forced withdrawals can push retirees into higher tax brackets. In contrast, Roth IRAs have no RMDs during the original owner’s lifetime, allowing your assets to compound tax-free indefinitely and pass to heirs with zero income tax liability.'
      },
      {
        question: 'Can I do a Backdoor Roth IRA if my income exceeds the IRS Roth phase-out limits?',
        answer: 'Yes. If your Modified Adjusted Gross Income (MAGI) exceeds the 2024 Roth IRA phase-out threshold ($146,000–$161,000 for single filers; $230,000–$240,000 for married filing jointly), you can execute a "Backdoor Roth IRA" by making a non-deductible contribution to a Traditional IRA and subsequently converting it to a Roth IRA. Beware of the IRS pro-rata rule if you hold existing pre-tax IRA assets.'
      }
    ],
    educationalDisclaimer: 'This comparison tool is provided for educational and illustrative financial modeling purposes only and does not constitute formal tax, legal, or investment advice. Tax laws, standard deductions, and income brackets are subject to legislative change. Projections reflect IRS 2024 statutory contribution limits. Consult a Certified Public Accountant (CPA) or fee-only fiduciary financial advisor regarding your personal tax situation.'
  },
  {
    id: 'fire-number-calculator',
    title: 'FIRE Number & Early Retirement Timeline Calculator',
    slug: 'fire-number-calculator',
    categoryId: 'investing',
    shortDescription: 'Calculate your exact Financial Independence Retire Early (FIRE) number, safe withdrawal rate, and retirement timeline.',
    description: 'Determine how much money you need to achieve financial independence and calculate the exact number of years until you can retire early. Model customized Safe Withdrawal Rates (3% to 4.5%), real inflation-adjusted compound returns, and multi-tier goals including Lean FIRE, Standard FIRE, Fat FIRE, and Coast FIRE.',
    keywords: [
      'fire number calculator',
      'financial independence retire early',
      'fire calculator',
      '4 percent rule calculator',
      'safe withdrawal rate',
      'coast fire calculator',
      'lean fire vs fat fire',
      'early retirement timeline',
      'trinity study retirement'
    ],
    iconName: 'Flame',
    isPopular: true,
    isNew: true,
    formulaDescription: 'FIRE Number = Annual Living Expenses / (Safe Withdrawal Rate / 100); Years to FIRE (t) = ln[(FIRE Goal + Annual Savings / Real Return) / (Current Net Worth + Annual Savings / Real Return)] / ln(1 + Real Return)',
    formulaLatex: '\\text{FIRE Target} = \\frac{E}{\\text{SWR}}, \\quad t = \\frac{\\ln\\left(\\frac{F + S/r}{PV + S/r}\\right)}{\\ln(1 + r)}',
    relatedCalculatorIds: [
      'compound-interest',
      'retirement-401k',
      '401k-roth-ira-comparison',
      'savings-goal-timeline',
      'net-worth'
    ],
    stepByStepInstructions: [
      'Enter your anticipated Annual Retirement Living Expenses in today’s dollars (housing, food, travel, healthcare, discretionary spending).',
      'Input your Current Invested Portfolio balance across all liquid investment accounts (brokerage, 401k, IRA, HSA, taxable index funds).',
      'Enter your expected Annual Savings & Investment Contribution amount (new money deposited into investments each year).',
      'Select your target Safe Withdrawal Rate (SWR) percentage—typically 4.0% based on the Trinity Study, or 3.0% to 3.5% for early retirees facing 40+ year retirement horizons.',
      'Input your Expected Real Annual Investment Return percentage (typically 6.0% to 7.5% net of inflation for diversified equity portfolios).',
      'Review your target FIRE Portfolio Goal, estimated timeline in years and target retirement age, multi-tier targets (Lean, Standard, Fat, Coast), and the compound growth simulation table.'
    ],
    faqs: [
      {
        question: 'What is a FIRE Number and how is it calculated?',
        answer: 'Your FIRE (Financial Independence, Retire Early) number is the total investment portfolio value required to fund your living expenses indefinitely without running out of money. Under the standard 4% Safe Withdrawal Rule (derived from the Trinity Study), your FIRE number equals exactly 25 times your annual living expenses (FIRE Number = Annual Expenses × 25).'
      },
      {
        question: 'What is the 4% Safe Withdrawal Rate (SWR) and does it apply to early retirement?',
        answer: 'The 4% rule originated from the 1998 Trinity Study, which found that a portfolio with a 50/50 to 75/25 stock/bond split had a 95%+ success rate over a 30-year retirement period when withdrawing 4% in year one and adjusting subsequent annual withdrawals for inflation. However, early retirees planning for a 40 to 50-year retirement often use a more conservative withdrawal rate of 3.25% to 3.5% (28.5x to 30.7x annual expenses).'
      },
      {
        question: 'What is the difference between Lean FIRE, Standard FIRE, Fat FIRE, and Coast FIRE?',
        answer: 'Lean FIRE covers minimal baseline subsistence expenses (typically 70%–75% of average spending, prioritizing frugality). Standard FIRE maintains 100% of your current standard of living. Fat FIRE provides an abundant budget (140%+ of baseline spending, accommodating extensive travel and luxury). Coast FIRE is the milestone where your current portfolio is large enough to compound to full traditional retirement by age 65 without saving another dollar.'
      },
      {
        question: 'What real investment return rate should I assume in FIRE projections?',
        answer: 'Financial planners generally recommend modeling a "real" annual return (nominal returns minus inflation). Historically, the US S&P 500 has generated ~10% nominal annual returns and ~7% real returns over long multi-decade periods. For conservative planning that incorporates global diversification and sequence of returns risk, assuming 5.5% to 7.0% real return is standard.'
      },
      {
        question: 'How do early retirees access 401(k) and IRA funds before age 59½ without penalty?',
        answer: 'Early retirees can access tax-advantaged retirement accounts penalty-free through several IRS-approved strategies: 1) A Roth IRA Conversion Ladder (converting Traditional IRA/401k funds to Roth and withdrawing the principal penalty-free after a 5-year seasoning period); 2) IRS Rule 72(t) Substantially Equal Periodic Payments (SEPP); 3) Taxable brokerage accounts; or 4) Withdrawing direct Roth IRA contributions anytime tax- and penalty-free.'
      },
      {
        question: 'What is Sequence of Returns Risk (SRR) and how does it threaten early retirement?',
        answer: 'Sequence of Returns Risk is the hazard that severe stock market downturns occur in the first few years of early retirement. Selling assets at depressed prices locks in portfolio losses and prematurely depletes principal. Mitigating SRR involves holding a 2–3 year cash or short-term bond cushion, maintaining flexible spending budgets, or working part-time ("Barista FIRE") during bear markets.'
      },
      {
        question: 'How do I account for healthcare costs prior to Medicare eligibility at age 65?',
        answer: 'In the United States, early retirees under age 65 generally purchase health insurance through the Affordable Care Act (ACA) marketplace. Because ACA premium tax credits (subsidies) are based on Modified Adjusted Gross Income (MAGI) rather than total asset wealth, early retirees who strategically manage taxable income can often qualify for substantial health insurance premium subsidies.'
      }
    ],
    educationalDisclaimer: 'FIRE projections and safe withdrawal simulations are provided for educational and long-term financial modeling purposes only. Market returns, inflation, tax laws, healthcare costs, and longevity are subject to significant real-world variability. Past historical returns (including the Trinity Study) do not guarantee future portfolio survival rates. Consult a certified financial planner (CFP) before leaving employment.'
  },
  {
    id: 'option-greek-delta',
    title: 'Options Black-Scholes Pricing & Greeks Calculator (Delta, Gamma, Theta, Vega, Rho)',
    slug: 'options-black-scholes-calculator',
    categoryId: 'investing',
    shortDescription: 'Calculate European Call and Put option fair theoretical values, implied volatility, Delta, Gamma, Theta, Vega, and Rho using Black-Scholes-Merton.',
    description: 'Accurately calculate European option theoretical prices and all primary Greek sensitivities (Delta, Gamma, Theta, Vega, Rho) using the Black-Scholes-Merton (BSM) analytical pricing model. Evaluates underlying stock price, strike price, days to expiration, risk-free interest rate, dividend yield, and implied volatility to assess risk exposure and hedging requirements.',
    keywords: [
      'black scholes calculator',
      'option greeks calculator',
      'delta gamma theta vega calculator',
      'options pricing model',
      'implied volatility bsm',
      'european call put option pricing',
      'options risk hedging greeks',
      'black scholes merton formula'
    ],
    iconName: 'Activity',
    isPopular: true,
    isNew: true,
    formulaDescription: 'd1 = [ln(S/K) + (r - q + σ²/2)t] / (σ√t); d2 = d1 - σ√t; Call = S e^(-qt) N(d1) - K e^(-rt) N(d2); Put = K e^(-rt) N(-d2) - S e^(-qt) N(-d1); Delta_call = e^(-qt) N(d1); Gamma = e^(-qt) N\'(d1)/(S σ √t); Theta = -[S e^(-qt) N\'(d1) σ / (2√t)] - r K e^(-rt) N(d2).',
    formulaLatex: 'C = S_0 e^{-qt} N(d_1) - K e^{-rt} N(d_2), \\quad P = K e^{-rt} N(-d_2) - S_0 e^{-qt} N(-d_1), \\quad d_1 = \\frac{\\ln(S_0/K) + (r - q + \\sigma^2/2)t}{\\sigma\\sqrt{t}}',
    relatedCalculatorIds: [
      'portfolio-rebalancing',
      'compound-interest',
      'capital-gains-tax-estimate',
      'roi-margin',
      'dca-crypto-stocks'
    ],
    stepByStepInstructions: [
      'Enter the Underlying Asset Spot Price ($S$) of the stock, ETF, or commodity index.',
      'Enter the Option Strike Price ($K$).',
      'Input the Days to Expiration (DTE), which the calculator converts to annualized time ($t = \\text{DTE}/365$).',
      'Specify the Implied Volatility (\\sigma \\%) annual standard deviation (e.g. 25% or 35%).',
      'Input the Risk-Free Interest Rate ($r$ % annual yield, typically US Treasury bill rate).',
      'Optionally input the Continuous Dividend Yield ($q$ % per year).',
      'Instantly review the Fair Theoretical Call and Put Prices alongside all First and Second Order Greeks (Delta $\\Delta$, Gamma $\\Gamma$, Theta $\\Theta$, Vega $\\mathcal{V}$, and Rho $\\rho$).'
    ],
    faqs: [
      {
        question: 'What is the Black-Scholes-Merton option pricing model?',
        answer: 'The Black-Scholes-Merton model is a mathematical framework for estimating the theoretical fair market price of European-style options contracts. It assumes asset prices follow a geometric Brownian motion with constant drift and volatility, and that there are no arbitrage opportunities or transaction costs.'
      },
      {
        question: 'What does Option Delta (Δ) measure?',
        answer: 'Delta measures the rate of change of the option price with respect to a $1.00 move in the underlying stock. A Call Delta of +0.60 means the call price will increase by approximately $0.60 if the underlying stock rises by $1.00. Delta also approximates the probability of the option expiring in-the-money (ITM).'
      },
      {
        question: 'What does Option Gamma (Γ) indicate?',
        answer: 'Gamma measures the rate of change of Delta per $1.00 change in the underlying stock price. High Gamma means Delta is highly sensitive to stock movement, which occurs most dramatically for at-the-money (ATM) options nearing expiration.'
      },
      {
        question: 'What is Theta (Θ) and why is it negative for long options?',
        answer: 'Theta represents the rate of time decay—the dollar amount an option loses in value each day as expiration approaches, assuming all other variables remain unchanged. Long options lose value over time, making Theta negative for buyers and positive for option sellers.'
      },
      {
        question: 'What is Vega (ν) in options trading?',
        answer: 'Vega measures how much the option price will change for every 1.0 percentage point change in implied volatility (IV). High Vega indicates the option is heavily influenced by swings in market volatility.'
      },
      {
        question: 'What is Rho (ρ) in option pricing?',
        answer: 'Rho measures the sensitivity of the option price to changes in the benchmark risk-free interest rate ($r$). Calls have positive Rho (rising rates increase call values), while Puts have negative Rho.'
      },
      {
        question: 'What is the difference between European and American options?',
        answer: 'European options can only be exercised on the expiration date itself, whereas American options can be exercised at any time prior to expiration. Black-Scholes is exact for European options and provides a close approximation for non-dividend-paying American options.'
      },
      {
        question: 'How does implied volatility differ from historical volatility?',
        answer: 'Historical volatility measures the actual price fluctuations of an asset in the past. Implied volatility (IV) is forward-looking and represents the market’s collective forecast of the asset\'s volatility over the lifespan of the option contract, backed out from current market prices.'
      }
    ],
    educationalDisclaimer: 'This Black-Scholes options calculator provides analytical theoretical pricing for European options contracts based on user inputs. Market bid-ask spreads, real-world volatility smiles, liquidity slippage, and early exercise risks for American options will differ from theoretical values. Trading options involves substantial risk of capital loss.'
  },
  {
    id: 'capital-gains-tax-estimate',
    title: 'Capital Gains Tax Estimator',
    slug: 'capital-gains-tax-estimate',
    categoryId: 'taxes',
    shortDescription: 'Calculate short-term vs long-term capital gains taxes, 3.8% NIIT surtax, and net profits on stocks, crypto, real estate, and equity.',
    description: 'Determine your exact capital gains tax liability under 2024 IRS rules. Accurately compares preferential Long-Term Capital Gains rates (0%, 15%, 20%) against Short-Term ordinary income brackets, models the 3.8% Net Investment Income Tax (NIIT IRC § 1411), factors in cost basis adjustments and allowable transaction fees, and projects state-level capital gains taxes.',
    keywords: [
      'capital gains tax calculator',
      'short term vs long term capital gains',
      'crypto capital gains tax calculator',
      'stock sale tax calculator',
      'net investment income tax niit',
      'real estate capital gains tax',
      'cost basis tax estimator',
      'capital gains tax brackets 2024'
    ],
    iconName: 'Receipt',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Net Gain = Selling Price - Cost Basis - Selling Fees; LTCG Tax = (Gain in 0% Bracket × 0%) + (Gain in 15% Bracket × 15%) + (Gain in 20% Bracket × 20%) + NIIT (3.8% on lesser of Gain or MAGI excess)',
    formulaLatex: 'G_{\\text{net}} = P_{\\text{sale}} - (C_{\\text{basis}} + F_{\\text{fees}}), \\quad T_{\\text{LTCG}} = \\sum_{j \\in \\{0,15,20\\}} G_j \\times r_j + 0.038 \\times \\min(G_{\\text{net}}, \\max(0, \\text{MAGI} - M_{\\text{thresh}}))',
    relatedCalculatorIds: [
      'federal-income-tax-bracket',
      'self-employment-tax-1099',
      '401k-roth-ira-comparison',
      'fire-number-calculator',
      'compound-interest'
    ],
    stepByStepInstructions: [
      'Select your Asset Holding Period: Long-Term (held for more than 1 calendar year for preferential 0%, 15%, or 20% tax rates) or Short-Term (held for 1 year or less, taxed at ordinary income tax rates).',
      'Enter the Gross Selling Price or total transaction proceeds received from your brokerage or buyer.',
      'Enter the Original Purchase Price / Cost Basis (including purchase price, commissions, reinvested dividends, or capital improvements).',
      'Input any allowable Selling Costs, Brokerage Commissions, Legal/Exchange Fees, or Transfer Taxes.',
      'Select your IRS Tax Filing Status (Single, Married Filing Jointly, Married Filing Separately, or Head of Household).',
      'Enter your Annual Ordinary Income / W-2 Salary to determine which LTCG and Net Investment Income Tax (NIIT) threshold tiers your capital gains fall into.',
      'Input your Estimated State Capital Gains Tax Rate (0% for no-income-tax states like TX/FL/WA, up to 13.3% for California).',
      'Review your Net Recognized Gain, Federal Capital Gains Tax, NIIT 3.8% Surtax, Net Cash Profit, and the Holding Period Tax Arbitrage comparison.'
    ],
    faqs: [
      {
        question: 'What is the difference between short-term and long-term capital gains?',
        answer: 'The distinction is based strictly on how long you held the asset before selling. Assets held for 1 year or less generate Short-Term Capital Gains, which are taxed at standard federal ordinary income tax rates (10% to 37%). Assets held for more than 1 year generate Long-Term Capital Gains, which enjoy preferential tax rates of 0%, 15%, or 20% depending on your total taxable income.'
      },
      {
        question: 'What are the 2024 Long-Term Capital Gains tax brackets?',
        answer: 'For tax year 2024, the 0% LTCG rate applies up to $47,025 for Single filers ($94,050 for Married Filing Jointly, $63,000 for Head of Household). The 15% rate applies to taxable income between $47,025 and $518,900 for Single ($94,050 to $583,750 for Married Joint). Taxable income above $518,900 for Single ($583,750 for Married Joint) is taxed at the maximum 20% LTCG rate.'
      },
      {
        question: 'What is the 3.8% Net Investment Income Tax (NIIT)?',
        answer: 'Enacted under IRC Section 1411, the Net Investment Income Tax (NIIT) is a 3.8% surtax levied on the lesser of your net investment income (capital gains, dividends, interest, rental income) OR the amount by which your Modified Adjusted Gross Income (MAGI) exceeds statutory limits: $200,000 for Single and Head of Household, $250,000 for Married Filing Jointly, or $125,000 for Married Filing Separately.'
      },
      {
        question: 'How is cost basis calculated for stocks, crypto, and real estate?',
        answer: 'Your cost basis is the total purchase price paid for the asset plus acquisition fees, commissions, and capital improvements (for real estate). For stocks and crypto, cost basis includes reinvested dividends and transaction exchange fees. Selling costs (e.g., brokerage commissions, transfer taxes) are subtracted from gross proceeds to calculate net recognized gain.'
      },
      {
        question: 'How do capital losses offset capital gains (Tax-Loss Harvesting)?',
        answer: 'Capital losses first offset capital gains of the same type (short-term losses against short-term gains, long-term losses against long-term gains), then net remaining losses offset the other type of gain. If you have a net capital loss for the year, you can deduct up to $3,000 ($1,500 for married filing separately) against ordinary income, carrying forward any excess loss indefinitely to future tax years.'
      },
      {
        question: 'What is the IRS Section 121 Primary Residence Real Estate Exclusion?',
        answer: 'Under Section 121 of the Internal Revenue Code, homeowners can exclude up to $250,000 of capital gain ($500,000 for married couples filing jointly) from the sale of their primary home, provided they owned and lived in the home as their primary residence for at least 2 of the 5 years preceding the sale date.'
      },
      {
        question: 'How does cryptocurrency selling or trading trigger capital gains taxes?',
        answer: 'The IRS treats cryptocurrency and virtual currency as property (Notice 2014-21). Selling crypto for fiat cash (USD), trading one cryptocurrency for another (e.g., BTC for ETH), or spending crypto to purchase goods/services are all taxable events that trigger short-term or long-term capital gains based on the difference between the fair market value and your cost basis.'
      },
      {
        question: 'How do state income taxes treat capital gains?',
        answer: 'Most states tax capital gains as ordinary income at their standard state income tax rates (ranging from 0% in states like Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, and Wyoming to over 13% in California). Some states offer partial exclusions or special rates for long-term investments.'
      }
    ],
    educationalDisclaimer: 'This capital gains tax estimator provides estimates based on 2024 IRS statutory tax tables, IRC § 1411 (NIIT), and general state tax rates. It does not account for specific complex tax situations such as Section 1031 like-kind exchanges, wash-sale rules (IRC § 1091), incentive stock options (ISO AMT), depreciation recapture (IRC § 1250), or qualified small business stock (QSBS IRC § 1202). Consult a CPA or licensed tax advisor for filing guidance.'
  },
  {
    id: 'federal-income-tax-bracket',
    title: 'Federal Income Tax Bracket Calculator',
    slug: 'federal-income-tax-calculator',
    categoryId: 'taxes',
    shortDescription: 'Calculate progressive federal tax liabilities, marginal brackets, effective tax rates, and net take-home pay.',
    description: 'Accurately project your 2024 progressive federal income tax obligations across Single, Married Filing Jointly, Married Filing Separately, and Head of Household statuses. Model pre-tax retirement deductions (401k/IRA/HSA), standard versus itemized deductions, and non-refundable tax credits with a full bracket-by-bracket liability breakdown.',
    keywords: [
      'federal income tax calculator',
      'tax brackets 2024',
      'marginal tax rate',
      'effective tax rate calculator',
      'progressive tax brackets',
      'standard deduction 2024',
      'net take home pay',
      'irs income tax brackets'
    ],
    iconName: 'Receipt',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Taxable Income = Gross Income - Pre-Tax Deductions - Max(Standard Deduction, Itemized Deductions); Total Tax = Σ (Taxable Income in Bracket_i × Rate_i) - Tax Credits; Effective Tax Rate % = (Total Tax / Gross Income) × 100',
    formulaLatex: 'T = \\sum_{i=1}^{k} \\max\\left(0, \\min(I_{\\text{taxable}}, B_{i,\\max}) - B_{i,\\min}\\right) \\times r_i - C',
    relatedCalculatorIds: [
      'self-employment-tax-1099',
      'capital-gains-tax-estimate',
      'hourly-to-salary',
      'overtime-pay',
      'retirement-401k'
    ],
    stepByStepInstructions: [
      'Enter your total Gross Annual Income from all taxable sources (W-2 wages, 1099 contracts, business profits, dividends).',
      'Select your IRS tax filing status: Single, Married Filing Jointly, Married Filing Separately, or Head of Household.',
      'Input any annual pre-tax payroll contributions made to traditional 401(k), Traditional IRA, HSA, or FSA accounts to lower your Adjusted Gross Income (AGI).',
      'Choose between the Standard Deduction (automatically calculated for 2024 tax year) or Itemized Schedule A Deductions (e.g., mortgage interest, state and local taxes up to SALT caps, charitable donations).',
      'Enter any applicable direct Tax Credits (such as Child Tax Credit, Clean Vehicle EV credit, or Lifetime Learning Credit).',
      'Review your calculated Total Federal Tax, Effective Tax Rate, Marginal Tax Bracket, and Estimated Monthly Take-Home Pay in the bracket breakdown table.'
    ],
    faqs: [
      {
        question: 'What is the difference between marginal tax rate and effective tax rate?',
        answer: 'Your marginal tax rate is the top tax bracket applied only to your last dollar of taxable income. Your effective tax rate is your actual total federal tax liability divided by your total gross income. Because the United States uses a tiered progressive tax system, your effective rate is almost always significantly lower than your marginal bracket.'
      },
      {
        question: 'What are the 2024 standard deduction amounts by filing status?',
        answer: 'For tax year 2024 (filed in 2025), the IRS standard deductions are: $14,600 for Single filers and Married Filing Separately, $29,200 for Married Filing Jointly, and $21,900 for Head of Household. Filers aged 65 and older or legally blind receive additional standard deduction amounts.'
      },
      {
        question: 'How do 401(k) and HSA contributions lower my federal tax bill?',
        answer: 'Pre-tax contributions to employer-sponsored 401(k) plans, traditional IRAs, Health Savings Accounts (HSAs), and Flexible Spending Accounts (FSAs) reduce your gross income before income taxes are assessed. For example, contributing $10,000 to a traditional 401(k) while in the 22% marginal tax bracket saves $2,200 in direct federal income taxes.'
      },
      {
        question: 'Does moving into a higher tax bracket reduce my total net take-home pay?',
        answer: 'No. Moving into a higher tax bracket never lowers your net take-home pay. Progressive tax brackets apply strictly to income earned within that specific income band. Only the portion of income that exceeds the threshold is taxed at the higher rate, while all preceding dollars remain taxed at their lower rates.'
      },
      {
        question: 'What is the difference between a tax deduction and a tax credit?',
        answer: 'A tax deduction reduces the total amount of your income subject to tax (e.g., a $1,000 deduction saves $220 if you are in the 22% bracket). A tax credit provides a direct, dollar-for-dollar reduction of your final tax liability (e.g., a $1,000 tax credit saves exactly $1,000 in taxes owed).'
      },
      {
        question: 'Does this calculator include FICA payroll taxes (Social Security and Medicare)?',
        answer: 'This tool calculates Federal Income Tax obligations under IRS tax brackets. Mandatory FICA payroll taxes—consisting of 6.2% Social Security (up to the $168,600 wage base in 2024) and 1.45% Medicare (plus 0.9% Additional Medicare Tax for high earners)—are calculated separately from federal income tax brackets.'
      },
      {
        question: 'When should I itemize deductions instead of taking the standard deduction?',
        answer: 'You should itemize deductions on IRS Schedule A only when the sum of your qualified deductible expenses—such as home mortgage interest, state and local taxes (SALT capped at $10,000), qualified medical expenses exceeding 7.5% of AGI, and charitable gifts—exceeds your filing status’s standard deduction threshold.'
      }
    ],
    educationalDisclaimer: 'Federal tax brackets, standard deductions, and rules shown reflect IRS guidelines for Tax Year 2024. This tool provides mathematical simulations for educational and financial estimation purposes and does not constitute official tax, accounting, or legal advice. Consult a certified public accountant (CPA) or enrolled agent for complex tax situations.'
  },
  {
    id: 'sales-tax-reverse',
    title: 'Reverse Sales Tax & VAT Gross-to-Net Calculator',
    slug: 'reverse-sales-tax-calculator',
    categoryId: 'taxes',
    shortDescription: 'Extract net pre-tax price, sales tax amount, or Value-Added Tax (VAT/GST) from any gross tax-inclusive receipt or total bill.',
    description: 'Calculate original pre-tax price, total sales tax, or Value Added Tax (VAT/GST/HST) embedded within a gross tax-inclusive total. Indispensable for accounting reconciliations, merchant invoicing, business expense reporting, and separating VAT from European/international receipts.',
    keywords: [
      'reverse sales tax calculator',
      'vat reverse calculator',
      'extract tax from total',
      'pre tax price calculator',
      'gross to net tax calculator',
      'gst reverse calculation',
      'sales tax backwards formula',
      'inclusive to exclusive tax'
    ],
    iconName: 'Percent',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Pre-Tax Price = Total Inclusive Price / (1 + Tax Rate); Tax Amount = Total Inclusive Price - Pre-Tax Price = Total × [Tax Rate / (1 + Tax Rate)].',
    formulaLatex: 'P_{\\text{pre-tax}} = \\frac{P_{\\text{inclusive}}}{1 + r_{\\text{tax}}}, \\quad T_{\\text{amount}} = P_{\\text{inclusive}} - P_{\\text{pre-tax}} = P_{\\text{inclusive}} \\cdot \\left(\\frac{r_{\\text{tax}}}{1 + r_{\\text{tax}}}\\right)',
    relatedCalculatorIds: [
      'sales-tax-tip',
      'discount-savings',
      'markup-margin',
      'self-employment-tax-1099',
      'federal-income-tax-bracket'
    ],
    stepByStepInstructions: [
      'Enter the Total Gross (Tax-Inclusive) Bill or Receipt Amount.',
      'Enter the Applicable Sales Tax or VAT/GST/HST Rate Percentage (e.g. 7.25% in CA, 20% in UK, 19% in Germany).',
      'Optionally select a quick jurisdiction preset (US Average 6.5%, UK VAT 20%, EU Standard 19%, Canada GST/HST 13%).',
      'Instantly view the extracted Net Pre-Tax Price, the exact Total Tax Paid, and the Effective Embedded Tax Ratio.',
      'Review the itemized Gross vs Net cost visual breakdown.'
    ],
    faqs: [
      {
        question: 'How do you calculate reverse sales tax from a final inclusive price?',
        answer: 'Divide the total tax-inclusive price by (1 + the tax rate as a decimal). For example, if your total receipt is $108.00 with an 8% sales tax, the pre-tax price is $108.00 / 1.08 = $100.00. The tax amount is $108.00 - $100.00 = $8.00.'
      },
      {
        question: 'Why can you not simply multiply the total price by the tax rate to find the tax?',
        answer: 'Because multiplying the gross total by the tax rate overstates the tax. Tax was originally calculated on the smaller, pre-tax base, not on the grand total. For an $8.00 tax on $100 (total $108), $108 × 8% = $8.64, which is mathematically incorrect.'
      },
      {
        question: 'What is the mathematical difference between tax-inclusive and tax-exclusive pricing?',
        answer: 'Tax-exclusive pricing (standard in the United States and Canada) displays prices before sales tax, with tax added at the register. Tax-inclusive pricing (standard for VAT/GST in the UK, Europe, Australia, and New Zealand) shows the consumer the final price with tax already built in.'
      },
      {
        question: 'How does reverse VAT calculation work on business expense reports?',
        answer: 'VAT-registered businesses can reclaim input VAT paid on business purchases. Reverse VAT extraction allows accountants to separate the deductible VAT portion from gross expense receipts for tax authority reporting.'
      },
      {
        question: 'What happens if multiple combined tax rates apply (state + county + city)?',
        answer: 'You add all statutory local tax rates together into a single combined composite rate before reversing. For example, 4% state tax + 2% county tax + 1.5% city tax = 7.5% total composite tax rate (divide total by 1.075).'
      },
      {
        question: 'How does this differ from the discount/markup reverse formula?',
        answer: 'Reverse sales tax is mathematically identical to finding wholesale cost given a retail price and a markup percentage: Cost = Price / (1 + Markup %).'
      },
      {
        question: 'Can this tool reverse compound or cumulative sales taxes?',
        answer: 'In most modern tax jurisdictions, sales taxes and VAT are assessed as a single tier on the pre-tax base. If cascading taxes apply, the combined total nominal rate is used for exact reverse separation.'
      },
      {
        question: 'How do rounding rules affect reverse tax calculations on small receipts?',
        answer: 'Tax authorities mandate rounding calculated tax up or to the nearest whole cent at the transaction line-item level. Fractional differences of ±$0.01 can occasionally occur due to line-by-line vs summary receipt rounding.'
      }
    ],
    educationalDisclaimer: 'This reverse sales tax and VAT calculator provides mathematical decompositions for financial estimation and accounting reconciliation. Always verify local tax authority statutes and official invoice requirements.'
  },
  {
    id: 'self-employment-tax-1099',
    title: 'Self-Employment 1099 Tax Estimator',
    slug: 'self-employment-tax-1099',
    categoryId: 'taxes',
    shortDescription: 'Estimate 15.3% Social Security & Medicare self-employment tax, federal income tax, and quarterly 1040-ES payments for freelancers and 1099 contractors.',
    description: 'Calculate your exact self-employment tax obligations for 1099-NEC contractors, freelancers, sole proprietors, and single-member LLCs. Accurately factors in the statutory 92.35% net earnings multiplier, 2024 Social Security wage cap ($168,600), 2.9% Medicare, 0.9% Additional Medicare surtax, 50% above-the-line SE tax deduction, Section 199A QBI deduction, and 1040-ES quarterly estimated tax payment schedule.',
    keywords: [
      'self employment tax calculator',
      '1099 tax calculator',
      'freelance tax calculator',
      'quarterly estimated taxes 1040 es',
      'social security medicare 1099',
      '1099 nec tax estimator',
      'independent contractor taxes',
      'schedule se tax calculator',
      'qbi deduction calculator'
    ],
    iconName: 'Briefcase',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Taxable SE Base = Net Schedule C Profit × 92.35%; Total SE Tax = (Min(Taxable SE Base, Remaining SS Cap) × 12.4%) + (Taxable SE Base × 2.9%) + Addl Medicare; Quarterly 1040-ES = Total Annual Tax / 4',
    formulaLatex: '\\text{SE Base} = P_{\\text{net}} \\times 0.9235, \\quad T_{\\text{SE}} = \\min(\\text{SE Base}, \\text{Cap}_{\\text{SS}} - W_2) \\times 0.124 + \\text{SE Base} \\times 0.029 + T_{\\text{med,addl}}',
    relatedCalculatorIds: [
      'federal-income-tax-bracket',
      '401k-roth-ira-comparison',
      'hourly-to-salary',
      'overtime-pay',
      'fire-number-calculator'
    ],
    stepByStepInstructions: [
      'Enter your total Gross 1099 Revenue from freelance clients, consulting contracts, 1099-NEC/1099-K forms, or sole proprietorship sales.',
      'Input your total Ordinary & Necessary Schedule C Business Expenses (mileage, home office, software, equipment, supplies, professional fees) to compute Net Business Profit.',
      'If you also worked as an employee during the tax year, enter your W-2 Wages. W-2 earnings count toward the $168,600 Social Security cap first, preventing double taxation on your 1099 income.',
      'Select your IRS Filing Status (Single, Married Filing Jointly, Married Filing Separately, or Head of Household) to apply the 2024 standard deduction and income tax brackets.',
      'Toggle the 20% Qualified Business Income (QBI Section 199A) deduction if your pass-through entity or sole proprietorship qualifies.',
      'Set your Estimated State & Local Income Tax rate (0% for states without income tax, up to 13% for high-tax states).',
      'Review your Total Self-Employment Tax, Federal Income Tax, Net Take-Home Pay, and the 4-quarter Form 1040-ES payment schedule.'
    ],
    faqs: [
      {
        question: 'What is Self-Employment (SE) Tax and why is it 15.3%?',
        answer: 'Self-employment tax consists of Social Security (12.4%) and Medicare (2.9%) taxes. Traditional W-2 employees split this 15.3% FICA burden equally with their employer (7.65% paid by employee, 7.65% paid by employer). When you are self-employed as a 1099 contractor or business owner, the IRS considers you both the employer and employee, requiring you to cover the full 15.3% combined rate.'
      },
      {
        question: 'Why is Self-Employment tax calculated on 92.35% of net profit instead of 100%?',
        answer: 'To make self-employment taxes fair compared to W-2 employment, the IRS allows you to subtract the equivalent 7.65% employer share before calculating your tax base. Multiplying your net profit by 92.35% (100% - 7.65%) ensures you are not paying self-employment tax on the money used to pay the employer half of the tax.'
      },
      {
        question: 'How do W-2 wages affect the Social Security tax cap on 1099 income?',
        answer: 'For tax year 2024, the Social Security wage cap is $168,600. If you earn W-2 wages from an employer, those wages count against the cap first. For example, if you earn $120,000 at a W-2 job, only $48,600 ($168,600 - $120,000) of your 1099 net earnings will be subject to the 12.4% Social Security tax. Any 1099 earnings above that threshold are exempt from Social Security tax, paying only the 2.9% Medicare tax.'
      },
      {
        question: 'What is the 50% above-the-line deduction for self-employment tax?',
        answer: 'You are allowed to deduct exactly half (50%) of your total calculated self-employment tax on Schedule 1 (Form 1040), Line 15. This deduction reduces your Adjusted Gross Income (AGI) before federal income taxes are calculated, lowering your overall income tax liability regardless of whether you claim the standard deduction or itemize.'
      },
      {
        question: 'What is the Section 199A Qualified Business Income (QBI) deduction?',
        answer: 'Created under the Tax Cuts and Jobs Act (TCJA), the Section 199A QBI deduction allows eligible sole proprietors, single-member LLCs, and pass-through entity owners to deduct up to 20% of their net qualified business income from their taxable income. For 2024, the full 20% deduction is available to single filers with taxable income under $191,950 ($383,900 for married couples filing jointly).'
      },
      {
        question: 'When are quarterly estimated tax payments (Form 1040-ES) due?',
        answer: 'Self-employed individuals must remit estimated taxes to the IRS in 4 equal quarterly installments: Q1 is due April 15; Q2 is due June 15; Q3 is due September 15; and Q4 is due January 15 of the following tax year. Failing to pay sufficient quarterly estimated taxes can trigger IRS underpayment penalties under IRC Section 6654.'
      },
      {
        question: 'What happens if my net self-employment earnings are under $400?',
        answer: 'If your net earnings from self-employment (Schedule C profit after business expenses) are less than $400 for the entire calendar year, you do not owe any self-employment tax and are not required to file Schedule SE (unless special church employee or statutory rules apply). However, you may still need to file a federal income tax return if your total gross income exceeds standard filing thresholds.'
      },
      {
        question: 'How can an S-Corporation election reduce self-employment taxes for higher earners?',
        answer: 'When a business earns substantial net profit (typically above $70,000–$100,000), electing S-Corp taxation allows the owner to split earnings between a "reasonable W-2 salary" and "shareholder distributions". FICA/SE taxes (15.3%) only apply to the W-2 salary portion, while distributions are exempt from SE tax, potentially saving thousands in payroll taxes annually.'
      }
    ],
    educationalDisclaimer: 'This self-employment tax estimator is designed for educational, budgeting, and tax planning purposes based on 2024 IRS statutory rules (Revenue Procedure 2023-34, Form 1040 Schedule SE, and Form 1040-ES). Actual tax liability may vary based on itemized deductions, state nexus, local self-employment taxes, and specific business deductions. Consult a Certified Public Accountant (CPA) or Enrolled Agent (EA) for official tax filing and advice.'
  },
  {
    id: 'pmi-removal-timeline',
    title: 'PMI Removal Timeline & 80% LTV Home Equity Calculator',
    slug: 'pmi-removal-calculator',
    categoryId: 'mortgage',
    shortDescription: 'Calculate the exact date and remaining payments until Private Mortgage Insurance (PMI) cancels at 80% and 78% LTV under the Homeowners Protection Act.',
    description: 'Determine the exact month and year your monthly Private Mortgage Insurance (PMI) premium drops off your conventional home loan. Models principal amortization down to 80% Loan-to-Value (borrower-requested cancellation) and 78% LTV (mandatory automatic termination under the federal Homeowners Protection Act of 1998 / HPA), plus models how extra principal payments or home market appreciation accelerate PMI elimination.',
    keywords: [
      'pmi removal calculator',
      'when will pmi drop off',
      '80 ltv pmi cancellation date',
      'homeowners protection act 78 ltv',
      'private mortgage insurance removal',
      'how to get rid of pmi early',
      'pmi savings extra principal',
      'mortgage equity pmi timeline'
    ],
    iconName: 'Home',
    isPopular: true,
    isNew: true,
    formulaDescription: '80% LTV Balance Target = Original Purchase Price × 0.80; 78% LTV Balance Target = Original Purchase Price × 0.78; Current LTV = (Remaining Balance / Original Price) × 100.',
    formulaLatex: 'B_{\\text{target 80}} = P_{\\text{purchase}} \\times 0.80, \\quad B_{\\text{target 78}} = P_{\\text{purchase}} \\times 0.78, \\quad \\text{LTV}_t = \\frac{B_t}{P_{\\text{purchase}}} \\times 100',
    relatedCalculatorIds: [
      'mortgage',
      'biweekly-mortgage-payoff',
      'mortgage-refinance-savings',
      'debt-to-income-dti-advanced',
      'va-loan-funding-fee'
    ],
    stepByStepInstructions: [
      'Enter the Original Home Purchase Price or appraised value when the mortgage was originated.',
      'Enter your Initial Loan Amount (or Down Payment percentage).',
      'Input your Fixed Annual Mortgage Interest Rate (Note APR) and Original Loan Term (typically 30 or 15 years).',
      'Enter your Monthly PMI Premium ($/month or annual % rate, typically 0.5% to 1.2% of loan).',
      'Optionally input an Extra Monthly Principal Payment to model accelerated equity accumulation.',
      'Optionally enter an Estimated Annual Home Appreciation Rate to project reappraisal-based cancellation.',
      'Review your exact 80% LTV (Borrower Cancellation) and 78% LTV (Automatic Termination) target balance thresholds and completion dates.',
      'Review total lifetime PMI premiums paid and cumulative interest saved through early cancellation.'
    ],
    faqs: [
      {
        question: 'What is Private Mortgage Insurance (PMI) and why is it charged?',
        answer: 'Private Mortgage Insurance (PMI) protects the conventional lender against financial loss if you default on your mortgage. Conventional lenders require PMI when borrowers make a down payment of less than 20% (Loan-to-Value greater than 80%).'
      },
      {
        question: 'When can I legally request PMI removal from my mortgage servicer?',
        answer: 'Under the federal Homeowners Protection Act of 1998 (HPA), you have the legal right to submit a written request to cancel PMI once your mortgage principal balance reaches exactly 80% of the original home value, provided you have a good payment history and no second liens.'
      },
      {
        question: 'When must a mortgage servicer automatically terminate PMI?',
        answer: 'Under the HPA, your servicer is legally mandated to automatically terminate PMI on the date your principal balance is scheduled to reach 78% of the original purchase price (based solely on the original amortization schedule), provided your mortgage payments are current.'
      },
      {
        question: 'Can I remove PMI early if my home market value has appreciated?',
        answer: 'Yes. Fannie Mae and Freddie Mac guidelines allow borrowers to request PMI cancellation based on current market value if they have built at least 20% to 25% equity (LTV of 75%–80% based on a new lender-ordered professional appraisal or BPO).'
      },
      {
        question: 'How do extra principal payments accelerate PMI removal?',
        answer: 'Every dollar paid toward principal balance directly lowers your loan balance without waiting for amortization. Paying an extra $100 to $300 per month can shave 2 to 4 years off your PMI timeline, saving thousands in insurance premiums and loan interest.'
      },
      {
        question: 'Does the Homeowners Protection Act apply to FHA loans?',
        answer: 'No. FHA loans do not use private mortgage insurance; they require government Mortgage Insurance Premiums (MIP). For modern FHA loans with less than 10% down, annual MIP is mandatory for the entire 30-year life of the loan. To remove MIP on an FHA loan, you must refinance into a conventional loan once you reach 20% equity.'
      },
      {
        question: 'What documentation is required to request PMI cancellation at 80% LTV?',
        answer: 'You must submit a written cancellation request to your mortgage loan servicer, demonstrate a 12-to-24 month on-time payment history (no 30-day late payments), verify no subordinate liens (like a HELOC), and possibly pay for a servicer-ordered property appraisal to verify value has not declined.'
      },
      {
        question: 'What is the "midpoint cancellation" rule under the HPA?',
        answer: 'If your loan balance has not yet reached 78% LTV due to loan modifications, the lender must terminate PMI on the first day of the month following the exact midpoint of your loan amortization schedule (e.g., month 181 on a 30-year / 360-month mortgage).'
      }
    ],
    educationalDisclaimer: 'This PMI removal timeline calculator models amortization projections under the federal Homeowners Protection Act (12 U.S.C. § 4901 et seq.) and Fannie Mae/Freddie Mac guidelines. Actual cancellation requires formal servicer approval and verification of loan good-standing.'
  },
  {
    id: 'va-loan-funding-fee',
    title: 'VA Home Loan Funding Fee & Monthly Payment Calculator',
    slug: 'va-loan-funding-fee-calculator',
    categoryId: 'mortgage',
    shortDescription: 'Calculate statutory VA funding fee rates (0% to 3.3%) based on down payment %, service history, and first-time vs subsequent use with disability exemptions.',
    description: 'Accurately calculate VA funding fee amounts, monthly mortgage principal & interest payments, and total financing costs for active-duty military, veterans, and surviving spouses. Incorporates statutory 2024 VA loan funding fee tables: first-time use (2.15% at 0% down), subsequent use (3.30% at 0% down), reduced rates for 5%+ and 10%+ down payments, 0% disability exemption, and fee roll-in financing.',
    keywords: [
      'va loan funding fee calculator',
      'va mortgage fee chart 2024',
      'veterans home loan calculator',
      'va funding fee disability exemption',
      'va first time vs subsequent use fee',
      'va zero down payment mortgage',
      'va loan funding fee financed',
      'military home loan payment'
    ],
    iconName: 'Award',
    isPopular: true,
    isNew: true,
    formulaDescription: 'VA Fee $ = Loan Base Principal × VA Fee Rate %; Total Loan Financed = Base Principal + (Financed VA Fee); Monthly P&I = Total Financed × [r(1+r)^n] / [(1+r)^n - 1].',
    formulaLatex: 'F_{\\text{VA}} = P_{\\text{base}} \\times r_{\\text{fee}}, \\quad P_{\\text{total}} = P_{\\text{base}} + F_{\\text{VA}}, \\quad M = P_{\\text{total}} \\cdot \\frac{r(1+r)^n}{(1+r)^n - 1}',
    relatedCalculatorIds: [
      'mortgage',
      'pmi-removal-timeline',
      'jumbo-mortgage-qualification',
      'debt-to-income-dti-advanced',
      'mortgage-refinance-savings'
    ],
    stepByStepInstructions: [
      'Enter the Home Purchase Price ($).',
      'Select your Down Payment percentage (0% zero-down, 5% to 9.99%, or 10%+).',
      'Select your VA Loan Usage History: "First-Time Use" (2.15% at 0% down) or "Subsequent Use" (3.30% at 0% down).',
      'Select your Service Category & Disability Status: Standard Military or Qualifying Service-Connected Disability (100% Fee Exemption).',
      'Choose whether to Finance the VA Funding Fee into the mortgage or pay it out-of-pocket at closing.',
      'Enter your Fixed Mortgage Interest Rate and Loan Term (typically 30 years).',
      'Review your exact statutory VA Funding Fee amount, Total Financed Loan Amount, and Monthly Principal & Interest Payment.'
    ],
    faqs: [
      {
        question: 'What is the VA loan funding fee and why does the VA charge it?',
        answer: 'The VA funding fee is a one-time statutory charge required by the US Department of Veterans Affairs on VA-backed home loans. The fee offsets the cost of the program to US taxpayers, allowing veterans and service members to obtain zero-down-payment mortgages with no monthly private mortgage insurance (PMI).'
      },
      {
        question: 'What are the official 2024 VA funding fee rates for home purchases?',
        answer: 'For first-time VA purchase loans: 0% down is 2.15%; 5% to 9.99% down is 1.50%; 10%+ down is 1.25%. For subsequent VA loan usage: 0% down is 3.30%; 5% to 9.99% down is 1.50%; 10%+ down is 1.25%.'
      },
      {
        question: 'Who is completely exempt from paying the VA funding fee?',
        answer: 'Veterans receiving VA compensation for a service-connected disability, service members with a memorandum rating before closing, Purple Heart recipients serving on active duty, and surviving spouses receiving Dependency and Indemnity Compensation (DIC) are 100% exempt from the VA funding fee.'
      },
      {
        question: 'Can the VA funding fee be rolled into the mortgage balance?',
        answer: 'Yes. The vast majority of VA loan borrowers choose to finance the funding fee directly into their total loan balance rather than paying it as an out-of-pocket cash closing cost.'
      },
      {
        question: 'Do VA loans require monthly mortgage insurance (PMI)?',
        answer: 'No. VA home loans never require monthly Private Mortgage Insurance (PMI) or monthly MIP, regardless of whether you put 0% down or 20% down. This makes monthly VA loan payments significantly lower than comparable conventional or FHA mortgages.'
      },
      {
        question: 'What are the VA funding fee rates for cash-out refinances vs IRRRL streamlinings?',
        answer: 'For a VA Interest Rate Reduction Refinance Loan (IRRRL / Streamline refinance), the funding fee is a flat 0.50% of the loan amount. For a VA Cash-Out Refinance, the fee is 2.15% for first-time use and 3.30% for subsequent use.'
      },
      {
        question: 'How does putting 5% or 10% down reduce the VA funding fee?',
        answer: 'Putting 5% down reduces the fee to 1.50% (saving $3,250 on a $500,000 purchase for a subsequent user). Putting 10% down drops the fee to 1.25%.'
      },
      {
        question: 'Is the VA funding fee tax-deductible on federal tax returns?',
        answer: 'Historically, VA funding fees could be deducted as mortgage insurance premiums under specific income thresholds. Consult a certified public accountant (CPA) regarding current IRS tax regulations for your filing year.'
      }
    ],
    educationalDisclaimer: 'This VA loan funding fee calculator incorporates official statutory rates from Title 38 of the United States Code (U.S.C. § 3729) and VA Circular 26-23-06. Final eligibility, certificate of eligibility (COE), and underwriting approvals are determined by the US Department of Veterans Affairs and approved VA lenders.'
  },
  {
    id: 'biweekly-mortgage-payoff',
    title: 'Bi-Weekly Mortgage Payoff Acceleration',
    slug: 'biweekly-mortgage-payoff',
    categoryId: 'mortgage',
    shortDescription: 'Calculate interest savings and years shaved off your home loan by making 26 bi-weekly half-payments per year.',
    description: 'Calculate how switching from traditional 12 monthly mortgage payments to 26 bi-weekly half-payments accelerates home equity buildup. By submitting one extra full monthly payment directly toward mortgage principal every calendar year, you shave 4 to 8 years off a 30-year mortgage and save tens of thousands in compounded interest.',
    keywords: [
      'biweekly mortgage calculator',
      'bi weekly mortgage payoff calculator',
      'extra principal payment calculator',
      'pay off 30 year mortgage early',
      'mortgage interest savings calculator',
      '26 biweekly payments per year',
      'accelerated equity buildup mortgage'
    ],
    iconName: 'Clock',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Biweekly Payment = Monthly Payment / 2; Annual Payments = 26 × (Monthly Payment / 2) = 13 Full Payments (1 Extra Principal Payment per Year); Amortization recalculated with 26 periodic balance reductions',
    formulaLatex: 'P_{\\text{biweekly}} = \\frac{P_{\\text{monthly}}}{2}, \\quad \\text{Balance}_{k} = \\text{Balance}_{k-1} \\times \\left(1 + \\frac{r}{26}\\right) - P_{\\text{biweekly}}',
    relatedCalculatorIds: [
      'mortgage',
      'mortgage-refinance-savings',
      'compound-interest',
      'sinking-fund',
      'fire-number-calculator'
    ],
    stepByStepInstructions: [
      'Enter your Current Mortgage Balance or original home loan principal amount.',
      'Enter your Fixed Annual Mortgage Interest Rate (Note APR).',
      'Select your Original Mortgage Amortization Term (15, 20, or 30 years).',
      'Optionally enter an Additional Extra Principal Payment per bi-weekly period to model aggressive debt acceleration.',
      'Review the Lifetime Interest Saved, Time Shaved Off Loan (Years & Months), and New Payoff Date.',
      'Examine the Side-by-Side Amortization Schedule comparing total interest, total home cost, and exact payment counts.'
    ],
    faqs: [
      {
        question: 'How does a bi-weekly mortgage payment plan work?',
        answer: 'Under a standard mortgage, you make 12 monthly payments per year. Under a true bi-weekly mortgage plan, you pay exactly half of your standard monthly payment every two weeks. Because there are 52 weeks in a year, you make 26 bi-weekly payments—the mathematical equivalent of 13 full monthly payments per year. That extra full payment goes directly toward principal balance reduction.'
      },
      {
        question: 'How many years can a bi-weekly mortgage shave off a 30-year loan?',
        answer: 'On a standard 30-year fixed mortgage with an interest rate between 6% and 7%, a bi-weekly payment schedule typically shaves between 4.5 and 6 years off the mortgage, allowing you to achieve debt freedom in roughly 24 to 25.5 years without dramatically increasing your monthly cash flow burden.'
      },
      {
        question: 'What is the difference between bi-weekly and bimonthly (semi-monthly) payments?',
        answer: 'Bi-weekly means paying every two weeks (26 payments per year, creating 13 full payments). Bimonthly or semi-monthly means paying twice a month (e.g., on the 1st and 15th), which totals only 24 half-payments (exactly 12 full payments per year). Semi-monthly payments do NOT create an extra payment and yield negligible interest savings compared to bi-weekly schedules.'
      },
      {
        question: 'Does my loan servicer automatically support bi-weekly payments?',
        answer: 'Not all loan servicers accept true bi-weekly payments directly. Some third-party bi-weekly programs charge setup fees or monthly administration fees. You can achieve the exact same financial result for free by making 12 regular monthly payments and adding 1/12th of your monthly principal and interest payment as an extra principal payment each month.'
      },
      {
        question: 'How do extra principal payments save money on mortgage interest?',
        answer: 'Mortgage interest is calculated based on the remaining unpaid principal balance. When extra principal is applied, the loan balance drops faster, meaning less interest is charged in all subsequent periods, causing an accelerating snowball effect where more of each regular payment goes toward principal.'
      },
      {
        question: 'Can I cancel or pause a bi-weekly mortgage strategy if finances get tight?',
        answer: 'Yes, if you manage the extra payments yourself (either through voluntary additional principal transfers or dedicated savings), you can pause or reduce the extra principal at any time without penalty or contract modifications.'
      },
      {
        question: 'Is it better to pay off my mortgage early or invest the extra cash in index funds?',
        answer: 'It depends on your mortgage interest rate and risk tolerance. Paying off a 6.5%–7.5% mortgage provides a guaranteed, risk-free after-tax return equal to your interest rate. If your mortgage rate is very low (e.g., 3%), investing excess cash in broad market index funds historically yields a higher long-term expected return (7%–10% annualized).'
      },
      {
        question: 'Does paying bi-weekly affect my mortgage escrow (taxes and homeowner insurance)?',
        answer: 'No. Property taxes and homeowners hazard insurance premiums are fixed annual costs collected into an escrow account. Your escrow portion is determined by your county tax assessment and insurance policy, not your principal amortization schedule.'
      }
    ],
    educationalDisclaimer: 'This bi-weekly mortgage payoff accelerator calculates mathematical amortization projections based on fixed interest compounding and 26 equal bi-weekly payments per year. Actual loan terms depend on your servicer payment processing rules and whether prepayment penalties apply. Verify your mortgage contract terms with your loan servicer.'
  },
  {
    id: 'jumbo-mortgage-qualification',
    title: 'Jumbo Mortgage Qualification, FHFA Conforming Limits & Rate Calculator',
    slug: 'jumbo-mortgage-calculator',
    categoryId: 'mortgage',
    shortDescription: 'Check 2024 FHFA conforming loan limit thresholds ($766,550 baseline / $1,149,825 high-cost), reserve requirements, and jumbo mortgage monthly payments.',
    description: 'Determine whether your home loan exceeds FHFA conforming limits and qualifies as a Jumbo mortgage. Calculates monthly principal, interest, property taxes, insurance, required post-closing liquidity cash reserves (6 to 12 months PITI), down payment requirements (typically 10% to 20%), maximum underwriting Debt-to-Income (DTI) caps, and interest rate spreads.',
    keywords: [
      'jumbo mortgage calculator',
      'conforming loan limit 2024',
      'fhfa jumbo threshold',
      'jumbo loan down payment requirement',
      'jumbo mortgage reserve assets',
      'luxury real estate mortgage calculator',
      'high balance vs jumbo mortgage',
      'jumbo loan dti requirement'
    ],
    iconName: 'DollarSign',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Conforming Baseline Limit = $766,550 (High-Cost Limit: $1,149,825); Jumbo Excess = max(0, Loan Amount - Conforming Limit); Required Liquid Reserves = Monthly PITI × Required Reserve Months (6-12 mos).',
    formulaLatex: '\\text{Loan Type} = \\begin{cases} \\text{Conforming} & \\text{if } P \\le L_{\\text{FHFA}} \\\\ \\text{Jumbo} & \\text{if } P > L_{\\text{FHFA}} \\end{cases}, \\quad R_{\\text{reserves}} = \\text{PITI} \\times N_{\\text{months}}',
    relatedCalculatorIds: [
      'mortgage',
      'pmi-removal-timeline',
      'va-loan-funding-fee',
      'debt-to-income-dti-advanced',
      'mortgage-refinance-savings'
    ],
    stepByStepInstructions: [
      'Enter the Target Home Purchase Price ($).',
      'Enter your Down Payment percentage or cash amount (typically 10%, 15%, or 20%+ for Jumbo).',
      'Select your Geographic County Classification: Baseline US County ($766,550 limit) or Designated High-Cost Area ($1,149,825 limit).',
      'Enter your Fixed Jumbo Mortgage Interest Rate (Note APR) and Amortization Term (30 or 15 years).',
      'Input estimated Annual Property Tax and Homeowners Hazard Insurance rates.',
      'Enter your Liquid Asset Cash Reserves (checking, savings, non-retirement brokerage, and vested retirement assets).',
      'Review your Loan Classification (Conforming, High-Balance, or Jumbo), Total Monthly PITI Payment, and Required Post-Closing Liquidity Reserve Cushion (Months of PITI).'
    ],
    faqs: [
      {
        question: 'What is a Jumbo mortgage and what is the 2024 conforming limit?',
        answer: 'A Jumbo mortgage is a non-conforming home loan whose principal amount exceeds the maximum limits established by the Federal Housing Finance Agency (FHFA) for purchase by Fannie Mae and Freddie Mac. For 2024, the baseline conforming loan limit is $766,550 for a one-unit single-family home (stretching up to $1,149,825 in designated high-cost counties).'
      },
      {
        question: 'What credit score is required to qualify for a Jumbo loan?',
        answer: 'Because jumbo loans cannot be sold to Fannie Mae or Freddie Mac, lenders assume greater risk. Most lenders require a minimum FICO credit score of 700 to 720, with the most competitive interest rates reserved for borrowers with scores of 740 to 760+.'
      },
      {
        question: 'How much down payment is required for a Jumbo mortgage?',
        answer: 'While conforming conventional loans allow down payments as low as 3%–5%, Jumbo loans typically require a minimum down payment of 10% to 20%. Loans exceeding $1.5M to $2M often mandate 20% to 30% down.'
      },
      {
        question: 'What are post-closing cash reserve requirements on Jumbo loans?',
        answer: 'Jumbo underwriters require borrowers to demonstrate proof of liquid post-closing asset reserves—typically 6 to 12 months (and up to 18–24 months for multi-million dollar loans) of full monthly PITI payments in verified checking, savings, or marketable brokerage accounts after paying closing costs and down payment.'
      },
      {
        question: 'What is the maximum Debt-to-Income (DTI) ratio for a Jumbo mortgage?',
        answer: 'Underwriters generally cap Debt-to-Income ratios for Jumbo loans at 43% (and strictly at 36% to 40% for larger loan tiers or lower credit tiers), which is stricter than conforming loans that can reach 45%–50% through automated underwriting.'
      },
      {
        question: 'Are Jumbo mortgage interest rates higher or lower than conforming rates?',
        answer: 'Historically, Jumbo rates were higher than conforming rates. In recent market cycles, Jumbo rates frequently trade on par with or even slightly below conforming rates because jumbo borrowers possess exceptionally high credit scores and large asset deposits with the lending institutions.'
      },
      {
        question: 'What is a "High-Balance / Super-Conforming" mortgage?',
        answer: 'In designated high-cost housing markets (such as NYC, the SF Bay Area, Los Angeles, and Hawaii), FHFA allows conforming loans between the $766,550 baseline and $1,149,825 ceiling. These "High-Balance" loans follow Fannie Mae conforming underwriting rather than portfolio Jumbo rules.'
      },
      {
        question: 'Can you use a second mortgage (piggyback loan) to avoid a Jumbo loan?',
        answer: 'Yes. An 80-10-10 piggyback structure allows a buyer to take a conforming first mortgage up to the limit (80%), a second mortgage/HELOC (10%), and put 10% down in cash, effectively avoiding jumbo underwriting guidelines and PMI.'
      }
    ],
    educationalDisclaimer: 'This Jumbo mortgage qualification calculator uses 2024 FHFA conforming limits and standard portfolio underwriting benchmarks. Private mortgage lenders establish proprietary portfolio overlays for credit scores, down payment minimums, and post-closing asset reserve requirements.'
  },
  {
    id: 'debt-to-income-dti-advanced',
    title: 'Advanced Debt-to-Income (DTI) Calculator (Mortgage Underwriting)',
    slug: 'debt-to-income-dti-advanced',
    categoryId: 'loans',
    shortDescription: 'Calculate Front-End vs Back-End DTI ratios and maximum allowable housing payments for Conventional, FHA, VA, and Jumbo mortgages.',
    description: 'Calculate your Front-End (Housing Ratio) and Back-End (Total Debt Ratio) Debt-to-Income percentages according to Fannie Mae, Freddie Mac, FHA, and VA mortgage underwriting guidelines. Accurately determines your maximum allowable monthly mortgage payment under the 28/36 and 31/43 rules.',
    keywords: [
      'debt to income calculator',
      'dti calculator mortgage',
      'front end back end dti ratio',
      'fannie mae dti limit',
      'fha debt to income ratio calculator',
      'mortgage qualification dti',
      '28 36 rule mortgage calculator'
    ],
    iconName: 'PieChart',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Front-End DTI % = (Proposed Housing PITI + HOA / Gross Monthly Income) × 100; Back-End DTI % = (Total Monthly Debt Obligations / Gross Monthly Income) × 100; Conventional Max Housing = min(0.28 × GMI, 0.36 × GMI - NonHousingDebt)',
    formulaLatex: '\\text{DTI}_{\\text{Front}} = \\frac{\\text{PITI} + \\text{HOA}}{\\text{GMI}} \\times 100, \\quad \\text{DTI}_{\\text{Back}} = \\frac{\\text{PITI} + \\text{HOA} + \\sum \\text{Debts}}{\\text{GMI}} \\times 100',
    relatedCalculatorIds: [
      'mortgage',
      'auto-lease-vs-buy',
      'biweekly-mortgage-payoff',
      'credit-card-payoff',
      'student-loan-income-driven-idr'
    ],
    stepByStepInstructions: [
      'Enter the Primary Borrower and Co-Borrower Gross Monthly Base Incomes.',
      'Add Documented Monthly Overtime, Bonuses, Commissions, and Other Stable Incomes (e.g. rental profit, dividend income).',
      'Enter the Proposed Housing Expenses: Principal & Interest, Monthly Property Taxes, Homeowners Insurance, HOA Dues, and PMI.',
      'Enter all Monthly Non-Housing Debt Minimums: Auto Loans, Student Loans, Credit Card Minimums, and Personal Loans.',
      'Review your Front-End DTI % (Benchmark: ≤ 28%) and Back-End DTI % (Benchmark: ≤ 36%–43%).',
      'Examine the Loan Program Underwriting Table to check qualification status across Conventional, FHA, and VA programs.',
      'Review your Net Discretionary Cash Flow and Maximum Allowable Monthly Housing Budget.'
    ],
    faqs: [
      {
        question: 'What is Debt-to-Income (DTI) ratio and why do mortgage lenders care?',
        answer: 'The Debt-to-Income (DTI) ratio is the percentage of your gross monthly income that goes toward paying monthly debt obligations. Lenders use DTI as a primary risk indicator to determine if you can comfortably afford mortgage payments without financial strain or default.'
      },
      {
        question: 'What is the difference between Front-End DTI and Back-End DTI?',
        answer: 'Front-End DTI (the Housing Ratio) calculates the percentage of your gross monthly income dedicated exclusively to housing costs (Principal, Interest, Property Taxes, Homeowners Insurance, HOA, and PMI). Back-End DTI (the Total Debt Ratio) includes housing costs PLUS all other recurring debt minimums (car loans, student loans, credit card minimums, and personal loans).'
      },
      {
        question: 'What is the 28/36 rule in mortgage underwriting?',
        answer: 'The 28/36 rule is a classic underwriting guideline for conventional home loans. It states that your housing payment should not exceed 28% of your gross monthly income (Front-End DTI), and your total monthly debt payments should not exceed 36% of your gross income (Back-End DTI).'
      },
      {
        question: 'What is the maximum DTI allowed to get approved for a mortgage?',
        answer: 'For Conventional loans (Fannie Mae/Freddie Mac), automated underwriting systems (Desktop Underwriter) frequently approve Back-End DTIs up to 45% (and up to 50% with strong credit and cash reserves). FHA loans permit standard DTIs of 31/43, but can stretch up to 50% (and occasionally 56.9% with automated approval). VA loans target 41% with no strict front-end cap.'
      },
      {
        question: 'Do living expenses like groceries and utilities count toward my DTI?',
        answer: 'No. Household utility bills, groceries, cell phone plans, streaming subscriptions, and health insurance are NOT included in your official DTI. Underwriting only counts contractual debt obligations that appear on your credit report, plus mandatory alimony/child support.'
      },
      {
        question: 'How do credit card balances affect my DTI ratio?',
        answer: 'Only the minimum required monthly payment listed on your credit report affects your DTI—not your total outstanding balance. Paying off or significantly reducing high-minimum credit cards immediately lowers your Back-End DTI and increases your maximum borrowing power.'
      },
      {
        question: 'How are student loans calculated in DTI if they are in deferment or on IDR plans?',
        answer: 'Under Fannie Mae and Freddie Mac rules, if your credit report reflects an Income-Driven Repayment (IDR) payment of $0/month, lenders can use $0. For deferred loans without a documented IDR payment, lenders typically calculate 0.5% to 1.0% of the total loan balance as the hypothetical monthly obligation.'
      },
      {
        question: 'How can I quickly lower my DTI before applying for a mortgage?',
        answer: 'To rapidly lower your DTI: 1) Pay off small-balance installment or auto loans with high monthly payments; 2) Pay down credit card balances to reduce minimum payments; 3) Add a creditworthy co-borrower with stable income; 4) Increase your down payment to reduce monthly loan principal and eliminate PMI.'
      }
    ],
    educationalDisclaimer: 'This Debt-to-Income calculator provides automated underwriting estimations based on standard Fannie Mae, Freddie Mac, FHA, and VA guidelines. Final mortgage loan approval is subject to full credit underwriting, property appraisal, asset verification, and lender overlays.'
  },
  {
    id: 'student-loan-income-driven-idr',
    title: 'Income-Driven Repayment (IDR / SAVE)',
    slug: 'student-loan-income-driven-idr',
    categoryId: 'loans',
    shortDescription: 'Calculate federal student loan payments under SAVE, PAYE, IBR, and ICR plans with 2024 HHS poverty line guidelines.',
    description: 'Calculate your exact monthly payments and interest subsidies across federal Income-Driven Repayment (IDR) plans including the SAVE Plan, PAYE, IBR, and ICR. Incorporates 2024 Federal Poverty Guidelines (HHS FPL), 225% poverty line income exemptions, the undergraduate 5% / graduate 10% weighted rate structure, and 100% government unpaid interest waivers.',
    keywords: [
      'student loan save plan calculator',
      'idr income driven repayment calculator',
      'student loan forgiveness calculator',
      'paye vs save plan',
      'discretionary income poverty line calculator',
      'federal student loan monthly payment',
      'save interest subsidy calculator'
    ],
    iconName: 'GraduationCap',
    isPopular: true,
    isNew: true,
    formulaDescription: 'SAVE Monthly = max(0, AGI - 2.25 × FPL) × (0.05 × Undergrad% + 0.10 × Grad%) / 12; Unpaid Interest Subsidy = max(0, Monthly Interest Accrual - Monthly Payment)',
    formulaLatex: 'P_{\\text{SAVE}} = \\frac{\\max(0, \\text{AGI} - 2.25 \\times \\text{FPL}) \\times (0.05 w_{\\text{ug}} + 0.10 w_{\\text{grad}})}{12}, \\quad S_{\\text{interest}} = \\max(0, I_{\\text{monthly}} - P_{\\text{SAVE}})',
    relatedCalculatorIds: [
      'student-loan-refinance',
      'personal-loan-payment',
      'compound-interest',
      'sinking-fund',
      'fire-number-calculator'
    ],
    stepByStepInstructions: [
      'Enter your Total Federal Student Loan Balance across Direct Subsidized, Unsubsidized, and Grad PLUS loans.',
      'Enter your Weighted Average Loan Interest Rate (fixed federal statutory rate).',
      'Specify your Undergraduate Loan Portion % (SAVE charges 5% on undergrad debt vs 10% on graduate debt).',
      'Enter your Annual Adjusted Gross Income (AGI) from Line 11 of your IRS Form 1040.',
      'Select your Tax Household Size (yourself, your spouse if filing jointly, and qualifying dependents).',
      'Select your Geographic Region (48 Contiguous States, Alaska, or Hawaii) to apply accurate HHS Federal Poverty Guidelines.',
      'Compare monthly payments, interest waivers, and total payoff timelines across SAVE, PAYE, IBR, ICR, and 10-Year Standard plans.'
    ],
    faqs: [
      {
        question: 'What is the Saving on a Valuable Education (SAVE) Plan?',
        answer: 'The SAVE Plan is the newest income-driven repayment (IDR) plan introduced by the US Department of Education, replacing REPAYE. It increases the income exemption from 150% to 225% of the federal poverty line, reduces undergraduate payments from 10% to 5% of discretionary income, and completely eliminates unpaid accrued interest as long as you make your monthly required payment.'
      },
      {
        question: 'How is discretionary income calculated under the SAVE Plan in 2024?',
        answer: 'Discretionary income under SAVE is the difference between your Adjusted Gross Income (AGI) and 225% of the annual HHS Federal Poverty Guideline for your family size. For a single borrower in the contiguous US (2024 FPL = $15,060), 225% equals $33,885. Any income below $33,885 is completely exempt from loan payments, resulting in a $0/month payment.'
      },
      {
        question: 'How does the 100% SAVE interest subsidy work?',
        answer: 'Under traditional loan amortization, if your required monthly payment is less than the monthly interest accrued, your balance grows (negative amortization). Under the SAVE plan, the federal government waives 100% of the remaining unpaid monthly interest. If your monthly accrued interest is $350 and your SAVE payment is $100, the remaining $250 of interest is eliminated, keeping your principal balance from increasing.'
      },
      {
        question: 'How long until student loans are forgiven under IDR and SAVE?',
        answer: 'Under the SAVE plan, borrowers with initial balances of $12,000 or less receive loan forgiveness after 10 years (120 qualifying payments), with each additional $1,000 adding 1 year. For higher undergraduate balances, forgiveness occurs after 20 years. Borrowers with graduate loans receive forgiveness after 25 years.'
      },
      {
        question: 'What is the difference between PAYE, IBR, and SAVE?',
        answer: 'PAYE and IBR exempt 150% of the poverty line and cap monthly payments at 10% (or 15% for older IBR loans) of discretionary income, with a maximum payment capped at the standard 10-year repayment amount. SAVE exempts 225% of the poverty line, charges 5% to 10% discretionary income, offers a 100% interest waiver, but does NOT cap payments at the 10-year standard amount for very high earners.'
      },
      {
        question: 'How does marital status and filing separately affect IDR payments?',
        answer: 'If you file taxes as Married Filing Separately, the SAVE, PAYE, and IBR plans calculate your monthly payment based solely on your individual AGI, excluding your spouse income. If you file Married Filing Jointly, combined household income and joint federal debt are used to calculate the payment.'
      },
      {
        question: 'Do $0 monthly IDR payments count toward Public Service Loan Forgiveness (PSLF)?',
        answer: 'Yes. If your calculated discretionary income results in a $0 monthly payment under an IDR plan, every $0 payment counts as a full qualifying on-time monthly payment toward both IDR 20/25-year forgiveness and Public Service Loan Forgiveness (PSLF 10-year / 120-payment forgiveness).'
      },
      {
        question: 'Are forgiven student loan balances taxed as income by the IRS?',
        answer: 'Under the American Rescue Plan Act, student loan forgiveness is federally tax-free through December 31, 2025. Unless extended by Congress, IDR balance forgiveness after 2025 may be treated as taxable ordinary income (PSLF forgiveness remains permanently tax-free under IRC § 108(f)).'
      }
    ],
    educationalDisclaimer: 'This IDR and SAVE plan estimator provides estimates based on 2024 HHS Federal Poverty Guidelines and Department of Education statutory repayment regulations. It is designed for educational guidance and does not guarantee official servicers repayment determinations or current judicial litigation stays. Verify plan enrollment and loan eligibility on StudentAid.gov.'
  },
  {
    id: 'auto-lease-vs-buy',
    title: 'Auto Lease vs Buy Decision Matrix',
    slug: 'auto-lease-vs-buy',
    categoryId: 'loans',
    shortDescription: 'Compare net true costs of leasing a vehicle vs purchasing with financing over 2 to 5 year horizons.',
    description: 'Perform a comprehensive financial comparison between leasing and purchasing a vehicle. Evaluates capitalized cost, residual values, money factor (rent charge), sales taxes, depreciation schedules, amortization equity curves, and opportunity costs to provide an objective true-cost recommendation.',
    keywords: [
      'lease vs buy car calculator',
      'car leasing vs financing',
      'money factor to apr calculator',
      'auto residual value calculator',
      'car lease depreciation fee',
      'vehicle equity retention calculator',
      'true cost of leasing a car'
    ],
    iconName: 'Car',
    isPopular: true,
    formulaDescription: 'Lease Payment = (Cap Cost - Residual) / Term + (Cap Cost + Residual) × Money Factor; Purchase Net Cost = Total Loan Payments - Ending Vehicle Market Equity',
    formulaLatex: 'P_{\\text{lease}} = \\frac{C_{\\text{cap}} - V_{\\text{res}}}{n} + (C_{\\text{cap}} + V_{\\text{res}}) \\times \\text{MF}, \\quad C_{\\text{net, buy}} = \\sum P_{\\text{loan}} + D - (V_{\\text{resale}} - B_{\\text{rem}})',
    relatedCalculatorIds: [
      'auto-loan',
      'compound-interest',
      'roi-margin',
      'sinking-fund',
      'credit-card-payoff'
    ],
    stepByStepInstructions: [
      'Select your Evaluation Horizon (24, 36, 48, or 60 months) to model identical comparison timeframes.',
      'Enter the Negotiated Vehicle Price / MSRP agreed upon with the dealer.',
      'Input your Upfront Down Payment or Trade-In Equity.',
      'Enter your Local Sales Tax Rate (state and municipal auto tax).',
      'Under Lease Terms, review or customize the Lease Term, Residual Value % (contracted by lessor), Money Factor (convertible to APR via MF × 2400), and Acquisition / Disposition Fees.',
      'Under Purchase Terms, set your Auto Loan Term (months), Loan Interest Rate (APR %), and Projected Resale Market Value % at the end of the evaluation horizon.',
      'Analyze the Side-by-Side Financial Ledger to compare Monthly Cash Flows, Total Cash Outflows, Retained Vehicle Equity, and True Net Cost.'
    ],
    faqs: [
      {
        question: 'How do you convert an auto lease Money Factor to an equivalent APR?',
        answer: 'To convert a lease money factor to an annual percentage rate (APR), multiply the money factor by 2,400. For example, a money factor of 0.0025 equals an APR of 6.00% (0.0025 × 2400 = 6.0%). Conversely, divide an APR by 2,400 to find the equivalent money factor.'
      },
      {
        question: 'What is a vehicle residual value in a lease contract?',
        answer: 'The residual value is the predetermined estimated fair market value of the vehicle at the end of the lease term, established by the leasing financial institution (lessor). Expressed as a percentage of the original MSRP, a higher residual value lowers your monthly depreciation payments.'
      },
      {
        question: 'Why does buying often build more wealth than leasing over time?',
        answer: 'When you purchase a vehicle, each monthly loan payment reduces loan principal and builds equity. Once the loan is fully paid off, you own a debt-free asset with cash value. When leasing, 100% of your payments cover depreciation and rent charges, leaving you with $0 equity when the vehicle is returned.'
      },
      {
        question: 'When does leasing make more financial sense than buying?',
        answer: 'Leasing can be advantageous if: 1) You replace vehicles every 2–3 years and prefer to always drive under factory warranty; 2) You use the vehicle for business and can claim tax deductions for lease payments; 3) You want lower monthly cash flow obligations without tying up capital; or 4) The manufacturer offers heavy lease subvention subsidies (inflated residuals or near-zero money factors).'
      },
      {
        question: 'How is sales tax calculated on a leased car versus a purchased car?',
        answer: 'In most US states, sales tax on a lease is charged only on each monthly payment (depreciation + finance charge). When buying a vehicle, sales tax is usually charged upfront on the full purchase price (minus any trade-in credit in eligible states).'
      },
      {
        question: 'What are lease acquisition and disposition fees?',
        answer: 'An acquisition fee (typically $595 to $1,095) is charged by the leasing bank at inception to originate the lease contract. A disposition fee (typically $350 to $500) is charged at lease termination to cover the cost of cleaning, inspecting, and transporting the returned vehicle to auction (often waived if you purchase the vehicle or lease another from the same brand).'
      },
      {
        question: 'What happens if I exceed the annual mileage limit on a lease?',
        answer: 'Standard lease agreements allow 10,000, 12,000, or 15,000 miles per year. Exceeding this limit incurs excess mileage penalties at lease return, typically ranging from $0.15 to $0.30 per mile over the limit.'
      },
      {
        question: 'Can I purchase my leased vehicle at the end of the term (Lease Buyout)?',
        answer: 'Yes. Every closed-end lease includes a contractual purchase option price equal to the predetermined residual value plus any applicable purchase option fee. If the actual used car market value is higher than the residual value, exercising your buyout option captures positive equity.'
      }
    ],
    educationalDisclaimer: 'This auto lease versus buy decision matrix provides financial estimates based on standard closed-end auto lease formulas and loan amortization schedules. It does not factor in individual auto insurance variations, excess mileage surcharges, vehicle wear-and-tear penalties, or business tax write-offs. Consult a financial advisor or tax specialist regarding business vehicle deductions.'
  },
  {
    id: 'startup-burn-rate',
    title: 'Startup Burn Rate & Cash Runway',
    slug: 'startup-burn-rate-calculator',
    categoryId: 'business',
    shortDescription: 'Calculate gross/net monthly cash burn, zero-cash date, and extended runway forecasts.',
    description: 'Determine exact months until cash depletion based on operating cash balance, gross monthly expenses, and recurring revenue. Model hiring plans, revenue growth scenarios, and runway extension milestones for venture capital fundraising.',
    keywords: [
      'startup burn rate calculator',
      'cash runway calculator',
      'gross burn vs net burn',
      'zero cash date',
      'saas cash runway',
      'venture capital runway',
      'startup operating expenses'
    ],
    iconName: 'Flame',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Net Monthly Burn = Gross Operating Expenses - Monthly Cash Receipts; Cash Runway (Months) = Total Cash Balance / Net Monthly Burn',
    formulaLatex: '\\text{Net Burn} = \\text{OpEx} - \\text{Revenue}, \\quad \\text{Runway (Months)} = \\frac{\\text{Cash Balance}}{\\text{Net Monthly Burn}}',
    relatedCalculatorIds: [
      'recurring-revenue-mrr',
      'customer-acquisition-cost-cac',
      'customer-lifetime-value-clv',
      'roi-margin',
      'hourly-to-salary'
    ],
    stepByStepInstructions: [
      'Enter your Current Total Cash & Liquid Reserves ($).',
      'Enter your Gross Monthly Operating Expenses (payroll, server costs, rent, marketing).',
      'Enter your Monthly Cash Revenue / Receipts ($).',
      'Review your Net Monthly Cash Burn Rate (negative cash flow).',
      'Examine your Cash Runway in Months and forecasted Zero-Cash Depletion Date.',
      'Test growth scenarios or expense reductions to see how they extend your fundraising window.'
    ],
    faqs: [
      {
        question: 'What is the difference between Gross Burn and Net Burn?',
        answer: 'Gross Burn is the absolute total dollar amount of operating expenses spent each month (payroll, rent, software subscriptions, cloud hosting). Net Burn is Gross Burn minus total monthly cash revenue. If your startup spends $80k/mo and makes $30k/mo, Gross Burn is $80k and Net Burn is $50k.'
      },
      {
        question: 'What is a healthy cash runway for an early-stage startup?',
        answer: 'Venture capitalists and financial advisors typically recommend maintaining 18 to 24 months of cash runway. This provides 12 to 18 months to execute product milestones and 6 months to run a competitive fundraising process before hitting critical cash levels.'
      },
      {
        question: 'How does hiring new employees affect runway?',
        answer: 'Payroll is usually 70–80% of a technology startup\'s expenses. Adding a $120k salary employee (with ~25% benefits and payroll taxes) increases monthly burn by $12,500, which can reduce an 18-month runway by several months.'
      },
      {
        question: 'What should a startup founder do when runway drops below 6 months?',
        answer: 'When runway dips under 6 months without signed fundraising term sheets, founders should immediately initiate expense reduction measures (freezing hiring, renegotiating vendor contracts) and explore bridge financing from existing investors.'
      },
      {
        question: 'How do annual upfront customer contracts impact cash runway?',
        answer: 'Annual upfront billing brings full cash payments forward into your bank account immediately, increasing your current cash balance and artificially lengthening cash runway compared to monthly invoicing.'
      },
      {
        question: 'What is "Default Alive" vs "Default Dead"?',
        answer: 'Paul Graham coined these terms: A startup is "Default Alive" if its current growth rate and margins will allow it to reach profitability before running out of existing cash reserves. It is "Default Dead" if it will run out of cash before breaking even without additional equity financing.'
      }
    ],
    educationalDisclaimer: 'This startup runway calculator provides financial estimations based on linear burn rates. It does not account for lumpy capital expenditures, seasonal revenue volatility, or sudden macroeconomic shifts.'
  },
  {
    id: 'customer-acquisition-cost-cac',
    title: 'Customer Acquisition Cost (CAC) & LTV',
    slug: 'cac-ltv-calculator',
    categoryId: 'business',
    shortDescription: 'Calculate blended/paid CAC, CAC payback period in months, and LTV:CAC efficiency ratios.',
    description: 'Evaluate marketing & sales spend efficiency against new customer acquisition volume. Benchmark customer acquisition costs, gross margin payback periods, and unit economics against top SaaS standards.',
    keywords: [
      'cac calculator',
      'customer acquisition cost',
      'ltv cac ratio',
      'cac payback period',
      'saas unit economics',
      'blended cac vs paid cac',
      'marketing efficiency ratio'
    ],
    iconName: 'Users',
    isPopular: true,
    isNew: true,
    formulaDescription: 'CAC = Total Marketing & Sales Spend / New Customers Acquired; Payback Period (Months) = CAC / (ARPU × Gross Margin %)',
    formulaLatex: '\\text{CAC} = \\frac{\\text{Sales \\& Mktg Spend}}{\\text{New Customers}}, \\quad \\text{Payback} = \\frac{\\text{CAC}}{\\text{ARPU} \\cdot \\text{Margin}\\%}, \\quad \\text{Ratio} = \\frac{\\text{LTV}}{\\text{CAC}}',
    relatedCalculatorIds: [
      'customer-lifetime-value-clv',
      'recurring-revenue-mrr',
      'startup-burn-rate',
      'roi-margin'
    ],
    stepByStepInstructions: [
      'Enter your Total Sales & Marketing Spend (ad spend, sales salaries, commissions, tooling) for a given period.',
      'Enter the Number of New Customers Acquired during that same period.',
      'Specify your Average Monthly Revenue Per User (ARPU) and Gross Margin %.',
      'Enter your Estimated Customer Lifetime Value (LTV) or Average Customer Lifespan.',
      'Analyze your Blended CAC, CAC Payback Period (Months), and LTV:CAC Ratio.',
      'Compare your metrics against the SaaS Golden Rule benchmark (LTV:CAC ≥ 3:1 and Payback ≤ 12 months).'
    ],
    faqs: [
      {
        question: 'What is the difference between Blended CAC and Paid CAC?',
        answer: 'Blended CAC divides total marketing spend across ALL new customers acquired (including organic, word-of-mouth, and direct traffic). Paid CAC divides direct paid advertising spend exclusively by customers acquired directly from paid channels.'
      },
      {
        question: 'What is considered a good LTV to CAC ratio for SaaS?',
        answer: 'A healthy SaaS benchmark is 3:1 (LTV is 3x CAC). A ratio below 2:1 indicates unsustainable customer acquisition economics, while a ratio above 5:1 suggests under-investing in marketing and leaving market share to competitors.'
      },
      {
        question: 'What is an optimal CAC Payback Period?',
        answer: 'For B2B SaaS companies, a CAC payback period under 12 months is considered excellent. For self-serve B2C apps, a payback period under 6 months is preferred due to higher consumer churn rates.'
      },
      {
        question: 'What costs should be included in CAC calculation?',
        answer: 'Fully-loaded CAC should include direct ad spend, salaries and commissions of sales/marketing teams, marketing software subscriptions (CRM, attribution, email), agency retainers, and content production costs.'
      },
      {
        question: 'How does high churn negatively impact CAC efficiency?',
        answer: 'If customers cancel before reaching the CAC payback period, the business loses money on every acquisition. Lowering churn extends customer lifetime and maximizes return on marketing investments.'
      },
      {
        question: 'How do referral programs improve CAC?',
        answer: 'Referral and affiliate loops bring in organic customer acquisitions at near-zero incremental ad spend, pulling down blended CAC across the entire business.'
      }
    ],
    educationalDisclaimer: 'This CAC and unit economics calculator provides high-level financial models. Variations in sales cycle duration and deferred contract revenue may alter specific cohort payback timelines.'
  },
  {
    id: 'customer-lifetime-value-clv',
    title: 'Customer Lifetime Value (CLV / LTV)',
    slug: 'clv-calculator',
    categoryId: 'business',
    shortDescription: 'Calculate gross profit LTV per account based on monthly churn rate, ARPU, and margins.',
    description: 'Model customer retention, average order value, recurring revenue lifespan, and gross profit contribution per customer. Essential for subscription businesses, e-commerce, and enterprise services.',
    keywords: [
      'customer lifetime value',
      'clv calculator',
      'ltv calculator',
      'saas ltv',
      'churn rate ltv',
      'average revenue per user',
      'customer retention value'
    ],
    iconName: 'TrendingUp',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Customer Lifespan = 1 / Churn Rate; LTV = (ARPU × Gross Margin %) / Churn Rate',
    formulaLatex: '\\text{Lifespan} = \\frac{1}{\\text{Churn Rate}}, \\quad \\text{LTV} = \\frac{\\text{ARPU} \\times \\text{Gross Margin}\\%}{\\text{Monthly Churn Rate}}',
    relatedCalculatorIds: [
      'customer-acquisition-cost-cac',
      'recurring-revenue-mrr',
      'startup-burn-rate',
      'inventory-turnover-ratio'
    ],
    stepByStepInstructions: [
      'Enter your Average Revenue Per User (ARPU) per month or Average Order Value (AOV).',
      'Enter your Monthly Customer Churn Rate (%) or Repeat Purchase Frequency.',
      'Enter your Gross Profit Margin (%) to calculate net profit contribution rather than gross top-line revenue.',
      'Optionally specify an Annual Expansion / Upsell Rate (%).',
      'Review your Average Customer Lifespan (Months), Total Lifetime Gross Revenue, and True Profit LTV.',
      'Use the generated LTV to determine the maximum allowable Customer Acquisition Cost (CAC).'
    ],
    faqs: [
      {
        question: 'Why must Gross Margin % be included when calculating LTV?',
        answer: 'Top-line revenue LTV can be deceptive. A customer paying $1,000 with a 30% gross margin only generates $300 in gross profit to cover overhead and acquisition. True LTV must always reflect gross profit contribution.'
      },
      {
        question: 'How is Customer Lifespan calculated from Monthly Churn Rate?',
        answer: 'Customer Lifespan in months is mathematically equal to 1 divided by the monthly churn rate. For example, a 5% monthly churn rate yields an average customer lifespan of 1 / 0.05 = 20 months.'
      },
      {
        question: 'What is Net Revenue Retention (NRR) and how does it relate to LTV?',
        answer: 'NRR measures total recurring revenue from existing cohorts including upgrades, cross-sells, and churn. If expansion revenue exceeds churn (NRR > 100%), negative net churn occurs, theoretically giving customers infinite compounding value.'
      },
      {
        question: 'How can an e-commerce business calculate LTV without recurring subscriptions?',
        answer: 'For transactional commerce, LTV = (Average Order Value × Purchase Frequency per Year × Gross Margin %) × Average Customer Retention Years.'
      },
      {
        question: 'How does lowering churn by 1% affect LTV?',
        answer: 'Reducing monthly churn from 5% (20 mo lifespan) to 4% (25 mo lifespan) increases customer lifespan and total lifetime value by 25% with zero additional acquisition spend.'
      },
      {
        question: 'What is the discount rate in multi-year LTV modeling?',
        answer: 'For long enterprise customer contracts (3+ years), future cash flows should be discounted by a cost of capital (typically 8–12% per year) to calculate the Net Present Value (NPV) of customer lifetime value.'
      }
    ],
    educationalDisclaimer: 'This CLV/LTV calculator assumes a constant churn rate. Cohort retention curves in real-world applications may decay non-linearly over extended multi-year horizons.'
  },
  {
    id: 'recurring-revenue-mrr',
    title: 'MRR & ARR SaaS Subscription Growth',
    slug: 'mrr-arr-calculator',
    categoryId: 'business',
    shortDescription: 'Project Monthly Recurring Revenue (MRR), ARR run rate, expansion, and net retention.',
    description: 'Track and forecast recurring subscription revenue growth, contraction, expansion, churn, and Net Revenue Retention (NRR). Visualize multi-month ARR compounding and SaaS financial health metrics.',
    keywords: [
      'mrr calculator',
      'arr calculator',
      'monthly recurring revenue',
      'annual recurring revenue',
      'saas growth model',
      'net revenue retention nrr',
      'subscription revenue forecast'
    ],
    iconName: 'Repeat',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Net New MRR = New MRR + Expansion MRR - Contraction MRR - Churn MRR; ARR = MRR × 12; NRR % = [(Starting MRR + Expansion - Contraction - Churn) / Starting MRR] × 100',
    formulaLatex: '\\text{Net New MRR} = \\text{New} + \\text{Expansion} - \\text{Contraction} - \\text{Churn}, \\quad \\text{ARR} = 12 \\cdot \\text{MRR}',
    relatedCalculatorIds: [
      'customer-acquisition-cost-cac',
      'customer-lifetime-value-clv',
      'startup-burn-rate',
      'roi-margin'
    ],
    stepByStepInstructions: [
      'Enter your Starting Monthly Recurring Revenue (MRR) at the beginning of the period.',
      'Enter New MRR added from newly converted accounts.',
      'Enter Expansion MRR gained from upsells, cross-sells, or tier upgrades.',
      'Enter Contraction MRR lost from tier downgrades.',
      'Enter Churned MRR lost from canceled customer accounts.',
      'Analyze your Net New MRR, Ending MRR, and Annualized Run Rate (ARR = MRR × 12).',
      'Check your Quick Ratio and Net Revenue Retention (NRR %) health indicators.'
    ],
    faqs: [
      {
        question: 'What is the SaaS Quick Ratio and what score is healthy?',
        answer: 'The SaaS Quick Ratio measures growth efficiency: Quick Ratio = (New MRR + Expansion MRR) / (Contraction MRR + Churned MRR). A score above 4.0 indicates exceptional, high-velocity growth with low customer friction.'
      },
      {
        question: 'What is the difference between MRR and total monthly revenue?',
        answer: 'MRR includes only predictable, recurring subscription fees that automatically renew. One-time setup fees, professional services, consulting, and non-recurring hardware sales are excluded from MRR.'
      },
      {
        question: 'Why is Net Revenue Retention (NRR) the most critical SaaS metric?',
        answer: 'NRR measures the percentage of recurring revenue retained from existing customers over time. An NRR above 100% (e.g. 115–130% for top enterprise SaaS) means the company grows organically even without acquiring a single new customer.'
      },
      {
        question: 'How do annual prepayment plans get converted into MRR?',
        answer: 'An annual contract of $12,000 paid upfront contributes $1,000 to MRR each month over its 12-month duration, rather than $12,000 in month one.'
      },
      {
        question: 'What is Contraction MRR?',
        answer: 'Contraction MRR is the revenue lost when an active customer stays with your product but downgrades to a lower-priced tier or reduces seat licenses.'
      },
      {
        question: 'How is ARR related to valuation multiples in software startups?',
        answer: 'Software-as-a-Service companies are predominantly valued on enterprise value-to-ARR multiples (EV/ARR), which vary between 5x to 20x+ depending on annual growth rate, gross margins, and NRR.'
      }
    ],
    educationalDisclaimer: 'This SaaS recurring revenue model provides normalized projections. Foreign exchange fluctuations and deferred revenue accounting adjustments may alter GAAP reporting.'
  },
  {
    id: 'inventory-turnover-ratio',
    title: 'Inventory Turnover & Days Sales of Inventory',
    slug: 'inventory-turnover-calculator',
    categoryId: 'business',
    shortDescription: 'Calculate COGS inventory turnover velocity, Days Sales of Inventory (DSI), and carrying cost savings.',
    description: 'Optimize supply chain management, working capital velocity, and warehouse holding costs. Calculates inventory turn rates and Days Sales of Inventory (DSI) from Cost of Goods Sold (COGS) and average inventory balances.',
    keywords: [
      'inventory turnover ratio',
      'days sales of inventory',
      'dsi calculator',
      'cogs inventory velocity',
      'working capital efficiency',
      'inventory holding cost',
      'supply chain turnover'
    ],
    iconName: 'Package',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Average Inventory = (Beginning Inventory + Ending Inventory) / 2; Inventory Turnover = COGS / Average Inventory; DSI = (365 / Inventory Turnover)',
    formulaLatex: '\\text{Turnover} = \\frac{\\text{COGS}}{\\bar{I}}, \\quad \\text{DSI (Days)} = \\frac{365}{\\text{Turnover}} = \\frac{\\bar{I} \\times 365}{\\text{COGS}}',
    relatedCalculatorIds: [
      'roi-margin',
      'customer-acquisition-cost-cac',
      'recurring-revenue-mrr',
      'startup-burn-rate'
    ],
    stepByStepInstructions: [
      'Enter your annual Cost of Goods Sold (COGS) from your income statement.',
      'Enter Beginning Inventory balance at cost for the year or quarter.',
      'Enter Ending Inventory balance at cost.',
      'Optionally specify your Annual Inventory Carrying Cost % (typically 15%–25%).',
      'Review your Inventory Turnover Ratio (times per year) and Days Sales of Inventory (DSI in days).',
      'Examine potential annual capital holding cost savings by increasing turns.'
    ],
    faqs: [
      {
        question: 'Why is COGS used instead of total Sales Revenue for inventory turnover?',
        answer: 'Inventory is recorded on the balance sheet at cost. Sales revenue includes retail profit markups; using sales would artificially inflate turnover ratios. COGS ensures a true like-for-like cost comparison.'
      },
      {
        question: 'What does Days Sales of Inventory (DSI) tell a business owner?',
        answer: 'DSI measures the average number of days it takes to convert inventory into finished sales. A lower DSI indicates faster product velocity, lower risk of obsolescence, and reduced warehouse storage costs.'
      },
      {
        question: 'What is a typical benchmark for inventory turnover?',
        answer: 'Benchmarks vary by industry: Grocery stores and fast-moving consumer goods (FMCG) often turn 14 to 20+ times per year (DSI 18–26 days), while automotive dealerships or luxury jewelry typically turn 2 to 4 times per year (DSI 90–180 days).'
      },
      {
        question: 'What are inventory carrying costs?',
        answer: 'Carrying costs encompass physical warehouse rent, insurance, handling labor, shrinkage (theft/breakage), obsolescence/depreciation, and the opportunity cost of working capital tied up in unsold goods (typically 20–30% of inventory value annually).'
      },
      {
        question: 'Can an inventory turnover ratio be too high?',
        answer: 'Yes. An excessively high turnover ratio can indicate under-stocking, which leads to frequent stock-outs, delayed order fulfillment, lost sales, and uncaptured bulk wholesale volume discounts.'
      },
      {
        question: 'How do Just-In-Time (JIT) inventory systems improve DSI?',
        answer: 'JIT manufacturing schedules raw material deliveries to arrive only as required in production, minimizing holding inventory, slashing DSI, and liberating cash for other investments.'
      }
    ],
    educationalDisclaimer: 'This inventory turnover estimator uses standard accounting formulas. Seasonality in retail businesses may require monthly weighted averages rather than two-point averages.'
  },
  {
    id: 'macro-keto-carb-manager',
    title: 'Keto Macro & Net Carb Manager',
    slug: 'macro-keto-carb-manager',
    categoryId: 'nutrition',
    shortDescription: 'Calculate precise daily ketogenic macronutrients (fats, protein, net carbs) and caloric deficit targets.',
    description: 'Calculate your exact daily macronutrient targets to enter and sustain nutritional ketosis. Uses the Mifflin-St Jeor equation to establish Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE), allocates customized net carbs (typically 20g–30g), optimizes protein based on lean body mass, and calibrates healthy dietary fats for steady fat loss or muscle retention.',
    keywords: [
      'keto macro calculator',
      'net carbs calculator',
      'ketogenic diet macro calculator',
      'keto fat loss macro goals',
      'protein for ketosis lean mass',
      'keto tdee calorie deficit',
      'nutritional ketosis calculator'
    ],
    iconName: 'Apple',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Net Carbs = Total Carbs - Dietary Fiber - Sugar Alcohols; BMR (Mifflin-St Jeor) = 10W + 6.25H - 5A (+5 for men, -161 for women); Fat (g) = [Target Calories - (Net Carbs × 4) - (Protein × 4)] / 9',
    formulaLatex: '\\text{Net Carbs} = \\text{Carbs} - \\text{Fiber} - \\text{SugarAlcohols}, \\quad \\text{Fat (g)} = \\frac{\\text{Target kcal} - (4 C_{\\text{net}} + 4 P)}{9}',
    relatedCalculatorIds: [
      'calorie-tdee',
      'bmi',
      'body-fat',
      'target-heart-rate',
      'water-intake'
    ],
    stepByStepInstructions: [
      'Choose your preferred measurement system (US Imperial: lbs, ft/in, or Metric: kg, cm).',
      'Select your Biological Sex and enter your current Age, Weight, and Height.',
      'Enter your Estimated Body Fat % to calculate Lean Body Mass for optimal protein preservation.',
      'Select your Daily Physical Activity Level from Sedentary to Extremely Active.',
      'Choose your Ketogenic Goal (Fat Loss 20% Deficit, Aggressive Fat Loss 25% Deficit, Maintenance, or Surplus).',
      'Customize your Net Carb Cap (default 20g) and Protein Ratio (default 0.85g per lb of lean mass).',
      'Review your daily Target Calories, Fat (g), Protein (g), and Net Carb (g) visual breakdown.',
      'Use the bottom Nutrition Label Net Carb Deductor to quickly calculate net carbs from food labels.'
    ],
    faqs: [
      {
        question: 'What are net carbs and how are they calculated on a keto diet?',
        answer: 'Net carbs represent the carbohydrates that are actually digested and converted into blood glucose. They are calculated by taking Total Carbohydrates and subtracting Dietary Fiber (which is indigestible) and certain non-glycemic Sugar Alcohols like Erythritol or Allulose. Formula: Net Carbs = Total Carbohydrates - Dietary Fiber - Sugar Alcohols.'
      },
      {
        question: 'Why is 20 grams of net carbs standard for nutritional ketosis?',
        answer: 'Restricting net carbohydrates to 20 to 25 grams per day depletes liver glycogen stores within 24 to 72 hours, triggering the hepatic production of ketone bodies (beta-hydroxybutyrate, acetoacetate, and acetone) from fatty acids for cellular energy.'
      },
      {
        question: 'How much protein should I eat on a ketogenic diet without kicking myself out of ketosis?',
        answer: 'The scientific recommendation is 0.7 to 1.0 grams of protein per pound of lean body mass (1.6 to 2.2g per kg of lean mass). Adequate protein is essential to prevent muscle loss during caloric deficits. Gluconeogenesis is a demand-driven physiological process, not a supply-driven one, so dietary protein will not kick you out of ketosis.'
      },
      {
        question: 'Should I meet my fat macro every day on keto?',
        answer: 'No. On a ketogenic weight-loss diet, fat is an energy lever, not a goal to hit. Once your net carb limit is locked and your protein target is met, consume only enough fat to achieve satiety within your calculated calorie deficit. Your body will burn stored adipose tissue for the remaining energy needs.'
      },
      {
        question: 'How long does it take to enter ketosis?',
        answer: 'Most individuals enter nutritional ketosis (blood ketone level of 0.5 to 3.0 mmol/L) within 2 to 4 days of consuming fewer than 20–30g of net carbohydrates daily. Full fat-adaptation—where muscle mitochondria efficiently utilize fatty acids—typically takes 3 to 6 weeks.'
      },
      {
        question: 'Do all sugar alcohols count as zero net carbs?',
        answer: 'No. Erythritol, allulose, and monk fruit/stevia blends have a glycemic index of zero and can be 100% subtracted. However, sugar alcohols like maltitol and sorbitol have a glycemic index of 35–52 and are partially digested; for maltitol, only 50% of the grams should be subtracted.'
      },
      {
        question: 'What is the "keto flu" and how can it be prevented?',
        answer: 'When transitioning to ketosis, lowering insulin causes the kidneys to excrete sodium and water rapidly. This electrolyte loss can cause headaches, fatigue, and muscle cramps. It can be prevented by consuming sufficient electrolytes daily (roughly 3,000–5,000mg sodium, 1,000–3,000mg potassium, and 300–500mg magnesium).'
      },
      {
        question: 'Can I build lean muscle on a ketogenic diet?',
        answer: 'Yes. With progressive resistance training and an adequate protein intake (0.8–1.0g per lb of lean mass) coupled with a slight caloric surplus (5%–10%), you can build muscle effectively in ketosis while minimizing fat accumulation.'
      }
    ],
    educationalDisclaimer: 'This keto macro and net carb manager calculates nutritional guidelines based on validated metabolic energy equations. Individuals with underlying medical conditions, such as Type 1 Diabetes, kidney disease, or pancreatic conditions, should consult a licensed physician or registered dietitian before adopting a ketogenic diet.'
  },
  {
    id: 'protein-daily-requirement',
    title: 'Daily Protein Requirement by Lean Mass',
    slug: 'protein-requirement-calculator',
    categoryId: 'nutrition',
    shortDescription: 'Calculate optimal protein intake (g/day) for muscle hypertrophy, fat loss, or endurance training.',
    description: 'Determine customized daily dietary protein targets in grams, per-meal distribution schedules, and leucine thresholds based on body weight, lean mass, and resistance training goals.',
    keywords: [
      'protein requirement calculator',
      'daily protein intake',
      'protein per pound of body weight',
      'hypertrophy protein targets',
      'muscle protein synthesis',
      'protein during fat loss cut',
      'leucine threshold per meal'
    ],
    iconName: 'Zap',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Protein Target (g) = Total Body Weight (kg) × Goal Multiplier (1.2 to 2.4 g/kg), or Lean Mass (lbs) × 1.0 to 1.4 g/lb',
    formulaLatex: '\\text{Protein (g/day)} = \\text{Weight (kg)} \\times \\text{Multiplier (1.6 - 2.2)}, \\quad \\text{Per Meal (4 meals)} = \\frac{\\text{Total Protein}}{4}',
    relatedCalculatorIds: [
      'macro-keto-carb-manager',
      'calorie-tdee',
      'lean-body-mass',
      'body-fat',
      'bench-press-max-calculator'
    ],
    stepByStepInstructions: [
      'Enter your Weight (lbs or kg) and Body Fat % (optional for lean mass calculations).',
      'Select your Fitness Primary Goal (Hypertrophy / Muscle Building, Cutting / Fat Loss Preservation, Endurance Sports, or General Maintenance).',
      'Select your Training Experience Level and Number of Meals per day (3 to 6 meals).',
      'Review your Recommended Daily Protein Target in total grams and grams per pound/kg.',
      'Check your optimal Per-Meal Protein Allocation and Leucine threshold (2.5g–3.0g leucine per meal) to maximize Muscle Protein Synthesis (MPS).'
    ],
    faqs: [
      {
        question: 'What is the optimal protein intake for muscle growth (hypertrophy)?',
        answer: 'Meta-analyses by Morton et al. (2018) demonstrate that protein intakes of 1.6 to 2.2 grams per kilogram of body weight (0.73 to 1.0 g/lb) optimize muscle hypertrophy. Higher intakes (2.3–3.1 g/kg of lean mass) are beneficial during aggressive hypocaloric cutting phases to preserve muscle tissue.'
      },
      {
        question: 'Why does protein requirement increase during a fat-loss cut?',
        answer: 'In a caloric deficit, the body experiences greater amino acid oxidation for energy. Higher protein intake (up to 1.0–1.2g/lb) protects against muscle catabolism, enhances satiety through higher TEF (Thermic Effect of Food), and stabilizes blood glucose.'
      },
      {
        question: 'What is the "Leucine Threshold" for Muscle Protein Synthesis?',
        answer: 'Leucine is the essential branched-chain amino acid that triggers the mTOR pathway for muscle protein synthesis. Consuming approximately 2.5g to 3.5g of leucine (found in ~25–40g of high-quality animal protein or ~35–50g of plant protein) per meal fully stimulates the anabolic response.'
      },
      {
        question: 'Does the human body only absorb 30g of protein in a single meal?',
        answer: 'This is a myth. The gut absorbs nearly 100% of ingested protein over time by slowing gastric emptying. While ~30–40g maximizes the acute rate of muscle protein synthesis per feeding, excess amino acids are used for organ repair, enzyme synthesis, and sustained anti-catabolism.'
      },
      {
        question: 'Can plant-based athletes meet optimal protein requirements?',
        answer: 'Yes, but plant proteins generally have lower leucine concentrations and lower DIAAS (Digestible Indispensable Amino Acid Score). Plant-based athletes typically need 10–20% higher total protein or strategic complementary protein pairings (e.g. rice and pea protein isolate).'
      },
      {
        question: 'Does high protein damage healthy kidneys?',
        answer: 'Extensive randomized controlled trials have consistently shown that high-protein diets (up to 3.3g/kg) do not impair renal function or glomerular filtration rate in individuals with healthy kidneys. However, those with pre-existing chronic kidney disease (CKD) must follow physician-directed protein restrictions.'
      }
    ],
    educationalDisclaimer: 'This protein requirement estimator is for healthy athletic individuals. Individuals with kidney disease, liver dysfunction, or metabolic disorders should consult a clinical nephrologist or dietitian.'
  },
  {
    id: 'glycemic-load-index',
    title: 'Glycemic Index & Glycemic Load Solver',
    slug: 'glycemic-load-calculator',
    categoryId: 'nutrition',
    shortDescription: 'Calculate glycemic load per serving size to manage blood glucose spikes and insulin response.',
    description: 'Evaluate carbohydrate quality and portion sizes for diabetic health and athletic nutrition. Calculates Glycemic Load (GL) from Glycemic Index (GI) and available net carbohydrates per portion.',
    keywords: [
      'glycemic load calculator',
      'glycemic index calculator',
      'blood sugar carbs',
      'insulin response calculator',
      'diabetic meal planner',
      'carbohydrate quality index',
      'low gi foods'
    ],
    iconName: 'Activity',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Glycemic Load (GL) = [Glycemic Index (GI) × Available Net Carbs (g)] / 100',
    formulaLatex: '\\text{GL} = \\frac{\\text{GI} \\times \\text{Net Carbs (g)}}{100}',
    relatedCalculatorIds: [
      'macro-keto-carb-manager',
      'protein-daily-requirement',
      'calorie-tdee',
      'blood-pressure-category'
    ],
    stepByStepInstructions: [
      'Select a common food item from the preset list (e.g. Watermelon, White Rice, Lentils, Apples, Oatmeal) or choose Custom.',
      'Enter the Glycemic Index (GI) rating (0 to 100, where pure glucose = 100).',
      'Enter the Serving Size in grams and Total Available Net Carbs per portion.',
      'Review your Glycemic Load Score: Low (≤10), Medium (11–19), or High (≥20).',
      'Examine the total daily meal glycemic load accumulator for blood sugar stability.'
    ],
    faqs: [
      {
        question: 'What is the difference between Glycemic Index (GI) and Glycemic Load (GL)?',
        answer: 'Glycemic Index (GI) measures how rapidly a carbohydrate raises blood glucose compared to pure glucose (rated 100), tested on a standard 50g carb portion. Glycemic Load (GL) factors in the actual portion size and carbohydrate concentration consumed in a real-world serving: GL = (GI × Net Carbs) / 100.'
      },
      {
        question: 'Why is watermelon high GI (72) but low GL (5)?',
        answer: 'Watermelon has a high GI because its carbohydrates convert quickly to sugar, but it is 92% water by weight. A standard 120g slice contains only 6g of net carbs, giving it a low Glycemic Load of (72 × 6) / 100 = 4.3, meaning it will not spike blood glucose severely in moderate servings.'
      },
      {
        question: 'What are the official Glycemic Load categories?',
        answer: 'Per-serving GL: Low = 10 or less; Medium = 11 to 19; High = 20 or more. Daily total GL: Low < 80; High > 120.'
      },
      {
        question: 'How do dietary fat, protein, and fiber lower the glycemic impact of meals?',
        answer: 'Consuming fats, proteins, and soluble fibers alongside high-GI carbohydrates delays gastric emptying and slows intestinal glucose absorption, blunting the postprandial insulin surge.'
      },
      {
        question: 'How does glycemic load assist in managing Type 2 Diabetes?',
        answer: 'Consistently choosing low-GL meals reduces blood glucose variability, lowers HbA1c levels, improves insulin sensitivity, and prevents reactive hypoglycemia energy crashes.'
      },
      {
        question: 'What is the glycemic index of pure fructose vs glucose?',
        answer: 'Pure glucose has a GI of 100, while pure fructose has a low GI of ~20 because fructose must first be metabolized by the liver before entering the bloodstream as glucose.'
      }
    ],
    educationalDisclaimer: 'This glycemic index and glycemic load calculator is for dietary planning. Blood glucose response varies across individuals based on microbiome, insulin resistance, and meal composition.'
  },
  {
    id: 'electrolyte-sodium-potassium',
    title: 'Electrolyte & Hydration Replacement',
    slug: 'electrolyte-hydration-calculator',
    categoryId: 'nutrition',
    shortDescription: 'Estimate workout sweat fluid loss, sodium, potassium, and magnesium replacement needs.',
    description: 'Calculate exercise sweat rate, fluid replacement volume, and optimal milligram dosages of sodium, potassium, and magnesium to prevent cramping, dehydration, and hyponatremia during endurance training.',
    keywords: [
      'electrolyte calculator',
      'sodium replacement workout',
      'sweat rate calculator',
      'potassium magnesium endurance',
      'hydration replacement plan',
      'exercise cramping electrolytes',
      'marathon hydration strategy'
    ],
    iconName: 'Droplet',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Sweat Loss (L) = Pre-Workout Weight (kg) - Post-Workout Weight (kg) + Fluid Consumed (L) - Urine Output (L); Sweat Rate (L/hr) = Sweat Loss / Duration (hr)',
    formulaLatex: '\\text{Sweat Rate (L/h)} = \\frac{(W_{\\text{pre}} - W_{\\text{post}}) + V_{\\text{fluid}} - V_{\\text{urine}}}{\\text{Time (hours)}}',
    relatedCalculatorIds: [
      'water-intake',
      'marathon-race-finish-time',
      'vo2-max-fitness-score',
      'macro-keto-carb-manager'
    ],
    stepByStepInstructions: [
      'Enter your Pre-Workout Body Weight and Post-Workout Body Weight in lbs or kg.',
      'Enter the Volume of Fluid Consumed during the session (oz or mL).',
      'Specify the Exercise Duration in minutes and Environmental Heat/Humidity Conditions.',
      'Select your Sweat Saltiness / Salty Sweater profile (Normal ~800mg Na/L vs Salty ~1,500mg Na/L).',
      'Review your Calculated Hourly Sweat Rate (L/hr or oz/hr) and Total Fluid Deficit.',
      'Check recommended Sodium, Potassium, and Magnesium replacement amounts for during and post-workout recovery.'
    ],
    faqs: [
      {
        question: 'How do I know if I am a "salty sweater"?',
        answer: 'Salty sweaters frequently notice white, gritty salt rings on their hats, clothing, and skin after workouts, experience stinging eyes from sweat, and have a higher sodium loss rate (1,200 to 2,000+ mg sodium per liter of sweat).'
      },
      {
        question: 'What is exercise-associated hyponatremia (EAH)?',
        answer: 'Hyponatremia is a potentially life-threatening medical condition caused by drinking excessive plain water without electrolytes during prolonged endurance exercise, which dilutes blood sodium levels below 135 mmol/L.'
      },
      {
        question: 'How much fluid should be replaced after a workout?',
        answer: 'The American College of Sports Medicine (ACSM) recommends drinking 1.25 to 1.5 liters (approx 20–24 oz per pound lost) of fluid containing sodium for every kilogram (2.2 lbs) of body weight lost during exercise.'
      },
      {
        question: 'What is the role of potassium and magnesium in preventing muscle cramps?',
        answer: 'Sodium is the primary extracellular electrolyte lost in sweat (accounting for ~90% of electrolyte losses), while potassium and magnesium act inside cells to regulate muscle contraction and nerve impulses. Maintaining balanced ratios prevents neuromuscular irritability.'
      },
      {
        question: 'How does high humidity increase sweat rate and electrolyte loss?',
        answer: 'In humid environments, sweat cannot readily evaporate from the skin to cool the body. The body compensates by sweating even more heavily, accelerating dehydration and electrolyte depletion.'
      },
      {
        question: 'When should electrolytes be consumed before vs during endurance events?',
        answer: 'For events lasting over 60–90 minutes, pre-hydrating with 300–500mg sodium in 16 oz water 2 hours prior and consuming 300–700mg sodium per hour during exercise maintains plasma volume and cardiac output.'
      }
    ],
    educationalDisclaimer: 'This electrolyte and hydration calculator provides sports nutrition guidelines. Individual sweat electrolyte concentrations vary significantly; consider laboratory sweat testing for personalized endurance protocols.'
  },
  {
    id: 'vo2-max-fitness-score',
    title: 'VO2 Max Fitness Score & Aerobic Capacity Calculator',
    slug: 'vo2-max-fitness-score',
    categoryId: 'fitness',
    shortDescription: 'Calculate your VO2 Max aerobic capacity across Cooper 12-min, Resting Heart Rate Ratio, Rockport 1-mile, and 1.5-mile running protocols.',
    description: 'Calculate your true cardiorespiratory fitness score (VO2 Max in mL/kg/min) using validated exercise physiology protocols including the Cooper 12-minute run, Uth-Sørensen Heart Rate Ratio, Rockport 1-mile walk, and George 1.5-mile run test. Compares results against ACSM age/sex population percentiles and builds a 5-zone cardiovascular training heart rate matrix.',
    keywords: [
      'vo2 max calculator',
      'aerobic capacity calculator',
      'cooper 12 minute run test calculator',
      'resting heart rate vo2 max',
      'rockport 1 mile walk test calculator',
      'cardiorespiratory fitness score',
      'heart rate training zones calculator'
    ],
    iconName: 'Activity',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Cooper: VO2 Max = (Distance in meters - 504.9) / 44.73; HR Ratio: 15.3 × (HRmax / HRrest); Rockport: 132.853 - 0.0769(Weight) - 0.3877(Age) + 6.315(Gender) - 3.2649(Time) - 0.1565(HR)',
    formulaLatex: '\\text{VO}_{2\\text{max}}^{\\text{Cooper}} = \\frac{d_{\\text{meters}} - 504.9}{44.73}, \\quad \\text{VO}_{2\\text{max}}^{\\text{Uth}} = 15.3 \\times \\left(\\frac{\\text{HR}_{\\text{max}}}{\\text{HR}_{\\text{rest}}}\\right)',
    relatedCalculatorIds: [
      'target-heart-rate',
      'calorie-tdee',
      'bench-press-max-calculator',
      'body-fat',
      'bmi'
    ],
    stepByStepInstructions: [
      'Choose your preferred testing protocol (Cooper 12-Minute Run, Resting Heart Rate Ratio, Rockport 1-Mile Walk, or 1.5-Mile Timed Run).',
      'Enter your Biological Sex, Age, and Body Weight.',
      'Input the protocol-specific test measurements (distance covered, elapsed time, or resting/post-exercise heart rates).',
      'Review your Estimated VO2 Max in mL/kg/min and your ACSM Cardiorespiratory Fitness Classification (Superior, Excellent, Good, Fair, Poor).',
      'Check your age/sex cohort percentile ranking.',
      'Consult the 5-Zone Cardiovascular Training Matrix (Zone 1 Recovery through Zone 5 VO2 Max intervals) with customized BPM target heart rate ranges.'
    ],
    faqs: [
      {
        question: 'What is VO2 Max and why is it considered the gold standard of fitness?',
        answer: 'VO2 Max (maximal oxygen uptake) is the maximum volume of oxygen (in milliliters) your body can transport and utilize per kilogram of body weight per minute during maximal aerobic exercise. It reflects the combined functional efficiency of your heart, lungs, vascular network, and mitochondrial cellular respiration.'
      },
      {
        question: 'What is a good VO2 Max for my age and gender?',
        answer: 'For men aged 20–39, a VO2 Max above 45 mL/kg/min is considered Good, and above 52 mL/kg/min is Superior. For women aged 20–39, above 36 mL/kg/min is Good, and above 43 mL/kg/min is Superior. Elite endurance athletes (marathoners, cross-country skiers) frequently exceed 70–85 mL/kg/min.'
      },
      {
        question: 'How is VO2 Max linked to longevity and healthspan?',
        answer: 'Extensive landmark clinical studies (including Cleveland Clinic and JAMA Network Open research) demonstrate that high cardiorespiratory fitness is one of the strongest independent predictors of all-cause mortality reduction. Moving from a "low" to "elite" VO2 Max cohort reduces 10-year mortality risk by up to 500%.'
      },
      {
        question: 'How do I perform the Cooper 12-Minute Run Test correctly?',
        answer: 'Warm up for 10 minutes. Then run as far as you can at a continuous, maximal sustainable pace for exactly 12 minutes on a flat 400m track or calibrated GPS route. Measure your total distance covered in meters (or kilometers/miles) and enter it into the calculator.'
      },
      {
        question: 'How accurate is the Resting Heart Rate Ratio method?',
        answer: 'The Uth-Sørensen formula (15.3 × HRmax / HRrest) provides a fast, non-exercise proxy estimate with approximately ±10% to 15% error margins. It is ideal for individuals who cannot perform maximal running tests due to orthopedic constraints or baseline deconditioning.'
      },
      {
        question: 'Can you improve your VO2 Max through training?',
        answer: 'Yes. Most sedentary individuals can increase their VO2 Max by 15% to 30% through structured training. The most effective modalities combine high-volume low-intensity Zone 2 cardio (building mitochondrial density and stroke volume) with targeted high-intensity Norwegian 4x4 interval training (4 minutes at 90% HRmax, 3 minutes active recovery).'
      },
      {
        question: 'What is the difference between Zone 2 training and VO2 Max training?',
        answer: 'Zone 2 training (60%–70% max HR) trains aerobic base capacity and fat oxidation without triggering substantial central nervous system fatigue. Zone 5 / VO2 Max interval training (90%–100% max HR) challenges stroke volume and cardiac cardiac output at peak mechanical strain.'
      },
      {
        question: 'Does losing body weight increase VO2 Max?',
        answer: 'Yes. Because relative VO2 Max is expressed per kilogram of body weight (mL/kg/min), reducing excess non-functional body fat while maintaining cardiovascular stroke volume mathematically increases your relative VO2 Max score.'
      }
    ],
    educationalDisclaimer: 'This cardiorespiratory fitness calculator provides mathematical estimations based on validated peer-reviewed sports science models. Consult a physician before undertaking maximal aerobic exercise tests if you have underlying cardiovascular or pulmonary conditions.'
  },
  {
    id: 'heart-rate-variability-hrv',
    title: 'Heart Rate Variability (HRV) Recovery Score',
    slug: 'hrv-recovery-calculator',
    categoryId: 'fitness',
    shortDescription: 'Analyze RMSSD autonomic nervous system readiness, parasympathetic tone, and recovery readiness.',
    description: 'Evaluate Root Mean Square of Successive Differences (RMSSD) and standard deviation of NN intervals (SDNN) against baseline norms. Determine autonomic recovery status to optimize intense training sessions vs active recovery days.',
    keywords: [
      'hrv calculator',
      'rmssd recovery score',
      'heart rate variability tracker',
      'parasympathetic nervous system recovery',
      'whoop oura apple watch hrv',
      'overtraining syndrome detection',
      'autonomic readiness'
    ],
    iconName: 'HeartPulse',
    isPopular: true,
    isNew: true,
    formulaDescription: 'RMSSD = sqrt( (1 / (N - 1)) × Sum[ (RR_{i+1} - RR_i)^2 ] ); ln(RMSSD) = Natural Logarithm of RMSSD',
    formulaLatex: '\\text{RMSSD} = \\sqrt{\\frac{1}{N-1}\\sum_{i=1}^{N-1}(RR_{i+1} - RR_i)^2}, \\quad \\text{Recovery Score} = \\left(1 + \\frac{\\text{Today} - \\mu_{\\text{base}}}{\\sigma_{\\text{base}}}\\right) \\times 50',
    relatedCalculatorIds: [
      'target-heart-rate',
      'vo2-max-fitness-score',
      'marathon-race-finish-time',
      'sleep-cycle',
      'water-intake'
    ],
    stepByStepInstructions: [
      'Enter your Morning / Overnight RMSSD reading in milliseconds (ms) from your wearable (Apple Watch, Whoop, Oura, Garmin, or Polar).',
      'Enter your personal 30-Day Baseline Average RMSSD and Baseline Standard Deviation.',
      'Enter your Resting Heart Rate (BPM) for complementary autonomic assessment.',
      'Review your calculated HRV Z-Score and Autonomic Recovery Category (Optimal / Green, Moderate / Yellow, or Suppressed / Red).',
      'Read tailored training intensity recommendations (e.g. Max Effort intervals vs Zone 2 aerobic recovery).'
    ],
    faqs: [
      {
        question: 'What is Heart Rate Variability (HRV) and why is higher generally better?',
        answer: 'HRV measures the millisecond fluctuations between consecutive heartbeats (R-R intervals). Higher HRV indicates robust parasympathetic (vagal) tone, signifying that the body is recovered, resilient to stress, and ready for physical strain.'
      },
      {
        question: 'What is RMSSD in HRV tracking?',
        answer: 'Root Mean Square of Successive Differences (RMSSD) is the primary time-domain metric used by sports scientists and wearable sensors. It specifically reflects acute vagal parasympathetic modulation of cardiac rhythm.'
      },
      {
        question: 'Why should HRV only be compared against your own baseline?',
        answer: 'HRV varies widely across individuals due to genetics, age, and natural cardiac anatomy (ranging from 20ms to 120ms+ in healthy adults). A raw score of 45ms may be peak recovery for one athlete and severe fatigue for another.'
      },
      {
        question: 'What factors cause an acute drop in HRV?',
        answer: 'Acute drops in HRV are caused by high training load / overreaching, acute viral illness, alcohol consumption, poor sleep duration/quality, psychological stress, late meals, and dehydration.'
      },
      {
        question: 'Can an abnormally high HRV ever signal fatigue?',
        answer: 'Yes. Paradoxical parasympathetic hyperactivity can occur during late-stage systemic overtraining exhaustion, where HRV spikes dramatically while resting heart rate drops unnaturally low accompanied by severe fatigue.'
      },
      {
        question: 'What is the best time of day to measure HRV?',
        answer: 'HRV should be measured either continuously during deep overnight sleep or immediately upon waking while seated quietly for 2–3 minutes before consuming caffeine or looking at screens.'
      }
    ],
    educationalDisclaimer: 'This HRV recovery calculator provides physiological recovery insights. It is not intended for diagnostic evaluation of cardiac arrhythmias, autonomic neuropathy, or medical conditions.'
  },
  {
    id: 'marathon-race-finish-time',
    title: 'Marathon & Half-Marathon Finish Time Predictor (Pete Riegel Formula)',
    slug: 'marathon-race-finish-time',
    categoryId: 'fitness',
    shortDescription: 'Predict 5K, 10K, Half Marathon, Full Marathon, and 50K ultra finish times and generate custom 5K pacing splits using the Pete Riegel formula.',
    description: 'Calculate equivalent race finish times and custom kilometer/mile pacing splits from any recent baseline performance (1 Mile, 5K, 10K, 10 Mile, or Half Marathon). Incorporates Pete Riegel endurance fatigue modeling adjusted for weekly training mileage volume (1.05 to 1.08 fatigue exponents).',
    keywords: [
      'marathon finish time calculator',
      'race predictor calculator',
      'pete riegel formula calculator',
      'half marathon time predictor',
      'marathon pace split calculator',
      '5k to marathon time conversion',
      'running race pace chart'
    ],
    iconName: 'Timer',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Pete Riegel Formula: T2 = T1 × (D2 / D1)^b, where b = 1.06 (moderate mileage), 1.05 (high 45+ mpw), or 1.08 (low <25 mpw)',
    formulaLatex: 'T_2 = T_1 \\times \\left(\\frac{D_2}{D_1}\\right)^{b}, \\quad \\text{Pace} = \\frac{T_2}{D_2}',
    relatedCalculatorIds: [
      'vo2-max-fitness-score',
      'target-heart-rate',
      'calorie-tdee',
      'bench-press-max-calculator',
      'body-fat'
    ],
    stepByStepInstructions: [
      'Select the distance of your most recent competitive race or time trial (1 Mile, 5K, 10K, 10 Mile, or Half Marathon).',
      'Enter your exact achieved finish time in Hours, Minutes, and Seconds.',
      'Select your average weekly training mileage tier (Low <25 MPW, Moderate 25–45 MPW, or High 45+ MPW) to calibrate the fatigue curve exponent.',
      'Choose your Target Race Distance to plan (5K, 10K, 10 Mile, Half Marathon, Full Marathon, or 50K Ultra).',
      'Review your Predicted Finish Time, Target Average Mile Pace, and Target Kilometer Pace.',
      'Analyze the Full Distance Equivalency Table across all standard road racing events.',
      'Consult the 5K Checkpoint Split Breakdown table to execute an even or negative race pacing strategy.'
    ],
    faqs: [
      {
        question: 'What is the Pete Riegel formula and how does it predict marathon times?',
        answer: 'The Pete Riegel formula (T2 = T1 × (D2/D1)^1.06) is the gold-standard predictive model in endurance sports physiology. Published in 1977 by research engineer Pete Riegel, it accounts for the exponential decay in speed as distance increases due to glycogen depletion, core temperature rise, and muscular fatigue.'
      },
      {
        question: 'Why does weekly training mileage change my predicted marathon time?',
        answer: 'The standard Riegel exponent (1.06) assumes adequate endurance base training. Runners with high weekly mileage (45+ miles/week) experience less cardiac drift and superior fat oxidation, operating near a 1.05 exponent. Runners with low weekly mileage (<25 miles/week) experience faster muscular fatigue, fitting a 1.08 exponent.'
      },
      {
        question: 'Can I predict a marathon from just a 5K time?',
        answer: 'Yes, but a 5K predominantly tests VO2 Max and anaerobic threshold, whereas a 26.2-mile marathon tests fuel utilization (glycogen storage and lipid oxidation) and musculoskeletal durability. Predictions from a 10K or Half Marathon provide higher real-world correlation.'
      },
      {
        question: 'What is the "marathon wall" and why does it happen around Mile 20?',
        answer: 'The human liver and skeletal muscles store approximately 1,800 to 2,000 calories of glycogen. At marathon race pace, a runner burns ~100 calories per mile. Around Mile 20 (32 km), glycogen stores become fully depleted if not replenished, forcing the body to burn fats at a much slower metabolic rate.'
      },
      {
        question: 'What is the optimal pacing strategy: negative splits or even pacing?',
        answer: 'World-record performances and elite marathons consistently favor slightly negative splits (running the second half 1%–2% faster than the first) or precise even pacing. Starting faster than your goal pace (positive splitting) causes early lactate accumulation and severe deceleration in the final 10K.'
      },
      {
        question: 'How many carbohydrates should I consume per hour during a marathon?',
        answer: 'Modern sports nutrition guidelines recommend consuming 30 to 60 grams of carbohydrates per hour (or up to 90g/hour using 2:1 glucose-to-fructose blends) via energy gels, chews, or sports drinks, starting within the first 30 to 45 minutes.'
      },
      {
        question: 'How do weather, elevation, and hills affect race finish predictions?',
        answer: 'Riegel predictions assume flat terrain and optimal temperatures (45°F to 55°F / 7°C to 13°C). High ambient temperature and humidity can add 2% to 10% to your finish time. Every 100 feet of net elevation gain adds approximately 6.6 seconds to a mile.'
      },
      {
        question: 'How should I taper before my marathon?',
        answer: 'A standard 3-week taper reduces total mileage by 20% to 25% in week 1, 40% to 50% in week 2, and 60% to 70% in race week, while maintaining race-pace intensity intervals to preserve neuromuscular sharpness and peak glycogen stores.'
      }
    ],
    educationalDisclaimer: 'This race time prediction calculator provides physiological estimations based on the Pete Riegel model assuming adequate training volume and optimal racing conditions. Individual race day execution depends on pacing discipline, weather, terrain, and intra-race fueling.'
  },
  {
    id: 'bench-press-max-calculator',
    title: '1RM One-Rep Max Calculator (Bench, Squat & Deadlift)',
    slug: 'bench-press-max-calculator',
    categoryId: 'fitness',
    shortDescription: 'Calculate your One-Rep Max (1RM) and submaximal working percentages across 7 validated exercise science formulas.',
    description: 'Calculate your true 1RM (One-Rep Max) for bench press, squat, deadlift, and overhead press without risking injury on maximal lift tests. Uses 7 peer-reviewed exercise science models (Epley, Brzycki, Lander, Lombardi, Mayhew, O\'Conner, and Wathan), incorporates RPE / Reps-in-Reserve (RIR) adjustments, and provides a complete submaximal training load percentage matrix (60%–95%).',
    keywords: [
      'one rep max calculator',
      'bench press max calculator',
      '1rm calculator squat deadlift',
      'epley 1rm formula',
      'brzycki 1rm formula',
      'rpe 1rm calculator',
      'submaximal training percentage chart'
    ],
    iconName: 'Dumbbell',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Epley: 1RM = w × (1 + r / 30); Brzycki: 1RM = w × (36 / (37 - r)); Lander: 100w / (101.3 - 2.67123r); Lombardi: w × r^0.10; Consensus = Average of 7 models',
    formulaLatex: '1\\text{RM}_{\\text{Epley}} = w \\left(1 + \\frac{r}{30}\\right), \\quad 1\\text{RM}_{\\text{Brzycki}} = w \\left(\\frac{36}{37 - r}\\right), \\quad 1\\text{RM}_{\\text{Lander}} = \\frac{100w}{101.3 - 2.67123r}',
    relatedCalculatorIds: [
      'target-heart-rate',
      'body-fat',
      'calorie-tdee',
      'macro-keto-carb-manager',
      'bmi'
    ],
    stepByStepInstructions: [
      'Select your Compound Lift (Barbell Bench Press, Back Squat, Conventional Deadlift, Overhead Press, or Custom Lift).',
      'Choose your preferred units (Pounds: lbs, or Kilograms: kg).',
      'Enter the Total Weight Lifted including barbell and loaded plate collars.',
      'Enter the Number of Completed Repetitions performed with strict, full range-of-motion form.',
      'Select your Set RPE / Effort (e.g., RPE 10 for true max effort, RPE 8 if you had 2 clean reps in reserve).',
      'Review your Consensus Estimated 1RM and individual formula breakdowns across Epley, Brzycki, and Lander models.',
      'Consult the Submaximal Training Load Matrix to program working sets across Hypertrophy (70%–80%), Strength (80%–90%), and Power.'
    ],
    faqs: [
      {
        question: 'What is a One-Rep Max (1RM) and why is it important?',
        answer: 'A One-Rep Max (1RM) is the maximum amount of weight an individual can lift for a single repetition with proper form through a complete range of motion. It is the benchmark standard used in strength and conditioning to prescribe accurate submaximal training percentages (e.g., 5 sets of 5 reps at 80% 1RM).'
      },
      {
        question: 'Which 1RM formula is the most accurate for bench press?',
        answer: 'For the barbell bench press with 1 to 10 repetitions, the Epley and Brzycki formulas consistently demonstrate the highest correlation with actual 1RM testing in sports science literature. For higher rep sets (10+ reps), Mayhew and Wathan tend to provide more reliable estimates by accounting for non-linear muscular endurance fatigue.'
      },
      {
        question: 'Why is testing submaximal reps safer than true 1RM testing?',
        answer: 'True 1RM testing places extreme mechanical tension on tendons, ligaments, and the central nervous system, carrying an elevated risk of muscle tears or joint strain. Estimating 1RM from a heavy 3-rep to 6-rep set allows lifters to measure strength progression safely without excessive axial fatigue.'
      },
      {
        question: 'How does RPE (Rate of Perceived Exertion) affect 1RM calculations?',
        answer: 'RPE measures how close you were to failure on a scale of 6 to 10. RPE 10 means 0 reps in reserve (RIR = 0). If you performed 5 reps at RPE 8, you had 2 reps in reserve, meaning your true capacity was 7 repetitions. Incorporating RPE ensures you do not underestimate your 1RM on non-failure training sets.'
      },
      {
        question: 'What percentage of 1RM should I lift for muscle hypertrophy (growth)?',
        answer: 'For muscle hypertrophy, the optimal intensity range is 65% to 82.5% of 1RM, performing sets of 6 to 15 repetitions within 1 to 3 reps of muscular failure, ensuring sufficient mechanical tension and metabolic stress.'
      },
      {
        question: 'What percentage of 1RM should I lift for maximum strength?',
        answer: 'For maximal strength development, train primarily in the 80% to 92.5% of 1RM intensity range, performing sets of 1 to 5 repetitions with long rest intervals (3–5 minutes) to maximize neuromuscular motor unit recruitment.'
      },
      {
        question: 'Are 1RM calculators accurate for sets over 10 repetitions?',
        answer: 'Estimating 1RM becomes less precise as repetitions exceed 10 to 12 reps, because muscular endurance, aerobic threshold, and muscle fiber composition (Type I vs Type II) introduce greater variability. For greatest accuracy, calculate your 1RM using working sets of 3 to 6 reps.'
      },
      {
        question: 'Should I warm up before calculating and attempting heavy working sets?',
        answer: 'Yes. Always perform a progressive pyramid warm-up (e.g., empty bar × 10, 50% × 5, 70% × 3, 85% × 1) before heavy working sets to activate the central nervous system, lubricate joints with synovial fluid, and groove motor patterns.'
      }
    ],
    educationalDisclaimer: 'This One-Rep Max estimator provides mathematical estimates based on validated exercise science formulas. Always use a competent spotter, safety pins, and proper lifting mechanics when testing heavy compound lifts in resistance training.'
  },
  {
    id: 'ohms-law-circuit-solver',
    title: "Ohm's Law & Circuit Power Solver",
    slug: 'ohms-law-calculator',
    categoryId: 'electrical',
    shortDescription: "Calculate Voltage (V), Current (I), Resistance (R), and Power (W) for DC and AC circuits.",
    description: 'Solve electrical parameters instantly with the classic Ohm wheel formulas. Compute voltage drops, current draw in amps, resistor impedance in ohms, and dissipated power in watts for electronics design and DIY circuits.',
    keywords: [
      'ohms law calculator',
      'voltage current resistance',
      'watts to amps',
      'power dissipated resistor',
      'circuit solver',
      'dc electrical calculator',
      'volts amps ohms watts'
    ],
    iconName: 'Zap',
    isPopular: true,
    isNew: true,
    formulaDescription: 'V = I × R; P = V × I = I² × R = V² / R; I = V / R; R = V / I',
    formulaLatex: 'V = I \\cdot R, \\quad P = V \\cdot I = I^2 R = \\frac{V^2}{R}, \\quad I = \\frac{V}{R} = \\sqrt{\\frac{P}{R}}, \\quad R = \\frac{V}{I} = \\frac{V^2}{P}',
    relatedCalculatorIds: [
      'ac-single-three-phase-power',
      'wire-gauge-voltage-drop',
      'resistor-color-code-4-5-band',
      'unit-converter'
    ],
    stepByStepInstructions: [
      'Choose any two known electrical parameters (Voltage, Current, Resistance, or Power).',
      'Enter the known values with appropriate metric units (e.g. 12 Volts, 500 mA, 10 kΩ, 5 Watts).',
      'Review the calculated remaining two electrical values instantly.',
      'Check the dissipated heat power to ensure resistors are sized within safe wattage tolerances (e.g. 1/4W vs 1/2W vs 5W ceramic).'
    ],
    faqs: [
      {
        question: "What is Ohm's Law and who formulated it?",
        answer: "Formulated by German physicist Georg Ohm in 1827, Ohm's Law states that electric current (I) through a conductor between two points is directly proportional to voltage (V) across the points and inversely proportional to resistance (R): V = I × R."
      },
      {
        question: 'Why is resistor power rating important in electronics?',
        answer: 'When current flows through resistance, electrical energy is converted into heat (P = I² × R). If actual power dissipation exceeds a resistor\'s rated wattage (e.g. 1/4 watt), the component will overheat, char the PCB, or fail open-circuit.'
      },
      {
        question: "Does Ohm's Law apply to AC circuits as well as DC?",
        answer: "Yes, for purely resistive AC loads (like incandescent bulbs or heaters), Ohm's Law applies directly using RMS (Root Mean Square) voltages. For reactive AC circuits containing inductors and capacitors, impedance (Z) replaces resistance (R): V = I × Z."
      },
      {
        question: 'How do you convert milliamps (mA) to amps (A)?',
        answer: 'Divide milliamps by 1,000. For example, 250 mA = 250 / 1,000 = 0.25 A.'
      },
      {
        question: 'What is the relationship between power, voltage, and current (Joule\'s Law)?',
        answer: 'Power in watts equals voltage multiplied by current (P = V × I). Doubling the voltage at constant current doubles power, while doubling current through a fixed resistance quadruples heat dissipation (P = I²R).'
      },
      {
        question: 'What is a non-ohmic material?',
        answer: 'Non-ohmic components (such as semiconductor diodes, LEDs, and transistors) have a non-linear voltage-to-current curve where resistance changes dynamically with applied voltage.'
      }
    ],
    educationalDisclaimer: 'This electrical circuit calculator provides theoretical calculations. Always follow National Electrical Code (NEC) standards and proper high-voltage safety procedures.'
  },
  {
    id: 'ac-single-three-phase-power',
    title: 'AC 3-Phase & Single-Phase Power',
    slug: 'ac-3-phase-power-calculator',
    categoryId: 'electrical',
    shortDescription: 'Calculate real power (kW), apparent power (kVA), reactive power (kVAR), and power factor.',
    description: 'Determine electrical load requirements, motor full load amps (FLA), and line currents for commercial 3-phase and residential single-phase AC electrical systems.',
    keywords: [
      '3 phase power calculator',
      'kva to kw calculator',
      'power factor correction',
      'three phase line current',
      'apparent power vs real power',
      'ac electrical load sizing',
      'industrial motor power'
    ],
    iconName: 'Zap',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Single-Phase: P(kW) = (V × I × PF) / 1000; 3-Phase Line-to-Line: P(kW) = (sqrt(3) × V_LL × I × PF) / 1000; S(kVA) = P(kW) / PF',
    formulaLatex: 'P_{\\text{3\\Phi}} = \\frac{\\sqrt{3} \\cdot V_{LL} \\cdot I \\cdot \\text{PF}}{1000}, \\quad S_{\\text{3\\Phi}} = \\frac{\\sqrt{3} \\cdot V_{LL} \\cdot I}{1000}, \\quad Q_{\\text{3\\Phi}} = \\sqrt{S^2 - P^2}',
    relatedCalculatorIds: [
      'ohms-law-circuit-solver',
      'wire-gauge-voltage-drop',
      'unit-converter'
    ],
    stepByStepInstructions: [
      'Select Circuit Configuration: Single-Phase (120V/240V) or Three-Phase (208V, 480V, 600V).',
      'Enter Line-to-Line Voltage (V) and Line Current (Amps).',
      'Enter the Power Factor (PF, typically 0.80 to 0.95 for inductive motor loads, 1.0 for resistive).',
      'Review Active Real Power (kW), Apparent Power (kVA), and Reactive Power (kVAR).',
      'Examine required power factor correction capacitor ratings to eliminate utility peak penalty surcharges.'
    ],
    faqs: [
      {
        question: 'Why is Three-Phase power preferred over Single-Phase for heavy industrial machinery?',
        answer: 'Three-phase power delivers a constant, non-pulsing stream of electrical energy with 73% more power than single-phase using conductors of identical cross-sectional area, making motors more efficient, compact, and self-starting without auxiliary start capacitors.'
      },
      {
        question: 'What is the difference between kW (Real Power) and kVA (Apparent Power)?',
        answer: 'Real power (kW) performs actual mechanical or thermal work. Apparent power (kVA) is the total vector sum of real and reactive power that generators and transformers must deliver: kVA = kW / Power Factor.'
      },
      {
        question: 'What causes poor power factor and why do electric utilities penalize it?',
        answer: 'Inductive loads (induction motors, HVAC compressors, fluorescent ballasts) create lagging reactive magnetic fields (kVAR) that draw extra current without doing productive work, causing voltage drops and transmission losses.'
      },
      {
        question: 'Why is the square root of 3 (1.732) used in 3-phase formulas?',
        answer: 'In balanced 3-phase wye systems, each of the three phases is displaced by 120 electrical degrees. The line-to-line voltage is vectorially equal to the line-to-neutral voltage multiplied by sqrt(3).'
      },
      {
        question: 'How do capacitor banks correct power factor?',
        answer: 'Capacitors supply leading reactive current (kVAR) that cancels out the lagging inductive magnetic current of AC motors, bringing the overall power factor closer to unity (1.0).'
      },
      {
        question: 'What is standard commercial voltage in North America?',
        answer: 'Standard commercial 3-phase configurations include 208Y/120V (for light commercial/retail) and 480Y/277V (for industrial facilities and large HVAC chillers).'
      }
    ],
    educationalDisclaimer: 'This 3-phase and single-phase power calculator provides engineering estimations. All electrical load sizing and panel schedules must comply with NFPA 70 / NEC standards.'
  },
  {
    id: 'wire-gauge-voltage-drop',
    title: 'AWG Wire Gauge & Voltage Drop Solver',
    slug: 'wire-gauge-voltage-drop-calculator',
    categoryId: 'electrical',
    shortDescription: 'Calculate copper/aluminum wire gauge size needed for allowable % voltage drop and ampacity.',
    description: 'Select appropriate American Wire Gauge (AWG) or kcmil conductor sizes for branch circuits and feeders. Calculates single-phase and 3-phase voltage drop, circuit run length limits, and energy efficiency according to NEC standards.',
    keywords: [
      'voltage drop calculator',
      'awg wire size calculator',
      'copper wire ampacity',
      'nec conductor sizing',
      'subpanel wire size',
      'long run electrical drop',
      'aluminum vs copper conductor'
    ],
    iconName: 'Sliders',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Single-Phase Drop Vd = (2 × K × L × I) / CM; 3-Phase Drop Vd = (1.732 × K × L × I) / CM; where K = resistivity (12.9 for Copper, 21.2 for Aluminum)',
    formulaLatex: 'V_d = \\frac{2 \\cdot K \\cdot L \\cdot I}{\\text{CM}}, \\quad \\% V_d = \\left(\\frac{V_d}{V_{\\text{source}}}\\right) \\times 100\\%',
    relatedCalculatorIds: [
      'ohms-law-circuit-solver',
      'ac-single-three-phase-power',
      'construction'
    ],
    stepByStepInstructions: [
      'Select Circuit Type: Single-Phase (120V / 240V) or Three-Phase (208V / 480V).',
      'Select Conductor Material: Copper or Aluminum.',
      'Enter the One-Way Run Length in Feet or Meters.',
      'Enter the Continuous Load Current in Amps and Source Supply Voltage.',
      'Set Maximum Allowable Voltage Drop (NEC recommends ≤3% for branch circuits, ≤5% for total system).',
      'Review the Recommended Minimum AWG / kcmil Wire Size, Actual Voltage at Load, and Power Loss in Watts.'
    ],
    faqs: [
      {
        question: 'What is the NEC standard for maximum allowable voltage drop?',
        answer: 'The National Electrical Code (NEC Article 210.19(A) & 215.2(A)) recommends that voltage drop should not exceed 3% on branch circuits or 5% across combined feeders and branch circuits to ensure optimal equipment efficiency.'
      },
      {
        question: 'Why does voltage drop occur in long wire runs?',
        answer: 'All electrical conductors have natural internal resistance proportional to their length and inversely proportional to their cross-sectional area (Circular Mils). Current flowing through this resistance creates a voltage drop (V = I × R) and dissipates heat.'
      },
      {
        question: 'What is Circular Mils (CM) in wire sizing?',
        answer: 'A circular mil is a unit of area equal to the area of a circle with a diameter of one mil (1/1000 of an inch). Larger AWG sizes have higher circular mil ratings, reducing resistance.'
      },
      {
        question: 'When should Aluminum wire be used instead of Copper?',
        answer: 'Aluminum conductors are substantially lighter and cheaper for large heavy-duty service entrance feeders (like 100A–400A subpanels), but require upsizing by roughly two AWG sizes compared to copper and require anti-oxidant paste on terminals.'
      },
      {
        question: 'What are the risks of excessive voltage drop in appliances?',
        answer: 'Excessive voltage drop causes electric motors (HVAC, pumps, refrigerators) to draw higher current, overheat windings, trip breakers prematurely, and causes LED lighting to flicker or dim.'
      },
      {
        question: 'How does ambient temperature affect wire ampacity?',
        answer: 'Higher ambient temperatures reduce a conductor\'s heat dissipation capacity, requiring temperature derating adjustment factors according to NEC Table 310.15(B).'
      }
    ],
    educationalDisclaimer: 'This wire sizing calculator provides engineering guidelines. All installations must be reviewed by a licensed master electrician and comply with local municipal electrical codes.'
  },
  {
    id: 'resistor-color-code-4-5-band',
    title: 'Resistor Color Code 4 & 5 Band Reader',
    slug: 'resistor-color-code-calculator',
    categoryId: 'electrical',
    shortDescription: 'Decode 4-band and 5-band color rings into Ohms resistance value and tolerance %.',
    description: 'Interactive visual resistor color code decoder. Look up resistance values, multiplier bands, and tolerance ratings (Gold 5%, Silver 10%, Brown 1%) for axial resistors in electronics design and DIY prototyping.',
    keywords: [
      'resistor color code',
      '4 band resistor calculator',
      '5 band resistor code',
      'resistor tolerance color',
      'electronics color band',
      'axial resistor reader',
      'ohms color decoder'
    ],
    iconName: 'Cpu',
    isPopular: true,
    isNew: true,
    formulaDescription: '4-Band: R = (Band1 × 10 + Band2) × 10^Multiplier ± Tolerance %; 5-Band: R = (Band1 × 100 + Band2 × 10 + Band3) × 10^Multiplier ± Tolerance %',
    formulaLatex: 'R_{\\text{4-Band}} = (10 B_1 + B_2) \\times 10^M \\pm \\text{Tol}\\%, \\quad R_{\\text{5-Band}} = (100 B_1 + 10 B_2 + B_3) \\times 10^M \\pm \\text{Tol}\\%',
    relatedCalculatorIds: [
      'ohms-law-circuit-solver',
      'unit-converter'
    ],
    stepByStepInstructions: [
      'Select Resistor Type: 4-Band (Standard 5% / 10% tolerance) or 5-Band (Precision 1% metal film).',
      'Pick the color for each respective digit band from left to right (holding the tolerance band on the right).',
      'Select the Multiplier band color (Black, Brown, Red, Orange, Yellow, Green, Blue, Gold, Silver).',
      'Select the Tolerance band color (Gold ±5%, Silver ±10%, Brown ±1%, Red ±2%).',
      'Read the calculated Total Resistance (in Ω, kΩ, or MΩ) and Min/Max tolerance resistance bounds.'
    ],
    faqs: [
      {
        question: 'How do you determine which end of a resistor to read first?',
        answer: 'Look for a gold, silver, or wider gap spacing. The tolerance band (gold ±5% or silver ±10%) is positioned on the far right. Digit bands are bunched closer together on the left side.'
      },
      {
        question: 'What is the color code sequence for numbers 0 through 9?',
        answer: 'Black (0), Brown (1), Red (2), Orange (3), Yellow (4), Green (5), Blue (6), Violet (7), Gray (8), White (9). A common mnemonic is "Black Brown ROY G. BIV Gray White".'
      },
      {
        question: 'Why are 5-band resistors used instead of 4-band?',
        answer: '5-band resistors provide three significant digit bands instead of two, allowing for high-precision E96 and E192 resistance values (such as 4.75 kΩ with 1% tolerance).'
      },
      {
        question: 'What are standard E12 resistor values?',
        answer: 'The standard E12 series includes 12 preferred values per decade: 1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, and 8.2.'
      },
      {
        question: 'What does a 6-band resistor include?',
        answer: 'A 6th band indicates the Temperature Coefficient of Resistance (TCR) in parts per million per Kelvin (ppm/K), showing how resistance shifts under thermal changes.'
      },
      {
        question: 'What does a gold or silver multiplier band mean?',
        answer: 'A gold multiplier multiplies by 0.1 (10^-1), and a silver multiplier multiplies by 0.01 (10^-2), used for low-value sub-10-ohm resistors.'
      }
    ],
    educationalDisclaimer: 'This resistor color code tool follows standard EIA-RS-279 conventions. Always verify high-precision components with a digital multimeter (DMM) before soldering.'
  },
  {
    id: 'structural-beam-deflection',
    title: 'Structural Beam Deflection & Stress',
    slug: 'structural-beam-deflection-calculator',
    categoryId: 'engineering',
    shortDescription: 'Calculate maximum deflection, bending moment, and flexural stress for structural beams.',
    description: 'Analyze simply supported and cantilever steel or timber beams under center point loads and uniform distributed loads (UDL). Calculates Moment of Inertia (I), Modulus of Elasticity (E), and bending stress against L/360 deflection limits.',
    keywords: [
      'beam deflection calculator',
      'bending stress calculator',
      'moment of inertia beam',
      'simply supported beam',
      'cantilever beam deflection',
      'steel I-beam sizing',
      'l 360 deflection limit'
    ],
    iconName: 'Layers',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Simply Supported Point Load: Max Deflection δ = (P × L³) / (48 × E × I); Simply Supported Uniform Load: δ = (5 × w × L⁴) / (384 × E × I); Max Stress σ = (M × c) / I',
    formulaLatex: '\\delta_{\\text{point}} = \\frac{P L^3}{48 E I}, \\quad \\delta_{\\text{UDL}} = \\frac{5 w L^4}{384 E I}, \\quad \\sigma_{\\text{max}} = \\frac{M_{\\text{max}} \\cdot y}{I} = \\frac{M}{S}',
    relatedCalculatorIds: [
      'construction',
      'flooring-square-footage',
      'unit-converter'
    ],
    stepByStepInstructions: [
      'Select Support Condition: Simply Supported or Cantilever Fixed Beam.',
      'Select Loading Type: Point Load at Center (P) or Uniform Distributed Load (UDL, w).',
      'Enter Beam Span Length (L in ft or m).',
      'Enter Material Modulus of Elasticity (E in psi or GPa; e.g. Structural Steel 29,000,000 psi, Douglas Fir 1,600,000 psi).',
      'Enter Beam Cross-Section Moment of Inertia (I in in⁴ or mm⁴) or enter width/depth for rectangular timber.',
      'Review Maximum Midspan Deflection (in/mm), Max Bending Moment, and check against L/360 or L/240 building code deflection criteria.'
    ],
    faqs: [
      {
        question: 'What is the L/360 structural deflection limit in residential building codes?',
        answer: 'L/360 is the standard International Building Code (IBC) deflection limit for floors under live loads. It means a 15-foot (180 inch) span floor joist is permitted to deflect a maximum of 180 / 360 = 0.5 inches to prevent drywall plaster cracking and noticeable floor bounce.'
      },
      {
        question: 'What is Moment of Inertia (I) and how is it calculated for a rectangular beam?',
        answer: 'Moment of Inertia measures a beam\'s geometric resistance to bending. For a solid rectangular beam of width b and depth h, I = (b × h³) / 12. Doubling the depth of a joist increases its bending stiffness by 8 times (2³).'
      },
      {
        question: 'What is Modulus of Elasticity (E)?',
        answer: 'Modulus of Elasticity (Young\'s Modulus) measures a material\'s intrinsic mechanical stiffness. Structural carbon steel has an E of ~200 GPa (29,000,000 psi), while structural softwood lumber ranges from 10 to 12 GPa (1,400,000–1,800,000 psi).'
      },
      {
        question: 'How does beam deflection differ for cantilever beams versus simply supported beams?',
        answer: 'A cantilever beam (supported only at one fixed end) deflects significantly more under equivalent loading (δ = P L³ / (3 E I)), deflecting 16 times more than a simply supported beam of identical span and center load.'
      },
      {
        question: 'What is Section Modulus (S)?',
        answer: 'Section Modulus S = I / c (where c is distance to outermost fiber). It relates maximum bending moment directly to peak tensile/compressive flexural stress: σ = M / S.'
      },
      {
        question: 'What is the difference between Live Load and Dead Load on a beam?',
        answer: 'Dead load is the permanent weight of the structure itself (framing, flooring, roofing). Live load represents transient movable weight (furniture, human occupants, snow, wind).'
      }
    ],
    educationalDisclaimer: 'This structural beam calculator is for preliminary sizing and academic engineering studies. All structural load-bearing designs must be stamped by a licensed Professional Structural Engineer (PE/SE).'
  },
  {
    id: 'pipe-flow-rate-hazen-williams',
    title: 'Pipe Flow Rate & Hazen-Williams Friction Loss',
    slug: 'pipe-flow-rate-calculator',
    categoryId: 'engineering',
    shortDescription: 'Calculate water flow velocity, volumetric discharge (GPM/LPS), and Hazen-Williams pipe friction head loss.',
    description: 'Dimension civil water supply networks, irrigation systems, and HVAC hydronic piping. Calculates flow velocity, volumetric discharge rate, friction loss in feet of head, and pressure drop in PSI using the empirical Hazen-Williams formula.',
    keywords: [
      'pipe flow rate calculator',
      'hazen williams friction loss',
      'pipe pressure drop psi',
      'gpm water velocity',
      'head loss pipe',
      'civil water supply hydraulics',
      'pvc pipe friction loss'
    ],
    iconName: 'Droplet',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Flow Q = Velocity × Cross-Sectional Area; Hazen-Williams Head Loss h_f = (10.67 × L × Q^1.852) / (C^1.852 × d^4.87) [SI units] or h_f = 0.002083 × L × (100/C)^1.852 × (gpm^1.852 / d^4.8655) [US units]',
    formulaLatex: 'h_f = \\frac{10.67 \\cdot L \\cdot Q^{1.852}}{C^{1.852} \\cdot D^{4.87}}, \\quad \\Delta P = \\frac{h_f \\cdot \\rho g}{144}, \\quad V = \\frac{4 Q}{\\pi D^2}',
    relatedCalculatorIds: [
      'hydraulic-cylinder-force',
      'unit-converter'
    ],
    stepByStepInstructions: [
      'Enter Internal Pipe Diameter (inches or millimeters).',
      'Enter Pipe Length (feet or meters).',
      'Select Pipe Material Roughness Coefficient (C-Factor, e.g. PVC/Copper C=150, New Ductile Iron C=130, Old Galvanized Steel C=100).',
      'Enter known Flow Rate (GPM or L/s) OR Fluid Velocity (ft/s or m/s).',
      'Review Calculated Velocity, Total Friction Head Loss (ft of head or meters), and Pressure Drop in PSI / bar.'
    ],
    faqs: [
      {
        question: 'What is the Hazen-Williams C-Factor?',
        answer: 'The C-Factor is an empirical smoothness coefficient representing the internal roughness of pipe walls. Smoother pipes have higher C-values (e.g. PVC, PEX, and Copper = 150) and experience lower friction head loss than rougher, corroded pipes (e.g. unlined cast iron = 100).'
      },
      {
        question: 'What is the recommended maximum water velocity in domestic plumbing pipes?',
        answer: 'Plumbing engineering codes typically limit cold water velocity to 5–8 ft/s (1.5–2.4 m/s) and hot water to 4–5 ft/s to prevent water hammer surges, cavitation noise, and erosion corrosion of copper fittings.'
      },
      {
        question: 'When should Darcy-Weisbach be used instead of Hazen-Williams?',
        answer: 'Hazen-Williams is restricted strictly to water flow at normal ambient temperatures (40°F–75°F). For non-water fluids (oil, chemicals) or extreme temperatures, the Darcy-Weisbach equation with Reynolds number and Moody friction factor must be used.'
      },
      {
        question: 'How do pipe diameter changes impact friction head loss?',
        answer: 'Friction head loss is inversely proportional to diameter to the ~4.87 power (d^4.87). Halving a pipe diameter increases friction head loss by over 29 times for the same volumetric flow rate.'
      },
      {
        question: 'How is friction head in feet converted to pressure drop in PSI?',
        answer: 'For water (specific gravity = 1.0), 1 PSI = 2.31 feet of water head. Therefore, PSI Drop = Head Loss (ft) / 2.31.'
      },
      {
        question: 'What causes "water hammer" in high-velocity piping systems?',
        answer: 'Water hammer is a high-pressure shock wave created when a valve or solenoid closes instantaneously on moving fluid, converting the kinetic energy of water into extreme destructive pressure spikes.'
      }
    ],
    educationalDisclaimer: 'This pipe flow and friction loss calculator uses empirical Hazen-Williams formulas for water. Complex municipal distribution grids require hydraulic network simulation software (such as EPANET).'
  },
  {
    id: 'thermal-conductivity-heat-transfer',
    title: 'Thermal Conductivity & Heat Loss Solver',
    slug: 'thermal-conductivity-calculator',
    categoryId: 'engineering',
    shortDescription: 'Calculate conductive heat transfer rate (Watts/BTU/hr), R-values, U-factors, and envelope heat loss.',
    description: 'Model 1D steady-state conductive heat transfer through building assemblies, insulation materials, and industrial heat exchangers using Fourier\'s Law of Thermal Conduction.',
    keywords: [
      'heat transfer calculator',
      'thermal conductivity',
      'fouriers law heat conduction',
      'r value to u factor',
      'building heat loss btu',
      'thermal resistance insulation',
      'thermal conductance'
    ],
    iconName: 'Flame',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Fourier\'s Law: Q = (k × A × ΔT) / d; R-Value = d / k; U-Factor = 1 / R_total; Heat Rate Q = U × A × ΔT',
    formulaLatex: 'Q = \\frac{k \\cdot A \\cdot (T_{\\text{hot}} - T_{\\text{cold}})}{d} = U \\cdot A \\cdot \\Delta T, \\quad R = \\frac{d}{k}, \\quad U = \\frac{1}{\\sum R_i}',
    relatedCalculatorIds: [
      'paint-coverage',
      'unit-converter'
    ],
    stepByStepInstructions: [
      'Enter Surface Area of the wall or material (sq ft or m²).',
      'Enter Material Thickness (inches or meters).',
      'Select Material Thermal Conductivity (k in W/m·K or BTU·in/hr·ft²·°F; e.g. Fiberglass 0.04 W/mK, Spray Foam 0.024 W/mK, Concrete 1.4 W/mK).',
      'Enter Inside and Outside Ambient Temperatures.',
      'Review Total Conductive Heat Loss Rate (Watts and BTU/hr), Total Assembly R-Value, and Overall U-Factor.'
    ],
    faqs: [
      {
        question: "What is Fourier's Law of Thermal Conduction?",
        answer: "Fourier's Law states that the rate of heat transfer through a material is proportional to the negative gradient in the temperature and to the area through which the heat flows: Q = (k × A × ΔT) / d."
      },
      {
        question: 'What is the relationship between R-Value and U-Factor?',
        answer: 'R-Value measures thermal resistance (insulating ability; higher is better). U-Factor measures thermal transmittance (rate of heat loss; lower is better). They are reciprocal: U = 1 / R.'
      },
      {
        question: 'Why do multi-layer walls sum their R-values?',
        answer: 'In 1D steady-state heat conduction, thermal resistances in series behave like electrical resistors in series: R_total = R_outside_air + R_siding + R_insulation + R_drywall + R_inside_air.'
      },
      {
        question: 'What is "Thermal Bridging" in building construction?',
        answer: 'Thermal bridging occurs when highly conductive structural elements (such as solid wood framing studs or steel beams) penetrate insulation, creating low-resistance pathways for rapid heat loss.'
      },
      {
        question: 'How does moisture affect the thermal conductivity of fiberglass insulation?',
        answer: 'Liquid water has a thermal conductivity (k ≈ 0.6 W/mK) that is ~25 times higher than dry air (k ≈ 0.026 W/mK). Wet insulation loses up to 90% of its insulating R-value.'
      },
      {
        question: 'What is the difference between conduction, convection, and radiation?',
        answer: 'Conduction is heat transfer through direct microscopic atomic collisions within a solid. Convection is heat transfer via macroscopic fluid/air motion. Radiation is electromagnetic infrared energy transfer through space.'
      }
    ],
    educationalDisclaimer: 'This thermal heat loss calculator assumes steady-state 1D heat conduction. Real-world building envelope performance also involves air infiltration, convection, and solar radiant gains.'
  },
  {
    id: 'hydraulic-cylinder-force',
    title: 'Hydraulic Cylinder Force & Speed',
    slug: 'hydraulic-cylinder-calculator',
    categoryId: 'engineering',
    shortDescription: 'Calculate push/pull actuator force (lbs/kN), extension/retraction speed, and pump flow requirements.',
    description: 'Dimension hydraulic actuators, log splitters, industrial presses, and fluid power systems. Calculates extension push force, rod-side retraction pull force, piston displacement volume, and stroke cycle time from operating PSI and pump GPM.',
    keywords: [
      'hydraulic cylinder calculator',
      'hydraulic push pull force',
      'psi to tons hydraulic press',
      'cylinder extension speed gpm',
      'hydraulic cylinder stroke time',
      'fluid power actuator',
      'hydraulic piston area'
    ],
    iconName: 'Settings',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Piston Area A_p = π × (Bore/2)²; Rod Area A_r = π × (Rod/2)²; Push Force = Pressure × A_p; Pull Force = Pressure × (A_p - A_r); Speed = (Q × 231) / (A × 60) [in/sec]',
    formulaLatex: 'F_{\\text{push}} = P \\cdot \\frac{\\pi D_{\\text{bore}}^2}{4}, \\quad F_{\\text{pull}} = P \\cdot \\frac{\\pi (D_{\\text{bore}}^2 - d_{\\text{rod}}^2)}{4}, \\quad v_{\\text{extend}} = \\frac{Q \\cdot 231}{60 \\cdot A_p}',
    relatedCalculatorIds: [
      'pipe-flow-rate-hazen-williams',
      'unit-converter'
    ],
    stepByStepInstructions: [
      'Enter Cylinder Bore Diameter (inches or mm).',
      'Enter Piston Rod Diameter (inches or mm).',
      'Enter Stroke Length (inches or mm).',
      'Enter Operating System Pressure (PSI or bar).',
      'Enter Hydraulic Pump Delivery Flow Rate (GPM or L/min).',
      'Review Extension Push Force (Pounds & Tons), Retraction Pull Force, Extension/Retraction Cycle Times in seconds, and Fluid Volume displacement.'
    ],
    faqs: [
      {
        question: 'Why is retraction pull force always lower than extension push force in standard cylinders?',
        answer: 'During retraction, the solid steel piston rod occupies space inside the cylinder barrel, reducing the effective annular surface area on which hydraulic fluid pressure can act: Net Pull Area = Piston Area - Rod Area.'
      },
      {
        question: 'How do you calculate the tonnage of a hydraulic press from PSI and bore diameter?',
        answer: 'Tonnage = (Pressure in PSI × Piston Area in sq inches) / 2,000 lbs. For example, a 4-inch bore cylinder (12.57 sq in) at 3,000 PSI generates 37,700 lbs of push force, which equals 18.85 tons.'
      },
      {
        question: 'How does pump flow rate (GPM) determine cylinder cycle speed?',
        answer: 'Cylinder velocity is determined by volumetric fluid delivery: Velocity (in/sec) = (GPM × 231 cu in/gal) / (Piston Area in sq in × 60 sec). A higher pump GPM speeds up stroke time but does not increase force.'
      },
      {
        question: 'What is column buckling in long-stroke hydraulic cylinders?',
        answer: 'Under high compressive push loads, long slender cylinder rods can buckle or bend mechanically like Euler structural columns before hydraulic pressure limits are reached. Longer strokes require larger rod diameters.'
      },
      {
        question: 'What is the typical operating pressure for mobile vs industrial hydraulics?',
        answer: 'Mobile equipment (tractors, excavators, log splitters) typically operates at 2,500 to 3,500 PSI, while heavy industrial machine tools and presses often operate at 3,000 to 5,000+ PSI.'
      },
      {
        question: 'What happens to hydraulic fluid power (horsepower)?',
        answer: 'Hydraulic Horsepower = (Pressure in PSI × Flow in GPM) / 1,714. This is the mechanical engine power required to drive the hydraulic pump.'
      }
    ],
    educationalDisclaimer: 'This fluid power calculator provides theoretical mechanical values assuming 100% mechanical efficiency. Seal friction and pressure line losses typically reduce effective force by 5%–10%.'
  },
  {
    id: 'matrix-determinant-inverse',
    title: 'Matrix Determinant, Inverse & Transpose',
    slug: 'matrix-determinant-calculator',
    categoryId: 'math',
    shortDescription: 'Calculate 2x2, 3x3, and 4x4 matrix determinants, inverse matrices, transpose, and solve linear systems.',
    description: 'Comprehensive linear algebra solver. Calculates matrix determinants, cofactor matrices, adjoints, matrix inverses, and solves simultaneous systems of linear equations using Cramer\'s Rule and Gaussian elimination.',
    keywords: [
      'matrix determinant calculator',
      'matrix inverse calculator',
      'cramers rule solver',
      'linear algebra calculator',
      '3x3 matrix determinant',
      'matrix transpose',
      'invertible matrix'
    ],
    iconName: 'Grid',
    isPopular: true,
    isNew: true,
    formulaDescription: '2x2 det(A) = ad - bc; 3x3 det(A) = a(ei - fh) - b(di - fg) + c(dh - eg); A^-1 = (1 / det(A)) × adj(A)',
    formulaLatex: '\\det(A) = \\sum_{j=1}^n (-1)^{1+j} a_{1j} M_{1j}, \\quad A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A), \\quad A A^{-1} = I',
    relatedCalculatorIds: [
      'quadratic-formula-roots',
      'derivative-power-rule',
      'percentage'
    ],
    stepByStepInstructions: [
      'Select Matrix Dimensions: 2x2, 3x3, or 4x4.',
      'Enter numeric values into the interactive matrix grid cells.',
      'Review the step-by-step Determinant expansion calculation.',
      'Check if the matrix is Invertible (det ≠ 0) or Singular (det = 0).',
      'Examine the Transpose Matrix A^T, Cofactor Matrix, Adjugate Matrix, and Inverse Matrix A^-1.'
    ],
    faqs: [
      {
        question: 'What is a singular matrix and why does it have no inverse?',
        answer: 'A singular (degenerate) matrix is a square matrix whose determinant is exactly equal to zero (det = 0). Because calculating the inverse requires dividing by the determinant (A^-1 = adj(A) / det(A)), dividing by zero is undefined, meaning no inverse matrix exists.'
      },
      {
        question: 'What geometric meaning does the determinant represent?',
        answer: 'In 2D space, the absolute value of the determinant of a 2x2 matrix represents the area of the parallelogram formed by its column vectors. In 3D space, a 3x3 determinant represents the volume of the parallelopiped.'
      },
      {
        question: 'How is Cramer\'s Rule used to solve systems of linear equations?',
        answer: 'Cramer\'s Rule solves Ax = b for each variable by replacing column i of matrix A with column vector b, calculating the new determinant det(A_i), and dividing by the original determinant: x_i = det(A_i) / det(A).'
      },
      {
        question: 'What is the Transpose of a matrix (A^T)?',
        answer: 'The transpose flips a matrix over its main diagonal, switching row and column indices such that (A^T)_{ij} = A_{ji}.'
      },
      {
        question: 'What is an Identity Matrix (I)?',
        answer: 'An identity matrix is a square matrix with ones on the main diagonal and zeros elsewhere. Multiplying any compatible matrix by I leaves it unchanged (A × I = A), functioning as the number 1 in matrix algebra.'
      },
      {
        question: 'What is an orthogonal matrix?',
        answer: 'A square matrix A is orthogonal if its transpose equals its inverse (A^T = A^-1), meaning its column vectors are mutually orthonormal unit vectors and det(A) = ±1.'
      }
    ],
    educationalDisclaimer: 'This matrix calculator uses exact floating-point and fraction representations for linear algebra operations. Large ill-conditioned matrices in machine learning may require QR or SVD decomposition.'
  },
  {
    id: 'quadratic-formula-roots',
    title: 'Quadratic Equation Solver & Discriminant',
    slug: 'quadratic-formula-calculator',
    categoryId: 'math',
    shortDescription: 'Solve ax² + bx + c = 0 for real or complex imaginary roots with complete step-by-step math.',
    description: 'Solve quadratic equations with detailed step-by-step explanations. Calculates the discriminant (Δ = b² - 4ac), real/complex conjugate roots, parabola vertex coordinates (h, k), axis of symmetry, and focal point.',
    keywords: [
      'quadratic formula calculator',
      'solve ax2 bx c 0',
      'discriminant calculator',
      'parabola vertex form',
      'complex roots quadratic',
      'quadratic equation steps',
      'axis of symmetry'
    ],
    iconName: 'Calculator',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Roots x = (-b ± sqrt(b² - 4ac)) / (2a); Discriminant Δ = b² - 4ac; Vertex h = -b / (2a), k = c - (b² / (4a))',
    formulaLatex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\Delta = b^2 - 4ac, \\quad \\text{Vertex} = \\left(-\\frac{b}{2a}, c - \\frac{b^2}{4a}\\right)',
    relatedCalculatorIds: [
      'derivative-power-rule',
      'matrix-determinant-inverse',
      'percentage'
    ],
    stepByStepInstructions: [
      'Enter quadratic coefficients a, b, and c for the standard equation ax² + bx + c = 0 (with a ≠ 0).',
      'Review the Discriminant Δ = b² - 4ac to determine root characteristics (Two Real, One Repeated Real, or Two Complex Conjugates).',
      'Examine the step-by-step substitution into the Quadratic Formula.',
      'Check the Parabola Vertex Coordinates (h, k) and Axis of Symmetry x = -b/(2a).',
      'Review the Factored Form equation: a(x - r1)(x - r2).'
    ],
    faqs: [
      {
        question: 'What does the Discriminant (b² - 4ac) indicate about the roots?',
        answer: 'If Δ > 0: There are two distinct real roots (parabola crosses x-axis twice). If Δ = 0: There is one repeated real root (parabola touches x-axis at vertex). If Δ < 0: There are two complex conjugate imaginary roots of the form p ± qi (parabola never touches x-axis).'
      },
      {
        question: 'What is the Vertex of a parabola and how is it found?',
        answer: 'The vertex is the extreme maximum or minimum turning point of the parabola. Its x-coordinate is h = -b / (2a), and its y-coordinate is obtained by evaluating f(h) = ah² + bh + c.'
      },
      {
        question: 'How do you convert standard form ax² + bx + c into vertex form a(x - h)² + k?',
        answer: 'By completing the square: Factor out "a" from the x terms, add and subtract (b/(2a))² inside parentheses, and simplify into a(x - h)² + k.'
      },
      {
        question: 'Why cannot coefficient "a" equal zero in a quadratic equation?',
        answer: 'If a = 0, the x² term vanishes and the equation degenerates into a linear equation bx + c = 0 with a single solution x = -c/b.'
      },
      {
        question: 'What is the relationship between the roots and coefficients (Vieta\'s Formulas)?',
        answer: 'For ax² + bx + c = 0 with roots r1 and r2: Sum of roots r1 + r2 = -b/a, and Product of roots r1 × r2 = c/a.'
      },
      {
        question: 'How are complex conjugate roots written?',
        answer: 'When Δ < 0, the roots take the form x = -b/(2a) ± [sqrt(|Δ|) / (2a)] i, where i is the imaginary unit defined as i² = -1.'
      }
    ],
    educationalDisclaimer: 'This algebra solver provides step-by-step pedagogical solutions for secondary school and college mathematics.'
  },
  {
    id: 'derivative-power-rule',
    title: 'Calculus Derivative & Power Rule Solver',
    slug: 'calculus-derivative-calculator',
    categoryId: 'math',
    shortDescription: 'Calculate symbolic polynomial derivatives, tangents, slopes, and higher-order derivatives.',
    description: 'Differentiate polynomial expressions step-by-step using the Power Rule, Sum Rule, and Constant Multiple Rule. Calculates first, second, and third derivatives, tangent line equations, and evaluates instantaneous rates of change at specific x-coordinates.',
    keywords: [
      'derivative calculator',
      'power rule calculus',
      'calculus derivative steps',
      'slope of tangent line',
      'instantaneous rate of change',
      'polynomial differentiation',
      'second derivative concavity'
    ],
    iconName: 'TrendingUp',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Power Rule: d/dx [c × x^n] = c × n × x^(n-1); Tangent Line: y - y1 = f\'(x0) × (x - x0)',
    formulaLatex: '\\frac{d}{dx}\\left[c x^n\\right] = c \\cdot n x^{n-1}, \\quad f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}, \\quad y - f(x_0) = f\'(x_0)(x - x_0)',
    relatedCalculatorIds: [
      'quadratic-formula-roots',
      'matrix-determinant-inverse',
      'statistics'
    ],
    stepByStepInstructions: [
      'Enter the terms of your polynomial function f(x) (e.g. 4x³ - 5x² + 2x - 7).',
      'Optionally specify a point x₀ to evaluate the numerical slope and tangent line.',
      'Review the step-by-step Power Rule application on each term.',
      'Examine the First Derivative f\'(x) (rate of change / velocity) and Second Derivative f\'\'(x) (concavity / acceleration).',
      'Read the generated Tangent Line Equation y = mx + b at the evaluated point.'
    ],
    faqs: [
      {
        question: 'What is the Power Rule in calculus?',
        answer: 'The Power Rule states that for any real exponent n, the derivative of x^n with respect to x is n × x^(n-1). When multiplied by a constant c, d/dx [c x^n] = c × n × x^(n-1).'
      },
      {
        question: 'What is the geometric meaning of the first derivative f\'(x)?',
        answer: 'The first derivative f\'(x) represents the exact slope of the tangent line to the curve at any point x, signifying the instantaneous rate of change of the function.'
      },
      {
        question: 'What does the second derivative f\'\'(x) describe about a curve?',
        answer: 'The second derivative measures the rate of change of the slope, describing the function\'s concavity. If f\'\'(x) > 0, the curve is concave up (holding water); if f\'\'(x) < 0, it is concave down; points where f\'\'(x) = 0 with a sign change are inflection points.'
      },
      {
        question: 'How do you find critical points using derivatives?',
        answer: 'Critical points occur where f\'(x) = 0 or where f\'(x) is undefined. Testing critical points with the First or Second Derivative Test identifies local maxima and minima.'
      },
      {
        question: 'What is the derivative of a constant term (like 5 or -12)?',
        answer: 'The derivative of any constant is zero (d/dx [c] = 0) because a horizontal line has zero slope and undergoes zero change as x varies.'
      },
      {
        question: 'What is the limit definition of a derivative?',
        answer: 'The formal definition of a derivative is the limit of the difference quotient as h approaches zero: f\'(x) = lim_{h→0} [f(x + h) - f(x)] / h.'
      }
    ],
    educationalDisclaimer: 'This calculus differentiation solver handles polynomial and algebraic power rule forms with step-by-step educational breakdowns.'
  },
  {
    id: 'normal-distribution-z-score',
    title: 'Z-Score & Normal Distribution Probability',
    slug: 'z-score-calculator',
    categoryId: 'statistics',
    shortDescription: 'Calculate Z-scores, percentile ranks, and tail area probabilities under the Gaussian bell curve.',
    description: 'Standardize values into Z-scores and calculate cumulative probabilities under standard normal distributions. Features two-tailed, left-tailed, right-tailed, and interval probability solvers for statistical hypothesis testing.',
    keywords: [
      'z score calculator',
      'normal distribution probability',
      'standard normal bell curve',
      'percentile from z score',
      'gaussian distribution area',
      'p value from z score',
      'statistics hypothesis testing'
    ],
    iconName: 'BarChart2',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Z = (x - μ) / σ; Standard Error = σ / sqrt(n); Probability P(Z < z) = Φ(z)',
    formulaLatex: 'Z = \\frac{x - \\mu}{\\sigma}, \\quad \\Phi(z) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^z e^{-t^2/2} dt, \\quad P(a < X < b) = \\Phi\\left(\\frac{b-\\mu}{\\sigma}\\right) - \\Phi\\left(\\frac{a-\\mu}{\\sigma}\\right)',
    relatedCalculatorIds: [
      'confidence-interval-mean',
      'statistics',
      'percentage'
    ],
    stepByStepInstructions: [
      'Enter Population or Sample Mean (μ) and Standard Deviation (σ > 0).',
      'Enter Raw Data Score (x) or Range Bounds (x1 and x2).',
      'Select Probability Area Type: Left-Tail P(X < x), Right-Tail P(X > x), Two-Tail, or Between Bounds.',
      'Review Calculated Z-Score (number of standard deviations away from the mean).',
      'Read the Cumulative Normal Probability Area and corresponding Percentile Rank (0% to 100%).'
    ],
    faqs: [
      {
        question: 'What is a Z-score in statistics?',
        answer: 'A Z-score (standard score) measures the exact number of standard deviations a raw data point (x) lies above or below the population mean (μ). A positive Z-score indicates a value above the mean; a negative Z-score indicates a value below the mean.'
      },
      {
        question: 'What is the Empirical Rule (68-95-99.7 Rule)?',
        answer: 'In any normal distribution: Approximately 68.27% of data falls within ±1 standard deviation of the mean (Z between -1 and +1); 95.45% falls within ±2 standard deviations; and 99.73% falls within ±3 standard deviations.'
      },
      {
        question: 'How do you convert a Z-score into a Percentile?',
        answer: 'The cumulative distribution function Φ(z) gives the area under the standard normal curve to the left of Z. Multiplying this decimal probability by 100 yields the percentile rank (e.g. Z = 0 corresponds to the 50th percentile; Z = 1.96 corresponds to the 97.5th percentile).'
      },
      {
        question: 'What constitutes an outlier in Z-score analysis?',
        answer: 'In standard statistical practice, any observation with an absolute Z-score |Z| > 3.0 (occurring less than 0.27% of the time) is classified as an extreme outlier.'
      },
      {
        question: 'What is the Standard Normal Distribution?',
        answer: 'The standard normal distribution is a special case of the Gaussian distribution with a mean of zero (μ = 0) and a standard deviation of one (σ = 1).'
      },
      {
        question: 'What is the critical Z-value for a 95% two-tailed confidence level?',
        answer: 'For a two-tailed 95% confidence level (α = 0.05, 2.5% in each tail), the critical Z-value is Z = ±1.960.'
      }
    ],
    educationalDisclaimer: 'This normal distribution tool calculates continuous Gaussian probabilities using high-precision numerical approximation algorithms.'
  },
  {
    id: 'confidence-interval-mean',
    title: 'Confidence Interval for Population Mean',
    slug: 'confidence-interval-calculator',
    categoryId: 'statistics',
    shortDescription: 'Calculate 90%, 95%, and 99% confidence margins of error using Z or Student\'s t distribution.',
    description: 'Estimate true population mean parameters from sample data with margin of error bounds. Automatically selects Z-distribution (known population σ) or Student\'s t-distribution (unknown σ, small sample sizes).',
    keywords: [
      'confidence interval calculator',
      'margin of error statistics',
      't distribution confidence interval',
      'population mean estimate',
      '95 percent confidence interval',
      'sample mean standard error',
      'degrees of freedom stats'
    ],
    iconName: 'Sliders',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Margin of Error ME = Critical Value (Z* or t*) × (s / sqrt(n)); CI = [x̄ - ME, x̄ + ME]',
    formulaLatex: '\\text{CI} = \\bar{x} \\pm t^*_{\\alpha/2, df} \\cdot \\frac{s}{\\sqrt{n}}, \\quad \\text{where } df = n - 1, \\quad \\text{Standard Error } SE = \\frac{s}{\\sqrt{n}}',
    relatedCalculatorIds: [
      'normal-distribution-z-score',
      'statistics',
      'percentage'
    ],
    stepByStepInstructions: [
      'Enter Sample Mean (x̄) and Sample Standard Deviation (s).',
      'Enter Sample Size (n ≥ 2).',
      'Select Desired Confidence Level: 90%, 95%, 98%, or 99%.',
      'Specify whether Population Standard Deviation (σ) is Known (Z-test) or Unknown (t-test).',
      'Review Degrees of Freedom (df = n - 1), Standard Error of the Mean (SE), Margin of Error (ME), and Lower/Upper Confidence Interval Bounds.'
    ],
    faqs: [
      {
        question: 'What does a 95% Confidence Interval actually mean?',
        answer: 'A 95% confidence interval means that if we were to repeat the same sampling procedure infinite times and construct confidence intervals from each sample, 95% of those calculated intervals would contain the true, unknown population mean (μ).'
      },
      {
        question: 'When should you use the t-distribution instead of the Z-distribution?',
        answer: 'Use the Student\'s t-distribution whenever the population standard deviation (σ) is unknown and must be estimated using the sample standard deviation (s), which is almost always the case in real-world empirical research.'
      },
      {
        question: 'How does increasing sample size (n) affect the confidence interval width?',
        answer: 'Because sample size is in the denominator of the standard error formula (SE = s / √n), quadrupling the sample size cuts the margin of error in half, producing a much narrower, more precise confidence interval.'
      },
      {
        question: 'What is Margin of Error (ME)?',
        answer: 'Margin of error is the radius of the confidence interval (ME = Critical Value × SE), representing the maximum expected difference between the true population parameter and the sample estimate at a given confidence level.'
      },
      {
        question: 'Why does a 99% confidence interval produce a wider interval than 90%?',
        answer: 'Higher confidence requires greater certainty that the interval captures the true parameter. To be 99% certain, you must cast a wider net (larger critical value t*), widening the margin of error.'
      },
      {
        question: 'What are Degrees of Freedom (df) in t-distributions?',
        answer: 'Degrees of freedom equal sample size minus one (df = n - 1). As sample size increases (df > 100), the Student\'s t-distribution asymptotically converges to the standard normal Z-distribution.'
      }
    ],
    educationalDisclaimer: 'This confidence interval calculator assumes data is drawn randomly from an approximately normal population distribution.'
  },
  {
    id: 'projectile-motion-trajectory',
    title: 'Physics Projectile Motion & Trajectory',
    slug: 'projectile-motion-calculator',
    categoryId: 'physics',
    shortDescription: 'Calculate launch angle, initial velocity, maximum apex height, total flight time, and horizontal range.',
    description: 'Simulate 2D parabolic kinematic motion for classical physics. Calculates horizontal range, apex altitude, flight duration, impact velocity vector, and trajectory equations with gravity acceleration inputs.',
    keywords: [
      'projectile motion calculator',
      'parabolic trajectory physics',
      'launch angle max range',
      'time of flight projectile',
      'apex height kinematics',
      'physics kinematic equations',
      'horizontal launch'
    ],
    iconName: 'Atom',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Range R = (v₀² × sin(2θ)) / g; Max Height H = (v₀ × sin(θ))² / (2g); Time of Flight T = (2 × v₀ × sin(θ)) / g',
    formulaLatex: 'R = \\frac{v_0^2 \\sin(2\\theta)}{g}, \\quad H = \\frac{(v_0 \\sin\\theta)^2}{2g}, \\quad T_{\\text{flight}} = \\frac{2 v_0 \\sin\\theta}{g}, \\quad y(x) = x\\tan\\theta - \\frac{g x^2}{2 v_0^2 \\cos^2\\theta}',
    relatedCalculatorIds: [
      'kinetic-energy-momentum',
      'unit-converter'
    ],
    stepByStepInstructions: [
      'Enter Initial Velocity (v₀ in m/s, ft/s, or mph).',
      'Enter Launch Angle (θ in degrees between 0° and 90°).',
      'Enter Initial Launch Height (h₀ in meters or feet, default 0 for level ground).',
      'Select Gravitational Acceleration (Earth g = 9.80665 m/s², Moon g = 1.62 m/s², Mars g = 3.71 m/s²).',
      'Review Maximum Apex Height, Total Flight Time to Ground, Maximum Horizontal Range, and Final Impact Velocity Angle.'
    ],
    faqs: [
      {
        question: 'What launch angle produces the maximum horizontal range on level ground?',
        answer: 'In the absence of air resistance on level ground (h₀ = 0), a 45-degree launch angle produces maximum horizontal range because sin(2θ) reaches its mathematical peak of 1.0 when 2θ = 90° (θ = 45°).'
      },
      {
        question: 'Why are horizontal and vertical motions analyzed independently in kinematics?',
        answer: 'In classical mechanics, horizontal velocity (v_x = v₀ cos θ) remains constant (neglecting air drag) because gravity acts exclusively in the vertical downward direction (a_y = -g).'
      },
      {
        question: 'What happens to the optimal launch angle when firing from an elevated cliff (h₀ > 0)?',
        answer: 'When launching from an elevated platform above the landing plane, the optimal angle for maximum range is less than 45 degrees (typically 35°–42° depending on cliff height).'
      },
      {
        question: 'Why do two complementary angles (e.g. 30° and 60°) achieve the exact same horizontal range?',
        answer: 'Because sin(2 × 30°) = sin(60°) = √3/2, and sin(2 × 60°) = sin(120°) = √3/2. The 60° launch achieves greater height and flight time, while the 30° launch achieves a faster, flatter trajectory.'
      },
      {
        question: 'What vertical velocity does a projectile have at its apex?',
        answer: 'At the exact highest apex of its parabolic trajectory, the vertical velocity component is momentarily zero (v_y = 0), while horizontal velocity remains v_x = v₀ cos θ.'
      },
      {
        question: 'How does aerodynamic air drag alter real-world projectile trajectories?',
        answer: 'Air resistance reduces both maximum height and range, creates an asymmetrical trajectory (steeper descent than ascent), and limits terminal velocity.'
      }
    ],
    educationalDisclaimer: 'This physics kinematic solver models idealized projectile motion in a vacuum without aerodynamic drag.'
  },
  {
    id: 'kinetic-energy-momentum',
    title: 'Kinetic Energy, Momentum & Work',
    slug: 'kinetic-energy-calculator',
    categoryId: 'physics',
    shortDescription: 'Calculate Joules of Kinetic Energy (KE), Linear Momentum (p), and Mechanical Work (W).',
    description: 'Solve classical mechanics energy relationships. Calculates translational kinetic energy in Joules/Calories, momentum in kg·m/s, mechanical work in Newton-meters, and braking stopping distances from velocity and mass inputs.',
    keywords: [
      'kinetic energy calculator',
      'momentum calculator',
      'joules to foot pounds',
      'work energy theorem',
      'stopping distance physics',
      'classical mechanics solver',
      'linear momentum'
    ],
    iconName: 'Zap',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Kinetic Energy KE = 0.5 × m × v²; Linear Momentum p = m × v; Work W = F × d = ΔKE; Stopping Distance d = (m × v²) / (2 × F)',
    formulaLatex: 'E_k = \\frac{1}{2} m v^2 = \\frac{p^2}{2m}, \\quad p = m \\cdot v, \\quad W = \\Delta E_k = F \\cdot d',
    relatedCalculatorIds: [
      'projectile-motion-trajectory',
      'unit-converter'
    ],
    stepByStepInstructions: [
      'Enter Object Mass (kg, grams, lbs, or slugs).',
      'Enter Object Velocity (m/s, km/h, ft/s, or mph).',
      'Optionally enter Applied Braking Force (Newtons or lbf) to calculate stopping distance.',
      'Review Kinetic Energy in Joules (J), kilojoules (kJ), and Foot-Pounds (ft-lbs).',
      'Examine Linear Momentum (kg·m/s) and Required Mechanical Braking Work (W = ΔKE).'
    ],
    faqs: [
      {
        question: 'Why does doubling velocity quadruple kinetic energy?',
        answer: 'Kinetic energy is proportional to the square of velocity (KE = 0.5 × m × v²). If velocity doubles from 30 mph to 60 mph, the vehicle carries (2)² = 4 times more kinetic energy, requiring 4 times longer braking stopping distance.'
      },
      {
        question: 'What is the Work-Energy Theorem?',
        answer: 'The Work-Energy Theorem states that the net mechanical work done by all forces acting on an object is equal to the change in its kinetic energy: W_net = ΔKE = KE_final - KE_initial.'
      },
      {
        question: 'What is the difference between Kinetic Energy and Momentum?',
        answer: 'Momentum (p = m × v) is a vector quantity conserved in all collisions (elastic and inelastic). Kinetic Energy (KE = 0.5 m v²) is a scalar quantity conserved only in perfectly elastic collisions; in inelastic collisions, KE transforms into heat and deformation.'
      },
      {
        question: 'How is Kinetic Energy related to Momentum mathematically?',
        answer: 'Kinetic Energy can be expressed in terms of momentum as: KE = p² / (2m).'
      },
      {
        question: 'What is 1 Joule of energy in practical terms?',
        answer: 'One Joule is approximately the mechanical work required to lift a standard medium apple (about 100 grams) vertically by 1 meter against Earth\'s gravity.'
      },
      {
        question: 'Does mass or velocity have a bigger impact on vehicle crash severity?',
        answer: 'Velocity has an exponential impact due to the v² relationship. A 20% increase in vehicle speed results in a 44% increase in crash kinetic energy dissipated on impact.'
      }
    ],
    educationalDisclaimer: 'This physics mechanics calculator models non-relativistic classical Newtonian kinetic energy (v << speed of light c).'
  },
  {
    id: 'ideal-gas-law-pvnrt',
    title: 'Ideal Gas Law PV = nRT Solver',
    slug: 'ideal-gas-law-calculator',
    categoryId: 'chemistry',
    shortDescription: 'Calculate Pressure (P), Volume (V), Moles (n), or Temperature (T) for ideal gases.',
    description: 'Solve thermodynamic gas equations across atmospheres, liters, moles, and Kelvin using the universal gas constant R. Features conversions for STP conditions, molar mass, and gas density calculations.',
    keywords: [
      'ideal gas law calculator',
      'pvnrt solver',
      'pressure volume moles temperature',
      'universal gas constant r',
      'stp molar volume 22.4',
      'chemistry gas law',
      'gas density calculator'
    ],
    iconName: 'FlaskConical',
    isPopular: true,
    isNew: true,
    formulaDescription: 'PV = nRT; P = (nRT) / V; V = (nRT) / P; n = (PV) / (RT); T = (PV) / (nR); R = 0.082057 L·atm/(mol·K) = 8.31446 J/(mol·K)',
    formulaLatex: 'P V = n R T, \\quad \\rho = \\frac{P M}{R T}, \\quad n = \\frac{m}{M}',
    relatedCalculatorIds: [
      'molarity-dilution-m1v1',
      'ph-poh-hydrogen-ion',
      'unit-converter'
    ],
    stepByStepInstructions: [
      'Select the target variable to solve: Pressure (P), Volume (V), Amount of Substance (n in moles), or Temperature (T).',
      'Enter the three known parameters with your preferred measurement units (atm, kPa, bar, Liters, m³, °C, °F, or K).',
      'Optionally enter Molar Mass (g/mol) to calculate total gas mass and density (g/L).',
      'Review the step-by-step substitution into PV = nRT.',
      'Check Standard Temperature and Pressure (STP) comparisons (where 1 mole ideal gas = 22.414 L).'
    ],
    faqs: [
      {
        question: 'What is the Ideal Gas Law equation and what does each variable mean?',
        answer: 'P is absolute pressure, V is volume, n is the number of moles of gas, R is the universal gas constant (0.08206 L·atm/mol·K or 8.314 J/mol·K), and T is absolute temperature measured in Kelvin (K = °C + 273.15).'
      },
      {
        question: 'Why must temperature always be converted to Kelvin in gas law calculations?',
        answer: 'Gas volume and pressure are directly proportional to average molecular kinetic energy, which scales from absolute zero (0 Kelvin). Using Celsius or Fahrenheit would result in division by zero or negative volumes.'
      },
      {
        question: 'What is Standard Temperature and Pressure (STP)?',
        answer: 'Standard STP defined by IUPAC is 0°C (273.15 K) and 1 bar (100 kPa) or 1 atm. At standard 1 atm STP, exactly 1.0 mole of any ideal gas occupies 22.414 Liters of volume.'
      },
      {
        question: 'When do real gases deviate from ideal gas behavior?',
        answer: 'Real gases deviate from ideal behavior under high pressures (where molecular volume is no longer negligible) and low temperatures (where intermolecular attractive forces cause condensation), modeled by the Van der Waals equation.'
      },
      {
        question: 'What are the individual gas laws combined inside PV = nRT?',
        answer: 'Boyle\'s Law (P ∝ 1/V), Charles\'s Law (V ∝ T), and Avogadro\'s Law (V ∝ n) combine to form the universal Ideal Gas Law.'
      },
      {
        question: 'How do you calculate gas density (g/L) using the Ideal Gas Law?',
        answer: 'Density ρ = (P × Molar Mass) / (R × T). Heavier molecular gases (like CO₂ at 44 g/mol) are denser than lighter gases (like Helium at 4 g/mol) at equivalent temperature and pressure.'
      }
    ],
    educationalDisclaimer: 'This chemistry tool solves ideal gas equations assuming non-interacting point particles with elastic collisions.'
  },
  {
    id: 'molarity-dilution-m1v1',
    title: 'Solution Molarity & Dilution M1V1 = M2V2',
    slug: 'molarity-dilution-calculator',
    categoryId: 'chemistry',
    shortDescription: 'Calculate initial/final molar concentrations, stock volume requirements, and solute mass.',
    description: 'Lab chemistry dilution solver. Calculates solution molarity (moles/Liter), required mass of dry solute in grams, and stock solution dilution volumes using the standard laboratory formula M₁V₁ = M₂V₂.',
    keywords: [
      'molarity calculator',
      'dilution m1v1 m2v2',
      'molar concentration chemistry',
      'stock solution dilution',
      'solute mass grams to molarity',
      'laboratory solution prep',
      'moles per liter'
    ],
    iconName: 'FlaskConical',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Molarity M = Moles of Solute / Volume of Solution (L); Solute Mass (g) = M × V(L) × Molar Mass (g/mol); Dilution: M1 × V1 = M2 × V2',
    formulaLatex: 'M = \\frac{n}{V_{\\text{liters}}} = \\frac{m}{M_w \\cdot V}, \\quad M_1 V_1 = M_2 V_2, \\quad V_{\\text{solvent}} = V_2 - V_1',
    relatedCalculatorIds: [
      'ph-poh-hydrogen-ion',
      'ideal-gas-law-pvnrt',
      'unit-converter'
    ],
    stepByStepInstructions: [
      'Choose Calculation Mode: Molarity from Solute Mass OR Stock Solution Dilution (M₁V₁ = M₂V₂).',
      'For Molarity: Enter Solute Formula Mass (g/mol), Desired Volume (mL or L), and Target Molarity (mol/L).',
      'For Dilution: Enter Initial Stock Concentration (M₁), Target Final Concentration (M₂), and Target Final Volume (V₂).',
      'Review Required Solute Mass (grams) or Required Volume of Stock Solution (V₁) and Volume of Solvent / Water to add (V_diluent = V₂ - V₁).'
    ],
    faqs: [
      {
        question: 'What is Molarity (M)?',
        answer: 'Molarity (molar concentration) is the number of moles of solute dissolved per liter of total solution (mol/L). A 1.0 M NaCl solution contains 1.0 mole (58.44 grams) of sodium chloride in 1.0 liter of aqueous solution.'
      },
      {
        question: 'How does the dilution formula M₁V₁ = M₂V₂ work?',
        answer: 'Because adding solvent (pure water) does not change the total amount of solute moles in the beaker, initial moles (M₁ × V₁) must equal final moles (M₂ × V₂).'
      },
      {
        question: 'What is the difference between Molarity (M) and Molality (m)?',
        answer: 'Molarity is moles of solute per liter of total solution (temperature dependent due to thermal liquid expansion). Molality (m) is moles of solute per kilogram of pure solvent (temperature independent).'
      },
      {
        question: 'Why should acid always be added to water, never water to acid?',
        answer: 'Diluting concentrated acids (such as sulfuric acid) is highly exothermic. Adding water to concentrated acid can cause violent localized boiling and caustic acid splashing. Always add concentrated acid slowly to water ("AAA - Always Add Acid").'
      },
      {
        question: 'How do you calculate grams of chemical needed to prepare a solution?',
        answer: 'Mass (grams) = Desired Molarity (mol/L) × Volume (L) × Molar Mass (g/mol).'
      },
      {
        question: 'Can M₁V₁ = M₂V₂ be used with any volume units (mL, L, oz)?',
        answer: 'Yes, as long as the same units are used for both V₁ and V₂ (e.g. both in mL or both in L).'
      }
    ],
    educationalDisclaimer: 'This chemistry laboratory calculator provides stoichiometric guidelines. Always wear personal protective equipment (PPE) and consult Safety Data Sheets (SDS) when handling chemicals.'
  },
  {
    id: 'ph-poh-hydrogen-ion',
    title: 'pH, pOH & Hydrogen Ion Concentration',
    slug: 'ph-calculator',
    categoryId: 'chemistry',
    shortDescription: 'Calculate acid-base pH, pOH, [H+] hydronium, and [OH-] hydroxide ion concentrations.',
    description: 'Logarithmic acid-base chemistry scale solver. Computes pH, pOH, hydronium ion concentration [H₃O⁺], hydroxide ion concentration [OH⁻], and acid/alkaline classification at standard 25°C aqueous equilibrium.',
    keywords: [
      'ph calculator',
      'poh calculator',
      'hydrogen ion concentration',
      'hydronium concentration',
      'acid base ph scale',
      'chemistry ph solver',
      'kw water autoionization'
    ],
    iconName: 'Activity',
    isPopular: true,
    isNew: true,
    formulaDescription: 'pH = -log₁₀[H⁺]; pOH = -log₁₀[OH⁻]; pH + pOH = 14 (at 25°C); [H⁺] = 10^(-pH); [OH⁻] = 10^(-pOH); Kw = [H⁺][OH⁻] = 1.0 × 10^(-14)',
    formulaLatex: '\\text{pH} = -\\log_{10}[\\text{H}^+], \\quad \\text{pOH} = -\\log_{10}[\\text{OH}^-], \\quad \\text{pH} + \\text{pOH} = 14, \\quad [\\text{H}^+] = 10^{-\\text{pH}}',
    relatedCalculatorIds: [
      'molarity-dilution-m1v1',
      'ideal-gas-law-pvnrt',
      'water-intake'
    ],
    stepByStepInstructions: [
      'Enter any one known parameter: pH (0 to 14), pOH, Hydrogen Ion Concentration [H⁺] in mol/L, or Hydroxide Ion Concentration [OH⁻] in mol/L.',
      'Review the automatically calculated remaining three chemical parameters.',
      'Check Acid/Base Classification: Strongly Acidic (pH < 3), Weakly Acidic (pH 3–6), Neutral (pH = 7.0), Weakly Alkaline (pH 8–11), or Strongly Alkaline (pH > 11).',
      'Examine common comparative substance benchmarks (e.g. Stomach Acid pH 1.5, Lemon Juice pH 2.0, Coffee pH 5.0, Pure Water pH 7.0, Bleach pH 12.5).'
    ],
    faqs: [
      {
        question: 'What is the pH scale and why is it logarithmic?',
        answer: 'The pH scale ("potential of Hydrogen") measures the acidity or alkalinity of an aqueous solution on a base-10 logarithmic scale. Each whole integer change on the pH scale represents a 10-fold change in hydrogen ion concentration (e.g. pH 4 is 10 times more acidic than pH 5 and 100 times more acidic than pH 6).'
      },
      {
        question: 'Why is pure neutral water pH 7.0 at 25°C?',
        answer: 'Due to the autoionization of water (H₂O ⇌ H⁺ + OH⁻), pure water contains equal concentrations of [H⁺] = 1.0 × 10⁻⁷ M and [OH⁻] = 1.0 × 10⁻⁷ M, yielding a pH of -log₁₀(10⁻⁷) = 7.0.'
      },
      {
        question: 'Can pH ever be negative or greater than 14?',
        answer: 'Yes. Extremely concentrated strong acids (such as 12 M Hydrochloric Acid) can have negative pH values (e.g. pH ≈ -1.08), while concentrated saturated sodium hydroxide can exceed pH 14.'
      },
      {
        question: 'What is the relationship between pH and pOH?',
        answer: 'At standard ambient temperature (25°C / 298.15 K), the ion product of water Kw is 1.0 × 10⁻¹⁴, which mathematically dictates that pH + pOH = 14.0.'
      },
      {
        question: 'How does temperature affect the pH of pure water?',
        answer: 'The autoionization of water is endothermic. As water temperature rises to 60°C, Kw increases, shifting the neutral pH of pure water down to ~6.5 (though the water remains chemically neutral because [H⁺] still equals [OH⁻]).'
      },
      {
        question: 'What is the physiological pH range of human blood?',
        answer: 'Healthy human arterial blood is tightly regulated by bicarbonate buffering systems between pH 7.35 and 7.45. Values below 7.35 indicate acidosis, while values above 7.45 indicate alkalosis.'
      }
    ],
    educationalDisclaimer: 'This aqueous acid-base calculator assumes standard dilute solutions at 25°C where Kw = 1.0 × 10⁻¹⁴.'
  },
  {
    id: 'currency-fx-rate-converter',
    title: 'Multi-Currency Exchange Rate Converter',
    slug: 'currency-converter',
    categoryId: 'conversions',
    shortDescription: 'Convert live foreign currency valuations across USD, EUR, GBP, JPY, CAD, AUD, and CHF.',
    description: 'Real-time multi-currency foreign exchange (Forex) converter. Calculate international exchange rates, travel spending conversions, and commercial cross-currency conversions with customizable bank spread markup fees.',
    keywords: [
      'currency converter',
      'forex exchange rates',
      'usd to eur converter',
      'gbp to usd live',
      'foreign exchange fee markup',
      'international travel money',
      'currency conversion matrix'
    ],
    iconName: 'DollarSign',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Converted Amount = Base Amount × (Target FX Rate / Base FX Rate) × (1 - Spread Fee %)',
    formulaLatex: '\\text{Amount}_{\\text{target}} = \\text{Amount}_{\\text{base}} \\times \\frac{\\text{Rate}_{\\text{target}}}{\\text{Rate}_{\\text{base}}} \\times (1 - \\text{Fee}\\%)',
    relatedCalculatorIds: [
      'percentage',
      'sales-tax-tip',
      'unit-converter'
    ],
    stepByStepInstructions: [
      'Enter the Amount to convert in your base currency.',
      'Select your Source Currency (e.g. USD, EUR, GBP, JPY, CAD, AUD, CHF).',
      'Select your Destination Target Currency.',
      'Optionally specify your Credit Card / ATM Foreign Transaction Fee (e.g. 0% for travel cards, 3% standard).',
      'Review Converted Value, Mid-Market Rate, Inverse Rate, and Fee Deductions.',
      'Examine the multi-currency comparison matrix for quick multi-country reference.'
    ],
    faqs: [
      {
        question: 'What is the Mid-Market (Interbank) exchange rate?',
        answer: 'The mid-market rate is the midpoint between the wholesale buy (bid) and sell (ask) prices established by major global banks in foreign exchange markets. It is the real, un-marked-up benchmark rate.'
      },
      {
        question: 'What is a Foreign Transaction Fee on credit cards?',
        answer: 'A foreign transaction fee is an extra surcharge (typically 1% to 3%) assessed by credit card issuing banks on purchases made in foreign currencies or processed through overseas merchant gateways.'
      },
      {
        question: 'What is Dynamic Currency Conversion (DCC) at overseas ATMs and terminals?',
        answer: 'DCC occurs when an overseas card reader asks if you want to be billed in your home currency (e.g. USD) instead of local currency (e.g. EUR). Always choose LOCAL currency; DCC applies exorbitant hidden markup exchange rates (often 5%–10% higher).'
      },
      {
        question: 'Why do retail airport currency exchange kiosks offer worse rates than banks?',
        answer: 'Airport exchange booths carry high retail real estate overhead and charge wide bid-ask spreads (often 8% to 15% worse than interbank rates) in addition to fixed transaction fees.'
      },
      {
        question: 'How does central bank interest rate policy influence currency valuations?',
        answer: 'Higher benchmark central bank interest rates typically attract foreign capital seeking higher yields, strengthening the domestic currency against foreign trading pairs.'
      },
      {
        question: 'What is the difference between fixed and floating exchange rates?',
        answer: 'Floating exchange rates fluctuate constantly based on global market supply and demand. Fixed (pegged) exchange rates are artificially maintained by a nation\'s central bank against a reserve currency like the US Dollar.'
      }
    ],
    educationalDisclaimer: 'This currency converter uses standard reference benchmark exchange rates. Retail banking spreads and credit card processing surcharges may vary by financial institution.'
  },
  {
    id: 'date-add-subtract-business-days',
    title: 'Date Calculator & Business Days Add/Subtract',
    slug: 'date-add-subtract-calculator',
    categoryId: 'time',
    shortDescription: 'Add or subtract calendar days, weeks, months, or business working days excluding weekends.',
    description: 'Comprehensive calendar date calculator. Add or subtract calendar days, business working days (excluding Saturday and Sunday), or federal holidays. Calculate elapsed time durations, target project deadlines, and countdown milestones.',
    keywords: [
      'date calculator',
      'add business days to date',
      'working days calculator',
      'deadline date solver',
      'days between dates',
      'exclude weekends date',
      'calendar math'
    ],
    iconName: 'Clock',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Target Date = Start Date ± N Working Days (Skipping Saturdays and Sundays); Elapsed Days = End Date - Start Date',
    formulaLatex: '\\text{Target} = D_{\\text{start}} + N_{\\text{business days}} \\quad (\\text{modulo 7 weekend skipping})',
    relatedCalculatorIds: [
      'time-date',
      'sleep-cycle',
      'percentage'
    ],
    stepByStepInstructions: [
      'Select Operation: Add to Date, Subtract from Date, or Calculate Days Between Two Dates.',
      'Select the Start Date.',
      'Enter the Number of Days, Weeks, or Months to add/subtract.',
      'Toggle "Business Days Only" to automatically skip Saturdays and Sundays.',
      'Review the Calculated Target Date, Day of the Week, and Total Calendar Duration.'
    ],
    faqs: [
      {
        question: 'How are Business Days calculated when adding days to a date?',
        answer: 'The calculator advances day by day, skipping any date that falls on a Saturday or Sunday, ensuring only active working days count toward your specified project duration.'
      },
      {
        question: 'How many business days are in a standard calendar year?',
        answer: 'A standard 365-day year contains 52 weeks (104 weekend days), resulting in 260 to 261 working business days (or approximately 250 working days after deducting standard US federal holidays).'
      },
      {
        question: 'How does leap year affect date calculations?',
        answer: 'Leap years add an extra 29th day to February (every 4 years, except years divisible by 100 unless also divisible by 400), making the total year length 366 days.'
      },
      {
        question: 'What is the difference between Calendar Days and Business Days in legal contracts?',
        answer: 'Legal contracts specifying "calendar days" include all consecutive days including weekends and holidays. Contracts specifying "business days" or "court days" exclude weekends and official government holidays.'
      },
      {
        question: 'How do you calculate exact age or duration between two dates?',
        answer: 'By computing the delta in years, months, and days while properly accounting for the varying month lengths (28, 29, 30, or 31 days).'
      },
      {
        question: 'What is ISO 8601 date format standard?',
        answer: 'ISO 8601 represents dates in the international standard format YYYY-MM-DD (e.g. 2026-08-31), preventing cross-border confusion between US (MM/DD/YYYY) and European (DD/MM/YYYY) formats.'
      }
    ],
    educationalDisclaimer: 'This calendar date calculator performs Gregorian calendar mathematics. Verify court deadlines with local jurisdiction rules regarding judicial emergency holidays.'
  },
  {
    id: 'ai-llm-token-cost-estimator',
    title: 'AI LLM Token & API Cost Estimator',
    slug: 'ai-token-cost-calculator',
    categoryId: 'ai',
    shortDescription: 'Estimate API pricing for Claude 3.5, GPT-4o, Gemini 1.5, and open-source models based on token usage.',
    description: 'Calculate monthly AI software development and inference API costs per million tokens. Compare input prompt tokens, output completion tokens, prompt caching discounts, and monthly call volume across leading AI LLM foundation models.',
    keywords: [
      'ai token cost calculator',
      'gpt 4o api pricing',
      'claude 3.5 sonnet cost',
      'gemini 1.5 flash token pricing',
      'llm api price per million',
      'ai software cost estimator',
      'prompt caching savings'
    ],
    iconName: 'Bot',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Monthly Cost $ = [ (Input Tokens × Input Price/1M) + (Output Tokens × Output Price/1M) ] × Monthly API Requests',
    formulaLatex: '\\text{Cost} = N_{\\text{req}} \\times \\left( \\frac{T_{\\text{in}} \\times P_{\\text{in}}}{10^6} + \\frac{T_{\\text{out}} \\times P_{\\text{out}}}{10^6} \\right)',
    relatedCalculatorIds: [
      'prompt-word-character-counter',
      'percentage',
      'startup-burn-rate'
    ],
    stepByStepInstructions: [
      'Select an AI Model Preset (e.g. GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Gemini 1.5 Flash, Llama 3 70B) or enter custom pricing.',
      'Enter Average Prompt Input Tokens per API call.',
      'Enter Average Output Completion Tokens per API call.',
      'Enter Expected Monthly Request Volume (e.g. 50,000 requests/month).',
      'Optionally toggle Prompt Caching (up to 50%–80% input discount for recurring context).',
      'Review Estimated Per-Call Cost, Monthly Total Cost, Annualized Spend, and Model Comparison breakdown.'
    ],
    faqs: [
      {
        question: 'What is a Token in Large Language Models (LLMs)?',
        answer: 'A token is the basic unit of text processed by LLM neural networks using Byte-Pair Encoding (BPE). In English, 1 token is roughly equivalent to 4 characters or 0.75 words (so 1,000 words ≈ 1,333 tokens).'
      },
      {
        question: 'Why are output tokens significantly more expensive than input tokens?',
        answer: 'Input tokens are processed in parallel during the prefill phase, maximizing GPU tensor core utilization. Output tokens must be generated sequentially one token at a time during the autoregressive decode phase, consuming far more GPU compute and memory bandwidth.'
      },
      {
        question: 'What is Prompt Caching in modern AI APIs?',
        answer: 'Prompt caching allows developers to store static system instructions, documentation, or long codebase contexts on the API provider\'s servers, reducing input token pricing by 50% to 90% and slashing latency on subsequent requests.'
      },
      {
        question: 'How do multimodal inputs (images, audio, video) count toward token costs?',
        answer: 'Vision models convert images into a grid of image patches (tiles), with each high-resolution image typically consuming 500 to 1,600 input tokens depending on resolution.'
      },
      {
        question: 'What is the cost difference between flagship models (GPT-4o/Claude Sonnet) and lightweight models (Gemini Flash)?',
        answer: 'Lightweight models (like Gemini 1.5 Flash or GPT-4o-mini) cost roughly 10x to 30x less per million tokens than frontier models, making them ideal for high-volume classification, summarization, and routing.'
      },
      {
        question: 'How can developers optimize LLM API costs in production?',
        answer: 'Techniques include: 1) Using prompt compression and aggressive trimming of whitespace/logs; 2) Implementing prompt caching; 3) Routing simple queries to smaller models and complex reasoning to larger models; 4) Enforcing strict max_tokens completion limits.'
      }
    ],
    educationalDisclaimer: 'This AI API pricing calculator uses published provider pricing tiers. Cloud infrastructure discounts and volume enterprise commitments may reduce actual invoiced costs.'
  },
  {
    id: 'prompt-word-character-counter',
    title: 'AI Prompt Token & Word Counter',
    slug: 'prompt-word-counter',
    categoryId: 'ai',
    shortDescription: 'Calculate word count, character count, and estimated BPE token count for AI prompts.',
    description: 'Analyze text length, token density, sentence structure, and reading time for AI prompts and written copy. Estimates Byte-Pair Encoding (BPE) token counts for OpenAI, Anthropic, and Gemini context window limits.',
    keywords: [
      'prompt token counter',
      'word count ai prompt',
      'character counter',
      'bpe token estimator',
      'llm context window checker',
      'reading time analyzer',
      'prompt length optimizer'
    ],
    iconName: 'FileText',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Estimated BPE Tokens ≈ Word Count × 1.33 (or Character Count / 4); Reading Time = Words / 200 WPM; Speaking Time = Words / 130 WPM',
    formulaLatex: 'T_{\\text{tokens}} \\approx \\frac{N_{\\text{chars}}}{4} \\approx 1.33 \\times N_{\\text{words}}, \\quad t_{\\text{read}} = \\frac{N_{\\text{words}}}{200}',
    relatedCalculatorIds: [
      'ai-llm-token-cost-estimator',
      'reading-time-word-count',
      'percentage'
    ],
    stepByStepInstructions: [
      'Type or paste your prompt, document, or code into the interactive text editor.',
      'Review live real-time statistics: Total Words, Characters (with and without spaces), Sentences, and Paragraphs.',
      'Check Estimated BPE Token Count and Context Window Utilization percentage (e.g. of 8k, 32k, 128k, or 1M context limits).',
      'Review Silent Reading Time and Spoken Presentation Duration.',
      'Examine Top Keyword Frequency density to optimize prompt clarity.'
    ],
    faqs: [
      {
        question: 'Why does character count not equal token count?',
        answer: 'Tokenizers (like tiktoken or SentencePiece) break text into semantic fragments. Common words (like "the", " apple") are single tokens, while rare words, foreign languages, and punctuation are split into multiple smaller tokens.'
      },
      {
        question: 'What is the average token-to-word ratio for English text?',
        answer: 'For standard English prose, 1,000 words typically converts to approximately 1,300 to 1,350 tokens (a ratio of ~1.33 tokens per word, or roughly 4 characters per token).'
      },
      {
        question: 'Why does programming code consume more tokens per character than plain English?',
        answer: 'Source code contains specialized syntax, camelCase variable names, brackets, indentation whitespace, and symbols that often do not match common linguistic dictionary tokens, splitting into more sub-tokens.'
      },
      {
        question: 'What is a Context Window in LLMs?',
        answer: 'The context window is the maximum number of total tokens (prompt input + output completion + conversational history) that an AI model can process in a single inference session (ranging from 8k to 2,000,000+ tokens).'
      },
      {
        question: 'How do emojis and special characters affect token count?',
        answer: 'Emojis and non-Latin unicode characters (such as Arabic, Chinese, or Cyrillic) often require 2 to 4+ tokens per single character because BPE tokenizers prioritize Latin alphabet training data.'
      },
      {
        question: 'How can you shorten prompt token length without losing semantic meaning?',
        answer: 'Remove redundant conversational filler phrases ("Please assist me by kindly..."), provide concise structured examples (few-shot), use Markdown formatting, and eliminate duplicate documentation.'
      }
    ],
    educationalDisclaimer: 'This token estimator provides high-accuracy BPE approximations. Exact token counts may vary slightly across specific tokenizer algorithms (cl100k_base vs o200k_base vs Llama).'
  },
  {
    id: 'weighted-gpa-scale-4-5',
    title: 'High School Weighted GPA (4.0 & 5.0 Scale)',
    slug: 'weighted-gpa-calculator',
    categoryId: 'education',
    shortDescription: 'Calculate weighted cumulative GPA incorporating AP, IB (+1.0), and Honors (+0.5) bonus points.',
    description: 'Comprehensive academic GPA calculator. Computes unweighted (4.0 scale) and weighted (5.0 scale) grade point averages across regular, Honors, Advanced Placement (AP), and International Baccalaureate (IB) courses with credit weighting.',
    keywords: [
      'weighted gpa calculator',
      'high school gpa scale',
      'ap honors gpa boost',
      '5.0 gpa scale',
      'unweighted vs weighted gpa',
      'college admissions gpa',
      'cumulative grade point average'
    ],
    iconName: 'GraduationCap',
    isPopular: true,
    isNew: true,
    formulaDescription: 'Unweighted Points = Standard Letter Grade (A=4, B=3, C=2, D=1, F=0); Weighted Points = Base Points + Course Bonus (AP/IB +1.0, Honors +0.5); GPA = Sum(Points × Credits) / Total Credits',
    formulaLatex: '\\text{GPA}_{\\text{weighted}} = \\frac{\\sum_{i=1}^n (G_i + W_i) \\cdot C_i}{\\sum_{i=1}^n C_i}, \\quad \\text{where } W_{\\text{AP/IB}} = 1.0, \\, W_{\\text{Honors}} = 0.5',
    relatedCalculatorIds: [
      'gpa',
      'percentage'
    ],
    stepByStepInstructions: [
      'Add your academic courses one by one (or select a preset grade level).',
      'Select Course Level: Regular (Standard 4.0), Honors (+0.5 weight), or AP / IB / Dual Enrollment (+1.0 weight).',
      'Select Letter Grade earned (A+, A, A-, B+, B, etc.) and Course Credit Units (e.g. 1.0 or 0.5).',
      'Review your Unweighted GPA (4.0 Scale) and Weighted GPA (5.0 Scale).',
      'Check Total Credits earned and Academic Honor Roll standing.'
    ],
    faqs: [
      {
        question: 'What is the difference between Unweighted GPA and Weighted GPA?',
        answer: 'Unweighted GPA measures academic grades on a strict 4.0 scale regardless of course difficulty (an A in standard art equals an A in AP Calculus). Weighted GPA awards extra quality points (+0.5 for Honors, +1.0 for AP/IB courses) to reflect rigorous academic rigor (an A in AP Calculus = 5.0).'
      },
      {
        question: 'How do college admissions officers evaluate Weighted vs Unweighted GPA?',
        answer: 'Most selective universities recalculate their own standardized GPA from high school transcripts, evaluating academic rigor (number of AP/IB courses taken) alongside unweighted academic performance.'
      },
      {
        question: 'What are the standard letter grade point values on a 4.0 scale?',
        answer: 'A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, F = 0.0.'
      },
      {
        question: 'Can a student earn a GPA higher than 4.0?',
        answer: 'Yes, on a weighted 5.0 scale, students who take multiple Honors and AP/IB courses and earn A\'s can achieve cumulative GPAs ranging from 4.1 to 4.8+.'
      },
      {
        question: 'Do F grades receive extra weight in AP courses?',
        answer: 'No. In virtually all high school grading policies, a failing grade (F) earns 0.0 grade points regardless of course level.'
      },
      {
        question: 'How do Dual Enrollment college courses count toward weighted GPA?',
        answer: 'Most high schools award Dual Enrollment college courses the same +1.0 weighted boost as Advanced Placement (AP) and International Baccalaureate (IB) courses.'
      }
    ],
    educationalDisclaimer: 'This weighted GPA calculator uses standard North American academic weighting conventions. Individual school district grading scales and class rank calculations may vary.'
  }
];

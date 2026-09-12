import { CategoryId } from '../types';

export interface CategoryFaqItem {
  q: string;
  a: string;
}

export const CATEGORY_FAQS: Record<CategoryId, CategoryFaqItem[]> = {
  finance: [
    {
      q: 'How accurate are the financial and amortization schedules on Calcora?',
      a: 'Our amortization and compound interest formulas adhere strictly to standard banking equations. Monthly schedules compute exact principal reduction, interest accrual, cumulative costs, and extra payment payoffs.'
    },
    {
      q: 'Does Calcora store or transmit my financial data?',
      a: 'No. All calculations run strictly client-side inside your browser memory using local JavaScript. No financial numbers, income figures, or account balances are ever sent to remote servers.'
    },
    {
      q: 'How does compounding frequency impact investment and savings growth?',
      a: 'More frequent compounding (e.g., daily or monthly vs. annually) causes interest to accrue on previously accumulated interest earlier, generating significantly higher compound returns over 10- to 30-year horizons.'
    },
    {
      q: 'Can I factor extra monthly or annual payments into debt payoff calculators?',
      a: 'Yes. Most Calcora debt and mortgage calculators allow you to model recurring extra principal payments to visualize total interest savings and shortened payoff timelines.'
    }
  ],
  investing: [
    {
      q: 'What is the difference between Cap Rate and Cash-on-Cash Return?',
      a: 'Cap Rate evaluates Net Operating Income (NOI) relative to total property value without considering debt financing, whereas Cash-on-Cash Return measures annual pre-tax cash flow strictly against out-of-pocket cash invested.'
    },
    {
      q: 'How does Dollar-Cost Averaging (DCA) compare to Lump-Sum investing?',
      a: 'DCA systematically deploys fixed capital over regular intervals to mitigate timing risk and reduce the emotional impact of market volatility, while lump-sum investing maximizes time-in-the-market during upward trending regimes.'
    },
    {
      q: 'How does dividend reinvestment (DRIP) accelerate total return?',
      a: 'Reinvesting dividend distributions purchases additional fractional shares automatically, which in turn generate their own future dividend payments—creating an exponential compounding growth snowball.'
    },
    {
      q: 'How are Options Greeks (Delta, Gamma, Theta, Vega, Rho) calculated on Calcora?',
      a: 'Calcora uses the standard continuous Black-Scholes-Merton model for European options, computing closed-form analytical first and second partial derivatives for option price sensitivities.'
    }
  ],
  taxes: [
    {
      q: 'How do progressive federal tax brackets work?',
      a: 'In a progressive tax system, taxable income is partitioned into ascending marginal tax brackets. Only the dollar amount falling within each specific bracket is taxed at that bracket’s rate, ensuring your effective tax rate is lower than your top marginal rate.'
    },
    {
      q: 'How is reverse sales tax or gross-to-net VAT calculated?',
      a: 'To extract the net pre-tax price from a tax-inclusive gross total, divide the gross amount by (1 + Tax Rate). The sales tax amount is the gross total minus the net pre-tax base.'
    },
    {
      q: 'What is the difference between short-term and long-term capital gains tax?',
      a: 'Assets held for one year or less are subject to short-term capital gains taxed at ordinary income rates. Assets held for over one year qualify for preferential long-term capital gains rates (0%, 15%, or 20% in the US).'
    },
    {
      q: 'How do tax deductions differ from tax credits?',
      a: 'Tax deductions reduce your taxable income by the deducted amount before tax is computed, whereas tax credits provide a dollar-for-dollar reduction directly against your final calculated tax liability.'
    }
  ],
  mortgage: [
    {
      q: 'What components make up a standard monthly mortgage payment (PITI)?',
      a: 'A complete monthly housing payment includes Principal, Interest, estimated annual Property Taxes (divided by 12), Homeowners Insurance, and any applicable Private Mortgage Insurance (PMI) or HOA dues.'
    },
    {
      q: 'When can I remove Private Mortgage Insurance (PMI) from a conventional loan?',
      a: 'Under the Homeowners Protection Act (HPA), you can request PMI cancellation once your loan balance reaches 80% of original property value through payments or equity appreciation. Lenders must automatically terminate PMI at 78% LTV.'
    },
    {
      q: 'How do 15-year and 30-year fixed mortgages compare?',
      a: 'A 15-year mortgage features higher monthly payments due to rapid amortization but carries a lower interest rate and cuts total lifetime interest expense by 60% or more compared to a 30-year loan.'
    },
    {
      q: 'What is the 2024 FHFA conforming loan limit for conventional vs. jumbo mortgages?',
      a: 'For 2024, the baseline FHFA conforming loan limit is $766,550 for single-family homes, rising to $1,149,825 in designated high-cost housing markets. Loans exceeding these thresholds are classified as Jumbo loans.'
    }
  ],
  loans: [
    {
      q: 'What is the difference between the Debt Snowball and Debt Avalanche payoff strategies?',
      a: 'Debt Snowball pays minimums on all debts while putting extra funds toward the smallest balance first for psychological momentum. Debt Avalanche targets the highest interest rate balance first to mathematically minimize total interest paid.'
    },
    {
      q: 'How do origination fees affect the true Annual Percentage Rate (APR) on personal loans?',
      a: 'Origination fees deducted upfront from loan proceeds reduce the actual cash received while interest accrues on the full balance, increasing the effective APR above the nominal stated interest rate.'
    },
    {
      q: 'How is simple interest calculated versus amortized installment interest?',
      a: 'Simple interest accrues only on the initial principal (I = P × r × t), whereas amortized installment interest recalculates monthly interest on the remaining declining unpaid principal balance.'
    },
    {
      q: 'Can consolidating credit cards into a personal loan save money?',
      a: 'Yes, if the personal loan carries a lower fixed APR than your credit card interest rates and you commit to not running up new revolving credit balances during repayment.'
    }
  ],
  business: [
    {
      q: 'How do you calculate the Break-Even Point in units and revenue?',
      a: 'Break-Even Units = Total Fixed Costs / (Selling Price per Unit - Variable Cost per Unit). Break-Even Revenue = Break-Even Units × Selling Price per Unit.'
    },
    {
      q: 'What is the distinction between Gross Profit Margin and Markup Percentage?',
      a: 'Gross Margin = (Selling Price - Cost) / Selling Price × 100, representing profit as a share of revenue. Markup = (Selling Price - Cost) / Cost × 100, representing the price increase over product cost.'
    },
    {
      q: 'How do you calculate Customer Lifetime Value (CLV / LTV) and LTV:CAC ratio?',
      a: 'LTV = (Average Revenue Per User × Gross Margin %) / Customer Churn Rate. A healthy SaaS or subscription business aims for an LTV:CAC ratio of 3.0x or higher with a CAC payback period under 12 months.'
    },
    {
      q: 'What is Startup Burn Rate and Cash Runway?',
      a: 'Net Burn Rate = Total Monthly Operating Expenses - Monthly Inflow. Cash Runway (Months) = Total Cash Reserves / Monthly Net Burn Rate.'
    }
  ],
  health: [
    {
      q: 'What clinical formulas power Calcora health calculators?',
      a: 'Calcora health calculators use peer-reviewed equations including the Mifflin-St Jeor and Harris-Benedict formulas for basal metabolic rates, the US Navy Body Fat equation, and WHO Body Mass Index classifications.'
    },
    {
      q: 'What are the limitations of Body Mass Index (BMI)?',
      a: 'BMI evaluates weight relative to height squared (kg/m²) but does not distinguish between lean skeletal muscle mass and adipose fat tissue. Athletes and bodybuilders may register as overweight despite low body fat.'
    },
    {
      q: 'How is Estimated Blood Alcohol Concentration (EBAC) computed?',
      a: 'Calcora uses the Widmark formula adjusted for biological sex, body weight in kilograms, total grams of consumed alcohol, and average metabolic elimination rates (0.015% BAC per hour).'
    },
    {
      q: 'How is pregnancy due date determined from the last menstrual period (LMP)?',
      a: 'Calcora uses Naegele’s Rule: Add 1 year, subtract 3 months, and add 7 days to the first day of your last normal menstrual period, assuming a standard 28-day menstrual cycle.'
    }
  ],
  fitness: [
    {
      q: 'What formulas are used to calculate One Rep Max (1RM)?',
      a: 'Calcora supports industry-standard strength equations including Epley (1RM = Weight × (1 + Reps/30)), Brzycki (1RM = Weight / (1.0278 - 0.0278 × Reps)), and Lombardi formulas.'
    },
    {
      q: 'How are Target Heart Rate Training Zones (Zones 1–5) established?',
      a: 'Target zones use the Karvonen formula or Percentage of Max Heart Rate (HRmax = 220 - Age), defining active recovery (50–60%), aerobic endurance (60–70%), tempo (70–80%), threshold (80–90%), and neuromuscular anaerobic power (90–100%).'
    },
    {
      q: 'How do you calculate running pace and split times for a race?',
      a: 'Pace = Total Time (minutes) / Total Distance (miles or kilometers). Split schedules divide total race time evenly across 1 km or 1 mile intervals with negative, even, or positive pacing splits.'
    },
    {
      q: 'How does Heart Rate Variability (HRV) reflect autonomic recovery?',
      a: 'HRV measures the variation in time between consecutive heartbeats (rMSSD in milliseconds). Higher baseline HRV indicates parasympathetic nervous system dominance and readiness for intense training.'
    }
  ],
  nutrition: [
    {
      q: 'How should I determine my Total Daily Energy Expenditure (TDEE) and calorie target?',
      a: 'TDEE = Basal Metabolic Rate (BMR) × Physical Activity Level (PAL). To lose approximately 1 pound of fat per week, consume a moderate calorie deficit of 500 kcal/day below your maintenance TDEE.'
    },
    {
      q: 'How much daily protein do I need for muscle preservation or hypertrophy?',
      a: 'Clinical sports nutrition guidelines recommend 0.8g to 1.0g of protein per pound of lean body mass (1.6g to 2.2g per kg of total body weight) for active individuals engaged in resistance training.'
    },
    {
      q: 'What is the difference between Glycemic Index (GI) and Glycemic Load (GL)?',
      a: 'Glycemic Index ranks how rapidly a carbohydrate raises blood glucose, whereas Glycemic Load factors in both the GI and the actual grams of available carbohydrates in a typical serving (GL = (GI × Net Carbs) / 100).'
    },
    {
      q: 'How much water should I drink daily based on weight and activity?',
      a: 'A baseline daily hydration guideline is approximately 0.5 to 1.0 fluid ounces per pound of body weight (30–40 mL/kg), adjusted upward for exercise duration, ambient temperature, and sweat rate.'
    }
  ],
  construction: [
    {
      q: 'How much extra material should I order for construction waste and spillage?',
      a: 'Standard construction practice recommends ordering 5% to 10% extra volume for concrete slabs, 10% to 15% for tile grout and diagonal cuts, and 10% for roofing shingles and drywall sheets.'
    },
    {
      q: 'How do you convert concrete dimensions (length, width, thickness) into cubic yards and bags?',
      a: 'Volume (Cubic Feet) = Length (ft) × Width (ft) × (Thickness in inches / 12). Cubic Yards = Cubic Feet / 27. An 80 lb bag yields approximately 0.60 cubic feet of mixed concrete.'
    },
    {
      q: 'How is gravel, crushed stone, and sand weight calculated from volume?',
      a: 'Loose gravel and aggregates average approximately 1.4 to 1.6 tons per cubic yard (approx 2,800 to 3,200 lbs/cu yd). Multiply total cubic yards by your aggregate’s bulk density factor.'
    },
    {
      q: 'How do you calculate roof pitch and rafter length from rise and run?',
      a: 'Roof Pitch = Rise (inches) per 12 inches of horizontal Run. Rafter Length = √(Rise² + Run²) + Overhang length, using the Pythagorean theorem.'
    }
  ],
  engineering: [
    {
      q: 'How is maximum beam deflection calculated for simply supported beams?',
      a: 'For a center point load P on a span L with modulus of elasticity E and area moment of inertia I: δ_max = (P × L³) / (48 × E × I). For a uniform load w: δ_max = (5 × w × L⁴) / (384 × E × I).'
    },
    {
      q: 'What is the Hazen-Williams equation for pipe flow friction loss?',
      a: 'The Hazen-Williams formula models head loss due to pipe friction: h_f = 10.67 × L × Q^1.852 / (C^1.852 × D^4.87), where C is the roughness coefficient and D is the inside pipe diameter.'
    },
    {
      q: 'How do you calculate hydraulic cylinder force and piston velocity?',
      a: 'Piston Extension Force = Pressure (PSI) × Piston Area (π × r²). Retraction Force = Pressure × (Piston Area - Rod Area). Velocity = Flow Rate (GPM) × 231 / Effective Area (sq in).'
    },
    {
      q: 'How is 1D steady-state conductive heat transfer calculated?',
      a: 'Fourier’s Law of Thermal Conduction: Q = (k × A × ΔT) / d, where k is thermal conductivity (W/m·K), A is surface area, ΔT is temperature differential, and d is material thickness.'
    }
  ],
  electrical: [
    {
      q: "What are the fundamental formulas for Ohm's Law and Electric Power?",
      a: "Voltage V = I × R; Current I = V / R; Resistance R = V / I. Electrical Power P = V × I = I² × R = V² / R, measured in Watts (W)."
    },
    {
      q: 'How is AC 3-phase real power calculated compared to single-phase power?',
      a: 'Single-phase real power P = V × I × Power Factor (PF). Three-phase line-to-line real power P = √3 × V_LL × I_L × PF.'
    },
    {
      q: 'How do you calculate voltage drop along American Wire Gauge (AWG) conductors?',
      a: 'Voltage Drop V_drop = (2 × K × I × L) / CM for single phase, where K is conductor resistivity (12.9 for copper, 21.2 for aluminum), I is current in amperes, L is one-way distance in feet, and CM is wire circular mil area.'
    },
    {
      q: 'How do you size a current-limiting resistor for an LED circuit?',
      a: 'Resistor R = (Source Supply Voltage - LED Forward Voltage) / Desired Forward Current (Amperes). Resistor wattage rating should exceed P = I² × R by at least 2x safety margin.'
    }
  ],
  math: [
    {
      q: 'Does the scientific calculator support radian and degree angle modes?',
      a: 'Yes. You can switch between Radians (rad) and Degrees (deg), perform trigonometric and inverse trigonometric functions, calculate natural logarithms (ln), logarithms (log10), factorials, and powers.'
    },
    {
      q: 'How do you solve quadratic equations using the discriminant?',
      a: 'For ax² + bx + c = 0, Discriminant Δ = b² - 4ac. If Δ > 0, there are two distinct real roots x = (-b ± √Δ) / 2a; if Δ = 0, one real repeated root; if Δ < 0, two complex conjugate roots.'
    },
    {
      q: 'How is percentage increase, decrease, and difference calculated?',
      a: 'Percentage Change = ((New Value - Old Value) / |Old Value|) × 100. Percentage Difference = (|V1 - V2| / ((V1 + V2) / 2)) × 100.'
    },
    {
      q: 'Can the matrix solver compute matrix determinants, inverses, and multiplications?',
      a: 'Yes. Calcora computes 2x2 and 3x3 matrix multiplication, determinants via cofactor expansion, transpositions, and matrix inversion using adjugate matrices.'
    }
  ],
  statistics: [
    {
      q: 'How do sample standard deviation (s) and population standard deviation (σ) differ?',
      a: 'Population standard deviation divides sum of squared deviations by N, whereas sample standard deviation divides by (n - 1) (Bessel’s correction) to provide an unbiased estimator of variance.'
    },
    {
      q: 'What is a Z-score and how is it used in standard normal distributions?',
      a: 'Z = (X - μ) / σ. It indicates how many standard deviations an observation X lies above or below the mean μ. A Z-score corresponds to a cumulative probability percentile under the standard Gaussian curve.'
    },
    {
      q: 'What is the formula for Permutations versus Combinations?',
      a: 'Permutations (order matters): P(n, r) = n! / (n - r)!. Combinations (order does not matter): C(n, r) = n! / (r! × (n - r)! = P(n, r) / r!.'
    },
    {
      q: 'How do you calculate a Confidence Interval for a sample mean?',
      a: 'Confidence Interval = x̄ ± (Z* × (s / √n)), where x̄ is the sample mean, Z* is the critical value (1.96 for 95% confidence), s is standard deviation, and n is sample size.'
    }
  ],
  physics: [
    {
      q: 'What formulas govern 2D projectile motion without air resistance?',
      a: 'Horizontal position x(t) = v₀ × cos(θ) × t; Vertical position y(t) = v₀ × sin(θ) × t - 0.5 × g × t². Maximum height H = (v₀² × sin²(θ)) / (2g); Total range R = (v₀² × sin(2θ)) / g.'
    },
    {
      q: 'What is the relationship between Kinetic Energy, Momentum, and Work?',
      a: 'Kinetic Energy KE = 0.5 × m × v² = p² / (2m). Linear Momentum p = m × v. Work done W = Force × Distance × cos(θ) = ΔKE (Work-Energy Theorem).'
    },
    {
      q: 'How is gravitational force calculated between two masses?',
      a: 'Newton’s Law of Universal Gravitation: F = G × (m₁ × m₂) / r², where G = 6.67430 × 10⁻¹¹ N·m²/kg² and r is the distance between center of masses.'
    },
    {
      q: 'What is the Doppler Effect formula for sound or light waves?',
      a: 'Observed Frequency f’ = f₀ × (v ± v_receiver) / (v ∓ v_source), where v is the speed of sound in the medium, v_receiver is receiver velocity, and v_source is source velocity.'
    }
  ],
  chemistry: [
    {
      q: 'How does the Ideal Gas Law (PV = nRT) work with different units?',
      a: 'Pressure (P) in atm, Volume (V) in Liters, Moles (n) in mol, Temperature (T) in Kelvin (K = °C + 273.15). Universal gas constant R = 0.08206 L·atm/(mol·K) or 8.314 J/(mol·K) for SI units (P in Pa, V in m³).'
    },
    {
      q: 'How do you perform solution dilution calculations (M1V1 = M2V2)?',
      a: 'Because the total moles of solute remain constant during dilution: Initial Molarity (M₁) × Initial Volume (V₁) = Final Desired Molarity (M₂) × Final Total Volume (V₂).'
    },
    {
      q: 'How are pH, pOH, and hydrogen ion concentration [H+] related?',
      a: 'pH = -log₁₀[H⁺]; pOH = -log₁₀[OH⁻]; pH + pOH = 14.0 at 25°C. [H⁺] = 10^(-pH); [OH⁻] = 10^(-pOH).'
    },
    {
      q: 'How is molecular molar mass calculated from a chemical formula?',
      a: 'Molar Mass = Sum of (Atomic Weight of each element × Number of atoms of that element in the chemical formula), expressed in grams per mole (g/mol).'
    }
  ],
  conversions: [
    {
      q: 'What precision and international standards govern Calcora unit conversions?',
      a: 'All unit conversion factors follow international metrology constants (NIST SP 811, BIPM SI standards, ISO 80000) with precision up to 10 significant decimal places.'
    },
    {
      q: 'How do temperature conversions handle affine offsets (°C, °F, K)?',
      a: 'Temperature conversion accounts for linear offsets: °F = (°C × 9/5) + 32; °C = (°F - 32) × 5/9; K = °C + 273.15.'
    },
    {
      q: 'How do digital storage conversions distinguish between binary (KiB, MiB, GiB) and decimal (KB, MB, GB)?',
      a: 'Decimal (SI) units use powers of 1,000 (1 MB = 1,000,000 bytes), whereas binary (IEC) units use powers of 1,024 (1 MiB = 1,048,576 bytes). Calcora provides exact conversions for both systems.'
    },
    {
      q: 'Can I swap conversion directions instantly?',
      a: 'Yes! Every converter tool includes an instant bidirectional swap control allowing you to toggle from input-to-output and output-to-input with zero loss of calculation accuracy.'
    }
  ],
  time: [
    {
      q: 'How do you calculate the exact number of days, hours, and business days between two dates?',
      a: 'Calcora date tools count total calendar days, leap year adjustments, weekends (Saturdays and Sundays), and optional statutory holidays to calculate both gross calendar elapsed time and net business days.'
    },
    {
      q: 'How are optimal sleep cycles calculated based on 90-minute sleep intervals?',
      a: 'Natural human REM/NREM sleep cycles average 90 minutes. Sleep cycle calculators work backward from your desired wake-up time in 90-minute increments, adding 15 minutes for average sleep latency.'
    },
    {
      q: 'How is reading time estimated from word count?',
      a: 'Average adult silent reading speed ranges between 200 and 250 words per minute (WPM). Reading Time (Minutes) = Total Word Count / 225 WPM.'
    },
    {
      q: 'How do shift work time card calculators compute overtime pay?',
      a: 'Time card tools track clock-in, clock-out, and unpaid meal breaks, calculating regular hours up to 40 hours/week, 1.5x time-and-a-half overtime, and double-time rates.'
    }
  ],
  education: [
    {
      q: 'How is Grade Point Average (GPA) computed on a 4.0 vs. weighted 5.0 scale?',
      a: 'Standard GPA = Sum of (Grade Quality Points × Course Credit Hours) / Total Credit Hours. Weighted GPA awards +0.5 quality points for Honors courses and +1.0 point for Advanced Placement (AP) or International Baccalaureate (IB) courses.'
    },
    {
      q: 'How do you calculate the score needed on a final exam to achieve a target grade in a course?',
      a: 'Required Final Exam Score = (Target Overall Class Grade - (Current Grade × (1 - Final Exam Weight %))) / Final Exam Weight %.'
    },
    {
      q: 'How does student loan refinancing impact monthly payments and total interest?',
      a: 'Refinancing replaces one or more high-interest federal or private student loans with a single new loan at a lower fixed interest rate or modified term, lowering monthly obligations and lifetime finance charges.'
    },
    {
      q: 'How can you convert letter grades into standard percentage scores?',
      a: 'Calcora maps standard grading scales: A+ (97-100%), A (93-96%), A- (90-92%), B+ (87-89%), B (83-86%), B- (80-82%), C+ (77-79%), C (73-76%), C- (70-72%), D (60-69%), and F (below 60%).'
    }
  ],
  everyday: [
    {
      q: 'How is a restaurant tip and split bill calculated across multiple people?',
      a: 'Tip Amount = Bill Subtotal × (Tip % / 100). Total Bill = Subtotal + Tip + Tax. Per Person Share = Total Bill / Number of Diners.'
    },
    {
      q: 'How do discount savings and stacked promotional coupons work?',
      a: 'Final Price = Original Price × (1 - Discount % / 100). When stacking multiple sequential discounts (e.g. 20% off plus an extra 10% coupon), the second discount is applied to the already-discounted subtotal.'
    },
    {
      q: 'How do you calculate fuel cost for a road trip or commute?',
      a: 'Trip Fuel Cost = (Total Trip Distance in Miles / Vehicle MPG) × Average Gas Price per Gallon (or (km / 100km) × Price per Liter for metric users).'
    },
    {
      q: 'How is human age converted to dog and cat years accurately?',
      a: 'Rather than a linear 7x rule, veterinary guidelines recognize that dogs and cats mature rapidly in year 1 (~15 human years) and year 2 (~9 human years), aging approximately 4-5 human years for each subsequent adult year.'
    }
  ],
  ai: [
    {
      q: 'How are LLM token counts and API costs calculated?',
      a: 'Token estimates use provider pricing per 1 Million prompt input tokens and 1 Million completion output tokens. On average for English text, 1 token ≈ 0.75 words (or ~4 characters).'
    },
    {
      q: 'What is the difference between Prompt Input Tokens and Completion Output Tokens?',
      a: 'Prompt tokens are the input text, system instructions, and chat history sent to the model. Completion tokens are the newly generated response text. Providers typically charge 3x to 5x higher rates for output tokens due to compute intensity.'
    },
    {
      q: 'How can you calculate the monthly API cost for a customer-facing AI agent?',
      a: 'Monthly AI Cost = Daily Active Users × Average Queries/User × ((Input Tokens × Input Price/M) + (Output Tokens × Output Price/M)) × 30 days.'
    },
    {
      q: 'Which AI models are supported in Calcora AI cost estimators?',
      a: 'Calcora tracks standard pricing tiers for Google Gemini 1.5 Pro & Flash, OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet & Haiku, and open-weights hosting providers.'
    }
  ]
};

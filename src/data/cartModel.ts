// ─── CART Decision Tree Model ───
// Training data from the HWU MOOCs Case Study applied to W.Y.W e-commerce
// 10 customers, 4 UX attributes, binary Churn outcome
// Algorithm: CART (Classification and Regression Tree) using Gini Impurity

export type Delivery = 'Good' | 'OK' | 'Bad';
export type Shopping = 'Efficient' | 'Normal' | 'Confusing';
export type Security = 'Reliable' | 'Unreliable';
export type Price = 'Fair' | 'Unfair';

export interface TrainingRecord {
  id: number;
  delivery: Delivery;
  shopping: Shopping;
  security: Security;
  price: Price;
  churn: boolean;
}

// Exact 10-customer training data from the coursework slides
export const trainingData: TrainingRecord[] = [
  { id: 1,  delivery: 'Good', shopping: 'Confusing', security: 'Reliable',   price: 'Fair',   churn: false },
  { id: 2,  delivery: 'Good', shopping: 'Confusing', security: 'Reliable',   price: 'Unfair', churn: true  },
  { id: 3,  delivery: 'OK',   shopping: 'Confusing', security: 'Reliable',   price: 'Fair',   churn: false },
  { id: 4,  delivery: 'Bad',  shopping: 'Normal',    security: 'Reliable',   price: 'Fair',   churn: true  },
  { id: 5,  delivery: 'Bad',  shopping: 'Efficient', security: 'Unreliable', price: 'Fair',   churn: false },
  { id: 6,  delivery: 'Bad',  shopping: 'Efficient', security: 'Unreliable', price: 'Unfair', churn: true  },
  { id: 7,  delivery: 'OK',   shopping: 'Efficient', security: 'Unreliable', price: 'Unfair', churn: true  },
  { id: 8,  delivery: 'Good', shopping: 'Normal',    security: 'Reliable',   price: 'Fair',   churn: false },
  { id: 9,  delivery: 'Good', shopping: 'Efficient', security: 'Unreliable', price: 'Fair',   churn: false },
  { id: 10, delivery: 'Bad',  shopping: 'Normal',    security: 'Unreliable', price: 'Fair',   churn: true  },
];

// ─── Gini Impurity Calculations ───

/** Calculate Gini impurity for a set of records */
export function giniImpurity(records: TrainingRecord[]): number {
  if (records.length === 0) return 0;
  const churnCount = records.filter(r => r.churn).length;
  const pChurn = churnCount / records.length;
  const pRetain = 1 - pChurn;
  return 1 - pChurn * pChurn - pRetain * pRetain;
}

/** Calculate weighted Gini for a feature split */
export function weightedGini(
  feature: keyof Pick<TrainingRecord, 'delivery' | 'shopping' | 'security' | 'price'>,
  records: TrainingRecord[] = trainingData
): { gini: number; splits: { value: string; count: number; yes: number; no: number; gini: number }[] } {
  const values = [...new Set(records.map(r => r[feature] as string))];
  const total = records.length;

  const splits = values.map(val => {
    const subset = records.filter(r => r[feature] === val);
    const yes = subset.filter(r => r.churn).length;
    const no = subset.length - yes;
    return { value: val, count: subset.length, yes, no, gini: giniImpurity(subset) };
  });

  const gini = splits.reduce((sum, s) => sum + (s.count / total) * s.gini, 0);
  return { gini: Math.round(gini * 1000) / 1000, splits };
}

// Pre-computed Gini for all four features (root level)
export const giniResults = {
  delivery: weightedGini('delivery'),  // 0.4
  shopping: weightedGini('shopping'),  // 0.467
  security: weightedGini('security'),  // 0.48
  price: weightedGini('price'),        // 0.286 ← BEST (lowest)
};

// Feature ranking by Gini (ascending = best split first)
export const featureRanking = (
  Object.entries(giniResults) as [string, ReturnType<typeof weightedGini>][]
).sort((a, b) => a[1].gini - b[1].gini);

// ─── CART Decision Tree (built from Gini analysis) ───
// Level 1: Price (Gini = 0.286)
//   Unfair → CHURN (pure: 3/3)
//   Fair   → Level 2: Delivery (Gini = 0.191 on Fair subset)
//     Good / OK → NO CHURN (pure)
//     Bad       → Level 3: Shopping (Gini = 0.000 on Bad+Fair subset)
//       Normal    → CHURN (pure: 2/2)
//       Efficient → NO CHURN (pure: 1/1)

export interface PredictionInput {
  delivery: Delivery;
  shopping: Shopping;
  security: Security;
  price: Price;
}

export interface PredictionResult {
  churn: boolean;
  confidence: number;
  path: string[];
  matchedCustomers: number[];
}

export function predictChurn(input: PredictionInput): PredictionResult {
  // Level 1: Price
  if (input.price === 'Unfair') {
    return {
      churn: true,
      confidence: 100,
      path: ['Price = Unfair', 'CHURN'],
      matchedCustomers: trainingData.filter(r => r.price === 'Unfair').map(r => r.id),
    };
  }

  // Level 2: Delivery (Price = Fair)
  if (input.delivery === 'Good' || input.delivery === 'OK') {
    return {
      churn: false,
      confidence: 100,
      path: ['Price = Fair', `Delivery = ${input.delivery}`, 'NO CHURN'],
      matchedCustomers: trainingData.filter(r => r.price === 'Fair' && (r.delivery === 'Good' || r.delivery === 'OK')).map(r => r.id),
    };
  }

  // Level 3: Shopping (Price = Fair, Delivery = Bad)
  if (input.shopping === 'Normal' || input.shopping === 'Confusing') {
    return {
      churn: true,
      confidence: input.shopping === 'Normal' ? 100 : 75,
      path: ['Price = Fair', 'Delivery = Bad', `Shopping = ${input.shopping}`, 'CHURN'],
      matchedCustomers: trainingData.filter(r => r.price === 'Fair' && r.delivery === 'Bad' && r.shopping === input.shopping).map(r => r.id),
    };
  }

  // Shopping = Efficient, Delivery = Bad, Price = Fair
  return {
    churn: false,
    confidence: 100,
    path: ['Price = Fair', 'Delivery = Bad', 'Shopping = Efficient', 'NO CHURN'],
    matchedCustomers: trainingData.filter(r => r.price === 'Fair' && r.delivery === 'Bad' && r.shopping === 'Efficient').map(r => r.id),
  };
}

// ─── Retention Strategy ───
export const retentionActions = {
  churn: [
    { day: 1, title: 'Re-engagement Email', description: "Personalised email: 'We miss you — here's 20% off your next order.' Code: COMEBACK20" },
    { day: 7, title: 'WhatsApp Follow-up', description: "If Day 1 email unopened: 'Hi, your 20% discount is still waiting. Shop now at W.Y.W.'" },
    { day: 14, title: 'Final Offer', description: 'Free 30-minute in-store styling consultation — no purchase required. Booking link via email & WhatsApp.' },
  ],
  noChurn: [
    { title: 'Monitor & Reward', description: 'Continue loyalty programme engagement. Send tier progression nudges and early access invitations.' },
  ],
};

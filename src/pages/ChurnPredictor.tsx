import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { BarChart2, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  type Delivery, type Shopping, type Security, type Price,
  type PredictionResult, predictChurn, trainingData, retentionActions,
} from '@/data/cartModel';

const ADMIN_EMAIL = 'admin@wyw-demo.com';

/* ── Interactive Decision Tree Visualisation ── */
function DecisionTree({ result }: { result: PredictionResult }) {
  const path = result.path;
  const priceUnfair = path[0] === 'Price = Unfair';
  const priceFair = path[0] === 'Price = Fair';
  const deliveryBad = path.includes('Delivery = Bad');
  const deliveryGoodOK = priceFair && !deliveryBad;

  const active = 'border-accent bg-accent/10 text-accent-foreground ring-2 ring-accent/40 font-medium';
  const inactive = 'border-border bg-muted/50 text-muted-foreground';
  const activeLine = 'bg-accent';
  const inactiveLine = 'bg-border';

  const churnLeaf = 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 ring-2 ring-red-400/40';
  const retainLeaf = 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 ring-2 ring-green-400/40';

  return (
    <div className="mt-4 flex flex-col items-center gap-0 text-[0.7rem] font-body select-none overflow-x-auto">
      {/* Root: Price */}
      <div className={`border px-4 py-2 text-center ${active}`}>
        Price Perception?
        <span className="block text-[0.55rem] text-muted-foreground mt-0.5">Gini = 0.286 (best split)</span>
      </div>

      <div className="flex w-full max-w-lg">
        {/* Left: Unfair → Churn */}
        <div className="flex-1 flex flex-col items-center">
          <div className={`w-px h-6 ${priceUnfair ? activeLine : inactiveLine}`} />
          <span className={`text-[0.6rem] font-medium mb-1 ${priceUnfair ? 'text-accent' : 'text-muted-foreground'}`}>UNFAIR</span>
          <div className={`border px-3 py-1.5 text-center ${priceUnfair ? churnLeaf : inactive}`}>
            CHURN (3/3)
          </div>
        </div>

        {/* Right: Fair → Delivery */}
        <div className="flex-1 flex flex-col items-center">
          <div className={`w-px h-6 ${priceFair ? activeLine : inactiveLine}`} />
          <span className={`text-[0.6rem] font-medium mb-1 ${priceFair ? 'text-accent' : 'text-muted-foreground'}`}>FAIR</span>
          <div className={`border px-3 py-1.5 text-center ${priceFair ? active : inactive}`}>
            Delivery?
            <span className="block text-[0.55rem] text-muted-foreground mt-0.5">Gini = 0.191</span>
          </div>

          <div className="flex w-full">
            {/* Good/OK → No Churn */}
            <div className="flex-1 flex flex-col items-center">
              <div className={`w-px h-5 ${deliveryGoodOK ? activeLine : inactiveLine}`} />
              <span className={`text-[0.6rem] mb-1 ${deliveryGoodOK ? 'text-accent' : 'text-muted-foreground'}`}>GOOD/OK</span>
              <div className={`border px-2 py-1 text-center text-[0.6rem] ${deliveryGoodOK ? retainLeaf : inactive}`}>
                NO CHURN (4/4)
              </div>
            </div>

            {/* Bad → Shopping */}
            <div className="flex-1 flex flex-col items-center">
              <div className={`w-px h-5 ${deliveryBad ? activeLine : inactiveLine}`} />
              <span className={`text-[0.6rem] mb-1 ${deliveryBad ? 'text-accent' : 'text-muted-foreground'}`}>BAD</span>
              <div className={`border px-2 py-1 text-center text-[0.6rem] ${deliveryBad ? active : inactive}`}>
                Shopping?
                <span className="block text-[0.5rem] text-muted-foreground">Gini = 0.000</span>
              </div>

              <div className="flex w-full">
                <div className="flex-1 flex flex-col items-center">
                  <div className={`w-px h-4 ${deliveryBad && result.path.includes('Shopping = Normal') ? activeLine : inactiveLine}`} />
                  <span className="text-[0.55rem] text-muted-foreground mb-0.5">NORMAL</span>
                  <div className={`border px-1.5 py-0.5 text-center text-[0.55rem] ${deliveryBad && result.path.includes('Shopping = Normal') ? churnLeaf : inactive}`}>
                    CHURN
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className={`w-px h-4 ${deliveryBad && result.path.includes('Shopping = Efficient') ? activeLine : inactiveLine}`} />
                  <span className="text-[0.55rem] text-muted-foreground mb-0.5">EFFICIENT</span>
                  <div className={`border px-1.5 py-0.5 text-center text-[0.55rem] ${deliveryBad && result.path.includes('Shopping = Efficient') ? retainLeaf : inactive}`}>
                    NO CHURN
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChurnPredictor() {
  const { user, loading } = useAuth();
  const [result, setResult] = useState<PredictionResult | null>(null);

  const [delivery, setDelivery] = useState<Delivery | ''>('');
  const [shopping, setShopping] = useState<Shopping | ''>('');
  const [security, setSecurity] = useState<Security | ''>('');
  const [price, setPrice] = useState<Price | ''>('');

  if (loading) {
    return (
      <Layout>
        <div className="wyw-container pt-24 pb-16 flex justify-center">
          <p className="text-muted-foreground font-body">Loading…</p>
        </div>
      </Layout>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/account" replace />;
  }

  const canPredict = delivery && shopping && security && price;

  const handlePredict = () => {
    if (!canPredict) return;
    setResult(predictChurn({
      delivery: delivery as Delivery,
      shopping: shopping as Shopping,
      security: security as Security,
      price: price as Price,
    }));
  };

  const handleReset = () => {
    setDelivery('');
    setShopping('');
    setSecurity('');
    setPrice('');
    setResult(null);
  };

  return (
    <Layout>
      <div className="wyw-container pt-24 pb-16">
        <Breadcrumb crumbs={[{ label: 'Home', to: '/home' }, { label: 'Churn Dataset', to: '/admin/dataset' }, { label: 'Churn Predictor' }]} />

        <Reveal>
          <div className="flex items-center gap-3 mb-2">
            <BarChart2 className="h-6 w-6 text-accent" strokeWidth={1.5} />
            <h1 className="text-3xl md:text-5xl font-display italic text-foreground">Customer Churn Predictor</h1>
          </div>
          <p className="text-muted-foreground font-body font-light mb-10 leading-relaxed max-w-3xl">
            Test W.Y.W's CART decision tree model with a new customer's UX attributes. The model is trained on 10 customer records using Gini Impurity to determine the optimal splits.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT — Input Form */}
          <Reveal>
            <div className="border border-border p-6 md:p-8">
              <h2 className="font-display text-xl italic text-foreground mb-6">Enter Customer UX Attributes</h2>

              <div className="space-y-5">
                <div>
                  <Label className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1.5 block">
                    Delivery Experience
                  </Label>
                  <Select value={delivery} onValueChange={(v) => setDelivery(v as Delivery)}>
                    <SelectTrigger className="rounded-none"><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="OK">OK</SelectItem>
                      <SelectItem value="Bad">Bad</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[0.65rem] text-muted-foreground font-body mt-1">How the customer rates their delivery experience</p>
                </div>

                <div>
                  <Label className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1.5 block">
                    Shopping Experience
                  </Label>
                  <Select value={shopping} onValueChange={(v) => setShopping(v as Shopping)}>
                    <SelectTrigger className="rounded-none"><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Efficient">Efficient</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Confusing">Confusing</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[0.65rem] text-muted-foreground font-body mt-1">How easy the online/in-store shopping process was</p>
                </div>

                <div>
                  <Label className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1.5 block">
                    Website Security
                  </Label>
                  <Select value={security} onValueChange={(v) => setSecurity(v as Security)}>
                    <SelectTrigger className="rounded-none"><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Reliable">Reliable</SelectItem>
                      <SelectItem value="Unreliable">Unreliable</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[0.65rem] text-muted-foreground font-body mt-1">Customer's perception of website/payment security</p>
                </div>

                <div>
                  <Label className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1.5 block">
                    Price Perception
                  </Label>
                  <Select value={price} onValueChange={(v) => setPrice(v as Price)}>
                    <SelectTrigger className="rounded-none"><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Unfair">Unfair</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[0.65rem] text-muted-foreground font-body mt-1">Whether the customer considers pricing fair or unfair</p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button onClick={handlePredict} className="flex-1" size="lg" disabled={!canPredict}>
                  <BarChart2 className="h-4 w-4 mr-2" /> Run CART Prediction
                </Button>
                {result && (
                  <Button onClick={handleReset} variant="outline" size="lg">Reset</Button>
                )}
              </div>
            </div>

            {/* Training Data Reference */}
            <div className="border border-border mt-6 p-5">
              <h3 className="font-display text-sm italic text-foreground mb-3">Training Data (10 Records)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-[0.7rem] font-body">
                  <thead>
                    <tr className="border-b border-border bg-muted">
                      {['#', 'Delivery', 'Shopping', 'Security', 'Price', 'Churn'].map(h => (
                        <th key={h} className="py-2 px-2 text-left text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {trainingData.map(r => (
                      <tr key={r.id} className={`border-b border-border ${r.churn ? 'bg-red-50/60 dark:bg-red-950/20' : 'bg-green-50/40 dark:bg-green-950/15'}`}>
                        <td className="py-1.5 px-2 font-medium text-foreground">{r.id}</td>
                        <td className="py-1.5 px-2 text-foreground">{r.delivery}</td>
                        <td className="py-1.5 px-2 text-foreground">{r.shopping}</td>
                        <td className="py-1.5 px-2 text-foreground">{r.security}</td>
                        <td className="py-1.5 px-2 text-foreground">{r.price}</td>
                        <td className="py-1.5 px-2">
                          <span className={`text-[0.6rem] px-2 py-0.5 font-medium ${r.churn ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'}`}>
                            {r.churn ? 'Yes' : 'No'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          {/* RIGHT — Result */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              {!result ? (
                <div className="border border-border p-8 md:p-12 flex flex-col items-center justify-center min-h-[300px] text-center">
                  <BarChart2 className="h-10 w-10 text-muted-foreground/30 mb-4" strokeWidth={1.5} />
                  <p className="text-muted-foreground font-body font-light text-sm leading-relaxed max-w-xs">
                    Select the four UX attributes and click <span className="font-medium text-foreground">Run CART Prediction</span> to classify the customer.
                  </p>
                </div>
              ) : (
                <div className={`border-2 ${result.churn ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-green-500 bg-green-50 dark:bg-green-950/20'} overflow-hidden`}>
                  {/* Header */}
                  <div className={`${result.churn ? 'bg-red-600 dark:bg-red-700' : 'bg-green-600 dark:bg-green-700'} px-6 py-4 flex items-center gap-3`}>
                    {result.churn
                      ? <XCircle className="h-7 w-7 text-white" strokeWidth={1.5} />
                      : <CheckCircle2 className="h-7 w-7 text-white" strokeWidth={1.5} />
                    }
                    <p className="text-white font-display text-3xl md:text-4xl italic">
                      {result.churn ? 'CHURN RISK' : 'RETAIN'}
                    </p>
                  </div>

                  <div className="p-6 md:p-8 space-y-5">
                    {/* Confidence */}
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1">Confidence</p>
                        <p className="font-body text-foreground font-medium text-lg">{result.confidence}%</p>
                      </div>
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1">Matching Training Records</p>
                        <p className="font-body text-foreground font-medium">
                          {result.matchedCustomers.length > 0
                            ? result.matchedCustomers.map(id => `Customer ${id}`).join(', ')
                            : 'No exact match (extrapolated)'}
                        </p>
                      </div>
                    </div>

                    {/* Decision Path */}
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-2">Decision Path</p>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {result.path.map((step, i) => (
                          <span key={i} className="flex items-center gap-1.5">
                            <span className={`text-[0.7rem] px-2.5 py-1 font-body font-medium ${
                              i === result.path.length - 1
                                ? result.churn
                                  ? 'bg-red-200 text-red-900 dark:bg-red-800/60 dark:text-red-200'
                                  : 'bg-green-200 text-green-900 dark:bg-green-800/60 dark:text-green-200'
                                : 'bg-muted text-foreground'
                            }`}>
                              {step}
                            </span>
                            {i < result.path.length - 1 && <span className="text-muted-foreground">→</span>}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Decision Tree Visual */}
                    <div className="border border-border p-4">
                      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-2">CART Decision Tree</p>
                      <DecisionTree result={result} />
                    </div>

                    {/* Recommended Actions */}
                    <div className="border border-border bg-muted/50 p-4">
                      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-3">Recommended Retention Actions</p>
                      {result.churn ? (
                        <div className="space-y-3">
                          {retentionActions.churn.map(a => (
                            <div key={a.day} className="flex gap-3">
                              <span className="text-[0.65rem] font-medium text-accent whitespace-nowrap font-body">Day {a.day}</span>
                              <div>
                                <p className="text-sm font-body font-medium text-foreground">{a.title}</p>
                                <p className="text-[0.75rem] text-muted-foreground font-body font-light">{a.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-foreground font-body font-light">{retentionActions.noChurn[0].description}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <p className="text-[0.7rem] text-muted-foreground font-body font-light mt-4 leading-relaxed">
                CART model trained on 10 customer records. Root split: Price (Weighted Gini = 0.286). Algorithm: Classification and Regression Tree using Gini Impurity.
              </p>

              <div className="flex gap-3 mt-4">
                <Link to="/admin/dataset">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-3.5 w-3.5 mr-1.5" /> Back to Dataset
                  </Button>
                </Link>
                <Link to="/retention-dashboard">
                  <Button variant="outline" size="sm">View Retention Dashboard</Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Layout>
  );
}

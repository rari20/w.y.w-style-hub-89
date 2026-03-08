import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { BarChart2, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ADMIN_EMAIL = 'test.customer@wyw-demo.com';

type PredictionResult = {
  result: 'RETAIN' | 'MONITOR' | 'CHURN RISK';
  segment: string;
  risk: string;
  confidence: string;
} | null;

function predictChurn(data: {
  totalSpend: number;
  loyaltyTier: number;
  consultationBooked: number;
  emailEngagement: number;
  satisfactionScore: number;
}): NonNullable<PredictionResult> {
  if (data.totalSpend >= 500) {
    if (data.loyaltyTier >= 3) {
      return { result: 'RETAIN', segment: 'A — Champion', risk: 'Low', confidence: '95%' };
    } else if (data.consultationBooked === 1 || data.emailEngagement === 1) {
      return { result: 'RETAIN', segment: 'B — Engaged', risk: 'Low-Medium', confidence: '88%' };
    } else {
      return { result: 'MONITOR', segment: 'C — Borderline', risk: 'Medium', confidence: '74%' };
    }
  } else {
    if (data.satisfactionScore <= 2 && data.emailEngagement === 0) {
      return { result: 'CHURN RISK', segment: 'D — At Risk', risk: 'High', confidence: '91%' };
    } else {
      return { result: 'CHURN RISK', segment: 'D — At Risk', risk: 'High', confidence: '83%' };
    }
  }
}

const recommendedActions: Record<string, string> = {
  'A — Champion': 'No action required. Consider VIP early access invitation.',
  'B — Engaged': 'Send tier progression nudge — [X] points to next tier.',
  'C — Borderline': 'Offer free styling consultation and double-points promotion.',
  'D — At Risk': 'Trigger re-engagement campaign: Day 1 email with 20% discount, Day 7 WhatsApp if unopened, Day 14 free consultation offer.',
};

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className="p-0.5 transition-colors"
        >
          <Star
            className={`h-6 w-6 ${s <= value ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'}`}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}

function DecisionTree({ prediction }: { prediction: NonNullable<PredictionResult> }) {
  const spendHigh = prediction.result !== 'CHURN RISK';
  const isA = prediction.segment.startsWith('A');
  const isBC = prediction.segment.startsWith('B') || prediction.segment.startsWith('C');
  const isD = prediction.segment.startsWith('D');

  const active = 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 ring-2 ring-amber-400/40';
  const inactive = 'border-border bg-muted/50 text-muted-foreground';
  const activeLine = 'bg-amber-400';
  const inactiveLine = 'bg-border';

  return (
    <div className="mt-6 flex flex-col items-center gap-0 text-[0.7rem] font-body select-none">
      {/* Root */}
      <div className={`border px-4 py-2 font-medium text-center ${active}`}>
        Total Spend ≥ £500?
      </div>

      {/* Branches */}
      <div className="flex w-full max-w-md">
        {/* Left branch */}
        <div className="flex-1 flex flex-col items-center">
          <div className={`w-px h-6 ${spendHigh ? activeLine : inactiveLine}`} />
          <span className={`text-[0.6rem] font-medium mb-1 ${spendHigh ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground'}`}>YES</span>
          <div className={`border px-3 py-1.5 text-center ${spendHigh ? active : inactive}`}>
            Loyalty Tier ≥ Surge?
          </div>
          <div className="flex w-full">
            <div className="flex-1 flex flex-col items-center">
              <div className={`w-px h-5 ${isA ? activeLine : inactiveLine}`} />
              <span className={`text-[0.6rem] mb-1 ${isA ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground'}`}>YES</span>
              <div className={`border px-2 py-1 text-center text-[0.6rem] ${isA ? active : inactive}`}>
                Seg A
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className={`w-px h-5 ${isBC ? activeLine : inactiveLine}`} />
              <span className={`text-[0.6rem] mb-1 ${isBC ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground'}`}>NO</span>
              <div className={`border px-2 py-1 text-center text-[0.6rem] ${isBC ? active : inactive}`}>
                Seg B/C
              </div>
            </div>
          </div>
        </div>

        {/* Right branch */}
        <div className="flex-1 flex flex-col items-center">
          <div className={`w-px h-6 ${!spendHigh ? activeLine : inactiveLine}`} />
          <span className={`text-[0.6rem] font-medium mb-1 ${!spendHigh ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground'}`}>NO</span>
          <div className={`border px-3 py-1.5 text-center ${isD ? active : inactive}`}>
            Churn Risk
          </div>
          <div className={`w-px h-5 ${isD ? activeLine : inactiveLine}`} />
          <div className={`border px-2 py-1 text-center text-[0.6rem] ${isD ? active : inactive}`}>
            Seg D
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChurnPredictor() {
  const { user, loading } = useAuth();
  const [prediction, setPrediction] = useState<PredictionResult>(null);

  const [days, setDays] = useState('');
  const [spend, setSpend] = useState('');
  const [orders, setOrders] = useState('');
  const [tier, setTier] = useState('');
  const [returnRate, setReturnRate] = useState('');
  const [wishlist, setWishlist] = useState('');
  const [consultation, setConsultation] = useState<number | null>(null);
  const [csContacts, setCsContacts] = useState('');
  const [emailEng, setEmailEng] = useState<number | null>(null);
  const [satisfaction, setSatisfaction] = useState(0);

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

  const handlePredict = () => {
    if (!tier || consultation === null || emailEng === null || satisfaction === 0) return;
    const result = predictChurn({
      totalSpend: Number(spend) || 0,
      loyaltyTier: Number(tier),
      consultationBooked: consultation,
      emailEngagement: emailEng,
      satisfactionScore: satisfaction,
    });
    setPrediction(result);
  };

  const resultColor = prediction
    ? prediction.result === 'RETAIN'
      ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
      : prediction.result === 'MONITOR'
        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20'
        : 'border-red-500 bg-red-50 dark:bg-red-950/20'
    : '';

  const resultHeaderColor = prediction
    ? prediction.result === 'RETAIN'
      ? 'bg-green-600 dark:bg-green-700'
      : prediction.result === 'MONITOR'
        ? 'bg-amber-500 dark:bg-amber-600'
        : 'bg-red-600 dark:bg-red-700'
    : '';

  const riskBadgeColor = prediction
    ? prediction.risk === 'Low'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
      : prediction.risk === 'Low-Medium'
        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
        : prediction.risk === 'Medium'
          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
          : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
    : '';

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
            Test the CART churn prediction model with custom customer data. Enter values below and run the prediction to see the classification result.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT — Input Form */}
          <Reveal>
            <div className="border border-border p-6 md:p-8">
              <h2 className="font-display text-xl italic text-foreground mb-6">Enter Customer Data</h2>

              <div className="space-y-5">
                <div>
                  <Label className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1.5 block">Days Since Last Purchase</Label>
                  <Input type="number" min={0} max={999} placeholder="e.g. 45" value={days} onChange={(e) => setDays(e.target.value)} className="rounded-none" />
                </div>

                <div>
                  <Label className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1.5 block">Total Spend Last 6 Months (£)</Label>
                  <Input type="number" min={0} placeholder="e.g. 520" value={spend} onChange={(e) => setSpend(e.target.value)} className="rounded-none" />
                </div>

                <div>
                  <Label className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1.5 block">Number of Orders</Label>
                  <Input type="number" min={0} max={50} placeholder="e.g. 2" value={orders} onChange={(e) => setOrders(e.target.value)} className="rounded-none" />
                </div>

                <div>
                  <Label className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1.5 block">Loyalty Tier</Label>
                  <Select value={tier} onValueChange={setTier}>
                    <SelectTrigger className="rounded-none">
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Spark (1)</SelectItem>
                      <SelectItem value="2">Volt (2)</SelectItem>
                      <SelectItem value="3">Surge (3)</SelectItem>
                      <SelectItem value="4">Watt (4)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1.5 block">Return Rate (%)</Label>
                  <Input type="number" min={0} max={100} placeholder="e.g. 15" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} className="rounded-none" />
                </div>

                <div>
                  <Label className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1.5 block">Wishlist Items Unpurchased</Label>
                  <Input type="number" min={0} placeholder="e.g. 7" value={wishlist} onChange={(e) => setWishlist(e.target.value)} className="rounded-none" />
                </div>

                <div>
                  <Label className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1.5 block">Consultation Booked</Label>
                  <div className="flex gap-6 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer font-body text-sm text-foreground">
                      <input type="radio" name="consultation" className="accent-foreground" checked={consultation === 1} onChange={() => setConsultation(1)} /> Yes
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-body text-sm text-foreground">
                      <input type="radio" name="consultation" className="accent-foreground" checked={consultation === 0} onChange={() => setConsultation(0)} /> No
                    </label>
                  </div>
                </div>

                <div>
                  <Label className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1.5 block">Customer Service Contacts</Label>
                  <Input type="number" min={0} max={20} placeholder="e.g. 1" value={csContacts} onChange={(e) => setCsContacts(e.target.value)} className="rounded-none" />
                </div>

                <div>
                  <Label className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1.5 block">Email Engagement</Label>
                  <div className="flex gap-6 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer font-body text-sm text-foreground">
                      <input type="radio" name="email" className="accent-foreground" checked={emailEng === 1} onChange={() => setEmailEng(1)} /> Yes
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-body text-sm text-foreground">
                      <input type="radio" name="email" className="accent-foreground" checked={emailEng === 0} onChange={() => setEmailEng(0)} /> No
                    </label>
                  </div>
                </div>

                <div>
                  <Label className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1.5 block">Satisfaction Score</Label>
                  <StarRating value={satisfaction} onChange={setSatisfaction} />
                </div>
              </div>

              <Button onClick={handlePredict} className="w-full mt-8" size="lg">
                <BarChart2 className="h-4 w-4 mr-2" /> Run CART Prediction
              </Button>
            </div>
          </Reveal>

          {/* RIGHT — Result */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              {!prediction ? (
                <div className="border border-border p-8 md:p-12 flex flex-col items-center justify-center min-h-[300px] text-center">
                  <BarChart2 className="h-10 w-10 text-muted-foreground/30 mb-4" strokeWidth={1.5} />
                  <p className="text-muted-foreground font-body font-light text-sm leading-relaxed max-w-xs">
                    Enter customer data and click <span className="font-medium text-foreground">Run CART Prediction</span> to see the result.
                  </p>
                </div>
              ) : (
                <div className={`border-2 ${resultColor} overflow-hidden`}>
                  {/* Coloured header */}
                  <div className={`${resultHeaderColor} px-6 py-4`}>
                    <p className="text-white font-display text-3xl md:text-4xl italic">{prediction.result}</p>
                  </div>

                  <div className="p-6 md:p-8 space-y-5">
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1">Customer Segment</p>
                      <p className="font-display text-lg text-foreground italic">Segment {prediction.segment}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1">Risk Level</p>
                        <span className={`text-[0.65rem] px-2.5 py-1 font-body font-medium ${riskBadgeColor}`}>
                          {prediction.risk}
                        </span>
                      </div>
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-1">Confidence</p>
                        <p className="font-body text-foreground font-medium">{prediction.confidence}</p>
                      </div>
                    </div>

                    {/* Recommended Action */}
                    <div className="border border-border bg-muted/50 p-4 mt-4">
                      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-2">Recommended Action</p>
                      <p className="text-sm text-foreground font-body font-light leading-relaxed">
                        {recommendedActions[prediction.segment]}
                      </p>
                    </div>

                    {/* Decision Tree */}
                    <div className="border border-border p-4">
                      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-3">Decision Path</p>
                      <DecisionTree prediction={prediction} />
                    </div>
                  </div>
                </div>
              )}

              {/* Model note */}
              <p className="text-[0.7rem] text-muted-foreground font-body font-light mt-4 leading-relaxed">
                This prediction is generated by W.Y.W's CART model trained on 15 customer records. Root split: Total Spend 6M ≥ £500 (Weighted Gini Impurity: 0.000).
              </p>

              <Link to="/admin/dataset">
                <Button variant="outline" size="sm" className="mt-4">
                  <ArrowLeft className="h-3.5 w-3.5 mr-1.5" /> Back to Dataset
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </Layout>
  );
}

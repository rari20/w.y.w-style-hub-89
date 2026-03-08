import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { BarChart2, ArrowLeft, CheckCircle2, XCircle, Target, AlertTriangle, CheckCircle, TrendingUp, Users, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  type LoyaltyTier, type YesNo,
  type PredictionInput, type PredictionResult, predictChurn, trainingData, retentionActions, datasetStats,
} from '@/data/cartModel';

const ADMIN_EMAIL = 'admin@wyw-demo.com';

export default function ChurnPredictor() {
  const { user, loading } = useAuth();

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [input, setInput] = useState<PredictionInput>({
    loyaltyTier: 'Spark',
    consultationBooked: 'N',
    emailEngagement: 'N',
    totalSpend6Months: 100,
  });

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
    const result = predictChurn(input);
    setPrediction(result);
  };

  const resetForm = () => {
    setInput({ loyaltyTier: 'Spark', consultationBooked: 'N', emailEngagement: 'N', totalSpend6Months: 100 });
    setPrediction(null);
  };

  return (
    <Layout>
      <div className="wyw-container pt-24 pb-16">
        <Breadcrumb crumbs={[{ label: 'Home', to: '/home' }, { label: 'Account', to: '/account' }, { label: 'Churn Predictor' }]} />

        <Reveal>
          <div className="flex items-center gap-3 mb-2">
            <BarChart2 className="h-6 w-6 text-accent" strokeWidth={1.5} />
            <h1 className="text-3xl md:text-5xl font-display italic text-foreground">Customer Churn Predictor</h1>
          </div>
          <p className="text-muted-foreground font-body font-light mb-10 leading-relaxed max-w-3xl">
            CART decision tree model trained on {datasetStats.totalCustomers} customers. Predicts churn risk using loyalty tier, engagement, and spending patterns from the W.Y.W dataset.
          </p>
        </Reveal>

        {/* Dataset Overview */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="border border-border p-5">
              <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-2">Total Customers</p>
              <span className="font-display text-2xl text-foreground">{datasetStats.totalCustomers}</span>
            </div>
            <div className="border border-border p-5">
              <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-2">Churned ({datasetStats.churnRate}%)</p>
              <span className="font-display text-2xl text-red-600 dark:text-red-400">{datasetStats.churnedCustomers}</span>
            </div>
            <div className="border border-border p-5">
              <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-2">Retained ({100 - datasetStats.churnRate}%)</p>
              <span className="font-display text-2xl text-green-600 dark:text-green-400">{datasetStats.retainedCustomers}</span>
            </div>
            <div className="border border-border p-5">
              <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground font-body mb-2">Avg Spend 6M</p>
              <span className="font-display text-2xl text-foreground">£{datasetStats.avgSpendPerCustomer}</span>
            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Input Form */}
          <Reveal>
            <div className="border border-border p-6 md:p-8">
              <h2 className="font-display text-xl italic text-foreground mb-6 flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" /> Customer Profile Input
              </h2>
              <div className="space-y-5">
                <div>
                  <Label className="text-[0.75rem] uppercase tracking-[0.1em] text-muted-foreground font-body">Loyalty Tier</Label>
                  <Select value={input.loyaltyTier} onValueChange={(v: LoyaltyTier) => setInput({ ...input, loyaltyTier: v })}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Spark">Spark (Entry Level)</SelectItem>
                      <SelectItem value="Volt">Volt (Silver)</SelectItem>
                      <SelectItem value="Surge">Surge (Gold)</SelectItem>
                      <SelectItem value="Watt">Watt (Platinum)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[0.75rem] uppercase tracking-[0.1em] text-muted-foreground font-body">Total Spend (6 Months) £</Label>
                  <Input
                    type="number"
                    value={input.totalSpend6Months}
                    onChange={(e) => setInput({ ...input, totalSpend6Months: Number(e.target.value) })}
                    min="0"
                    step="10"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label className="text-[0.75rem] uppercase tracking-[0.1em] text-muted-foreground font-body">Consultation Booked</Label>
                  <Select value={input.consultationBooked} onValueChange={(v: YesNo) => setInput({ ...input, consultationBooked: v })}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Y">Yes</SelectItem>
                      <SelectItem value="N">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[0.75rem] uppercase tracking-[0.1em] text-muted-foreground font-body">Email Engagement</Label>
                  <Select value={input.emailEngagement} onValueChange={(v: YesNo) => setInput({ ...input, emailEngagement: v })}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Y">Engaged (opens/clicks emails)</SelectItem>
                      <SelectItem value="N">Not Engaged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handlePredict} className="flex-1">Predict Churn Risk</Button>
                  <Button variant="outline" onClick={resetForm}>Reset</Button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Results */}
          <Reveal>
            <div className="border border-border p-6 md:p-8">
              <h2 className="font-display text-xl italic text-foreground mb-6 flex items-center gap-2">
                <Database className="h-5 w-5 text-accent" /> Prediction Result
              </h2>

              {!prediction ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="font-body font-light">Enter customer details and click "Predict" to see churn risk assessment.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Risk Level */}
                  <div className={`p-5 border-l-4 ${
                    prediction.churn
                      ? 'bg-red-50/60 dark:bg-red-950/20 border-l-red-500'
                      : 'bg-green-50/60 dark:bg-green-950/20 border-l-green-500'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      {prediction.churn ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                      <div>
                        <p className="font-display text-lg italic text-foreground">
                          {prediction.churn ? 'HIGH CHURN RISK' : 'LOW CHURN RISK'}
                        </p>
                        <p className="text-sm text-muted-foreground font-body">
                          Confidence: {prediction.confidence}%
                        </p>
                      </div>
                    </div>
                    <p className="text-[0.85rem] text-muted-foreground font-body font-light">{prediction.reason}</p>
                  </div>

                  {/* Decision Path */}
                  <div className="bg-muted p-4 border border-border">
                    <h4 className="font-display text-sm italic mb-2 text-foreground">Decision Tree Path:</h4>
                    <div className="flex items-center gap-2 text-sm flex-wrap">
                      {prediction.path.map((step, i) => (
                        <span key={i} className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 text-[0.75rem] font-body ${
                            i === prediction.path.length - 1
                              ? (prediction.churn ? 'bg-red-500 text-white' : 'bg-green-500 text-white')
                              : 'bg-card border border-border'
                          }`}>
                            {step}
                          </span>
                          {i < prediction.path.length - 1 && (
                            <span className="text-muted-foreground">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Training Data Matches */}
                  <div className="bg-muted/50 p-4 border border-border">
                    <h4 className="font-display text-sm italic mb-2 text-foreground">Similar Customers in Training Data:</h4>
                    <p className="text-xs text-muted-foreground font-body mb-2">{prediction.matchedCustomers.length} customers match this profile</p>
                    <div className="flex flex-wrap gap-1">
                      {prediction.matchedCustomers.slice(0, 10).map(id => (
                        <span key={id} className="px-2 py-1 bg-card border border-border text-[0.7rem] font-body">{id}</span>
                      ))}
                      {prediction.matchedCustomers.length > 10 && (
                        <span className="px-2 py-1 bg-muted text-[0.7rem] font-body text-muted-foreground">
                          +{prediction.matchedCustomers.length - 10} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Recommended Actions */}
                  {prediction.churn && (
                    <div className="bg-amber-50/60 dark:bg-amber-950/20 p-4 border border-amber-200 dark:border-amber-800/40">
                      <h4 className="font-display text-sm italic mb-2 text-foreground">Recommended Retention Actions:</h4>
                      <ul className="text-[0.8rem] text-muted-foreground font-body space-y-1">
                        <li>• Send 20% discount code (COMEBACK20)</li>
                        <li>• Offer free styling consultation</li>
                        <li>• Personal WhatsApp follow-up</li>
                        <li>• Monitor engagement for 14 days</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* Model Information */}
        <Reveal>
          <div className="bg-muted p-6 md:p-8 border border-border mb-10">
            <h3 className="font-display text-lg mb-4 italic text-foreground">CART Model Information</h3>
            <div className="grid md:grid-cols-2 gap-6 text-[0.85rem] text-muted-foreground font-body font-light leading-relaxed">
              <div>
                <p className="font-medium text-foreground mb-1">Model Statistics</p>
                <ul className="space-y-1">
                  <li>• Algorithm: CART (Classification and Regression Trees)</li>
                  <li>• Training Records: {datasetStats.totalCustomers}</li>
                  <li>• Perfect Split Feature: Loyalty Tier (Gini = 0.000)</li>
                  <li>• Accuracy: 100% on training data</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Key Insights</p>
                <ul className="space-y-1">
                  <li>• Spark tier: 100% churn rate ({datasetStats.sparkCustomers} customers)</li>
                  <li>• Higher tiers: 0% churn ({datasetStats.voltCustomers + datasetStats.surgeCustomers + datasetStats.wattCustomers} customers)</li>
                  <li>• Revenue at risk: £{datasetStats.sparkRevenue.toLocaleString()}</li>
                  <li>• Retention opportunity: Focus on Spark tier upgrades</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Navigation */}
        <Reveal>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin/dataset">
              <Button variant="outline"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Dataset</Button>
            </Link>
            <Link to="/retention-dashboard">
              <Button>View Retention Dashboard</Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </Layout>
  );
}
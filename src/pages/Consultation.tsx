import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Video, Zap, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { stores } from '@/data/products';

export default function Consultation() {
  const [type, setType] = useState<'in-store' | 'virtual'>('in-store');
  const [store, setStore] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('');
  const [notes, setNotes] = useState('');
  const [booked, setBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    toast.success('Consultation booked!');
  };

  return (
    <Layout>
      <div className="wyw-container py-8">
        {/* The W.Y.W Difference */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4" /> Expert Styling
            </p>
            <h1 className="text-5xl md:text-6xl font-display mb-4">THE W.Y.W DIFFERENCE</h1>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Every W.Y.W consultation is personal, considered, and led by a human stylist with years of industry experience.
              We don't use algorithms to tell you what to wear — we listen, we observe, and we curate.
            </p>
            <div className="space-y-3">
              {['Free first consultation', '6-month styling warranty included', 'In-store or virtual sessions', 'Tier-based discounts for returning customers'].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-square bg-muted rounded-sm flex items-center justify-center border border-border">
            <div className="text-center p-8">
              <Zap className="h-16 w-16 mx-auto text-primary mb-4" />
              <p className="font-display text-3xl">PERSONAL</p>
              <p className="font-display text-3xl">STYLING</p>
              <p className="text-sm text-muted-foreground mt-2">By humans, for humans</p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-display mb-2">BOOK YOUR SESSION</h2>
            <p className="text-muted-foreground text-sm">
              Your first consultation is complimentary. A 6-month styling warranty is included.
            </p>
          </div>

          {booked ? (
            <div className="text-center py-16 border border-border rounded-sm">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="font-display text-3xl mb-4">YOUR SESSION IS BOOKED</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We'll be in touch within 24 hours to confirm your appointment. Check your email for details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Toggle */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setType('in-store')}
                  className={`flex-1 p-4 border rounded-sm text-center transition-colors ${
                    type === 'in-store' ? 'border-foreground bg-foreground text-background' : 'border-border hover:border-foreground'
                  }`}
                >
                  <MapPin className="h-5 w-5 mx-auto mb-2" />
                  <span className="text-sm font-medium">In-Store</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType('virtual')}
                  className={`flex-1 p-4 border rounded-sm text-center transition-colors ${
                    type === 'virtual' ? 'border-foreground bg-foreground text-background' : 'border-border hover:border-foreground'
                  }`}
                >
                  <Video className="h-5 w-5 mx-auto mb-2" />
                  <span className="text-sm font-medium">Virtual</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required
                    className="floating-label-input" placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="floating-label-input" placeholder="you@email.com" />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Phone</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  className="floating-label-input" placeholder="+44 7700 000000" />
              </div>

              {type === 'in-store' && (
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Preferred Store</label>
                  <select value={store} onChange={e => setStore(e.target.value)}
                    className="floating-label-input" required>
                    <option value="">Choose a store</option>
                    {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    <option value="none">No preference</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Occasion / Goal</label>
                <textarea value={occasion} onChange={e => setOccasion(e.target.value)} rows={3}
                  placeholder="Tell us what you're looking to achieve..."
                  className="floating-label-input resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Preferred Date</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} required
                    className="floating-label-input" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Preferred Time</label>
                  <select value={time} onChange={e => setTime(e.target.value)} required
                    className="floating-label-input">
                    <option value="">Select time</option>
                    <option value="morning">Morning (10am–12pm)</option>
                    <option value="afternoon">Afternoon (12pm–3pm)</option>
                    <option value="late-afternoon">Late Afternoon (3pm–6pm)</option>
                  </select>
                </div>
              </div>

              <Button variant="default" size="lg" type="submit" className="w-full">
                <Calendar className="h-4 w-4 mr-2" /> Book My Session
              </Button>

              <p className="text-xs text-muted-foreground text-center italic">
                All W.Y.W consultations are conducted by our expert human stylists — we believe great style advice requires a personal touch, not an algorithm.
              </p>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

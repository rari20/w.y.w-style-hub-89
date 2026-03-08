import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Video, Scissors, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { stores } from '@/data/products';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function Consultation() {
  usePageTitle('Consultation');
  const [type, setType] = useState<'in-store' | 'virtual'>('in-store');
  const [store, setStore] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('');
  const [booked, setBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    toast.success('Consultation booked!');
  };

  const inputClass = "w-full bg-transparent border-b border-muted-foreground/30 px-0 py-3 font-body text-[0.9375rem] focus:outline-none focus:border-foreground transition-colors text-foreground";

  return (
    <Layout>
      <div className="wyw-container pt-24 pb-16">
        <Breadcrumb crumbs={[{ label: 'Home', to: '/home' }, { label: 'Consultation' }]} />
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="font-body text-[0.625rem] tracking-[0.25em] uppercase text-primary mb-3 flex items-center gap-2">
              <Scissors className="h-3.5 w-3.5" strokeWidth={1.5} /> Expert Styling
            </p>
            <h1 className="text-4xl md:text-5xl font-display mb-5 italic leading-[1.05]">The W.Y.W Difference</h1>
            <p className="text-muted-foreground mb-6 leading-relaxed font-body font-light">
              Every W.Y.W consultation is personal, considered, and led by a human stylist with years of industry experience.
              We don't use algorithms to tell you what to wear — we listen, we observe, and we curate.
            </p>
            <div className="space-y-3">
              {['Free first consultation', '6-month styling warranty included', 'In-store or virtual sessions', 'Tier-based discounts for returning customers'].map(item => (
                <div key={item} className="flex items-center gap-2.5 text-[0.85rem] font-body">
                  <Check className="h-3.5 w-3.5 text-primary shrink-0" strokeWidth={1.5} />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-[4/5] bg-muted flex items-center justify-center border border-border">
            <div className="text-center p-8">
              <Scissors className="h-10 w-10 mx-auto text-primary mb-4" strokeWidth={1} />
              <p className="font-display text-[2rem] italic leading-[1.1] mb-1 text-foreground">Personal</p>
              <p className="font-display text-[2rem] italic leading-[1.1] text-foreground">Styling</p>
              <p className="font-body text-[0.7rem] text-muted-foreground mt-4 tracking-wide">By humans, for humans</p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display mb-3 italic">Book Your Session</h2>
            <p className="text-muted-foreground text-[0.85rem] font-body font-light">
              Your first consultation is complimentary. A 6-month styling warranty is included.
            </p>
          </div>

          {booked ? (
            <div className="text-center py-16 border border-border">
              <div className="w-14 h-14 border-2 border-primary flex items-center justify-center mx-auto mb-6">
                <Check className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl mb-4 italic text-foreground">Your Session is Booked</h3>
              <p className="text-muted-foreground max-w-md mx-auto font-body font-light">
                We'll be in touch within 24 hours to confirm your appointment. Check your email for details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Toggle */}
              <div className="flex gap-3">
                <button type="button" onClick={() => setType('in-store')}
                  className={`flex-1 p-4 border text-center transition-colors ${
                    type === 'in-store' ? 'border-foreground bg-foreground text-background' : 'border-border hover:border-foreground text-foreground'
                  }`}>
                  <MapPin className="h-5 w-5 mx-auto mb-2" strokeWidth={1.5} />
                  <span className="text-[0.8rem] font-body font-medium">In-Store</span>
                </button>
                <button type="button" onClick={() => setType('virtual')}
                  className={`flex-1 p-4 border text-center transition-colors ${
                    type === 'virtual' ? 'border-foreground bg-foreground text-background' : 'border-border hover:border-foreground text-foreground'
                  }`}>
                  <Video className="h-5 w-5 mx-auto mb-2" strokeWidth={1.5} />
                  <span className="text-[0.8rem] font-body font-medium">Virtual</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required className={inputClass} placeholder="Your full name" />
                </div>
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className={inputClass} placeholder="you@email.com" />
                </div>
              </div>

              <div>
                <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Phone</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} placeholder="+44 7700 000000" />
              </div>

              {type === 'in-store' && (
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Preferred Store</label>
                  <select value={store} onChange={e => setStore(e.target.value)} className={inputClass} required>
                    <option value="">Choose a store</option>
                    {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    <option value="none">No preference</option>
                  </select>
                </div>
              )}

              <div>
                <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Occasion / Goal</label>
                <textarea value={occasion} onChange={e => setOccasion(e.target.value)} rows={3} placeholder="Tell us what you're looking to achieve..."
                  className={`${inputClass} resize-none`} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Preferred Date</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} required className={inputClass} />
                </div>
                <div>
                  <label className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-1 block">Preferred Time</label>
                  <select value={time} onChange={e => setTime(e.target.value)} required className={inputClass}>
                    <option value="">Select time</option>
                    <option value="morning">Morning (10am–12pm)</option>
                    <option value="afternoon">Afternoon (12pm–3pm)</option>
                    <option value="late-afternoon">Late Afternoon (3pm–6pm)</option>
                  </select>
                </div>
              </div>

              <Button variant="default" size="lg" type="submit" className="w-full">
                <Calendar className="h-4 w-4 mr-2" strokeWidth={1.5} /> Book My Session
              </Button>

              <p className="text-[0.75rem] text-muted-foreground text-center italic font-body">
                All W.Y.W consultations are conducted by our expert human stylists — we believe great style advice requires a personal touch, not an algorithm.
              </p>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

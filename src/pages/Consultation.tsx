import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Video, Zap } from 'lucide-react';
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
  const [occasion, setOccasion] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Consultation booked! Check your email for confirmation.');
  };

  return (
    <Layout>
      <div className="wyw-container py-8">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" /> Expert Styling
          </p>
          <h1 className="text-5xl md:text-6xl font-display mb-4">BOOK A CONSULTATION</h1>
          <p className="text-muted-foreground mb-2 leading-relaxed">
            Your first consultation is <strong>free</strong>. Our expert stylists will help you build the perfect wardrobe, 
            in-store or virtually. Includes a 6-month styling warranty.
          </p>
          <p className="text-sm text-muted-foreground mb-8 italic">
            All W.Y.W consultations are conducted by our expert human stylists — we believe great style advice requires a personal touch.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type */}
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

            {type === 'in-store' && (
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Select Store</label>
                <select
                  value={store}
                  onChange={e => setStore(e.target.value)}
                  className="w-full bg-muted px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                >
                  <option value="">Choose a store</option>
                  {stores.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required
                  className="w-full bg-muted px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Time</label>
                <select value={time} onChange={e => setTime(e.target.value)} required
                  className="w-full bg-muted px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent">
                  <option value="">Select time</option>
                  {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Your Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required
                  className="w-full bg-muted px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full bg-muted px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Occasion</label>
              <input type="text" value={occasion} onChange={e => setOccasion(e.target.value)} placeholder="e.g. Wedding, Work, Casual refresh..."
                className="w-full bg-muted px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">Style Notes</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Tell us about your style preferences..."
                className="w-full bg-muted px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
            </div>

            <Button variant="hero" size="lg" type="submit" className="w-full">
              <Calendar className="h-4 w-4 mr-2" /> Confirm Booking
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

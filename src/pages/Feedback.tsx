import Layout from '@/components/Layout';
import Breadcrumb from '@/components/Breadcrumb';
import Reveal from '@/components/Reveal';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { MessageSquare, Star } from 'lucide-react';

function StarRating({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="mb-6">
      <p className="font-body text-[0.85rem] font-medium text-foreground mb-2">{label}</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(s => (
          <button key={s} type="button" onClick={() => onChange(s)} className="p-1 transition-colors">
            <Star
              className={`h-6 w-6 transition-colors ${s <= value ? 'text-accent fill-accent' : 'text-muted-foreground/30'}`}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Feedback() {
  const [satisfaction, setSatisfaction] = useState(0);
  const [likelihood, setLikelihood] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (satisfaction === 0 || likelihood === 0) {
      toast.error('Please provide a rating for both questions.');
      return;
    }
    // In production this would be saved to the database
    console.log('Feedback submitted:', { satisfaction, likelihood, comment });
    setSubmitted(true);
    toast.success('Thank you for your feedback!');
  };

  return (
    <Layout>
      <div className="wyw-container pt-24 pb-16 max-w-2xl mx-auto">
        <Breadcrumb crumbs={[{ label: 'Home', to: '/home' }, { label: 'Share Feedback' }]} />

        <Reveal>
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="h-6 w-6 text-accent" strokeWidth={1.5} />
            <h1 className="text-3xl md:text-5xl font-display italic text-foreground">Help Us Improve</h1>
          </div>
          <p className="text-muted-foreground font-body font-light mb-10 leading-relaxed">
            Your feedback helps us understand what we're doing well and where we can do better. Every response shapes the W.Y.W experience.
          </p>
        </Reveal>

        {submitted ? (
          <Reveal>
            <div className="bg-muted p-8 text-center">
              <Star className="h-8 w-8 text-accent mx-auto mb-4" strokeWidth={1.5} />
              <h2 className="font-display text-2xl mb-2 text-foreground italic">Thank You</h2>
              <p className="text-muted-foreground font-body font-light">
                Your feedback has been recorded. It directly helps us improve our service and prevent customer churn.
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-2">
              <StarRating value={satisfaction} onChange={setSatisfaction} label="How satisfied are you with W.Y.W overall?" />
              <StarRating value={likelihood} onChange={setLikelihood} label="How likely are you to shop with us again?" />
              <div className="mb-6">
                <p className="font-body text-[0.85rem] font-medium text-foreground mb-2">Is there anything we can improve? <span className="text-muted-foreground font-light">(optional)</span></p>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  maxLength={1000}
                  rows={4}
                  className="w-full bg-transparent border border-border p-3 font-body text-[0.9rem] focus:outline-none focus:border-foreground transition-colors text-foreground resize-none"
                  placeholder="Tell us what's on your mind…"
                />
              </div>
              <Button variant="default" size="lg" type="submit" className="w-full">
                Submit Feedback
              </Button>
              <p className="text-[0.7rem] text-muted-foreground font-body text-center pt-2">
                Your responses are used to improve our service. This data feeds our customer satisfaction model.
              </p>
            </form>
          </Reveal>
        )}
      </div>
    </Layout>
  );
}

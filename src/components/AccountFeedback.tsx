import { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function StarRow({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s} type="button" onClick={() => onChange(s)} className="p-0.5">
          <Star className={`h-6 w-6 transition-colors ${s <= value ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground/30'}`} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
}

export default function AccountFeedback({ lastOrderId }: { lastOrderId?: string }) {
  const [orderRating, setOrderRating] = useState(0);
  const [orderComment, setOrderComment] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const [npsScore, setNpsScore] = useState<number | null>(null);
  const [npsComment, setNpsComment] = useState('');
  const [npsSubmitted, setNpsSubmitted] = useState(false);

  return (
    <div id="feedback" className="mt-8 pt-6 border-t border-border">
      <h3 className="font-display text-[1.25rem] italic text-foreground mb-1">How are we doing?</h3>
      <p className="text-[0.8rem] text-muted-foreground font-body mb-6">Your feedback helps us improve W.Y.W for everyone.</p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Order review */}
        <div className="border border-border p-5">
          <p className="font-body text-[0.8rem] font-semibold text-foreground mb-1">Rate your last order</p>
          {lastOrderId && <p className="text-[0.7rem] text-muted-foreground font-body mb-3">{lastOrderId}</p>}
          {orderSubmitted ? (
            <p className="text-[0.85rem] text-accent font-body flex items-center gap-1.5 mt-2">
              <CheckCircle className="h-4 w-4" strokeWidth={1.5} /> Review submitted — thank you!
            </p>
          ) : (
            <>
              <StarRow value={orderRating} onChange={setOrderRating} />
              <textarea
                value={orderComment}
                onChange={e => setOrderComment(e.target.value)}
                placeholder="What did you love or what could we improve?"
                rows={2}
                className="w-full bg-transparent border border-border p-2.5 mt-3 font-body text-[0.82rem] focus:outline-none focus:border-foreground text-foreground resize-none placeholder:text-muted-foreground/50"
              />
              <Button
                variant="default"
                size="sm"
                className="mt-3"
                disabled={orderRating === 0}
                onClick={() => { setOrderSubmitted(true); toast.success('Review submitted!'); }}
              >
                Submit Review
              </Button>
            </>
          )}
        </div>

        {/* NPS */}
        <div className="border border-border p-5">
          <p className="font-body text-[0.8rem] font-semibold text-foreground mb-3">How likely are you to recommend W.Y.W to a friend?</p>
          {npsSubmitted ? (
            <p className="text-[0.85rem] text-accent font-body flex items-center gap-1.5 mt-2">
              <CheckCircle className="h-4 w-4" strokeWidth={1.5} /> Thanks for your feedback
              {npsScore !== null && <span className="ml-1 font-medium">({npsScore}/10)</span>}
            </p>
          ) : (
            <>
              <div className="flex gap-1 flex-wrap mb-3">
                {Array.from({ length: 11 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setNpsScore(i)}
                    className={`w-7 h-7 text-[0.7rem] font-body border transition-colors ${
                      npsScore === i ? 'bg-foreground text-background border-foreground' : 'border-border hover:border-foreground text-foreground'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[0.6rem] text-muted-foreground font-body mb-3">
                <span>Not at all</span><span>Extremely likely</span>
              </div>
              <textarea
                value={npsComment}
                onChange={e => setNpsComment(e.target.value)}
                placeholder="Any additional thoughts? (optional)"
                rows={2}
                className="w-full bg-transparent border border-border p-2.5 font-body text-[0.82rem] focus:outline-none focus:border-foreground text-foreground resize-none placeholder:text-muted-foreground/50"
              />
              <Button
                variant="default"
                size="sm"
                className="mt-3"
                disabled={npsScore === null}
                onClick={() => { setNpsSubmitted(true); toast.success('Thank you!'); }}
              >
                Submit
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

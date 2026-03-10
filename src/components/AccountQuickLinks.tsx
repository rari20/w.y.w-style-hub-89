import { Truck, RotateCcw, Heart, Gift, HelpCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onTabChange: (tab: string) => void;
}

const quickLinks = [
  { icon: Truck, label: 'Track Orders', action: 'orders' },
  { icon: RotateCcw, label: 'Start Return', action: 'returns' },
  { icon: Heart, label: 'My Wishlist', action: 'wishlist' },
  { icon: Gift, label: 'Gift Cards', action: '/gift-cards' },
  { icon: HelpCircle, label: 'Get Help', action: '/customer-service' },
  { icon: Star, label: 'Feedback', action: 'feedback', amber: true },
];

export default function AccountQuickLinks({ onTabChange }: Props) {
  const navigate = useNavigate();

  const handleClick = (action: string) => {
    if (action.startsWith('/')) {
      navigate(action);
    } else if (action === 'feedback') {
      document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      onTabChange(action);
    }
  };

  return (
    <div className="mb-6">
      <p className="font-body text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground mb-3">Quick Access</p>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 lg:grid lg:grid-cols-6 lg:overflow-visible">
        {quickLinks.map(item => (
          <button
            key={item.label}
            onClick={() => handleClick(item.action)}
            className="flex flex-col items-center justify-center gap-2 min-w-[88px] w-[88px] h-[88px] lg:w-auto lg:h-[100px] border border-border rounded-lg hover:shadow-md hover:-translate-y-0.5 transition-all shrink-0 bg-background"
          >
            <item.icon className={`h-5 w-5 ${item.amber ? 'text-amber-500' : 'text-primary'}`} strokeWidth={1.5} />
            <span className="font-body text-[0.7rem] text-foreground text-center leading-tight">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

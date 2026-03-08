// ─── Admin Portal Static Dataset ───
// All 15 customers matching the CART churn prediction model

export const ADMIN_EMAIL = 'admin@wyw-demo.com';

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  loyaltyTier: 'Spark' | 'Volt' | 'Surge' | 'Watt';
  totalSpend: number;
  daysInactive: number;
  churnRisk: 'Low' | 'Medium' | 'High';
  emailEngaged: boolean;
  consultations: number;
  satisfaction: number;
  returnRate: number;
  ordersLast6M: number;
  segment: 'A' | 'B' | 'C' | 'D';
  flaggedForRetention: boolean;
  notes: string;
}

export const customers: AdminCustomer[] = [
  { id: 'WYW001', name: 'Jamie Davidson', email: 'jamie.davidson@email.com', loyaltyTier: 'Volt', totalSpend: 847, daysInactive: 14, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 4, returnRate: 0, ordersLast6M: 3, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'WYW002', name: 'Sarah Chen', email: 'sarah.chen@email.com', loyaltyTier: 'Surge', totalSpend: 1240, daysInactive: 22, churnRisk: 'Low', emailEngaged: true, consultations: 2, satisfaction: 5, returnRate: 5, ordersLast6M: 5, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW003', name: 'Marcus Reid', email: 'marcus.reid@email.com', loyaltyTier: 'Volt', totalSpend: 695, daysInactive: 31, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 4, returnRate: 10, ordersLast6M: 2, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'WYW004', name: 'Priya Sharma', email: 'priya.sharma@email.com', loyaltyTier: 'Surge', totalSpend: 2100, daysInactive: 18, churnRisk: 'Low', emailEngaged: true, consultations: 3, satisfaction: 5, returnRate: 3, ordersLast6M: 7, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW005', name: 'Oliver Walsh', email: 'oliver.walsh@email.com', loyaltyTier: 'Volt', totalSpend: 520, daysInactive: 45, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 3, returnRate: 12, ordersLast6M: 2, segment: 'C', flaggedForRetention: false, notes: '' },
  { id: 'WYW006', name: 'Isabella Grant', email: 'isabella.grant@email.com', loyaltyTier: 'Watt', totalSpend: 4850, daysInactive: 12, churnRisk: 'Low', emailEngaged: true, consultations: 5, satisfaction: 5, returnRate: 2, ordersLast6M: 10, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW007', name: 'Thomas Burke', email: 'thomas.burke@email.com', loyaltyTier: 'Volt', totalSpend: 610, daysInactive: 28, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 4, returnRate: 8, ordersLast6M: 3, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'WYW008', name: 'Amara Osei', email: 'amara.osei@email.com', loyaltyTier: 'Spark', totalSpend: 385, daysInactive: 55, churnRisk: 'Medium', emailEngaged: false, consultations: 0, satisfaction: 3, returnRate: 18, ordersLast6M: 1, segment: 'C', flaggedForRetention: false, notes: '' },
  { id: 'WYW009', name: 'Lily Nakamura', email: 'lily.nakamura@email.com', loyaltyTier: 'Volt', totalSpend: 760, daysInactive: 38, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 4, returnRate: 5, ordersLast6M: 3, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'WYW010', name: 'Daniel Frost', email: 'daniel.frost@email.com', loyaltyTier: 'Surge', totalSpend: 3200, daysInactive: 9, churnRisk: 'Low', emailEngaged: true, consultations: 4, satisfaction: 5, returnRate: 1, ordersLast6M: 8, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW011', name: 'Chloe Winters', email: 'chloe.winters@email.com', loyaltyTier: 'Spark', totalSpend: 185, daysInactive: 112, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 35, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW012', name: 'Ethan Moss', email: 'ethan.moss@email.com', loyaltyTier: 'Spark', totalSpend: 240, daysInactive: 95, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 30, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW013', name: 'Zara Phillips', email: 'zara.phillips@email.com', loyaltyTier: 'Spark', totalSpend: 310, daysInactive: 78, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 3, returnRate: 28, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW014', name: 'Ryan O\'Brien', email: 'ryan.obrien@email.com', loyaltyTier: 'Spark', totalSpend: 420, daysInactive: 88, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 25, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW015', name: 'Nadia Kowalski', email: 'nadia.kowalski@email.com', loyaltyTier: 'Spark', totalSpend: 465, daysInactive: 67, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 3, returnRate: 22, ordersLast6M: 2, segment: 'D', flaggedForRetention: true, notes: '' },
];

export const recentOrders = [
  { id: 'WYW-2026-0048', customer: 'Isabella Grant', items: 3, total: '£1,245.00', status: 'Processing', date: '08 Mar 2026' },
  { id: 'WYW-2026-0047', customer: 'Daniel Frost', items: 2, total: '£680.00', status: 'Shipped', date: '07 Mar 2026' },
  { id: 'WYW-2026-0046', customer: 'Sarah Chen', items: 1, total: '£385.00', status: 'Delivered', date: '06 Mar 2026' },
  { id: 'WYW-2026-0045', customer: 'Jamie Davidson', items: 2, total: '£214.00', status: 'Delivered', date: '05 Mar 2026' },
  { id: 'WYW-2026-0044', customer: 'Priya Sharma', items: 4, total: '£920.00', status: 'Delivered', date: '04 Mar 2026' },
];

export const discountCodes = [
  { code: 'WELCOME10', type: 'Percentage', value: '10% off', usage: '47/∞', expires: 'Never', status: 'Active' as const },
  { code: 'SPARK20', type: 'Percentage', value: '20% off', usage: '12/50', expires: '31 Mar 2026', status: 'Active' as const },
  { code: 'COMEBACK20', type: 'Percentage', value: '20% off', usage: '0/5', expires: '31 Mar 2026', status: 'Active (Retention)' as const },
  { code: 'FREESHIP30', type: 'Free Delivery', value: 'Free', usage: '8/100', expires: '30 Apr 2026', status: 'Active' as const },
  { code: 'VOLT15', type: 'Percentage', value: '15% off', usage: '3/20', expires: '15 Apr 2026', status: 'Active' as const },
];

export const tierColors: Record<string, string> = {
  Watt: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  Surge: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
  Volt: 'bg-orange-500/20 text-orange-700 dark:text-orange-400',
  Spark: 'bg-muted text-muted-foreground',
};

export const riskColors: Record<string, string> = {
  High: 'bg-red-500/20 text-red-700 dark:text-red-400',
  Medium: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  Low: 'bg-green-500/20 text-green-700 dark:text-green-400',
};

export const socialPlatforms = [
  { name: 'Instagram', handle: '@wyw.fashion', followers: '12,400', link: 'https://instagram.com/wyw.fashion', color: 'bg-gradient-to-br from-pink-500 to-purple-600', iconBg: true },
  { name: 'TikTok', handle: '@wywthelabel', followers: '8,200', link: 'https://tiktok.com/@wywthelabel', color: 'bg-foreground text-background' },
  { name: 'Pinterest', handle: '@wywfashion', followers: '3,100', link: 'https://pinterest.com/wywfashion', color: 'bg-red-600 text-white' },
  { name: 'Facebook', handle: 'W.Y.W Fashion', followers: '5,600', link: 'https://facebook.com/wywfashion', color: 'bg-blue-600 text-white' },
  { name: 'X / Twitter', handle: '@wywfashion', followers: '2,900', link: 'https://x.com/wywfashion', color: 'bg-foreground text-background' },
  { name: 'WhatsApp Business', handle: '+44 7700 000001', followers: '', link: 'https://wa.me/447700000001', color: 'bg-green-600 text-white' },
];

export const socialPostTemplates = [
  "We've missed you. Your style is waiting — shop the new W.Y.W collection and use code COMEBACK20 for 20% off. Power your style. #WYW #WattYouWant #FashionRetail [link]",
  "W.Y.W Rewards members get more. From free delivery at Volt tier to your own personal stylist at Watt — every purchase powers your next level. Join free at [link] #WYWRewards #LoyaltyPerks",
  "New in from Lumenwear, Voltex Studio, ArcThread & KiloKouture. Four brands. One destination. Shop the edit now at W.Y.W. #PowerYourStyle #NewIn #WYW [link]",
];

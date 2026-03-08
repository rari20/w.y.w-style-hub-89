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
  { name: 'Instagram', abbr: 'IG', handle: '@wyw.fashion', followers: '12,400', link: 'https://instagram.com/wyw.fashion', color: 'bg-gradient-to-br from-pink-500 to-purple-600 text-white' },
  { name: 'TikTok', abbr: 'TK', handle: '@wywthelabel', followers: '8,200', link: 'https://tiktok.com/@wywthelabel', color: 'bg-foreground text-background' },
  { name: 'Pinterest', abbr: 'PT', handle: '@wywfashion', followers: '3,100', link: 'https://pinterest.com/wywfashion', color: 'bg-red-600 text-white' },
  { name: 'Facebook', abbr: 'FB', handle: 'W.Y.W Fashion', followers: '5,600', link: 'https://facebook.com/wywfashion', color: 'bg-blue-600 text-white' },
  { name: 'X / Twitter', abbr: 'X', handle: '@wywfashion', followers: '2,900', link: 'https://x.com/wywfashion', color: 'bg-foreground text-background' },
  { name: 'WhatsApp Business', abbr: 'WA', handle: '+44 7700 000001', followers: '', link: 'https://wa.me/447700000001', color: 'bg-[hsl(142,70%,45%)] text-white' },
];

export const socialPostTemplates = [
  "We've missed you. Your style is waiting — shop the new W.Y.W collection and use code COMEBACK20 for 20% off. Power your style. #WYW #WattYouWant #FashionRetail [link]",
  "W.Y.W Rewards members get more. From free delivery at Volt tier to your own personal stylist at Watt — every purchase powers your next level. Join free at [link] #WYWRewards #LoyaltyPerks",
  "New in from Lumenwear, Voltex Studio, ArcThread & KiloKouture. Four brands. One destination. Shop the edit now at W.Y.W. #PowerYourStyle #NewIn #WYW [link]",
];

// ─── Admin Notifications ───
export interface AdminNotification {
  id: string;
  type: 'order' | 'churn' | 'campaign' | 'return' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

export const adminNotifications: AdminNotification[] = [
  { id: 'n1', type: 'order', title: 'New Order', message: 'Isabella Grant placed a £1,245 order (3 items)', time: '12 min ago', read: false, link: '/admin/orders' },
  { id: 'n2', type: 'churn', title: 'Churn Alert', message: 'Nadia Kowalski has been inactive for 67 days — flagged as high risk', time: '1 hr ago', read: false, link: '/admin/churn-risk' },
  { id: 'n3', type: 'campaign', title: 'Campaign Update', message: 'Churn Re-engagement Campaign: 2 of 5 emails opened', time: '2 hrs ago', read: false, link: '/admin/email-campaigns' },
  { id: 'n4', type: 'order', title: 'New Order', message: 'Daniel Frost placed a £680 order (2 items)', time: '3 hrs ago', read: true, link: '/admin/orders' },
  { id: 'n5', type: 'return', title: 'Return Request', message: 'Amara Osei requested a return for WYW-2026-0039', time: '5 hrs ago', read: true, link: '/admin/returns' },
  { id: 'n6', type: 'churn', title: 'Churn Alert', message: 'Ryan O\'Brien satisfaction score dropped to 2/5', time: '6 hrs ago', read: true, link: '/admin/churn-risk' },
  { id: 'n7', type: 'system', title: 'System', message: 'CART model recalculated — 5 customers flagged as at-risk', time: '8 hrs ago', read: true, link: '/admin/analytics' },
  { id: 'n8', type: 'campaign', title: 'Discount Used', message: 'COMEBACK20 code redeemed by Ethan Moss (first use)', time: '1 day ago', read: true, link: '/admin/discounts' },
];

// ─── Customer Activity Timeline ───
export interface ActivityEvent {
  id: string;
  type: 'order' | 'return' | 'discount' | 'email' | 'consultation' | 'tier' | 'login' | 'review';
  title: string;
  description: string;
  date: string;
  icon?: string;
}

export const customerTimelines: Record<string, ActivityEvent[]> = {
  WYW001: [
    { id: 'a1', type: 'order', title: 'Order Placed', description: 'WYW-2026-0045 — 2 items, £214.00', date: '05 Mar 2026' },
    { id: 'a2', type: 'consultation', title: 'Styling Consultation', description: 'Virtual session with stylist Alex M.', date: '20 Feb 2026' },
    { id: 'a3', type: 'order', title: 'Order Placed', description: 'WYW-2026-0031 — 1 item, £385.00', date: '14 Jan 2026' },
    { id: 'a4', type: 'tier', title: 'Tier Upgrade', description: 'Promoted from Spark to Volt tier', date: '14 Jan 2026' },
    { id: 'a5', type: 'order', title: 'Order Placed', description: 'WYW-2026-0018 — 3 items, £647.00', date: '03 Dec 2025' },
    { id: 'a6', type: 'login', title: 'Account Created', description: 'Registered via email', date: '15 Nov 2025' },
  ],
  WYW006: [
    { id: 'a1', type: 'order', title: 'Order Placed', description: 'WYW-2026-0048 — 3 items, £1,245.00', date: '08 Mar 2026' },
    { id: 'a2', type: 'consultation', title: 'Personal Styling', description: 'In-store session at London flagship', date: '01 Mar 2026' },
    { id: 'a3', type: 'review', title: 'Review Left', description: '5/5 for Ethereal Silk Blouse', date: '25 Feb 2026' },
    { id: 'a4', type: 'order', title: 'Order Placed', description: 'WYW-2026-0040 — 2 items, £895.00', date: '18 Feb 2026' },
  ],
  WYW011: [
    { id: 'a1', type: 'email', title: 'Re-engagement Email', description: 'COMEBACK20 discount code sent', date: '08 Mar 2026' },
    { id: 'a2', type: 'return', title: 'Return Processed', description: 'Thread Linen Shirt — refunded £135', date: '18 Nov 2025' },
    { id: 'a3', type: 'order', title: 'Order Placed', description: 'WYW-2025-0089 — 1 item, £185.00', date: '15 Nov 2025' },
    { id: 'a4', type: 'login', title: 'Account Created', description: 'Registered in-store via QR code', date: '15 Nov 2025' },
  ],
  WYW013: [
    { id: 'a1', type: 'email', title: 'WhatsApp Follow-up', description: 'Sent after email went unopened', date: '01 Mar 2026' },
    { id: 'a2', type: 'email', title: 'Re-engagement Email', description: 'COMEBACK20 discount code sent', date: '22 Feb 2026' },
    { id: 'a3', type: 'return', title: 'Return Processed', description: 'Arc Pleat Skirt — refunded £245', date: '28 Dec 2025' },
    { id: 'a4', type: 'order', title: 'Order Placed', description: 'WYW-2025-0094 — 2 items, £310.00', date: '20 Dec 2025' },
    { id: 'a5', type: 'login', title: 'Account Created', description: 'Registered via email', date: '18 Dec 2025' },
  ],
  WYW014: [
    { id: 'a1', type: 'consultation', title: 'Free Consultation Offered', description: 'Awaiting response — final retention offer', date: '08 Mar 2026' },
    { id: 'a2', type: 'email', title: 'WhatsApp Follow-up', description: 'Sent after email went unopened', date: '01 Mar 2026' },
    { id: 'a3', type: 'email', title: 'Re-engagement Email', description: 'COMEBACK20 discount code sent', date: '22 Feb 2026' },
    { id: 'a4', type: 'order', title: 'Order Placed', description: 'WYW-2025-0091 — 1 item, £420.00', date: '10 Dec 2025' },
    { id: 'a5', type: 'return', title: 'Return Processed', description: 'Voltage Track Jacket — refunded £345', date: '22 Dec 2025' },
  ],
};

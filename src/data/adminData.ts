// ─── Admin Portal Static Dataset ───
// 50-record dataset mapped from ecom_dataset.xlsx
// Uses actual features: LoyaltyTier, TotalSpend, DaysSinceLastPurchase, ReturnRate, etc.

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
  segment: 'A' | 'B' | 'C' | 'D';
  flaggedForRetention: boolean;
  notes: string;
}

// 25 retained customers (Watt, Surge, Volt tiers — 0% churn in dataset)
const retainedCustomers: AdminCustomer[] = [
  { id: 'C001', name: 'Customer 001', email: 'c001@email.com', loyaltyTier: 'Surge', totalSpend: 480, daysInactive: 12, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 4, returnRate: 5, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'C003', name: 'Customer 003', email: 'c003@email.com', loyaltyTier: 'Volt', totalSpend: 260, daysInactive: 30, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 4, returnRate: 0, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'C005', name: 'Customer 005', email: 'c005@email.com', loyaltyTier: 'Surge', totalSpend: 520, daysInactive: 18, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 5, returnRate: 5, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'C007', name: 'Customer 007', email: 'c007@email.com', loyaltyTier: 'Volt', totalSpend: 390, daysInactive: 22, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 4, returnRate: 0, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'C009', name: 'Customer 009', email: 'c009@email.com', loyaltyTier: 'Watt', totalSpend: 610, daysInactive: 15, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 5, returnRate: 0, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'C011', name: 'Customer 011', email: 'c011@email.com', loyaltyTier: 'Surge', totalSpend: 450, daysInactive: 20, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 4, returnRate: 5, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'C013', name: 'Customer 013', email: 'c013@email.com', loyaltyTier: 'Volt', totalSpend: 340, daysInactive: 25, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 4, returnRate: 5, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'C015', name: 'Customer 015', email: 'c015@email.com', loyaltyTier: 'Watt', totalSpend: 700, daysInactive: 10, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 5, returnRate: 0, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'C017', name: 'Customer 017', email: 'c017@email.com', loyaltyTier: 'Volt', totalSpend: 320, daysInactive: 28, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 4, returnRate: 0, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'C019', name: 'Customer 019', email: 'c019@email.com', loyaltyTier: 'Surge', totalSpend: 510, daysInactive: 17, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 5, returnRate: 5, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'C021', name: 'Customer 021', email: 'c021@email.com', loyaltyTier: 'Surge', totalSpend: 460, daysInactive: 14, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 4, returnRate: 5, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'C023', name: 'Customer 023', email: 'c023@email.com', loyaltyTier: 'Volt', totalSpend: 280, daysInactive: 32, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 4, returnRate: 5, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'C025', name: 'Customer 025', email: 'c025@email.com', loyaltyTier: 'Surge', totalSpend: 530, daysInactive: 19, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 5, returnRate: 0, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'C027', name: 'Customer 027', email: 'c027@email.com', loyaltyTier: 'Volt', totalSpend: 350, daysInactive: 27, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 4, returnRate: 5, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'C029', name: 'Customer 029', email: 'c029@email.com', loyaltyTier: 'Watt', totalSpend: 620, daysInactive: 16, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 5, returnRate: 0, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'C031', name: 'Customer 031', email: 'c031@email.com', loyaltyTier: 'Surge', totalSpend: 410, daysInactive: 23, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 4, returnRate: 5, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'C033', name: 'Customer 033', email: 'c033@email.com', loyaltyTier: 'Volt', totalSpend: 290, daysInactive: 35, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 4, returnRate: 5, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'C035', name: 'Customer 035', email: 'c035@email.com', loyaltyTier: 'Watt', totalSpend: 680, daysInactive: 11, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 5, returnRate: 0, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'C037', name: 'Customer 037', email: 'c037@email.com', loyaltyTier: 'Volt', totalSpend: 360, daysInactive: 26, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 4, returnRate: 0, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'C039', name: 'Customer 039', email: 'c039@email.com', loyaltyTier: 'Surge', totalSpend: 540, daysInactive: 21, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 5, returnRate: 0, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'C041', name: 'Customer 041', email: 'c041@email.com', loyaltyTier: 'Surge', totalSpend: 470, daysInactive: 13, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 4, returnRate: 5, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'C043', name: 'Customer 043', email: 'c043@email.com', loyaltyTier: 'Volt', totalSpend: 310, daysInactive: 29, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 4, returnRate: 0, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'C045', name: 'Customer 045', email: 'c045@email.com', loyaltyTier: 'Watt', totalSpend: 650, daysInactive: 16, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 5, returnRate: 0, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'C047', name: 'Customer 047', email: 'c047@email.com', loyaltyTier: 'Volt', totalSpend: 370, daysInactive: 24, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 4, returnRate: 0, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'C049', name: 'Customer 049', email: 'c049@email.com', loyaltyTier: 'Surge', totalSpend: 500, daysInactive: 18, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 5, returnRate: 5, segment: 'A', flaggedForRetention: false, notes: '' },
];

// 25 churn-risk customers (Spark tier — 100% churn in dataset)
const churnCustomers: AdminCustomer[] = [
  { id: 'C002', name: 'Customer 002', email: 'c002@email.com', loyaltyTier: 'Spark', totalSpend: 120, daysInactive: 95, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 15, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C004', name: 'Customer 004', email: 'c004@email.com', loyaltyTier: 'Spark', totalSpend: 60, daysInactive: 140, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 20, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C006', name: 'Customer 006', email: 'c006@email.com', loyaltyTier: 'Spark', totalSpend: 80, daysInactive: 160, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 1, returnRate: 25, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C008', name: 'Customer 008', email: 'c008@email.com', loyaltyTier: 'Spark', totalSpend: 150, daysInactive: 70, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 10, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C010', name: 'Customer 010', email: 'c010@email.com', loyaltyTier: 'Spark', totalSpend: 100, daysInactive: 130, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 15, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C012', name: 'Customer 012', email: 'c012@email.com', loyaltyTier: 'Spark', totalSpend: 90, daysInactive: 110, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 20, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C014', name: 'Customer 014', email: 'c014@email.com', loyaltyTier: 'Spark', totalSpend: 70, daysInactive: 155, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 1, returnRate: 25, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C016', name: 'Customer 016', email: 'c016@email.com', loyaltyTier: 'Spark', totalSpend: 140, daysInactive: 90, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 10, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C018', name: 'Customer 018', email: 'c018@email.com', loyaltyTier: 'Spark', totalSpend: 95, daysInactive: 135, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 15, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C020', name: 'Customer 020', email: 'c020@email.com', loyaltyTier: 'Spark', totalSpend: 85, daysInactive: 165, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 1, returnRate: 25, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C022', name: 'Customer 022', email: 'c022@email.com', loyaltyTier: 'Spark', totalSpend: 130, daysInactive: 100, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 15, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C024', name: 'Customer 024', email: 'c024@email.com', loyaltyTier: 'Spark', totalSpend: 65, daysInactive: 145, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 20, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C026', name: 'Customer 026', email: 'c026@email.com', loyaltyTier: 'Spark', totalSpend: 80, daysInactive: 150, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 1, returnRate: 25, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C028', name: 'Customer 028', email: 'c028@email.com', loyaltyTier: 'Spark', totalSpend: 120, daysInactive: 105, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 15, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C030', name: 'Customer 030', email: 'c030@email.com', loyaltyTier: 'Spark', totalSpend: 95, daysInactive: 138, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 20, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C032', name: 'Customer 032', email: 'c032@email.com', loyaltyTier: 'Spark', totalSpend: 110, daysInactive: 120, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 15, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C034', name: 'Customer 034', email: 'c034@email.com', loyaltyTier: 'Spark', totalSpend: 75, daysInactive: 170, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 1, returnRate: 25, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C036', name: 'Customer 036', email: 'c036@email.com', loyaltyTier: 'Spark', totalSpend: 135, daysInactive: 98, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 15, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C038', name: 'Customer 038', email: 'c038@email.com', loyaltyTier: 'Spark', totalSpend: 90, daysInactive: 148, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 20, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C040', name: 'Customer 040', email: 'c040@email.com', loyaltyTier: 'Spark', totalSpend: 85, daysInactive: 160, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 1, returnRate: 25, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C042', name: 'Customer 042', email: 'c042@email.com', loyaltyTier: 'Spark', totalSpend: 125, daysInactive: 112, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 15, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C044', name: 'Customer 044', email: 'c044@email.com', loyaltyTier: 'Spark', totalSpend: 70, daysInactive: 142, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 20, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C046', name: 'Customer 046', email: 'c046@email.com', loyaltyTier: 'Spark', totalSpend: 105, daysInactive: 125, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 15, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C048', name: 'Customer 048', email: 'c048@email.com', loyaltyTier: 'Spark', totalSpend: 80, daysInactive: 155, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 1, returnRate: 25, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'C050', name: 'Customer 050', email: 'c050@email.com', loyaltyTier: 'Spark', totalSpend: 90, daysInactive: 165, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 1, returnRate: 25, segment: 'D', flaggedForRetention: true, notes: '' },
];

export const customers: AdminCustomer[] = [...retainedCustomers, ...churnCustomers];

// Computed totals from the 50-record dataset
export const datasetTotals = {
  totalCustomers: 50,
  retainedCount: 25,
  churnCount: 25,
  churnCoefficient: 0.50,
  // Revenue by tier (summed from all 50 records)
  revenueWatt: customers.filter(c => c.loyaltyTier === 'Watt').reduce((s, c) => s + c.totalSpend, 0),
  revenueSurge: customers.filter(c => c.loyaltyTier === 'Surge').reduce((s, c) => s + c.totalSpend, 0),
  revenueVolt: customers.filter(c => c.loyaltyTier === 'Volt').reduce((s, c) => s + c.totalSpend, 0),
  revenueSpark: customers.filter(c => c.loyaltyTier === 'Spark').reduce((s, c) => s + c.totalSpend, 0),
  totalRevenue: customers.reduce((s, c) => s + c.totalSpend, 0),
  avgSatisfaction: +(customers.reduce((s, c) => s + c.satisfaction, 0) / customers.length).toFixed(1),
};

export const discountCodes = [
  { code: 'WELCOME10', type: 'Percentage', value: '10% off', usage: '47/∞', expires: 'Never', status: 'Active' as const },
  { code: 'SPARK20', type: 'Percentage', value: '20% off', usage: '12/50', expires: '31 Mar 2026', status: 'Active' as const },
  { code: 'COMEBACK20', type: 'Percentage', value: '20% off', usage: '0/25', expires: '31 Mar 2026', status: 'Active (Retention)' as const },
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
  type: 'churn' | 'campaign' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

export const adminNotifications: AdminNotification[] = [
  { id: 'n1', type: 'churn', title: 'Churn Alert', message: 'C004 has been inactive for 140 days — flagged as high risk', time: '1 hr ago', read: false, link: '/admin/churn-risk' },
  { id: 'n2', type: 'campaign', title: 'Campaign Update', message: 'Churn Re-engagement Campaign: 10 of 25 emails opened', time: '2 hrs ago', read: false, link: '/admin/email-campaigns' },
  { id: 'n3', type: 'churn', title: 'Churn Alert', message: 'C006 satisfaction score dropped to 1/5', time: '3 hrs ago', read: false, link: '/admin/churn-risk' },
  { id: 'n4', type: 'system', title: 'System', message: 'CART model recalculated — 25 customers flagged as at-risk (Spark tier)', time: '5 hrs ago', read: true, link: '/admin/analytics' },
  { id: 'n5', type: 'campaign', title: 'Discount Used', message: 'COMEBACK20 code redeemed by C008 (first use)', time: '1 day ago', read: true, link: '/admin/discounts' },
  { id: 'n6', type: 'system', title: 'System', message: 'Social media links updated across all platforms', time: '2 days ago', read: true, link: '/admin/social' },
];
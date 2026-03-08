// ─── Admin Portal Static Dataset ───
// 50-record CART churn prediction dataset: 25 retain, 25 churn

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

// 25 retained customers
const retainedCustomers: AdminCustomer[] = [
  { id: 'WYW001', name: 'Customer 001', email: 'c001@email.com', loyaltyTier: 'Volt', totalSpend: 847, daysInactive: 14, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 4, returnRate: 0, ordersLast6M: 3, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'WYW002', name: 'Customer 002', email: 'c002@email.com', loyaltyTier: 'Surge', totalSpend: 1240, daysInactive: 22, churnRisk: 'Low', emailEngaged: true, consultations: 2, satisfaction: 5, returnRate: 5, ordersLast6M: 5, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW003', name: 'Customer 003', email: 'c003@email.com', loyaltyTier: 'Volt', totalSpend: 695, daysInactive: 31, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 4, returnRate: 10, ordersLast6M: 2, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'WYW004', name: 'Customer 004', email: 'c004@email.com', loyaltyTier: 'Surge', totalSpend: 2100, daysInactive: 18, churnRisk: 'Low', emailEngaged: true, consultations: 3, satisfaction: 5, returnRate: 3, ordersLast6M: 7, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW005', name: 'Customer 005', email: 'c005@email.com', loyaltyTier: 'Volt', totalSpend: 520, daysInactive: 45, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 3, returnRate: 12, ordersLast6M: 2, segment: 'C', flaggedForRetention: false, notes: '' },
  { id: 'WYW006', name: 'Customer 006', email: 'c006@email.com', loyaltyTier: 'Watt', totalSpend: 4850, daysInactive: 12, churnRisk: 'Low', emailEngaged: true, consultations: 5, satisfaction: 5, returnRate: 2, ordersLast6M: 10, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW007', name: 'Customer 007', email: 'c007@email.com', loyaltyTier: 'Volt', totalSpend: 610, daysInactive: 28, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 4, returnRate: 8, ordersLast6M: 3, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'WYW008', name: 'Customer 008', email: 'c008@email.com', loyaltyTier: 'Spark', totalSpend: 385, daysInactive: 55, churnRisk: 'Medium', emailEngaged: false, consultations: 0, satisfaction: 3, returnRate: 18, ordersLast6M: 1, segment: 'C', flaggedForRetention: false, notes: '' },
  { id: 'WYW009', name: 'Customer 009', email: 'c009@email.com', loyaltyTier: 'Volt', totalSpend: 760, daysInactive: 38, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 4, returnRate: 5, ordersLast6M: 3, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'WYW010', name: 'Customer 010', email: 'c010@email.com', loyaltyTier: 'Surge', totalSpend: 3200, daysInactive: 9, churnRisk: 'Low', emailEngaged: true, consultations: 4, satisfaction: 5, returnRate: 1, ordersLast6M: 8, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW016', name: 'Customer 016', email: 'c016@email.com', loyaltyTier: 'Watt', totalSpend: 5200, daysInactive: 7, churnRisk: 'Low', emailEngaged: true, consultations: 6, satisfaction: 5, returnRate: 1, ordersLast6M: 12, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW017', name: 'Customer 017', email: 'c017@email.com', loyaltyTier: 'Surge', totalSpend: 1580, daysInactive: 15, churnRisk: 'Low', emailEngaged: true, consultations: 2, satisfaction: 4, returnRate: 4, ordersLast6M: 6, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW018', name: 'Customer 018', email: 'c018@email.com', loyaltyTier: 'Volt', totalSpend: 720, daysInactive: 20, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 4, returnRate: 7, ordersLast6M: 3, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'WYW019', name: 'Customer 019', email: 'c019@email.com', loyaltyTier: 'Surge', totalSpend: 2850, daysInactive: 11, churnRisk: 'Low', emailEngaged: true, consultations: 3, satisfaction: 5, returnRate: 2, ordersLast6M: 9, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW020', name: 'Customer 020', email: 'c020@email.com', loyaltyTier: 'Volt', totalSpend: 580, daysInactive: 33, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 4, returnRate: 9, ordersLast6M: 2, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'WYW021', name: 'Customer 021', email: 'c021@email.com', loyaltyTier: 'Watt', totalSpend: 4100, daysInactive: 5, churnRisk: 'Low', emailEngaged: true, consultations: 4, satisfaction: 5, returnRate: 3, ordersLast6M: 11, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW022', name: 'Customer 022', email: 'c022@email.com', loyaltyTier: 'Volt', totalSpend: 650, daysInactive: 25, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 4, returnRate: 6, ordersLast6M: 3, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'WYW023', name: 'Customer 023', email: 'c023@email.com', loyaltyTier: 'Surge', totalSpend: 1920, daysInactive: 13, churnRisk: 'Low', emailEngaged: true, consultations: 2, satisfaction: 5, returnRate: 4, ordersLast6M: 7, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW024', name: 'Customer 024', email: 'c024@email.com', loyaltyTier: 'Volt', totalSpend: 810, daysInactive: 19, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 4, returnRate: 5, ordersLast6M: 4, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'WYW025', name: 'Customer 025', email: 'c025@email.com', loyaltyTier: 'Surge', totalSpend: 1450, daysInactive: 16, churnRisk: 'Low', emailEngaged: true, consultations: 2, satisfaction: 4, returnRate: 3, ordersLast6M: 5, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW041', name: 'Customer 041', email: 'c041@email.com', loyaltyTier: 'Watt', totalSpend: 3800, daysInactive: 8, churnRisk: 'Low', emailEngaged: true, consultations: 3, satisfaction: 5, returnRate: 2, ordersLast6M: 9, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW042', name: 'Customer 042', email: 'c042@email.com', loyaltyTier: 'Volt', totalSpend: 590, daysInactive: 30, churnRisk: 'Low', emailEngaged: true, consultations: 0, satisfaction: 4, returnRate: 8, ordersLast6M: 2, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'WYW043', name: 'Customer 043', email: 'c043@email.com', loyaltyTier: 'Surge', totalSpend: 2300, daysInactive: 10, churnRisk: 'Low', emailEngaged: true, consultations: 3, satisfaction: 5, returnRate: 2, ordersLast6M: 8, segment: 'A', flaggedForRetention: false, notes: '' },
  { id: 'WYW044', name: 'Customer 044', email: 'c044@email.com', loyaltyTier: 'Volt', totalSpend: 730, daysInactive: 22, churnRisk: 'Low', emailEngaged: true, consultations: 1, satisfaction: 4, returnRate: 6, ordersLast6M: 3, segment: 'B', flaggedForRetention: false, notes: '' },
  { id: 'WYW045', name: 'Customer 045', email: 'c045@email.com', loyaltyTier: 'Watt', totalSpend: 4500, daysInactive: 6, churnRisk: 'Low', emailEngaged: true, consultations: 5, satisfaction: 5, returnRate: 1, ordersLast6M: 10, segment: 'A', flaggedForRetention: false, notes: '' },
];

// 25 churn-risk customers (Total Spend < £500, Spark tier, email disengaged)
const churnCustomers: AdminCustomer[] = [
  { id: 'WYW011', name: 'Customer 011', email: 'c011@email.com', loyaltyTier: 'Spark', totalSpend: 185, daysInactive: 112, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 35, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW012', name: 'Customer 012', email: 'c012@email.com', loyaltyTier: 'Spark', totalSpend: 240, daysInactive: 95, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 30, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW013', name: 'Customer 013', email: 'c013@email.com', loyaltyTier: 'Spark', totalSpend: 310, daysInactive: 78, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 3, returnRate: 28, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW014', name: 'Customer 014', email: 'c014@email.com', loyaltyTier: 'Spark', totalSpend: 420, daysInactive: 88, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 25, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW015', name: 'Customer 015', email: 'c015@email.com', loyaltyTier: 'Spark', totalSpend: 465, daysInactive: 67, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 3, returnRate: 22, ordersLast6M: 2, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW026', name: 'Customer 026', email: 'c026@email.com', loyaltyTier: 'Spark', totalSpend: 195, daysInactive: 105, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 33, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW027', name: 'Customer 027', email: 'c027@email.com', loyaltyTier: 'Spark', totalSpend: 280, daysInactive: 91, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 29, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW028', name: 'Customer 028', email: 'c028@email.com', loyaltyTier: 'Spark', totalSpend: 350, daysInactive: 82, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 3, returnRate: 26, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW029', name: 'Customer 029', email: 'c029@email.com', loyaltyTier: 'Spark', totalSpend: 210, daysInactive: 99, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 31, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW030', name: 'Customer 030', email: 'c030@email.com', loyaltyTier: 'Spark', totalSpend: 475, daysInactive: 72, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 3, returnRate: 20, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW031', name: 'Customer 031', email: 'c031@email.com', loyaltyTier: 'Spark', totalSpend: 160, daysInactive: 118, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 1, returnRate: 38, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW032', name: 'Customer 032', email: 'c032@email.com', loyaltyTier: 'Spark', totalSpend: 325, daysInactive: 85, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 27, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW033', name: 'Customer 033', email: 'c033@email.com', loyaltyTier: 'Spark', totalSpend: 440, daysInactive: 74, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 3, returnRate: 24, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW034', name: 'Customer 034', email: 'c034@email.com', loyaltyTier: 'Spark', totalSpend: 175, daysInactive: 110, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 36, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW035', name: 'Customer 035', email: 'c035@email.com', loyaltyTier: 'Spark', totalSpend: 290, daysInactive: 89, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 30, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW036', name: 'Customer 036', email: 'c036@email.com', loyaltyTier: 'Spark', totalSpend: 380, daysInactive: 76, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 3, returnRate: 23, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW037', name: 'Customer 037', email: 'c037@email.com', loyaltyTier: 'Spark', totalSpend: 225, daysInactive: 97, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 32, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW038', name: 'Customer 038', email: 'c038@email.com', loyaltyTier: 'Spark', totalSpend: 490, daysInactive: 69, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 3, returnRate: 21, ordersLast6M: 2, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW039', name: 'Customer 039', email: 'c039@email.com', loyaltyTier: 'Spark', totalSpend: 150, daysInactive: 120, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 1, returnRate: 40, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW040', name: 'Customer 040', email: 'c040@email.com', loyaltyTier: 'Spark', totalSpend: 340, daysInactive: 83, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 28, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW046', name: 'Customer 046', email: 'c046@email.com', loyaltyTier: 'Spark', totalSpend: 200, daysInactive: 102, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 34, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW047', name: 'Customer 047', email: 'c047@email.com', loyaltyTier: 'Spark', totalSpend: 260, daysInactive: 93, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 2, returnRate: 31, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW048', name: 'Customer 048', email: 'c048@email.com', loyaltyTier: 'Spark', totalSpend: 370, daysInactive: 79, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 3, returnRate: 25, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW049', name: 'Customer 049', email: 'c049@email.com', loyaltyTier: 'Spark', totalSpend: 410, daysInactive: 71, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 3, returnRate: 22, ordersLast6M: 1, segment: 'D', flaggedForRetention: true, notes: '' },
  { id: 'WYW050', name: 'Customer 050', email: 'c050@email.com', loyaltyTier: 'Spark', totalSpend: 455, daysInactive: 68, churnRisk: 'High', emailEngaged: false, consultations: 0, satisfaction: 3, returnRate: 20, ordersLast6M: 2, segment: 'D', flaggedForRetention: true, notes: '' },
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
  { id: 'n1', type: 'churn', title: 'Churn Alert', message: 'Customer 015 has been inactive for 67 days — flagged as high risk', time: '1 hr ago', read: false, link: '/admin/churn-risk' },
  { id: 'n2', type: 'campaign', title: 'Campaign Update', message: 'Churn Re-engagement Campaign: 10 of 25 emails opened', time: '2 hrs ago', read: false, link: '/admin/email-campaigns' },
  { id: 'n3', type: 'churn', title: 'Churn Alert', message: 'Customer 014 satisfaction score dropped to 2/5', time: '3 hrs ago', read: false, link: '/admin/churn-risk' },
  { id: 'n4', type: 'system', title: 'System', message: 'CART model recalculated — 25 customers flagged as at-risk', time: '5 hrs ago', read: true, link: '/admin/analytics' },
  { id: 'n5', type: 'campaign', title: 'Discount Used', message: 'COMEBACK20 code redeemed by Customer 012 (first use)', time: '1 day ago', read: true, link: '/admin/discounts' },
  { id: 'n6', type: 'system', title: 'System', message: 'Social media links updated across all platforms', time: '2 days ago', read: true, link: '/admin/social' },
];

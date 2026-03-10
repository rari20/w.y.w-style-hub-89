// ─── Admin Portal Static Dataset ───

export const ADMIN_EMAIL = 'admin@wyw-demo.com';

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  loyaltyTier: 'Spark' | 'Volt' | 'Surge' | 'Watt';
  totalSpend: number;
  joinDate: string;
  notes: string;
}

const allCustomers: AdminCustomer[] = [
  { id: 'C001', name: 'Customer 001', email: 'c001@email.com', loyaltyTier: 'Surge', totalSpend: 480, joinDate: '12 Jan 2025', notes: '' },
  { id: 'C002', name: 'Customer 002', email: 'c002@email.com', loyaltyTier: 'Spark', totalSpend: 120, joinDate: '03 Feb 2025', notes: '' },
  { id: 'C003', name: 'Customer 003', email: 'c003@email.com', loyaltyTier: 'Volt', totalSpend: 260, joinDate: '15 Mar 2025', notes: '' },
  { id: 'C004', name: 'Customer 004', email: 'c004@email.com', loyaltyTier: 'Spark', totalSpend: 60, joinDate: '22 Apr 2025', notes: '' },
  { id: 'C005', name: 'Customer 005', email: 'c005@email.com', loyaltyTier: 'Surge', totalSpend: 520, joinDate: '01 May 2025', notes: '' },
  { id: 'C006', name: 'Customer 006', email: 'c006@email.com', loyaltyTier: 'Spark', totalSpend: 80, joinDate: '18 Jun 2025', notes: '' },
  { id: 'C007', name: 'Customer 007', email: 'c007@email.com', loyaltyTier: 'Volt', totalSpend: 390, joinDate: '29 Jul 2025', notes: '' },
  { id: 'C008', name: 'Customer 008', email: 'c008@email.com', loyaltyTier: 'Spark', totalSpend: 150, joinDate: '05 Aug 2025', notes: '' },
  { id: 'C009', name: 'Customer 009', email: 'c009@email.com', loyaltyTier: 'Watt', totalSpend: 610, joinDate: '14 Sep 2025', notes: '' },
  { id: 'C010', name: 'Customer 010', email: 'c010@email.com', loyaltyTier: 'Spark', totalSpend: 100, joinDate: '20 Oct 2025', notes: '' },
  { id: 'C011', name: 'Customer 011', email: 'c011@email.com', loyaltyTier: 'Surge', totalSpend: 450, joinDate: '02 Nov 2025', notes: '' },
  { id: 'C012', name: 'Customer 012', email: 'c012@email.com', loyaltyTier: 'Spark', totalSpend: 90, joinDate: '11 Dec 2025', notes: '' },
  { id: 'C013', name: 'Customer 013', email: 'c013@email.com', loyaltyTier: 'Volt', totalSpend: 340, joinDate: '08 Jan 2025', notes: '' },
  { id: 'C014', name: 'Customer 014', email: 'c014@email.com', loyaltyTier: 'Spark', totalSpend: 70, joinDate: '19 Feb 2025', notes: '' },
  { id: 'C015', name: 'Customer 015', email: 'c015@email.com', loyaltyTier: 'Watt', totalSpend: 700, joinDate: '25 Mar 2025', notes: '' },
  { id: 'C016', name: 'Customer 016', email: 'c016@email.com', loyaltyTier: 'Spark', totalSpend: 140, joinDate: '04 Apr 2025', notes: '' },
  { id: 'C017', name: 'Customer 017', email: 'c017@email.com', loyaltyTier: 'Volt', totalSpend: 320, joinDate: '17 May 2025', notes: '' },
  { id: 'C018', name: 'Customer 018', email: 'c018@email.com', loyaltyTier: 'Spark', totalSpend: 95, joinDate: '28 Jun 2025', notes: '' },
  { id: 'C019', name: 'Customer 019', email: 'c019@email.com', loyaltyTier: 'Surge', totalSpend: 510, joinDate: '09 Jul 2025', notes: '' },
  { id: 'C020', name: 'Customer 020', email: 'c020@email.com', loyaltyTier: 'Spark', totalSpend: 85, joinDate: '16 Aug 2025', notes: '' },
  { id: 'C021', name: 'Customer 021', email: 'c021@email.com', loyaltyTier: 'Surge', totalSpend: 460, joinDate: '23 Sep 2025', notes: '' },
  { id: 'C022', name: 'Customer 022', email: 'c022@email.com', loyaltyTier: 'Spark', totalSpend: 130, joinDate: '01 Oct 2025', notes: '' },
  { id: 'C023', name: 'Customer 023', email: 'c023@email.com', loyaltyTier: 'Volt', totalSpend: 280, joinDate: '10 Nov 2025', notes: '' },
  { id: 'C024', name: 'Customer 024', email: 'c024@email.com', loyaltyTier: 'Spark', totalSpend: 65, joinDate: '18 Dec 2025', notes: '' },
  { id: 'C025', name: 'Customer 025', email: 'c025@email.com', loyaltyTier: 'Surge', totalSpend: 530, joinDate: '05 Jan 2026', notes: '' },
  { id: 'C026', name: 'Customer 026', email: 'c026@email.com', loyaltyTier: 'Spark', totalSpend: 80, joinDate: '14 Jan 2026', notes: '' },
  { id: 'C027', name: 'Customer 027', email: 'c027@email.com', loyaltyTier: 'Volt', totalSpend: 350, joinDate: '22 Jan 2026', notes: '' },
  { id: 'C028', name: 'Customer 028', email: 'c028@email.com', loyaltyTier: 'Spark', totalSpend: 120, joinDate: '30 Jan 2026', notes: '' },
  { id: 'C029', name: 'Customer 029', email: 'c029@email.com', loyaltyTier: 'Watt', totalSpend: 620, joinDate: '07 Feb 2026', notes: '' },
  { id: 'C030', name: 'Customer 030', email: 'c030@email.com', loyaltyTier: 'Spark', totalSpend: 95, joinDate: '14 Feb 2026', notes: '' },
  { id: 'C031', name: 'Customer 031', email: 'c031@email.com', loyaltyTier: 'Surge', totalSpend: 410, joinDate: '20 Feb 2026', notes: '' },
  { id: 'C032', name: 'Customer 032', email: 'c032@email.com', loyaltyTier: 'Spark', totalSpend: 110, joinDate: '25 Feb 2026', notes: '' },
  { id: 'C033', name: 'Customer 033', email: 'c033@email.com', loyaltyTier: 'Volt', totalSpend: 290, joinDate: '01 Mar 2026', notes: '' },
  { id: 'C034', name: 'Customer 034', email: 'c034@email.com', loyaltyTier: 'Spark', totalSpend: 75, joinDate: '03 Mar 2026', notes: '' },
  { id: 'C035', name: 'Customer 035', email: 'c035@email.com', loyaltyTier: 'Watt', totalSpend: 680, joinDate: '05 Mar 2026', notes: '' },
  { id: 'C036', name: 'Customer 036', email: 'c036@email.com', loyaltyTier: 'Spark', totalSpend: 135, joinDate: '06 Mar 2026', notes: '' },
  { id: 'C037', name: 'Customer 037', email: 'c037@email.com', loyaltyTier: 'Volt', totalSpend: 360, joinDate: '07 Mar 2026', notes: '' },
  { id: 'C038', name: 'Customer 038', email: 'c038@email.com', loyaltyTier: 'Spark', totalSpend: 90, joinDate: '07 Mar 2026', notes: '' },
  { id: 'C039', name: 'Customer 039', email: 'c039@email.com', loyaltyTier: 'Surge', totalSpend: 540, joinDate: '08 Mar 2026', notes: '' },
  { id: 'C040', name: 'Customer 040', email: 'c040@email.com', loyaltyTier: 'Spark', totalSpend: 85, joinDate: '08 Mar 2026', notes: '' },
  { id: 'C041', name: 'Customer 041', email: 'c041@email.com', loyaltyTier: 'Surge', totalSpend: 470, joinDate: '09 Mar 2026', notes: '' },
  { id: 'C042', name: 'Customer 042', email: 'c042@email.com', loyaltyTier: 'Spark', totalSpend: 125, joinDate: '09 Mar 2026', notes: '' },
  { id: 'C043', name: 'Customer 043', email: 'c043@email.com', loyaltyTier: 'Volt', totalSpend: 310, joinDate: '09 Mar 2026', notes: '' },
  { id: 'C044', name: 'Customer 044', email: 'c044@email.com', loyaltyTier: 'Spark', totalSpend: 70, joinDate: '10 Mar 2026', notes: '' },
  { id: 'C045', name: 'Customer 045', email: 'c045@email.com', loyaltyTier: 'Watt', totalSpend: 650, joinDate: '10 Mar 2026', notes: '' },
  { id: 'C046', name: 'Customer 046', email: 'c046@email.com', loyaltyTier: 'Spark', totalSpend: 105, joinDate: '10 Mar 2026', notes: '' },
  { id: 'C047', name: 'Customer 047', email: 'c047@email.com', loyaltyTier: 'Volt', totalSpend: 370, joinDate: '10 Mar 2026', notes: '' },
  { id: 'C048', name: 'Customer 048', email: 'c048@email.com', loyaltyTier: 'Spark', totalSpend: 80, joinDate: '10 Mar 2026', notes: '' },
  { id: 'C049', name: 'Customer 049', email: 'c049@email.com', loyaltyTier: 'Surge', totalSpend: 500, joinDate: '10 Mar 2026', notes: '' },
  { id: 'C050', name: 'Customer 050', email: 'c050@email.com', loyaltyTier: 'Spark', totalSpend: 90, joinDate: '10 Mar 2026', notes: '' },
];

export const customers: AdminCustomer[] = allCustomers;

// Computed totals
export const datasetTotals = {
  totalCustomers: 50,
  revenueWatt: customers.filter(c => c.loyaltyTier === 'Watt').reduce((s, c) => s + c.totalSpend, 0),
  revenueSurge: customers.filter(c => c.loyaltyTier === 'Surge').reduce((s, c) => s + c.totalSpend, 0),
  revenueVolt: customers.filter(c => c.loyaltyTier === 'Volt').reduce((s, c) => s + c.totalSpend, 0),
  revenueSpark: customers.filter(c => c.loyaltyTier === 'Spark').reduce((s, c) => s + c.totalSpend, 0),
  totalRevenue: customers.reduce((s, c) => s + c.totalSpend, 0),
};

export const discountCodes = [
  { code: 'WELCOME10', type: 'Percentage', value: '10% off', usage: '47/∞', expires: 'Never', status: 'Active' as const },
  { code: 'SPARK20', type: 'Percentage', value: '20% off', usage: '12/50', expires: '31 Mar 2026', status: 'Active' as const },
  { code: 'FREESHIP30', type: 'Free Delivery', value: 'Free', usage: '8/100', expires: '30 Apr 2026', status: 'Active' as const },
  { code: 'VOLT15', type: 'Percentage', value: '15% off', usage: '3/20', expires: '15 Apr 2026', status: 'Active' as const },
  { code: 'SPRING25', type: 'Percentage', value: '25% off', usage: '0/30', expires: '30 Apr 2026', status: 'Active' as const },
];

export const tierColors: Record<string, string> = {
  Watt: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  Surge: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
  Volt: 'bg-orange-500/20 text-orange-700 dark:text-orange-400',
  Spark: 'bg-muted text-muted-foreground',
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
  "New season, new silhouettes. Discover the Spring 2026 edit from Lumenwear, Voltex Studio, ArcThread & KiloKouture. Shop now at W.Y.W. #PowerYourStyle #NewIn #WYW [link]",
  "W.Y.W Rewards members get more. From free delivery at Volt tier to your own personal stylist at Watt — every purchase powers your next level. Join free at [link] #WYWRewards #LoyaltyPerks",
  "Four brands. One destination. Shop the edit now at W.Y.W. #PowerYourStyle #WYW [link]",
];

// ─── Admin Notifications ───
export interface AdminNotification {
  id: string;
  type: 'order' | 'campaign' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

export const adminNotifications: AdminNotification[] = [
  { id: 'n1', type: 'order', title: 'New Order', message: 'New order #WYW-2026-0089 placed by C012', time: '30 mins ago', read: false, link: '/admin/orders' },
  { id: 'n2', type: 'system', title: 'Return Request', message: 'Return request submitted for order #WYW-2026-0071', time: '2 hrs ago', read: false, link: '/admin/returns' },
  { id: 'n3', type: 'campaign', title: 'Discount Used', message: 'WELCOME10 discount code used 3 times today', time: '3 hrs ago', read: false, link: '/admin/discounts' },
  { id: 'n4', type: 'system', title: 'New Customer', message: 'New customer account created', time: '5 hrs ago', read: true },
  { id: 'n5', type: 'system', title: 'Low Stock', message: 'Low stock alert: Ethereal Silk Blouse (Size S) — 2 remaining', time: '1 day ago', read: true, link: '/admin/inventory' },
];

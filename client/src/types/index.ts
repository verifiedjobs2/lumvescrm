// User types
export type UserRole = 'agent' | 'manager' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Customer types
export type CustomerSource = 'website' | 'direct_call' | 'referral' | 'other';
export type CustomerStatus = 'new' | 'active' | 'converted' | 'inactive';

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  state: string;
  source: CustomerSource;
  status: CustomerStatus;
  created_by: number;
  last_contacted?: string;
  created_at: string;
}

// Product types
export type ProductCategory = 'smartphones' | 'laptops' | 'tvs' | 'kitchen_appliances' | 'home_electronics';

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  sku?: string;
  price: number;
  stock_quantity: number;
  image_url?: string;
  is_active: boolean;
  created_at: string;
}

// Call types
export type CallOutcome = 'interested' | 'not_interested' | 'callback' | 'converted' | 'no_answer';

export interface Call {
  id: number;
  customer_id: number;
  agent_id: number;
  call_date: string;
  duration_minutes?: number;
  outcome: CallOutcome;
  notes?: string;
  created_at: string;
  customer?: Customer;
  agent?: User;
  products?: Product[];
}

// Lead types
export type LeadStatus = 'new' | 'contacted' | 'interested' | 'followup_scheduled' | 'converted' | 'lost';
export type InterestLevel = 'hot' | 'warm' | 'cold';

export interface Lead {
  id: number;
  customer_id: number;
  agent_id: number;
  status: LeadStatus;
  interest_level: InterestLevel;
  created_at: string;
  updated_at: string;
  customer?: Customer;
  agent?: User;
}

// Order types
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'refund';

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  product?: Product;
}

export interface Order {
  id: number;
  customer_id: number;
  agent_id: number;
  total_amount: number;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  order_date: string;
  delivery_date?: string;
  notes?: string;
  created_at: string;
  customer?: Customer;
  agent?: User;
  items?: OrderItem[];
}

// Follow-up types
export type TaskType = 'callback' | 'send_quote' | 'follow_up' | 'demo' | 'other';

export interface FollowUp {
  id: number;
  lead_id: number;
  agent_id: number;
  scheduled_date: string;
  task_type: TaskType;
  completed: boolean;
  completed_at?: string;
  notes?: string;
  created_at: string;
  lead?: Lead;
  agent?: User;
}

// API response types
export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Dashboard stats
export interface AgentStats {
  callsToday: number;
  callsThisWeek: number;
  callsThisMonth: number;
  conversionRate: number;
  pendingFollowUps: number;
  todaysTasks: number;
}

export interface ManagerStats {
  totalAgents: number;
  activeLeads: number;
  ordersThisMonth: number;
  revenueThisMonth: number;
  conversionRate: number;
  topProducts: { name: string; inquiries: number }[];
}

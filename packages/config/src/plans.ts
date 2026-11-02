// PRICING PLANS -- Configuration
// Three customer plans use rupee prices for monthly, 6-month, and 12-month terms.

// ============================================
// Types
// ============================================

export type PlanTier = 'STARTER' | 'GROWTH' | 'BUSINESS' | 'ENTERPRISE';

export function hasUnlimitedContactsAndMessages(tier: string): boolean {
  return tier === 'STARTER' || tier === 'GROWTH' || tier === 'BUSINESS';
}

export interface PlanLimits {
  maxContacts: number;
  maxMessagesPerMonth: number;
  maxPhoneNumbers: number;
  maxTeamMembers: number;
  maxChatbotFlows: number;
  maxCampaigns: number;
  maxSegments: number;
  maxContactsPerCampaign: number;
  maxTemplates: number;
  maxAPIKeys: number;
  maxCampaignsPerDay: number;
  maxMessagesPerMinute: number;
  maxMessagesPerHour: number;
}

export interface PlanFeatures {
  analytics: boolean;
  chatbotBuilder: boolean;
  whatsappFlows: boolean;
  apiAccess: boolean;
  aiChatbot: boolean;
  customBranding: boolean;
  prioritySupport: boolean;
  advancedAnalytics: boolean;
  whiteLabel: boolean;
  dripCampaigns: boolean;
  abTesting: boolean;
  contactImport: boolean;
  bulkExport: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  tier: PlanTier;
  description: string;
  monthlyPriceInr: number;
  sixMonthPriceInr: number;
  twelveMonthPriceInr: number;
  currency: string;
  limits: PlanLimits;
  features: PlanFeatures;
  overage: {
    contacts: number;
    messages: number;
  };
  sortOrder: number;
  isPopular: boolean;
  isPublic: boolean;
  trialDays: number;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  stripePriceIdMonthly?: string;
  stripePriceIdAnnual?: string;
  isPerUnit: boolean;
  unitName?: string;
}

// ============================================
// Pricing Plans
// ============================================

export const PLANS: PricingPlan[] = [
  {
    id: 'plan_starter',
    name: 'Monthly',
    tier: 'STARTER',
    description: 'Perfect for small businesses getting started with WhatsApp automation.',
    monthlyPriceInr: 1800,
    sixMonthPriceInr: 9999,
    twelveMonthPriceInr: 14999,
    currency: 'INR',
    limits: {
      maxContacts: -1,
      maxMessagesPerMonth: -1,
      maxPhoneNumbers: 1,
      maxTeamMembers: 3,
      maxChatbotFlows: 5,
      maxCampaigns: 10,
      maxSegments: 5,
      maxContactsPerCampaign: -1,
      maxTemplates: 10,
      maxAPIKeys: 1,
      maxCampaignsPerDay: 5,
      maxMessagesPerMinute: 10,
      maxMessagesPerHour: 30,
    },
    features: {
      analytics: true,
      chatbotBuilder: true,
      whatsappFlows: true,
      apiAccess: true,
      aiChatbot: true,
      customBranding: false,
      prioritySupport: true,
      advancedAnalytics: true,
      whiteLabel: true,
      dripCampaigns: false,
      abTesting: false,
      contactImport: true,
      bulkExport: true,
    },
    overage: {
      contacts: 0,
      messages: 0,
    },
    sortOrder: 1,
    isPopular: false,
    isPublic: true,
    trialDays: 14,
  },
  {
    id: 'plan_growth',
    name: '6-Month',
    tier: 'GROWTH',
    description: 'For growing teams that need automation and API access.',
    monthlyPriceInr: 1800,
    sixMonthPriceInr: 9999,
    twelveMonthPriceInr: 14999,
    currency: 'INR',
    limits: {
      maxContacts: -1,
      maxMessagesPerMonth: -1,
      maxPhoneNumbers: 1,
      maxTeamMembers: 2,
      maxChatbotFlows: 10,
      maxCampaigns: 50,
      maxSegments: 25,
      maxContactsPerCampaign: -1,
      maxTemplates: 50,
      maxAPIKeys: 5,
      maxCampaignsPerDay: 20,
      maxMessagesPerMinute: 50,
      maxMessagesPerHour: 100,
    },
    features: {
      analytics: true,
      chatbotBuilder: true,
      whatsappFlows: true,
      apiAccess: true,
      aiChatbot: true,
      customBranding: false,
      prioritySupport: true,
      advancedAnalytics: true,
      whiteLabel: false,
      dripCampaigns: false,
      abTesting: false,
      contactImport: true,
      bulkExport: true,
    },
    overage: {
      contacts: 0,
      messages: 0,
    },
    sortOrder: 2,
    isPopular: true,
    isPublic: true,
    trialDays: 14,
  },
  {
    id: 'plan_business',
    name: '12-Month',
    tier: 'BUSINESS',
    description: 'Full-featured with AI chatbot, Flows, and advanced analytics.',
    monthlyPriceInr: 1800,
    sixMonthPriceInr: 9999,
    twelveMonthPriceInr: 14999,
    currency: 'INR',
    limits: {
      maxContacts: -1,
      maxMessagesPerMonth: -1,
      maxPhoneNumbers: 1,
      maxTeamMembers: 3,
      maxChatbotFlows: 50,
      maxCampaigns: 200,
      maxSegments: 100,
      maxContactsPerCampaign: -1,
      maxTemplates: 200,
      maxAPIKeys: 20,
      maxCampaignsPerDay: 100,
      maxMessagesPerMinute: 200,
      maxMessagesPerHour: 500,
    },
    features: {
      analytics: true,
      chatbotBuilder: true,
      whatsappFlows: true,
      apiAccess: true,
      aiChatbot: true,
      customBranding: true,
      prioritySupport: true,
      advancedAnalytics: true,
      whiteLabel: false,
      dripCampaigns: true,
      abTesting: true,
      contactImport: true,
      bulkExport: true,
    },
    overage: {
      contacts: 0,
      messages: 0,
    },
    sortOrder: 3,
    isPopular: false,
    isPublic: true,
    trialDays: 14,
  },
  {
    id: 'plan_enterprise',
    name: 'Enterprise',
    tier: 'ENTERPRISE',
    description: 'Unlimited scale with white-label option and dedicated support.',
    monthlyPriceInr: -1, // Custom pricing
    sixMonthPriceInr: -1,
    twelveMonthPriceInr: -1,
    currency: 'INR',
    limits: {
      maxContacts: -1, // Unlimited
      maxMessagesPerMonth: -1,
      maxPhoneNumbers: -1,
      maxTeamMembers: -1,
      maxChatbotFlows: -1,
      maxCampaigns: -1,
      maxSegments: -1,
      maxContactsPerCampaign: -1,
      maxTemplates: -1,
      maxAPIKeys: -1,
      maxCampaignsPerDay: -1,
      maxMessagesPerMinute: -1,
      maxMessagesPerHour: -1,
    },
    features: {
      analytics: true,
      chatbotBuilder: true,
      whatsappFlows: true,
      apiAccess: true,
      aiChatbot: true,
      customBranding: true,
      prioritySupport: true,
      advancedAnalytics: true,
      whiteLabel: true,
      dripCampaigns: true,
      abTesting: true,
      contactImport: true,
      bulkExport: true,
    },
    overage: {
      contacts: 0,
      messages: 0,
    },
    sortOrder: 4,
    isPopular: false,
    isPublic: true,
    trialDays: 0, // No trial for enterprise
  },
];

// ============================================
// Add-ons
// ============================================

export const ADD_ONS: AddOn[] = [
  {
    id: 'addon_extra_phone',
    name: 'Extra Phone Number',
    description: 'Add an additional WhatsApp Business phone number to your account.',
    monthlyPrice: 15,
    annualPrice: 144,
    isPerUnit: true,
    unitName: 'phone number',
  },
  {
    id: 'addon_extra_contacts',
    name: 'Extra Contacts Pack',
    description: 'Add 1,000 additional contacts to your limit.',
    monthlyPrice: 10,
    annualPrice: 96,
    isPerUnit: true,
    unitName: '1K contacts',
  },
  {
    id: 'addon_extra_messages',
    name: 'Extra Messages Pack',
    description: 'Add 5,000 additional messages per month.',
    monthlyPrice: 15,
    annualPrice: 144,
    isPerUnit: true,
    unitName: '5K messages',
  },
  {
    id: 'addon_ai_chatbot',
    name: 'AI Chatbot',
    description: 'Enable AI-powered chatbot responses using Claude/GPT-4.',
    monthlyPrice: 49,
    annualPrice: 470,
    isPerUnit: false,
  },
  {
    id: 'addon_white_label',
    name: 'White Label',
    description: 'Remove WhatsApp SaaS branding and use your own domain.',
    monthlyPrice: 199,
    annualPrice: 1910,
    isPerUnit: false,
  },
  {
    id: 'addon_priority_support',
    name: 'Priority Support',
    description: 'Get 24/7 priority support with 1-hour response time.',
    monthlyPrice: 99,
    annualPrice: 950,
    isPerUnit: false,
  },
];

// ============================================
// Helper Functions
// ============================================

/**
 * Get a plan by its tier
 */
export function getPlanByTier(tier: string): PricingPlan | undefined {
  return PLANS.find((p) => p.tier === tier);
}

/**
 * Get a plan by its ID
 */
export function getPlanById(id: string): PricingPlan | undefined {
  return PLANS.find((p) => p.id === id);
}

/**
 * Get all public (visible) plans sorted by sortOrder
 */
export function getPublicPlans(): PricingPlan[] {
  return PLANS.filter((p) => p.isPublic).sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Get the most popular plan
 */
export function getPopularPlan(): PricingPlan | undefined {
  return PLANS.find((p) => p.isPopular);
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency = 'INR'): string {
  if (amount === -1) return 'Custom';
  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Get the configured amount for a plan's assigned term.
 */
export function getTermPrice(plan: PricingPlan): number {
  if (plan.tier === 'GROWTH') return plan.sixMonthPriceInr;
  if (plan.tier === 'BUSINESS') return plan.twelveMonthPriceInr;
  return plan.monthlyPriceInr;
}

/**
 * Check if a plan has a specific feature
 */
export function planHasFeature(plan: PricingPlan, feature: keyof PlanFeatures): boolean {
  return plan.features[feature];
}

/**
 * Get plan limit as display string
 */
export function formatLimit(value: number): string {
  if (value === -1) return 'Unlimited';
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
}

/**
 * Compare two plans
 */
export function comparePlans(planA: PricingPlan, planB: PricingPlan): {
  better: 'A' | 'B' | 'SAME';
  differences: string[];
} {
  const differences: string[] = [];

  const monthlyEquivalent = (plan: PricingPlan) => {
    const months = plan.tier === 'GROWTH' ? 6 : plan.tier === 'BUSINESS' ? 12 : 1;
    return getTermPrice(plan) / months;
  };
  if (monthlyEquivalent(planA) < monthlyEquivalent(planB)) {
    differences.push(`${planA.name} is cheaper`);
  } else if (monthlyEquivalent(planA) > monthlyEquivalent(planB)) {
    differences.push(`${planB.name} is cheaper`);
  }

  for (const [key, limitA] of Object.entries(planA.limits)) {
    const limitB = planB.limits[key as keyof PlanLimits];
    if (limitA === -1 && limitB !== -1) {
      differences.push(`${planA.name} has unlimited ${key}`);
    } else if (limitA > limitB) {
      differences.push(`${planA.name} has higher ${key}`);
    }
  }

  const featureKeys = Object.keys(planA.features) as (keyof PlanFeatures)[];
  const extraFeaturesA = featureKeys.filter((f) => planA.features[f] && !planB.features[f]);
  const extraFeaturesB = featureKeys.filter((f) => planB.features[f] && !planA.features[f]);

  if (extraFeaturesA.length > 0) {
    differences.push(`${planA.name} includes: ${extraFeaturesA.join(', ')}`);
  }
  if (extraFeaturesB.length > 0) {
    differences.push(`${planB.name} includes: ${extraFeaturesB.join(', ')}`);
  }

  return {
    better: differences.filter((d) => d.includes(planA.name)).length >
            differences.filter((d) => d.includes(planB.name)).length
      ? 'A'
      : differences.filter((d) => d.includes(planB.name)).length >
        differences.filter((d) => d.includes(planA.name)).length
      ? 'B'
      : 'SAME',
    differences,
  };
}

/**
 * Get the default trial days for a plan
 */
export function getTrialDays(planTier: PlanTier): number {
  const plan = getPlanByTier(planTier);
  return plan?.trialDays ?? 14;
}

/**
 * Calculate overage cost for contacts
 */
export function calculateContactOverage(plan: PricingPlan, extraContacts: number): number {
  if (extraContacts <= 0) return 0;
  return extraContacts * plan.overage.contacts;
}

/**
 * Calculate overage cost for messages
 */
export function calculateMessageOverage(plan: PricingPlan, extraMessages: number): number {
  if (extraMessages <= 0) return 0;
  return extraMessages * plan.overage.messages;
}

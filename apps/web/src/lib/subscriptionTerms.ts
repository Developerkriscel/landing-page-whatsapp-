export type SubscriptionInterval = 'monthly' | 'six_month' | 'annual';

const PLAN_INTERVALS: Record<string, SubscriptionInterval> = {
  STARTER: 'monthly',
  GROWTH: 'six_month',
  BUSINESS: 'annual',
};

export function getPlanInterval(tier: string): SubscriptionInterval {
  return PLAN_INTERVALS[tier.toUpperCase()] || 'monthly';
}

export function getIntervalLabel(interval: SubscriptionInterval): string {
  return interval === 'monthly' ? 'Monthly' : interval === 'six_month' ? '6-Month' : '12-Month';
}

export function getIntervalMonths(interval: SubscriptionInterval): number {
  return interval === 'monthly' ? 1 : interval === 'six_month' ? 6 : 12;
}

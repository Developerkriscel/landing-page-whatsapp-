export const PLAN_GST_RATE_PERCENT = 18;

// Customer-facing credits; the wallet ledger stores each one as 100 units (paise).
export const PLAN_INCLUDED_CREDITS: Record<string, number> = {
  STARTER: 500,
  GROWTH: 3000,
  BUSINESS: 6000,
};
export const LEDGER_UNITS_PER_CREDIT = 100;

export interface PlanPriceQuote {
  baseMinor: number;
  gstMinor: number;
  totalMinor: number;
}

export function quotePlanPriceInr(amountInr: number): PlanPriceQuote {
  // Plan prices are GST-inclusive: the entered amount is what the customer pays.
  const totalMinor = Math.round(amountInr * 100);
  const baseMinor = Math.round((totalMinor * 100) / (100 + PLAN_GST_RATE_PERCENT));
  return { baseMinor, gstMinor: totalMinor - baseMinor, totalMinor };
}

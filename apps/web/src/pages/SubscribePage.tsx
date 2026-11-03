import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { api } from '../api/client';
import { openCashfreeCheckout, openRazorpayCheckout } from '../lib/checkout';
import { getPlanInterval, getIntervalLabel, type SubscriptionInterval } from '../lib/subscriptionTerms';

interface SubscriptionPlan {
  tier: string;
  name: string;
  description?: string;
  monthlyPriceInr: number;
  sixMonthPriceInr: number;
  twelveMonthPriceInr: number;
  monthlyTotalInr?: number;
  sixMonthTotalInr?: number;
  twelveMonthTotalInr?: number;
}

export default function SubscribePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDirectCheckout = searchParams.get('checkout') === '1';
  const autoCheckoutStarted = useRef(false);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [paymentProvider, setPaymentProvider] = useState('stripe');
  const [selectedTier] = useState(() => sessionStorage.getItem('signupSelectedPlan') || 'STARTER');
  const [selectedInterval] = useState<SubscriptionInterval>(() => {
    const savedInterval = sessionStorage.getItem('signupSelectedInterval');
    return savedInterval === 'monthly' || savedInterval === 'six_month' || savedInterval === 'annual'
      ? savedInterval
      : getPlanInterval(sessionStorage.getItem('signupSelectedPlan') || 'STARTER');
  });
  const phone = sessionStorage.getItem('signupPhone') || '';
  const interval = selectedInterval;
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('signupBillingToken')) {
      setMessage('Sign up or enter your account details first to purchase a subscription.');
      setLoadingPlans(false);
      return;
    }

    Promise.all([api.get('/billing/plans'), api.get('/billing')])
      .then(([plansResponse, billingResponse]) => {
        const availablePlans = (plansResponse.data?.data || []).filter((plan: SubscriptionPlan) => ['STARTER', 'GROWTH', 'BUSINESS'].includes(plan.tier));
        setPaymentProvider(billingResponse.data?.data?.paymentProvider || 'stripe');
        setPlans(availablePlans);
        if (!availablePlans.some((plan: SubscriptionPlan) => plan.tier === selectedTier)) {
          setMessage('The plan you selected is currently unavailable. Please return to pricing and choose an available plan.');
        }
      })
      .catch((error) => setMessage(error.response?.data?.error?.message || 'Could not load subscription plans.'))
      .finally(() => setLoadingPlans(false));
  }, []);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const cashfreeOrderId = searchParams.get('cashfree_order_id');
    if (!sessionId && !cashfreeOrderId) return;
    if (!sessionStorage.getItem('signupBillingToken')) {
      setMessage('Payment confirmation expired. Please sign in to continue.');
      return;
    }

    let active = true;
    setCheckingPayment(true);
    const confirmation = sessionId
      ? api.get('/billing/success', { params: { session_id: sessionId } })
      : api.post('/billing/checkout/confirm-cashfree', { orderId: cashfreeOrderId });

    confirmation.then((response) => {
      if (!active) return;
      const data = response.data?.data;
      const paid = sessionId ? data?.reconciled : data?.activated || data?.alreadyConfirmed;
      if (paid) {
        sessionStorage.removeItem('signupBillingToken');
        sessionStorage.removeItem('signupSelectedPlan');
        sessionStorage.removeItem('signupSelectedInterval');
        sessionStorage.removeItem('signupPhone');
        setPaymentComplete(true);
        setMessage('Payment confirmed. You can now sign in to your workspace.');
      } else {
        setMessage(data?.message || data?.reason || 'Payment is still processing. Please try again shortly.');
      }
    }).catch((error) => {
      if (active) setMessage(error.response?.data?.error?.message || 'Could not confirm the payment yet.');
    }).finally(() => {
      if (active) setCheckingPayment(false);
    });

    return () => { active = false; };
  }, [searchParams]);

  const startCheckout = async () => {
    setMessage('');
    const phoneDigits = phone.replace(/\D/g, '').length;
    if (phone && (phoneDigits < 10 || phoneDigits > 15)) {
      setMessage('Enter a valid phone number with 10 to 15 digits, or clear it to continue without one.');
      return;
    }
    setCheckoutLoading(true);
    try {
      if (phone) await api.put('/billing/setup/phone', { phone });
      const response = await api.post('/billing/checkout', { planTier: selectedTier, interval });
      const checkout = response.data?.data;
      if (checkout?.provider === 'razorpay' && checkout?.keyId && checkout?.orderId) {
        const result = await openRazorpayCheckout({
          keyId: checkout.keyId,
          orderId: checkout.orderId,
          amountMinor: checkout.amountMinor,
          currency: checkout.currency,
          description: 'Subscription plan purchase',
          confirmUrl: '/billing/checkout/confirm-razorpay',
        });
        if (result.status === 'credited') {
          sessionStorage.removeItem('signupBillingToken');
          sessionStorage.removeItem('signupSelectedPlan');
          sessionStorage.removeItem('signupSelectedInterval');
          sessionStorage.removeItem('signupPhone');
          setPaymentComplete(true);
          setMessage('Payment confirmed. You can now sign in to your workspace.');
        } else {
          setMessage(result.status === 'dismissed'
            ? 'Checkout was closed. Continue below to try again.'
            : result.message || 'Payment is processing. Try signing in after confirmation.');
        }
      } else if (checkout?.provider === 'cashfree' && checkout?.paymentSessionId) {
        await openCashfreeCheckout(checkout.paymentSessionId, !!checkout.testMode);
      } else if (checkout?.url) {
        window.location.href = checkout.url;
      } else {
        setMessage('The payment provider did not return a checkout session. Please try again.');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error?.message || error.message || 'Could not start checkout.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const selectedPlan = plans.find((plan) => plan.tier === selectedTier);
  const price = selectedPlan
    ? interval === 'monthly' ? selectedPlan.monthlyPriceInr : interval === 'six_month' ? selectedPlan.sixMonthPriceInr : selectedPlan.twelveMonthPriceInr
    : 0;
  const prepaidPrice = selectedPlan
    ? interval === 'monthly' ? selectedPlan.monthlyTotalInr : interval === 'six_month'
      ? selectedPlan.sixMonthTotalInr
      : selectedPlan.twelveMonthTotalInr
    : undefined;
  const priceLabel = paymentProvider === 'cashfree' || paymentProvider === 'razorpay'
    ? typeof prepaidPrice === 'number'
      ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(prepaidPrice)
      : 'Price shown at checkout'
    : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(price);

  useEffect(() => {
    if (
      !isDirectCheckout || autoCheckoutStarted.current || loadingPlans || checkingPayment
      || !sessionStorage.getItem('signupBillingToken') || !selectedPlan
    ) return;

    autoCheckoutStarted.current = true;
    void startCheckout();
  }, [isDirectCheckout, loadingPlans, checkingPayment, selectedPlan]);

  return (
    <main className="min-h-screen bg-ios-background flex items-center justify-center p-4">
      <section className="card-apple w-full max-w-2xl p-6 sm:p-8">
        {paymentComplete ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-apple-green" />
            <h1 className="text-2xl font-bold text-ios-dark">Subscription active</h1>
            <p className="mt-2 text-ios-secondary">{message}</p>
            <button onClick={() => navigate('/login')} className="mt-6 rounded-xl bg-wa-green px-6 py-3 font-semibold text-white">
              Go to Login
            </button>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-ios-dark">{isDirectCheckout ? 'Opening secure checkout' : 'Complete your subscription'}</h1>
              {!isDirectCheckout && <p className="mt-2 text-ios-secondary">Your pricing page selection is ready. Complete payment to activate your workspace.</p>}
            </div>

            {loadingPlans || checkingPayment || (isDirectCheckout && checkoutLoading) ? (
              <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-wa-green" /></div>
            ) : !sessionStorage.getItem('signupBillingToken') ? (
              <div className="mt-6 text-center">
                {message && <p className="text-sm text-ios-secondary">{message}</p>}
                <Link to="/login" className="mt-4 inline-block rounded-xl bg-wa-green px-6 py-3 font-semibold text-white">Go to Login</Link>
              </div>
            ) : isDirectCheckout ? (
              <div className="mt-5 text-center">
                {message && <p role="status" className="rounded-xl bg-apple-orange/10 p-3 text-sm text-ios-dark">{message}</p>}
                <button
                  type="button"
                  onClick={() => { autoCheckoutStarted.current = false; void startCheckout(); }}
                  disabled={!selectedPlan || checkoutLoading}
                  className="mt-5 w-full rounded-xl bg-wa-green px-6 py-3 font-semibold text-white disabled:opacity-50"
                >
                  {checkoutLoading ? 'Opening secure checkout…' : 'Continue to payment'}
                </button>
              </div>
            ) : (
              <>
                <div className="mt-5 rounded-2xl border border-wa-green/20 bg-wa-green/5 p-5 text-center">
                  <p className="text-lg font-semibold text-ios-dark">{getIntervalLabel(interval)} plan</p>
                  <p className="mt-1 text-sm text-ios-secondary">{selectedPlan?.description || selectedTier}</p>
                  <span className="mt-3 inline-block rounded-full bg-wa-green/10 px-3 py-1 text-xs font-semibold text-wa-green">
                    {getIntervalLabel(interval)} billing · {priceLabel}
                  </span>
                </div>

                {message && (
                  <div role="status" className="mt-5 flex gap-2 rounded-xl bg-apple-orange/10 p-3 text-sm text-ios-dark">
                    <AlertCircle className="h-5 w-5 shrink-0 text-apple-orange" />
                    <span>{message}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={startCheckout}
                  disabled={!selectedPlan || checkoutLoading || checkingPayment}
                  className="mt-6 w-full rounded-xl bg-wa-green px-6 py-3 font-semibold text-white disabled:opacity-50"
                >
                  {checkoutLoading ? 'Opening secure checkout…' : `Buy subscription · ${priceLabel} / ${interval === 'monthly' ? 'month' : interval === 'six_month' ? '6 months' : '12 months'}`}
                </button>
                <p className="mt-3 text-center text-xs text-ios-muted">Secure payment is processed by your configured payment provider.</p>
              </>
            )}
          </>
        )}
        
      </section>
    </main>
  );
}

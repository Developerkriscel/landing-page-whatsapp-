import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, Coins, Phone, Users,
  Contact2, MessageSquare, ShieldCheck, Code2, BarChart3,
  Workflow, Zap, BrainCircuit, Headphones,
} from 'lucide-react';
import './FeaturesServices.css';
import LandingSpotlight from './LandingSpotlight';
import { getPlanInterval, getIntervalLabel } from '../lib/subscriptionTerms';

interface FeaturePlan {
  tier: string;
  isPublic?: boolean;
  maxPhoneNumbers: number;
  maxTeamMembers: number;
  hasAPI: boolean;
  hasAdvancedAnalytics: boolean;
  hasChatbotBuilder: boolean;
  hasWhatsAppFlows: boolean;
  hasAIChatbot: boolean;
  hasPrioritySupport: boolean;
}

const services = [
  { id: 'credits', label: 'Credits', icon: Coins, category: 'Messaging balance', title: 'Keep your messaging moving.',
    description: 'Manage the balance used for applicable WhatsApp messaging charges, with your usage and top-ups in one place.',
    benefits: ['View your available credit balance and transaction history.', 'Review messaging rates before planning a campaign.', 'Purchase additional credits when your business needs them.'],
    steps: ['Check your balance', 'Review the rates', 'Top up when needed'], note: 'Your subscription and messaging credits are separate. Included credits depend on your plan.', path: '/credits', action: 'Open credits', accent: 'gold' },
  { id: 'numbers', label: 'WhatsApp Phone Numbers', icon: Phone, category: 'Business connection', title: 'Your business number. One connected workspace.',
    description: 'Connect your WhatsApp Business assets and manage the numbers your team uses for customer conversations.',
    benefits: ['Connect through the WhatsApp Business onboarding flow.', 'Review connected numbers and their connection status.', 'Choose the connected sender for your campaigns.'],
    steps: ['Connect your account', 'Review your numbers', 'Choose your sender'], note: 'Number allowances depend on your plan. A connected WhatsApp Business account is required for live messaging.', path: '/whatsapp', action: 'Manage numbers', accent: 'green' },
  { id: 'team', label: 'Team Members', icon: Users, category: 'Team collaboration', title: 'Give every conversation the right team.',
    description: 'Bring your support team into a shared workspace with roles, conversation assignment, and private notes.',
    benefits: ['Manage team members and workspace roles.', 'Assign conversations to an agent or a team.', 'Keep internal context in private conversation notes.'],
    steps: ['Organize your team', 'Assign conversations', 'Collaborate on replies'], note: 'Team member allowances and available actions depend on the selected plan and user role.', path: '/team', action: 'Manage your team', accent: 'purple' },
  { id: 'contacts', label: 'Contacts', icon: Contact2, category: 'Customer organization', title: 'Know the customer behind every chat.',
    description: 'Keep customer details organized and build useful audiences with tags, contact filters, and saved segments.',
    benefits: ['Add contacts individually or import a CSV file.', 'Find customers using search, tags, and filters.', 'Create saved segments for more relevant campaigns.'],
    steps: ['Add your contacts', 'Organize with tags', 'Build an audience'], note: 'Campaign audiences must have the required opt-in consent.', path: '/contacts', action: 'Explore contacts', accent: 'blue' },
  { id: 'messages', label: 'Messages & Inbox', icon: MessageSquare, category: 'Customer conversations', title: 'Bring your customer chats together.',
    description: 'Handle WhatsApp enquiries in a shared inbox so your team can reply with context and keep support organized.',
    benefits: ['Read and reply to customer conversations.', 'Assign, close, or reopen conversations as work progresses.', 'Send approved-template campaigns to eligible contacts.'],
    steps: ['Receive an enquiry', 'Reply as a team', 'Track the conversation'], note: 'WhatsApp reply-window rules and applicable messaging charges still apply.', path: '/conversations', action: 'Open your inbox', accent: 'green' },
  { id: 'verification', label: 'Meta Verification', icon: ShieldCheck, category: 'Account readiness', title: 'Understand your WhatsApp account status.',
    description: 'Review business verification and connected-number information as you prepare your WhatsApp Business account.',
    benefits: ['Find verification information in WhatsApp settings.', 'Review number quality and display-name status.', 'Identify account setup steps that need attention.'],
    steps: ['Connect business assets', 'Review account status', 'Complete required steps'], note: 'Verification and approval decisions are made by Meta. Kriscel WA does not guarantee approval.', path: '/whatsapp', action: 'Review WhatsApp setup', accent: 'blue' },
  { id: 'api', label: 'API Access', icon: Code2, category: 'Business integrations', title: 'Connect your tools to your conversations.',
    description: 'Use workspace API keys to connect supported Kriscel WA operations with your own business systems.',
    benefits: ['Manage API keys from workspace settings.', 'Connect supported customer and messaging workflows.', 'Keep credentials private and revoke unused keys.'],
    steps: ['Create a workspace key', 'Connect your system', 'Manage access'], note: 'API access depends on your plan and role. Keep API keys on your server, away from public pages.', path: '/settings', action: 'Open integration settings', accent: 'purple', flag: 'hasAPI' },
  { id: 'analytics', label: 'Advanced Analytics', icon: BarChart3, category: 'Performance insights', title: 'See how your conversations perform.',
    description: 'Review recorded messaging, campaign, and inbox activity to understand what is happening across your workspace.',
    benefits: ['Explore message and campaign performance over time.', 'Review delivery and conversation activity.', 'Use available filters and report exports.'],
    steps: ['Choose a period', 'Review performance', 'Share your findings'], note: 'Advanced reports depend on your plan. Results reflect events recorded for your workspace.', path: '/analytics', action: 'Explore analytics', accent: 'blue', flag: 'hasAdvancedAnalytics' },
  { id: 'builder', label: 'Visual Chatbot Builder', icon: Workflow, category: 'Conversation workflows', title: 'Build a helpful reply flow, visually.',
    description: 'Arrange conversation steps in a visual builder, from a welcome message to a handoff to your support team.',
    benefits: ['Create greetings, conditions, and keyword responses.', 'Add delays and supported conversation actions.', 'Assign and activate a flow for a connected number.'],
    steps: ['Design the steps', 'Assign your number', 'Activate your flow'], note: 'A flow must be active and assigned correctly before it can respond to live conversations.', path: '/flows', action: 'Open the flow builder', accent: 'purple', flag: 'hasChatbotBuilder' },
  { id: 'flows', label: 'WhatsApp Flows', icon: Zap, category: 'Structured interactions', title: 'Guide customers through the next step.',
    description: 'Use the WhatsApp Flows capability for supported structured customer interactions within your connected WhatsApp setup.',
    benefits: ['Explore the WhatsApp Flows feature included in eligible plans.', 'Plan structured interactions for your customer journey.', 'Contact our team about setup and supported workflows.'],
    steps: ['Choose your use case', 'Review requirements', 'Discuss your setup'], note: 'Availability depends on your plan, connected Meta assets, and the requirements of your chosen flow.', path: '/contact', action: 'Discuss WhatsApp Flows', accent: 'green', flag: 'hasWhatsAppFlows' },
  { id: 'ai', label: 'AI Chatbot', icon: BrainCircuit, category: 'Knowledge-based assistance', title: 'Help customers find useful answers.',
    description: 'Add AI reply steps to your chatbot and connect business knowledge so responses have relevant information to draw on.',
    benefits: ['Prepare a knowledge base with your business information.', 'Add an AI reply step to an eligible chatbot flow.', 'Configure fallback replies and human handoff.'],
    steps: ['Add business knowledge', 'Configure AI replies', 'Keep your team available'], note: 'Requires an eligible plan and a configured AI provider. Responses should be reviewed for accuracy.', path: '/flows', action: 'Explore chatbot flows', accent: 'purple', flag: 'hasAIChatbot' },
  { id: 'support', label: 'Priority Support', icon: Headphones, category: 'Help for your business', title: 'Get help with your next step.',
    description: 'Contact the Kriscel WA team for questions about account setup, plans, and supported product features.',
    benefits: ['Ask questions about getting your workspace connected.', 'Discuss your business requirements with our team.', 'Review priority support availability in your plan.'],
    steps: ['Describe your question', 'Contact our team', 'Review the next steps'], note: 'Priority support depends on your plan. Contact us to confirm service hours and response commitments.', path: '/contact', action: 'Contact our team', accent: 'blue', flag: 'hasPrioritySupport' },
] as const;

export default function FeaturesServices({ plans, workspaceAccess }: { plans: FeaturePlan[]; workspaceAccess: boolean }) {
  const [selectedId, setSelectedId] = useState<string>('credits');
  const railRef = useRef<HTMLDivElement>(null);
  const [scrollEdges, setScrollEdges] = useState({ start: true, end: false });
  const updateScrollEdges = () => {
    const rail = railRef.current;
    if (rail) setScrollEdges({ start: rail.scrollLeft <= 2, end: rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2 });
  };
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new ResizeObserver(updateScrollEdges);
    observer.observe(rail);
    updateScrollEdges();
    return () => observer.disconnect();
  }, []);
  const scrollCards = (direction: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const cardWidth = rail.firstElementChild?.getBoundingClientRect().width || 280;
    rail.scrollBy({ left: direction * (cardWidth + 18), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  const selected = services.find((service) => service.id === selectedId) || services[0];
  const SelectedIcon = selected.icon;
  const availablePlans = plans.filter((plan) => plan.tier !== 'ENTERPRISE' &&
    (!('flag' in selected) || Boolean(plan[selected.flag as keyof FeaturePlan])));
  const actionPath = selected.path === '/contact' ? '/contact' : workspaceAccess ? selected.path : '/register';

  return (
    <section className="feature-services feature-services--orbit" aria-label="Features and services">
      <header className="feature-services__orbit-heading">
        <h2>Use Cases of <span>WhatsApp Automation Software</span></h2>
      </header>
      <div className="feature-services__workspace">
        <div className="feature-services__rail-toolbar">
          <div className="feature-services__arrows">
            <button type="button" aria-label="Scroll features left" aria-controls="feature-services-cards" disabled={scrollEdges.start} onClick={() => scrollCards(-1)}><ArrowLeft size={18} aria-hidden="true" /></button>
            <button type="button" aria-label="Scroll features right" aria-controls="feature-services-cards" disabled={scrollEdges.end} onClick={() => scrollCards(1)}><ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
        <div ref={railRef} id="feature-services-cards" className="feature-services__rail" role="group" aria-label="Choose a feature to explore" tabIndex={0} onScroll={updateScrollEdges}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); scrollCards(event.key === 'ArrowRight' ? 1 : -1); }
            if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); event.currentTarget.scrollTo({ left: event.key === 'Home' ? 0 : event.currentTarget.scrollWidth, behavior: 'auto' }); }
          }}>
          <div className="feature-services__hub" aria-hidden="true">
            <span className="feature-services__hub-orbit" />
            <div className="feature-services__phone">
              <div className="feature-services__phone-speaker" />
              <div className="feature-services__phone-header">
                <span className="feature-services__phone-avatar"><SelectedIcon size={13} strokeWidth={2} /></span>
                <span><strong>Kriscel WA</strong><small>Business Account</small></span>
                <span className="feature-services__phone-menu">•••</span>
              </div>
              <div className="feature-services__phone-product">
                <span className="feature-services__phone-bag">▢</span>
                <span><strong>{selected.label}</strong><small>{selected.category}</small></span>
              </div>
              {selected.benefits.slice(0, 3).map((benefit) => <div key={benefit} className="feature-services__phone-option"><span>{benefit}</span><b>›</b></div>)}
              <div className="feature-services__phone-message">{selected.description}<small>8:17 AM ✓✓</small></div>
            </div>
          </div>
          {services.map((service, index) => (
            <button key={service.id} type="button" className={`feature-services__card feature-services__card--${service.accent} feature-services__orbit-node--${index + 1} ${selected.id === service.id ? 'is-selected' : ''}`}
              aria-pressed={selected.id === service.id} aria-controls="feature-services-detail" onMouseEnter={() => setSelectedId(service.id)} onFocus={() => setSelectedId(service.id)} onClick={(event) => {
                setSelectedId(service.id);
                event.currentTarget.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest', inline: 'nearest' });
              }}>
              <span className="feature-services__card-top"><span className="feature-services__card-icon"><service.icon size={26} strokeWidth={1.7} aria-hidden="true" /></span><span className="feature-services__card-number">{String(index + 1).padStart(2, '0')}</span></span>
              <LandingSpotlight />
              <span className="feature-services__card-category">{service.category}</span>
              <span className="feature-services__card-title">{service.label}</span>
              <span className="feature-services__card-description">{service.description}</span>
              <span className="feature-services__card-footer">{selected.id === service.id ? 'Currently exploring' : 'Explore feature'}{selected.id === service.id ? <Check size={15} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}</span>
            </button>
          ))}
        </div>

        {false && <div id="feature-services-detail" className={`feature-services__detail feature-services__detail--${selected.accent}`} role="region" aria-label={selected.label}>
          <div key={selected.id} className="feature-services__content">
            <div className="feature-services__detail-top"><span className="feature-services__category">{selected.category}</span><span className="feature-services__product">KRISCEL WA</span></div>
            <div className="feature-services__icon"><SelectedIcon size={31} strokeWidth={1.6} aria-hidden="true" /></div>
            <h3>{selected.title}</h3>
            <p className="feature-services__description">{selected.description}</p>
            <ul className="feature-services__benefits">{selected.benefits.map((benefit) => <li key={benefit}><span><Check size={14} strokeWidth={2.5} aria-hidden="true" /></span>{benefit}</li>)}</ul>

            <div className="feature-services__journey" aria-label="How it works">{selected.steps.map((step, index) => <div key={step}><span className="feature-services__step-number">0{index + 1}</span><span>{step}</span>{index < 2 && <ArrowRight size={16} aria-hidden="true" />}</div>)}</div>

            <div className="feature-services__bottom">
              <div className="feature-services__availability"><span>PLAN AVAILABILITY</span><div>{availablePlans.length ? availablePlans.map((plan) => <span key={plan.tier}>{getIntervalLabel(getPlanInterval(plan.tier))}{selected.id === 'numbers' ? ` · ${plan.maxPhoneNumbers === -1 ? 'Unlimited numbers' : `${plan.maxPhoneNumbers} number${plan.maxPhoneNumbers === 1 ? '' : 's'}`}` : selected.id === 'team' ? ` · ${plan.maxTeamMembers === -1 ? 'Unlimited members' : `${plan.maxTeamMembers} members`}` : ''}</span>) : <span>See plan details below</span>}</div></div>
              <Link className="feature-services__action" to={actionPath}>{selected.path === '/contact' || workspaceAccess ? selected.action : 'Get started'}<ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
            <p className="feature-services__note">{selected.note}</p>
          </div>
        </div>}
      </div>
    </section>
  );
}

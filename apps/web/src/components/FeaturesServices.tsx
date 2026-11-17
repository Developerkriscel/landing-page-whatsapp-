import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './FeaturesServices.css';

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

/* =======================================================================
   AUTHENTIC, HIGH-DEFINITION REAL BRAND & FEATURE ICONS (48x48 VIEWBOX)
   ======================================================================= */

// 1. Official WhatsApp 3D/Glossy Icon (Full Fill, Bold Handset)
export function WhatsAppIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wa-grad-hd" cx="30%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#4EED81" />
          <stop offset="55%" stopColor="#25D366" />
          <stop offset="100%" stopColor="#0E8C5A" />
        </radialGradient>
        <linearGradient id="wa-gloss-hd" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="wa-shadow-hd" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#075E54" floodOpacity="0.25" />
        </filter>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#wa-grad-hd)" filter="url(#wa-shadow-hd)" />
      <circle cx="24" cy="24" r="23" fill="url(#wa-gloss-hd)" />
      <path
        fill="#FFFFFF"
        d="M24 9.5C16 9.5 9.5 16 9.5 24c0 2.6.7 5.1 2 7.3L10 38.5l7.5-2c2.1 1.2 4.5 1.8 7 1.8 8 0 14.5-6.5 14.5-14.5S32 9.5 24 9.5zm7.3 20.3c-.3 1-1.8 1.8-2.6 1.9-.8.1-1.7.2-5.4-1.3-4.7-1.9-7.8-6.6-8-6.9-.2-.3-2-2.7-2-5.1 0-2.4 1.3-3.6 1.8-4.1.5-.5 1-.6 1.6-.6.2 0 .4 0 .6.1.4.1.7.2 1 .8.4.8 1.2 2.8 1.3 3 .1.2.2.5.1.7-.1.3-.2.5-.4.8-.2.2-.4.4-.6.7-.2.3-.5.5-.2.9.4.7 1.4 2.3 3 3.7 2 1.8 3.7 2.4 4.3 2.6.4.2.8.2 1.1-.1.4-.4 1.5-1.8 1.9-2.4.3-.6.8-.5 1.3-.3.6.2 3.5 1.7 4.1 2 .6.3 1 .5 1.2.8.1.3.1 1.8-.2 2.7z"
      />
    </svg>
  );
}

// 2. Credits & Balance (Rich 3D Golden Coins)
export function CreditsIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="credits-bg" cx="30%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
        <linearGradient id="coin-gold-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <filter id="coin-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#78350F" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#credits-bg)" filter="url(#coin-sh)" />
      <ellipse cx="29" cy="20" rx="11" ry="11" fill="url(#coin-gold-1)" stroke="#B45309" strokeWidth="1.2" />
      <ellipse cx="29" cy="20" rx="8.5" ry="8.5" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" />
      <text x="29" y="24.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="12" fill="#78350F" textAnchor="middle">₹</text>
      <ellipse cx="19" cy="28" rx="12" ry="12" fill="url(#coin-gold-1)" stroke="#78350F" strokeWidth="1.4" />
      <ellipse cx="19" cy="28" rx="9.5" ry="9.5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
      <text x="19" y="33" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="14" fill="#78350F" textAnchor="middle">$</text>
    </svg>
  );
}

// 3. Official Meta Verification Icon
export function MetaIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="meta-bg-hd" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0081FB" />
          <stop offset="60%" stopColor="#0064E0" />
          <stop offset="100%" stopColor="#004AC6" />
        </linearGradient>
        <filter id="meta-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#00358E" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#meta-bg-hd)" filter="url(#meta-sh)" />
      <path
        fill="#FFFFFF"
        d="M30.4 16.5c-2.6 0-4.9 1.5-6.4 3.7-1.5-2.2-3.8-3.7-6.4-3.7-4.8 0-8.5 3.9-8.5 8.7 0 5.3 4.1 9.6 9.4 9.6 2.9 0 5.2-1.3 6.6-3.3l-1.1-.9c-1.3 1.7-3.2 2.7-5.6 2.7-4.3 0-7.7-3.5-7.7-8.1 0-4 3-7.2 7-7.2 2.3 0 4.2 1.1 5.4 3.1l1.5 2.5 1.5-2.5c1.1-2 3.1-3.1 5.4-3.1 4 0 7 3.2 7 7.2 0 4.6-3.4 8.1-7.7 8.1-2.4 0-4.3-1-5.6-2.7l-1.1.9c1.4 2 3.7 3.3 6.6 3.3 5.3 0 9.4-4.3 9.4-9.6 0-4.8-3.7-8.7-8.5-8.7z"
      />
    </svg>
  );
}

// 4. Modern AI Chatbot / Intelligence Icon
export function AiChatbotIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ai-bg-hd" cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </radialGradient>
        <filter id="ai-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#4C1D95" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#ai-bg-hd)" filter="url(#ai-sh)" />
      <path
        fill="#FFFFFF"
        d="M24 8.5c.5 6.8 5.2 11.5 12 12-6.8.5-11.5 5.2-12 12-.5-6.8-5.2-11.5-12-12 6.8-.5 11.5-5.2 12-12z"
      />
      <circle cx="34.5" cy="13.5" r="3" fill="#F472B6" />
      <circle cx="13.5" cy="34.5" r="2.2" fill="#60A5FA" />
    </svg>
  );
}

// 5. WhatsApp Flows Lightning Icon
export function FlowsIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="flows-bg-hd" cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="60%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064E3B" />
        </radialGradient>
        <filter id="flows-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#064E3B" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#flows-bg-hd)" filter="url(#flows-sh)" />
      <path fill="#FFFFFF" d="M26 9.5l-12.5 15.5h9.5l-3 13.5 14.5-17.5H25l3-11.5z" />
    </svg>
  );
}

// 6. Visual Chatbot Builder Workflow Icon
export function BuilderIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="builder-bg-hd" cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="60%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4C1D95" />
        </radialGradient>
        <filter id="builder-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#4C1D95" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#builder-bg-hd)" filter="url(#builder-sh)" />
      <circle cx="16.5" cy="16.5" r="4.2" fill="#FFFFFF" />
      <circle cx="31.5" cy="16.5" r="4.2" fill="#FFFFFF" />
      <circle cx="24" cy="31.5" r="4.8" fill="#FFFFFF" />
      <path d="M16.5 21v2.5a3.5 3.5 0 003.5 3.5h8a3.5 3.5 0 003.5-3.5V21" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// 7. Advanced Analytics Growth Icon
export function AnalyticsIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="analytics-bg-hd" cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="60%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
        <filter id="analytics-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1E3A8A" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#analytics-bg-hd)" filter="url(#analytics-sh)" />
      <rect x="13" y="24" width="4.5" height="11" rx="1.5" fill="#BFDBFE" />
      <rect x="21.5" y="18" width="4.5" height="17" rx="1.5" fill="#FFFFFF" />
      <rect x="30" y="12" width="4.5" height="23" rx="1.5" fill="#93C5FD" />
      <path d="M13 20l8.5-6 8.5-5 3.5 2" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// 8. REST API & Webhooks Integration Icon
export function ApiIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="api-bg-hd" cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="60%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#115E59" />
        </radialGradient>
        <filter id="api-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#115E59" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#api-bg-hd)" filter="url(#api-sh)" />
      <path d="M18 16l-6.5 8 6.5 8M30 16l6.5 8-6.5 8M27 14l-4 20" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// 9. Team Collaboration Icon
export function TeamIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="team-bg-hd" cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="60%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#581C87" />
        </radialGradient>
        <filter id="team-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#581C87" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#team-bg-hd)" filter="url(#team-sh)" />
      <circle cx="24" cy="18" r="4.5" fill="#FFFFFF" />
      <path d="M15 32c0-4.5 4-7.5 9-7.5s9 3 9 7.5" fill="#FFFFFF" />
      <circle cx="14" cy="20" r="3" fill="#E9D5FF" />
      <path d="M9 31c0-2.8 2.5-4.8 5.5-4.8 1.2 0 2.3.4 3.2 1" stroke="#E9D5FF" strokeWidth="1.8" fill="none" />
      <circle cx="34" cy="20" r="3" fill="#E9D5FF" />
      <path d="M39 31c0-2.8-2.5-4.8-5.5-4.8-1.2 0-2.3.4-3.2 1" stroke="#E9D5FF" strokeWidth="1.8" fill="none" />
    </svg>
  );
}

// 10. Contacts & Audience CRM Icon
export function ContactsIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="contacts-bg-hd" cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="60%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#075985" />
        </radialGradient>
        <filter id="contacts-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#075985" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#contacts-bg-hd)" filter="url(#contacts-sh)" />
      <rect x="14" y="12" width="20" height="24" rx="3.5" fill="#FFFFFF" />
      <circle cx="24" cy="20" r="3.5" fill="#0284C7" />
      <path d="M18 29c.8-2.2 3.2-3 6-3s5.2.8 6 3" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <line x1="11" y1="17" x2="14" y2="17" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="11" y1="23" x2="14" y2="23" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="11" y1="29" x2="14" y2="29" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// 11. WhatsApp Inbox & Live Messages Icon
export function MessagesIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="inbox-bg-hd" cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="60%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </radialGradient>
        <filter id="inbox-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#047857" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#inbox-bg-hd)" filter="url(#inbox-sh)" />
      <path d="M14 22c0-4.8 4.5-8.5 10-8.5s10 3.7 10 8.5-4.5 8.5-10 8.5l-5 2.2 1.2-3.8c-3.7-1.5-6.2-4.2-6.2-6.9z" fill="#FFFFFF" />
      <circle cx="20" cy="22" r="1.8" fill="#10B981" />
      <circle cx="24" cy="22" r="1.8" fill="#10B981" />
      <circle cx="28" cy="22" r="1.8" fill="#10B981" />
    </svg>
  );
}

// 12. 24/7 Priority Support Icon
export function SupportIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="support-bg-hd" cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="60%" stopColor="#DB2777" />
          <stop offset="100%" stopColor="#9D174D" />
        </radialGradient>
        <filter id="support-sh" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#9D174D" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#support-bg-hd)" filter="url(#support-sh)" />
      <path d="M15 23a9 9 0 0118 0v5a3 3 0 01-3 3h-1.5v-6h3V23a7.5 7.5 0 00-15 0v2h3v6H18a3 3 0 01-3-3v-5z" fill="#FFFFFF" />
    </svg>
  );
}

/* =======================================================================
   SERVICES / USE CASES DATA (12 CORE PLATFORM CAPABILITIES)
   ======================================================================= */

const services = [
  {
    id: 'credits',
    label: 'Credits',
    pillLabel: 'Credits',
    icon: CreditsIcon,
    category: 'Messaging balance',
    title: 'Keep your messaging moving.',
    description: 'Manage the balance used for applicable WhatsApp messaging charges, with your usage and top-ups in one place.',
    benefits: ['View your available credit balance and transaction history.', 'Review messaging rates before planning a campaign.', 'Purchase additional credits when your business needs them.'],
    steps: ['Check your balance', 'Review the rates', 'Top up when needed'],
    note: 'Your subscription and messaging credits are separate. Included credits depend on your plan.',
    path: '/credits',
    action: 'Open credits',
    accent: 'gold',
  },
  {
    id: 'numbers',
    label: 'WhatsApp Phone Numbers',
    pillLabel: 'WhatsApp',
    icon: WhatsAppIcon,
    category: 'Business connection',
    title: 'Your business number. One connected workspace.',
    description: 'Connect your WhatsApp Business assets and manage the numbers your team uses for customer conversations.',
    benefits: ['Connect through the WhatsApp Business onboarding flow.', 'Review connected numbers and their connection status.', 'Choose the connected sender for your campaigns.'],
    steps: ['Connect your account', 'Review your numbers', 'Choose your sender'],
    note: 'Number allowances depend on your plan. A connected WhatsApp Business account is required for live messaging.',
    path: '/whatsapp',
    action: 'Manage numbers',
    accent: 'green',
  },
  {
    id: 'team',
    label: 'Team Members',
    pillLabel: 'Team Members',
    icon: TeamIcon,
    category: 'Team collaboration',
    title: 'Give every conversation the right team.',
    description: 'Bring your support team into a shared workspace with roles, conversation assignment, and private notes.',
    benefits: ['Manage team members and workspace roles.', 'Assign conversations to an agent or a team.', 'Keep internal context in private conversation notes.'],
    steps: ['Organize your team', 'Assign conversations', 'Collaborate on replies'],
    note: 'Team member allowances and available actions depend on the selected plan and user role.',
    path: '/team',
    action: 'Manage your team',
    accent: 'purple',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    pillLabel: 'Contacts',
    icon: ContactsIcon,
    category: 'Customer organization',
    title: 'Know the customer behind every chat.',
    description: 'Keep customer details organized and build useful audiences with tags, contact filters, and saved segments.',
    benefits: ['Add contacts individually or import a CSV file.', 'Find customers using search, tags, and filters.', 'Create saved segments for more relevant campaigns.'],
    steps: ['Add your contacts', 'Organize with tags', 'Build an audience'],
    note: 'Campaign audiences must have the required opt-in consent.',
    path: '/contacts',
    action: 'Explore contacts',
    accent: 'blue',
  },
  {
    id: 'messages',
    label: 'Messages & Inbox',
    pillLabel: 'Messages',
    icon: MessagesIcon,
    category: 'Customer conversations',
    title: 'Bring your customer chats together.',
    description: 'Handle WhatsApp enquiries in a shared inbox so your team can reply with context and keep support organized.',
    benefits: ['Read and reply to customer conversations.', 'Assign, close, or reopen conversations as work progresses.', 'Send approved-template campaigns to eligible contacts.'],
    steps: ['Receive an enquiry', 'Reply as a team', 'Track the conversation'],
    note: 'WhatsApp reply-window rules and applicable messaging charges still apply.',
    path: '/conversations',
    action: 'Open your inbox',
    accent: 'green',
  },
  {
    id: 'verification',
    label: 'Meta Verification',
    pillLabel: 'Meta Verified',
    icon: MetaIcon,
    category: 'Account readiness',
    title: 'Understand your WhatsApp account status.',
    description: 'Review business verification and connected-number information as you prepare your WhatsApp Business account.',
    benefits: ['Find verification information in WhatsApp settings.', 'Review number quality and display-name status.', 'Identify account setup steps that need attention.'],
    steps: ['Connect business assets', 'Review account status', 'Complete required steps'],
    note: 'Verification and approval decisions are made by Meta. Kriscel WA does not guarantee approval.',
    path: '/whatsapp',
    action: 'Review WhatsApp setup',
    accent: 'blue',
  },
  {
    id: 'api',
    label: 'API Access',
    pillLabel: 'API Access',
    icon: ApiIcon,
    category: 'Business integrations',
    title: 'Connect your tools to your conversations.',
    description: 'Use workspace API keys to connect supported Kriscel WA operations with your own business systems.',
    benefits: ['Manage API keys from workspace settings.', 'Connect supported customer and messaging workflows.', 'Keep credentials private and revoke unused keys.'],
    steps: ['Create a workspace key', 'Connect your system', 'Manage access'],
    note: 'API access depends on your plan and role. Keep API keys on your server, away from public pages.',
    path: '/settings',
    action: 'Open integration settings',
    accent: 'purple',
    flag: 'hasAPI',
  },
  {
    id: 'analytics',
    label: 'Advanced Analytics',
    pillLabel: 'Analytics',
    icon: AnalyticsIcon,
    category: 'Performance insights',
    title: 'See how your conversations perform.',
    description: 'Review recorded messaging, campaign, and inbox activity to understand what is happening across your workspace.',
    benefits: ['Explore message and campaign performance over time.', 'Review delivery and conversation activity.', 'Use available filters and report exports.'],
    steps: ['Choose a period', 'Review performance', 'Share your findings'],
    note: 'Advanced reports depend on your plan. Results reflect events recorded for your workspace.',
    path: '/analytics',
    action: 'Explore analytics',
    accent: 'blue',
    flag: 'hasAdvancedAnalytics',
  },
  {
    id: 'builder',
    label: 'Visual Chatbot Builder',
    pillLabel: 'Flow Builder',
    icon: BuilderIcon,
    category: 'Conversation workflows',
    title: 'Build a helpful reply flow, visually.',
    description: 'Arrange conversation steps in a visual builder, from a welcome message to a handoff to your support team.',
    benefits: ['Create greetings, conditions, and keyword responses.', 'Add delays and supported conversation actions.', 'Assign and activate a flow for a connected number.'],
    steps: ['Design the steps', 'Assign your number', 'Activate your flow'],
    note: 'A flow must be active and assigned correctly before it can respond to live conversations.',
    path: '/flows',
    action: 'Open the flow builder',
    accent: 'purple',
    flag: 'hasChatbotBuilder',
  },
  {
    id: 'flows',
    label: 'WhatsApp Flows',
    pillLabel: 'WhatsApp Flows',
    icon: FlowsIcon,
    category: 'Structured interactions',
    title: 'Guide customers through the next step.',
    description: 'Use the WhatsApp Flows capability for supported structured customer interactions within your connected WhatsApp setup.',
    benefits: ['Explore the WhatsApp Flows feature included in eligible plans.', 'Plan structured interactions for your customer journey.', 'Contact our team about setup and supported workflows.'],
    steps: ['Choose your use case', 'Review requirements', 'Discuss your setup'],
    note: 'Availability depends on your plan, connected Meta assets, and the requirements of your chosen flow.',
    path: '/contact',
    action: 'Discuss WhatsApp Flows',
    accent: 'green',
    flag: 'hasWhatsAppFlows',
  },
  {
    id: 'ai',
    label: 'AI Chatbot',
    pillLabel: 'AI Chatbot',
    icon: AiChatbotIcon,
    category: 'Knowledge-based assistance',
    title: 'Help customers find useful answers.',
    description: 'Add AI reply steps to your chatbot and connect business knowledge so responses have relevant information to draw on.',
    benefits: ['Prepare a knowledge base with your business information.', 'Add an AI reply step to an eligible chatbot flow.', 'Configure fallback replies and human handoff.'],
    steps: ['Add business knowledge', 'Configure AI replies', 'Keep your team available'],
    note: 'Requires an eligible plan and a configured AI provider. Responses should be reviewed for accuracy.',
    path: '/flows',
    action: 'Explore chatbot flows',
    accent: 'purple',
    flag: 'hasAIChatbot',
  },
  {
    id: 'support',
    label: 'Priority Support',
    pillLabel: 'Priority Support',
    icon: SupportIcon,
    category: 'Help for your business',
    title: 'Get help with your next step.',
    description: 'Contact the Kriscel WA team for questions about account setup, plans, and supported product features.',
    benefits: ['Ask questions about getting your workspace connected.', 'Discuss your business requirements with our team.', 'Review priority support availability in your plan.'],
    steps: ['Describe your question', 'Contact our team', 'Review the next steps'],
    note: 'Priority support depends on your plan. Contact us to confirm service hours and response commitments.',
    path: '/contact',
    action: 'Contact our team',
    accent: 'blue',
    flag: 'hasPrioritySupport',
  },
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

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const innerNodes = Array.from(rail.querySelectorAll<HTMLButtonElement>(':scope .feature-services__inner-node'));
    const outerPills = Array.from(rail.querySelectorAll<HTMLButtonElement>(':scope .feature-services__outer-pill'));
    const motion = window.matchMedia('(min-width: 820px) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let previousTime = 0;
    let angle = 0;
    let visible = false;

    const getRadii = () => {
      const width = rail.clientWidth || 1000;
      const height = rail.clientHeight || 540;
      // Compact inner orbit: smoothly surrounds the compact phone
      const rxInner = Math.min(Math.max(width * 0.16, 165), 195);
      const ryInner = Math.min(Math.max(height * 0.28, 148), 175);
      // Compact outer orbit: elegant pills floating outside in perfect radial sync
      const rxOuter = Math.min(Math.max(width * 0.32, 320), 380);
      const ryOuter = Math.min(Math.max(height * 0.44, 225), 255);
      return { rxInner, ryInner, rxOuter, ryOuter };
    };

    let { rxInner, ryInner, rxOuter, ryOuter } = getRadii();

    const positionCards = () => {
      rail.style.setProperty('--rx-inner', `${rxInner}px`);
      rail.style.setProperty('--ry-inner', `${ryInner}px`);
      rail.style.setProperty('--rx-outer', `${rxOuter}px`);
      rail.style.setProperty('--ry-outer', `${ryOuter}px`);

      const total = services.length;
      for (let i = 0; i < total; i++) {
        // Locked phase angle for 100% radial alignment between inner icon and outer pill
        const phase = angle + (i * Math.PI * 2) / total;
        const sinVal = Math.sin(phase);
        const cosVal = -Math.cos(phase);

        // Inner icon position:
        const inX = sinVal * rxInner;
        const inY = cosVal * ryInner;
        if (innerNodes[i]) {
          innerNodes[i].style.setProperty('--inner-x', `${inX}px`);
          innerNodes[i].style.setProperty('--inner-y', `${inY}px`);
        }

        // Outer pill position along the exact same radial ray:
        const outX = sinVal * rxOuter;
        const outY = cosVal * ryOuter;
        if (outerPills[i]) {
          outerPills[i].style.setProperty('--outer-x', `${outX}px`);
          outerPills[i].style.setProperty('--outer-y', `${outY}px`);
        }
      }
    };

    const tick = (time: number) => {
      if (previousTime) {
        // Smooth ~64s complete revolution
        angle = (angle + (Math.min(time - previousTime, 50) * Math.PI * 2) / 64000) % (Math.PI * 2);
      }
      previousTime = time;
      positionCards();
      frame = requestAnimationFrame(tick);
    };

    const updateMotion = () => {
      cancelAnimationFrame(frame);
      previousTime = 0;
      rail.classList.toggle('feature-services__rail--clockwise', motion.matches);
      if (!motion.matches) return;
      positionCards();
      if (visible && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    };

    const resize = new ResizeObserver(() => {
      const radii = getRadii();
      rxInner = radii.rxInner;
      ryInner = radii.ryInner;
      rxOuter = radii.rxOuter;
      ryOuter = radii.ryOuter;
      if (motion.matches) positionCards();
    });

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateMotion();
    });

    resize.observe(rail);
    intersection.observe(rail);
    motion.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateMotion);
    updateMotion();

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      motion.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateMotion);
      rail.classList.remove('feature-services__rail--clockwise');
      innerNodes.forEach((node) => {
        node.style.removeProperty('--inner-x');
        node.style.removeProperty('--inner-y');
      });
      outerPills.forEach((pill) => {
        pill.style.removeProperty('--outer-x');
        pill.style.removeProperty('--outer-y');
      });
    };
  }, []);

  const scrollCards = (direction: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const cardWidth = rail.firstElementChild?.getBoundingClientRect().width || 280;
    rail.scrollBy({ left: direction * (cardWidth + 18), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const selected = services.find((service) => service.id === selectedId) || services[0];
  const SelectedIcon = selected.icon;

  return (
    <section className="feature-services feature-services--orbit" aria-label="Features and services">
      <header className="feature-services__orbit-heading">
        <h2>Use Cases of <span>WhatsApp Automation Software</span></h2>
      </header>

      <div className="feature-services__workspace">
        <div className="feature-services__rail-toolbar">
          <div className="feature-services__arrows">
            <button type="button" aria-label="Scroll features left" aria-controls="feature-services-cards" disabled={scrollEdges.start} onClick={() => scrollCards(-1)}>
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Scroll features right" aria-controls="feature-services-cards" disabled={scrollEdges.end} onClick={() => scrollCards(1)}>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          id="feature-services-cards"
          className="feature-services__rail"
          role="group"
          aria-label="Choose a feature to explore"
          tabIndex={0}
          onScroll={updateScrollEdges}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); scrollCards(event.key === 'ArrowRight' ? 1 : -1); }
            if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); event.currentTarget.scrollTo({ left: event.key === 'Home' ? 0 : event.currentTarget.scrollWidth, behavior: 'auto' }); }
          }}
        >
          {/* Concentric Dashed Orbit Tracks Matching Reference Design */}
          <svg className="feature-services__tracks-svg" aria-hidden="true">
            <ellipse
              cx="50%"
              cy="50%"
              rx="var(--rx-inner, 220px)"
              ry="var(--ry-inner, 215px)"
              className="feature-services__track-inner"
            />
            <ellipse
              cx="50%"
              cy="50%"
              rx="var(--rx-outer, 440px)"
              ry="var(--ry-outer, 310px)"
              className="feature-services__track-outer"
            />
          </svg>

          {/* Central Hub: Sleek Apple iPhone Mockup */}
          <div className="feature-services__hub" aria-hidden="true">
            <span className="feature-services__hub-orbit" />
            <div className="feature-services__phone">
              <div className="feature-services__phone-speaker" />
              <div className="feature-services__phone-header">
                <span className="feature-services__phone-avatar">
                  <SelectedIcon size={22} />
                </span>
                <span>
                  <strong>Kriscel WA</strong>
                  <small>Business Account ✓</small>
                </span>
                <span className="feature-services__phone-menu">•••</span>
              </div>
              <div className="feature-services__phone-product">
                <span className="feature-services__phone-bag">
                  <SelectedIcon size={24} />
                </span>
                <span>
                  <strong>{selected.label}</strong>
                  <small>{selected.category}</small>
                </span>
              </div>
              {selected.benefits.slice(0, 3).map((benefit) => (
                <div key={benefit} className="feature-services__phone-option">
                  <span>{benefit}</span>
                  <b>›</b>
                </div>
              ))}
              <div className="feature-services__phone-message">
                <strong>{selected.label}</strong>
                <p>{selected.description}</p>
                <small>8:17 AM ✓✓</small>
              </div>
            </div>
          </div>

          {/* INNER ORBIT: High-Definition Feature Circular Icons Rotating Around Phone */}
          {services.map((service) => {
            const isSelected = selected.id === service.id;
            return (
              <button
                key={`inner-${service.id}`}
                type="button"
                className={`feature-services__inner-node feature-services__inner-node--${service.accent} ${isSelected ? 'is-selected' : ''}`}
                title={service.label}
                aria-label={`${service.label} icon`}
                onMouseEnter={() => setSelectedId(service.id)}
                onFocus={() => setSelectedId(service.id)}
                onClick={() => setSelectedId(service.id)}
              >
                <span className="feature-services__inner-node-disc">
                  <service.icon size={36} />
                </span>
              </button>
            );
          })}

          {/* OUTER ORBIT: Clean Pill Badges Rotating in Radial Alignment with Icons */}
          {services.map((service) => {
            const isSelected = selected.id === service.id;
            return (
              <button
                key={`outer-${service.id}`}
                type="button"
                className={`feature-services__outer-pill feature-services__outer-pill--${service.accent} ${isSelected ? 'is-selected' : ''}`}
                aria-pressed={isSelected}
                aria-label={service.label}
                onMouseEnter={() => setSelectedId(service.id)}
                onFocus={() => setSelectedId(service.id)}
                onClick={() => setSelectedId(service.id)}
              >
                <span className="feature-services__pill-icon">
                  <service.icon size={19} />
                </span>
                <span className="feature-services__pill-label">{service.pillLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

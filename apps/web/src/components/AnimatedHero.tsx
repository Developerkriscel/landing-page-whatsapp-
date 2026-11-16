import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, MessageSquare, Users, Workflow } from 'lucide-react';
import heroVideoSrc from '../assets/whatsapp-automation-hero.mp4';
import './AnimatedHero.css';

export default function AnimatedHero() {
  return (
    <section className="animated-hero" aria-labelledby="animated-hero-title">
      <div className="animated-hero__aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="animated-hero__layout">
        <div className="animated-hero__copy">
          <span className="animated-hero__eyebrow"><MessageSquare size={14} aria-hidden="true" /> WhatsApp customer support</span>
          <h1 id="animated-hero-title">
            <span className="animated-hero__line">Your <em className="animated-hero__word animated-hero__word--chats">WhatsApp Chats,</em></span>
            <span className="animated-hero__line"><em className="animated-hero__word animated-hero__word--customers">Customers</em> and <em className="animated-hero__word animated-hero__word--team">Team</em></span>
            <strong className="animated-hero__line">&mdash; all in One Place</strong>
          </h1>
          <p>A platform for businesses to manage customer conversations and support tasks.</p>
          <div className="animated-hero__actions">
            <a href="#pricing-plans">Explore plans <ArrowUpRight size={18} aria-hidden="true" /></a>
            <Link to="/contact">Talk to our team <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <div className="animated-hero__capabilities">
            <span><Check size={15} aria-hidden="true" /> Shared inbox</span>
            <span><Check size={15} aria-hidden="true" /> Chatbot replies</span>
            <span><Check size={15} aria-hidden="true" /> Team collaboration</span>
          </div>
        </div>

        <div className="animated-hero__visual" aria-label="Kriscel WA product video">
          <div className="animated-hero__orbit" aria-hidden="true" />
          <div className="animated-hero__workspace">
            <div className="animated-hero__window"><span className="animated-hero__dots" aria-hidden="true">...</span><span>Kriscel WA</span><small>Customer support workspace</small></div>
            <video className="animated-hero__video" src={heroVideoSrc} autoPlay muted loop playsInline preload="metadata" aria-label="Kriscel WA customer support workflow video" />
          </div>
          <div className="animated-hero__badge animated-hero__badge--contacts"><Users size={19} aria-hidden="true" /><div><strong>Customer context</strong><small>Keep details together</small></div></div>
          <div className="animated-hero__badge animated-hero__badge--flow"><Workflow size={19} aria-hidden="true" /><div><strong>Connected workflows</strong><small>From enquiry to handoff</small></div></div>
        </div>
      </div>
      <div className="animated-hero__template-panel" aria-hidden="true">
        <span>CONVERSATIONS</span><span>SUPPORT WORKFLOWS</span><span>TEAM COLLABORATION</span>
      </div>
    </section>
  );
}

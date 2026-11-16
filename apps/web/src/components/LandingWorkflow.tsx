import { useEffect, useRef } from 'react';
import { ArrowUpRight, MessageSquare, Users, Workflow, ShoppingBag, Headphones, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import './LandingWorkflow.css';
import connectedCustomerImage from '../assets/connected-customer-experience.png';

const steps = [
  { icon: MessageSquare, title: 'Connect your WhatsApp', text: 'Bring your WhatsApp Business number into a shared workspace so customer conversations have a home.' },
  { icon: Workflow, title: 'Build your reply flow', text: 'Set up welcome messages, common answers, and a handoff to your support team when a conversation needs a person.' },
  { icon: Users, title: 'Keep your team in sync', text: 'Assign chats, organize contacts, and keep private notes so the next teammate has the context they need.' },
];

export default function LandingWorkflow() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!elements || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('awaiting-reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    elements.forEach(element => { element.classList.add('awaiting-reveal'); observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="landing-workflow" ref={sectionRef} aria-labelledby="workflow-heading">
      <div className="landing-workflow__heading" data-reveal>
        <span className="landing-workflow__eyebrow">FROM FIRST MESSAGE TO FOLLOW-UP</span>
        <h2 id="workflow-heading">Less switching tabs.<br /><span>More meaningful conversations.</span></h2>
      </div>

      <div className="landing-workflow__steps">
        {steps.map(({ icon: Icon, title, text }, index) => (
          <article key={title} className={`landing-workflow__step landing-workflow__step--${index}`} data-reveal>
            <div className="landing-workflow__step-top"><Icon size={25} aria-hidden="true" /><span>0{index + 1}</span></div>
            <h3>{title}</h3><p>{text}</p>
          </article>
        ))}
      </div>

      <div className="landing-workflow__showcase landing-workflow__showcase--image" data-reveal>
        <img
          className="landing-workflow__showcase-image"
          src={connectedCustomerImage}
          alt="WhatsApp chatbot connecting a customer conversation with a support team"
        />
      </div>

      <div className="landing-workflow__heading landing-workflow__heading--compact" data-reveal>
        <span className="landing-workflow__eyebrow">BUILT AROUND YOUR WORKDAY</span>
        <h2>Different teams. <span>One connected workspace.</span></h2>
      </div>
      <div className="landing-workflow__uses">
        {[
          { icon: ShoppingBag, title: 'Sales conversations', text: 'Keep enquiries organized with contact tags and shared conversation history.' },
          { icon: Headphones, title: 'Customer support', text: 'Route questions to teammates and keep the details together until the conversation is resolved.' },
          { icon: CalendarDays, title: 'Customer follow-ups', text: 'Plan template campaigns for opted-in contacts and review delivery activity.' },
        ].map(({ icon: Icon, title, text }) => <article key={title} data-reveal><Icon size={26} aria-hidden="true" /><h3>{title}</h3><p>{text}</p><Link to="/contact">Talk to our team <ArrowUpRight size={15} aria-hidden="true" /></Link></article>)}
      </div>
    </section>
  );
}

import './TrustLogos.css';
import kalingaLogo from '../assets/trust-logos/kalinga.png';
import krishnaLogo from '../assets/trust-logos/krishna.png';
import omLogo from '../assets/trust-logos/om.png';
import chukdeLogo from '../assets/trust-logos/chukde.png';
import malvikaLogo from '../assets/trust-logos/malvika.png';

const trustedBusinesses = [
  { name: 'Kalinga Premium', image: kalingaLogo },
  { name: 'Krishna Overseas', image: krishnaLogo },
  { name: 'Om Resources', image: omLogo },
  { name: 'Chukde', image: chukdeLogo },
  { name: 'Malvika Pride India', image: malvikaLogo },
];

export default function TrustLogos() {
  // Four complete sets keep the rail filled on wide screens while allowing
  // the animation to move exactly one identical set at every loop.
  const loops = Array.from({ length: 4 }, (_, loopIndex) => ({ loopIndex, businesses: trustedBusinesses }));

  return (
    <section className="trust-logos" aria-label="Trusted by growing businesses across India">
      <p className="trust-logos__eyebrow">Trusted by growing businesses across India</p>
      <div className="trust-logos__viewport">
        <div className="trust-logos__track">
          {loops.map(({ loopIndex, businesses }) => (
            <div className="trust-logos__set" key={loopIndex} aria-hidden={loopIndex > 0}>
              {businesses.map((business) => (
                <div className="trust-logos__item" key={`${loopIndex}-${business.name}`}>
                  <div className="trust-logos__circle">
                    <img src={business.image} alt={loopIndex === 0 ? `${business.name} logo` : ''} />
                  </div>
                  <span>{business.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

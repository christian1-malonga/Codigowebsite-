import { HomeHero } from '../sections/HomeHero';
import { ServicesSection } from '../sections/ServicesSection';
import { WorkSection } from '../sections/WorkSection';
import { JoinSection } from '../sections/JoinSection';
import { StackSection } from '../sections/StackSection';
import { EngageSection } from '../sections/EngageSection';
import { PricingSection } from '../sections/PricingSection';
import { ContactSection } from '../sections/ContactSection';

export default function HomePage() {
  return <div className="home-page"><HomeHero /><ServicesSection /><WorkSection /><JoinSection /><StackSection /><EngageSection /><PricingSection /><ContactSection reveal /></div>;
}

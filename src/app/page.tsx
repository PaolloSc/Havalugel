import { HeroFloating } from "@/components/home/HeroFloating";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedMotos } from "@/components/home/FeaturedMotos";

export default function HomePage() {
  return (
    <>
      <HeroFloating />
      <HowItWorks />
      <FeaturedMotos />
    </>
  );
}

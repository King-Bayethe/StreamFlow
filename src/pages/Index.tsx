import Hero from "@/components/Hero";
import TrendingStreams from "@/components/TrendingStreams";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <TrendingStreams />
      <HowItWorks />
      <Footer />
    </main>
  );
};

export default Index;

import Navbar from "@/components/sales/Navbar";
import Hero from "@/components/sales/Hero";
import Pains from "@/components/sales/Pains";
import Method from "@/components/sales/Method";
import Stats from "@/components/sales/Stats";
import Testimonials from "@/components/sales/Testimonials";
import Pricing from "@/components/sales/Pricing";
import Faq from "@/components/sales/Faq";
import FinalCta from "@/components/sales/FinalCta";
import Footer from "@/components/sales/Footer";
import StickyOfferBar from "@/components/sales/StickyOfferBar";
import RecentSales from "@/components/sales/RecentSales";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <RecentSales />
      <StickyOfferBar />
      <Navbar />
      <Hero />
      <Pains />
      <Method />
      <Stats />
      <Testimonials />
      <Pricing />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
};

export default Index;

import CategorySection from "../components/home/CategorySection";
import HeroSection from "../components/home/HeroSection";
import PromoBannerSection from "../components/home/PromoBannerSection";
import TrendingProductsSection from "../components/home/TrendingProductsSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <HeroSection />
      <CategorySection />
      <TrendingProductsSection />
      <PromoBannerSection />
      <WhyChooseUsSection />
      <Footer />
      
    </main>
  );
};

export default HomePage;

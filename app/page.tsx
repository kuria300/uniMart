import Navbar from "./components/Navbar";
import SwiperSection from "./components/SwiperSection";
import DisplayHome from "./components/DisplayHome";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { Level } from "./components/Level";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
    <Navbar />
    <SwiperSection />
    <DisplayHome />
    <FeaturedProducts />
    <Level />
    <Footer />
    </>
  );
}

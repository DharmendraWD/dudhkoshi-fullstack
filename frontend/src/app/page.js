
import Home1 from "./(home)/Home";
import Carousel from "@/components/Misc/Carousel";
import Mission from "./(home)/Middle/Mission";

import CustomGallery from "@/components/Misc/Gallary/CustomGallery";
import TeamProfile from "./(home)/Middle/TeamProfilePage";
import FAQSection from "@/components/Misc/Faq/FAQSection";
import FooterHero from "./(home)/FooterHero";
import Footer from "@/components/Misc/Footer/Footer";
import Navbar from "@/components/Header/Navbar/Navbar";
import NewsAndCaseStudy from "./(home)/Middle/NewsAndCaseStudy";
import ContactSection from "./(home)/Middle/ContactForm2";


export default function Home() {
  return (
    <div className="">
      <Navbar></Navbar>
      <Home1></Home1>
  <Carousel></Carousel>
 <Mission></Mission>
<TeamProfile></TeamProfile>
 <CustomGallery/>
<NewsAndCaseStudy></NewsAndCaseStudy> 
  <ContactSection></ContactSection>
    <FAQSection></FAQSection>
     <FooterHero></FooterHero>
    <Footer></Footer>  

    </div>
  );
}

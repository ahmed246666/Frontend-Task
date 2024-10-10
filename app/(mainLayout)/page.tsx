import HomeBannerSection from "@/components/HomeBannerSection/HomeBannerSection";
import HomeContactSection from "@/components/HomeContactSection/HomeContactSection";
import HomeFeaturesSection from "@/components/HomeFeaturesSection/HomeFeaturesSection";
import HomeHeroSection from "@/components/HomeHeroSection/HomeHeroSection";
import HomeOurPartnersSection from "@/components/HomeOurPartnersSection/HomeOurPartnersSection";
import HomePropertiesSection from "@/components/HomePropertiesSection/HomePropertiesSection";
import HomeRecentlyAddedSection from "@/components/HomeRecentlyAddedSection/HomeRecentlyAddedSection";
import HomeSecondBannerSection from "@/components/HomeSecondBannerSection/HomeSecondBannerSection";

const HomePage = () => {
  return (
    <main className="">
      {/* Hero  */}
      <HomeHeroSection />
      {/* Features  */}
      <HomeFeaturesSection />
      {/* Properties  */}
      <HomePropertiesSection />
      {/* Banner */}
      <HomeBannerSection />
      {/* Recently Added  */}
      <HomeRecentlyAddedSection />
      {/* Second Banner */}
      <HomeSecondBannerSection />
      {/* Our Partners */}
      <HomeOurPartnersSection />
      {/* Contact */}
      <HomeContactSection />
    </main>
  );
};

export default HomePage;

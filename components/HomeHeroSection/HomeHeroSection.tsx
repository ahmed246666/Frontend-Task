import HeroImage from "@/images/HomeHero.webp";
import MainButton from "../ui/MainButton";

const HomeHeroSection = () => {
  return (
    <section
      className="h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url('${HeroImage.src}')` }}
    >
      <div className="container mx-auto px-6 flex flex-col items-center justify-center h-full gap-8 lg:gap-14">
        <h1 className="text-3xl sm:text-5xl lg:text-7xl text-white font-black text-center max-w-[90%] sm:max-w-[800px] leading-relaxed italic">
          We Help You Realize Your Dream Property
        </h1>
        <MainButton label="Explore Properties" mode="light" loading={false} />
      </div>
    </section>
  );
};

export default HomeHeroSection;

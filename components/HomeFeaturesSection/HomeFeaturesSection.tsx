import Image from "next/image";
import FeatureImage from "@/images/Feature.webp";
import GreatSupport from "@/images/icons/GreatSupport.svg";
import GreatSupport2 from "@/images/icons/GroupGreatSupport.svg";
import MortgageServices from "@/images/icons/MortgageServices.svg";
import PropertyManagement from "@/images/icons/PropertyManagement.svg";
import MainButton from "../ui/MainButton";

const features = [
  { image: PropertyManagement, label: "Property Management" },
  { image: GreatSupport, label: "Great Support" },
  { image: MortgageServices, label: "Mortgage Services" },
  { image: GreatSupport2, label: "Great Support" },
];

const HomeFeaturesSection = () => {
  return (
    <section className="container mx-auto px-6 my-[75px] md:my-[125px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <Image
          src={FeatureImage}
          alt="Feature Image"
          className="max-h-[400px] lg:max-h-[700px] object-contain"
        />
        <div className="space-y-6 md:space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold max-lg:text-center">
            We Help You Realize Your Dream Property
          </h2>
          <p className="text-base md:text-lg max-lg:text-center">
            Donec bibendum nibh quis nisl luctus, at aliquet ipsum bibendum.
            Fusce at dui tincidunt nulla semper venenatis at et magna. Mauris
            turpis lorem, ultricies vel justo sed, ultrices auctor nisi.
          </p>
          <p className="text-base md:text-lg max-lg:text-center">
            Donec bibendum nibh quis nisl luctus, at aliquet ipsum bibendum.
            Fusce at dui tincidunt nulla semper.
          </p>
          <MainButton
            label="Read More"
            classname="gap-3 max-lg:mx-auto"
            mode="dark"
            loading={false}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 lg:mt-20">
        {features.map((feature) => (
          <div
            key={feature.label}
            className={`flex flex-col items-center gap-4 md:gap-6 justify-center lg:border-r last:border-r-0 `}
          >
            <Image src={feature.image} alt={feature.label} />
            <p className="text-center">{feature.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeFeaturesSection;

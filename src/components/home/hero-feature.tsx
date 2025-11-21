import { MessageSquare, RefreshCcw, Rocket, ShieldCheck } from "lucide-react";

const featureData = [
  {
    icon: Rocket,
    title: "Free Shipping",
    description: "For all orders $200",
  },
  {
    icon: RefreshCcw,
    title: "1 & 1 Returns",
    description: "Cancellation after 1 day",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure Payments",
    description: "Gurantee secure payments",
  },
  {
    icon: MessageSquare,
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
];

const HeroFeature = () => {
  return (
    <div className="mx-auto w-full max-w-[1060px] px-4 sm:px-8 xl:px-0">
      <div className="mt-10 flex flex-wrap items-center gap-7.5 xl:gap-12.5 dark:text-white">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-4" key={key}>
            <item.icon className="size-10" />

            <div>
              <h3 className="text-dark text-lg font-medium">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;

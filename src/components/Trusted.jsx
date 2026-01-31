import betterauth from "../assets/betterauth.png";
import neon from "../assets/neon.svg";
import greatfrontend from "../assets/greatfrontend.png";
import cisco from "../assets/cisco.png";
import zomato from "../assets/zomato.png";
import strapi from "../assets/strapi.svg";

const TrustedBySection = () => {
  const logos = [
    {
      name: "BETTER-AUTH.",
      src: betterauth,
      darkClass: "filter invert dark:invert-0", // monochrome, safe to invert
    },
    {
      name: "Zomato",
      src: zomato,
      darkClass: "dark:brightness-110", // keep brand color
    },
    {
      name: "Neon",
      src: neon,
      darkClass: "filter invert dark:invert-0 dark:brightness-125", // SVG, boosts contrast
    },
    {
      name: "GreatFrontend",
      src: greatfrontend,
      darkClass: "dark:invert",
    },
    {
      name: "Cisco",
      src: cisco,
      darkClass: "dark:brightness-110 dark:contrast-125", // blue logo, no invert
    },
    {
      name: "Strapi",
      src: strapi,
      darkClass: "filter invert dark:invert-0", // monochrome, safe to invert
    },
  ];

  return (
    <section className="w-full py-14">
      <div className="max-w-6xl mx-auto px-5">
        <div className="rounded-2xl bg-muted px-6 py-12">
          <p className="text-xs text-center tracking-widest text-slate-400">
            TRUSTED BY CANDIDATES AT
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 place-items-center">
            {logos.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.name}
                className={`
                  mx-auto h-10 sm:h-12 object-contain
                  grayscale opacity-60
                  hover:grayscale-0 hover:opacity-100
                  transition-all
                  dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]

                  ${logo.darkClass}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;

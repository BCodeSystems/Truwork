import Image from "next/image";
const features = [
  {
    title: "Photo Documentation",
    description:
      "Add jobsite photos directly to your invoice so customers know exactly what work was completed.",
    image: "/images/features/photo-documentation.jpeg",
  },
  {
    title: "Mobile-First Workflow",
    description:
      "Create invoices from the job site without waiting until you're back at the office.",
    image: "/images/features/mobile-workflow.jpeg",
  },
  {
    title: "Fast & Simple",
    description:
      "Generate a professional invoice in under two minutes with a clean, guided workflow.",
    image: "/images/features/fast-simple.jpeg",
  },
  {
    title: "Professional Results",
    description:
      "Invoices look polished and organized so customers trust your work and pay faster.",
    image: "/images/features/professional-results.jpeg",
  },
];

export default function FeaturesSection() {
    return (
      <section className="bg-[#F9FAFB] py-20" id="features">
        <div className="mx-auto max-w-6xl px-6">
  
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-brand-blue">
              Everything You Need. Nothing You Don’t.
            </h2>
  
            <p className="mt-4 text-gray-600">
              TruWork gives service businesses a simple way to create professional
              invoices without complicated software.
            </p>
          </div>
  
          <div className="mt-12 grid gap-6 md:grid-cols-2">
  
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="mb-4 overflow-hidden rounded-xl bg-gray-50">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={800}
                    height={500}
                    className="h-44 w-full object-cover object-center md:h-48 md:object-contain transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
  
                <h3 className="text-xl font-semibold text-brand-blue">
                  {feature.title}
                </h3>
  
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
  
          </div>
        </div>
      </section>
    );
  }
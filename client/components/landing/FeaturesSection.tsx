const features = [
    {
        title: "Photo Documentation",
        description:
        "Add jobsite photos directly to your invoice so customers know exactly what work was completed.",
    },
    {
        title: "Mobile-First Workflow",
        description:
        "Create invoiced from the job site without wating until you're back at the office.",
    },
    {
        title: "Fast & Simple",
        description:
        "Generate a professional invoice in under two minutes with a clean, guided workflow.",
    },
    {
        title: "Professional Results",
        description:
        "Invoices look polished and organized so customers trust your work and pay faster."
    },
];

export default function FeaturesSection() {
    return (
      <section className="bg-[#F9FAFB] py-20">
        <div className="mx-auto max-w-6xl px-6">
  
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-[#0B1F3B]">
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
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <div className="mb-4 h-40 rounded-xl bg-gray-200" />
  
                <h3 className="text-xl font-semibold text-[#0B1F3B]">
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
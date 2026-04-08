const steps = [
    {
      step: "Step 1",
      title: "Enter Job Details",
      description:
        "Add the service performed, materials used, and pricing in a simple guided workflow.",
    },
    {
      step: "Step 2",
      title: "Add Job Photos",
      description:
        "Attach photos directly to the invoice so customers clearly see the work that was completed.",
    },
    {
      step: "Step 3",
      title: "Send & Get Paid",
      description:
        "Send a clean professional invoice instantly by email or text right from the job site.",
    },
  ];
  
  export default function ProcessSection() {
    return (
      <section className="bg-brand-blue py-20 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          
          <h2 className="text-3xl font-bold">
            Simple 3-Step Workflow
          </h2>
  
          <p className="mt-4 text-sm text-slate-300">
            From job completion to invoice delivery in minutes.
          </p>
  
          <div className="mt-12 grid gap-10 md:grid-cols-3">
  
            {steps.map((item) => (
              <div key={item.step}>
  
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red text-lg font-bold">
                  ✓
                </div>
  
                <span className="mt-4 block text-sm font-semibold text-slate-200">
                  {item.step}
                </span>
  
                <h3 className="mt-2 text-xl font-semibold">
                  {item.title}
                </h3>
  
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {item.description}
                </p>
  
              </div>
            ))}
  
          </div>
        </div>
      </section>
    );
  }
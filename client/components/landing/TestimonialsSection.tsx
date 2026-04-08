const testimonials = [
    {
      quote:
        "I can create an invoice at the job site and send it before I even leave. Customers love seeing the photos of the work.",
      name: "Mike Rodriguez",
      business: "Handyman, 12 years",
    },
    {
      quote:
        "Finally an invoicing tool that isn’t complicated. I figured everything out in about five minutes.",
      name: "Tom Chen",
      business: "General Contractor",
    },
    {
      quote:
        "The invoices look so professional now. It makes my business feel way more legit.",
      name: "Sarah Johnson",
      business: "Home Remodeling",
    },
  ];
  
  export default function TestimonialsSection() {
    return (
      <section className="bg-[#F9FAFB] py-20">
        <div className="mx-auto max-w-6xl px-6">
  
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#0B1F3B]">
              Trusted by Service Businesses
            </h2>
  
            <p className="mt-4 text-gray-600">
              Built for contractors, technicians, and service professionals who
              want to get paid faster.
            </p>
          </div>
  
          <div className="mt-12 grid gap-6 md:grid-cols-3">
  
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <p className="text-sm leading-6 text-gray-700">
                  “{testimonial.quote}”
                </p>
  
                <div className="mt-6">
                  <p className="font-semibold text-[#0B1F3B]">
                    {testimonial.name}
                  </p>
  
                  <p className="text-sm text-gray-500">
                    {testimonial.business}
                  </p>
                </div>
              </div>
            ))}
  
          </div>
        </div>
      </section>
    );
  }
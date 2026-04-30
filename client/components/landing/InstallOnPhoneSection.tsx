import { Share, Plus, Smartphone } from "lucide-react";

const iphoneSteps = [
  {
    text: "Tap the Share button in Safari",
    icon: <Share className="h-4 w-4 text-brand-blue" />,
  },
  {
    text: "Scroll down and tap 'Add to Home Screen'",
  },
  {
    text: "Tap 'Add' in the top right corner",
  },
  {
    text: "TruWork will appear on your home screen like a native app",
  },
];

const androidSteps = [
  {
    text: "Tap the menu (three dots) in Chrome",
  },
  {
    text: "Tap 'Add to Home screen'",
    icon: <Plus className="h-4 w-4 text-brand-blue" />,
  },
  {
    text: "Confirm by tapping 'Add'",
  },
  {
    text: "TruWork will appear on your home screen like a native app",
  },
];

const benefits = [
  "Faster access - launch directly from your home screen",
  "Works offline - access job details even without internet",
  "Full screen experience - no browser bars getting in the way",
  "No app store required - saves phone storage space",
];

type Step = {
  text: string;
  icon?: React.ReactNode;
};

function InstallCard({
  title,
  steps,
}: {
  title: string;
  steps: Step[];
}) {
  return (
    <div className="rounded-xl bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue">
          <Smartphone className="h-6 w-6 text-white" />
        </div>

        <h3 className="text-xl font-bold text-brand-blue">{title}</h3>
      </div>

      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={step.text} className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red text-xs font-semibold text-white">
              {index + 1}
            </div>

            <div className="flex items-start gap-2 text-sm leading-6 text-gray-700 sm:text-base">
              <span>{step.text}</span>
              {step.icon ? <span className="mt-1 shrink-0">{step.icon}</span> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function InstallOnPhoneSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-brand-blue">
            Install TruWork on Your Phone
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Access TruWork instantly from your home screen - no app store needed
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <InstallCard title="iPhone / iPad" steps={iphoneSteps} />
          <InstallCard title="Android" steps={androidSteps} />
        </div>

        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red text-2xl text-white">
              💡
            </div>

            <h3 className="font-bold text-brand-blue">
              Why install as an app?
            </h3>
          </div>

          <ul className="space-y-3 text-gray-700">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-red" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
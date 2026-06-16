import { cn } from '@/lib/utils';

type Step = {
  title: string;
};

type StepperProps = {
  steps: Step[];
  currentStep: number;
};

export default function Stepper({
  steps,
  currentStep,
}: StepperProps) {
  return (
    <div
      dir="rtl"
      className="flex w-full items-center justify-between"
    >
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        const isCompleted = currentStep >= stepNumber;

        return (
          <div
            key={index}
            className="flex flex-1 items-center last:flex-none"
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                  isCompleted
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'text-primary-foreground bg-[#535353]'
                )}
              >
                {stepNumber}
              </div>

              <p className={cn('text-base font-medium text-white')}>
                {step.title}
              </p>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={cn(
                  'mx-4 h-px flex-1',
                  currentStep > stepNumber ? 'bg-primary' : 'bg-white'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

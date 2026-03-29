import { lazy, Suspense } from 'react';

const ComplexityCalculator = lazy(async () => {
  const module = await import('./ComplexityCalculator');
  return { default: module.ComplexityCalculator };
});

export function LazyComplexityCalculator({ complexityClass }: { complexityClass: string }) {
  const fallback = (
    <div className="my-4 w-full rounded-3xl border-4 border-on-background bg-white p-6 text-sm font-bold text-on-surface-variant shadow-[6px_6px_0_rgba(5,150,105,0.1)] sm:my-8 sm:p-8">
      Interactive chart ready for <span className="text-primary">{complexityClass}</span> after hydration.
    </div>
  );

  if (typeof window === 'undefined') {
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <ComplexityCalculator complexityClass={complexityClass} />
    </Suspense>
  );
}

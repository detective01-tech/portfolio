import React, { Suspense, useEffect, useRef, useState } from 'react';

interface DeferredSectionProps {
  id: string;
  render: () => React.ReactNode;
}

const SectionFallback: React.FC = () => (
  <div className="min-h-[240px]" aria-hidden="true" />
);

export const DeferredSection: React.FC<DeferredSectionProps> = ({ id, render }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '720px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} id={id} className="lazy-section scroll-mt-20">
      {shouldLoad ? (
        <Suspense fallback={<SectionFallback />}>
          {render()}
        </Suspense>
      ) : (
        <SectionFallback />
      )}
    </div>
  );
};

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
}

export default function PageHero({
  title,
  subtitle,
  description,
  backgroundImage,
}: PageHeroProps) {
  return (
    <section
      className="relative w-full bg-teal-wash section-spacing overflow-hidden"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-teal-wash/90" />
      )}

      <div className="container relative z-10">
        {subtitle && (
          <p className="micro-label mb-4">{subtitle}</p>
        )}
        <h1 className="max-w-3xl">{title}</h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-muted">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

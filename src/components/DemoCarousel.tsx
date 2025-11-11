type DemoCarouselProps = {
  title: string;
  description: string;
  images: string[];
};

export default function DemoCarousel({ title, description, images }: DemoCarouselProps) {
  return (
    <section
      className="flex min-h-screen w-full items-center py-10"
      style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
    >
      <div className="flex w-full flex-col gap-6 px-6 md:px-12">
        <div className="space-y-2">
          <h3 className="text-2xl font-medium text-white">{title}</h3>
          <p className="text-sm text-accent">{description}</p>
        </div>
        <div className="grid flex-1 gap-6 md:grid-cols-3">
          {images.map((src) => (
            <article
              key={src}
              className="relative h-[80vh] overflow-hidden rounded-3xl border border-white/10 bg-black/40 md:h-[85vh]"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url('${src}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

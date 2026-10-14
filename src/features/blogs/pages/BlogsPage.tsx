import { useLanguage } from "@/shared/i18n/useLanguage";
import PageHeader from "@/shared/components/layout/PageHeader";

const videos = [
  {
    id: 1,
    src: "/blog1.mp4",
  },
  {
    id: 2,
    src: "/blog2.mp4",
  },
  {
    id: 3,
    src: "/blog3.mp4",
  },
];

const Blogs = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <PageHeader title={t("blogs.title")} subtitle={t("blogs.subtitle")} />

      <div className="max-w-6xl mx-auto px-4 pt-8 pb-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="rounded-xl overflow-hidden shadow-lg bg-black"
            >
              <video
                src={video.src}
                controls
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-foreground">
                  {t("blogs.item", { n: video.id })}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;


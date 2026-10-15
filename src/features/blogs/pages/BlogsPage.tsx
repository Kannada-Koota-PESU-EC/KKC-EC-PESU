import { useState, type CSSProperties } from "react";
import { useLanguage } from "@/shared/i18n/useLanguage";
import { useInView } from "@/shared/hooks/use-in-view";
import PageHeader from "@/shared/components/layout/PageHeader";
import BlogCard from "@/features/blogs/components/BlogCard";
import BlogPlayerModal from "@/features/blogs/components/BlogPlayerModal";
import { blogVideos } from "@/features/blogs/data/blogs";

// Mostly portrait videos -> 9:16 reel grid (4 per row), otherwise 16:9 (3 per row)
const portraitCount = blogVideos.filter((video) => video.orientation === "portrait").length;
const gridLayout = portraitCount > blogVideos.length / 2 ? "portrait" : "landscape";

const Blogs = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLDivElement>(0.05);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <PageHeader title={t("blogs.title")} subtitle={t("blogs.subtitle")} />

      <div className="max-w-6xl mx-auto px-4 pt-8 pb-16">
        <div ref={ref} className={`blog-grid blog-grid-${gridLayout} ${inView ? "is-visible" : ""}`}>
          {blogVideos.map((video, index) => (
            <div key={video.id} className="blog-slot" style={{ "--i": index } as CSSProperties}>
              <BlogCard video={video} onOpen={() => setOpenIndex(index)} />
            </div>
          ))}
        </div>
      </div>

      <BlogPlayerModal
        videos={blogVideos}
        index={openIndex}
        onChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </div>
  );
};

export default Blogs;

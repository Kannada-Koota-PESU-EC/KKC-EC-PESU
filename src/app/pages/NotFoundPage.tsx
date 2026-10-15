import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { useLanguage } from "@/shared/i18n/useLanguage";
import PageHeader from "@/shared/components/layout/PageHeader";

/** Shown for any unknown URL (the router's catch-all route). */
const NotFound = () => {
  const location = useLocation();
  const { lang, t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh]">
      <PageHeader title="404" subtitle={t("notFound.message")} large />

      <div className="mx-auto flex max-w-xl flex-col items-center px-4 pb-24 pt-2 text-center">
        <p className={`text-[#bdb7aa] ${lang === "kn" ? "kannada-text" : ""}`}>{t("notFound.hint")}</p>
        <Link
          to="/"
          className={`mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 px-7 py-3 font-bold text-[#1a1a1a] shadow-[0_8px_22px_-10px_rgba(247,147,30,0.6)] transition-shadow hover:shadow-[0_10px_32px_-6px_rgba(247,147,30,0.75)] ${
            lang === "kn" ? "kannada-text" : ""
          }`}
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          {t("notFound.home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

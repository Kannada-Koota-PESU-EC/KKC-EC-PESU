import { useToast } from "@/shared/hooks/use-toast";
import { useLanguage } from "@/shared/i18n/useLanguage";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/shared/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();
  const { t } = useLanguage();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose aria-label={t("common.close")} />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

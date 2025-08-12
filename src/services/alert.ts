import { toast } from "sonner"

type ToastType = "success" | "error" | "warning" | "info" | "message";

export function showToast(message: string, description: string, duration: number = 2000, type: ToastType) {

  switch (type) {
    case "success":
      toast.success(message, { description, duration });
      break;
    case "error":
      toast.error(message, { description, duration });
      break;
    case "warning":
      toast.warning(message, { description, duration });
      break;
    case "info":
      toast.info(message, { description, duration });
      break;
    default:
      toast(message, { description, duration });
      break;
  }
}
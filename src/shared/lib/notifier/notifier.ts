import { toast, type ToastOptions } from 'react-toastify';

export class Notifier {
  static error(message: string, options?: ToastOptions): void {
    toast.error(message, options);
  }

  static info(message: string, options?: ToastOptions): void {
    toast.info(message, options);
  }

  static notify(message: string, options?: ToastOptions): void {
    toast(message, options);
  }

  static success(message: string, options?: ToastOptions): void {
    toast.success(message, options);
  }

  static warning(message: string, options?: ToastOptions): void {
    toast.warning(message, options);
  }
}

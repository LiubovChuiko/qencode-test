import {ToastPosition, toast} from 'react-toastify';
import {Detail} from 'lib/api/api-data-types';

export default class NotificationService {
  static notifyError = (
    message: Detail | undefined,
    autoClose: number = 5000,
    position: ToastPosition = 'top-center',
  ) => {
    toast.error(message, {
      position: position,
      autoClose: autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };

  static notifySuccess = (
    message: string | undefined,
    autoClose: number = 5000,
    position: ToastPosition = 'top-center',
  ) => {
    toast.success(message, {
      position: position,
      autoClose: autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };
}

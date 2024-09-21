import toast from 'react-hot-toast';

const toastConfig = {
  duration: 4000,
  position: 'top-right',
  // Add any additional global options here
};

export const showSuccessToast = (message) => {
  toast.success(message, toastConfig);
};

export const showWarningToast = (message) => {
  toast(message, {
    ...toastConfig,
    icon: '⚠️',
  });
};

export const showErrorToast = (message) => {
  toast.error(message, toastConfig);
};

export const showInfoToast = (message) => {
  toast(message, {
    ...toastConfig,
    icon: 'ℹ️',
  });
};

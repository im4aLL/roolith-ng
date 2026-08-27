export interface IToast {
  type: 'success' | 'error' | 'info';
  message: string;
  title: string;
  _id?: string;
  _isClosing?: boolean;
}

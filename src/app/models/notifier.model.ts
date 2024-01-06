export interface INotifier {
  active?: boolean;
  buttonAction?: (object: any) => void;
  content: string;
  duration?: number;
  hPosition?: 'center' | 'left' | 'right';
  status?;
  title: string;
  type?: 'success' | 'warning' | 'danger' | 'info';
  vPosition?: 'top' | 'bottom';
}

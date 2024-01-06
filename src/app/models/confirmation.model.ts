export interface IModalContent {
  icon: 'check' | 'exclamation' | 'times' | 'info-circle';
  text: string;
  title: string;
  type: 'success' | 'warning' | 'danger' | 'info';
}

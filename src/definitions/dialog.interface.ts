export enum DialogType {
  CONFIRM = 'confirm',
  ALERT = 'alert'
}

export interface GeneralDialogInterface {
  title: string;
  icon?: string;
  buttonsClass?: string;
  titleClass?: string;
  innerHtml?: boolean;
  message: string;
  confirmText: string;
  action: () => void;
}

export interface ConfirmModalInterface {
  title: string;
  message: string;
  type?: DialogType;
}

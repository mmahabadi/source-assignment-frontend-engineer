export type dataTableColumn = {
  prop: string;
  title: string;
  template?: (row: unknown) => JSX.Element;
};
export type dataTableAction = {
  label: string;
  onClick: (row: unknown) => void;
};
export type ToasterMessage = {
  id: number;
  message: string;
  type: ToasterType;
};

export enum ToasterType {
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

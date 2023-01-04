export interface Column {
  id: string;
  type: string;
  title: string;
  xType?: string;
  align?: string;
  fixed?: string;
  choices?: { key: string | boolean; value: string | number | boolean }[];
  choiceMap?: Record<string, any>;
  component?: string;
  bind?: Record<string, any>;
  related?: string;
  width?: number;
}
export interface Action {
  id?: string | number;
  icon?: string;
  iconSize?: string;
  text?: string;
  tooltip?: string;
  fontSize?: string;
  color?: string;
  background?: string;
  height?: string;
  width?: string;
  filter?: (item: any) => boolean;
}
export interface Sorter {
  column?: Column;
  columnKey: string;
  field: string;
  order?: "ascend" | "descend";
}

export interface AnyData {
  [key: string]: any;
}

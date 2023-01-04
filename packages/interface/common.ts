export interface TableData {
  name: string;
  id: number;
  [key: string]: any;
}
export interface TreeData {
  title: string;
  key: number;
  nodeId: string;
  data?: TableData;
  children?: TreeData[];
  isLeaf?: boolean;
}

export type SingleType = number | string | boolean | undefined | null;
export type ArrayType = SingleType[] | ArrayType[];
export interface AnyData {
  [key: string]: SingleType | ArrayType | AnyData;
}

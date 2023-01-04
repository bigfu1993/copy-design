import Core from "handsontable/core";
import { CellValue } from "handsontable/common";
import { CellProperties } from "handsontable/settings";

export interface GetOpts {
  ordering?: string;
  fields?: string;
  offset?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}

export interface TableColumn {
  data: string;
  readOnly?: boolean;
  type?: string;
  editor?: string | boolean;
  selectOptions?: string[];
  related?: string;
  source?: string[];
  sourceMap?: { [key: string]: number | string };
  xType?:
    | "text"
    | "number"
    | "select"
    | "foreign"
    | "boolean"
    | "date"
    | "time"
    | "datetime"
    | "array"
    | "image";
  rawType?: string;
  choices?: { key: string | number; value: string | number }[];
  cateOpts?: Record<string, any>;
  className?: string;
  dateFormat?: string;
  timeFormat?: string;
  correctFormat?: boolean;
  defaultDate?: string;
  datePickerConfig?: Record<string, any>;
  component?: string;
  bind?: Record<string, any>;
  renderer?(
    instance: Core,
    td: HTMLTableCellElement,
    row: number,
    col: number,
    prop: string | number,
    value: CellValue,
    cellProps: CellProperties
  ): HTMLTableCellElement;
}

export interface ModelField {
  id: string;
  type: string;
  name: string;
  related?: string;
  choices?: { key: number; value: string }[];
}

export interface ModelItem {
  id: string;
  name: string;
  fields: ModelField[];
}

export interface TreeNodeData {
  prev: string;
  next: string;
  data: any;
}

export interface ExpressionParam {
  different_phase_alarm: {
    enabled: boolean;
    threshold_type: 0 | 1;
    grade: {
      level1?: number;
      level2?: number;
      level3?: number;
      level4?: number;
    };
  };
  trend_alarm: {
    enabled: boolean;
    threshold_type: 0 | 1;
    duration: number;
    grade: {
      level1?: number;
      level2?: number;
      level3?: number;
      level4?: number;
    };
  };
  dead_zone_alarm: {
    enabled: boolean;
    frequency: number;
  };
  exceed_alarm: {
    enabled: boolean;
    threshold_type: 0 | 1;
    normal?: { lower_value: number; upper_value: number };
    grade: {
      level1?: { lower_value: number; upper_value: number };
      level2?: { lower_value: number; upper_value: number };
      level3?: { lower_value: number; upper_value: number };
      level4?: { lower_value: number; upper_value: number };
    };
  };
  inconsistency_alarm: {
    enabled: boolean;
    threshold_type: 0 | 1;
    threshold: number;
  };
  customize_alarm: {
    enabled: boolean;
    threshold_type: 0 | 1;
    grade: {
      level1?: { lower_value: number; upper_value: number };
      level2?: { lower_value: number; upper_value: number };
      level3?: { lower_value: number; upper_value: number };
      level4?: { lower_value: number; upper_value: number };
    };
  };
  PD_alarm: {
    enabled: boolean;
    threshold_type: 0 | 1;
    ultrasonic_wave: {
      level1?: { lower_value: number; upper_value: number };
      level2?: { lower_value: number; upper_value: number };
      level3?: { lower_value: number; upper_value: number };
      level4?: { lower_value: number; upper_value: number };
    };
    ground_voltage: {
      level1?: { lower_value: number; upper_value: number };
      level2?: { lower_value: number; upper_value: number };
      level3?: { lower_value: number; upper_value: number };
      level4?: { lower_value: number; upper_value: number };
    };
    ultrahigh_frequency: {
      level1?: { lower_value: number; upper_value: number };
      level2?: { lower_value: number; upper_value: number };
      level3?: { lower_value: number; upper_value: number };
      level4?: { lower_value: number; upper_value: number };
    };
  };
}

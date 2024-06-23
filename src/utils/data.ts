import type { ColumnsType } from "antd/es/table";
import type { ComponentType, FormList } from "../types/form";
import { arrToStr } from "./helper";

interface DatabaseType {
  key: string;
  component: ComponentType;
}

// 数据库类型
export const databaseType: DatabaseType[] = [
  { key: 'varchar', component: 'Input' },
  { key: 'int', component: 'InputNumber' },
]

// 模板数据
export const modelData = (formData: FormList[], tableData: ColumnsType) => {
  return `
import type { FormList } from "#/form";
import type { TableColumn, TableOptions } from '#/public';

// 搜索数据
export const searchList = (): FormList[] => ${arrToStr(formData)};

// 表格数据
export const tableColumns = (): TableColumn => ${arrToStr(tableData)};

// 新增数据
export const createList = (): FormList[] => ${arrToStr(formData)};
`
}

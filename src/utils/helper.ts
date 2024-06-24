import type { ColumnsType } from "antd/es/table";
import type { ComponentProps, ComponentType, FormList } from "../types/form";
import { databaseType, modelData } from "./data";
import fs from 'fs-extra';

// 获取key值
export const getKey = (row: string) => {
  if (!row) return '';
  const start = row.indexOf('`') + 1
  const end = row.indexOf('`', start)
  return row.substring(start, end)
}

// 获取名称
export const getLabel = (row: string) => {
  if (!row) return '';

  const first = row.indexOf('COMMENT')
  const start = row.indexOf('\'', first) + 1
  const end = row.indexOf('\'', start)
  return row.substring(start, end)
}

// 获取类型对应组件
export const getComponent = (row: string): ComponentType => {
  if (!row) return 'Input'

  for (let i = 0; i < databaseType?.length; i++) {
    const item = databaseType[i];
    
    if (row.includes(item.key)) {
      return item.component
    }
  }

  return 'Input'
}

// 获取组件对应参数
export const getComponentProps = (component: ComponentType): ComponentProps | undefined => {
  switch (component) {
    case 'Select':
      return {
        options: []
      }

    case 'InputNumber':
      return {
        min: 0
      }

    default:
      return undefined
  }
}

// 将数组数据转成字符串
export const arrToStr = (arr: unknown[]) => {
  const content = JSON.stringify(arr, null, 2)
  let result = '', left = 0, right = 0

  while (left <= content.length) {
    if (content[left] === '"') {
      right = content.indexOf('"', left + 1)

      // 如果结尾的下一位不是冒号，则跳过
      if (content[right + 1] !== ':') {
        if (content[left]) result += content[left]
        left++
        continue
      }

      result += content.substring(left + 1, right)
      left = right + 1
      continue
    }

    if (content[left]) result += content[left]
    left++
  }

  return result.replace(new RegExp('"', 'g'), "'")
}

// 获取本地txt文件数组
export const getTxtArr = () => {
  const content = fs.readFileSync('./src/data.txt', { encoding: 'utf-8' })
  const arr = content.split('\n')
  return arr
}

// 写入本地model文件
export const writeModel = (formData: FormList[], tableData: ColumnsType) => {
  const modelFile = './dist/model.tsx'
  const hasFile = fs.existsSync(modelFile)

  // 如果存在则删除
  if (hasFile) {
    fs.removeSync(modelFile)
  }

  const content = modelData(formData, tableData)

  fs.outputFileSync(modelFile, content)
}
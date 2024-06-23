import type { FormList } from './types/form';
import type { ColumnsType } from 'antd/es/table';
import {
  getComponent,
  getComponentProps,
  getKey,
  getLabel,
  getTxtArr,
  writeModel
} from './utils/helper';

function main() {
  const formResult: FormList[] = []
  const tableResult: ColumnsType = []
  const arr = getTxtArr()

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const key = getKey(item)
    const label = getLabel(item)
    const component = getComponent(item)
    const componentProps = getComponentProps(component)

    tableResult.push({
      title: label,
      dataIndex: key,
      width: 150
    })

    formResult.push({
      label,
      name: key,
      component,
      componentProps
    })
  }

  // 写入数据
  writeModel(formResult, tableResult)
}

main()
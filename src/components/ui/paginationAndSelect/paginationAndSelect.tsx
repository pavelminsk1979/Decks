import { Pagination } from '../pagination'
import { SelectControl } from '../select'

import st from './paginationAndSelect.module.scss'

export const PaginationAndSelect = () => {
  const handlerOnChange = (page: number) => {
    alert(`это от компоненты PaginationAndSelect ${page}`)
  }
  const stateSelectItems = [
    { value: '1', text: '10' },
    { value: '2', text: '20' },
    { value: '3', text: '30' },
    { value: '4', text: '50' },
    { value: '5', text: '100' },
  ]
  let widthBlockSelector = 80
  let headerSelector = '100'
  const handlerOnValueChange = (value: number | undefined) => {
    alert(value ? `это значение из компоненты PaginationAndSelect ${value}` : 'underfined')
  }

  return (
    <div className={st.common}>
      <Pagination count={1000} page={1} onChange={handlerOnChange} />

      <div className={st.blockSeleckWithWords}>
        Показать
        <SelectControl
          onValueChange={handlerOnValueChange}
          headerSelector={headerSelector}
          widthBlockSelector={widthBlockSelector}
          stateSelectItems={stateSelectItems}
        />
        на странице
      </div>
    </div>
  )
}

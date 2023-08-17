import { useState } from 'react'

import { IconArrow } from '../../../assets/icons/iconArrow.tsx'
import { SelectControl } from '../select'

import st from './paginationSamurai.module.scss'

type PropsType = {
  amountDecksInOnePage: number
  allElements?: number
  setCurrentPage: (currentPage: number) => void
  valueCurrentPage: number
  setAmountElementsInOnePage: (amountElementsInOnePage: number) => void
}
export const PaginationSamurai = ({
  allElements,
  setCurrentPage,
  valueCurrentPage,
  setAmountElementsInOnePage,
  amountDecksInOnePage,
}: PropsType) => {
  const stateSelectItems = [
    { value: '1', text: '5' },
    { value: '2', text: '8' },
    { value: '3', text: '10' },
    { value: '4', text: '12' },
    { value: '5', text: '15' },
  ]
  let widthBlockSelector = 80

  const handlerOnValueChange = (amountElementsInOnePage: number) => {
    setAmountElementsInOnePage(amountElementsInOnePage)
  }

  let amountPages = 0

  if (allElements) {
    amountPages = Math.ceil(allElements / amountDecksInOnePage)
  }
  let maxPart = amountPages / 10

  let arrayNumbers = []

  for (let i = 1; i <= amountPages; i++) {
    arrayNumbers.push(i)
  }

  const onClickHandler = (currentPage: number) => {
    setCurrentPage(currentPage)
  }

  const [part, setPart] = useState(1)
  const sizeOnePart = 10 /* размер одной части кнопок*/
  const numberStartPart = (part - 1) * sizeOnePart + 1
  const numberFinishPart = part * sizeOnePart

  const fetchActivePageHandler = (numberPage: number) => {
    numberPage
  }

  const onClickReturnPart = () => {
    if (part !== 1) {
      setPart(part - 1)
      fetchActivePageHandler((part - 1) * sizeOnePart)
    }
  }

  const onClickNextPart = () => {
    if (part < maxPart) setPart(part + 1)
    fetchActivePageHandler(part * sizeOnePart + 1)
  }

  /*  console.log(amountDecksInOnePage)*/

  return (
    <div className={st.common}>
      <div className={st.arrow} onClick={onClickReturnPart}>
        <IconArrow width="28" height="28" />
      </div>

      {arrayNumbers
        .filter(el => el >= numberStartPart && el <= numberFinishPart)
        .map(el => {
          return (
            <span
              key={el}
              onClick={() => onClickHandler(el)}
              className={el === valueCurrentPage ? st.activeNumber : st.number}
            >
              {el}
            </span>
          )
        })}

      <div className={st.arrow} onClick={onClickNextPart}>
        <IconArrow width="28" height="28" style={{ transform: 'rotate(180deg)' }} />
      </div>

      <div className={st.blockSeleckWithWords}>
        Показать
        <SelectControl
          onValueChange={handlerOnValueChange}
          headerSelector={String(amountDecksInOnePage)}
          widthBlockSelector={widthBlockSelector}
          stateSelectItems={stateSelectItems}
          amountDecksInOnePage={amountDecksInOnePage}
        />
        на странице
      </div>
    </div>
  )
}

/*

import st from './pagination.module.scss'
import {useState} from "react";

type PropsType = {
    allElements:number
    /!*   numberPageWithServer: number
       countItemsForOnePage: number
       countWithServerItems: number
       idCurrentPack?: string*!/
}
export const Paginator = ({allElements}: PropsType) => {


    let amountPages = Math.ceil(allElements / 10)
    /!* количество страниц   *!/


    let arrayNumbers = []  /!*чтобы отрисовать кнопки---их надо в масив поместить- каждая кнопка покажет группу из 10 элементов*!/
    for (let i = 1; i <= amountPages; i++) {
        arrayNumbers.push(i)
    }

    const onClickHandler = (el:any) => {
        el  /!*Тут запрос на сервер за ГРУППОЙ ЭЛЕМЕНТОВ на номер которой нажал ... и плюс  можно запросить-СКОЛЬКО В ОДНОЙ ГРУППЕ БУДЕТ*!/
    }



    {/!* чтоб не было всех кнопок *!/}
    const sizeOnePart = 10 /!* размер одной части кнопок*!/
    {/!* чтоб не было всех кнопок *!/}
    const [part, setPart] = useState(1)

    const numberStartPart = (part - 1) * sizeOnePart + 1
    const numberFinishPart = part * sizeOnePart
    /!*    у порции есть первое число с которой порция начинается
    и последнее число которым порция заканчивается*!/

    const fetchActivePageHandler = (numberPage: number) => {
        numberPage  /!* это номер страницы и ДЕЛАЕТСЯ ЗАПРОС НА СЕРВЕР за ней .....когда на стрелку нажал то пошел запрос за следующими страницами *!/

    }

    {/!* чтоб не было всех кнопок *!/}
    const onClickReturnPart = () => {
        if(part!==1){
            setPart(part - 1)
            fetchActivePageHandler((part - 1) * sizeOnePart)
        }
    }

    {/!* чтоб не было всех кнопок  ...когда на стрелку нажал то
    вычисляется страница---добавляется плюс ОДНА*!/}
    const onClickNextPart = () => {
        setPart(part + 1)
        fetchActivePageHandler((part) * sizeOnePart + 1)
    }


    return (
        <div>
            {/!* чтоб не было всех кнопок *!/}
            <div onClick={onClickReturnPart}> %%% </div>

            {
                arrayNumbers.filter(el => el >= numberStartPart && el <= numberFinishPart).map(el => {
                    return (
                        <span key={el}
                              onClick={() => onClickHandler(el)}
                              className={false
                                  ? st.activeNumber
                                  : st.number
                              }>{el}</span>
                        /!* Для выделения кнопки той станицы на которой нахожусь
                         условие будет такое ----page===el---если с сервера приходящий номер
                         станицы равен  текущей цифре тогда стиль добавить*!/
                    )
                })
            }
            {/!* чтоб не было всех кнопок *!/}
            <div onClick={onClickNextPart}>@@@</div>

        </div>
    )
}*/

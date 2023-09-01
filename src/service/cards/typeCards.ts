export type CardsType = {
  pagination: CardsPaginationType
  items: CardsItemsType[]
}
export type CardsPaginationType = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}
export type CardsItemsType = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg: string
  answerImg: string
  questionVideo?: any
  answerVideo?: any
  created: string
  updated: string
  shots: number
  grade: number
  userId: string
}
export type ResponceCreateCardType = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  questionImg?: any
  answerImg?: any
  answerVideo?: any
  questionVideo?: any
  comments?: any
  type?: any
  rating: number
  moreId?: any
  created: string
  updated: string
}
export type CreateCardType = {
  id: string
  body: {
    question: string
    answer: string
  }
}

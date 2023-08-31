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

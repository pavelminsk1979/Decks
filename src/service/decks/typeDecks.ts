export type DecksType = {
  maxCardsCount: number
  pagination: DecksPaginationType
  items: DecksItemsType[]
}
export type DecksPaginationType = {
  totalPages: number //Всего страниц(на каждой сколькото колод)
  currentPage: number // текущая страница(от пагинатора идет она)
  itemsPerPage: number //количество колод на одной  пришедшей  странице
  totalItems: number // общее количество колод на сервере
}
export type DecksItemsAuthorType = {
  id: string
  name: string
}
export type DecksItemsType = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: string | null
  rating: number
  isDeleted?: boolean
  isBlocked?: boolean
  created: string
  updated: string
  cardsCount: number
  author: DecksItemsAuthorType
}
export type deleteDecksResponseType = Omit<DecksItemsType, 'author'>

export type ArgsGetDecksResponseType = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string | null
  currentPage?: number
  itemsPerPage?: number
  currentNameDack?: string
  currentGradeCard?: number
}

export type ArgEditType = {
  id: string
  name: string
}

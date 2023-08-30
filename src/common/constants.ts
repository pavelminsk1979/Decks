type DataHeaderType = {
  key: string
  title: string
}
export const DATA_HEADERS_TABLE: DataHeaderType[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    title: 'Created by',
  },
]

type ItemTabType = {
  id: string
  name: string
}

export const DATA_TAB_PANEL: ItemTabType[] = [
  { id: 'tab1', name: 'My Cards' },
  { id: 'tab2', name: 'All Cards' },
]

export const DATA_HEADERS_TABLE_CARDS: DataHeaderType[] = [
  {
    key: 'question',
    title: 'Question',
  },
  {
    key: 'answer',
    title: 'Answer',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    title: 'Grade',
  },
]

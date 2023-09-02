import { DeleteIcon } from '../../../../../assets/icons/deleteIcon.tsx'
import { Modal } from '../../../../../components/ui'
import { useDeleteCardsMutation } from '../../../../../service/cards/serveceCards.ts'

type PropsType = {
  questionCard: string
  cardId: string
}
export const ModalDeleteCard = ({ questionCard, cardId }: PropsType) => {
  const [deleteCard] = useDeleteCardsMutation()
  const handlerOnClickModalDeleteCard = () => {
    deleteCard(cardId)
  }

  return (
    <Modal
      icon={<DeleteIcon />}
      sizeWidthModal={'540px'}
      sizeHeightModal={'230px'}
      titleModal={'Delete Deck'}
      titleButtonExecutor={'Delete Deck'}
      handlerOnClick={handlerOnClickModalDeleteCard}
    >
      Do you really want to remove Card with question - {questionCard}? This card will be
      permanently deleted.
    </Modal>
  )
}

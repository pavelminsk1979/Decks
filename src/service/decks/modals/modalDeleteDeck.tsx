import { DeleteIcon } from '../../../assets/icons/deleteIcon.tsx'
import { Modal } from '../../../components/ui'

type PropsType = {
  handlerOnClickModalDeleteDeck: () => void
  nameDeck: string
}
export const ModalDeleteDeck = ({ handlerOnClickModalDeleteDeck, nameDeck }: PropsType) => {
  return (
    <Modal
      icon={<DeleteIcon />}
      sizeWidthModal={'540px'}
      sizeHeightModal={'230px'}
      titleModal={'Delete Deck'}
      titleButtonExecutor={'Delete Deck'}
      handlerOnClick={handlerOnClickModalDeleteDeck}
    >
      Do you really want to remove Deck - {nameDeck}? This deck will be permanently deleted.
    </Modal>
  )
}

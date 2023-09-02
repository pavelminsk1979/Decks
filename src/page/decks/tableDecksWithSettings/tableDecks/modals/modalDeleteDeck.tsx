import { DeleteIcon } from '../../../../../assets/icons/deleteIcon.tsx'
import { Modal } from '../../../../../components/ui'
import { useDeleteDecksMutation } from '../../../../../service/decks/serveceDecks.ts'

type PropsType = {
  nameDeck: string
  idDeck: string
}
export const ModalDeleteDeck = ({ idDeck, nameDeck }: PropsType) => {
  const [deleteDeck] = useDeleteDecksMutation()
  const handlerOnClickModalDeleteDeck = () => {
    deleteDeck(idDeck)
  }

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

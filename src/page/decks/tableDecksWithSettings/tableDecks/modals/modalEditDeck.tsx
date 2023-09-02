import { useState } from 'react'

import { EditIcon } from '../../../../../assets/icons/editIcon.tsx'
import { Modal, TextField } from '../../../../../components/ui'
import { useEditDecksMutation } from '../../../../../service/decks/serveceDecks.ts'

type PropsType = {
  deckId: string
}
export const ModalEditDeck = ({ deckId }: PropsType) => {
  const [editDeck] = useEditDecksMutation()
  const [valueInput, setValueInput] = useState('')
  const handlerCloseModalEditDec = () => {
    setValueInput('')
  }
  const handlerOnClickModalEditDeck = () => {
    const arg = { id: deckId, name: valueInput }

    editDeck(arg)
    setValueInput('')
  }

  return (
    <Modal
      icon={<EditIcon />}
      sizeWidthModal={'540px'}
      sizeHeightModal={'290px'}
      titleModal={'Edit Deck'}
      titleButtonExecutor={'Edit Deck'}
      handlerOnClick={handlerOnClickModalEditDeck}
      handlerCloseModal={handlerCloseModalEditDec}
    >
      <TextField
        sizeWidthTextField="480px"
        valueInput={valueInput}
        setValueInput={setValueInput}
        placeholder={'Name'}
        label={'Name Deck'}
        type="email"
      />
    </Modal>
  )
}

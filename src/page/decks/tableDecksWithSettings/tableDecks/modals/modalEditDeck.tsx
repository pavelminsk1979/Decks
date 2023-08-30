import { useState } from 'react'

import { EditIcon } from '../../../../../assets/icons/editIcon.tsx'
import { Modal, TextField } from '../../../../../components/ui'

type PropsType = {
  OnClickModalEditDeck: (valueInput: string) => void
}
export const ModalEditDeck = ({ OnClickModalEditDeck }: PropsType) => {
  const [valueInput, setValueInput] = useState('')
  const handlerCloseModalEditDec = () => {
    setValueInput('')
  }
  const handlerOnClickModalEditDeck = () => {
    OnClickModalEditDeck(valueInput)
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

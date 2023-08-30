import { useState } from 'react'

import { Modal, TextField } from '../../../../components/ui'

type PropsType = {
  onClickModalCreateDeck: (valueInput: string) => void
}
export const ModalCreateDeck = ({ onClickModalCreateDeck }: PropsType) => {
  const [valueInput, setValueInput] = useState('')
  const handlerOnClickModalCreateDeck = () => {
    onClickModalCreateDeck(valueInput)
    setValueInput('')
  }
  const handlerCloseModal = () => {
    setValueInput('')
  }

  return (
    <Modal
      titleButtonOpenModal={'Add New Deck'}
      sizeWidthModal={'540px'}
      sizeHeightModal={'290px'}
      titleModal={'Add New Deck'}
      titleButtonExecutor={'Add New Deck'}
      handlerOnClick={handlerOnClickModalCreateDeck}
      handlerCloseModal={handlerCloseModal}
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

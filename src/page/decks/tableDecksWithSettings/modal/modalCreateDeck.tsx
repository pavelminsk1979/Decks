import { useState } from 'react'

import { Modal, TextField } from '../../../../components/ui'

type PropsType = {
  onClickModalCreateDeck: (valueInputModalCreateDeck: string) => void
}
export const ModalCreateDeck = ({ onClickModalCreateDeck }: PropsType) => {
  const [valueInputModalCreateDeck, setValueInputModalCreateDeck] = useState('')
  const handlerOnClickModalCreateDeck = () => {
    onClickModalCreateDeck(valueInputModalCreateDeck)
    setValueInputModalCreateDeck('')
  }
  const handlerCloseModal = () => {
    setValueInputModalCreateDeck('')
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
        valueInput={valueInputModalCreateDeck}
        setValueInput={setValueInputModalCreateDeck}
        placeholder={'Name'}
        label={'Name Deck'}
        type="email"
      />
    </Modal>
  )
}

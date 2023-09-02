import { useState } from 'react'

import { EditIcon } from '../../../../../assets/icons/editIcon.tsx'
import { Modal, TextField } from '../../../../../components/ui'
import { useEditCardsMutation } from '../../../../../service/cards/serveceCards.ts'

type PropsType = {
  cardId: string
}
export const ModalEditCard = ({ cardId }: PropsType) => {
  const [editCard] = useEditCardsMutation()
  const [valueInputQuestion, setValueInputQuestion] = useState('')
  const [valueInputAnswer, setValueInputAnswer] = useState('')
  const handlerCloseModalEditCard = () => {
    setValueInputQuestion('')
    setValueInputAnswer('')
  }
  const handlerOnClickModalEditCard = () => {
    const arg = { id: cardId, question: valueInputQuestion, answer: valueInputAnswer }

    editCard(arg)
    setValueInputQuestion('')
    setValueInputAnswer('')
  }

  return (
    <Modal
      icon={<EditIcon />}
      sizeWidthModal={'540px'}
      sizeHeightModal={'370px'}
      titleModal={'Edit Deck'}
      titleButtonExecutor={'Edit Deck'}
      handlerOnClick={handlerOnClickModalEditCard}
      handlerCloseModal={handlerCloseModalEditCard}
    >
      <TextField
        sizeWidthTextField="480px"
        valueInput={valueInputQuestion}
        setValueInput={setValueInputQuestion}
        label={'Question'}
        type="email"
      />
      <TextField
        sizeWidthTextField="480px"
        valueInput={valueInputAnswer}
        setValueInput={setValueInputAnswer}
        label={'Answer'}
        type="email"
      />
    </Modal>
  )
}

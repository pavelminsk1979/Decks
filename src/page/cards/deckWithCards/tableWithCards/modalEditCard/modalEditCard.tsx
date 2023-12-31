import { useState } from 'react'

import { EditIcon } from '../../../../../assets/icons/editIcon.tsx'
import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch.ts'
import { Modal, TextField } from '../../../../../components/ui'
import { authActions } from '../../../../../service/auth/authSlice.ts'
import { useEditCardsMutation } from '../../../../../service/cards/serveceCards.ts'

type PropsType = {
  cardId: string
  curentQuestion: string
  currentAnswer: string
}
export const ModalEditCard = ({ cardId, curentQuestion, currentAnswer }: PropsType) => {
  const dispatch = useAppDispatch()
  const [editCard] = useEditCardsMutation()
  const [valueInputQuestion, setValueInputQuestion] = useState(curentQuestion)
  const [valueInputAnswer, setValueInputAnswer] = useState(currentAnswer)
  const handlerCloseModalEditCard = () => {
    setValueInputQuestion('')
    setValueInputAnswer('')
  }
  const handlerOnClickModalEditCard = () => {
    const arg = { id: cardId, question: valueInputQuestion, answer: valueInputAnswer }

    editCard(arg)
      .unwrap()
      .catch(err => {
        dispatch(authActions.setCurrentError({ currentError: err.data.errorMessages[0].message }))
      })
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

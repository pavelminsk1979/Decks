import { useState } from 'react'

import { useAppDispatch } from '../../../common/hooks/useAppDispatch.ts'
import { Modal, TextField } from '../../../components/ui'
import { authActions } from '../../../service/auth/authSlice.ts'
import { useCreateCardsMutation } from '../../../service/cards/serveceCards.ts'

type PropsType = {
  id: string
}

export const ModalCreateCard = ({ id }: PropsType) => {
  const dispatch = useAppDispatch()
  const [createCard] = useCreateCardsMutation()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const handlerOnClickModalCreateCard = () => {
    let body = { question, answer }

    if (id !== undefined) {
      createCard({ id, body })
        .unwrap()
        .catch(err => {
          dispatch(authActions.setCurrentError({ currentError: err.data.errorMessages[0].message }))
        })
    }
    setQuestion('')
    setAnswer('')
  }
  const handlerCloseModal = () => {
    setQuestion('')
    setAnswer('')
  }

  return (
    <Modal
      titleButtonOpenModal={'Add New Card'}
      sizeWidthModal={'540px'}
      sizeHeightModal={'375px'}
      titleModal={'Add New Card'}
      titleButtonExecutor={'Add New Card'}
      handlerOnClick={handlerOnClickModalCreateCard}
      handlerCloseModal={handlerCloseModal}
    >
      <TextField
        sizeWidthTextField="480px"
        valueInput={question}
        setValueInput={setQuestion}
        label={'Question'}
        type="email"
      />
      <TextField
        sizeWidthTextField="480px"
        valueInput={answer}
        setValueInput={setAnswer}
        label={'Answer'}
        type="email"
      />
    </Modal>
  )
}

import { useState } from 'react'

import { EditIcon } from '../../../../../assets/icons/editIcon.tsx'
import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch.ts'
import { Modal, TextField } from '../../../../../components/ui'
import { authActions } from '../../../../../service/auth/authSlice.ts'
import { useEditDecksMutation } from '../../../../../service/decks/serveceDecks.ts'

type PropsType = {
  deckId: string
  curentNameDack: string
}
export const ModalEditDeck = ({ deckId, curentNameDack }: PropsType) => {
  const dispatch = useAppDispatch()
  const [editDeck] = useEditDecksMutation()
  const [valueInput, setValueInput] = useState(curentNameDack)
  const handlerCloseModalEditDec = () => {
    setValueInput('')
  }
  const handlerOnClickModalEditDeck = () => {
    const arg = { id: deckId, name: valueInput }

    editDeck(arg)
      .unwrap()
      .catch(err => {
        dispatch(authActions.setCurrentError({ currentError: err.data.errorMessages[0].message }))
        console.log(err)
      })
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

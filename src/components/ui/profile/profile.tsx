import { useNavigate } from 'react-router-dom'

import iconUser from '../../../../src/assets/icons/iconUser.png'
import { IconArrowBack } from '../../../assets/icons/iconArrowBack.tsx'
import { IconEdit } from '../../../assets/icons/iconEdit.tsx'
import { Logout } from '../../../assets/icons/iconLogOut.tsx'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch.ts'
import { authActions } from '../../../service/auth/authSlice.ts'
import { useLogoutMutation } from '../../../service/auth/serverceAuth.ts'
import { Button } from '../button'
import { CardComponent } from '../cardComponent'
import { Typography } from '../typography'

import st from './profile.module.scss'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const [logout, {}] = useLogoutMutation()
  const navigate = useNavigate()
  const handlerOnClick = () => {
    logout()
      .unwrap()
      .then(() => {
        dispatch(authActions.setValueIsLoggedIn({ value: false }))
        navigate('/login')
      })
  }
  const handlerOnClickEditAvatar = () => {
    alert(
      'Я предположу что изменение аватарки это 1) выбрать некую картинку у себя из фоток. 2) сжать изображение. 3) эту картинку отправить на сервер. 4) придет положительный ответ и поместить картину на данное место'
    )
  }
  const handlerOnClickEditName = () => {
    navigate('/editProfile')
  }
  const name = 'Ivan'
  const address = 'someadress@mail.ru'
  const handlerOnClickArrowBack = () => {
    navigate('/decks')
  }

  return (
    <div>
      <div className={st.blockArrowBack} onClick={handlerOnClickArrowBack}>
        <IconArrowBack />
        <Typography variant={'body2'}>Back to Packs List</Typography>
      </div>
      <div className={st.main}>
        <CardComponent className={st.card}>
          <Typography variant="large">Personal Information</Typography>
          <div className={st.blockUserAndIcon}>
            <img className={st.iconUser} src={iconUser} />
            <IconEdit onClick={handlerOnClickEditAvatar} className={st.iconEdit} />
          </div>
          <div className={st.blockNameAndIcon}>
            <Typography variant="h1">{name}</Typography>
            <IconEdit onClick={handlerOnClickEditName} width="20" height="20" />
          </div>
          <Typography className={st.address} variant="body2">
            {address}
          </Typography>
          <Button variant={'secondary'} onClick={handlerOnClick}>
            <Logout width="23" height="23" />
            Logout
          </Button>
        </CardComponent>
      </div>
    </div>
  )
}

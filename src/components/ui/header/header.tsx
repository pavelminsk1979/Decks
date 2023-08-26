import { useNavigate } from 'react-router-dom'

import { IncubatorIcon } from '../../../assets/icons/iconIncubator.tsx'
import { Logout } from '../../../assets/icons/iconLogOut.tsx'
import { IconMyProfile } from '../../../assets/icons/iconMyProfile.tsx'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch.ts'
import { authActions } from '../../../service/auth/authSlice.ts'
import { useLogoutMutation } from '../../../service/auth/serverceAuth.ts'
import { Button } from '../button'
import { DropDownComponent } from '../dropDownComponent'
import { NameAndAvatarComponent } from '../nameAndAvatarComponent'

import st from './header.module.scss'

type PropsType = {
  isLoggedIn: boolean
  handlerOnClick: () => void
}
export const Header = ({ isLoggedIn, handlerOnClick }: PropsType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [logout, {}] = useLogoutMutation()
  const functon1 = () => {
    navigate('/profile')
  }
  const functon2 = () => {
    logout()
      .unwrap()
      .then(() => {
        dispatch(authActions.setValueIsLoggedIn({ value: false }))
        navigate('/login')
      })
  }

  const data = [
    {
      id: 1,
      icon: <IconMyProfile width="22" height="22" />,
      name: 'My Profile',
      callback: functon1,
    },
    { id: 2, icon: <Logout width="20" height="20" />, name: 'Logout', callback: functon2 },
  ]
  let iconUser
  const dataHeader = {
    icon: <img src={iconUser} style={{ height: '50px' }} />,
    name: 'Павел',
    gmail: 'p&pavel@gmail.com',
  }

  return (
    <div className={st.common}>
      <div className={st.block}>
        <div>
          <div>
            <IncubatorIcon width="200" height="50" />
          </div>
        </div>

        {isLoggedIn ? (
          <DropDownComponent
            data={data}
            dataHeader={dataHeader}
            component={<NameAndAvatarComponent />}
          />
        ) : (
          <Button onClick={handlerOnClick}>Sing Up</Button>
        )}
      </div>
    </div>
  )
}

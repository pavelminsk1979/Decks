import iconUser from '../../../assets/icons/iconUser.png'
import { Typography } from '../typography'

import st from './nameAndAvatarComponent.module.scss'

export const NameAndAvatarComponent = () => {
  return (
    <div className={st.nameAndAvatar}>
      <Typography className={st.name} variant="subtitle1">
        Pavel
      </Typography>
      <img className={st.icon} src={iconUser} />
    </div>
  )
}

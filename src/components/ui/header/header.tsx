import { IncubatorIcon } from '../../../assets/icons/iconIncubator.tsx'
import { Button } from '../button'
import { NameAndAvatarComponent } from '../nameAndAvatarComponent'

import st from './header.module.scss'

type PropsType = {
  isLoggedIn: boolean
  handlerOnClick: () => void
}
export const Header = ({ isLoggedIn, handlerOnClick }: PropsType) => {
  return (
    <div className={st.common}>
      <div className={st.block}>
        <div>
          <div>
            <IncubatorIcon width="200" height="50" />
          </div>
        </div>

        {isLoggedIn ? (
          <NameAndAvatarComponent />
        ) : (
          <Button onClick={handlerOnClick}>Sing in</Button>
        )}
      </div>
    </div>
  )
}

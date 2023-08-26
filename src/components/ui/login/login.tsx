import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { z } from 'zod'

import { ControlCheckbox2 } from '../../../common/controlCheckbox2/controlCheckbox2.tsx'
import { ControlTextField } from '../../../common/controlTextField/controlTextField.tsx'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch.ts'
import { authActions } from '../../../service/auth/authSlice.ts'
import { useLoginMutation } from '../../../service/auth/serverceAuth.ts'
import { RootState } from '../../../service/store.ts'
import { Button } from '../button'
import { CardComponent } from '../cardComponent'
import { Typography } from '../typography'

import st from './login.module.scss'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  rememberMe: z.boolean().default(false),
})

export type FormLoginType = z.infer<typeof loginSchema>
export const Login = () => {
  const dispatch = useAppDispatch()
  const [login, {}] = useLoginMutation()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const { handleSubmit, control } = useForm<FormLoginType>({
    resolver: zodResolver(loginSchema),
  })
  const handlerOnSubmit = (data: FormLoginType) => {
    login(data)
      .unwrap()
      .then(res => {
        dispatch(authActions.setValueIsLoggedIn({ value: true }))
      })
  }

  if (isLoggedIn) {
    return <Navigate to={'/decks'} />
  }

  return (
    <div className={st.main}>
      <form onSubmit={handleSubmit(handlerOnSubmit)}>
        <DevTool control={control} />
        <CardComponent className={st.common}>
          <Typography className={st.singIn} variant="large">
            Sing In
          </Typography>
          <ControlTextField
            sizeWidthTextField="21.75rem"
            label="email"
            placeholder="Email"
            type="email"
            name="email"
            control={control}
          />
          <ControlTextField
            sizeWidthTextField="21.75rem"
            label="password"
            placeholder="Password"
            type="password"
            name="password"
            control={control}
          />
          <ControlCheckbox2 label="Remember  me" name="rememberMe" control={control} />
          <Typography className={st.forgotPassword} variant="body2">
            <Link to={'/register'}>Forgot Password?</Link>
          </Typography>
          <Button className={st.button} type={'submit'} fullWidth={true}>
            Sing In
          </Button>
          <Typography className={st.text} variant="body2">
            Don&rsquo;t have an account?
          </Typography>
          <Typography className={st.singUp} variant="subtitle1">
            <Link to={'/register'}>Sing Up</Link>
          </Typography>
        </CardComponent>
      </form>
    </div>
  )
}

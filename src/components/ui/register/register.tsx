import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { ControlTextField } from '../../../common/controlTextField/controlTextField.tsx'
import { useRegisterMutation } from '../../../service/auth/serverceAuth.ts'
import { Button } from '../button'
import { CardComponent } from '../cardComponent'
import { Typography } from '../typography'

import st from './register.module.scss'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  name: z.string().min(1),
})

export type FormRegisterType = z.infer<typeof loginSchema>
export const Register = () => {
  const [register, {}] = useRegisterMutation()
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm<FormRegisterType>({
    resolver: zodResolver(loginSchema),
  })

  const handlerOnSubmit = (data: any) => {
    register(data)
      .unwrap()
      .then(() => {
        navigate('/login')
      })
  }

  return (
    <div className={st.main}>
      <form onSubmit={handleSubmit(handlerOnSubmit)} noValidate>
        <DevTool control={control} />
        <CardComponent className={st.common}>
          <Typography className={st.singIn} variant="large">
            Sing Up
          </Typography>
          <ControlTextField
            sizeWidthTextField="21.75rem"
            label="Name"
            placeholder="Name"
            type="email"
            name="name"
            control={control}
          />
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
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
            control={control}
          />

          <Button className={st.button} type={'submit'} fullWidth={true}>
            Sing Up
          </Button>
          <Typography className={st.text} variant="body2">
            Already have an account?
          </Typography>
          <Typography className={st.singUp} variant="subtitle1">
            <Link to={'/'}>Sing In</Link>
          </Typography>
        </CardComponent>
      </form>
    </div>
  )
}

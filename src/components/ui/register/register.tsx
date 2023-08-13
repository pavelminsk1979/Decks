import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { ControlTextField } from '../../../common/controlTextField/controlTextField.tsx'
import { Button } from '../button'
import { CardComponent } from '../cardComponent'
import { Typography } from '../typography'

import st from './register.module.scss'

const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        message: 'Passwords do not match',
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
      })
    }

    return data
  })

// ctx. data - это объект, содержащий значения всех полей формы, которые будут проверяться на валидность. ctx - это объект, который предоставляет методы для добавления ошибок валидации.

type FormLoginType = z.infer<typeof loginSchema>
export const Register = () => {
  const { handleSubmit, control } = useForm<FormLoginType>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const handlerOnSubmit = (data: any) => {
    console.log(data)
  }

  return (
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
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          control={control}
        />
        <ControlTextField
          sizeWidthTextField="21.75rem"
          label="confirmPassword"
          placeholder="confirmPassword"
          type="password"
          name="confirmPassword"
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
  )
}

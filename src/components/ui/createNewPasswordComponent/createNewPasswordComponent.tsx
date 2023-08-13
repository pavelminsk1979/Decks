import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ControlTextField } from '../../../common/controlTextField/controlTextField.tsx'
import { Button } from '../button'
import { CardComponent } from '../cardComponent'
import { Typography } from '../typography'

import st from './createNewPasswordComponent.module.scss'

const createNewPasswordSchema = z.object({
  password: z.string().min(4),
})

type FormCreateNewPasswordType = z.infer<typeof createNewPasswordSchema>

export const CreateNewPasswordComponent = () => {
  const { handleSubmit, control } = useForm<FormCreateNewPasswordType>({
    resolver: zodResolver(createNewPasswordSchema),
  })
  const handlerOnSubmit = (data: any) => {
    alert('Куда должно отправлятся--надо будет узнавать' + data.password)
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(handlerOnSubmit)}>
      <CardComponent className={st.card}>
        <Typography className={st.headear} variant="large">
          Create new password
        </Typography>

        <ControlTextField
          control={control}
          name="password"
          placeholder="Password"
          sizeWidthTextField="21.75rem"
          type="password"
          label="Password"
        />
        <Typography className={st.text} variant="body2">
          Create new password and we will send you further instructions to email
        </Typography>
        <Button type={'submit'} fullWidth={true}>
          Create New Password
        </Button>
      </CardComponent>
    </form>
  )
}

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import iconUser from '../../../assets/icons/iconUser.png'
import { ControlTextField } from '../../../common/controlTextField/controlTextField.tsx'
import { Button } from '../button'
import { CardComponent } from '../cardComponent'
import { Typography } from '../typography'

import st from './editProfile.module.scss'

const editProfileSchema = z.object({
  nickname: z.string().min(1),
})

type FormEditProfileType = z.infer<typeof editProfileSchema>
export const EditProfile = () => {
  const { handleSubmit, control } = useForm<FormEditProfileType>({
    resolver: zodResolver(editProfileSchema),
  })
  const handlerOnSubmit = (data: any) => {
    alert(data.nickname)
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(handlerOnSubmit)} noValidate>
      <CardComponent className={st.card}>
        <Typography className={st.headear} variant="large">
          Personal Information
        </Typography>

        <img className={st.iconUser} src={iconUser} />
        <ControlTextField
          control={control}
          name="nickname"
          placeholder="Nickname"
          sizeWidthTextField="21.75rem"
          type="email"
          label="Nickname"
        />

        <Button type={'submit'} fullWidth={true}>
          Save Changes
        </Button>
      </CardComponent>
    </form>
  )
}

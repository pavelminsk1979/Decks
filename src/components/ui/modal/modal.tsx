import { ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { IconClose } from '../../../assets/icons/iconClose.tsx'
import { Button } from '../button'
import { Typography } from '../typography'

import st from './modal.module.scss'

type PropsType = {
  titleButtonOpenModal: string
  titleModal: string
  children: ReactNode
  sizeWidthModal?: string
  sizeHeightModal?: string
  titleButtonExecutor: string
  handlerOnClick: () => void
}
export const Modal = ({
  titleButtonOpenModal,
  children,
  sizeWidthModal,
  sizeHeightModal,
  titleModal,
  titleButtonExecutor,
  handlerOnClick,
}: PropsType) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button variant={'primary'}>{titleButtonOpenModal}</Button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={st.DialogOverlay} />
      <Dialog.Content
        className={st.DialogContent}
        style={{ width: sizeWidthModal, height: sizeHeightModal }}
      >
        <Dialog.Title className={st.DialogTitle}>
          <Typography variant={'h2'}>{titleModal}</Typography>
        </Dialog.Title>
        <Dialog.Close>
          <button className={st.IconButton}>
            <IconClose width="28" height="28" />
          </button>
        </Dialog.Close>
        {children}
        <Dialog.Close className={st.titleButtonExecutor}>
          <Button variant={'primary'} onClick={handlerOnClick}>
            {titleButtonExecutor}
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)

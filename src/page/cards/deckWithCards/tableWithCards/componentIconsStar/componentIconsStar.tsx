import { IconStar } from '../../../../../assets/icons/iconStar.tsx'
import { IconStarFull } from '../../../../../assets/icons/iconStarFull.tsx'

type PropsType = {
  grade: number
}
export const ComponentIconsStar = ({ grade }: PropsType) => {
  const state = [false, false, false, false, false]

  if (grade === 1) {
    state.fill(true, 0, 1)
  }
  if (grade === 2) {
    state.fill(true, 0, 2)
  }
  if (grade === 3) {
    state.fill(true, 0, 3)
  }
  if (grade === 4) {
    state.fill(true, 0, 4)
  }
  if (grade === 5) {
    state.fill(true, 0, 5)
  }

  return (
    <div>
      {state.map((e: boolean, index: number) => {
        return <span key={index}>{e ? <IconStarFull /> : <IconStar />}</span>
      })}
    </div>
  )
}
/*
<IconStarFull/>
<IconStar/>*/

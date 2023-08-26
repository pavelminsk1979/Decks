import st from './loading.module.scss'

export const Loading = () => {
  return (
    <div className={st.page}>
      <div className={st.loader}></div>
    </div>
  )
}
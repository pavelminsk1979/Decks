import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    ref={ref}
    {...props}
  >
    <path
      fill="white"
      d="m3.2 7.3 8.6 4.6a.5.5 0 0 0 .4 0l8.6-4.6a.4.4 0 0 0 0-.8L12.1 3h-.4L3.3 6.5a.4.4 0 0 0 0 .8Z"
    />
    <path
      fill="white"
      d="M20.7 10.7 19 9.9l-6.7 3.6a.5.5 0 0 1-.4 0L5 9.9l-1.8.8a.5.5 0 0 0 0 .8l8.5 5a.5.5 0 0 0 .5 0l8.5-5a.5.5 0 0 0 0-.8Z"
    />
    <path
      fill="white"
      d="m20.7 15.1-1.6-.7-6.9 3.8a.5.5 0 0 1-.4 0l-7-3.8-1.5.7a.5.5 0 0 0 0 .9l8.5 5a.5.5 0 0 0 .5 0l8.5-5a.5.5 0 0 0 0-.9Z"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const CardsIcon = memo(ForwardRef)

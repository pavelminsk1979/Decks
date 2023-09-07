import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" ref={ref} {...props}>
    <path
      fill="gold"
      d="M17.6 21a1 1 0 0 1-.5-.1L12 18.2 6.9 21a1 1 0 0 1-1.5-1l1-5.7-4-4a1 1 0 0 1-.3-1 1 1 0 0 1 .8-.7l5.7-.8L11 2.6a1 1 0 0 1 1.8 0l2.5 5 5.7 1a1 1 0 0 1 .8.6 1 1 0 0 1-.2 1l-4.1 4 1 5.6a1 1 0 0 1-.4 1 1 1 0 0 1-.6.2Z"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const IconStarFull = memo(ForwardRef)

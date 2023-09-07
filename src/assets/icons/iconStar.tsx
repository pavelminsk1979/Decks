import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" ref={ref} {...props}>
    <path
      fill="gold"
      d="M17.6 21a1 1 0 0 1-.5-.1L12 18.2 6.9 21a1 1 0 0 1-1.5-1l1-5.7-4-4a1 1 0 0 1-.3-1 1 1 0 0 1 .8-.7l5.7-.8L11 2.6a1 1 0 0 1 1.8 0l2.5 5 5.7 1a1 1 0 0 1 .8.6 1 1 0 0 1-.2 1l-4.1 4 1 5.6a1 1 0 0 1-.4 1 1 1 0 0 1-.6.2ZM12 16.1l.5.1 3.7 2-.7-4.2a1 1 0 0 1 .3-.9l3-3-4.2-.5a1 1 0 0 1-.7-.6L12 5.2 10.1 9a1 1 0 0 1-.7.5l-4.2.7 3 2.9a1 1 0 0 1 .3.9l-.9 4 3.8-2h.5Z"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const IconStar = memo(ForwardRef)

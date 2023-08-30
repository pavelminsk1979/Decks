import { SVGProps, Ref, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" ref={ref} {...props}>
    <path
      fill="#fff"
      d="M19 11H7.1l3.7-4.4a1 1 0 0 0-1.6-1.2l-5 6v.1l-.1.1-.1.4v.4h.1l.1.2 5 6a1 1 0 0 0 1.6-1.2L7 13h12a1 1 0 0 0 0-2Z"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const IconArrowBack = memo(ForwardRef)

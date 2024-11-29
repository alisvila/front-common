

const sizes = {
 xs: 'rbc-loading-xs',
 sm: 'rbc-loading-sm',
 md: 'rbc-loading-md',
 lg: 'rbc-loading-lg',
} as const

const loadings = {
 dots: 'rbc-loading-dots',
 spinner: 'rbc-loading-spinner',
 ring: 'rbc-loading-ring',
 ball: 'rbc-loading-ball',
 bars: 'rbc-loading-bars',
 infinity: 'rbc-loading-infinity'
}

type Props = {
 size?: keyof typeof sizes
 type?: keyof typeof loadings
}

function Loading({size = 'lg' , type = 'dots'}: Props) {
  return (
    <span className={`rbc-loading ${loadings[type]} ${sizes[size]}`}></span>
  )
}

export default Loading;
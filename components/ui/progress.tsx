interface ProgressProps {
  value?: number
  className?: string
  indicatorClassName?: string
}

export function Progress({ value = 0, className = "", indicatorClassName = "" }: ProgressProps) {
  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-100 ${className}`}>
      <div
        className={`h-full w-full flex-1 bg-primary-500 transition-all ${indicatorClassName}`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  )
}

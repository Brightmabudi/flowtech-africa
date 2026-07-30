import { cn } from '@frontend/lib/cn'

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-[shimmer_1.6s_ease-in-out_infinite] rounded-control bg-gradient-to-r from-ink-100 via-brand-50 to-ink-100 bg-[length:200%_100%]',
        className,
      )}
      aria-hidden="true"
    />
  )
}

import { cn } from '@/lib/cn';

const LETTERS = ['B', 'A', 'N', 'K', 'A', 'Y', 'O'] as const;

const SIZE_CLASS = {
  sm: 'size-7 text-sm border-2 rounded-md',
  md: 'size-9 text-lg border-[3px] rounded-md',
  lg: 'size-12 text-2xl border-4 rounded-lg',
} as const;

const RADIUS_CLASS = {
  sm: 'first:rounded-tl-[12px] last:rounded-br-[12px]',
  md: 'first:rounded-tl-[14px] last:rounded-br-[14px]',
  lg: 'first:rounded-tl-[18px] last:rounded-br-[18px]',
} as const;

export function Logo({
  className,
  size = 'md',
  isIconOnly = false,
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  isIconOnly?: boolean;
}) {
  const letters = isIconOnly ? LETTERS.slice(0, 1) : LETTERS;

  return (
    <div
      role="img"
      aria-label="Bankayo"
      className={cn('flex items-center gap-1', size === 'lg' && 'gap-1.5', className)}
    >
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className={cn(
            'flex items-center justify-center font-bold italic transition-colors duration-200',
            'border-fd-primary bg-fd-background/50 text-fd-primary hover:bg-fd-primary hover:text-fd-primary-foreground',
            SIZE_CLASS[size],
            RADIUS_CLASS[size]
          )}
        >
          {letter}
        </span>
      ))}
    </div>
  );
}

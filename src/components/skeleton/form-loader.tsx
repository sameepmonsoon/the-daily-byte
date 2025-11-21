import { cn } from '@/lib/utils';

export default function FormLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full bg-muted/60 transition-all duration-200 ease-in-out z-[50]',
        className
      )}
    >
      <div className='w-8 h-8 border-4 border-t-4 rounded-full border-red-600 border-t-transparent animate-spin'></div>
    </div>
  );
}

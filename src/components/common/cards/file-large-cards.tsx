import { X } from 'lucide-react';
import Image from 'next/image';

// import { formatBytes } from "@/lib/utils";
// import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';

import { isFileWithPreview } from '@/components/common/file-uploader/file-uploader-horizontal';

interface FileCardProps {
  file: File;
  onRemove?: () => void;
  progress?: number;
}

export function FileCardLarge({ file, /* progress, */ onRemove }: FileCardProps) {
  return (
    <div className='relative flex items-center space-x-4'>
      <div className='h-full aspect-square space-x-4 relative'>
        {isFileWithPreview(file) ? (
          <Image
            src={file.preview}
            alt={file.name}
            loading='lazy'
            fill={true}
            className='shrink-0 rounded-md object-cover'
          />
        ) : null}

        {onRemove && (
          <div className='flex items-center gap-2 absolute right-1 top-1'>
            <Button
              type='button'
              variant='outline'
              size='icon'
              className='size-6 rounded-full text-red-600'
              onClick={onRemove}
            >
              <X className='size-4 ' aria-hidden='true' />
              <span className='sr-only'>Remove file</span>
            </Button>
          </div>
        )}
        {/* <div className="flex w-full flex-col gap-2">
          <div className="space-y-px">
            <p className="line-clamp-1 text-sm font-medium text-foreground/80">
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatBytes(file.size)}
            </p>
          </div>
          {progress ? <Progress value={progress} /> : null}
        </div> */}
      </div>
    </div>
  );
}

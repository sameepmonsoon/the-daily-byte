import { cva } from 'class-variance-authority';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { FileUploaderHorizontal } from '../common/file-uploader/file-uploader-horizontal';


type Props<T extends FieldValues> = {
  name: Path<T>;
  formLabel: string;
  numberOfFiles: number;
  onUpload?: (files: File[]) => Promise<void>;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'formGroup' | 'single';
  maxSize?: number;
};

const inputFieldVariants = cva('form-group', {
  variants: {
    variant: {
      default: 'w-full',
      formGroup: 'lg:w-[calc(50%-10px)] w-full',
      single: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export default function RHFFileInput<T extends FieldValues>({
  name,
  formLabel,
  numberOfFiles,
  className,
  disabled,
  onUpload,
  required,
  variant,
  maxSize = 1 * 1024 * 1024,
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <div className={cn(inputFieldVariants({ variant, className }))}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-base font-medium !text-black'>
              {formLabel}
              {required && <span className='text-red-500'>*</span>}
            </FormLabel>
            <FormControl>
              <FileUploaderHorizontal
                value={field.value}
                onValueChange={field.onChange}
                maxFiles={numberOfFiles}
                maxSize={maxSize}
                disabled={disabled}
                onUpload={onUpload}
                // pass the onUpload function here for direct upload
                // onUpload={uploadFiles}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

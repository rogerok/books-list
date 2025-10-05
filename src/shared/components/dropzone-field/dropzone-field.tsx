import type { ComponentProps, FC } from 'react';

import { useFormContext } from '@shared/lib/mobx/mobx-form/useFormContext.ts';
import { Dropzone } from '@shared/ui/dropzone/dropzone.tsx';
import { observer } from 'mobx-react-lite';

type DropzoneFieldProps = Omit<
  ComponentProps<typeof Dropzone>,
  'onFileUploadSuccess'
>;

export const DropzoneField: FC<DropzoneFieldProps> = observer((props) => {
  const { bucketName, className, name } = props;

  const methods = useFormContext();

  const handleFileUploadSuccess = (path: string) => {
    methods.setValue(name, path);
  };

  return (
    <Dropzone
      bucketName={bucketName}
      className={className}
      name={name}
      onFileUploadSuccess={handleFileUploadSuccess}
    />
  );
});

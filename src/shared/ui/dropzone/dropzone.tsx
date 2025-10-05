import { cn } from '@bem-react/classname';

import './dropzone.scss';
import {
  AcceptedFiles,
  type AcceptedFilesType,
  FileUploadConstants,
} from '@shared/constants/files.ts';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { Notifier } from '@shared/lib/notifier/notifier.ts';
import { UploadStore } from '@shared/stores/upload-store/upload-store.ts';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import {
  dropzoneFileValidator,
  fileValidationMessages,
  formatSize,
} from '@shared/utils/files.ts';
import { observer } from 'mobx-react-lite';
import { type FC, type MouseEvent, type ReactNode, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const cnDropzone = cn('Dropzone');

interface DropzoneProps {
  bucketName: string;
  name: string;
  acceptedFiles?: Partial<AcceptedFilesType>;
  className?: string;
  disabled?: boolean;
  maxFiles?: number;
  // In bytes
  maxFileSize?: number;
  multiple?: boolean;
  title?: string;
  onFileUploadSuccess: (path: string) => void;
}

export const Dropzone: FC<DropzoneProps> = observer((props) => {
  const {
    acceptedFiles = AcceptedFiles,
    bucketName,
    className,
    disabled,
    maxFiles,
    maxFileSize = 5 * 1024 * 1024,
    multiple,
    onFileUploadSuccess,
  } = props;

  const [store] = useState(() => new UploadStore());

  const isDropzoneDisabled = store.isUploading || disabled;

  const handleOnDrop = async (acceptedFiles: File[]): Promise<void> => {
    if (maxFiles && acceptedFiles.length > maxFiles) {
      Notifier.error(`Максимальное количество файлов для загрузки ${maxFiles}`);
    } else if (acceptedFiles.length) {
      await store.uploadFile(bucketName, acceptedFiles, onFileUploadSuccess);
    }
  };

  const { getInputProps, getRootProps, isDragActive, isFileDialogActive } =
    useDropzone({
      accept: acceptedFiles ?? AcceptedFiles,
      disabled: isDropzoneDisabled,
      maxFiles: maxFiles,
      maxSize: maxFileSize,
      minSize: FileUploadConstants.MinFileSize,
      multiple: multiple,
      onDrop: handleOnDrop,
      onDropRejected: (fileRejections) => {
        fileRejections.forEach((file) => {
          Notifier.error(
            fileValidationMessages({
              code: file.errors[0].code,
              defaultMessage: file.errors[0].message,
              fileName: file.file.name,
              maxFiles: maxFiles,
              maxFileSize: maxFileSize ? formatSize(maxFileSize) : '',
            }),
          );
        });
      },
      validator: dropzoneFileValidator,
    });

  const handleCustomOnClickHandler = (
    event: MouseEvent<HTMLDivElement>,
  ): void => {
    if (isFileDialogActive) {
      event.preventDefault();
    } else {
      const { onClick } = getRootProps();
      if (onClick) {
        onClick(event);
      }
    }
  };

  const getRestrictions = (): ReactNode => {
    let result: ReactNode = null;

    if (maxFiles && maxFileSize) {
      result = `До ${maxFiles} файлов Макс. ${formatSize(maxFileSize)} каждый`;
    } else if (maxFiles) {
      result = `До ${maxFiles} файлов`;
    } else if (maxFileSize) {
      result = `Макс. ${formatSize(maxFileSize)}`;
    }

    return result;
  };

  return (
    <div className={cnDropzone(undefined, [className])}>
      <div
        {...getRootProps()}
        className={cnDropzone('Dropzone', {
          dragActive: isDragActive,
          loading: store.isUploading,
        })}
        onClick={handleCustomOnClickHandler}
      >
        <input {...getInputProps()} />

        <VStack align={'center'} as={'p'}>
          <span className={cnDropzone('Icon')}>
            <IconComponent
              color={ColorConstant.Green600}
              name={'uploadIcon'}
              size={'sm'}
            />
          </span>

          <Typography size={'xs'} variant={'lightDark'} weight={'medium'}>
            {props.title ?? 'Загрузить'}
          </Typography>
          <Typography size={'3xs'} variant={'light'}>
            Перетащите файл или нажмите для выбора • {getRestrictions()}.
          </Typography>
        </VStack>
      </div>
    </div>
  );
});

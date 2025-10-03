import { cn } from '@bem-react/classname';

import './dropzone.scss';
import {
  AcceptedFiles,
  type AcceptedFilesType,
  FileUploadConstants,
} from '@shared/constants/files.ts';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { Notifier } from '@shared/lib/notifier/notifier.ts';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import {
  dropzoneFileValidator,
  fileValidationMessages,
  formatSize,
} from '@shared/utils/files.ts';
import { observer } from 'mobx-react-lite';
import { type FC, type MouseEvent, type ReactNode, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

const cnDropzone = cn('Dropzone');

interface DropzoneProps {
  name: string;
  acceptedFiles?: Partial<AcceptedFilesType>;
  className?: string;
  disabled?: boolean;
  maxFiles?: number;
  // In bytes
  maxFileSize?: number;
  multiple?: boolean;
  title?: string;
  // store?: Upload;
  onFileRemove?: (originalFileName: string) => void;
  // onFileUploadSuccess?: (fileData: AttachmentModel) => void;
}

export const Dropzone: FC<DropzoneProps> = observer((props) => {
  const controllerRef = useRef<AbortController | null>(null);

  const {
    acceptedFiles,
    className,
    disabled,
    maxFiles,
    maxFileSize = 5 * 1024 * 1024,
    multiple,
    name,
    onFileRemove,
    title,
  } = props;

  const isDropzoneDisabled =
    // store.data.length === maxFiles || store.isLoading || disabled;
    disabled;

  // const handleUploadProgress = (
  //   progressEvent: AxiosProgressEvent,
  //   id: string
  // ): void => {
  //   if (progressEvent.total) {
  //     const progress = (progressEvent.loaded / progressEvent.total) * 100;
  //
  //     store.setUploadingProgress(id, progress);
  //   }
  // };
  //
  // const handleFileRemove = (id: string, originalFileName: string): void => {
  //   store.removeData(id);
  //
  //   if (onFileRemove) {
  //     onFileRemove(originalFileName);
  //   }
  // };

  // const handleOnDrop = async (acceptedFiles: File[]): Promise<void> => {
  //   controllerRef.current = new AbortController();
  //   if (
  //     maxFiles &&
  //     store.data.length + acceptedFiles.length > maxFiles
  //   ) {
  //     Notifier.error(
  //       `Максимальное количество файлов для загрузки ${maxFiles}`,
  //     );
  //   } else if (acceptedFiles.length) {
  //     store.setLoading(true);
  //     const siteData = await getSiteByDomain(() =>
  //       SiteService.getSiteByDomain(SiteCodes.main, controllerRef.current!),
  //     );
  //
  //     if (siteData) {
  //       const inputFiles = acceptedFiles.map<UploadStoreFileItem>((file) => ({
  //         error: false,
  //         file: file,
  //         id: nanoid(),
  //         uploadedFileName: '',
  //         uploadProgress: 0,
  //       }));
  //
  //       store.addMultipleData(inputFiles);
  //
  //       await Promise.all(
  //         store.data.slice(-acceptedFiles.length).map(async (file) => {
  //           const formData = new FormData();
  //           formData.append(FileUploadConstants.AttachmentField, file.file);
  //
  //           formData.append(FileUploadConstants.SiteField, siteData.id);
  //           formData.append(
  //             FileUploadConstants.EntityField,
  //             FileUploadConstants.EntityFieldValue,
  //           );
  //
  //           const data = await uploadFile(() =>
  //             serviceMethod(
  //               formData,
  //               controllerRef.current!,
  //               handleUploadProgress,
  //               file.id,
  //             ),
  //           );
  //
  //           if (data && onFileUploadSuccess) {
  //             onFileUploadSuccess({
  //               fileName: data.fileName,
  //               hash: data.hash,
  //               isMain: !!isMain,
  //               mimeType: data.mimeType,
  //               originalFileName: data.originalFileName,
  //               size: data.size,
  //             });
  //             store.updateUploadedFileName(file.id, data.fileName);
  //           } else {
  //             store.setItemError(file.id, true);
  //           }
  //         }),
  //       );
  //     } else {
  //       Notifier.error('Ошибка при загрузке файла.', {
  //         variant: 'error',
  //       });
  //     }
  //
  //     store.setLoading(false);
  //   }
  // };

  const { getInputProps, getRootProps, isDragActive, isFileDialogActive } =
    useDropzone({
      accept: acceptedFiles ?? AcceptedFiles,
      disabled: isDropzoneDisabled,
      maxFiles: maxFiles,
      maxSize: maxFileSize,
      minSize: FileUploadConstants.MinFileSize,
      multiple: multiple,
      // onDrop: handleOnDrop,
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
          // loading: store.isLoading,
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

        {/*{!!store.data.length && (*/}
        {/*  <DropzoneFileList*/}
        {/*    files={store.data}*/}
        {/*    handleFileRemove={handleFileRemove}*/}
        {/*    loading={store.isLoading}*/}
        {/*  />*/}
        {/*)}*/}
      </div>
    </div>
  );
});

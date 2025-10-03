import {
  FileCustomErrorCode,
  type FileErrorExtended,
  FileUploadConstants,
  FileValidationMessages,
} from '@shared/constants/files.ts';
import { ErrorCode } from 'react-dropzone';

type FileValidationMessagesArgs = {
  code: ErrorCode | string;
  defaultMessage: string;
  fileName: string;
  maxFiles?: number;
  maxFileSize?: string;
};

export const fileValidationMessages = (
  fileData: FileValidationMessagesArgs,
): string => {
  let message;
  const { code, defaultMessage, fileName, maxFiles, maxFileSize } = fileData;

  switch (code) {
    case ErrorCode.FileInvalidType:
      message = FileValidationMessages.fileInvalidType(fileName);
      break;

    case ErrorCode.FileTooLarge:
      message = FileValidationMessages.fileTooLarge(fileName, maxFileSize);
      break;

    case ErrorCode.FileTooSmall:
      message = FileValidationMessages.fileTooSmall(fileName);
      break;

    case ErrorCode.TooManyFiles:
      message = FileValidationMessages.tooManyFiles(maxFiles);
      break;

    default:
      message = defaultMessage.length
        ? defaultMessage
        : FileValidationMessages.defaultFileError();
  }

  return message;
};

export const dropzoneFileValidator = (file: File): FileErrorExtended | null => {
  let error: FileErrorExtended | null = null;

  if (file.name && file.name.length > FileUploadConstants.MaxFileNameLength) {
    error = {
      code: FileCustomErrorCode.NameTooLarge,
      message: FileValidationMessages.fileNameTooLong(
        FileUploadConstants.MaxFileNameLength,
      ),
    };
  }

  return error;
};

export const formatSize = (size: number): string => {
  let sizeString: string;
  if (size < 1024) {
    sizeString = size + ' байт';
  } else if (size < 1024 * 1024) {
    sizeString = (size / 1024.0).toFixed(0) + ' КБ';
  } else if (size < 1024 * 1024 * 1024) {
    sizeString = (size / 1024.0 / 1024.0).toFixed(1) + ' МБ';
  } else {
    sizeString = (size / 1024.0 / 1024.0 / 1024.0).toFixed(1) + ' ГБ';
  }
  return sizeString;
};

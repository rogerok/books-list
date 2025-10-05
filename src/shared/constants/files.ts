import type { ObjectValues } from '@shared/utils/ts-utils/ts-utils.ts';
import type { FileError } from 'react-dropzone';

export const FilesMimeTypes = {
  BMP: 'image/bmp',
  GIF: 'image/gif',
  JPG: 'image/jpeg',
  PCX: 'image/vnd.zbrush.pcx',
  PNG: 'image/png',
} as const;

export const FilesExtensions = {
  BMP: '.bmp',
  GIF: '.gif',
  JPG: '.jpg',
  PCX: '.pcx',
  PNG: '.png',
} as const;

export type FileExtensionsType = ObjectValues<typeof FilesExtensions>;

export type FileMimeTypesType = ObjectValues<typeof FilesMimeTypes>;

export const FilesMimeTypesWithExtension: Record<
  FileMimeTypesType,
  FileExtensionsType
> = {
  [FilesMimeTypes.BMP]: FilesExtensions.BMP,
  [FilesMimeTypes.GIF]: FilesExtensions.GIF,
  [FilesMimeTypes.JPG]: FilesExtensions.JPG,
  [FilesMimeTypes.PCX]: FilesExtensions.PCX,
  [FilesMimeTypes.PNG]: FilesExtensions.PNG,
} as const;

export type FilesMimeTypesWithExtensionType = ObjectValues<
  typeof FilesMimeTypesWithExtension
>;

export type AcceptedFilesType = Record<
  FileMimeTypesType,
  FilesMimeTypesWithExtensionType[]
>;

export const AcceptedFiles: AcceptedFilesType = {
  [FilesMimeTypes.BMP]: [FilesMimeTypesWithExtension[FilesMimeTypes.BMP]],
  [FilesMimeTypes.GIF]: [FilesMimeTypesWithExtension[FilesMimeTypes.GIF]],
  [FilesMimeTypes.JPG]: [FilesMimeTypesWithExtension[FilesMimeTypes.JPG]],
  [FilesMimeTypes.PCX]: [FilesMimeTypesWithExtension[FilesMimeTypes.PCX]],
  [FilesMimeTypes.PNG]: [FilesMimeTypesWithExtension[FilesMimeTypes.PNG]],
};

export const FileCustomErrorCode = {
  NameTooLarge: 'name-too-large',
} as const;

export type FileCustomErrorValues = ObjectValues<typeof FileCustomErrorCode>;

export const FileUploadConstants = {
  MaxFileNameLength: 100,
  MinFileSize: 1,
};

export interface FileErrorExtended extends FileError {
  code: FileCustomErrorValues;
}

export const FileValidationMessages = {
  defaultFileError: () => 'Ошибка при загрузке файла',
  fileInvalidType: (fileName: string) => `Недопустимый тип файла: ${fileName}`,
  fileNameTooLong: (maxLength: number) =>
    `Максимальная длина имени файла ${maxLength} символов`,
  fileTooLarge: (fileName: string, maxFileSize?: string) =>
    `Превышен максимально допустимый размер файла: ${
      maxFileSize ? `${fileName} в ${maxFileSize}` : { fileName }
    } `,
  fileTooSmall: (fileName: string) => `Файл ${fileName} не может быть пустым`,
  tooManyFiles: (maxFiles?: number) =>
    maxFiles
      ? `Максимальное количество файлов для загрузки ${maxFiles}`
      : 'Превышено максимальное количество файлов для загрузки',
};

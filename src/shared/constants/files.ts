import type { ObjectValues } from '@shared/utils/ts-utils/ts-utils.ts';
import type { FileError } from 'react-dropzone';

export const FilesMimeTypes = {
  AVI: 'video/x-msvideo',
  BMP: 'image/bmp',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  FLV: 'video/x-flv',
  GIF: 'image/gif',
  JPG: 'image/jpeg',
  MKV: 'video/x-matroska',
  MOV: 'video/quicktime',
  MP3: 'audio/mp3',
  MP4: 'video/mp4',
  ODF: 'application/vnd.oasis.opendocument.formula',
  PCX: 'image/vnd.zbrush.pcx',
  PDF: 'application/pdf',
  PNG: 'image/png',
  PPS: 'application/vnd.ms-powerpoint',
  PPT: 'application/vnd.ms-powerpoint',
  PUB: 'application/x-mspublisher',
  RTF: 'application/rtf',
  TIF: 'image/tiff',
  TXT: 'text/plain',
  WMA: 'audio/x-ms-wma',
  WMV: 'video/x-ms-wmv',
  XLS: 'application/vnd.ms-excel',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
} as const;

export const FilesExtensions = {
  AVI: '.avi',
  BMP: '.bmp',
  DOC: '.doc',
  DOCX: '.docx',
  FLV: '.flv',
  GIF: '.gif',
  JPG: '.jpg',
  MKV: '.mkv',
  MOV: '.mov',
  MP3: '.mp3',
  MP4: '.mp4',
  ODF: '.odf',
  PCX: '.pcx',
  PDF: '.pdf',
  PNG: '.png',
  PPS: '.pps',
  PPT: '.ppt',
  PUB: '.pub',
  RTF: '.rtf',
  TIF: '.tif',
  TXT: '.txt',
  WMA: '.wma',
  WMV: '.wmv',
  XLS: '.xls',
  XLSX: '.xlsx',
} as const;

export type FileExtensionsType = ObjectValues<typeof FilesExtensions>;

export type FileMimeTypesType = ObjectValues<typeof FilesMimeTypes>;

export const FilesMimeTypesWithExtension: Record<
  FileMimeTypesType,
  FileExtensionsType
> = {
  [FilesMimeTypes.AVI]: FilesExtensions.AVI,
  [FilesMimeTypes.BMP]: FilesExtensions.BMP,
  [FilesMimeTypes.DOC]: FilesExtensions.DOC,
  [FilesMimeTypes.DOCX]: FilesExtensions.DOCX,
  [FilesMimeTypes.FLV]: FilesExtensions.FLV,
  [FilesMimeTypes.GIF]: FilesExtensions.GIF,
  [FilesMimeTypes.JPG]: FilesExtensions.JPG,
  [FilesMimeTypes.MKV]: FilesExtensions.MKV,
  [FilesMimeTypes.MOV]: FilesExtensions.MOV,
  [FilesMimeTypes.MP3]: FilesExtensions.MP3,
  [FilesMimeTypes.MP4]: FilesExtensions.MP4,
  [FilesMimeTypes.ODF]: FilesExtensions.ODF,
  [FilesMimeTypes.PCX]: FilesExtensions.PCX,
  [FilesMimeTypes.PDF]: FilesExtensions.PDF,
  [FilesMimeTypes.PNG]: FilesExtensions.PNG,
  [FilesMimeTypes.PPT]: FilesExtensions.PPT,
  [FilesMimeTypes.PUB]: FilesExtensions.PUB,
  [FilesMimeTypes.RTF]: FilesExtensions.RTF,
  [FilesMimeTypes.TIF]: FilesExtensions.TIF,
  [FilesMimeTypes.TXT]: FilesExtensions.TXT,
  [FilesMimeTypes.WMA]: FilesExtensions.WMA,
  [FilesMimeTypes.WMV]: FilesExtensions.WMV,
  [FilesMimeTypes.XLS]: FilesExtensions.XLS,
  [FilesMimeTypes.XLSX]: FilesExtensions.XLSX,
} as const;

export type FilesMimeTypesWithExtensionType = ObjectValues<
  typeof FilesMimeTypesWithExtension
>;

export type AcceptedFilesType = Record<
  FileMimeTypesType,
  FilesMimeTypesWithExtensionType[]
>;

export const AcceptedFiles: AcceptedFilesType = {
  [FilesMimeTypes.AVI]: [FilesMimeTypesWithExtension[FilesMimeTypes.AVI]],
  [FilesMimeTypes.BMP]: [FilesMimeTypesWithExtension[FilesMimeTypes.BMP]],
  [FilesMimeTypes.DOC]: [FilesMimeTypesWithExtension[FilesMimeTypes.DOC]],
  [FilesMimeTypes.DOCX]: [FilesMimeTypesWithExtension[FilesMimeTypes.DOCX]],
  [FilesMimeTypes.FLV]: [FilesMimeTypesWithExtension[FilesMimeTypes.FLV]],
  [FilesMimeTypes.GIF]: [FilesMimeTypesWithExtension[FilesMimeTypes.GIF]],
  [FilesMimeTypes.JPG]: [FilesMimeTypesWithExtension[FilesMimeTypes.JPG]],
  [FilesMimeTypes.MKV]: [FilesMimeTypesWithExtension[FilesMimeTypes.MKV]],
  [FilesMimeTypes.MOV]: [FilesMimeTypesWithExtension[FilesMimeTypes.MOV]],
  [FilesMimeTypes.MP3]: [FilesMimeTypesWithExtension[FilesMimeTypes.MP3]],
  [FilesMimeTypes.MP4]: [FilesMimeTypesWithExtension[FilesMimeTypes.MP4]],
  [FilesMimeTypes.ODF]: [FilesMimeTypesWithExtension[FilesMimeTypes.ODF]],
  [FilesMimeTypes.PCX]: [FilesMimeTypesWithExtension[FilesMimeTypes.PCX]],
  [FilesMimeTypes.PDF]: [FilesMimeTypesWithExtension[FilesMimeTypes.PDF]],
  [FilesMimeTypes.PNG]: [FilesMimeTypesWithExtension[FilesMimeTypes.PNG]],
  [FilesMimeTypes.PPT]: [FilesMimeTypesWithExtension[FilesMimeTypes.PPT]],
  [FilesMimeTypes.PUB]: [FilesMimeTypesWithExtension[FilesMimeTypes.PUB]],
  [FilesMimeTypes.RTF]: [FilesMimeTypesWithExtension[FilesMimeTypes.RTF]],
  [FilesMimeTypes.TIF]: [FilesMimeTypesWithExtension[FilesMimeTypes.TIF]],
  [FilesMimeTypes.TXT]: [FilesMimeTypesWithExtension[FilesMimeTypes.TXT]],
  [FilesMimeTypes.WMA]: [FilesMimeTypesWithExtension[FilesMimeTypes.WMA]],
  [FilesMimeTypes.WMV]: [FilesMimeTypesWithExtension[FilesMimeTypes.WMV]],
  [FilesMimeTypes.XLS]: [FilesMimeTypesWithExtension[FilesMimeTypes.XLS]],
  [FilesMimeTypes.XLSX]: [FilesMimeTypesWithExtension[FilesMimeTypes.XLSX]],
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

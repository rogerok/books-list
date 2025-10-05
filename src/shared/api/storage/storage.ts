import { apiClient } from '@shared/api/client.ts';

export const uploadFileRequest = async (
  bucket: string,
  path: string,
  file: File,
) => {
  return apiClient.storage.from(bucket).upload(path, file);
};

export const getPublicUrl = async (bucketName: string, path: string) => {
  return apiClient.storage.from(bucketName).getPublicUrl(path);
};

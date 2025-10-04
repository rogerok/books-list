import { uploadFileRequest } from '@shared/api/upload/upload.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';

export class UploadStore {
  uploadRequest = new RequestStore(uploadFileRequest, {
    onError: () => 'Ошибка загрузки файла',
    onSuccess: () => 'Файл загружен',
  });

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  async uploadFile(
    bucketName: string,
    files: File[],
    onFileUploadSuccess: (bucketPath: string) => void,
  ): Promise<void> {
    await Promise.all(
      files.map(async (file) => {
        const path = `${nanoid()}/${Date.now()}`;

        const { response, status } = await this.uploadRequest.execute(
          bucketName,
          path,
          file,
        );

        if (status === 'success' && response?.data?.fullPath) {
          onFileUploadSuccess(response.data.fullPath);
        }
      }),
    );
  }

  get isUploading(): boolean {
    return this.uploadRequest.isLoading;
  }
}

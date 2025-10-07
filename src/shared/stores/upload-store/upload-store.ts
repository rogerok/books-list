import { uploadFileRequest } from '@shared/api/storage/storage.ts';
import { Notifier } from '@shared/lib/notifier/notifier.ts';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';

export class UploadStore {
  uploadRequest = new RequestStore(uploadFileRequest, {
    onError: () => Notifier.error('Ошибка загрузки файла'),
    onSuccess: () => Notifier.success('Файл загружен'),
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

  generatePath() {
    return `${nanoid()}/${Date.now()}`;
  }

  async uploadFile(
    bucketName: string,
    files: File[],
    onFileUploadSuccess: (bucketPath: string) => void,
  ): Promise<void> {
    await Promise.all(
      files.map(async (file) => {
        const path = this.generatePath();

        const { response, status } = await this.uploadRequest.execute(
          bucketName,
          path,
          file,
        );

        if (status === 'success' && response?.data?.path) {
          onFileUploadSuccess(response.data.path);
        }
      }),
    );
  }

  get isUploading(): boolean {
    return this.uploadRequest.isLoading;
  }
}

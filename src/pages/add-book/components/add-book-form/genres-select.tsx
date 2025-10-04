import { getGenres } from '@shared/api/genres/genres.ts';
import { SelectField } from '@shared/components/select-field/select-field.tsx';
import { RequestStore } from '@shared/lib/request-store/request-store.ts';
import { observer } from 'mobx-react-lite';
import { type FC, useEffect, useState } from 'react';

export const GenresSelect: FC = observer(() => {
  const [store] = useState(() => new RequestStore(getGenres));

  useEffect(() => {
    store.execute();
  }, [store]);

  const data =
    store.result.status === 'success' ? store.result.response.data : [];

  return (
    <SelectField
      isLoading={store.isLoading}
      label={'Жанр'}
      labelField={'name'}
      name={'genre'}
      options={data ?? []}
      placeholder={'Выберите жанр'}
      valueField={'id'}
    />
  );
});

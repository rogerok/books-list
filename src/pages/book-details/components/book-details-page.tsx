import { cn } from '@bem-react/classname';

import './book-details-page.scss';
import { BookWidget } from '@widgets/book';

const cnBookDetailsPage = cn('BookDetailsPage');

export const BookDetailsPage = () => {
  return (
    <div className={cnBookDetailsPage()}>
      {/*<div>*/}
      {/*  <img*/}
      {/*    alt="cover"*/}
      {/*    className={cnBookDetailsPage('Cover')}*/}
      {/*    src={'https://dummyjson.com/image/224x320'}*/}
      {/*  />*/}
      {/*  <div className={cnBookDetailsPage('Info')}>*/}
      {/*    <h2 className={cnBookDetailsPage('Title')}>Полуночная библиотека</h2>*/}
      {/*    <p className={cnBookDetailsPage('Author')}>Мэтт Хейг</p>*/}
      {/*    <span className={cnBookDetailsPage('Genre')}>*/}
      {/*      Художественная литература*/}
      {/*    </span>*/}
      {/*    <button className={cnBookDetailsPage('Status')}>Читаю</button>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <BookWidget className={cnBookDetailsPage('Header')} variant={'hero'} />

      {/* Карточки с рейтингом и заметками */}
      <div className={cnBookDetailsPage('Grid')}>
        <div className={cnBookDetailsPage('Card')}>
          <h3>Рейтинг</h3>
          <p>⭐⭐⭐⭐☆</p>
          <span>Вы оценили книгу на 4 из 5</span>
        </div>

        <div className={cnBookDetailsPage('Card')}>
          <h3>Заметки</h3>
          <p>Очень нравятся философские размышления о параллельных жизнях.</p>
        </div>
      </div>

      {/* Прогресс */}
      <div className={cnBookDetailsPage('Progress')}>
        <h3>Прогресс по чтению</h3>
        <div className={cnBookDetailsPage('ProgressBar')}>
          <div
            className={cnBookDetailsPage('ProgressFill')}
            style={{ width: '65%' }}
          />
        </div>
        <span>65%</span>
      </div>

      {/* Кнопка */}
      <button className={cnBookDetailsPage('Button')}>Прочитано</button>
    </div>
  );
};

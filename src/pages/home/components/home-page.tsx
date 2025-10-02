import { cn } from '@bem-react/classname';

import './home-page.scss';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { GoalWidget } from '@widgets/goal';

const cnHomePage = cn('HomePage');

export const HomePage = () => {
  return (
    <section className={cnHomePage()}>
      <header className={cnHomePage('Header')}>
        <Typography as={'h1'} size={'3xl'} weight={'semibold'}>
          Привет! 📚
        </Typography>
        <Typography as={'p'} size={'md'} variant={'secondary'}>
          Сохрани свои любимые книги
        </Typography>
      </header>

      <section className={cnHomePage('goal')}>
        <GoalWidget variant={'large'} />
      </section>

      <div className={cnHomePage('actions')}>
        <button className={cnHomePage('add-btn')}>+ Добавить книгу</button>
        <button className={cnHomePage('library-btn')}>📚 Библиотека</button>
      </div>

      <section className={cnHomePage('current')}>
        <h2>Текущие книги</h2>
        <div className={cnHomePage('book')}>
          <img
            alt="cover"
            className={cnHomePage('book-cover')}
            src="https://placehold.co/100x140"
          />
          <div className={cnHomePage('book-info')}>
            <h3>Полуночная библиотека</h3>
            <p>Мэтт Хейг</p>
            <div className={cnHomePage('progressbar')}>
              <div
                className={cnHomePage('progressbar-fill')}
                style={{ width: '65%' }}
              />
            </div>
            <span>65%</span>
          </div>
        </div>
      </section>

      <section className={cnHomePage('activities')}>
        <h2>Последние активности</h2>
        <ul>
          <li className={cnHomePage('activity')}>
            <span>Закончена Гордость и предубеждение</span>
            <span className={cnHomePage('rating')}>⭐ 5</span>
          </li>
          <li className={cnHomePage('activity')}>
            <span>Закончена Великий Гэтсби</span>
            <span className={cnHomePage('rating')}>⭐ 4</span>
          </li>
        </ul>
      </section>
    </section>
  );
};

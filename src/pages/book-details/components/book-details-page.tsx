import { cn } from '@bem-react/classname';

import './book-details-page.scss';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { ProgressBar } from '@shared/ui/progress-bar/progress-bar.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { BookWidget } from '@widgets/book';

const cnBookDetailsPage = cn('BookDetailsPage');

export const BookDetailsPage = () => {
  return (
    <VStack as={'section'} className={cnBookDetailsPage()} gap={'32'}>
      <BookWidget className={cnBookDetailsPage('Header')} variant={'hero'} />

      <div className={cnBookDetailsPage('Cards')}>
        <VStack className={cnBookDetailsPage('Col')} gap={'32'}>
          <Card className={cnBookDetailsPage('Card')} elevation={'md'}>
            <h3>Рейтинг</h3>
            <p>⭐⭐⭐⭐☆</p>
            <span>Вы оценили книгу на 4 из 5</span>
          </Card>
          <Card className={cnBookDetailsPage('Card')}>
            <h3>Прогресс по чтению</h3>
            <ProgressBar max={100} value={10} />
          </Card>
          <Button
            addonLeft={
              <IconComponent
                color={ColorConstant.White}
                name={'doneIcon'}
                size={'xxs'}
              />
            }
            fullWidth
            variant={'accent'}
          >
            Прочитано
          </Button>
        </VStack>
        <VStack className={cnBookDetailsPage('Col')}>
          <div className={cnBookDetailsPage('Card')}>
            <h3>Заметки</h3>
            <p>Очень нравятся философские размышления о параллельных жизнях.</p>
          </div>
        </VStack>
      </div>
    </VStack>
  );
};

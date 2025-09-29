import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import heroImg from '@shared/assets/images/hero.jpg';
import { AppImage } from '@shared/ui/app-image/app-image.tsx';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';

const cnHeroImage = cn('HeroImage');

interface HeroImageProps {
  className?: string;
}

export const HeroImage: FC<HeroImageProps> = (props) => {
  const { className } = props;

  const size = {
    height: 384,
    width: 560,
  };

  return (
    <AppImage
      alt={'Изображение библиотеки'}
      className={cnHeroImage(undefined, className)}
      fallback={<Skeleton {...size} rounded={'16'} />}
      rounded={'16'}
      src={heroImg}
      {...size}
    />
  );
};

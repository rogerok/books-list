import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { type ComponentProps } from 'react';

interface StarRatingProps {
  className?: string;
  selectedStars?: number;
  size?: ComponentProps<typeof IconComponent>['size'];
  onSelect?: (starsCount: number) => void;
}
const cnStarRating = cn('StarRating');

const stars = [1, 2, 3, 4, 5];

export const StarRating = (props: StarRatingProps) => {
  const { className, onSelect, selectedStars = 0, size = 'sm' } = props;

  const onClick = (starsCount: number) => () => {
    onSelect?.(starsCount);
  };

  return (
    <div className={cnStarRating(undefined, [className])}>
      {stars.map((starNumber) => {
        const clicked = selectedStars >= starNumber;
        return (
          <IconComponent
            color={clicked ? ColorConstant.Orange200 : ColorConstant.Neutral250}
            key={starNumber}
            name={clicked ? 'starFilledIcon' : 'starIcon'}
            onClick={onClick(starNumber)}
            size={size}
          />
        );
      })}
    </div>
  );
};

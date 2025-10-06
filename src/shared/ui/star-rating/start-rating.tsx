import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { type ComponentProps, useState } from 'react';

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
  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };
  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };
  const onClick = (starsCount: number) => () => {
    onSelect?.(starsCount);
    setCurrentStarsCount(starsCount);
    setIsSelected(true);
  };
  return (
    <div className={cnStarRating(undefined, [className])}>
      {stars.map((starNumber) => {
        const clicked = currentStarsCount >= starNumber;
        return (
          <IconComponent
            color={clicked ? ColorConstant.Orange200 : ColorConstant.Neutral250}
            key={starNumber}
            name={clicked ? 'starFilledIcon' : 'starIcon'}
            onClick={onClick(starNumber)}
            onMouseEnter={onHover(starNumber)}
            onMouseLeave={onLeave}
            size={size}
          />
        );
      })}
    </div>
  );
};

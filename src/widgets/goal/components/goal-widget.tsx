import { cn } from '@bem-react/classname';
import { Card } from '@shared/ui/card/card.tsx';
import { GoalWidgetSmall } from '@widgets/goal/components/goal-widget-small/goal-widget-small.tsx';
import { observer } from 'mobx-react-lite';
import { type FC, useMemo } from 'react';

const cnGoalWidget = cn('GoalWidget');

export type GoalMockData = {
  completed: number; // 2
  percent: number; // 10
  total: number; // 20
  year: number; // 2024
};

const mockData: GoalMockData = {
  completed: 2,
  percent: 20,
  total: 20,
  year: 2024,
};

interface GoalWidgetProps {
  variant: 'large' | 'small';
  className?: string;
}

export const GoalWidget: FC<GoalWidgetProps> = observer((props) => {
  const { className, variant } = props;

  const component = useMemo(() => {
    switch (variant) {
      case 'small':
        return <GoalWidgetSmall data={mockData} />;
      // case 'large':
      // component = <GoalWidget data={mockData} />;
    }
  }, [variant]);

  return (
    <Card
      className={cnGoalWidget(undefined, [className])}
      variant={'secondary'}
    >
      {component}
    </Card>
  );
});

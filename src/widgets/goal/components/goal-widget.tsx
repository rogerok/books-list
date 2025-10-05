import { cn } from '@bem-react/classname';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { Card } from '@shared/ui/card/card.tsx';
import { GoalWidgetLarge } from '@widgets/goal/components/goal-widget-large/goal-widget-large.tsx';
import { GoalWidgetSmall } from '@widgets/goal/components/goal-widget-small/goal-widget-small.tsx';
import { observer } from 'mobx-react-lite';
import { type FC, useEffect, useMemo } from 'react';

const cnGoalWidget = cn('GoalWidget');

interface GoalWidgetProps {
  variant: 'large' | 'small';
  className?: string;
}

export const GoalWidget: FC<GoalWidgetProps> = observer((props) => {
  const { className, variant } = props;

  const { goal } = useRootStore();

  useEffect(() => {
    goal.initialLoad();
  }, [goal]);

  const component = useMemo(() => {
    switch (variant) {
      case 'small':
        return <GoalWidgetSmall />;
      case 'large':
        return <GoalWidgetLarge />;
    }
  }, [variant]);

  return (
    <Card
      className={cnGoalWidget(undefined, [className])}
      elevation={variant === 'large' ? 'md' : undefined}
      variant={'secondary'}
    >
      {component}
    </Card>
  );
});

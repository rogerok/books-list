import type { TabsManager } from '@shared/lib/tabs-manager/tabs-manager.ts';
import type { ReactNode } from 'react';

import { cn } from '@bem-react/classname';

import './tabs.scss';
import { Button } from '@shared/ui/button/button.tsx';
import { observer } from 'mobx-react-lite';

const cnTabs = cn('Tabs');

interface TabsProps<T extends { id: string; label?: string }> {
  manager: TabsManager<T>;
  className?: string;
  onTabClick?: (tabId: T['id']) => void;
  slot?: (tab: T, isActive: boolean) => ReactNode;
}

export const Tabs = observer(
  <T extends { id: string; label?: string }>({
    className,
    manager,
    onTabClick,
    slot,
  }: TabsProps<T>) => {
    const tabs = manager.tabs ?? [];
    const activeId = manager.activeTab;

    if (!tabs.length) {
      return <div className={cnTabs(null, [className])}>No tabs</div>;
    }

    return (
      <div className={cnTabs(null, [className])}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;

          return (
            <Button
              className={cnTabs('Tab', { active: isActive })}
              key={tab.id}
              onClick={() => {
                manager.setActiveTab(tab.id);
                onTabClick?.(tab.id);
              }}
            >
              <span
                className={cnTabs('Label', {
                  active: isActive,
                })}
              >
                {tab.label}
              </span>
              {slot?.(tab, isActive)}
            </Button>
          );
        })}
      </div>
    );
  },
);

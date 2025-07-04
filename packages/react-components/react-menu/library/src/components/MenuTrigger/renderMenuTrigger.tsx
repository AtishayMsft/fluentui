import * as React from 'react';
import { MenuTriggerContextProvider } from '../../contexts/menuTriggerContext';
import type { MenuTriggerState } from './MenuTrigger.types';

/**
 * Render the final JSX of MenuTrigger
 *
 * Only renders children
 */
export const renderMenuTrigger_unstable = (
  state: MenuTriggerState,
): // eslint-disable-next-line @typescript-eslint/no-deprecated
JSX.Element => {
  return <MenuTriggerContextProvider value={state.isSubmenu}>{state.children}</MenuTriggerContextProvider>;
};

import * as React from 'react';
import { AnnounceProvider } from '@fluentui/react-shared-contexts';

import type { AriaLiveAnnouncerContextValues, AriaLiveAnnouncerState } from './AriaLiveAnnouncer.types';

export const renderAriaLiveAnnouncer_unstable = (
  state: AriaLiveAnnouncerState,
  contextValues: AriaLiveAnnouncerContextValues,
) => {
  return <AnnounceProvider value={contextValues.announce}>{state.children}</AnnounceProvider>;
};

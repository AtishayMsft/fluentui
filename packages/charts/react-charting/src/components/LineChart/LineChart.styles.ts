import { ILineChartStyleProps, ILineChartStyles } from './LineChart.types';

export const getStyles = (props: ILineChartStyleProps): ILineChartStyles => {
  return {
    root: [
      {
        '&:focus:not(:focus-visible)': {
          outline: 'none',
        },
        '@media (pointer: coarse)': {
          '&:focus': {
            outline: 'none',
          },
        },
      },
    ],
    tooltip: {
      ...props.theme!.fonts.medium,
      display: 'flex',
      flexDirection: 'column',
      padding: '8px',
      position: 'absolute',
      textAlign: 'center',
      top: '0px',
      background: props.theme!.semanticColors.bodyBackground,
      borderRadius: '2px',
      pointerEvents: 'none',
      color: props.theme!.semanticColors.bodyText,
    },
  };
};

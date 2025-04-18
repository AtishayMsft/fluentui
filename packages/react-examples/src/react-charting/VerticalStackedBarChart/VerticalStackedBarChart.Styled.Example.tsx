import * as React from 'react';
import {
  ChartHoverCard,
  VerticalStackedBarChart,
  IVSChartDataPoint,
  IVerticalStackedChartProps,
  IVerticalStackedBarChartProps,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { DefaultPalette, IStyle, DefaultFontStyles } from '@fluentui/react/lib/Styling';
import { ChoiceGroup, DirectionalHint, IChoiceGroupOption } from '@fluentui/react';
import { Toggle } from '@fluentui/react/lib/Toggle';

const options: IChoiceGroupOption[] = [
  { key: 'singleCallout', text: 'Single callout' },
  { key: 'MultiCallout', text: 'Stack callout' },
];

interface IVerticalStackedBarState {
  width: number;
  height: number;
  barGapMax: number;
  barCornerRadius: number;
  barMinimumHeight: number;
  selectedCallout: string;
  enableGradient: boolean;
  roundCorners: boolean;
}

export class VerticalStackedBarChartStyledExample extends React.Component<{}, IVerticalStackedBarState> {
  constructor(props: IVerticalStackedChartProps) {
    super(props);
    this.state = {
      width: 650,
      height: 350,
      barGapMax: 2,
      barCornerRadius: 2,
      barMinimumHeight: 1,
      selectedCallout: 'MultiCallout',
      enableGradient: false,
      roundCorners: false,
    };
  }
  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _onToggleGradient = (e: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ enableGradient: checked });
  };

  private _onToggleRoundedCorners = (e: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ roundCorners: checked });
  };

  private _basicExample(): JSX.Element {
    const firstChartPoints: IVSChartDataPoint[] = [
      { legend: 'meta data 1', data: 2, color: getColorFromToken(DataVizPalette.color8) },
      { legend: 'Meta data 2', data: 0.5, color: getColorFromToken(DataVizPalette.color9) },
      { legend: 'meta Data 3', data: 0, color: getColorFromToken(DataVizPalette.color10) },
    ];

    const secondChartPoints: IVSChartDataPoint[] = [
      { legend: 'meta data 1', data: 30, color: getColorFromToken(DataVizPalette.color8) },
      { legend: 'Meta data 2', data: 3, color: getColorFromToken(DataVizPalette.color9) },
      { legend: 'meta Data 3', data: 40, color: getColorFromToken(DataVizPalette.color10) },
    ];

    const thirdChartPoints: IVSChartDataPoint[] = [
      { legend: 'meta data 1', data: 10, color: getColorFromToken(DataVizPalette.color8) },
      { legend: 'Meta data 2', data: 60, color: getColorFromToken(DataVizPalette.color9) },
      { legend: 'meta Data 3', data: 30, color: getColorFromToken(DataVizPalette.color10) },
    ];

    const data: IVerticalStackedChartProps[] = [
      { chartData: firstChartPoints, xAxisPoint: 'Jan' },
      { chartData: secondChartPoints, xAxisPoint: 'Feb' },
      { chartData: thirdChartPoints, xAxisPoint: 'March' },
      { chartData: firstChartPoints, xAxisPoint: 'April' },
      { chartData: thirdChartPoints, xAxisPoint: 'May' },
      { chartData: firstChartPoints, xAxisPoint: 'June' },
      { chartData: secondChartPoints, xAxisPoint: 'July' },
      { chartData: thirdChartPoints, xAxisPoint: 'August' },
      { chartData: firstChartPoints, xAxisPoint: 'September' },
    ];

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    const textStyle: IStyle = {
      fill: DefaultPalette.black,
      fontSize: '10px',
      lineHeight: '14px',
    };

    const customStyles: IVerticalStackedBarChartProps['styles'] = () => {
      return {
        xAxis: {
          selectors: {
            text: { fill: getColorFromToken(DataVizPalette.color2), fontSize: '10px' },
          },
        },
        chart: {
          paddingBottom: '45px',
        },
        chartLabel: {
          color: getColorFromToken(DataVizPalette.color1),
          ...DefaultFontStyles.large,
        },
        xAxisText: {
          ...textStyle,
        },
      };
    };

    return (
      <div className="containerDiv">
        <div>
          <label htmlFor="ChangeWidth_Styled">Width:</label>
          <input
            type="range"
            value={this.state.width}
            min={200}
            max={1000}
            id="ChangeWidth_Styled"
            onChange={e => this.setState({ width: +e.target.value })}
            aria-valuetext={`ChangeWidthSlider${this.state.width}`}
          />
          <label htmlFor="changeHeight_Styled">Height:</label>
          <input
            type="range"
            value={this.state.height}
            min={200}
            max={1000}
            id="changeHeight_Styled"
            onChange={e => this.setState({ height: +e.target.value })}
            aria-valuetext={`ChangeHeightslider${this.state.height}`}
          />
        </div>
        <div>
          <label htmlFor="changeBarGapMax_Styled">BarGapMax:</label>
          <input
            type="range"
            value={this.state.barGapMax}
            min={0}
            max={10}
            id="changeBarGapMax_Styled"
            onChange={e => this.setState({ barGapMax: +e.target.value })}
            aria-valuetext={`ChangebarGapMaxslider${this.state.barGapMax}`}
          />
          <label htmlFor="ChangeBarCornerRadius_condition">BarCornerRadius:</label>
          <input
            type="range"
            value={this.state.barCornerRadius}
            min={0}
            max={10}
            id="ChangeBarCornerRadius_condition"
            onChange={e => this.setState({ barCornerRadius: +e.target.value })}
            aria-valuetext={`ChangeBarCornerRadiusSlider${this.state.barCornerRadius}`}
          />
          <label htmlFor="ChangeBarMinimumHeight_condition">BarMinimumHeight:</label>
          <input
            type="range"
            value={this.state.barMinimumHeight}
            min={0}
            max={10}
            id="ChangeBarMinimumHeight_condition"
            onChange={e => this.setState({ barMinimumHeight: +e.target.value })}
            aria-valuetext={`ChangebarBarMinimumHeightslider${this.state.barMinimumHeight}`}
          />
          <div style={{ display: 'flex' }}>
            <ChoiceGroup
              options={options}
              defaultSelectedKey="MultiCallout"
              // eslint-disable-next-line react/jsx-no-bind
              onChange={(_ev, option) => option && this.setState({ selectedCallout: option.key })}
              label="Pick one"
            />
            &nbsp;&nbsp;
            <Toggle label="Enable Gradient" onText="ON" offText="OFF" onChange={this._onToggleGradient} />
            &nbsp;&nbsp;
            <Toggle label="Rounded Corners" onText="ON" offText="OFF" onChange={this._onToggleRoundedCorners} />
          </div>
        </div>
        <div style={rootStyle}>
          <VerticalStackedBarChart
            chartTitle="Vertical stacked bar chart styled example"
            data={data}
            {...this.state}
            yAxisTickCount={10}
            // eslint-disable-next-line react/jsx-no-bind
            onBarClick={(event, clickData) => console.log('clicked', event, clickData)}
            // eslint-disable-next-line react/jsx-no-bind
            styles={customStyles}
            yMaxValue={120}
            isCalloutForStack={this.state.selectedCallout === 'MultiCallout'}
            calloutProps={{
              directionalHint: DirectionalHint.topAutoEdge,
            }}
            // eslint-disable-next-line react/jsx-no-bind
            yAxisTickFormat={(x: number | string) => `${x} h`}
            margins={{
              bottom: 35,
              top: 10,
              left: 35,
              right: 0,
            }}
            legendProps={{
              allowFocusOnLegends: true,
              styles: {
                rect: {
                  borderRadius: '3px',
                },
                legend: {
                  textTransform: 'none',
                },
              },
            }}
            {...(this.state.selectedCallout === 'singleCallout' && {
              onRenderCalloutPerDataPoint: (props: IVSChartDataPoint) => {
                return props ? (
                  <ChartHoverCard
                    XValue={props.xAxisCalloutData}
                    Legend={props.legend}
                    YValue={`${props.yAxisCalloutData || props.data} h`}
                    color={props.color}
                  />
                ) : null;
              },
            })}
            svgProps={{
              'aria-label': 'Example chart with metadata per month',
            }}
            enableReflow={true}
            enableGradient={this.state.enableGradient}
            roundCorners={this.state.roundCorners}
          />
        </div>
      </div>
    );
  }
}

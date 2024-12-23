import * as React from 'react';
import { getId} from '@fluentui/react/lib/Utilities';
import {
  CartesianChart,
  ICartesianChartProps,
  IBasestate,
  ILineChartPoints,
  IChildProps,
  IMargins,
  IChartProps,
} from '../../index';
import {
  getXAxisType,
  ChartTypes,
  XAxisTypes,
  findNumericMinMaxOfY,
  createNumericYAxis,
  IDomainNRange,
  domainRangeOfNumericForAreaChart,
  domainRangeOfDateForAreaLineVerticalBarChart,
  createStringYAxis,
} from '../../utilities/index';
import { ILegend, Legends } from '../Legends/index';
import { DirectionalHint } from '@fluentui/react/lib/Callout';

export interface IBaseChartProps extends ICartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data: IChartProps;
}

export abstract class BaseChart<P extends IBaseChartProps, S extends IBasestate> extends React.Component<P, S> {
  public static defaultProps: Partial<IBaseChartProps> = {
  };
  protected margins: IMargins;
  private _emptyChartId: string;
  private _uniqueCallOutID: string;
  
  public constructor(props: P) {
    super(props);
    this._emptyChartId = getId('Chart_empty');
    this._uniqueCallOutID = getId('Callout');
  }

  public render(): JSX.Element {
    if (!this._isChartEmpty()) {
        const { lineChartData } = this.props.data;
        const points = this._preparePoints(lineChartData); 
        const isXAxisDateType = getXAxisType(points);

        const tickParams = {
            tickValues: this.props.tickValues,
            tickFormat: this.props.tickFormat,
            };

        const calloutProps = {
            target: this.state.refSelected,
            isCalloutVisible: this.state.isCalloutVisible,
            directionalHint: DirectionalHint.topAutoEdge,
            YValueHover: this.state.YValueHover,
            hoverXValue: this.state.hoverXValue,
            id: `toolTip${this._uniqueCallOutID}`,
            gapSpace: 15,
            isBeakVisible: false,
            onDismiss: this._closeCallout,
            'data-is-focusable': true,
            //xAxisCalloutAccessibilityData: this.state.xAxisCalloutAccessibilityData,
            ...this.props.calloutProps,
            };

      return (
        <CartesianChart
          {...this.props}
          chartTitle={this._getChartTitle()}
          points={points}
          chartType={ChartTypes.AreaChart}
          calloutProps={calloutProps}
          legendBars={this._createLegends(points)}
          createYAxis={createNumericYAxis}
          isCalloutForStack
          xAxisType={isXAxisDateType ? XAxisTypes.DateAxis : XAxisTypes.NumericAxis}
          tickParams={tickParams}
          maxOfYVal={this._getMaxOfYVal()}
          getGraphData={this._getGraphData}
          getDomainNRangeValues={this._getDomainNRangeValues}
          createStringYAxis={createStringYAxis}
          getmargins={this._getMargins}
          getMinMaxOfYAxis={findNumericMinMaxOfY}
          customizedCallout={this._getCustomizedCallout()}
          onChartMouseLeave={this._handleChartMouseLeave}
          enableFirstRenderOptimization={true}
          /* eslint-disable react/jsx-no-bind */
          // eslint-disable-next-line react/no-children-prop
          children={this._getChildren}
        />
      );
    }
    return (
      <div
        id={this._emptyChartId}
        role={'alert'}
        style={{ opacity: '0' }}
        aria-label={'Graph has no data to display'}
      />
    );
  }

  abstract _preparePoints(lineChartData?: ILineChartPoints[]): ILineChartPoints[] ;

  abstract _getLegendData(points: ILineChartPoints[]): ILegend[];

  abstract _handleChartMouseLeave(): void;

  abstract _getChartTitle(): string;

  abstract _getGraphData(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xAxis: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yAxis: any,
    containerHeight: number,
    containerWidth: number,
    xElement: SVGElement | null,
  ): JSX.Element[];

  abstract _getMaxOfYVal(): number;

  abstract _getCustomizedCallout(): any;

  abstract _getChildren(props: IChildProps): React.ReactNode;

  abstract _isChartEmpty(): boolean;

  protected _closeCallout = () => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  
    private _getMargins = (margins: IMargins) => {
      this.margins = margins;
    };

    private _getDomainNRangeValues = (
        points: ILineChartPoints[],
        margins: IMargins,
        width: number,
        chartType: ChartTypes,
        isRTL: boolean,
        xAxisType: XAxisTypes,
        barWidth: number,
        tickValues: Date[] | number[] | undefined,
    ) => {
        let domainNRangeValue: IDomainNRange;
        if (xAxisType === XAxisTypes.NumericAxis) {
        domainNRangeValue = domainRangeOfNumericForAreaChart(points, margins, width, isRTL);
        } else if (xAxisType === XAxisTypes.DateAxis) {
        domainNRangeValue = domainRangeOfDateForAreaLineVerticalBarChart(
            points,
            margins,
            width,
            isRTL,
            tickValues! as Date[],
            chartType,
            barWidth,
        );
        } else {
        domainNRangeValue = { dStartValue: 0, dEndValue: 0, rStartValue: 0, rEndValue: 0 };
        }
        return domainNRangeValue;
    };

  private _createLegends = (points: ILineChartPoints[]): JSX.Element => {
    const legendData = this._getLegendData(points);
    const actions: ILegend[] = [];

    legendData.forEach((ld: ILegend) => {
      const legend: ILegend = {
        title: ld.title,
        color: ld.color,
        action: () => {
          this._onLegendClick(ld.title);
        },
        hoverAction: () => {
          this._handleChartMouseLeave();
          this._onLegendHover(ld.title);
        },
        onMouseOutAction: () => {
          this._onLegendLeave();
        },
      };

      actions.push(legend);
    });
    return (
      <Legends
        legends={actions}
        overflowProps={this.props.legendsOverflowProps}
        enabledWrapLines={this.props.enabledLegendsWrapLines}
        focusZonePropsInHoverCard={this.props.focusZonePropsForLegendsInHoverCard}
        {...this.props.legendProps}
      />
    );
  };

  private _onLegendClick(legend: string): void {
    if (this.state.selectedLegend === legend) {
      this.setState({
        selectedLegend: '',
      });
    } else {
      this.setState({
        selectedLegend: legend,
      });
    }
  }

  private _onLegendHover(legend: string): void {
    this.setState({
      activeLegend: legend,
    });
  }

  private _onLegendLeave(): void {
    this.setState({
      activeLegend: '',
    });
  }

  /**
   * This function checks if the given legend is highlighted or not.
   * A legend can be highlighted in 2 ways:
   * 1. selection: if the user clicks on it
   * 2. hovering: if there is no selected legend and the user hovers over it
   */
  private _legendHighlighted = (legend: string) => {
    return (
      this.state.selectedLegend === legend || (this.state.selectedLegend === '' && this.state.activeLegend === legend)
    );
  };

  /**
   * This function checks if none of the legends is selected or hovered.
   */
  private _noLegendHighlighted = () => {
    return this.state.selectedLegend === '' && this.state.activeLegend === '';
  };
}

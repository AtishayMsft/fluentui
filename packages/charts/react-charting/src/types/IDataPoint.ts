import * as React from 'react';
import { SankeyLink, SankeyNode } from 'd3-sankey';
import { LegendShape } from '../components/Legends/Legends.types';
import { CurveFactory } from 'd3-shape';

export interface IBasestate {
  _width?: number;
  _height?: number;
  activeLegend?: string;
  color?: string;
  dataForHoverCard?: number | string;
  isCalloutVisible: boolean;
  isLegendSelected?: boolean;
  isLegendHovered?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refSelected?: any;
  YValueHover?: { legend?: string; y?: number | string; color?: string }[];
  hoverYValue?: string | number | null;
  hoverXValue?: string | number | null;
  xCalloutValue?: string;
  yCalloutValue?: string;
  lineColor?: string;
  hoveredLineColor?: string;
  selectedLegend?: string;
  containerWidth?: number;
  containerHeight?: number;
}

export interface IRefArrayData {
  index?: string;
  refElement?: SVGGElement;
}

/**
 * {@docCategory IChartProps}
 */
export interface IMargins {
  /**
   * left margin for the chart.
   */
  left?: number;
  /**
   * Right margin for the chart.
   */
  right?: number;
  /**
   * Top margin for the chart.
   */
  top?: number;
  /**
   * Bottom margin for the chart.
   */
  bottom?: number;
}

/**
 * {@docCategory IChartData}
 */
export interface IDataPoint {
  /**
   * Independent value of the data point, rendered along the x-axis.
   * If x is a number, then each y-coordinate is plotted at its x-coordinate.
   * If x is a string, then the data is evenly spaced along the x-axis.
   */
  x: number | string;

  /**
   * Dependent value of the data point, rendered along the y-axis.
   */
  y: number;

  // NOTE: VerticalStackedBarChart, PieChart
  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;
}

/**
 * {@docCategory IChartData}
 */
export interface IVerticalStackedBarDataPoint extends Omit<IDataPoint, 'x'> {
  /**
   * Independent value of the data point, rendered along the x-axis.
   * If x is a number, then each y-coordinate is plotted at its x-coordinate.
   * If x is a string, then the data is evenly spaced along the x-axis.
   * If data type on x is Date, then the data is spaced evenly by d3-scale.
   */
  x: number | string | Date;
}

/**
 * {@docCategory IChartData}
 */
export interface IHorizontalDataPoint {
  /**
   * Independent value of the data point, rendered along the x-axis.
   * If x is a number, then each y-coordinate is plotted at its x-coordinate.
   * If x is a string, then the data is evenly spaced along the x-axis.
   */
  x: number;

  /**
   * Dependent value of the data point, rendered along the y-axis.
   */
  y: number;
}

/**
 * {@docCategory IChartData}
 */
export interface IChartDataPoint {
  /**
   * Legend text for the datapoint in the chart
   */
  legend?: string;

  /**
   * data the datapoint in the chart
   */
  data?: number;

  /**
   * data the datapoint in the chart
   */
  horizontalBarChartdata?: IHorizontalDataPoint;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;

  /**
   * Color for the legend in the chart. If not provided, it will fallback on the default color palette.
   */
  color?: string;

  /**
   * Gradient for the legend in the chart. If not provided, it will fallback on the default color palette.
   * If provided, it will override the color prop. granted `enableGradient` is set to true for the chart.
   */
  gradient?: [string, string];

  /**
   * placeholder data point
   */
  placeHolder?: boolean;

  /**
   * Callout data for x axis
   * This is an optional prop, If haven;t given legend will take
   */
  xAxisCalloutData?: string;

  /**
   * Callout data for y axis
   * This is an optional prop, If haven't given data will take
   */
  yAxisCalloutData?: string;

  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: IAccessibilityProps;
}

/**
 * {@docCategory IChartData}
 */
export interface IVerticalBarChartDataPoint {
  /**
   * Independent value of the data point, rendered along the x-axis.
   * If x is a number, then each y-coordinate is plotted at its x-coordinate.
   * If x is a string, then the data is evenly spaced along the x-axis.
   */
  x: number | string | Date;

  /**
   * Dependent value of the data point, rendered along the y-axis.
   */
  y: number;

  /**
   * Legend text for the datapoint in the chart
   */
  legend?: string;

  /**
   * color for the legend in the chart
   */
  color?: string;

  /**
   * Gradient for the legend in the chart. If not provided, it will fallback on the default color palette.
   * If provided, it will override the color prop. granted `enableGradient` is set to true for the chart.
   */
  gradient?: [string, string];

  /**
   * Callout data for x axis
   * This is an optional prop, If haven;t given legend will take
   */
  xAxisCalloutData?: string;

  /**
   * Callout data for y axis
   * This is an optional prop, If haven't given data will take
   */
  yAxisCalloutData?: string;

  /**
   * data to render the line along with bars
   */
  lineData?: ILineDataInVerticalBarChart;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;

  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: IAccessibilityProps;
}

/**
 * {@docCategory IChartData}
 */
export interface IHorizontalBarChartWithAxisDataPoint {
  /**
   * Dependent value of the data point, rendered along the x-axis.
   */
  x: number;

  /**
   * Independent value of the data point, rendered along the y-axis.
   * If y is a number, then each y-coordinate is plotted at its y-coordinate.
   * If y is a string, then the data is evenly spaced along the y-axis.
   */
  y: number | string;

  /**
   * Legend text for the datapoint in the chart
   */
  legend?: string;

  /**
   * color for the legend in the chart
   */
  color?: string;

  /**
   * Gradient for the legend in the chart. If not provided, it will fallback on the default color palette.
   * If provided, it will override the color prop. granted `enableGradient` is set to true for the chart.
   */
  gradient?: [string, string];

  /**
   * Callout data for x axis
   * This is an optional prop, If haven;t given legend will take
   */
  xAxisCalloutData?: string;

  /**
   * Callout data for y axis
   * This is an optional prop, If haven't given data will take
   */
  yAxisCalloutData?: string;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;

  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: IAccessibilityProps;
}

/**
 * {@docCategory IChartData}
 */
export interface ILineDataInVerticalBarChart {
  y: IVerticalBarChartDataPoint['y'];
  yAxisCalloutData?: string | undefined;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;
  /**
   * Whether to use the secondary y scale or not
   * False by default.
   */
  useSecondaryYScale?: boolean;
}

/**
 * {@docCategory IChartData}
 */
export interface IBaseDataPoint {
  /**
   * Defines the function that is executed on clicking  line
   */
  onDataPointClick?: () => void;

  /**
   * Callout data for x axis
   */
  xAxisCalloutData?: string;

  /**
   * Callout data for y axis
   */
  yAxisCalloutData?: string | { [id: string]: number };

  /**
   * Whether to hide callout data for the point.
   */
  hideCallout?: boolean;

  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: IAccessibilityProps;

  /**
   * X axis Accessibility data for callout
   */
  xAxisCalloutAccessibilityData?: IAccessibilityProps;

  /**
   * Marker size of the points
   */
  markerSize?: number;

  /**
   * text labels of marker points
   */
  text?: string;
}

/**
 * {@docCategory IChartData}
 */
export interface ILineChartDataPoint extends IBaseDataPoint {
  /**
   * Independent value of the data point, rendered along the x-axis.
   * If x is a number, then each y-coordinate is plotted at its x-coordinate.
   * If data type on x is Date, then the data is spaced evenly by d3-scale
   */
  x: number | Date;

  /**
   * Dependent value of the data point, rendered along the y-axis.
   */
  y: number;
}

/**
 * {@docCategory IChartData}
 */
export interface ILineChartGap {
  /**
   * Starting index of the gap.
   */
  startIndex: number;

  /**
   * Ending index of the gap.
   */
  endIndex: number;
}

/**
 * {@docCategory IChartProps}
 */
export interface ILineChartLineOptions extends React.SVGProps<SVGPathElement> {
  /**
   * Width of the line/stroke.
   * Overrides the strokeWidth set on ICartesianChartProps level.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width
   */
  strokeWidth?: number | string;

  /**
   * Pattern of dashes and gaps.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray
   */
  strokeDasharray?: string | number;

  /**
   * Offset on rendering of stroke dash array.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset
   */
  strokeDashoffset?: string | number;

  /**
   * Shape at the end of a subpath.
   * Default round.
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap
   */
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';

  /**
   * Width of border around the line. Default no border.
   */
  lineBorderWidth?: string | number;

  /**
   * Color of border around the line. Default white.
   */
  lineBorderColor?: string;

  /**
   * Defines the type of interpolation used to render the line.
   * @default 'linear'
   */
  curve?: 'linear' | 'natural' | 'step' | 'stepAfter' | 'stepBefore' | CurveFactory;

  /**
   * Defines the mode of points to be rendered.
   */
  mode?:
    | 'lines'
    | 'markers'
    | 'text'
    | 'lines+markers'
    | 'text+markers'
    | 'text+lines'
    | 'text+lines+markers'
    | 'none'
    | 'gauge'
    | 'number'
    | 'delta'
    | 'number+delta'
    | 'gauge+number'
    | 'gauge+number+delta'
    | 'gauge+delta'
    | 'markers+text'
    | 'lines+text';
}

/**
 * {@docCategory IChartData}
 */
export interface ILineChartPoints {
  /**
   * Legend text for the datapoint in the chart
   */
  legend: string;

  /**
   * The shape for the legend
   * default: show the rect legend
   */
  legendShape?: LegendShape;

  /**
   * dataPoints for the line chart
   */
  data: ILineChartDataPoint[];

  /**
   * gaps in the line chart where a line is not drawn
   */
  gaps?: ILineChartGap[];

  /**
   * color for the legend in the chart
   */
  color?: string;

  /**
   * opacity for chart fill color
   */
  opacity?: number;

  /**
   * options for the line drawn
   */
  lineOptions?: ILineChartLineOptions;

  /**
   * hide dots for points that are not active
   */
  hideNonActiveDots?: boolean;

  /**
   * Defines the function that is executed on clicking this legend
   */
  onLegendClick?: (selectedLegend: string | null | string[]) => void;

  /**
   * Defines the function that is executed on clicking  line
   */
  onLineClick?: () => void;

  /**
   * Whether to use the secondary y scale or not
   * False by default.
   */
  useSecondaryYScale?: boolean;
}

/**
 * {@docCategory IChartProps}
 */
export interface IChartProps {
  /**
   * chart title for the chart
   */
  chartTitle?: string;

  /**
   * Accessibility data for chart title
   */
  chartTitleAccessibilityData?: IAccessibilityProps;
  /**
   * data for the points in the chart
   */
  chartData?: IChartDataPoint[];

  /**
   * Accessibility data for chart data
   */
  chartDataAccessibilityData?: IAccessibilityProps;

  /**
   * data for the points in the line chart
   */
  lineChartData?: ILineChartPoints[];

  /**
   * data for the points in the scatter chart
   */
  scatterChartData?: IScatterChartPoints[];

  /**
   * data for the points in the line chart
   */
  SankeyChartData?: ISankeyChartData;

  /**
   * data for the points in the line chart
   */
  pointOptions?: React.SVGProps<SVGCircleElement>;

  /**
   * data for the dotted line on hovering the point
   */
  pointLineOptions?: React.SVGProps<SVGLineElement>;
}

/**
 * {@docCategory IChartData}
 */
export interface ISankeyChartData {
  nodes: SNode[];
  links: SLink[];
}

interface ISNodeExtra {
  /**
   * A unique identifier for this node.
   */
  nodeId: number | string;
  /**
   * The display name for this node in the UX.
   */
  name: string;
  color?: string;
  borderColor?: string;
  actualValue?: number;
  layer?: number;
}

interface ISLinkExtra {
  /**
   * The index within `ISankeyChartData.nodes` of the source node.
   */
  source: number;
  /**
   * The index within `ISankeyChartData.nodes` of the target node.
   */
  target: number;
  /**
   * The weight of this link between the two nodes.
   */
  value: number;
  unnormalizedValue?: number;
}

export type SNode = SankeyNode<ISNodeExtra, ISLinkExtra>;
export type SLink = SankeyLink<ISNodeExtra, ISLinkExtra>;

/**
 * {@docCategory IChartProps}
 */
export interface IAccessibilityProps {
  /**
   * Accessibility aria-label
   */
  ariaLabel?: string;

  /**
   * Accessibility aria-labelledBy
   */
  ariaLabelledBy?: string;

  /**
   * Accessibility aria-describedBy
   */
  ariaDescribedBy?: string;
}

/**
 * {@docCategory IChartData}
 */
export interface IVSChartDataPoint {
  /**
   * data the datapoint in the chart
   */
  data: number | string;

  /**
   * Legend text for the datapoint in the chart
   */
  legend: string;

  /**
   * color for the legend in the chart
   */
  color?: string;

  /**
   * Gradient for the legend in the chart. If not provided, it will fallback on the default color palette.
   * If provided, it will override the color prop. granted `enableGradient` is set to true for the chart.
   */
  gradient?: [string, string];

  /**
   * Callout data for x axis
   * This is an optional prop, If haven;t given legend will take
   */
  xAxisCalloutData?: string;

  /**
   * Callout data for y axis
   * This is an optional prop, If haven't given data will take
   */
  yAxisCalloutData?: string;

  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: IAccessibilityProps;
}

/**
 * {@docCategory IChartProps}
 */
export interface IVerticalStackedChartProps {
  /**
   * data for the points in the chart
   */
  chartData: IVSChartDataPoint[];

  /**
   * Data for x axis label for multistacked Vertical bar chart
   */
  xAxisPoint: number | string | Date;

  /**
   * Callout data for x axis
   * This is an optional prop, If haven't given, legend will take
   */
  xAxisCalloutData?: string;
  /**
   * line data to render lines on stacked bar chart
   */
  lineData?: ILineDataInVerticalStackedBarChart[];
  /**
   * Accessibility data for Whole stack callout
   */
  stackCallOutAccessibilityData?: IAccessibilityProps;
}

/**
 * {@docCategory IChartData}
 */
export interface ILineDataInVerticalStackedBarChart {
  y: number | string;
  color: string;
  legend: string;
  /**
   * The shape for the legend
   * default: show the rect legend
   */
  legendShape?: LegendShape;
  /**
   * Data to show in callout
   */
  data?: number | string;
  yAxisCalloutData?: string;
  /**
   * Whether to use the secondary y scale or not
   * False by default.
   */
  useSecondaryYScale?: boolean;
  /**
   * options for the line drawn
   */
  lineOptions?: ILineChartLineOptions;
}

/**
 * {@docCategory IChartData}
 */
export interface IGVBarChartSeriesPoint {
  /**
   * Text for // need to check use of this
   */
  key: string;

  /**
   * Data for bar height of Grouped vertical bar chart
   */
  data: number;

  /**
   * Color for the legend in the chart
   */
  color: string;

  /**
   * Gradient for the legend in the chart. If not provided, it will fallback on the default color palette.
   * If provided, it will override the color prop. granted `enableGradient` is set to true for the chart.
   */
  gradient?: [string, string];

  /**
   * Legend text in the chart
   */
  legend: string;

  /**
   * Callout data for x axis
   * This is an optional prop, If haven;t given legend will take
   */
  xAxisCalloutData?: string;

  /**
   * Callout data for y axis
   * This is an optional prop, If haven't given data will take
   */
  yAxisCalloutData?: string;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;

  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: IAccessibilityProps;

  /**
   * Whether to use the secondary y scale or not
   * False by default.
   */
  useSecondaryYScale?: boolean;
}

/**
 * {@docCategory IChartData}
 */
export interface IGroupedVerticalBarChartData {
  /**
   * Data for X axis label
   */
  name: string;

  /**
   * Data points for Grouped vertical bar chart
   */
  series: IGVBarChartSeriesPoint[];

  /**
   * Accessibility data for Group Bars Stack Callout
   */
  stackCallOutAccessibilityData?: IAccessibilityProps;
}

export interface IGVDataPoint {
  /**
   * This interface used for - While forming datapoints from given prop "data" in code
   * datapoints are used for to draw graph
   */
  [key: string]: number | string;
}

export interface IGVSingleDataPoint {
  /**
   * While forming datapoints from given prop "data" in code.
   * These datapoints are used for to draw graph easily.
   */
  [key: string]: IGVDataPoint;
}

export interface IGVForBarChart {
  /**
   * While forming datapoints from given prop "data"
   * These datapoints are used for to draw graph.
   */
  [key: string]: IGVBarChartSeriesPoint;
}

/**
 * {@docCategory IChartData}
 */
export interface IHeatMapChartDataPoint {
  x: string | Date | number;
  y: string | Date | number;
  value: number;
  /**
   * The value/ text to be rendered in the rectange
   */
  rectText?: string | number;
  /**
   * denomination to show in the callout
   */
  ratio?: [number, number];
  /**
   * description message to the callout
   */
  descriptionMessage?: string;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;
  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: IAccessibilityProps;
}

/**
 * {@docCategory IChartData}
 */
export interface IHeatMapChartData {
  /**
   * name of the legend
   */
  legend: string;
  data: IHeatMapChartDataPoint[];
  /**
   * This  number will be used to get the color for the legend
   */
  value: number;
}

/**
 * {@docCategory IChartData}
 */
export interface ICustomizedCalloutDataPoint {
  legend: string;
  y: number;
  color: string;
  xAxisCalloutData?: string;
  yAxisCalloutData?: string | { [id: string]: number };
}

/**
 * Used for custom callout data interface. As Area chart callout data will be prepared from given props.data,
 * Those required data passing to onRenderCalloutPerDataPoint and onRenderCalloutPerStack.
 * {@docCategory IChartData}
 */
export interface ICustomizedCalloutData {
  x: number | string | Date;
  values: ICustomizedCalloutDataPoint[];
}

/**
 * {@docCategory Chart}
 */
export interface IChart {
  chartContainer: HTMLElement | null;
  toImage?: (opts?: IImageExportOptions) => Promise<string>;
}

/**
 * {@docCategory Chart}
 */
export interface IImageExportOptions {
  width?: number;
  height?: number;
  scale?: number;
  background?: string;
}

/**
 * {@docCategory IChartData}
 * ScatterChartDataPoint interface.
 */
export interface IScatterChartDataPoint extends IBaseDataPoint {
  /**
   * Independent value of the data point, rendered along the x-axis.
   */
  x: number | Date | string;

  /**
   * Dependent value of the data point, rendered along the y-axis.
   */
  y: number;
}

/**
 * {@docCategory IChartData}
 */
export interface IScatterChartPoints {
  /**
   * Legend text for the datapoint in the chart
   */
  legend: string;

  /**
   * The shape for the legend
   * default: show the rect legend
   */
  legendShape?: LegendShape;

  /**
   * dataPoints for the line chart
   */
  data: IScatterChartDataPoint[];

  /**
   * color for the legend in the chart
   */
  color?: string;

  /**
   * opacity for chart fill color
   */
  opacity?: number;

  /**
   * hide dots for points that are not active
   */
  hideNonActiveDots?: boolean;

  /**
   * Defines the function that is executed on clicking this legend
   */
  onLegendClick?: (selectedLegend: string | null | string[]) => void;

  /**
   * Whether to use the secondary y scale or not
   * False by default.
   */
  useSecondaryYScale?: boolean;
}

/**
 * Specifies the ordering options for axis categories in Cartesian charts.
 *
 * - `'default'`: Uses the original order before custom ordering was supported.
 *   In some charts, this behaves the same as `'data'`.
 * - `'data'`: Preserves the order of categories as provided in the input data.
 * - `string[]`: Explicitly defines the custom order of categories as an array of category names.
 * - `'category ascending' | 'category descending'`: Orders categories alphanumerically.
 * - `'total ascending' | 'total descending'`: Orders categories by the total of their associated values.
 * - `'min ascending' | 'min descending'`: Orders by the minimum value within each category.
 * - `'max ascending' | 'max descending'`: Orders by the maximum value within each category.
 * - `'sum ascending' | 'sum descending'`: Orders by the sum of values for each category (same as 'total').
 * - `'mean ascending' | 'mean descending'`: Orders by the average of values in each category.
 * - `'median ascending' | 'median descending'`: Orders by the median value of each category.
 *
 * {@docCategory CartesianChart}
 */
export type AxisCategoryOrder =
  | 'default'
  | 'data'
  | string[]
  | 'category ascending'
  | 'category descending'
  | 'total ascending'
  | 'total descending'
  | 'min ascending'
  | 'min descending'
  | 'max ascending'
  | 'max descending'
  | 'sum ascending'
  | 'sum descending'
  | 'mean ascending'
  | 'mean descending'
  | 'median ascending'
  | 'median descending';

/**
 * {@docCategory IChartData}
 */
export interface IGanttChartDataPoint {
  /**
   * Dependent value of the data point, rendered along the x-axis.
   */
  x: {
    start: Date | number;
    end: Date | number;
  };

  /**
   * Independent value of the data point, rendered along the y-axis.
   * If y is a number, then each y-coordinate is plotted at its y-coordinate.
   * If y is a string, then the data is evenly spaced along the y-axis.
   */
  y: number | string;

  /**
   * Legend text for the datapoint in the chart
   */
  legend?: string;

  /**
   * color for the legend in the chart
   */
  color?: string;

  /**
   * Gradient for the legend in the chart. If not provided, it will fallback on the default color palette.
   * If provided, it will override the color prop. granted `enableGradient` is set to true for the chart.
   */
  gradient?: [string, string];

  /**
   * Callout data for x axis
   * This is an optional prop, If haven;t given legend will take
   */
  xAxisCalloutData?: string;

  /**
   * Callout data for y axis
   * This is an optional prop, If haven't given data will take
   */
  yAxisCalloutData?: string;

  /**
   * onClick action for each datapoint in the chart
   */
  onClick?: VoidFunction;

  /**
   * Accessibility data for callout
   */
  callOutAccessibilityData?: IAccessibilityProps;
}

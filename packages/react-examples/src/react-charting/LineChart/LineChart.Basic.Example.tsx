import * as React from 'react';
import { IChartProps, ILineChartProps, LineChart } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { Toggle } from '@fluentui/react/lib/Toggle';

interface ILineChartBasicState {
  width: number;
  height: number;
  allowMultipleShapes: boolean;
}

export class LineChartBasicExample extends React.Component<{}, ILineChartBasicState> {
  constructor(props: ILineChartProps) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
      allowMultipleShapes: false,
    };
  }

  private DATAPOINTS = 2000;

  private generatedata() {
    let data = [];
    let startdate = new Date('2020-03-01T00:00:00.000Z');

    for (let i = 0; i < this.DATAPOINTS; i++) {
      let newDate = new Date(new Date(startdate).setHours(startdate.getHours() + i));
      data[i] = {
        x: newDate,
        y: 290800 + i * 10,
      };
    }

    return data;
  }

  private generatedata2() {
    let data = [];
    let startdate = new Date('2020-03-01T00:00:00.000Z');

    for (let i = 0; i < this.DATAPOINTS; i++) {
      let newDate = new Date(new Date(startdate).setHours(startdate.getHours() + i));
      data[i] = {
        x: newDate,
        y: 200800 - i * 100,
      };
    }

    return data;
  }

  private generatedata3() {
    let data = [];
    let startdate = new Date('2020-03-01T00:00:00.000Z');

    for (let i = 0; i < this.DATAPOINTS; i++) {
      let newDate = new Date(new Date(startdate).setHours(startdate.getHours() + i));
      data[i] = {
        x: newDate,
        y: 100800 + ((i * i) % 10000),
      };
    }

    return data;
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
  private _onShapeChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
    this.setState({ allowMultipleShapes: checked });
  };

  private _basicExample(): JSX.Element {
    const data: IChartProps = {
      chartTitle: 'Line Chart',
      lineChartData: [
        {
          legend: 'From_Legacy_to_O365',
          data: this.generatedata(),
          color: DefaultPalette.blue,
          onLineClick: () => console.log('From_Legacy_to_O365'),
        },
        {
          legend: 'All',
          data: this.generatedata2(),
          color: DefaultPalette.green,
        },
        {
          legend: 'All',
          data: this.generatedata3(),
          color: DefaultPalette.red,
        },
        {
          legend: 'single point',
          data: [
            {
              x: new Date('2020-03-05T00:00:00.000Z'),
              y: 282000,
            },
          ],
          color: DefaultPalette.yellow,
        },
      ],
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };
    const margins = { left: 35, top: 20, bottom: 35, right: 20 };

    return (
      <>
        <label>change Width:</label>
        <input type="range" value={this.state.width} min={200} max={1000} onChange={this._onWidthChange} />
        <label>change Height:</label>
        <input type="range" value={this.state.height} min={200} max={1000} onChange={this._onHeightChange} />
        <Toggle
          label="Enabled  multiple shapes for each line"
          onText="On"
          offText="Off"
          onChange={this._onShapeChange}
          checked={this.state.allowMultipleShapes}
        />
        <div style={rootStyle}>
          <LineChart
            culture={window.navigator.language}
            data={data}
            legendsOverflowText={'Overflow Items'}
            yMinValue={200}
            yMaxValue={301}
            height={this.state.height}
            width={this.state.width}
            margins={margins}
            allowMultipleShapesForPoints={this.state.allowMultipleShapes}
          />
        </div>
      </>
    );
  }
}

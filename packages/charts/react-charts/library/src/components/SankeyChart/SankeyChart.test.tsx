/* eslint-disable @typescript-eslint/no-explicit-any */
import { FluentProvider } from '@fluentui/react-provider';
import { webDarkTheme } from '@fluentui/react-theme';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import * as React from 'react';
import { getByClass, getById, testWithWait, testWithoutWait } from '../../utilities/TestUtility.test';
import { SankeyChart } from './SankeyChart';
import { ChartProps } from './index';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { SankeyChartAccessibilityProps, SankeyChartProps, SankeyChartStrings } from './index';

expect.extend(toHaveNoViolations);

const data: () => ChartProps = () => ({
  chartTitle: 'Sankey Chart',
  SankeyChartData: {
    nodes: [
      { nodeId: 0, name: '192.168.42.72', color: '#8764B8', borderColor: '#4B3867' },
      { nodeId: 1, name: '172.152.48.13', color: '#8764B8', borderColor: '#4B3867' },
      { nodeId: 2, name: '124.360.55.1', color: '#8764B8', borderColor: '#4B3867' },
      { nodeId: 3, name: '192.564.10.2', color: '#8764B8', borderColor: '#4B3867' },
      { nodeId: 4, name: '124.124.50.1', color: '#8764B8', borderColor: '#4B3867' },
      { nodeId: 5, name: '172.630.89.4', color: '#8764B8', borderColor: '#4B3867' },
      { nodeId: 6, name: 'inbox', color: '#0E7878', borderColor: '#004E4E' },
      { nodeId: 7, name: 'Junk Folder', color: '#0E7878', borderColor: '#004E4E' },
      { nodeId: 8, name: 'Deleted Folder', color: '#0E7878', borderColor: '#004E4E' },
      { nodeId: 9, name: 'Clicked', color: '#4F6BED', borderColor: '#3B52B4' },
      { nodeId: 10, name: 'Opened', color: '#4F6BED', borderColor: '#3B52B4' },
      { nodeId: 11, name: ' No further action  required', color: '#4F6BED', borderColor: '#3B52B4' },
    ],
    links: [
      { source: 0, target: 6, value: 80 },
      { source: 1, target: 6, value: 50 },
      { source: 1, target: 7, value: 28 },
      { source: 2, target: 7, value: 14 },
      { source: 3, target: 7, value: 7 },
      { source: 3, target: 8, value: 20 },
      { source: 4, target: 7, value: 10 },
      { source: 5, target: 7, value: 10 },

      { source: 6, target: 9, value: 30 },
      { source: 6, target: 10, value: 55 },
      { source: 7, target: 11, value: 60 },
      { source: 8, target: 11, value: 2 },
    ],
  },
});

const dataWithoutColors: () => ChartProps = () => ({
  chartTitle: 'Sankey Chart',
  SankeyChartData: {
    nodes: [
      { nodeId: 0, name: '192.168.42.72' },
      { nodeId: 1, name: '172.152.48.13' },
      { nodeId: 2, name: '124.360.55.1' },
      { nodeId: 3, name: '192.564.10.2' },
      { nodeId: 4, name: '124.124.50.1' },
      { nodeId: 5, name: '172.630.89.4' },
      { nodeId: 6, name: 'inbox' },
      { nodeId: 7, name: 'Junk Folder' },
      { nodeId: 8, name: 'Deleted Folder' },
      { nodeId: 9, name: 'Clicked' },
      { nodeId: 10, name: 'Opened' },
      { nodeId: 11, name: ' No further action  required' },
    ],
    links: [
      { source: 0, target: 6, value: 80 },
      { source: 1, target: 6, value: 50 },
      { source: 1, target: 7, value: 28 },
      { source: 2, target: 7, value: 14 },
      { source: 3, target: 7, value: 7 },
      { source: 3, target: 8, value: 20 },
      { source: 4, target: 7, value: 10 },
      { source: 5, target: 7, value: 10 },

      { source: 6, target: 9, value: 30 },
      { source: 6, target: 10, value: 55 },
      { source: 7, target: 11, value: 60 },
      { source: 8, target: 11, value: 2 },
    ],
  },
});

function chartPointsWithStringNodeId(): ChartProps {
  return {
    chartTitle: 'Sankey Chart',
    SankeyChartData: {
      nodes: [
        { nodeId: 'zero', name: '192.168.42.72', color: '#757575', borderColor: '#4B3867' },
        { nodeId: 'one', name: '172.152.48.13', color: '#8764B8', borderColor: '#4B3867' },
        { nodeId: 'two', name: '124.360.55.1', color: '#757575', borderColor: '#4B3867' },
        { nodeId: 'three', name: '192.564.10.2', color: '#8764B8', borderColor: '#4B3867' },
      ],
      links: [
        { source: 0, target: 2, value: 80 },
        { source: 1, target: 3, value: 50 },
      ],
    },
  };
}

const emptyChartPoints: ChartProps = {
  chartData: [],
};

function sharedBeforeEach() {
  resetIdsForTests();
}

beforeAll(() => {
  // https://github.com/jsdom/jsdom/issues/3368
  global.ResizeObserver = class ResizeObserver {
    public observe() {
      // do nothing
    }
    public unobserve() {
      // do nothing
    }
    public disconnect() {
      // do nothing
    }
  };
});

describe('Sankey bar chart rendering', () => {
  beforeEach(sharedBeforeEach);

  testWithoutWait(
    'Should render the Sankey chart with string node data',
    SankeyChart,
    { data: chartPointsWithStringNodeId() },
    container => {
      // Assert
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Sankey chart - Theme', () => {
  beforeEach(sharedBeforeEach);

  test('Should reflect theme change', () => {
    // Arrange
    const { container } = render(
      <FluentProvider theme={webDarkTheme}>
        <SankeyChart data={chartPointsWithStringNodeId()} />
      </FluentProvider>,
    );
    // Assert
    expect(container).toMatchSnapshot();
  });
});

describe('Sankey chart - Subcomponent Node', () => {
  beforeEach(sharedBeforeEach);

  // Replace the original method with the mock implementation
  const mockGetComputedTextLength = jest.fn().mockReturnValue(100);
  Object.defineProperty(
    Object.getPrototypeOf(document.createElementNS('http://www.w3.org/2000/svg', 'tspan')),
    'getComputedTextLength',
    {
      value: mockGetComputedTextLength,
    },
  );
  testWithWait(
    'Should update path color same as node color when we clck on node',
    SankeyChart,
    { data: chartPointsWithStringNodeId() },
    async container => {
      const nodes = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      fireEvent.click(nodes[0]);
      const pathsAfterMouseOver = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      // Assert
      expect(pathsAfterMouseOver).toBeDefined();
      expect(pathsAfterMouseOver[0].getAttribute('stroke')).toEqual('#757575');
      expect(nodes[0].getAttribute('fill')).toEqual('#757575');
      expect(nodes[2].getAttribute('fill')).toEqual('#757575');
    },
  );
});

describe('Sankey chart - Subcomponent Label', () => {
  beforeEach(sharedBeforeEach);

  testWithoutWait(
    'Should render sankey chart with node labels',
    SankeyChart,
    { data: chartPointsWithStringNodeId() },
    async container => {
      const nodes = getByClass(container, /nodeName/i);
      expect(nodes).toHaveLength(4);
      expect(screen.queryByText('192.168.42.72')).not.toBeNull();
    },
  );
});

describe('Sankey chart - Mouse events', () => {
  beforeEach(sharedBeforeEach);

  testWithoutWait(
    'Should reset path on mouse leave from path',
    SankeyChart,
    { data: chartPointsWithStringNodeId() },
    async container => {
      const paths = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'path');
      const prevStroke = paths[0].getAttribute('stroke');
      fireEvent.mouseOver(paths[0]);
      expect(paths[0]).not.toHaveAttribute('stroke', prevStroke);
      fireEvent.mouseOut(paths[0]);
      expect(paths[0]).toHaveAttribute('stroke', prevStroke);
    },
  );

  testWithoutWait(
    'Should reset node on mouse leave from node',
    SankeyChart,
    { data: chartPointsWithStringNodeId() },
    async _container => {
      const nodes = screen.getAllByText((content, element) => element!.tagName.toLowerCase() === 'rect');
      const prevFill = nodes[1].getAttribute('fill');
      fireEvent.mouseOver(nodes[0]);
      expect(nodes[1]).not.toHaveAttribute('fill', prevFill);
      fireEvent.mouseOut(nodes[0]);
      expect(nodes[1]).toHaveAttribute('fill', prevFill);
    },
  );
});

describe('Sankey chart rendering', () => {
  beforeEach(sharedBeforeEach);

  test('Should re-render the Sankey chart with data', async () => {
    // Arrange
    const { container, rerender } = render(<SankeyChart data={emptyChartPoints} />);
    // Assert
    expect(container).toMatchSnapshot();
    expect(getById(container, /_SankeyChart_empty/i)).toHaveLength(1);
    // Act
    rerender(<SankeyChart data={chartPointsWithStringNodeId()} />);
    await waitFor(() => {
      // Assert
      expect(container).toMatchSnapshot();
      expect(getById(container, /_SankeyChart_empty/i)).toHaveLength(0);
    });
  });
});

describe('Sankey Chart - axe-core', () => {
  beforeEach(sharedBeforeEach);

  test('Should pass accessibility tests', async () => {
    const { container } = render(<SankeyChart data={chartPointsWithStringNodeId()} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});

describe('Sankey Chart snapShot testing', () => {
  it('renders Sankey correctly', () => {
    const component = render(<SankeyChart data={data()} height={500} width={800} />);
    expect(component).toMatchSnapshot();
  });

  it('renders Sankey correctly on providing nodecolors and border colors ', () => {
    const nodeColors = ['#E3008C', '#00A2AD', '#022F22', '#00188F'];
    const borderColors = ['#002E39', '#43002C', '#3B52B4'];

    const component = render(
      <SankeyChart
        data={dataWithoutColors()}
        height={500}
        width={800}
        colorsForNodes={nodeColors}
        borderColorsForNodes={borderColors}
      />,
    );
    expect(component).toMatchSnapshot();
  });

  it('renders Sankey correctly with supplied resource strings', () => {
    // ARRANGE
    const data2 = {
      chartTitle: 'Sankey Chart',
      SankeyChartData: {
        nodes: [
          { nodeId: 0, name: 'First' },
          { nodeId: 1, name: 'Second' },
        ],
        links: [{ source: 0, target: 1, value: 10 }],
      },
    };
    const strings: SankeyChartStrings = {
      linkFrom: 'source {0}',
    };
    const accessibilityStrings: SankeyChartAccessibilityProps = {
      linkAriaLabel: '{2} items moved from {0} to {1}',
      nodeAriaLabel: 'element {0} with size {1}',
    };
    // ACT
    const component = render(
      <SankeyChart data={data2} height={500} width={800} strings={strings} accessibility={accessibilityStrings} />,
    );
    // ASSERT
    expect(component).toMatchSnapshot();
  });

  describe('number formatting', () => {
    it('renders Sankey correctly by formatting large numbers', () => {
      // ARRANGE
      const data2 = {
        chartTitle: 'Sankey Chart',
        SankeyChartData: {
          nodes: [
            { nodeId: 0, name: 'First' },
            { nodeId: 1, name: 'Second' },
            { nodeId: 2, name: 'Third' },
            { nodeId: 3, name: 'Fourth' },
            { nodeId: 4, name: 'Five' },
            { nodeId: 5, name: 'Six' },
            { nodeId: 6, name: 'Seven' },
          ],
          links: [
            { source: 0, target: 1, value: 1234567890 },
            { source: 0, target: 2, value: 100000000 },
            { source: 0, target: 5, value: 1234 },
            { source: 0, target: 6, value: 100 },
            { source: 1, target: 3, value: 1000000000 },
            { source: 1, target: 4, value: 234567890 },
            { source: 2, target: 3, value: 1000 },
            { source: 2, target: 4, value: 9999000 },
          ],
        },
      };
      const strings: SankeyChartStrings = {
        linkFrom: 'source {0}',
      };
      const accessibilityStrings: SankeyChartAccessibilityProps = {
        linkAriaLabel: '{2} items moved from {0} to {1}',
        nodeAriaLabel: 'element {0} with size {1}',
      };
      // ACT
      const component = render(
        <SankeyChart
          data={data2}
          height={500}
          width={800}
          strings={strings}
          accessibility={accessibilityStrings}
          formatNumberOptions={{
            maximumFractionDigits: 2,
            notation: 'compact',
            compactDisplay: 'short',
          }}
          culture="en-US"
        />,
      );
      // ASSERT
      expect(component).toMatchSnapshot();
    });
    it('renders Sankey correctly by styling numbers as percentages', () => {
      // ARRANGE
      const data2 = {
        chartTitle: 'Sankey Chart',
        SankeyChartData: {
          nodes: [
            { nodeId: 0, name: 'First' },
            { nodeId: 1, name: 'Second' },
            { nodeId: 2, name: 'Third' },
            { nodeId: 3, name: 'Fourth' },
            { nodeId: 4, name: 'Five' },
          ],
          links: [
            { source: 0, target: 1, value: 0.6 },
            { source: 0, target: 2, value: 0.4 },
            { source: 1, target: 3, value: 0.25 },
            { source: 1, target: 4, value: 0.35 },
            { source: 2, target: 3, value: 0.15 },
            { source: 2, target: 4, value: 0.25 },
          ],
        },
      };
      const strings: SankeyChartStrings = {
        linkFrom: 'source {0}',
      };
      const accessibilityStrings: SankeyChartAccessibilityProps = {
        linkAriaLabel: '{2} items moved from {0} to {1}',
        nodeAriaLabel: 'element {0} with size {1}',
      };
      // ACT
      const component = render(
        <SankeyChart
          data={data2}
          height={500}
          width={800}
          strings={strings}
          accessibility={accessibilityStrings}
          formatNumberOptions={{
            style: 'percent',
          }}
          culture="en-US"
        />,
      );
      // ASSERT
      expect(component).toMatchSnapshot();
    });
  });
});

describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const props: SankeyChartProps = {
      data: data(),
      height: 500,
      width: 800,
    };
    const { rerender, container } = render(<SankeyChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<SankeyChart {...props} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).toBe(htmlBefore);
  });

  it('prop changes', () => {
    const props = {
      data: data(),
      height: 700,
      width: 1100,
    };
    const props1 = {
      data: data(),
      height: 1000,
      width: 1100,
    };
    const { rerender, container } = render(<SankeyChart {...props} />);
    const htmlBefore = container.innerHTML;
    rerender(<SankeyChart {...props1} />);
    const htmlAfter = container.innerHTML;
    expect(htmlAfter).not.toBe(htmlBefore);
  });
});

describe('SankeyChart - mouse events', () => {
  function sharedBeforeEach() {
    resetIdsForTests();
  }
  beforeEach(sharedBeforeEach);
  it('Should render correctly on node mouseover', () => {
    let wrapper = render(<SankeyChart data={data()} height={500} width={800} />);
    const rects = wrapper.container.querySelectorAll('rect');
    fireEvent.mouseOver(rects[1]);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render callout correctly on mouseover when height of node is less than 24px', () => {
    const { getByLabelText, container } = render(<SankeyChart data={data()} height={500} width={800} />);
    const node = getByLabelText('node 124.360.55.1 with weight 14');
    fireEvent.mouseOver(node);
    expect(container).toMatchSnapshot();
  });

  it('Should render tooltip correctly on mouseover when node description is large', () => {
    const { container } = render(<SankeyChart data={data()} height={500} width={800} />);
    const textElement = container.querySelector('text[x="740"]');
    fireEvent.mouseOver(textElement!);
    expect(container).toMatchSnapshot();
  });

  it('Should not add elements to the diagram when moving inside a "link" element and then back out', () => {
    // ARRANGE
    let wrapper = render(<SankeyChart data={data()} height={500} width={800} />);
    let addedCount = 0;
    let removedCount = 0;
    const observer = new MutationObserver(mutations => {
      mutations.forEach((mutation: MutationRecord) => {
        addedCount += mutation.addedNodes.length;
        removedCount += mutation.removedNodes.length;
      });
    });
    observer.observe(wrapper.container.ownerDocument.body, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
    });
    const originalHtml = wrapper.container.innerHTML;
    // ACT
    // The following finds the second "path" within the diagram, which happens to be within the "links" collection.
    const paths = wrapper.container.querySelectorAll('path');
    fireEvent.mouseEnter(paths[0]);
    fireEvent.mouseMove(paths[0]);
    fireEvent.mouseLeave(paths[0]);
    // ASSERT
    const finalHtml = wrapper.container.innerHTML;
    expect(finalHtml).toBe(originalHtml);
    observer.disconnect();
    expect(addedCount).toBe(0);
    expect(removedCount).toBe(0);
  });

  it.skip('Should not add elements to the diagram when moving inside a "node" element and then back out', () => {
    // ARRANGE
    let wrapper = render(<SankeyChart data={data()} height={500} width={800} />);
    let addedCount = 0;
    let removedCount = 0;
    const observer = new MutationObserver(mutations => {
      mutations.forEach((mutation: MutationRecord) => {
        addedCount += mutation.addedNodes.length;
        removedCount += mutation.removedNodes.length;
      });
    });
    observer.observe(wrapper.container.ownerDocument.body, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
    });
    const originalHtml = wrapper.container.innerHTML;
    // ACT
    // The following finds the second "rect" within the diagram, which happens to be within the "nodes" collection.
    const rects = wrapper.container.querySelectorAll('rect');
    fireEvent.mouseEnter(rects[1]);
    fireEvent.mouseMove(rects[1]);
    fireEvent.mouseLeave(rects[1]);

    // ASSERT
    const finalHtml = wrapper.container.innerHTML;
    expect(finalHtml).toBe(originalHtml);
    observer.disconnect();
    expect(addedCount).toBe(0);
    expect(removedCount).toBe(0);
  });
});

describe('SankeyChart - Min Height of Node Test', () => {
  it('renders Sankey correctly on providing height less than onepercent of total height', () => {
    const onepercentheightdata: ChartProps = {
      chartTitle: 'Sankey Chart',
      SankeyChartData: {
        nodes: [
          { nodeId: 0, name: 'node0', color: '#0078D4' },
          { nodeId: 1, name: 'node1', color: '#0078D4' },
          { nodeId: 2, name: 'node2', color: '#0078D4' },
          { nodeId: 3, name: 'node3', color: '#0078D4' },
          { nodeId: 4, name: 'node4', color: '#0078D4' },
          { nodeId: 5, name: 'node5', color: '#0078D4' },
          { nodeId: 6, name: 'node6', color: '#E3008C' },
          { nodeId: 7, name: 'node7', color: '#E3008C' },
        ],
        links: [
          { source: 0, target: 6, value: 5 },
          { source: 1, target: 6, value: 5 },
          { source: 2, target: 6, value: 5 },
          { source: 3, target: 6, value: 5 },
          { source: 4, target: 7, value: 900 },
          { source: 5, target: 7, value: 80 },
        ],
      },
    };
    const component = render(<SankeyChart data={onepercentheightdata} height={400} width={912} />);
    expect(component).toMatchSnapshot();
  });

  it('renders Sankey correctly on providing height less than onepercent of total height for two columns', () => {
    // ARRANGE
    // This chart has 4 nodes: 2 in each of 2 columns.
    // In each column, there is a large node and a tiny node.
    // The tiny node is valued at 1, and the large node is valued at 10000.
    // This creates a huge disparity in the height of the nodes in each column.
    // The final appearance should show a small node, and should render values for the nodes
    // which match the original values.
    const onepercentheightdata: ChartProps = {
      chartTitle: 'Sankey Chart',
      SankeyChartData: {
        nodes: [
          { nodeId: 0, name: 'Large Source' },
          { nodeId: 1, name: 'Tiny Source' },
          { nodeId: 2, name: 'Large Target' },
          { nodeId: 3, name: 'Tiny Target' },
        ],
        links: [
          { source: 0, target: 2, value: 10000 },
          { source: 1, target: 2, value: 1 },
          { source: 0, target: 3, value: 1 },
          { source: 1, target: 3, value: 1 },
        ],
      },
    };
    // ACT
    const component = render(<SankeyChart data={onepercentheightdata} height={400} width={912} />);
    // ASSERT
    expect(component).toMatchSnapshot();
  });
});

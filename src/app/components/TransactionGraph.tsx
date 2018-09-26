import * as React from 'react';
import { ResponsiveLine } from '@nivo/line';

interface ChartData {
  id: string;
  color: string;
  data: Array<{ x: string; y: number }>;
}

interface Props {
  chartData: ChartData[] | null;
}

class TransactionGraph extends React.Component<Props> {
  public render() {
    const { chartData } = this.props;
    return (
      <ResponsiveLine
        data={chartData || []}
        margin={{
          top: 50,
          right: 100,
          bottom: 80,
          left: 50,
        }}
        xScale={{
          type: 'point',
        }}
        yScale={{
          type: 'linear',
          stacked: true,
          min: '0',
          max: '5000',
        }}
        minY="auto"
        maxY="auto"
        stacked={true}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Days of the Week',
          legendOffset: 36,
          legendPosition: 'center',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number of Transactions',
          legendOffset: -40,
          legendPosition: 'center',
        }}
        dotSize={10}
        dotColor="inherit:darker(0.3)"
        dotBorderWidth={2}
        dotBorderColor="#ffffff"
        enableDotLabel={true}
        dotLabel="y"
        dotLabelYOffset={-12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    );
  }
}

export default TransactionGraph;

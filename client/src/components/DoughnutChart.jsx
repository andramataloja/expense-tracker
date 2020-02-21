import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, PieSeries, AccumulationDataLabel, AccumulationTooltip} from'@syncfusion/ej2-react-charts';
import * as React from 'react';

class DoughnutChart extends React.Component{
  data1= [
    { x: 'United States', y: 45, text: 'USA', fill: '#00226C' },
    { x: 'Australia', y: 53, text: 'AUS: 14%', fill: '#0450C2' },
    { x: 'China', y: 56, text: 'CHN', fill: '#0073DC' },
    { x: 'India', y: 61, text: 'IND', fill: '#0D98FF' },
    { x: 'Japan', y: 40, text: 'JPN', fill: '#9CD9FF' },
    { x: 'United Kingdom', y: 20, text: 'UK', fill: '#0450C2' }
];
 
  render() {
    return <AccumulationChartComponent id='charts' tooltip={{enable: true}}>
    <Inject services={[PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
    <AccumulationSeriesCollectionDirective>
      <AccumulationSeriesDirective dataSource={this.data1} xName='x' yName='y'  innerRadius= '50%'  dataLabel= {{visible: true, name: 'text', position: 'Outside'}} startAngle={0} endAngle={360} explode={true} explodeOffset='10%' explodeIndex={3} />
    </AccumulationSeriesCollectionDirective>
  </AccumulationChartComponent>
  }
};
export default DoughnutChart
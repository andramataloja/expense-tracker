import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  PieSeries,
  AccumulationDataLabel,
  AccumulationTooltip
} from "@syncfusion/ej2-react-charts";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Skeleton } from "@material-ui/lab";
import { Box } from "@material-ui/core";
import { fetchDoughnutData } from "../actions/actions";

const DoughnutChart = () => {
  const dispatch = useDispatch();
  const month = useSelector(state => state.month);
  const year = useSelector(state => state.year);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("/get/doughnutdata", {
        params: { month: month + 1, year: year }
      })
      .then(res => {
        res.data.length !== 0
          ? setChartData(findPercentage(res.data))
          : setChartData([]);
      })
      .catch(err => console.log(err));
  }, [month, year]);

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      dispatch(fetchDoughnutData(chartData));
    }
  }, [chartData]);

  const findPercentage = data => {
    const numbers = data.map(category => parseFloat(category.total));
    const total = numbers.reduce((totalSum, row) => totalSum + row, 0);

    return data.map(category => ({
      ...category,
      ...{ percent: ((category.total / total) * 100).toFixed(0) }
    }));
  };

  return (
    <Box>
      {chartData.length <= 0 && (
        <Box display="flex" justifyContent="center" mt={4} mb={4}>
          <Skeleton variant="circle" width={356} height={356} />
        </Box>
      )}
      {chartData.length > 0 && (
        <AccumulationChartComponent
          id="charts"
          /* tooltip={{
            enable: true,
            format: "<b>${point.x}<br/>${point.y}%</b>",
            textStyle: "Muli"
          }} */
          enableSmartLabels={true}
          fontFamily="Muli"
        >
          <Inject
            services={[PieSeries, AccumulationDataLabel, AccumulationTooltip]}
          />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={chartData.length > 0 ? chartData : []}
              xName="category_name"
              yName="percent"
              innerRadius="50%"
              dataLabel={{
                visible: true,
                name: "category_name",
                position: "Inside",
                font: {
                  fontWeight: "600",
                  color: "#ffffff",
                  fontFamily: "Muli"
                },
                template:
                  "<div><div>${point.x}</div><div>${point.y}%</div></div>"
              }}
              startAngle={0}
              endAngle={360}
              explode={true}
              explodeOffset="10%"
              explodeIndex={3}
              pointColorMapping="fill"
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      )}
    </Box>
  );
};
export default DoughnutChart;

import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  PieSeries,
  AccumulationDataLabel,
  AccumulationTooltip
} from "@syncfusion/ej2-react-charts";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Skeleton } from "@material-ui/lab";
import { Box } from "@material-ui/core";
import { fetchDoughnutData, setExplodeIndex } from "../actions/actions";
import * as icons from "../icons/icons";
import { useAuth0 } from "../utils/auth0-context";

const DoughnutChart = () => {
  const dispatch = useDispatch();
  const month = useSelector(state => state.month);
  const year = useSelector(state => state.year);
  const doughData = useSelector(state => state.doughnutData);
  const expenses = useSelector(state => state.expenses);
  const explodeIndex = useSelector(state => state.index);
  const { user } = useAuth0();

  useEffect(
    () => {
      axios
        .get("/get/doughnutdata", {
          params: { month: month + 1, year: year, email: user.email }
        })
        .then(res => {
          if (res.data.length !== 0) {
            const dataIcons = addIcons(res.data);
            dispatch(fetchDoughnutData(findPercentage(dataIcons)));
          } else {
            dispatch(fetchDoughnutData([]));
          }
        })
        .catch(err => console.log(err));
    },
    [month, year, expenses, user.email],
    console.log("doughData", doughData)
  );

  const findPercentage = data => {
    const numbers = data.map(category => parseFloat(category.total));
    const total = numbers.reduce((totalSum, row) => totalSum + row, 0);
    return data.map(category => ({
      ...category,
      ...{ percent: ((category.total / total) * 100).toFixed(0) }
    }));
  };

  const addIcons = data => {
    return data.map(category => ({
      ...category,
      ...{ icon: findIcon(category.category_name) }
    }));
  };

  const findIcon = name => {
    switch (name) {
      case "Food":
        return icons.food;
      case "Transport":
        return icons.transport;
      case "Entertainment":
        return icons.entertainment;
      case "Shopping":
        return icons.shopping;
      case "Sport":
        return icons.sport;
      case "Housing":
        return icons.housing;
      default:
        return icons.other;
    }
  };

  const getChartPointIndex = target => {
    const index = target.target.replace("charts_Series_0_Point_", "");
    dispatch(setExplodeIndex(index));
  };

  return (
    <Box data-testid="doughnutchart">
      {doughData.length <= 0 && (
        <Box display="flex" justifyContent="center" mt={4} mb={4}>
          <Skeleton variant="circle" width={356} height={356} />
        </Box>
      )}
      {doughData.length > 0 && (
        <AccumulationChartComponent
          id="charts"
          enableSmartLabels={true}
          fontFamily="Muli"
          chartMouseClick={target => getChartPointIndex(target)}
          selectionMode="Point"
          tooltip={{
            enable: "true",
            format: "${point.tooltip}: ${point.y}%"
          }}
        >
          <Inject
            services={[PieSeries, AccumulationDataLabel, AccumulationTooltip]}
          />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={doughData}
              xName="icon"
              yName="percent"
              tooltipMappingName="category_name"
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
                  "<div><div>${point.x} </div><div>${point.y}%</div></div>"
              }}
              startAngle={0}
              endAngle={360}
              explode={true}
              explodeOffset="10%"
              explodeIndex={parseInt(explodeIndex)}
              pointColorMapping="fill"
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      )}
    </Box>
  );
};
export default DoughnutChart;

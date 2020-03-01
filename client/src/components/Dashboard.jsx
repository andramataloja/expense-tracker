import React from "react";
import DoughnutChart from "./DoughnutChart";
import { Container, Box } from "@material-ui/core";
import DateCarousel from "./DateCarousel";
import ExpensesExpansion from "./ExpensesExpansion";
import Bar from "./Bar";
import AddExpense from "./AddExpense";

const Dashboard = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <Bar />
      </Box>
      <Container>
        <Box display="flex" justifyContent="center" mt={3}>
          <DateCarousel />
        </Box>
        <Box>
          <DoughnutChart />
        </Box>
        <Box display="flex" justifyContent="flex-end" mr={2} mb={2}>
          <AddExpense />
        </Box>
      </Container>
      <Box>
        <ExpensesExpansion />
      </Box>
    </Box>
  );
};
export default Dashboard;

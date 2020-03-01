import React, { useEffect, useState } from "react";
import {
  makeStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  Paper,
  Container,
  Box,
  LinearProgress
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import CommuteIcon from "@material-ui/icons/Commute";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useSelector } from "react-redux";
import axios from "axios";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DeleteDialog from "./DeleteDialog";
import classNames from "classnames";
import EditExpense from "./EditExpense";

const useStyles = makeStyles(theme => ({
  categoryName: {
    paddingLeft: "20px",
    paddingTop: "8px"
  },
  categoryPercent: {
    paddingLeft: "10px",
    paddingTop: "11px",
    fontSize: "13px"
  },
  expensesList: {
    width: "100%"
  },
  icons: {
    color: "white"
  },
  iconBg: {
    borderRadius: "50%",
    width: 45,
    height: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  progressBar: {
    width: "200px",
    marginLeft: "20px",
    marginTop: "5px"
  },
  food: {
    backgroundColor: "#FCD246"
  },
  transport: {
    backgroundColor: "#B2E564"
  },
  entertainment: {
    backgroundColor: "#EA6E6E"
  },
  shopping: {
    backgroundColor: "#F4ABBE"
  },
  sport: {
    backgroundColor: "#85E2EA"
  },
  housing: {
    backgroundColor: "#62A3E0"
  },
  other: {
    backgroundColor: "#9685B2"
  },
  style: {
    borderRadius: "50%"
  },
  expenseDate: {
    fontSize: "12px"
  }
}));

const ExpensesExpansion = () => {
  const month = useSelector(state => state.month);
  const year = useSelector(state => state.year);
  const doughnutData = useSelector(state => state.doughnutData);

  const [categoryList, setCategoryList] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get("/allexpensesbydate", { params: { month: month + 1, year: year } })
      .then(res => {
        res.data.length !== 0 ? setExpenses(res.data) : setExpenses([]);
      })
      .catch(err => console.log(err));
  }, [month, year]);

  useEffect(() => {
    if (expenses && expenses.length > 0) {
      axios
        .get("/get/categories")
        .then(res => {
          return res.data.length !== 0
            ? setCategoryList(filterCategories(res.data))
            : null;
        })
        .catch(err => console.log(err));
    }
  }, [expenses]);

  const filterCategories = categories => {
    return expenses.map(expense => {
      return categories.find(
        category => category.category_id === expense.category_id
      );
    });
  };

  const getCategoryIcon = icon => {
    switch (icon) {
      case "Food":
        return (
          <Box className={classNames(classes.food, classes.iconBg)}>
            <FastfoodIcon className={classes.icons} />
          </Box>
        );
      case "Transport":
        return (
          <Box className={classNames(classes.transport, classes.iconBg)}>
            <CommuteIcon className={classes.icons} />
          </Box>
        );
      case "Entertainment":
        return (
          <Box className={classNames(classes.entertainment, classes.iconBg)}>
            <MovieFilterIcon className={classes.icons} />
          </Box>
        );
      case "Shopping":
        return (
          <Box className={classNames(classes.shopping, classes.iconBg)}>
            <ShoppingCartIcon className={classes.icons} />
          </Box>
        );
      case "Sport":
        return (
          <Box className={classNames(classes.sport, classes.iconBg)}>
            <FitnessCenterIcon className={classes.icons} />
          </Box>
        );
      case "Housing":
        return (
          <Box className={classNames(classes.housing, classes.iconBg)}>
            <HomeWorkIcon className={classes.icons} />
          </Box>
        );
      default:
        return (
          <Box className={classNames(classes.other, classes.iconBg)}>
            <ListAltIcon className={classes.icons} />
          </Box>
        );
    }
  };

  const classes = useStyles();
  return (
    <Paper>
      <Container>
        <Box py={4}>
          {categoryList.map(option => (
            <ExpansionPanel
              key={option.category_id}
              value={option.category_id}
              className={classes.listExpenses}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {getCategoryIcon(option.icon)}
                <Box display="flex" flexDirection="column">
                  <Box display="flex">
                    <Typography className={classes.categoryName}>
                      {option.category_name}
                    </Typography>
                    {doughnutData.map(
                      category =>
                        category.category_name === option.category_name && (
                          <Typography
                            key={option.category_id}
                            className={classes.categoryPercent}
                            color="secondary"
                          >
                            {category.percent}%
                          </Typography>
                        )
                    )}
                  </Box>
                  {doughnutData.map(
                    category =>
                      category.category_name === option.category_name && (
                        <LinearProgress
                          key={option.category_id}
                          variant="determinate"
                          value={parseInt(category.percent)}
                          className={classes.progressBar}
                        />
                      )
                  )}
                </Box>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List className={classes.expensesList}>
                  {expenses.map(
                    expense =>
                      expense.category_id === option.category_id && (
                        <ListItem divider key={expense.expense_id}>
                          <Box
                            display="flex"
                            flexDirection="column"
                            width="100%"
                          >
                            <Box
                              className={classes.expenseDate}
                              color="text.secondary"
                            >
                              {expense.formatted_date}
                            </Box>
                            <Box
                              py={1}
                              display="flex"
                              flexDirection="row"
                              width="100%"
                            >
                              <Box>{expense.description}</Box>
                              <Box ml={8}>{`${expense.amount}€`}</Box>
                            </Box>
                          </Box>
                          <ListItemSecondaryAction>
                            <Tooltip title="Update">
                              <IconButton edge="end" aria-label="update">
                                <EditExpense expense={expense} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton edge="end" aria-label="delete">
                                <DeleteDialog expense_id={expense.expense_id} />
                              </IconButton>
                            </Tooltip>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )
                  )}
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Box>
      </Container>
    </Paper>
  );
};
export default ExpensesExpansion;

import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  FormGroup,
  Box,
  makeStyles
} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { useAuth0 } from "../utils/auth0-context";
import axios from "axios";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles(theme => ({
  updateButton: {
    color: theme.palette.primary.main
  },
  updateCommands: {
    color: theme.palette.secondary.dark
  }
}));

const EditExpense = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    amount: props.expense.amount,
    description: props.expense.description
  });
  const [category, setCategory] = useState(props.expense.category_id);
  const [selectedDate, setSelectedDate] = useState(props.expense.date);
  const [categoryList, setCategoryList] = useState([]);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  const handleDateChange = date => {
    const formattedDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setSelectedDate(formattedDate);
  };

  const handleSubmit = event => {
    event.preventDefault();
    //const user_id = user.user_id
    const data = {
      description: values.description,
      amount: values.amount,
      date: selectedDate,
      //      user_id: user_id,
      category_id: category,
      expense_id: props.expense.expense_id
    };
    axios
      .put("/put/expense", data)
      .then(response => console.log(response))
      .catch(err => console.log(err));
    window.location.reload(false);
  };

  useEffect(() => {
    axios
      .get("/get/categories")
      .then(res => (res.data.length !== 0 ? setCategoryList(res.data) : null))
      .catch(err => console.log(err));
  }, []);

  return (
    <Box>
      <CreateIcon
        className={classes.updateButton}
        onClick={() => setOpen(true)}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Expense</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControl variant="outlined" margin="dense">
              <InputLabel htmlFor="component-outlined">Description</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={values.description}
                onChange={handleChange("description")}
                label="Description"
              />
            </FormControl>
            <FormControl variant="outlined" margin="dense">
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={values.amount}
                onChange={handleChange("amount")}
                startAdornment={
                  <InputAdornment position="start">€</InputAdornment>
                }
                label="Amount"
                type="number"
                inputProps={{ min: "0" }}
              />
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="dense"
                id="date-picker-inline"
                label="Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              id="outlined-select-category"
              select
              label="Category"
              value={category}
              onChange={handleCategoryChange}
              variant="outlined"
              margin="dense"
            >
              {categoryList.map(option => (
                <MenuItem key={option.category_id} value={option.category_id}>
                  {option.category_name}
                </MenuItem>
              ))}
            </TextField>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            className={classes.updateCommands}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className={classes.updateCommands}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default EditExpense;

import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
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
  Fab,
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
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  addButton: {
    color: "white"
  },
  addCommands: {
    color: theme.palette.secondary.dark
  }
}));

const AddExpense = props => {
  const classes = useStyles();
  /* const {user} = useAuth0(); */

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoryList, setCategoryList] = useState([]);
  const [values, setValues] = useState({
    amount: "",
    description: ""
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    console.log("des", values.description);
    console.log("amount", values.amount);
  };

  const handleCategoryChange = event => {
    setCategory(event.target.value);
    console.log("cat", event.target.value, category);
  };

  const handleDateChange = date => {
    const formattedDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setSelectedDate(formattedDate);
    console.log("date", formattedDate);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("des", values.description);
    //const user_id = user.user_id
    const data = {
      description: values.description,
      amount: values.amount,
      date: selectedDate,
      //      user_id: user_id,
      category_id: category
    };

    axios
      .post("/post/expensetodb", data)
      .then(response => console.log("posting", response))
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
      <Fab color="primary">
        <AddIcon
          fontSize="large"
          onClick={() => setOpen(true)}
          className={classes.addButton}
        />
      </Fab>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
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
            className={classes.addCommands}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className={classes.addCommands}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default AddExpense;

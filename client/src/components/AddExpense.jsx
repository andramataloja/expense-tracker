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
import { useSelector, useDispatch } from "react-redux";
import { fetchExpenses } from "../actions/actions";
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles(theme => ({
  addButton: {
    color: "white"
  },
  addCommands: {
    color: theme.palette.secondary.dark
  },
  errorText: {
    fontSize: "11px",
    color: "red"
  }
}));

const AddExpense = props => {
  const classes = useStyles();
  /* const {user} = useAuth0(); */
  const dispatch = useDispatch();
  const month = useSelector(state => state.month);
  const year = useSelector(state => state.year);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoryList, setCategoryList] = useState([]);
  const [values, setValues] = useState({
    amount: "",
    description: ""
  });

  const { register, errors, handleSubmit } = useForm();

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const clearFields = () => {
    setValues({ amount: "", description: "" });
  };

  const onSubmit = event => {
    //const user_id = user.user_id
    const data = {
      description: values.description,
      amount: values.amount,
      date: selectedDate,
      //      user_id: user_id,
      category_id: category
    };
    console.log("data to db", data);
    axios
      .post("/post/expensetodb", data)
      .then(() => {
        setOpen(false);
        clearFields();
        axios
          .get("/allexpensesbydate", {
            params: { month: month + 1, year: year }
          })
          .then(res => {
            res.data.length !== 0
              ? dispatch(fetchExpenses(res.data))
              : dispatch(fetchExpenses([]));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
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
                inputRef={register({ required: true, pattern: /.*\S.*/ })}
                name="description"
              />
              <span className={classes.errorText}>
                {errors.description && "Description is required"}
              </span>
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
                name="amount"
                inputRef={register({ required: true })}
              />
              <span className={classes.errorText}>
                {errors.amount && "Amount is required"}
              </span>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="dense"
                id="date-picker-inline"
                label="Date"
                value={selectedDate}
                onChange={date => setSelectedDate(date)}
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
              onChange={event => setCategory(event.target.value)}
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
          <Button
            onClick={handleSubmit(onSubmit)}
            className={classes.addCommands}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default AddExpense;

import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { FormGroup } from '@material-ui/core';
import { useAuth0 } from "../utils/auth0-context";
import axios from 'axios';
import history from '../utils/history';
const AddExpense = (props) =>  {

    /* const {user} = useAuth0(); */

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    history.replace('/')
  };

  const [values, setValues] = useState({
    amount: '',
    description:''
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    console.log('des', values.description)
    console.log('amount', values.amount)
  };

  const [category, setCategory] = useState('');

  const handleCategoryChange = event => {
    setCategory(event.target.value);
    console.log('cat', event.target.value,category)
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    const formattedDate = date.getFullYear() + '-' +  (date.getMonth() + 1)  + '-' +  date.getDate();
    setSelectedDate(formattedDate);
    console.log('date', formattedDate)
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('des', values.description)
    //const user_id = user.user_id
    const data = {description: values.description,
                  amount: values.amount,
                 date: selectedDate,
            //      user_id: user_id,
                  category_id: category
                  }

    axios.post('/post/expensetodb', data)
      .then(response => console.log('posting',response))
      .catch((err) => console.log(err))
      .then(setTimeout(() => history.replace('/'), 500) )
    }

    const [categoryList, setCategoryList] = useState([]);

    useEffect( () => {
          console.log('yyyy')
          axios.get('/get/categories')
            .then(res => 
                res.data.length !== 0
                    ?  setCategoryList(res.data) 
                     : null              
                  ) 
                  
            .catch((err) => console.log(err) )
        }, []  ,console.log('list',categoryList))
  
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
        <DialogContent>
            <FormGroup>
            <FormControl variant="outlined" margin="dense">
                <InputLabel htmlFor="component-outlined">Description</InputLabel>
                <OutlinedInput id="component-outlined" value={values.description} onChange={handleChange('description')} label="Description" />
            </FormControl>
            <FormControl variant="outlined" margin="dense">
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.amount}
                    onChange={handleChange('amount')}
                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                    label="Amount"
                    type='number' 
                    inputProps={{ min: "0"}}
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
                        'aria-label': 'change date',
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddExpense;
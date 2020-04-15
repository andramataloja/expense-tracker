import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  makeStyles
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchExpenses } from "../actions/actions";

const useStyles = makeStyles(theme => ({
  deleteCommands: {
    color: theme.palette.secondary.dark
  }
}));

const DeleteDialog = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses);

  const handleDelete = () => {
    axios
      .delete("/delete/expense", {
        data: { expense_id: props.expense_id }
      })
      .then(res =>
        dispatch(
          fetchExpenses(
            expenses.filter(function(el) {
              return el.expense_id !== props.expense_id;
            })
          )
        )
      )
      .catch(err => console.log(err));
    setOpen(false);
  };

  return (
    <Box>
      <DeleteIcon
        color="secondary"
        onClick={() => setOpen(true)}
        data-testid="delete-button"
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        data-testid="delete-dialog"
      >
        <DialogTitle id="alert-dialog-title">Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this expense?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            className={classes.deleteCommands}
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} className={classes.deleteCommands}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default DeleteDialog;

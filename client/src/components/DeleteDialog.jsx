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

const useStyles = makeStyles(theme => ({
  deleteCommands: {
    color: theme.palette.secondary.dark
  }
}));

const DeleteDialog = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    axios
      .delete("/delete/expense", {
        data: { expense_id: props.expense_id }
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    window.location.reload(false);
  };

  return (
    <Box>
      <DeleteIcon color="secondary" onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{" Delete?"}</DialogTitle>
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

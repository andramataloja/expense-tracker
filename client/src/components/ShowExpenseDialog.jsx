import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

const ShowExpenseDialog = (props) => {

const { onClose, open } = props;
   console.log('props',props)

   const handleClose = () => {
        onClose(false);
    };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleClose} >    
      <List>
        <ListItem>Description: {props.expense.description}</ListItem>
        <ListItem>Amount {props.expense.amount}€</ListItem>
        <ListItem>Date: {props.expense.formatted_date}</ListItem>
        <ListItem>Category: {props.expense.category_name} </ListItem>
      </List>    
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog>
  );
}
export default ShowExpenseDialog;
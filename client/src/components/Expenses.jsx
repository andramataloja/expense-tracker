import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Tooltip,
  Box
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";

const Expenses = props => {
  const [open, setOpen] = useState(false);
  const [exp, setExp] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = expense => {
    setOpen(true);
    setExp(expense);
  };

  const [expenses, setExpenses] = useState([]);

  useEffect(
    () => {
      axios
        .get("/allexpenses")
        .then(res => (res.data.length !== 0 ? setExpenses(res.data) : null))
        .catch(err => console.log(err));
    },
    [],
    console.log("listex:", expenses)
  );

  return (
    <Box>
      <List>
        {expenses.map(expense => (
          <ListItem button divider key={expense.expense_id}>
            <ListItemText
              primary={expense.description}
              secondary={`Amount ${expense.amount}€`}
              onClick={() => handleClickOpen(expense)}
            />
            <ListItemSecondaryAction>
              <Tooltip title="Update">
                <IconButton edge="end" aria-label="update">
                  <Link
                    to={{
                      pathname: `/editexpense/${expense.expense_id}`,
                      state: {
                        description: expense.description,
                        amount: expense.amount,
                        date: expense.date,
                        category_id: expense.category_id
                      }
                    }}
                  >
                    <CreateIcon />
                  </Link>
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton edge="end" aria-label="delete">
                  <DeleteDialog expense_id={expense.expense_id} />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default Expenses;

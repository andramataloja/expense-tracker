import React from "react";
import Button from "@material-ui/core/Button";
import {
  Box,
  Typography,
  makeStyles,
  Card,
  Divider,
  CardMedia,
  CardActions,
  CardContent
} from "@material-ui/core";
import { useAuth0 } from "../utils/auth0-context";
import pic from "../icons/loginicon.png";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    height: 300,
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginTop: "100px",
    marginLeft: "30px",
    marginRight: "30px"
  },
  media: {
    height: 80,
    width: 80,
    marginTop: "40px"
  },
  button: {
    borderRadius: 100,
    marginTop: "10px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.default,
    borderColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#99D7FF"
    }
  },
  text: {
    marginTop: "30px",
    color: theme.palette.text.primary
  }
}));

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center">
      <Box>
        <Card className={classes.card}>
          <CardMedia className={classes.media} image={pic} />
          <CardContent>
            <Divider variant="middle" />
            <Typography className={classes.text}>
              You can log in to your Expense Tracker with Google account
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={() =>
                loginWithRedirect({
                  connection: "google-oauth2"
                })
              }
            >
              Login with Google account
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};
export default Login;

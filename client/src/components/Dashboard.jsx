import React, { Fragment } from "react"
import DoughnutChart from "./DoughnutChart"
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import {AddCircleOutline} from '@material-ui/icons';
import ListIcon from '@material-ui/icons/List';
import MonthSlider from './MonthSlider'

const useStyles = makeStyles({
    marginForSelection: {
      marginRight:'50px',
    },
    gridLayout: {
        marginTop:'45px',
        marginBottom:'45px'
      }
  });

export default function Dashboard() {  
    const classes = useStyles();
    return (
    <Fragment>
        <Container>
        <h1>Monthly Spending</h1>
        <MonthSlider/>
        <DoughnutChart/>       
        <Link to= '/addexpense'>
            <AddCircleOutline fontSize="large"/>
        </Link>              
        <Link to= '/allexpenses'>
            <ListIcon fontSize="large"/>
        </Link>
       
       {/*  <Grid container direction="column"
                justify="center"
                alignItems="center">
            <Grid item >
                <h1>Monthly Spending</h1>
            </Grid>
                <Grid item> <MonthSlider/></Grid>
            <Grid className={classes.gridLayout}> 
                <DoughnutChart/>
            </Grid>
            <Grid container justify="center" alignItems="center">
                <Grid className={classes.marginForSelection}>
                   <Link to= '/addexpense'>
                        <AddCircleOutline fontSize="large"/>
                    </Link>
                </Grid>
                <Grid item> 
                <Link to= '/allexpenses'>
                    <ListIcon fontSize="large"/>
                </Link>
                
                </Grid>
            </Grid>
        </Grid> */}
        </Container>
    </Fragment>
    )
  }
  
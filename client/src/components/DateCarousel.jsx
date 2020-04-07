import React, { useEffect, useState } from "react";
import Carousel from "@brainhubeu/react-carousel";
import axios from "axios";
import "@brainhubeu/react-carousel/lib/style.css";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonth, fetchYear } from "../actions/actions";
import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  carousel: {
    transform: "none",
    width: "330px",
    marginTop: "10px"
  },
  customArrow: {
    color: theme.palette.primary.main,
    marginLeft: "10px",
    marginRight: "10px"
  },
  carouselSlides: {
    fontFamily: theme.typography.fontFamily
  }
}));

const DateCarousel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const monthState = useSelector(state => state.month);
  const yearState = useSelector(state => state.year);

  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    axios
      .get("/get/months")
      .then(res => (res.data.length !== 0 ? setMonths(res.data) : null))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    let lastYear = new Date().getFullYear() - 1;
    let maxOffset = 10;

    const years = [];
    for (let x = 0; x <= maxOffset; x++) {
      years.push(lastYear + x);
    }
    setYears(years);
  }, [yearState]);

  return (
    <Box className={classes.carouselSlides} data-testid="box">
      <Carousel
        data-testid="yearState"
        className={classes.carousel}
        centered
        itemWidth={120}
        arrowRight={
          <ArrowForwardIosRoundedIcon className={classes.customArrow} />
        }
        arrowLeft={<ArrowBackIosRoundedIcon className={classes.customArrow} />}
        arrowLeftDisabled={<Box />}
        arrowRightDisabled={<Box />}
        addArrowClickHandler
        slidesPerPage={3}
        clickToChange
        value={years.indexOf(yearState)}
        onChange={value => dispatch(fetchYear(years[value]))}
        slides={years.map((year, index) => (
          <Box key={index}>{year}</Box>
        ))}
      ></Carousel>
      <Carousel
        data-testid="monthState"
        className={classes.carousel}
        centered
        itemWidth={120}
        arrowRight={
          <ArrowForwardIosRoundedIcon className={classes.customArrow} />
        }
        arrowLeft={<ArrowBackIosRoundedIcon className={classes.customArrow} />}
        arrowLeftDisabled={<Box />}
        arrowRightDisabled={<Box />}
        addArrowClickHandler
        slidesPerPage={3}
        clickToChange
        value={monthState}
        onChange={value => dispatch(fetchMonth(value))}
        slides={months.map(month => (
          <Box key={month.month_id}>{month.month}</Box>
        ))}
      ></Carousel>
    </Box>
  );
};
export default DateCarousel;

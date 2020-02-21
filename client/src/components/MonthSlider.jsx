import React, {useEffect}  from "react";
import { useState } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import axios from 'axios';
import '@brainhubeu/react-carousel/lib/style.css';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

const MonthSlider = () =>  {

    const [months, setMonths] = useState([]);

    useEffect( () => {
          axios.get('/get/months')
            .then(res => 
                res.data.length !== 0
                    ?  setMonths(res.data) 
                     : null              
                  )      
            .catch((err) => console.log(err) )
        }, []  ,console.log('listex:',months))

    return(
        <Carousel infinite centered  itemWidth={100}    
        arrowRight={<ArrowForwardIosRoundedIcon />}
        arrowLeft={<ArrowBackIosRoundedIcon/>}
        addArrowClickHandler
        slidesPerPage={3}
        slides={months.map(month=>
            <div>{month.month}</div>
        )}  
        >  
        </Carousel>
    );
} 
export default MonthSlider
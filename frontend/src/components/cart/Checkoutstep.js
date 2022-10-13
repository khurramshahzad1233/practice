import React,{Fragment} from 'react';
import { Step,Stepper,StepLabel,Typography } from '@mui/material';
import {LocalShipping,AccountBalance,LibraryAddCheck} from "@mui/icons-material"

const Checkoutstep = ({activestep}) => {

    const step=[
        {
            label:<Typography>Shipping</Typography>,
            icon:<LocalShipping/>
        },
        {
            label:<Typography>Confirm Order</Typography>,
            icon:<LibraryAddCheck/>
        },
        {
            label:<Typography>Payment</Typography>,
            icon:<AccountBalance/>
        }

    ]


    const stepstyle={
        boxSizing:"border-box"
    }
  return (


    
      <Fragment>
        <Stepper
        alternativeLabel activeStep={activestep} style={stepstyle}
        >{step.map((item,index)=>(
            <Step
            active={activestep===index?true:false}
            key={index}
            completed={activestep>=index?true:false}
            >
                <StepLabel
                style={{color:activestep>=index?"tomato":"rgba(0,0,0,0,.649)",
            }}
            icon={item.icon}
                >{item.label}</StepLabel>
                
                </Step>
        ))}

        </Stepper>
    </Fragment>
  )
}


export default Checkoutstep
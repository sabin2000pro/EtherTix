import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export const CreateBooking: React.FC = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        
    }, [])
    
  return (

    <>

        <div className = "create-booking-container">
            <h2>Create Booking</h2>C
        </div>

    </>
    
  )
}

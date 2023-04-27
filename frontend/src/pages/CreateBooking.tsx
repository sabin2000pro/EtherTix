import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const CreateBooking: React.FC = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        
    }, [dispatch, id])
    
  return (

    <>

        <div className = "create-booking-container">
            <h2>Create Booking</h2>C
        </div>

    </>

  )
}


export default CreateBooking
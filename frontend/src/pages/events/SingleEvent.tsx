import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const SingleEvent: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {} = useSelector((state: any) => state.event);
  
  return (
    <>

    <div className = "events-container">

    </div>


    </>
  )
}

export default SingleEvent
import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom';

type SingleEventProps = {
   listEvent: () => Promise<any>
   isListed: Boolean
}

const SingleEvent: React.FC<SingleEventProps> = ({isListed}) => {
  const navigate = useNavigate();
  const [singleEvent, setSingleEvent] = useState([]);

  useEffect(() => {

    const listEvent = async (...args: unknown[]): Promise<any> => {

      try {        
         // Code here to call the API to list a single event
      }
      
      catch(error: any) {
  
        if(error) {
  
          return console.error(error);
        }
      }
  
    }

    listEvent();

  }, [])
  

  return (
    <>

    <div className = "">

    </div>
    

    </>
  )
}

export default SingleEvent
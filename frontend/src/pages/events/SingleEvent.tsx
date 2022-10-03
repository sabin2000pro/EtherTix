import React, { useState, useEffect } from 'react'

type SingleEventProps = {
   listEvent: () => Promise<any>
   isListed: Boolean
}

// @description: Component that renders a single component on the screen
// @props: Method to list event
const SingleEvent: React.FC<SingleEventProps> = ({isListed}) => {
  const [singleEvent, setSingleEvent] = useState([]);

  useEffect(() => {

    const listEvent = async (...args: unknown[]): Promise<any> => {

      try {        
         
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

    <div>

    </div>

    </>
  )
}

export default SingleEvent
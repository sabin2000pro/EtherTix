import React from 'react'

const EventsList: React.FC = (props) => {
  return (
    <>

       <div>
         <h1>List of Events</h1>
         <button className = "register-btn" type = "button"> <a href = "/CreateEvent">Create Event</a> </button>
       </div>
    
    </>
  )
}

export default EventsList;
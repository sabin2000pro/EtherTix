import React from 'react'

const EventsList: React.FC = () => {
  return (
    <>
       <div>
         <h1>List of Events</h1>
         </div>
        <div>
         <button className = "register-btn" type = "button"> <a href = "/CreateEvent">Create Event</a> </button>
       </div>
    </>
  )
}

export default EventsList;
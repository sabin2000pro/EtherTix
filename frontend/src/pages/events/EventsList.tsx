import React, { useState } from "react";
import { getAllEventData } from 'api/events/event-api';

const EventsList: React.FC = () => {

  const [eventData, setEventData] = useState({
    _id:"",
    eventName: "",
    summary:"",
    description: "",
    endAt:"",
    status:"",
    currency:"",
    event_logo:"",
    format:"",
    catagory:"",
    isOnline:"",
    maxCapacity:"",
    minCapacity:"",
    slotsAvailable:"",
    showRemaining:"",
    isPremium:"",
    ticketAvailability:"",
    isLocked:"",
    isSoldOut:"",
    isSearchable:"",
    hideStartDate:"",
    hideEndDate:"",
    isFree:"",
    reservedSeating:"",
    salesStatus:"",
    saleStart:"",
    saleEnd:"",
    likes:"",
    venue:"",
    category:"",
    startAt:"",
    createdAt:"",
    changedAt:"",
    updatedAt:"",
  });

  const [error, setError] = useState("");

  const getData = async () => 
{
  try {
      
    const response = await getAllEventData();
    console.log(response);
    
    //might be useful to go back to events list page to see new entry
    //navigate('/EventsList')
  } 
  
  catch (err: any) {
    setError(err.message);
  }
  
}

//ignore untill ive got all db data printed out in react elements
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    
    try {
      
      //console.log(response);
      
      //might be useful to go back to events list page to see new entry
      //navigate('/EventsList')
    } 
    
    catch (err: any) {
      setError(err.message);
    }
    
  };

  //const rows = [];
  //for (let i = 0; i < numrows; i++) {
      // note: we are adding a key prop here to allow react to uniquely identify each
      // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    //  rows.push(<ObjectRow key={i} />);
  //}
  //return <tbody>{rows}</tbody>;  

  getData();

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
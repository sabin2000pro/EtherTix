import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
//import { createEvent } from 'api/events/event-api';

const CreateEvent: React.FC = () => {
  
  const navigate = useNavigate();
  
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
  
  //creating functionality for all individual checkboxes
 const [checkedAvalible, setCheckedAvalible] = React.useState<boolean>(false);
 const [checkedSlots, setCheckedSlots] = React.useState<boolean>(false);
 const [checkedPremium, setCheckedPremium] = React.useState<boolean>(false);
 const [checkedAvailableTix, setCheckedAvailableTix] = React.useState<boolean>(false);
 const [checkedFree, setCheckedFree] = React.useState<boolean>(false);
 const [checkedLocked, setCheckedLocked] = React.useState<boolean>(false);
 const [checkedSoldOut, setCheckedSoldOut] = React.useState<boolean>(false);
 const [checkedSearchable, setCheckedSearchable] = React.useState<boolean>(false);
 const [checkedStartHidden, setCheckedStartHidden] = React.useState<boolean>(false);
 const [checkedEndHidden, setCheckedEndHidden] = React.useState<boolean>(false);
 const [checkedReservedSeating, setCheckedReservedSeating] = React.useState<boolean>(false);

 //handles channging states for all checkboxes
 const handleAvalibleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setCheckedAvalible(!checkedAvalible);
  }

  const handleSlotChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setCheckedSlots(!checkedSlots);
  }

  const handlePremiumChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setCheckedPremium(!checkedPremium);
  }

  const handleAvailableTixChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setCheckedAvailableTix(!checkedAvailableTix);
  }


  const handleFreeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setCheckedFree(!checkedFree);
  }

  const handleLockedChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setCheckedLocked(!checkedLocked);
  }

  const handleSoldOutChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setCheckedSoldOut(!checkedSoldOut);
  }

  const handleSearchableChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setCheckedSearchable(!checkedSearchable);
  }

  const handleStartHiddenChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setCheckedStartHidden(!checkedStartHidden);
  }

  const handleEndHiddenChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setCheckedEndHidden(!checkedEndHidden);
  }


  const handleReservedChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setCheckedReservedSeating(!checkedReservedSeating);
  }

  
  
  const [error, setError] = useState("");
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    setEventData({ ...eventData, [event.target.name]: event.target.value });
    console.log(eventData)
  };

  const setCreatedDate = () => {

    const currentDate = new Date();
    //console.log(currentDate);
    

    eventData.createdAt = currentDate.toDateString();
    console.log(currentDate);
  }

  setCreatedDate();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    

    event.preventDefault();
    
    try {
      
      //const response = await createEvent(eventData);
      //console.log(response);
      
      //might be useful to go back to events list page to see new entry
      //navigate('/EventsList')
    } 
    
    catch (err: any) {
      setError(err.message);
    }
    
    
    
  };
  
  return (
    <>
    <div>
    <div className = "event-container">
    
    <div className = "image-container">
    
    </div>
    
    <h1 className = "heading-primary">Create New Event</h1>
    
    <form onSubmit={handleSubmit} method = "POST">
    
    <div className = "event-text-top-container">
    <label htmlFor = "eventName">Event Name</label>
    <input type = "text" name="eventName" id="eventName" value={eventData.eventName} onChange={handleChange}/>
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor = "summary">Summary</label>
    <input type="text" name="summary" id="summary" value={eventData.summary} onChange = {handleChange}/>
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="description">Description</label>
    <input type="text" name="description" id="description" value={eventData.description} onChange = {handleChange}/>
    </div>
    
    <br />

    <div className = "event-text-container">
    <label htmlFor="startAt">Start Time</label>
    <input type = "datetime-local" name = "startAt" id="startAt" value={eventData.startAt} onChange={handleChange}/>
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="endAt">End Time</label>
    <input type = "datetime-local" name = "endAt" id="endAt" value={eventData.endAt} onChange={handleChange}/>
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="status">Status</label>
    <input type = "text" name = "status" id="status" value={eventData.status} onChange={handleChange}/>
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="currency">Currency</label>
    <input type = "text" name = "currency" id="currency" value={eventData.currency} onChange={handleChange}/>
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="event_logo">Logo</label>
    <input type = "text" name = "event_logo" id="event_logo" value={eventData.event_logo} onChange={handleChange}/>
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="format">Format</label>
    <input type = "text" name = "format" id="format" value={eventData.format} onChange={handleChange}/>
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="maxCapacity">Max Capacity</label>
    <input type = "text" name = "maxCapacity" id="maxCapacity" value={eventData.maxCapacity} onChange={handleChange}/>
    </div>
    
    <br />

    <div className = "event-text-container">
    <label htmlFor="minCapacity">Min Capacity</label>
    <input type = "text" name = "minCapacity" id="minCapacity" value={eventData.minCapacity} onChange={handleChange}/>
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="isOnline">Avalible Online</label>
    <input type="checkbox" name = "isOnline" id="isOnline" value={eventData.isOnline.toString()} checked={checkedAvalible} onChange={handleAvalibleChange} />
    </div>

    <br />
    
    <div className = "event-text-container">
    <label htmlFor="slotsAvailable">Slots Available</label>
    <input type="checkbox" name = "slotsAvailable" id="slotsAvailable" value={eventData.slotsAvailable.toString()} checked={checkedSlots} onChange={handleSlotChange} />
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="isPremium">Premium Tickets</label>
    <input type="checkbox" name = "isPremium" id="isPremium" value={eventData.isPremium.toString()} checked={checkedPremium} onChange={handlePremiumChange} />
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="ticketAvailability">Available Tickets</label>
    <input type="checkbox" name = "ticketAvailability" id="ticketAvailability" value={eventData.ticketAvailability.toString()} checked={checkedAvailableTix} onChange={handleAvailableTixChange} />
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="isLocked">Locked</label>
    <input type="checkbox" name = "isLocked" id="isLocked" value={eventData.isLocked.toString()} checked={checkedLocked} onChange={handleLockedChange} />
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="isSoldOut">Sold Out</label>
    <input type="checkbox" name = "isSoldOut" id="isSoldOut" value={eventData.isSoldOut.toString()} checked={checkedSoldOut} onChange={handleSoldOutChange} />
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="isSearchable">Searchable</label>
    <input type="checkbox" name = "isSearchable" id="isSearchable" value={eventData.isSearchable.toString()} checked={checkedSearchable} onChange={handleSearchableChange} />
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="hideStartDate">Start Date Hidden</label>
    <input type="checkbox" name = "hideStartDate" id="hideStartDate" value={eventData.hideStartDate.toString()} checked={checkedStartHidden} onChange={handleStartHiddenChange} />
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="hideEndDate">End Date Hidden</label>
    <input type="checkbox" name = "hideEndDate" id="hideEndDate" value={eventData.hideEndDate.toString()} checked={checkedEndHidden} onChange={handleEndHiddenChange} />
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="isFree">Is Free</label>
    <input type="checkbox" name = "isFree" id="isFree" value={eventData.isFree.toString()} checked={checkedFree} onChange={handleFreeChange} />
    </div>
    
    <br />
    
    <div className = "event-text-container">
    <label htmlFor="reservedSeating">Reserved Seating</label>
    <input type="checkbox" name = "reservedSeating" id="reservedSeating" value={eventData.reservedSeating.toString()} checked={checkedReservedSeating}onChange={handleReservedChange} />
    </div>
    
    <br />
    
    <button className = "register-btn" type = "submit">Update Event</button>

    <br />
    
    <div className = "span-container">
    <span>Looking to edit an already existing event? - <a href = "/EventsList">Return to Events List</a>  </span>
    </div>
    
    </form>
    
    {error && <p>{error}</p>}
    
    
    
    </div>
    </div>
    </>
    
    )
  };
  
//<p>is Event Status checked? {checked.toString()}</p>
    

  export default CreateEvent
  import React from 'react'

  const CreateEvent: React.FC = (props) => {
    return (
      <>
        <div>
          <h1>Create Event</h1>
          <form>
    <label>
    Event ID:
      <input type="text" name="_id" />
    </label>
    <textarea> </textarea>
    <label>
    Event Name:
      <input type="text" name="name" />
    </label>
    <textarea> </textarea>
    <label>
    Event Summary:
      <input type="text" name="smmary" />
    </label>
    <textarea> </textarea>
    <label>
    Event Description:
      <input type="text" name="description" />
    </label>
    <textarea> </textarea>
    <label>
    Event Start Time:
      <input type="text" name="startAt" />
    </label>
    <textarea> </textarea>
    <label>
    Event End Time:
      <input type="text" name="endAt" />
    </label>
    <textarea> </textarea>
    <label>
    Event Status:
      <input type="text" name="eventStatus" />
    </label>
    <textarea> </textarea>
    <label>
    Event Accepted Currency Type:
      <input type="text" name="currency" />
    </label>
    <textarea> </textarea>
    <label>
    Event Accepted Currency Type:
      <input type="text" name="currency" />
    </label>
    <textarea> </textarea>
    <label>
    Event Format:
      <input type="text" name="format" />
    </label>
    <textarea> </textarea>
    <label>
    Event Avalible Online:
      <input type="text" name="isOnline" />
    </label>
    <textarea> </textarea>
    <label>
    Event Capacity:
      <input type="text" name="capacity" />
    </label>
    <textarea> </textarea>
    <label>
    Event Slots Available:
      <input type="text" name="slotsAvailable" />
    </label>
    <textarea> </textarea>
    <label>
    Event Premium Tickets:
      <input type="text" name="isPremium" />
    </label>
    <textarea> </textarea>
    <label>
    Event's Available Tickets:
      <input type="text" name="hasAvailableTickets" />
    </label>
    <textarea> </textarea>
    <label>
    Event's Available Tickets:
      <input type="text" name="hasAvailableTickets" />
    </label>
    <textarea> </textarea>
    <label>
    Event Sold Out:
      <input type="text" name="isSoldOut" />
    </label>
    <textarea> </textarea>
    <label>
    Event Is Searchable:
      <input type="boolean" name="searchable" />
    </label>
    <textarea> </textarea>
    <label>
    Event Start Date Hidden:
      <input type="boolean" name="hideStartDate" />
    </label>
    <textarea> </textarea>
    <label>
    Event End Date Hidden:
      <input type="boolean" name="hideEndDate" />
    </label>
    <textarea> </textarea>
    <label>
    Event Is Free:
      <input type="boolean" name="isFree" />
    </label>
    <textarea> </textarea>
    <label>
    Event Reserved Seating:
      <input type="boolean" name="reservedSeating" />
    </label>
    <textarea> </textarea>
    <label>
    Event Sales Status:
      <input type="boolean" name="salesStatus" />
    </label>
    <label>
    <textarea> </textarea>
    Event Organiser:
      <input type="boolean" name="organiser" />
    </label>
    <textarea> </textarea>
    <label>
    <textarea> </textarea>
    Event Venue:
      <input type="boolean" name="venue" />
    </label>
    <textarea> </textarea>
    <label>
    <textarea> </textarea>
    Event Ticket:
      <input type="boolean" name="ticket" />
    </label>
    <textarea> </textarea>
    <label>
    <textarea> </textarea>
    Event Category:
      <input type="boolean" name="category" />
    </label>
    <textarea> </textarea>

    <input type="submit" value="Submit" />
  </form>

        </div>
      
      </>
    )
  }

  export default CreateEvent
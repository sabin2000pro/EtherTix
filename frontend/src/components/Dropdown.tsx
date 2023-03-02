import React from 'react'

const Dropdown = () => {

  return (

    <>

    <div className ="dropdown profile-dropdown">

        <button className = "btn dropdown-toggle profile-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           My Profile
        </button>

      <div className = "dropdown-menu profile-items">
            <a className ="dropdown-item" href="#">Settings</a>
            <a className ="dropdown-item" href="#">Logout</a>
      </div>


    </div>


    </>
  )
}

export default Dropdown
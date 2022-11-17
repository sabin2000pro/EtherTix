import React, {useEffect} from 'react'

const UserProfile: React.FC = (props: any) => {
  

  useEffect(() => {

     // Process the JWT from local storage

     const getAuthToken = () => {

     }

     getAuthToken();

  }, [])


  return (
    <>
    
    <div>
        User Profile
    </div>

    </>
    
  )
}

export default UserProfile;
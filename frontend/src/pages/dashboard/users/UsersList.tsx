import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UsersList: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchUsersList = async () => {
            try {
              
                

            } catch(error) {

            }
        }

        fetchUsersList();

    }, [dispatch])


  return (

    <>
        <h2>Users List Component</h2>
    </>

  )
}

export default UsersList
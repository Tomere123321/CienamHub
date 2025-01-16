import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Usersmanagement = () => {
 const [users, setUsers] = useState([])

 useEffect(() => {
  const getUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/users')
      setUsers(data)
    } catch (error) {
      toast.error('Failed to Get users')
    }
  }
  getUsers()
 }, [])

}

export default Usersmanagement
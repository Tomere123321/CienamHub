import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Adduser = () => {


  const [user, setUser] = useState({
    firstName: String,
    lastName: String,
    username: String,
    sessionTimeOut: Number,
    createdData: new Date().toLocaleDateString('he-IL'),
    permissions: []
});
  }

export default Adduser
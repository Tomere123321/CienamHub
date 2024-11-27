import React from "react";
import axios from "axios";

const CheckAdmin = async () => {
  try {
    const getUsers = await axios.get("http://localhost:8000/users");
    const users = getUsers.data.map((user) => user.userName);
    return users;
 
} catch (e) {
    console.log('error fatching Users', e.message );   
}
};

export default CheckAdmin;

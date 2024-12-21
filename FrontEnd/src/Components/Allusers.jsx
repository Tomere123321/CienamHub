import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from 'react-redux'
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch()
  const user = useSelector((state) => state)

  useEffect(() => {
    const fetchUsers = async () => {
      const usersJson = "http://localhost:8000/usersjson";
      const usersDB = "http://localhost:8000/users";
      const Permissions = "http://localhost:8000/permissions";

      try {
        const [responseJson, responsePermissions, responseDB] = await Promise.all([
          axios.get(usersJson),
          axios.get(usersDB),
          axios.get(Permissions),
        ]);

        const combinedData = [...responseJson.data, ...responseDB.data, ...responsePermissions.data];

        if (combinedData.length === 0) {
          toast.error("No users found");
        } 

        setUsers(combinedData);
      } catch (e) {
        toast.error("Error fetching users. Please try again later.");
        console.error(e);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div
      className="overflow-x-auto text-white"
      style={{ maxHeight: "400px", width: "600px", overflowY: "scroll" }}
    >
      <Toaster />
      {users && users.length > 0 ? (
        <table
          className="table table-xs text-white"
          style={{ fontSize: "18px" }}
        >
          <thead style={{ color: "white", fontSize: "18px" }}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Session Timeout</th>
              <th>Created Date</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id || index}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.userName}</td>
                <td>{user.sessionTimeOut} Minutes</td>
                <td>{user.createdDate}</td>
                <td>{user.Permissions ? user.Permissions.join(", ") : "None"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", color: "white", fontSize: "18px" }}>
          No users found
        </p>
      )}
    </div>
  );
};

export default AllUsers;

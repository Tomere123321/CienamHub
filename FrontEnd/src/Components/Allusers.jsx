import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const AllUsers = () => {
  const [combinedUsers, setCombinedUsers] = useState([]);

  useEffect(() => {
    const fetchAndCombineUsers = async () => {
      const usersDBURL = "http://localhost:8000/users";
      const usersJsonURL = "http://localhost:8000/usersjson";
      const permissionsURL = "http://localhost:8000/permissions";
      const token = sessionStorage.getItem("token");

      try {
        // Fetch all data in parallel
        const [responseDB, responseJson, responsePermissions] = await Promise.all([
          axios.get(usersDBURL, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(usersJsonURL, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(permissionsURL, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const usersFromDB = responseDB.data;
        const usersFromJson = responseJson.data;
        const permissionsData = responsePermissions.data;

        console.log("Users from DB:", usersFromDB);
        console.log("Users from JSON:", usersFromJson);
        console.log("Permissions:", permissionsData);

        // Combine the data
        const combinedData = usersFromDB.map((user) => {
          const userJson = usersFromJson.find((u) => u.id === user.id) || {};
          const userPermissions =
            permissionsData.find((perm) => perm.id === user.id)?.permissions || [];

          return {
            id: user.id,
            firstName: userJson.firstName || user.firstName || "N/A",
            lastName: userJson.lastName || "N/A",
            userName: user.userName || "N/A",
            sessionTimeOut: userJson.sessionTimeOut || user.sessionTimeOut || "N/A",
            createdDate: userJson.createdDate || user.createdDate || "N/A",
            permissions: userPermissions.length > 0 ? userPermissions.join(", ") : "N/A",
          };
        });

        // Add missing users from JSON
        const missingUsers = usersFromJson.filter(
          (jsonUser) => !usersFromDB.find((dbUser) => dbUser.id === jsonUser.id)
        );

        const fullCombinedData = [
          ...combinedData,
          ...missingUsers.map((jsonUser) => ({
            id: jsonUser.id,
            firstName: jsonUser.firstName || "N/A",
            lastName: jsonUser.lastName || "N/A",
            userName: "N/A",
            sessionTimeOut: jsonUser.sessionTimeOut || "N/A",
            createdDate: jsonUser.createdDate || "N/A",
            permissions: "N/A",
          })),
        ];

        console.log("Combined Data:", fullCombinedData); // הצגת המידע הממוזג בקונסול
        setCombinedUsers(fullCombinedData);

        if (fullCombinedData.length === 0) {
          toast.error("No users found.");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Unauthorized: Please log in again.");
        } else {
          toast.error("Error fetching users. Please try again later.");
        }
        console.error("Error fetching data:", error);
      }
    };

    fetchAndCombineUsers();
  }, []);

  return (
    <div
      className="overflow-x-auto text-white"
      style={{ maxHeight: "400px", width: "800px", overflowY: "scroll", margin: "0 auto" }}
    >
      <Toaster />
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Users</h1>
      {combinedUsers.length > 0 ? (
        <table className="table table-xs text-white" style={{ fontSize: "16px", margin: "auto" }}>
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
            {combinedUsers.map((user, index) => (
              <tr key={user.id || index}>
                <td>{index + 1}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.userName}</td>
                <td>{user.sessionTimeOut}</td>
                <td>{user.createdDate}</td>
                <td>{user.permissions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center" }}>No users found</p>
      )}
    </div>
  );
};

export default AllUsers;



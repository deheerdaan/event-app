import { useState, useEffect } from "react";

const useFetchEvents = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const usersData = await response.json();
        setEvents(usersData);
      } catch (error) {
        setError(error);
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return { users, error };
};

export default useFetchEvents;

import axios from "axios";
import { createContext, useEffect, useState } from "react";

// ✅ Fix: Add these lines
axios.defaults.baseURL = "http://localhost:3030";
axios.defaults.withCredentials = true;

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("/profile");
        setUser(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setReady(true);
      }
    };

    if (!ready) {
      fetchUserData();
    }
  }, [ready]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

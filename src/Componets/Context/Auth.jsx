import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase";

const Authcontext = createContext(null);

export const userAuth = () => useContext(Authcontext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // cleanup correctly
  }, []);

  return (
    <Authcontext.Provider value={{ user }}>
      {children}
    </Authcontext.Provider>
  );
};
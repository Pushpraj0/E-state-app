import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

const isLocalhost = window.location.hostname === "localhost"

export const SocketContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);
    
    useEffect(() => {
        const socketURL = isLocalhost ? "http://localhost:4000" : "https://e-state-app-1.onrender.com";
        setSocket(io(socketURL));
    }, []);

    useEffect(() => {
        currentUser && socket?.emit("newUser", currentUser.id);
    }, [currentUser, socket]);

    
    return (
        <SocketContext.Provider value={{socket}}>
          {children}
        </SocketContext.Provider>
    )
}
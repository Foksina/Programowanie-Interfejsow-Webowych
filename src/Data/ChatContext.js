import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from './init';
import { collection, getDocs } from 'firebase/firestore';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
}

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChatUser, setSelectedChatUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  return (
    <ChatContext.Provider value={{ messages, setMessages, users, setUsers, currentUser, setCurrentUser, selectedChatUser, setSelectedChatUser }}>
      {children}
    </ChatContext.Provider>
  );
};

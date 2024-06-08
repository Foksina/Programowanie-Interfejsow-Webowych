import React, { useState, useEffect, useCallback } from 'react';
import { useChat } from '../Data/ChatContext';
import { auth, db, onAuthStateChanged } from '../Data/init';
import _ from 'lodash';
import { collection, getDocs } from 'firebase/firestore'; 

function Chat() {
  const { messages, setMessages, users, setUsers, selectedChatUser, setSelectedChatUser } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users'); // Zakładamy, że użytkownicy są przechowywani w kolekcji 'users'
      const userDocs = await getDocs(usersCollection);
      const usersList = userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, [setUsers]);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setSelectedChatUser(user);
      }
    });

    return () => unsubscribe();
  }, [setSelectedChatUser]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);


  const handleSearch = useCallback(
    _.debounce((term) => {
      if (term.trim() === '') {
        setFilteredUsers(users);
      } else {
        const lowerCaseTerm = term.toLowerCase();
        setFilteredUsers(users.filter(user => user.email.toLowerCase().includes(lowerCaseTerm)));
      }
    }, 300), [users]
  );


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, sender: auth.currentUser.email, recipient: selectedChatUser.email }]);
      setInputMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="chat-header">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search users..."
            className="search-input"
          />
        </div>
        <div className="chat-users">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className={`chat-user ${selectedChatUser && selectedChatUser.id === user.id ? 'active' : ''}`}
              onClick={() => setSelectedChatUser(user)}
            >
              {user.email}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-main">
        <div className="chat-messages">
          {messages
            .filter(message => (message.sender === auth.currentUser.email && message.recipient === selectedChatUser?.email) ||
                              (message.sender === selectedChatUser?.email && message.recipient === auth.currentUser.email))
            .map((message, index) => (
              <div key={index} className={`chat-message ${message.sender === auth.currentUser.email ? 'user' : 'recipient'}`}>
                {message.text}
              </div>
            ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

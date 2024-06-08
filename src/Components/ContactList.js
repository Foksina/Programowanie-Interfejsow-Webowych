import React from 'react';
import { useChat } from '../Data/ChatContext';

const ContactList = ({ onSelectUser }) => {
  const { messages } = useChat();
  const uniqueUsers = [...new Set(messages.map(msg => msg.uid))];

  return (
    <div className="contact-list">
      {uniqueUsers.map(uid => (
        <div key={uid} className="contact" onClick={() => onSelectUser(uid)}>
          User {uid}
        </div>
      ))}
    </div>
  );
};

export default ContactList;
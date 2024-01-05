'use client';
import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NotificationContext = createContext({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {}
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type) => {
    const id = uuidv4();
    const notification = { id, message, type };
    setNotifications((prevState) => [notification, ...prevState]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prevState) => prevState.filter((n) => n.id !== id));
  };

  const value = {
    notifications,
    addNotification,
    removeNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

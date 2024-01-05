'use client';
import { Alert } from 'antd';
import { useNotification } from '@/context/NotificationContext';

const Notification = () => {
  const { notifications, removeNotification } = useNotification();
  return (
    <div className='flex flex-col items-end fixed top-2 right-5 left-5 z-[1111]'>
      {notifications.map((notification) => (
        <div className='py-1 w-fit' key={notification.id}>
          <Alert
            message={notification.message}
            type={notification.type}
            showIcon
            closable
            onClose={() => removeNotification(notification.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Notification;

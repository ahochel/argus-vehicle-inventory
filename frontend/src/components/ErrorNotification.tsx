import React, { useCallback, useState } from 'react';
import { X } from 'tabler-icons-react';
import { Notification } from '@mantine/core';

type ErrorNotificationProps = {
  children: React.ReactNode;
};

function ErrorNotification({ children }: ErrorNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const handleClick = useCallback(() => {
    setIsVisible(false);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Notification icon={<X size={18} />} color="red" onClick={handleClick}>
      {children}
    </Notification>
  );
}

export default ErrorNotification;

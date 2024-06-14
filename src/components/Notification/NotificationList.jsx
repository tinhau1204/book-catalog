import { useNotification } from './NotificationContext.jsx';
import Notification from './index.jsx';

const NotificationList = () => {
    const { notifications } = useNotification();

    // Sort notifications by priority
    const sortedNotifications = [...notifications].sort((a, b) => b.priority - a.priority);

    return (
        <div className="fixed bottom-0 right-0 m-4">
            {sortedNotifications.map((notif) => (
                <Notification key={notif.id} {...notif} />
            ))}
        </div>
    );
};

export default NotificationList;

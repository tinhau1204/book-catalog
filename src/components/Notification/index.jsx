import { RxCross2, RxInfoCircled } from "react-icons/rx";
import { useEffect } from "react";
import { useNotification } from "./NotificationContext";
import { ActionIcon } from "@mantine/core";

export default function Notification({ id, type, description }) {
    const { removeNotification } = useNotification();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeNotification(id);
        }, 4000); //auto remove noti
        return () => clearTimeout(timer)
    }, [id, removeNotification])

    const status = Object.freeze({
        success: 'success',
        warning: 'warning',
        error: 'error',
    })

    let statusStyle = '';

    if (type === status.success) {
        statusStyle += ' bg-green-100 text-green-700 ';
    } else if (type === status.warning) {
        statusStyle += ' bg-yellow-100 text-yellow-700';
    } else if (type === status.error) {
        statusStyle += ' bg-red-100 text-red-700';
    } else {
        statusStyle += ' bg-gray-100 text-gray-700';
    }

    return (
        <div className={`w-fit max-w-60 flex flex-row items-start p-2 border border-solid rounded-lg ${statusStyle} mb-1 ease-in`}>
            <div className="flex flex-row p-0 gap-2 mr-5 justify-start items-center">
                <RxInfoCircled />
                <div className="flex flex-col items-start p-0 gap-1">
                    <h3 className="font-medium text-sm m-0 max-w-40 whitespace-normal break-words">{type?.toUpperCase()}</h3>
                    <small className="font-normal text-left text-xs max-w-40 whitespace-normal break-words">{description}</small>
                </div>
            </div>
            <ActionIcon
                variant="transparent"
                className={`${statusStyle}`}
                onClick={() => removeNotification(id)}

            >
                <RxCross2 />
            </ActionIcon>
        </div>
    );
}
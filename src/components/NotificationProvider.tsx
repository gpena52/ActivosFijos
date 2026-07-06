"use client";

import { App } from "antd";

let notificationApi: ReturnType<typeof App.useApp>["notification"];

export function NotificationProvider() {
    const { notification } = App.useApp();

    notificationApi = notification;

    return null;
}

export const notify = {
    success: (message: string, description?: string) =>
        notificationApi?.success({
           title: message,
            description,
        }),

    error: (message: string, description?: string) =>
        notificationApi?.error({
           title: message,
            description,
        }),

    warning: (message: string, description?: string) =>
        notificationApi?.warning({
           title: message,
            description,
        }),

    info: (message: string, description?: string) =>
        notificationApi?.info({
           title: message,
            description,
        }),
};
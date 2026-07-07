import { notification } from "@/components/general/antd";

export const notify = {
    success: (title: string, description?: string) =>
        notification.success({
            title,
            description,
        }),

    error: (title: string, description?: string) =>
        notification.error({
            title,
            description,
        }),

    warning: (title: string, description?: string) =>
        notification.warning({
            title,
            description,
        }),

    info: (title: string, description?: string) =>
        notification.info({
            title,
            description,
        }),
};

import type { MessageInstance } from "antd/es/message/interface";
import type { NotificationInstance } from "antd/es/notification/interface";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";
import { App } from "antd";

export let message: MessageInstance;
export let notification: NotificationInstance;
export let modal: Omit<ModalStaticFunctions, "warn">;

export default function AntdApp() {
    const staticFunction = App.useApp();

    message = staticFunction.message;
    notification = staticFunction.notification;
    modal = staticFunction.modal;

    return null;
}
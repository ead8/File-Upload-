import { notification } from "antd";

interface Notification {
  title: string;
  message: string;
}
const CustomToast = (props: Notification) => {
  notification.open({
    message: props.message,
    description: props.title,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

export default CustomToast;

import { useState } from "react";

type FooterInfo = {
  message: string;
  updateMessage: (newMessage: any) => void;
};

const useFooterInfo = (): FooterInfo => {
  const [message, setMessage] = useState<any>("");

  const updateMessage = (newMessage: any) => {
    setMessage(newMessage);
  };

  return { message, updateMessage };
};

export default useFooterInfo;

import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

// Assuming you have a socket instance available
import { socket } from "./socket";

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onDataLoaderUpdate = () => {
      notifications.show({
        color: "teal",
        message: "File was successfuly processed",
        title: "Success! 📁",
      });
    };

    // Subscribing to socket events
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("data-loader.update", onDataLoaderUpdate);

    // Cleanup function
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("data-loader.update", onDataLoaderUpdate);
    };
  }, []);

  return { isConnected };
};

export default useSocket;

import { usePublicClient } from "@/modules/clients/hooks";
import { Group, Stack, Title } from "@mantine/core";
import { observer } from "mobx-react";
import React from "react";
import { useParams } from "react-router-dom";

const ClientLandingPageView = () => {
  const { clientId, projectId } = useParams();
  const client = usePublicClient(projectId, clientId);

  // @ts-ignore
  const channels = client.item?.channels ?? [];
  const tgChannel = channels.find((channel) => channel.type === "Telegram");
  const waChannel = channels.find((channel) => channel.type === "WhatsApp");

  const whatsAppUrl = `https://wa.me/${tgChannel?.public_id}?text=/start%20${client.item?.auth_token}`;
  const telegramUrl = `https://t.me/${waChannel?.public_id}?text=/start%20${client.item?.auth_token}`;

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome, {client.item?.name}!
        </h1>
        <p className="text-gray-600 mb-8">
          Please, choose your preferred messenger
        </p>
        <div className="flex justify-center gap-6">
          {waChannel ? (
            <a
              className="btn bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg"
              href={whatsAppUrl}
              rel="noreferrer"
              target={"_blank"}
            >
              Whatsapp
            </a>
          ) : null}
          {tgChannel ? (
            <a
              className="btn bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg"
              href={telegramUrl}
              rel="noreferrer"
              target={"_blank"}
            >
              Telegram
            </a>
          ) : null}
        </div>
        <p className="text-gray-500 text-sm mt-6">
          By proceeding, you accept the{" "}
          <a className="text-blue-500 hover:underline" href="#">
            terms & conditions
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export const ClientLandingPage = observer(ClientLandingPageView);

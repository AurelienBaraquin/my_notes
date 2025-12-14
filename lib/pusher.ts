import PusherServer from "pusher";
import PusherClient from "pusher-js";

// Instance Serveur (pour envoyer les messages)
export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

// Instance Client (pour écouter les messages)
// On utilise un pattern Singleton pour éviter d'avoir 50 connexions ouvertes dans le navigateur
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  }
);
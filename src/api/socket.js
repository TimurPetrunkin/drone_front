import { io } from 'socket.io-client'

const host = import.meta.env.VITE_BASE_URL;;

export const socket = io(host, {
    autoConnect: false
  });
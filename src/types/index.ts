/**
 * all objects loaded from the db will have these fields
 */
interface DBObject {
  // id: string;
  // createdAt: string;
  // updatedAt: string;
}

export interface User extends DBObject {
  email: string;
}

export interface Message extends DBObject {
  clientId: string /** this is an id generated in the browser to track a few changes such as message delivered status */;
  text: string;
  sender: string;
  recipient: string;
  sentAt: Date | string;
  deliveredAt?: string;
}

export enum SocketEvent {
  GET_ALL_MESSAGES = 'GET_ALL_MESSAGES',
  SELECTED_USER_MESSAGES = 'SELECTED_USER_MESSAGES',
  ACTIVE_USERS = 'ACTIVE_USERS',
  MESSAGE = 'MESSAGE',
  NEW_USER_CONNECTED = 'NEW_USER_CONNECTED',
  USER_DISCONNECTED = 'USER_DISCONNECTED',
}

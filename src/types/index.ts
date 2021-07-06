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
  text: string;
  sender: User;
  recipient: User;
  sentAt: string;
  deliveredAt?: string;
}

export enum SocketEvent {
  GET_ALL_MESSAGES = 'GET_ALL_MESSAGES',
  GET_SELECTED_USER_MESSAGES = 'GET_SELECTED_USER_MESSAGES',
  ACTIVE_USERS = 'ACTIVE_USERS',
}

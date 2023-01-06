export type Message = {
  id: string;
  content: string;
  uuid?: string;
};

export type MessageDeletion = {
  id: string;
  uuid: string;
};

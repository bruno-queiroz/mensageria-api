interface GetConversationIdParams {
  toUser: string;
  fromUser: string;
}

export const getConversationId = ({
  toUser,
  fromUser,
}: GetConversationIdParams) => {
  return [toUser, fromUser].sort().join("");
};

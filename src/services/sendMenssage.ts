import { messageRepository } from "../repositories/message";
import { getConversationId } from "../utils/getMessageId";
import { SendMessageDto } from "../validators/SendMessage";

export const sendMessageService = async ({
  toUser,
  fromUser,
  message,
}: SendMessageDto) => {
  const conversationId = getConversationId({ toUser, fromUser });

  return await messageRepository.send({
    conversationId,
    toUser,
    fromUser,
    message,
  });
};

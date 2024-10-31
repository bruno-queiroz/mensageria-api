import { messageRepository } from "../repositories/message";
import { getConversationId } from "../utils/getMessageId";
import { GetMessageDto } from "../validators/GetMessage";

export const getMessageService = async (data: GetMessageDto) => {
  const conversationId = getConversationId(data);

  if (data.mode === "default" && data.date) {
    return await messageRepository.get(conversationId, data.toUser, data.date);
  }

  return await messageRepository.getLastMessage(conversationId, data.toUser);
};

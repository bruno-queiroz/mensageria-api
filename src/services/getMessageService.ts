import { messageRepository } from "../repositories/message";
import { getConversationId } from "../utils/getMessageId";
import { GetMessageDto } from "../validators/GetMessage";

export const getMessageService = async (data: GetMessageDto) => {
  const conversationId = getConversationId(data);

  if (data.mode === "default") {
    return await messageRepository.get(conversationId, data.toUser, data.date);
  }

  return await messageRepository.getNotSeen(conversationId, data.toUser);
};

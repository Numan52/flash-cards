package org.example.gym.Service;

import org.example.gym.Dtos.MessageDto;
import org.example.gym.Entities.Chat;
import org.example.gym.Entities.Message;
import org.example.gym.Entities.User;
import org.example.gym.Exception.UserException;
import org.example.gym.Repositories.ChatRepository;
import org.example.gym.Repositories.MessageRepository;
import org.example.gym.Repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class ChatService {
    private ChatRepository chatRepository;
    private UserRepository userRepository;
    private MessageRepository messageRepository;

    public ChatService(ChatRepository chatRepository, UserRepository userRepository, MessageRepository messageRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
    }



    public void saveMessage(MessageDto messageDto) {
        User sender = userRepository.findByUsername(messageDto.getUsername())
                .orElseThrow(() -> new UserException("user not found"));
        LocalDateTime time = LocalDateTime.now();
        Chat chat = chatRepository.findById(UUID.fromString(messageDto.getGameId()))
                .orElse(null);

        Message message = new Message(
                sender,
                chat,
                messageDto.getMessage(),
                messageDto.isFromUser()
        );


        messageRepository.save(message);

        if (chat == null) {
            chat = createChat(message, time, messageDto.getScenarioId());
        }

    }


    private Chat createChat(Message message, LocalDateTime time, String scenario) {
        Chat chat = new Chat(
                message.getId(),
                time,
                message.getSender(),
                scenario
        );
        chat.addMessage(message);
        chatRepository.save(chat);
        return chat;
    }
}

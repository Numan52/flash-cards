package org.example.gym.Controllers;

import org.example.gym.Dtos.MessageDto;
import org.example.gym.Exception.ExceptionDto;
import org.example.gym.Service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class ChatController {
    private static final Logger log = LoggerFactory.getLogger(ChatController.class);

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/chats/message")
    public ResponseEntity<?> postMessage(@RequestBody MessageDto messageDto) {
        if (messageDto == null) {
            return ResponseEntity.status(400).body(new ExceptionDto("/chats/message", "message missing", 400, LocalDateTime.now()));
        }

        if (messageDto.getGameId() == null) {
            return ResponseEntity.status(400).body(new ExceptionDto("/chats/message", "gameId property missing", 400, LocalDateTime.now()));

        }

        chatService.saveMessage(messageDto);

        return ResponseEntity.ok().build();
    }
}

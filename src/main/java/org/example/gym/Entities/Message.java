package org.example.gym.Entities;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;


@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;


    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = true)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Chat chat;
    
    private String content;
    private boolean fromUser;



    public Message() {

    }


    public Message(User sender, Chat chat, String content, boolean fromUser) {
        this.sender = sender;
        this.chat = chat;

        this.content = content;
        this.fromUser = fromUser;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public Chat getChat() {
        return chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isFromUser() {
        return fromUser;
    }

    public void setFromUser(boolean fromUser) {
        this.fromUser = fromUser;
    }
}

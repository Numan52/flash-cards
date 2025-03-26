package org.example.gym.Entities;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Entity

public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private LocalDateTime createdAt;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;


    private String scenario;

    @OneToMany(mappedBy = "chat")
    private List<Message> messages = new ArrayList<>();

    public Chat() {
    }

    public Chat(LocalDateTime createdAt, User user, String scenario) {
        this.createdAt = createdAt;
        this.user = user;
        this.scenario = scenario;
    }


    public Chat(UUID id, LocalDateTime createdAt, User user, String scenario) {
        this.id = id;
        this.createdAt = createdAt;
        this.user = user;
        this.scenario = scenario;
    }

    public void addMessage(Message message) {
        messages.add(message);
        message.setChat(this);
    }


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getScenario() {
        return scenario;
    }

    public void setScenario(String scenario) {
        this.scenario = scenario;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    @Override
    public String toString() {
        return "Chat{" +
                "id=" + id +
                ", createdAt=" + createdAt +
                ", user=" + user +
                ", scenario='" + scenario + '\'' +
                ", messages=" + messages +
                '}';
    }
}


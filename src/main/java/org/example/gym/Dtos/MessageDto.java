package org.example.gym.Dtos;


public class MessageDto {
    private String id;
    private String username;
    private String message;
    private String scenarioId;
    private String gameId;
    private boolean fromUser;


    public MessageDto() {
    }

    public MessageDto(String id, String username, String message, String scenarioId, String gameId, boolean fromUser) {
        this.id = id;
        this.username = username;
        this.message = message;
        this.scenarioId = scenarioId;
        this.gameId = gameId;
        this.fromUser = fromUser;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getScenarioId() {
        return scenarioId;
    }

    public void setScenarioId(String scenarioId) {
        this.scenarioId = scenarioId;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public boolean isFromUser() {
        return fromUser;
    }

    public void setFromUser(boolean fromUser) {
        this.fromUser = fromUser;
    }
}

package com.wang.model;

import javax.websocket.Session;

/**
 * Created by wangwenxiang on 15-12-9.
 */
public class OnMessage {
    private String message;
    private Session session;

    public OnMessage(String message, Session session) {
        this.message = message;
        this.session = session;
    }

    public String getMessage() {

        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }
}

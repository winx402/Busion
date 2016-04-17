package com.wang.model;

import com.alibaba.fastjson.JSONObject;

import javax.servlet.http.HttpSession;
import javax.websocket.Session;

/**
 * Created by wangwenxiang on 15-12-9.
 */
public class OnMessage {
    private JSONObject message;
    private Session session;
    private HttpSession httpSession;

    public OnMessage(JSONObject message, Session session,HttpSession httpSession) {
        this.message = message;
        this.session = session;
        this.httpSession = httpSession;
    }

    public JSONObject getMessage() {

        return message;
    }

    public HttpSession getHttpSession() {
        return httpSession;
    }

    public void setHttpSession(HttpSession httpSession) {
        this.httpSession = httpSession;
    }

    public void setMessage(JSONObject message) {
        this.message = message;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }
}

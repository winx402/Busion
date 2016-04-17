package com.wang.websocket;

import com.alibaba.fastjson.JSONObject;
import com.wang.domain.User;
import com.wang.model.*;

import javax.servlet.http.HttpSession;
import javax.websocket.*;
import javax.websocket.OnMessage;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@ServerEndpoint(value = "/userEnpoint",configurator = GetHttpSessionConfigurator.class)
public class UserEnpoint {

    private static final UserMap userMap = new UserMap();

    private HttpSession httpSession;

    /**
     * 用户建立webSocket链接
     * 获取用户webSocket Session，用户id，HttpSession
     * 通过HttpSession验证用户合法身份
     * 如果合法，添加进入Map，否则断开链接
     * @param session webSocket Session
     * @param config 获取HttpSession的config
     * @throws IOException
     */
    @OnOpen
    public void onOpen (Session session,EndpointConfig config) throws IOException {
        HttpSession httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
        if(httpSession != null){
            User user = (User)httpSession.getAttribute("user");
            if(user != null){
                if(userMap.addUser(user.getUser_id(),session)){
                    this.httpSession = httpSession;
                    System.out.println("Connection");
                    return;
                }
            }
        }
        if (session.isOpen()){
            session.getBasicRemote().sendText(MessageBuilder.newSocketExcepter().toJsonString());
        }
    }

    @OnMessage
    public void onMessage(String message,Session session)
            throws IOException, InterruptedException {
        JSONObject jsonObject;
        try {
            jsonObject = JSONObject.parseObject(message);
        }catch (RuntimeException e){
            userMap.removeValue(session);
            return;
        }
        MessageParser.start(new com.wang.model.OnMessage(jsonObject,session,httpSession));
    }

    @OnClose
    public void onClose (Session session) {
        userMap.removeValue(session);
        System.out.println("Connection Closed");
    }

    @OnError
    public void onError(Throwable e, Session session){
        userMap.removeValue(session);
        if (session.isOpen()){
            try {
                session.close();
            }catch (Exception ioe){
                System.out.println("Connection error");
            }
        }
    }
}

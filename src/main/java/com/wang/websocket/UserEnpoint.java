package com.wang.websocket;

import com.wang.domain.User;
import com.wang.model.UserMap;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpSession;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@ServerEndpoint(value = "/userEnpoint/{user_id}",configurator = GetHttpSessionConfigurator.class)
public class UserEnpoint {

    @Autowired
    private UserMap userMap;

    @OnMessage
    public void onMessage(String message, Session session)
            throws IOException, InterruptedException {
        // Send the first message to the client
        session.getBasicRemote().sendText(message);

    }

    /**
     * 用户建立webSocket链接
     * 获取用户webSocket Session，用户id，HttpSession
     * 通过HttpSession验证用户合法身份
     * 如果合法，添加进入Map，否则断开链接
     * @param session webSocket Session
     * @param config 获取HttpSession的config
     * @param user_id 前端获取user_id
     * @throws IOException
     */
    @OnOpen
    public void onOpen (Session session,EndpointConfig config, @PathParam("user_id") Integer user_id) throws IOException {
        HttpSession httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
        if(httpSession != null){
            User user = (User)httpSession.getAttribute("user");
            if(user != null && user.getUser_id() == user_id){
                if(userMap.addUser(user_id,session))
                    return;
            }
        }
       session.close();
    }

    @OnClose
    public void onClose () {
        System.out.println("Connection closed");
    }
}

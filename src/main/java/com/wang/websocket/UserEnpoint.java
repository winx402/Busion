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
@ServerEndpoint(value = "/userEnpoint",configurator = GetHttpSessionConfigurator.class)
public class UserEnpoint {

    private UserMap userMap = new UserMap();

    @OnMessage
    public void onMessage(String message, Session session)
            throws IOException, InterruptedException {
        // Send the first message to the client
        System.out.println(message);
        session.getBasicRemote().sendText(message);
    }

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
                if(userMap.addUser(user.getUser_id(),session))
                    System.out.println("Connection");
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

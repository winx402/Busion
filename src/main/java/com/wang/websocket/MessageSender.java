package com.wang.websocket;

import com.wang.model.UserMap;

import javax.websocket.Session;
import java.io.IOException;

/**
 * Created on 16/4/4.
 */
public class MessageSender {

    private static final UserMap userMap = new UserMap();

    public static boolean sendMessage(int receiver,String message){
        Session session = userMap.getUserSession(receiver);
        if (session != null){
            try {
                session.getBasicRemote().sendText(message);
                return true;
            } catch (Exception e) {
                userMap.removeUser(receiver);
                return false;
            }
        }
        return false;
    }
}

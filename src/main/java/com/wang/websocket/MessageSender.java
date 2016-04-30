package com.wang.websocket;

import com.wang.model.UserMap;

import javax.websocket.Session;
import java.io.IOException;

/**
 * Created on 16/4/4.
 */
public class MessageSender {

    private static final UserMap userMap = new UserMap();

    public static boolean sendMessageById(int receiver,String message){
        Session session = userMap.getUserSession(receiver);
        return sendMessageBySession(session,message);
    }

    public static boolean sendMessageBySession(Session session,String message){
        if (session != null){
            try {
                 session.getBasicRemote().sendText(message);
                return true;
            } catch (Exception e) {
                userMap.removeValue(session);
                return false;
            }
        }
        return false;
    }
}

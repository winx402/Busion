package com.wang.model;

import org.springframework.stereotype.Component;

import javax.websocket.Session;
import javax.xml.registry.infomodel.User;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by wangwenxiang on 15-12-9.
 */
public class UserMap {
    public static ConcurrentHashMap<Integer,Session> userConHashMap = new ConcurrentHashMap<Integer, Session>();

    public boolean haveUserKey(int user_id){
        return userConHashMap.containsKey(user_id);
    }

    public boolean haveUserValue(Session session){
        return userConHashMap.containsValue(session);
    }

    public boolean addUser(int user_id,Session session){
        userConHashMap.put(user_id,session);
        return true;
    }

    public Session getUserSession(int userId){
        if (haveUserKey(userId)){
            return userConHashMap.get(userId);
        }
        return null;
    }

    public boolean removeValue(Session session){
        for (Map.Entry<Integer,Session> entry : userConHashMap.entrySet()){
            if (entry.getValue() == session){
                removeUser(entry.getKey());
                return true;
            }
        }
        return false;
    }

    public void removeUser(int userId){
        userConHashMap.remove(userId);
    }
}

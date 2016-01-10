package com.wang.model;

import org.springframework.stereotype.Component;

import javax.websocket.Session;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by wangwenxiang on 15-12-9.
 */
@Component
public class UserMap {
    public static ConcurrentHashMap<Integer,Session> userConHashMap = new ConcurrentHashMap<Integer, Session>();

    public boolean haveUserKey(int user_id){
        return userConHashMap.containsKey(user_id);
    }

    public boolean haveUserValue(Session session){
        return userConHashMap.containsValue(session);
    }

    public boolean addUser(int user_id,Session session){
        if (haveUserKey(user_id)){
            return false;
        }
        userConHashMap.put(user_id,session);
        return true;
    }
}

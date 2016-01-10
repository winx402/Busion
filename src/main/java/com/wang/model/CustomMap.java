package com.wang.model;

import javax.websocket.Session;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by wangwenxiang on 15-12-9.
 */
public class CustomMap {
    public static ConcurrentHashMap<Integer,Session> customConHashMap = new ConcurrentHashMap<Integer, Session>();
}

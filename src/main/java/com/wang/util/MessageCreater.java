package com.wang.util;

/**
 * Created on 16/4/4.
 */
public class MessageCreater {
    public static String creatRejectFriendMessage(String name){
        return name+"拒绝添加你为好友";
    }

    public static String creatAgreeFriendMessage(String name){
        return name+"已经添加你为好友";
    }
}

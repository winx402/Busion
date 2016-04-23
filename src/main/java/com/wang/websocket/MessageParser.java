package com.wang.websocket;

import com.alibaba.fastjson.JSONObject;
import com.wang.dao.MessageDao;
import com.wang.domain.Message;
import com.wang.domain.MessageCode;
import com.wang.domain.User;
import com.wang.model.OnMessage;

import javax.servlet.http.HttpSession;

/**
 * Created on 16/4/15.
 */
public class MessageParser {

    private static MessageDao messageDao;

    public void setMessageDao(MessageDao messageDao) {
        MessageParser.messageDao = messageDao;
    }

    /**
     * 解析消息
     * 持久化消息
     * 推送消息
     * @param message 原始消息
     */
    public static void start(OnMessage message){
        int userId = checkUser(message.getHttpSession());
        if (userId == 0){
            MessageSender.sendMessageBySession(message.getSession(),MessageBuilder.newHttpSessionExcepter().toJsonString());
            return;
        }
        Message message1 = parseMessage(message.getMessage(),userId);
        messageDao.addMessage(message1);
        MessageSender.sendMessageBySession(message.getSession(),message1.toJsonString());
    }

    private static int checkUser(HttpSession session){
        User user = (User)session.getAttribute("user");
        if (user == null){
            return 0;
        }
        return user.getUser_id();
    }

    private static Message parseMessage(JSONObject jsonObject,int sender){
        int type = jsonObject.getInteger("code");
        if (type == MessageCode.USER.getMessageTypeCode()){
            return MessageBuilder.newUserMessage(sender,
                    jsonObject.getInteger("id"),
                    jsonObject.getInteger("type"),
                    jsonObject.getString("data"));
        }else if (type == MessageCode.ORG.getMessageTypeCode()){

        }else if (type == MessageCode.SYS.getMessageTypeCode()){

        }else if (type == MessageCode.ERROR.getMessageTypeCode()){

        }else {

        }
        return null;
    }
}

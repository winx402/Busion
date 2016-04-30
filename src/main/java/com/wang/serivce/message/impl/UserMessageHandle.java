package com.wang.serivce.message.impl;

import com.alibaba.fastjson.JSONObject;
import com.wang.dao.MessageDao;
import com.wang.domain.Message;
import com.wang.serivce.message.MessageBuilder;
import com.wang.serivce.message.MessageSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created BY wangwenxiang on 4/30/16.
 */
public class UserMessageHandle extends AbstractMessageHandle {

    @Autowired
    private static MessageDao messageDao;

    @Override
    public Message parseMessage(JSONObject jsonObject , int sender) {
        return MessageBuilder.newUserMessage(sender,
                jsonObject.getInteger("id"),
                jsonObject.getInteger("type"),
                jsonObject.getString("data"));
    }

    @Override
    public boolean persistMessage(Message message) {
        return UserMessageHandle.messageDao.addMessage(message)==1;
    }

    @Override
    public void pushMessage(Message message) {
        MessageSender.sendMessageById(message.getMessageUser2(),message.toJsonString());
    }

    public void setMessageDao(MessageDao messageDao) {
        UserMessageHandle.messageDao = messageDao;
    }
}

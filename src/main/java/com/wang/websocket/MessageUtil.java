package com.wang.websocket;

import com.alibaba.fastjson.JSONObject;
import com.wang.domain.Message;
import com.wang.domain.MessageCode;

import java.util.Date;

/**
 * Created on 16/4/6.
 */
public class MessageUtil {
    private Message message;

    public static Builder creatMessage(){
        return new Builder();
    }

    private MessageUtil(Builder builder){
        this.message = builder.message;
    }

    public Message getMessage(){
        return message;
    }

    public static Message newSocketExcepter(){
        return creatMessage().setMessageCode(MessageCode.ERROR)
                .setMessageType(401)
                .setMessageContent("连接服务器失败,请刷新浏览器").builder().getMessage();
    }

    public static Message newSysMessage(int user2,String messageContent,Date messageTime,int messageState){
        return creatMessage().setMessageCode(MessageCode.SYS)
                .setMessageType(2)
                .setMessageUser1(0)
                .setMessageUser2(user2)
                .setMessageContent(messageContent)
                .setMessageTime(messageTime)
                .setMessageSate(messageState)
                .builder().getMessage();
    }

    public static class Builder{
        private Message message = new Message();

        public Builder setMessageCode(MessageCode messageCode){
            message.setMessageCode(messageCode);
            return this;
        }
        public Builder setMessageId(int messageId){
            message.setMessageId(messageId);
            return this;
        }
        public Builder setMessageUser1(int user1){
            message.setMessageUser1(user1);
            return this;
        }
        public Builder setMessageUser2(int user2){
            message.setMessageUser2(user2);
            return this;
        }
        public Builder setMessageContent(String messageContent){
            message.setMessageContent(messageContent);
            return this;
        }
        public Builder setMessageType(int messageType){
            message.setMessageType(messageType);
            return this;
        }
        public Builder setMessageTime(Date messageTime){
            message.setMessageTime(messageTime);
            return this;
        }
        public Builder setMessageSate(int messageSate){
            message.setMessageState(messageSate);
            return this;
        }
        public MessageUtil builder(){
            return new MessageUtil(this);
        }

    }
}

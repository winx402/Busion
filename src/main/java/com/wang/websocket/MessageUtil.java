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

    public static JSONObject getMessageJson(Message message){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message_code",message.getMessageCode());
        jsonObject.put("user_id",message.getMessageUser1());
        jsonObject.put("message_id",message.getMessageId());
        jsonObject.put("message_content",message.getMessageContent());
        jsonObject.put("message_time",message.getMessageTime());
        jsonObject.put("message_type",message.getMessageType());
        return jsonObject;
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

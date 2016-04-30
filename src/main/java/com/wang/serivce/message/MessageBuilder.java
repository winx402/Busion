package com.wang.serivce.message;

import com.wang.domain.Message;
import com.wang.domain.MessageCode;

import java.util.Date;

/**
 * Created on 16/4/6.
 */
public class MessageBuilder {
    private Message message;

    public static Builder creatMessage(){
        return new Builder();
    }

    private MessageBuilder(Builder builder){
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

    public static Message newHttpSessionExcepter(){
        return creatMessage().setMessageCode(MessageCode.ERROR)
                .setMessageType(402)
                .setMessageContent("用户登录失效,请重新登录").builder().getMessage();
    }

    public static Message newSysMessage(int user1,int user2,String messageContent,Date messageTime,int messageState){
        return creatMessage().setMessageCode(MessageCode.SYS)
                .setMessageType(2)
                .setMessageUser1(user1)
                .setMessageUser2(user2)
                .setMessageContent(messageContent)
                .setMessageTime(messageTime)
                .setMessageSate(messageState)
                .builder().getMessage();
    }

    public static Message newAddFriendMessage(int user1,int user2,String userName){
        return creatMessage().setMessageCode(MessageCode.SYS)
                .setMessageType(3)
                .setMessageUser1(user1)
                .setMessageUser2(user2)
                .setUserName(userName)
                .setMessageContent(userName+"请求添加你为好友")
                .setMessageTime(new Date())
                .setMessageSate(10)
                .builder().getMessage();
    }

    public static Message newUserMessage(int user1,int user2,int type,String msg){
        return creatMessage().setMessageCode(MessageCode.USER)
                .setMessageType(type)
                .setMessageUser1(user1)
                .setMessageUser2(user2)
                .setMessageContent(msg)
                .setMessageTime(new Date())
                .setMessageSate(10)
                .builder().getMessage();
    }

    public static Message newOrgMessage(int user1,int org,int type,String msg){
        return creatMessage().setMessageCode(MessageCode.USER)
                .setMessageType(type)
                .setMessageUser1(user1)
                .setMessageUser2(org)
                .setMessageContent(msg)
                .setMessageTime(new Date())
                .setMessageSate(10)
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
        public Builder setUserName(String userName){
            message.setUser_name(userName);
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
        public MessageBuilder builder(){
            return new MessageBuilder(this);
        }

    }
}

package com.wang.domain;

import com.alibaba.fastjson.JSONObject;

import java.util.Date;

/**
 * Created by wangwenxiang on 16-1-7.
 */
public class Message {
    private MessageCode messageCode;
    private int messageId;
    private int messageUser1;
    private int messageUser2;
    private int messageType;
    private String messageContent;
    private Date messageTime;
    private int messageState;

    public MessageCode getMessageCode() {
        return messageCode;
    }

    public void setMessageCode(MessageCode messageCode) {
        this.messageCode = messageCode;
    }

    public int getMessageId() {
        return messageId;
    }

    public void setMessageId(int messageId) {
        this.messageId = messageId;
    }

    public int getMessageUser1() {
        return messageUser1;
    }

    public void setMessageUser1(int messageUser1) {
        this.messageUser1 = messageUser1;
    }

    public int getMessageUser2() {
        return messageUser2;
    }

    public void setMessageUser2(int messageUser2) {
        this.messageUser2 = messageUser2;
    }

    public int getMessageType() {
        return messageType;
    }

    public void setMessageType(int messageType) {
        this.messageType = messageType;
    }

    public String getMessageContent() {
        return messageContent;
    }

    public void setMessageContent(String messageContent) {
        this.messageContent = messageContent;
    }

    public Date getMessageTime() {
        return messageTime;
    }

    public void setMessageTime(Date messageTime) {
        this.messageTime = messageTime;
    }

    public int getMessageState() {
        return messageState;
    }

    public void setMessageState(int messageState) {
        this.messageState = messageState;
    }

    public String toJsonString(){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message_code",messageCode.getMessageTypeCode());
        jsonObject.put("user_id",messageUser1);
        jsonObject.put("message_id",messageId);
        jsonObject.put("message_content",messageContent);
        jsonObject.put("message_time",messageTime);
        jsonObject.put("message_type",messageType);
        return jsonObject.toString();
    }
}

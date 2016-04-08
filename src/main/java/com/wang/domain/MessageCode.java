package com.wang.domain;

/**
 * Created on 16/4/6.
 */
public enum MessageCode {
    USER(10),ORG(20),SYS(30),ERROR(40);

    private int MessageTypeCode;

    public int getMessageTypeCode() {
        return MessageTypeCode;
    }

    public void setMessageTypeCode(int messageTypeCode) {
        MessageTypeCode = messageTypeCode;
    }

    MessageCode(int MessageTypeCode){
        this.MessageTypeCode = MessageTypeCode;
    }
}

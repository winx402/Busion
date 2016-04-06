package com.wang.domain;

/**
 * Created on 16/4/6.
 */
public enum MessageCode {
    USER(10),ORG(20),SYS(30);

    private int MessageTypeCode;

    private MessageCode(int MessageTypeCode){
        this.MessageTypeCode = MessageTypeCode;
    }
}

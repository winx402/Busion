package com.wang.domain;

import java.util.Date;

/**
 * Created by wangwenxiang on 16-1-7.
 */
public class Message {
    private int message_id;
    private int message_user1;
    private int message_user2;
    private int message_type;
    private String message_content;
    private Date message_time;
    private int message_state;

    public int getMessage_id() {
        return message_id;
    }

    public void setMessage_id(int message_id) {
        this.message_id = message_id;
    }

    public int getMessage_user1() {
        return message_user1;
    }

    public void setMessage_user1(int message_user1) {
        this.message_user1 = message_user1;
    }

    public int getMessage_user2() {
        return message_user2;
    }

    public void setMessage_user2(int message_user2) {
        this.message_user2 = message_user2;
    }

    public int getMessage_type() {
        return message_type;
    }

    public void setMessage_type(int message_type) {
        this.message_type = message_type;
    }

    public String getMessage_content() {
        return message_content;
    }

    public void setMessage_content(String message_content) {
        this.message_content = message_content;
    }

    public Date getMessage_time() {
        return message_time;
    }

    public void setMessage_time(Date message_time) {
        this.message_time = message_time;
    }

    public int getMessage_state() {
        return message_state;
    }

    public void setMessage_state(int message_state) {
        this.message_state = message_state;
    }
}

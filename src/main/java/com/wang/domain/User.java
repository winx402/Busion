package com.wang.domain;

import java.util.Date;

/**
 * Created by wangwenxiang on 15-12-9.
 */
public class User {
    private int user_id;
    private String user_phone;
    private String user_mail;
    private String user_name;
    private String user_description;
    private String user_password;
    private String user_photo;
    private Date user_birthday;
    private String user_sex;
    private Date user_join_time;
    private int user_message_attention;
    private int user_state;

    public String getUser_description() {
        return user_description;
    }

    public void setUser_description(String user_description) {
        this.user_description = user_description;
    }

    public Date getUser_birthday() {
        return user_birthday;
    }

    public int getUser_message_attention() {
        return user_message_attention;
    }

    public void setUser_message_attention(int user_message_attention) {
        this.user_message_attention = user_message_attention;
    }

    public void setUser_birthday(Date user_birthday) {
        this.user_birthday = user_birthday;
    }

    public String getUser_sex() {
        return user_sex;
    }

    public void setUser_sex(String user_sex) {
        this.user_sex = user_sex;
    }

    public Date getUser_join_time() {
        return user_join_time;
    }

    public void setUser_join_time(Date user_join_time) {
        this.user_join_time = user_join_time;
    }

    public String getUser_phone() {
        return user_phone;
    }

    public void setUser_phone(String user_phone) {
        this.user_phone = user_phone;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getUser_mail() {
        return user_mail;
    }

    public void setUser_mail(String user_mail) {
        this.user_mail = user_mail;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }

    public String getUser_photo() {
        return user_photo;
    }

    public void setUser_photo(String user_photo) {
        this.user_photo = user_photo;
    }

    public int getUser_state() {
        return user_state;
    }

    public void setUser_state(int user_state) {
        this.user_state = user_state;
    }
}

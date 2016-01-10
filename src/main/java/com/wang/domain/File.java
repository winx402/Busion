package com.wang.domain;

import java.util.Date;

/**
 * Created by wangwenxiang on 16-1-7.
 */
public class File {
    private int file_id;
    private int file_organization;
    private int file_user;
    private String file_name;
    private Date file_time;
    private String file_url;
    private int file_state;

    public int getFile_id() {
        return file_id;
    }

    public void setFile_id(int file_id) {
        this.file_id = file_id;
    }

    public int getFile_organization() {
        return file_organization;
    }

    public void setFile_organization(int file_organization) {
        this.file_organization = file_organization;
    }

    public int getFile_user() {
        return file_user;
    }

    public void setFile_user(int file_user) {
        this.file_user = file_user;
    }

    public String getFile_name() {
        return file_name;
    }

    public void setFile_name(String file_name) {
        this.file_name = file_name;
    }

    public Date getFile_time() {
        return file_time;
    }

    public void setFile_time(Date file_time) {
        this.file_time = file_time;
    }

    public String getFile_url() {
        return file_url;
    }

    public void setFile_url(String file_url) {
        this.file_url = file_url;
    }

    public int getFile_state() {
        return file_state;
    }

    public void setFile_state(int file_state) {
        this.file_state = file_state;
    }
}

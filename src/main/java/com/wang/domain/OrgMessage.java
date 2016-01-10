package com.wang.domain;

import java.util.Date;

/**
 * Created by wangwenxiang on 16-1-10.
 */
public class OrgMessage {
    private int org_message_id;
    private int org_message_user;
    private int org_message_organization;
    private int org_message_type;
    private String org_message_content;
    private Date org_message_date;
    private int org_message_state;

    public int getOrg_message_id() {
        return org_message_id;
    }

    public void setOrg_message_id(int org_message_id) {
        this.org_message_id = org_message_id;
    }

    public int getOrg_message_user() {
        return org_message_user;
    }

    public void setOrg_message_user(int org_message_user) {
        this.org_message_user = org_message_user;
    }

    public int getOrg_message_organization() {
        return org_message_organization;
    }

    public void setOrg_message_organization(int org_message_organization) {
        this.org_message_organization = org_message_organization;
    }

    public int getOrg_message_type() {
        return org_message_type;
    }

    public void setOrg_message_type(int org_message_type) {
        this.org_message_type = org_message_type;
    }

    public String getOrg_message_content() {
        return org_message_content;
    }

    public void setOrg_message_content(String org_message_content) {
        this.org_message_content = org_message_content;
    }

    public Date getOrg_message_date() {
        return org_message_date;
    }

    public void setOrg_message_date(Date org_message_date) {
        this.org_message_date = org_message_date;
    }

    public int getOrg_message_state() {
        return org_message_state;
    }

    public void setOrg_message_state(int org_message_state) {
        this.org_message_state = org_message_state;
    }
}

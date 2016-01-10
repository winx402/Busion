package com.wang.domain;

import java.util.Date;

/**
 * Created by wangwenxiang on 16-1-7.
 */
public class Organization {
    private int organization_id;
    private String organization_name;
    private int organization_parent;
    private int organization_floor;
    private String organization_desc;
    private String organization_notice;
    private Date organization_time;
    private int organization_state;

    public int getOrganization_id() {
        return organization_id;
    }

    public void setOrganization_id(int organization_id) {
        this.organization_id = organization_id;
    }

    public String getOrganization_name() {
        return organization_name;
    }

    public void setOrganization_name(String organization_name) {
        this.organization_name = organization_name;
    }

    public int getOrganization_parent() {
        return organization_parent;
    }

    public void setOrganization_parent(int organization_parent) {
        this.organization_parent = organization_parent;
    }

    public int getOrganization_floor() {
        return organization_floor;
    }

    public void setOrganization_floor(int organization_floor) {
        this.organization_floor = organization_floor;
    }

    public String getOrganization_desc() {
        return organization_desc;
    }

    public void setOrganization_desc(String organization_desc) {
        this.organization_desc = organization_desc;
    }

    public String getOrganization_notice() {
        return organization_notice;
    }

    public void setOrganization_notice(String organization_notice) {
        this.organization_notice = organization_notice;
    }

    public Date getOrganization_time() {
        return organization_time;
    }

    public void setOrganization_time(Date organization_time) {
        this.organization_time = organization_time;
    }

    public int getOrganization_state() {
        return organization_state;
    }

    public void setOrganization_state(int organization_state) {
        this.organization_state = organization_state;
    }
}

package com.wang.domain;

/**
 * Created by wangwenxiang on 16-1-7.
 */
public class Position {
    private int position_id;
    private int position_organization;
    private String position_organization_name;
    private String position_name;
    private String position_desc;
    private int position_manage;
    private int position_state;

    public int getPosition_id() {
        return position_id;
    }

    public void setPosition_id(int position_id) {
        this.position_id = position_id;
    }

    public int getPosition_organization() {
        return position_organization;
    }

    public void setPosition_organization(int position_organization) {
        this.position_organization = position_organization;
    }

    public String getPosition_organization_name() {
        return position_organization_name;
    }

    public void setPosition_organization_name(String position_organization_name) {
        this.position_organization_name = position_organization_name;
    }

    public String getPosition_name() {
        return position_name;
    }

    public void setPosition_name(String position_name) {
        this.position_name = position_name;
    }

    public String getPosition_desc() {
        return position_desc;
    }

    public void setPosition_desc(String position_desc) {
        this.position_desc = position_desc;
    }

    public int getPosition_manage() {
        return position_manage;
    }

    public void setPosition_manage(int position_manage) {
        this.position_manage = position_manage;
    }

    public int getPosition_state() {
        return position_state;
    }

    public void setPosition_state(int position_state) {
        this.position_state = position_state;
    }
}

package com.wang.model;

/**
 * Created by wangwenxiang on 15-12-25.
 */
public class PhoneMessage {
    private String phoneNumber; //接收短信的手机号码
    private String code; //验证码
    /**
     * 短信签名，传入的短信签名必须是在阿里大鱼“管理中心-短信签名管理”中的可用签名。
     * 注册验证、身份验证、登录验证、变更验证、活动验证
     */
    private String smsFreeSignName;

    public PhoneMessage(String phoneNumber, String code, String smsFreeSignName) {
        this.phoneNumber = phoneNumber;
        this.code = code;
        this.smsFreeSignName = smsFreeSignName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getSmsFreeSignName() {
        return smsFreeSignName;
    }

    public void setSmsFreeSignName(String smsFreeSignName) {
        this.smsFreeSignName = smsFreeSignName;
    }
}

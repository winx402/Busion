package com.wang.model;

/**
 * Created by wangwenxiang on 15-12-11.
 */
public class Mail {
    private String formMail; //发件人
    private String toMail; //收件人
    private String replyMail; //回复至
    private String mailTitle; //邮件标题
    private String mailContent; //邮件内容
    private boolean isHtmlMail; //是否以html格式展示

    public Mail(String toMail, String mailContent) {
        this.formMail = "18623657744@163.com";
        this.replyMail = "18623657744@163.com";
        this.mailTitle = "注册验证";
        this.isHtmlMail = false;
        this.toMail = toMail;
        this.mailContent = mailContent;
    }

    public String getFormMail() {
        return formMail;
    }

    public void setFormMail(String formMail) {
        this.formMail = formMail;
    }

    public String getToMail() {
        return toMail;
    }

    public void setToMail(String toMail) {
        this.toMail = toMail;
    }

    public String getReplyMail() {
        return replyMail;
    }

    public void setReplyMail(String replyMail) {
        this.replyMail = replyMail;
    }

    public String getMailTitle() {
        return mailTitle;
    }

    public void setMailTitle(String mailTitle) {
        this.mailTitle = mailTitle;
    }

    public String getMailContent() {
        return mailContent;
    }

    public void setMailContent(String mailContent) {
        this.mailContent = mailContent;
    }

    public boolean isHtmlMail() {
        return isHtmlMail;
    }

    public void setHtmlMail(boolean htmlMail) {
        isHtmlMail = htmlMail;
    }
}

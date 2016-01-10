package com.wang.util;

import com.wang.model.Mail;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class MailSender {

	private static JavaMailSender javaMailSender;

	public static void send(Mail mail) throws MessagingException{
		MimeMessage mime = MailSender.javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mime, true, "utf-8");
		helper.setFrom(mail.getFormMail());//发件人
		helper.setTo(mail.getToMail());//收件人
		helper.setReplyTo(mail.getReplyMail());//回复到
		helper.setSubject(mail.getMailTitle());//邮件主题
		helper.setText(mail.getMailContent(), mail.isHtmlMail());//true表示设定html格式
		MailSender.javaMailSender.send(mime);
	}

	public JavaMailSender getJavaMailSender() {
		return javaMailSender;
	}

	public void setJavaMailSender(JavaMailSender javaMailSender) {
		MailSender.javaMailSender = javaMailSender;
	}
}

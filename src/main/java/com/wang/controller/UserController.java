package com.wang.controller;

import com.alibaba.fastjson.JSONObject;
import com.wang.domain.User;
import com.wang.model.Mail;
import com.wang.model.PhoneMessage;
import com.wang.serivce.UserService;
import com.wang.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.MessagingException;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@Controller
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 用户登陆
     * 验证用户是否存在
     * 验证用户是否正常
     * 验证用户密码
     * @param account 用户账号
     * @param password 用户密码
     * @return
     */
    @RequestMapping("userLogin")
    @ResponseBody
    public JSONObject userLogin(Integer loginType,String account,String password,HttpSession session){
        if ((loginType == 0 && !StringUtil.checkEmail(account)) ||
             (loginType == 1 && !StringUtil.checkPhoneNumber(account))){
            return AjaxReturn.Data2Ajax(0,"登陆错误",null);
        }
        User user = userService.getUserByAccount(loginType,account);
        if (user == null){
            return AjaxReturn.Data2Ajax(0,"该账号没有注册",null);
        }
        if (user.getUser_state() == 0){
            return AjaxReturn.Data2Ajax(0,"该账号已经冻结",null);
        }
        try{
            if (MD5Util.validPassword(password,user.getUser_password())){
                user.setUser_password(null);
                session.setAttribute("user",user);
                return AjaxReturn.Data2Ajax(1,null,null);
            }else{
                return AjaxReturn.Data2Ajax(0,"密码错误",null);
            }
        }catch (NoSuchAlgorithmException ne){
            return AjaxReturn.Data2Ajax(0,"服务器异常",null);
        }catch (UnsupportedEncodingException ue){
            return AjaxReturn.Data2Ajax(0,"服务器异常",null);
        }
    }

    /**
     * 用户注册第一步，获取用户邮箱或者手机号码
     * 验证用户邮箱、手机格式
     * 验证数据库是否已经注册
     * 产生数字验证码，存入session和application
     * @param request 通过request获取全局变量application和session
     * @param account 获取用户邮箱
     * @return 返回结果
     */
    @RequestMapping("register1")
    @ResponseBody
    public JSONObject register1(HttpServletRequest request, String account ,Integer registerType){
        if((registerType == 0 && !StringUtil.checkEmail(account)) ||
           (registerType == 1 && !StringUtil.checkPhoneNumber(account))){
            return AjaxReturn.Data2Ajax(0,(registerType==0?"邮箱":"手机号码")+"格式错误",null);
        }
        int haveAccount = userService.checkMailorPhone(registerType,account);
        if(haveAccount!=0){
            if (haveAccount == -1)
                return AjaxReturn.Data2Ajax(0,"注册类型错误",null);
            return AjaxReturn.Data2Ajax(0,"该"+(registerType==0?"邮箱":"手机号码")+"已经被注册",null);
        }
        HttpSession session = request.getSession();
        ServletContext application = request.getServletContext();
        String code = StringUtil.getRandomCode(4);
        if (registerType == 0){
            String content = "你好，验证码为："+code;
            Mail mail = new Mail(account,content);
            try {
                MailSender.send(mail);
            }catch (MessagingException me){
                return AjaxReturn.Data2Ajax(0,"服务器异常",null);
            }
            session.setAttribute("mail",account);
        }else if (registerType == 1){
            PhoneMessage phoneMessage = new PhoneMessage(account,code,"注册验证");
            PhoneSender.send(phoneMessage);
            session.setAttribute("phone",account);
        }
        session.setAttribute("registerCode",code);
        application.setAttribute("register:"+account,code);
        return AjaxReturn.Data2Ajax(1,null,null);
    }

    /**
     * 用户注册第二步，验证邮箱、手机验证码
     * 从session中获取第一步中的邮箱、手机
     * 通过邮箱获取application中的code并验证
     * @param request
     * @param code
     * @return
     */
    @RequestMapping("register2")
    @ResponseBody
    public JSONObject register2(HttpServletRequest request, String code, Integer registerType){
        if (code == null || "".equals(code) || registerType == null){
            return AjaxReturn.Data2Ajax(0,"验证码未知错误",null);
        }
        String account = request.getSession().getAttribute(registerType==0?"mail":"phone").toString();
        if (account == null || "".equals(account)){
            return AjaxReturn.Data2Ajax(0,"请按步骤进行",null);
        }
        String app_code = request.getServletContext().getAttribute("register:"+account).toString();
        if(app_code == null || "".equals(app_code)){
            return AjaxReturn.Data2Ajax(0,"请按步骤进行",null);
        }
        if (code.equals(app_code)){
            return AjaxReturn.Data2Ajax(1,null,null);
        }
        return AjaxReturn.Data2Ajax(0,"验证码错误",null);
    }

    /**
     *
     * @param request
     * @param user_name
     * @param user_password
     * @return
     */
    @RequestMapping("register3")
    @ResponseBody
    public JSONObject register3(HttpServletRequest request,String user_name,String user_password,Integer registerType){
        if(user_name == null || "".equals(user_name) || user_password == null || "".equals(user_password)){
            return AjaxReturn.Data2Ajax(0,"用户信息错误",null);
        }
        HttpSession session = request.getSession();
        String account = session.getAttribute(registerType==0?"mail":"phone").toString();
        if(account == null || "".equals(account)){
            return AjaxReturn.Data2Ajax(0,"非法用户",null);
        }
        String sessionCode = session.getAttribute("registerCode").toString();
        String applicaCode = request.getServletContext().getAttribute("register:"+account).toString();
        if(sessionCode == null || "".equals(sessionCode) || !sessionCode.equals(applicaCode)){
            return AjaxReturn.Data2Ajax(0,"用户验证失败",null);
        }
        User user = new User();
        if (registerType == 0){
            user.setUser_mail(account);
        }else if (registerType == 1){
            user.setUser_phone(account);
        }
        user.setUser_name(user_name);
        try {
            user.setUser_password(MD5Util.getEncryptedPwd(user_password));
        }catch (Exception e){
            return AjaxReturn.Data2Ajax(0,"系统错误",null);
        }
        if(userService.addUser(registerType,user) == 1){
            JSONObject jb = new JSONObject();
            jb.put("account",account);
            return AjaxReturn.Data2Ajax(1,"success",jb);
        }else{
            return AjaxReturn.Data2Ajax(0,"系统错误",null);
        }
    }

}

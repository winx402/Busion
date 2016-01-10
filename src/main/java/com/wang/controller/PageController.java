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
public class PageController {

    /**
     * 用户登陆页面跳转
     */
    @RequestMapping("login")
    public String userLoginPage(){
        return "login.jsp";
    }

    /**
     * 用户注册页面跳转
     */
    @RequestMapping("register")
    public String userRegisterPage(){
        return "register.jsp";
    }

    /**
     * 主页面跳转
     */
    @RequestMapping("main")
    public String main(){
        return "main.html";
    }
}

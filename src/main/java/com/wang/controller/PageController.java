package com.wang.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

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
    public String main(HttpSession session){
        Object o = session.getAttribute("user");
        if (o == null){
            return "redirect:login";
        }
        return "main.html";
    }
}

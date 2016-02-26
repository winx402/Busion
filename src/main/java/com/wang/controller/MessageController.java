package com.wang.controller;

import com.alibaba.fastjson.JSONObject;
import com.wang.domain.User;
import com.wang.serivce.MessageService;
import com.wang.util.AjaxReturn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@Controller
@RequestMapping("message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    /**
     * 获取用户的未读消息
     * @param userId
     * @param session
     * @return
     */
    @RequestMapping("getUserUnReadTalking")
    @ResponseBody
    public JSONObject getUserUnReadTalking(int userId, HttpSession session){
        User user = (User)session.getAttribute("user");
        if (user == null){
            return AjaxReturn.Data2Ajax(0,"未登陆",null);
        }
        JSONObject js = new JSONObject();
        js.put("userId",userId);
        js.put("rows",messageService.getUserUnReadTalking(user.getUser_id(),userId));
        return AjaxReturn.Data2Ajax(1,null,js);
    }
}

package com.wang.controller;

import com.alibaba.fastjson.JSONObject;
import com.wang.cache.read.impl.UserMessageReadCache;
import com.wang.domain.Message;
import com.wang.domain.User;
import com.wang.serivce.MessageService;
import com.wang.serivce.UserService;
import com.wang.util.AjaxReturn;
import com.wang.util.MessageCreater;
import com.wang.serivce.message.MessageSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.Date;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@Controller
@RequestMapping("message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserMessageReadCache userMessageReadCache;

    /**
     * 获取用户的未读消息
     * @param id 目标用户id
     * @param session 获取自己的userId
     * @return 未读消息集合
     */
    @RequestMapping("getUserUnReadTalking")
    @ResponseBody
    public JSONObject getUserUnReadTalking(int id, HttpSession session){
        User user = (User)session.getAttribute("user");
        if (user == null){
            return AjaxReturn.Data2Ajax(0,"未登陆",null);
        }
        JSONObject js = new JSONObject();
        js.put("userId",id);
        js.put("rows",messageService.getUserUnReadTalking(user.getUser_id(),id));
        return AjaxReturn.Data2Ajax(1,null,js);
    }

    /**
     * 设置好友请求消息已读
     * @param messageId 系统消息id
     * @return json
     */
    @RequestMapping("readMessage")
    @ResponseBody
    public JSONObject readMessage(HttpSession session,String messageId){
        User user = (User)session.getAttribute("user");
        if (user == null){
            return AjaxReturn.Data2AjaxForError("未登录");
        }
        if (messageId == null){
            return AjaxReturn.Data2AjaxForError(null);
        }
        userMessageReadCache.put(user.getUser_id(),messageId);
        return AjaxReturn.Data2Ajax(1,null,null);
    }

    /**
     * 设置系统消息已读
     * @return json
     */
    @RequestMapping("readSysMessage")
    @ResponseBody
    public JSONObject readSysMessage(HttpSession session){
        User user = (User) session.getAttribute("user");
        if (user == null){
            return AjaxReturn.Data2Ajax(0,"未登陆",null);
        }
        messageService.readSysMessage(user.getUser_id());
        return AjaxReturn.Data2Ajax(1,null,null);
    }

    /**
     * 同意好友请求
     */
    @RequestMapping("agreeFriendRequest")
    @ResponseBody
    public JSONObject agreeFriendRequest(HttpSession session,int userId){
        User user = (User)session.getAttribute("user");
        if (user == null){
            return AjaxReturn.Data2Ajax(0,"未登陆",null);
        }
        String messageContent = MessageCreater.creatAgreeFriendMessage(user.getUser_name());
        try {
            userService.agreeFriendRequest(user.getUser_id(),userId);
        }catch (Exception e){
            return AjaxReturn.Data2AjaxForError("不能重复添加好友");
        }
        Message message = messageService.addSysMessage(user.getUser_id(),userId,2,messageContent ,
                new Date(),10);
        if (message == null){
            return AjaxReturn.Data2AjaxForError("消息发送失败");
        }
        MessageSender.sendMessageById(userId,message.toJsonString());
        return AjaxReturn.Data2AjaxForSuccess(userService.getUserAsFriend(user.getUser_id(),userId));
    }

    @RequestMapping("rejectFriendRequest")
    @ResponseBody
    public JSONObject rejectFriend(HttpSession session,int userId){
        User user = (User)session.getAttribute("user");
        if (user == null){
            return AjaxReturn.Data2AjaxForError("未登陆");
        }
        String messageContent = MessageCreater.creatRejectFriendMessage(user.getUser_name());
        Message message = messageService.addSysMessage(0,userId,2,messageContent ,
                new Date(),10);
        if (message == null){
            return AjaxReturn.Data2AjaxForError("消息发送失败");
        }
        MessageSender.sendMessageById(userId, message.toJsonString());
        return AjaxReturn.Data2AjaxForSuccess(null);
    }
}

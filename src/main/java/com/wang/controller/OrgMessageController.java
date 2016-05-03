package com.wang.controller;

import com.alibaba.fastjson.JSONObject;
import com.wang.cache.read.impl.OrgMessageReadCache;
import com.wang.domain.User;
import com.wang.serivce.OrgMessageService;
import com.wang.util.AjaxReturn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@Controller
@RequestMapping("orgMessage")
public class OrgMessageController {

    @Autowired
    private OrgMessageService orgMessageService;

    @Autowired
    private OrgMessageReadCache orgMessageReadCache;

    @RequestMapping("getOrgUnReadTalking")
    @ResponseBody
    public JSONObject getOrgUnReadTalking(HttpSession session,int id){
        User user = (User)session.getAttribute("user");
        if (user == null){
            return AjaxReturn.Data2Ajax(0,"未登陆",null);
        }
        JSONObject js = new JSONObject();
        js.put("orgId",id);
        js.put("rows",orgMessageService.getOrgUnReadTalking(user.getUser_id(),id));
        return AjaxReturn.Data2Ajax(1,null,js);
    }

    @RequestMapping("readOrgMessage")
    @ResponseBody
    public JSONObject readOrgMessage(HttpSession session,int orgId,int maxId){
        User user = (User)session.getAttribute("user");
        if (user == null){
            return AjaxReturn.Data2AjaxForError("未登陆");
        }
        orgMessageReadCache.put(user.getUser_id(),orgId,maxId);
        return AjaxReturn.Data2AjaxForSuccess(null);
    }
}

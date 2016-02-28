package com.wang.controller;

import com.alibaba.fastjson.JSONObject;
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
}

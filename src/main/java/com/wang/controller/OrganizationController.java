package com.wang.controller;

import com.alibaba.fastjson.JSONObject;
import com.wang.domain.Organization;
import com.wang.domain.User;
import com.wang.serivce.OrganizationService;
import com.wang.util.AjaxReturn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.TreeMap;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@Controller
@RequestMapping("organization")
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;


    /**
     * 获取我的所有组织
     * @param session
     * @return
     */
    @RequestMapping("getMyOrganization")
    @ResponseBody
    public JSONObject getMyOrganization(HttpSession session){
        User user = (User)session.getAttribute("user");
        if (user == null){
            return AjaxReturn.Data2Ajax(0,"未登陆",null);
        }
        return AjaxReturn.Data2Ajax(0,"未获取",null);
    }
}

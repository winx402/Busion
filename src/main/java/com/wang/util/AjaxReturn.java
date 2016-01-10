package com.wang.util;

import com.alibaba.fastjson.JSONObject;

/**
 * Created by wangwenxiang on 15-12-9.
 */
public class AjaxReturn {
    public static JSONObject Data2Ajax(int code,String msg,Object data){
        JSONObject jo = new JSONObject();
        jo.put("code",code);
        jo.put("msg",msg);
        jo.put("data",data);
        return jo;
    }
}

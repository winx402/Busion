package com.wang.util;

import com.alibaba.fastjson.JSONObject;

/**
 * Created by wangwenxiang on 15-12-9.
 */
public class AjaxReturn {

    private static final int SUCCESS = 1;
    private static final int ERROR = 0;
    public static JSONObject Data2Ajax(int code,String msg,Object data){
        JSONObject jo = new JSONObject();
        jo.put("code",code);
        jo.put("msg",msg);
        jo.put("data",data);
        return jo;
    }

    public static JSONObject Data2AjaxForSuccess(Object data){
        return Data2Ajax(SUCCESS,null,data);
    }

    public static JSONObject Data2AjaxForError(String msg){
        return Data2Ajax(ERROR,msg,null);
    }
}

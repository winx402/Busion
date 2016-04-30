package com.wang.serivce.message.impl;

import com.alibaba.fastjson.JSONObject;
import com.wang.domain.Message;
import com.wang.serivce.message.MessageHandle;

/**
 * Created BY wangwenxiang on 4/30/16.
 */
public abstract class AbstractMessageHandle implements MessageHandle {

    public void flowController(JSONObject jsonObject,int sender){
        Message message = parseMessage(jsonObject,sender);
        persistMessage(message);
        pushMessage(message);
    }

    public abstract Message parseMessage(JSONObject jsonObject,int sender);

    public abstract boolean persistMessage(Message message);

    public abstract void pushMessage(Message message);
}
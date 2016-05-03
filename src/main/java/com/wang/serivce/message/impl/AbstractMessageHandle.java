package com.wang.serivce.message.impl;

import com.alibaba.fastjson.JSONObject;
import com.wang.domain.Message;
import com.wang.serivce.message.MessageHandle;

/**
 * Created BY wangwenxiang on 4/30/16.
 */
public abstract class AbstractMessageHandle<T> implements MessageHandle<T> {

    public void flowController(JSONObject jsonObject,int sender){
        T t = parseMessage(jsonObject,sender);
        persistMessage(t);
        pushMessage(t);
    }

    public abstract T parseMessage(JSONObject jsonObject,int sender);

    public abstract boolean persistMessage(T message);

    public abstract void pushMessage(T message);
}
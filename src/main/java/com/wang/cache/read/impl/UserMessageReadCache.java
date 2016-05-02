package com.wang.cache.read.impl;

import com.google.common.base.Preconditions;
import com.google.common.cache.RemovalNotification;
import com.wang.cache.read.AbstractMessageReadCache;
import com.wang.dao.MessageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

/**
 * Created BY wangwenxiang on 5/2/16.
 * 用户消息已读缓存
 */
@Service
public class UserMessageReadCache extends AbstractMessageReadCache<Integer,Set<Integer>>{

    @Autowired
    private MessageDao messageDao;


    @Override
    protected Set<Integer> newInstanceV() {
        return new HashSet<Integer>();
    }

    @Override
    protected void removal(RemovalNotification<Integer, Set<Integer>> notification) {
        Preconditions.checkNotNull(notification);
        messageDao.readMessagesBySet(notification.getValue());
    }

    public void put(int user,int messageId){
        Set<Integer> set = getV(user);
        set.add(messageId);
    }

    public void put(int user,String[] ids){
        Set<Integer> set = getV(user);
        for (String s : ids){
            set.add(Integer.parseInt(s));
        }
    }

    public void put(int user,String idString){
        if (idString.contains(",")){
            put(user,idString.split(","));
        }else {
            put(user,Integer.parseInt(idString));
        }
    }
}

package com.wang.cache.read.impl;

import com.google.common.cache.*;
import com.wang.cache.read.AbstractMessageReadCache;
import com.wang.dao.OrgMessageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Created BY wangwenxiang on 5/2/16.
 * 组织的已读消息缓存
 */
@Service
public class OrgMessageReadCache extends AbstractMessageReadCache<Integer,Map<Integer,Integer>> {

    @Autowired
    private OrgMessageDao orgMessageDao;

    @Override
    protected Map<Integer, Integer> newInstanceV() {
        return new HashMap<Integer, Integer>();
    }

    @Override
    protected void removal(RemovalNotification<Integer, Map<Integer, Integer>> notification){
        if (notification != null){
            Integer user = notification.getKey();
            Map<Integer,Integer> values = notification.getValue();
            assert values != null;
            for (Map.Entry<Integer,Integer> entry : values.entrySet()){
                orgMessageDao.updateOrgUnReadTalking(user,entry.getKey(),entry.getValue());
            }
        }
    }

    /**
     * 添加或更新缓存
     * @param user 用户id
     * @param org 组织id
     * @param maxLine 已读取消息的最大行
     */
    public void put(int user,int org,int maxLine){
        Map<Integer,Integer> map = getV(user);
        map.put(org,maxLine);
    }
}

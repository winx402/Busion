package com.wang.serivce.message.impl;

import com.alibaba.fastjson.JSONObject;
import com.wang.dao.OrgMessageDao;
import com.wang.domain.Message;
import com.wang.cache.OrgCache;
import com.wang.serivce.message.MessageBuilder;
import com.wang.serivce.message.MessageSender;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Created BY wangwenxiang on 4/30/16.
 */
@Service
public class OrgMessageHandle extends AbstractMessageHandle {

    private static OrgMessageDao orgMessageDao;

    @Override
    public Message parseMessage(JSONObject jsonObject, int sender) {
        return MessageBuilder.newOrgMessage(sender,
                jsonObject.getInteger("id"),
                jsonObject.getInteger("type"),
                jsonObject.getString("data"));
    }

    @Override
    public boolean persistMessage(Message message) {
        return orgMessageDao.addOrgMessage(message)==1;
    }

    @Override
    public void pushMessage(Message message) {
        Set<Integer> ids = OrgCache.orgUsers.getUnchecked(message.getMessageUser2());
        String messageString = message.toJsonString();
        for (Integer id : ids){
            MessageSender.sendMessageById(id,messageString);
        }
    }

    public void setOrgMessageDao(OrgMessageDao orgMessageDao) {
        OrgMessageHandle.orgMessageDao = orgMessageDao;
    }
}

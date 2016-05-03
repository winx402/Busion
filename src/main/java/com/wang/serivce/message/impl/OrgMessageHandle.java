package com.wang.serivce.message.impl;

import com.alibaba.fastjson.JSONObject;
import com.wang.dao.OrgMessageDao;
import com.wang.domain.Message;
import com.wang.cache.OrgCache;
import com.wang.domain.MessageCode;
import com.wang.domain.OrgMessage;
import com.wang.serivce.message.MessageBuilder;
import com.wang.serivce.message.MessageSender;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;

/**
 * Created BY wangwenxiang on 4/30/16.
 */
@Service
public class OrgMessageHandle extends AbstractMessageHandle<OrgMessage> {

    private static OrgMessageDao orgMessageDao;

    @Override
    public OrgMessage parseMessage(JSONObject jsonObject, int sender) {
        OrgMessage orgMessage = new OrgMessage();
        orgMessage.setMessageCode(MessageCode.ORG);
        orgMessage.setMessageType(jsonObject.getInteger("type"));
        orgMessage.setMessageUser1(sender);
        orgMessage.setMessageOrgId(jsonObject.getInteger("id"));
        orgMessage.setMessageContent(jsonObject.getString("data"));
        orgMessage.setMessageTime(new Date());
        orgMessage.setMessageState(10);
        return orgMessage;
    }

    @Override
    public boolean persistMessage(OrgMessage message) {
        return orgMessageDao.addOrgMessage(message)==1;
    }

    @Override
    public void pushMessage(OrgMessage message) {
        Set<Integer> ids = OrgCache.orgUsers.getUnchecked(message.getMessageOrgId());
        String messageString = message.toJsonString();
        for (Integer id : ids){
            MessageSender.sendMessageById(id,messageString);
        }
    }

    public void setOrgMessageDao(OrgMessageDao orgMessageDao) {
        OrgMessageHandle.orgMessageDao = orgMessageDao;
    }
}

package com.wang.serivce.message.impl;

import com.alibaba.fastjson.JSONObject;
import com.wang.cache.read.impl.OrgMessageReadCache;
import com.wang.dao.OrgMessageDao;
import com.wang.domain.Message;
import com.wang.cache.OrgCache;
import com.wang.domain.MessageCode;
import com.wang.domain.OrgMessage;
import com.wang.serivce.message.MessageBuilder;
import com.wang.serivce.message.MessageSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;

/**
 * Created BY wangwenxiang on 4/30/16.
 */
@Service
public class OrgMessageHandle extends AbstractMessageHandle<OrgMessage> {

    @Autowired
    private OrgMessageDao orgMessageDao;

    @Autowired
    private OrgMessageReadCache orgMessageReadCache;

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
        int me = message.getMessageUser1();
        for (Integer id : ids){
            if (me != id)
                MessageSender.sendMessageById(id,messageString);
        }
    }

    public void setMessageHaveRead(OrgMessage orgMessage){
        orgMessageReadCache.put(orgMessage.getMessageUser1(),orgMessage.getMessageOrgId(),orgMessage.getMessageId());
    }

    /**
     * 重写消息处理流程
     * 添加已读自己的消息
     * @param jsonObject 前端消息
     * @param sender 发送者
     */
    @Override
    public void flowController(JSONObject jsonObject, int sender) {
        OrgMessage orgMessage = parseMessage(jsonObject,sender);
        persistMessage(orgMessage);
        setMessageHaveRead(orgMessage);
        pushMessage(orgMessage);
    }

}

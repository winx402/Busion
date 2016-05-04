package com.wang.serivce.message;

import com.alibaba.fastjson.JSONObject;
import com.wang.dao.MessageDao;
import com.wang.domain.MessageCode;
import com.wang.domain.User;
import com.wang.model.OnMessage;
import com.wang.model.UserMap;
import com.wang.serivce.message.impl.AbstractMessageHandle;
import com.wang.serivce.message.impl.OrgMessageHandle;
import com.wang.serivce.message.impl.UserMessageHandle;
import com.wang.util.SpringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpSession;

/**
 * Created on 16/4/15.
 */
public class MessageParser {

    private static Logger logger = LoggerFactory.getLogger(MessageParser.class);

    /**
     * 解析消息
     * 持久化消息
     * 推送消息
     * @param message 原始消息
     */
    public static void start(OnMessage message){
        int userId = checkUser(message.getHttpSession());
        if (userId == 0){
            MessageSender.sendMessageBySession(message.getSession(), MessageBuilder.newHttpSessionExcepter().toJsonString());
            return;
        }
        AbstractMessageHandle messageHandle = parseMessage(message.getMessage());
        assert messageHandle != null;
        messageHandle.flowController(message.getMessage(),userId);
    }

    private static int checkUser(HttpSession session){
        User user = null;
        try {
            user = (User)session.getAttribute("user");
        }catch (NullPointerException e){
            logger.error("user is empty");
        }
        if (user == null){
            return 0;
        }
        return user.getUser_id();
    }

    private static AbstractMessageHandle parseMessage(JSONObject jsonObject){
        int type = jsonObject.getInteger("code");
        if (type == MessageCode.USER.getMessageTypeCode()){
            return SpringUtils.getBean(UserMessageHandle.class);
        }else if (type == MessageCode.ORG.getMessageTypeCode()){
            return SpringUtils.getBean(OrgMessageHandle.class);
        }else if (type == MessageCode.SYS.getMessageTypeCode()){

        }else if (type == MessageCode.ERROR.getMessageTypeCode()){

        }else {

        }
        return null;
    }
}

package com.wang.serivce;

import com.wang.dao.MessageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created on 15-12-7.
 */
@Service
public class MessageService {


    @Autowired
    private MessageDao messageDao;

    /**
     * 获取用户的未读个人消息
     * 只获取消息的条数,相应的发送者的基本信息
     * 不获取消息的具体内容,因为用户不一定会读取
     * @param userId 接受者的用户id
     * @return 结果集
     */
    public List<HashMap<String,Object>> getMyUnReadTalking(int userId){
        return messageDao.getMyUnReadTalking(userId);
    }

    /**
     * 获取用户的未读消息具体内容
     * 设置为已读
     * @param userId 用户id
     * @param userId1 用户id2
     * @return json
     */
    public List<HashMap<String,Object>> getUserUnReadTalking(int userId,int userId1){
        List<HashMap<String,Object>> list = messageDao.getUserUnReadTalking(userId,userId1);
        if (list != null){
            messageDao.updateUserUnReadTalking(userId,userId1);
        }
        return list;
    }

    public List<HashMap<String,Object>> getSysUnreadTalking(int userId){
        return messageDao.getSysUnreadTalking(userId);
    }

    public void readMessage(int messageId){
        messageDao.readMessage(messageId);
    }

    /**
     * 持久化消息,并返回消息的主键
     * @param user1 发送者
     * @param user2 接受者
     * @param messageType 消息类型
     * @param messageContent 消息内容
     * @param messageTime 消息时间
     * @param messageState 消息状态
     * @return
     */
    public int addMessage(int user1,int user2,int messageType,String messageContent,Date messageTime,int messageState){
        Map<String,Object> map = new HashMap<String, Object>();
        map.put("user1",user1);
        map.put("user2",user2);
        map.put("messageType",messageType);
        map.put("messageContent",messageContent);
        map.put("messageTime",messageTime);
        map.put("messageState",messageState);
        if (messageDao.addMessage(map) == 1){
            System.out.println(map.get("messageId"));
            return Integer.parseInt(map.get("messageId").toString());
        }
        return 0;
    }
}

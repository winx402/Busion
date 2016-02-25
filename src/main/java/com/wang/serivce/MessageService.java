package com.wang.serivce;

import com.wang.dao.MessageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

/**
 * Created by wangwenxiang on 15-12-7.
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
}

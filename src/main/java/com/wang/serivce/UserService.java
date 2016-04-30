package com.wang.serivce;

import com.alibaba.fastjson.JSONObject;
import com.wang.dao.MessageDao;
import com.wang.dao.UserDao;
import com.wang.domain.Message;
import com.wang.domain.User;
import com.wang.util.AjaxReturn;
import com.wang.serivce.message.MessageSender;
import com.wang.serivce.message.MessageBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private MessageDao messageDao;

    public User getUserByAccount(Integer loginType,String account){
        if(loginType == 0){
            return userDao.getUserByMail(account);
        }else if (loginType == 1){
            return userDao.getUserByPhone(account);
        }
        return null;
    }

    public int checkMailorPhone(int registerType,String account){
        if(registerType == 0){
            return userDao.checkMail(account);
        }else if (registerType == 1){
            return userDao.checkPhone(account);
        }
        return -1;
    }

    public int addUser(int registerType,User user){
        if (registerType == 0){
            return userDao.addUserByMail(user);
        }else{
            return userDao.addUserByphone(user);
        }
    }

    public boolean updatePasswordByUserId(int userId,String oldPassword,String newPassword){
        return userDao.updatePasswordByUserId(userId,oldPassword,newPassword) == 1;
    }

    public List<HashMap<String,Object>> getAllFriend(int userId){
        return userDao.getAllFriend(userId);
    }

    public List<HashMap<String,Object>> getUsers(String ids){
        return userDao.getUsers(ids.split(","));
    }

    public List<HashMap<String,Integer>> getOrgUserList(int id){
        return userDao.getOrgUserList(id);
    }

    public HashMap<String,Object> getUserInfo(int user1,int user2){
        return userDao.getUserInfo(user1,user2);
    }

    public int updateUserDesc(int userId,String userDesc){
        return userDao.updateUserDesc(userId,userDesc);
    }

    public int agreeFriendRequest(int userId,int userId1){
        return userDao.agreeFriendRequest(userId,userId1);
    }

    public JSONObject addFriend(int userId1,int userId2,String userName){
        if (userDao.isFriend(userId1,userId2) > 0){
            return AjaxReturn.Data2AjaxForError("不能重复添加好友");
        }
        if (userDao.haveAddFriendMessage(userId1,userId2) > 0){
            return AjaxReturn.Data2AjaxForSuccess(null);
        }
        Message message = MessageBuilder.newAddFriendMessage(userId1,userId2,userName);
        messageDao.addMessage(message);
        MessageSender.sendMessageById(userId2,message.toJsonString());
        return AjaxReturn.Data2AjaxForSuccess(null);
    }

    public Map<String,Object> getUserAsFriend(int userId1,int userId2){
        return userDao.getUserAsFriend(userId1,userId2);
    }
}

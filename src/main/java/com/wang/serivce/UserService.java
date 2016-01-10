package com.wang.serivce;

import com.wang.dao.UserDao;
import com.wang.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@Service
public class UserService {

    @Autowired
    private UserDao userDao;

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

}

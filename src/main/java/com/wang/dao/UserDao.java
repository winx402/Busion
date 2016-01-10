package com.wang.dao;

import com.wang.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Component;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@Component
public interface UserDao {

    @Select("select * from t_user where user_mail=#{0}")
    User getUserByMail(String user_mail);

    @Select("select * from t_user where user_phone=#{0}")
    User getUserByPhone(String user_phone);

    @Select("select count(*) from t_user where user_mail=#{0}")
    int checkMail(String user_mail);

    @Select("select count(*) from t_user where user_phone=#{0}")
    int checkPhone(String user_phone);

    @Insert("insert into t_user values " +
            "(null,#{user_mail},null,#{user_name},#{user_password},null,null,null,#{user_join_time},1,10)")
    int addUserByMail(User user);

    @Insert("insert into t_user values " +
            "(null,null,#{user_phone},#{user_name},#{user_password},null,null,null,#{user_join_time},1,10)")
    int addUserByphone(User user);

    @Update("update t_user set user_password=#{2} where user_id=#{0} and user_password=#{1}")
    int updatePasswordByUserId(int userId,String oldPassword,String newPassword);
}

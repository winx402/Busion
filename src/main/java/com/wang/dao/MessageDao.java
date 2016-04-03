package com.wang.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created on 15-12-7.
 */
@Component
public interface MessageDao {

    /**
     * 获取用户的未读个人消息
     * 只获取消息的条数,相应的发送者的基本信息
     * 不获取消息的具体内容,因为用户不一定会读取
     * @param userId 接受者的用户id
     * @return 结果集
     */
    @Select("SELECT COUNT(*) AS count,u.user_id,u.user_name,user_description,u.user_photo FROM t_message m " +
            "INNER JOIN t_user u ON m.message_user1=u.user_id " +
            "WHERE m.message_user2=#{0} and m.message_type=1 AND m.message_state=10 GROUP BY m.message_user1")
    List<HashMap<String,Object>> getMyUnReadTalking(int userId);



    /**
     * 获取用户的未读取消息
     * 具体消息
     */
    @Select("select message_id,message_content,message_time from t_message where message_user1=#{1} and " +
            "message_user2=#{0} and message_type=1 and message_state=10 order by message_id asc")
    List<HashMap<String,Object>> getUserUnReadTalking(int userId,int userId1);

    /**
     * 将用户的未读消息设置为已读消息
     */
    @Update("update t_message set message_state=20 where message_user1=#{1} and " +
            "message_user2=#{0} and message_type=1 and message_state=10")
    void updateUserUnReadTalking(int userId,int userId1);

    @Select("SELECT m.message_id,m.message_content,m.message_type,m.message_time,u.user_id,u.user_name,u.user_photo FROM t_message m "
            + "LEFT JOIN t_user u ON m.message_user1=u.user_id WHERE m.message_user2=#{0} AND "
            + "m.message_type IN (2,3) AND m.message_state=10")
    List<HashMap<String,Object>> getSysUnreadTalking(int userId);

    @Update("update t_message set message_state=20 where message_id=#{0}")
    void readMessage(int messageId);

    @Insert("insert into t_message values (null,#{user1},#{user2},#{messageType},#{messageContent},#{messageTime},#{messageState})")
    @Options(useGeneratedKeys = true,keyColumn = "message_id",keyProperty = "messageId")
    int addMessage(Map<String,Object> map);
}

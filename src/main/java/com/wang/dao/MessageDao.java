package com.wang.dao;

import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

/**
 * Created by wangwenxiang on 15-12-7.
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
    @Select("SELECT COUNT(*) AS account,u.user_id,u.user_name,u.user_photo FROM t_message m " +
            "INNER JOIN t_user u ON m.message_user1=u.user_id " +
            "WHERE m.message_user2=#{0} AND m.message_state=10 GROUP BY m.message_user1")
    List<HashMap<String,Object>> getMyUnReadTalking(int userId);
}

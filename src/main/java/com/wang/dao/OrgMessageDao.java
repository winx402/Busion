package com.wang.dao;

import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@Component
public interface OrgMessageDao {

    /**
     * 获取部门消息的未读消息
     * 只获取未读消息的条数
     * @param userId 接受者id
     * @return 结果集
     */
    @Select("SELECT organization_user_organization,COUNT(*) AS count,o.organization_name,o.organization_logo FROM t_organization_user ou " +
            "INNER JOIN t_org_message m ON m.org_message_organization=ou.organization_user_organization AND" +
            " m.org_message_id>ou.user_read_line AND m.org_message_state=10 " +
            "INNER JOIN t_organization o ON o.organization_id=ou.organization_user_organization " +
            "WHERE ou.organization_user_user=#{0} GROUP BY m.org_message_organization")
    List<HashMap<String,Object>> getMyUnReadTalking(int userId);
}

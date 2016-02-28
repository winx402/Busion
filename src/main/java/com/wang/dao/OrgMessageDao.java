package com.wang.dao;

import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
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
            " m.org_message_id>ou.user_read_line AND m.org_message_type IN (1,3) AND m.org_message_state=10 " +
            "INNER JOIN t_organization o ON o.organization_id=ou.organization_user_organization " +
            "WHERE ou.organization_user_user=#{0} GROUP BY m.org_message_organization")
    List<HashMap<String,Object>> getMyUnReadTalking(int userId);

    @Select("SELECT org_message_id,org_message_user,org_message_content,org_message_date " +
            "FROM t_org_message WHERE org_message_organization=#{1} AND org_message_id>" +
            "(SELECT user_read_line FROM t_organization_user WHERE organization_user_organization=#{1} AND " +
            "organization_user_user=#{0}) AND org_message_type IN (1,3) AND org_message_state=10 GROUP BY org_message_id")
    List<HashMap<String,Object>> getOrgUnReadTalking(int userId,int orgId);

    @Update("update t_organization_user set user_read_line=#{2} where organization_user_organization=#{1} and organization_user_user=#{0}")
    void updateOrgUnReadTalking(int userId,int orgId,int maxLine);
}

package com.wang.dao;

import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@Component
public interface OrganizationDao {

    @Select("select organization_id,organization_name,organization_logo,organization_parent,organization_floor" +
            " from t_organization where organization_state=10")
    ArrayList<HashMap<String,Object>> getAllOrganization();

    @Select("select t_organization_user.organization_user_organization,organization_user_manage,organization_name,organization_logo from t_organization_user " +
            "inner join t_organization on t_organization_user.organization_user_organization=t_organization.organization_id and t_organization.organization_state=10 " +
            " where organization_user_user=#{0}")
    List<HashMap<String,Object>> getMyOrganization(int userId);

    @Select("select organization_user_organization from t_organization_user INNER JOIN t_organization ON t_organization_user.organization_user_organization=t_organization.organization_id\n" +
            " AND t_organization.organization_state=10 where organization_user_user=#{0} and organization_state=10")
    List<Integer> getMyOrganizationId(int userId);
}

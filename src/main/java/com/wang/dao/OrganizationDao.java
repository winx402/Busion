package com.wang.dao;

import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@Component
public interface OrganizationDao {

    @Select("select organization_id,organization_name,organization_logo,organization_parent,organization_floor" +
            " from t_organization where organization_state=10")
    List<HashMap<String,Object>> getAllOrganization();
}

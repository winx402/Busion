package com.wang.serivce;

import com.wang.dao.OrganizationDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@Service
public class OrganizationService {

    @Autowired
    private OrganizationDao organizationDao;


    /**
     * 获取所有的正常状态组织，不包括组织简介和组织公告
     * @return
     */
    public List<HashMap<String,Object>> getAllOrganization(){
        return organizationDao.getAllOrganization();
    }
}

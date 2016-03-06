package com.wang.serivce;

import com.wang.dao.OrganizationDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public ArrayList<HashMap<String,Object>> getAllOrganization(){
        return organizationDao.getAllOrganization();
    }

    /**
     * 获取我的组织信息
     * @param userId
     * @return
     */
    public List<HashMap<String,Object>> getMyOrganization(int userId){
        return organizationDao.getMyOrganization(userId);
    }

    /**
     * 获取我的组织信息
     * @param userId
     * @return
     */
    public List<Integer> getMyOrganizationId(int userId){
        return organizationDao.getMyOrganizationId(userId);
    }
}

package com.wang.domain;

import com.sun.tools.internal.xjc.reader.xmlschema.bindinfo.BIConversion;
import com.wang.serivce.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * Created by wangwenxiang on 16/2/19.
 */
@Component
public class AllOrganization {
    private static ArrayList<HashMap<String,Object>> allOrg=null; //存放所有的组织数据
    private static ReadWriteLock lock = new ReentrantReadWriteLock(); //读写锁

    @Autowired
    private OrganizationService organizationService;

    /**
     * 获取所有的组织信息
     * @return
     */
    public ArrayList<HashMap<String,Object>> getAllOrg(){
        try {
            lock.readLock().lock();
            return allOrg;
        }finally {
            lock.readLock().unlock();
        }
    }

    /**
     * 重新加载所有的组织信息
     */
    public ArrayList<HashMap<String,Object>> setAllOrg(){
        try {
            lock.writeLock().lock();
            allOrg = organizationService.getAllOrganization();
            return allOrg;
        }finally {
            lock.writeLock().unlock();
        }
    }

    /**
     * 获取所有的组织信息
     * @return
     */
    public List<String> parserOrgId(List<Integer> orgIds){
        try {
            if (allOrg == null){
                setAllOrg();
            }
            lock.readLock().lock();
            List<String> orgPath = new ArrayList<String>();
            for (Integer i : orgIds){
                StringBuilder sb = new StringBuilder();
                Integer nowFind = i;
                HashMap<String,Object> h;
                do {
                    h = getOrgById(nowFind);
                    if (h == null){
                        break;
                    }
                    sb.insert(0,"/"+h.get("organization_name"));
                    nowFind = Integer.parseInt(h.get("organization_parent").toString());
                }while (nowFind != 1);
                orgPath.add(sb.toString());
            }
            return orgPath;
        }finally {
            lock.readLock().unlock();
        }
    }

    public HashMap<String,Object> getOrgById(Integer orgId){
        for (HashMap<String,Object> h : allOrg){
            if (orgId == Integer.parseInt(h.get("organization_id").toString())){
                return h;
            }
        }
        return null;
    }
}

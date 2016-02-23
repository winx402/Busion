package com.wang.domain;

import com.sun.tools.internal.xjc.reader.xmlschema.bindinfo.BIConversion;
import com.wang.serivce.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
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
}

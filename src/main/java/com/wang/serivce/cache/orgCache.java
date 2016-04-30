package com.wang.serivce.cache;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.wang.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Created on 4/30/16.
 */
@Service
public class orgCache {

    @Autowired
    private static UserDao userDao;

    private static final LoadingCache<Integer,Set<Integer>> orgUsers = CacheBuilder.newBuilder().build(
            new CacheLoader<Integer, Set<Integer>>() {
                @Override
                public Set<Integer> load(Integer s) throws Exception {
                    return userDao.getOrgUserSet(s);
                }
            }
    );
}

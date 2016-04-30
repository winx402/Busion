package com.wang.serivce.cache;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.wang.dao.OrgMessageDao;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Created on 4/30/16.
 */
@Service
public class OrgCache {

    private static OrgMessageDao orgMessageDao;

    public static final LoadingCache<Integer,Set<Integer>> orgUsers = CacheBuilder.newBuilder().build(
            new CacheLoader<Integer, Set<Integer>>() {
                @Override
                public Set<Integer> load(Integer s) throws Exception {
                    return orgMessageDao.getOrgUserSet(s);
                }
            }
    );

    public void setOrgMessageDao(OrgMessageDao orgMessageDao) {
        OrgCache.orgMessageDao = orgMessageDao;
    }
}

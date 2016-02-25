package com.wang.serivce;

import com.wang.dao.OrgMessageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.resource.spi.AuthenticationMechanism;
import java.util.HashMap;
import java.util.List;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@Service
public class OrgMessageService {
    @Autowired
    private OrgMessageDao orgMessageDao;

    /**
     * 获取部门消息的未读消息
     * 只获取未读消息的条数
     * @param userId 接受者id
     * @return 结果集
     */
    public List<HashMap<String,Object>> getMyUnReadTalking(int userId){
        return orgMessageDao.getMyUnReadTalking(userId);
    }
}

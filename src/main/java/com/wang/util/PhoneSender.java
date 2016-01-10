package com.wang.util;

import com.taobao.api.ApiException;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AlibabaAliqinFcSmsNumSendRequest;
import com.taobao.api.response.AlibabaAliqinFcSmsNumSendResponse;
import com.wang.model.PhoneMessage;

/**
 * Created by wangwenxiang on 15-12-25.
 */
public class PhoneSender {
    public static int send(PhoneMessage message){
        TaobaoClient client = new DefaultTaobaoClient("http://gw.api.taobao.com/router/rest",
                "23289506", "b1cf469db9780af6e9af4a9e35388076");
        AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
        req.setSmsType("normal");
        req.setSmsFreeSignName(message.getSmsFreeSignName());
        req.setSmsParamString("{\"code\":\""+message.getCode()+"\",\"product\":\"custom\"}");
        req.setRecNum(message.getPhoneNumber());
        req.setSmsTemplateCode("SMS_3680272");
        AlibabaAliqinFcSmsNumSendResponse rsp;
        try{
           rsp = client.execute(req);
        } catch (ApiException ae){
            return -1;
        }
        return 1;
    }

    public static void sys(String account){
        System.out.print(account);
    }

    public static void main(String[] arg0){
        PhoneMessage message = new PhoneMessage("18623657744","1234","注册验证");
        send(message);
    }
}

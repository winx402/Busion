package com.wang.websocket;

import javax.servlet.http.HttpSession;
import javax.websocket.HandshakeResponse;
import javax.websocket.server.HandshakeRequest;
import javax.websocket.server.ServerEndpointConfig;

/**
 * Created by wangwenxiang on 15-12-9.
 */
public class GetHttpSessionConfigurator extends ServerEndpointConfig.Configurator{
    public void modifyHandshake(ServerEndpointConfig config,
                                HandshakeRequest request,
                                HandshakeResponse response)
    {
        HttpSession httpSession = (HttpSession)request.getHttpSession();
        if(httpSession != null){
            config.getUserProperties().put(HttpSession.class.getName(),httpSession);
        }

    }
}

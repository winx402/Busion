/**
 * Created by wangwenxiang on 16-1-8.
 */
require.config({
    baseUrl : 'js/lib',
    shim: {
       'jquery.min': ['jquery']
    },
    paths: {
        jquery: 'jquery.min',
        controller: '../controller',
        data: '../data',
        network: '../network',
        view: '../view'
    }
});

require(["jquery.min","bootstrap.min","controller/talking","controller/friend",
    "controller/organization","controller/setting","controller/windows"]);

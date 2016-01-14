/**
 * Created by wangwenxiang on 16-1-8.
 */
require.config({
    baseUrl : 'js/lib',
    shim: {
        'bootstrap': {
            deps: ['jquery']
        }
    },
    paths: {
        jquery: 'jquery.min',
        controller: '../controller',
        data: '../data',
        network: '../network',
        view: '../view',
        util:'../util'
    }
});

require(["controller/base","controller/talking","controller/friend",
    "controller/organization","controller/setting","controller/windows"]);

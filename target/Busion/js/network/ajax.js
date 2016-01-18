/**
 * Created by wangwenxiang on 16-1-11.
 */

define(['jquery'],function($){
    function ajax(url,params,successBack,errorBack) {
        $.ajax({
            type : "POST",
            url: url,
            data : params,
            success: successBack,
            error: errorBack
        });
    }
    return{
        ajaxFunction : ajax
    }
});
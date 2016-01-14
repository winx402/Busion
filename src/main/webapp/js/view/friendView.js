/**
 * Created by wangwenxiang on 16-1-11.
 */

define(['jquery'],function($){

    var state = 1;

    function a(msg){
        alert(msg);
    }

    return{
        st: state,
        aaa : a
    }
})
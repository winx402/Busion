/**
 * Created by wangwenxiang on 16-1-13.
 */
/**
 * Created by wangwenxiang on 16-1-11.
 */
define(['network/ajax'],function(ajax){
        /**
         * 所有回话面板数据
         */
        var talkingArray = [];

    var getAll = function(){
        return talkingArray;
    }

    return{
        getAll:getAll
    }
});
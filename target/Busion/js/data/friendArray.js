/**
 * Created by wangwenxiang on 16-1-13.
 */
/**
 * Created by wangwenxiang on 16-1-11.
 */
define(['network/ajax'],function(ajax){
    var params={
        /**
         * 好友面板状态
         * 0-未初始化，无数据
         * 1-正在获取数据
         * 2-数据已经获取，正在绘制面板
         * 3-绘制完成
         */
        friendState: 0,
        /**
         * 所有好友数据
         */
        friendArray: []
    }

    /**
     * 当friendState不等于3时，初始化好友面板
     *
     */
    function initFriend(){
        if (params.friendState == 0){
            getData();
        }
    }

    function getData(){
        ajax.ajaxFunction('user/getAllFriend',null,getDataSuccess,getDataError)
        params.friendState = 1;
    }

    function getDataSuccess(data){

    }

    function getDataError(data){

    }

    return{
        params: params,
        initFriend: initFriend
    }
});
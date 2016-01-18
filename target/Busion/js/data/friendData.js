/**
 * Created by wangwenxiang on 16-1-13.
 */
/**
 * Created by wangwenxiang on 16-1-11.
 */
define(['network/ajax','data/array/friendArray','view/friendView','view/menu_bottom_base'],
    function(ajax,friendArray,friendView,baseView){
        var params={
            /**
             * 好友面板状态
             * 0-未初始化，无数据
             * 1-正在获取数据
             * 2-数据已经获取，正在绘制面板
             * 3-绘制完成
             */
            friendState: 0,
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
            params.friendState = 1;
            ajax.ajaxFunction('user/getAllFriend',null,getDataSuccess,getError)
        }

        function getDataSuccess(data){
            var r = eval(data);
            if(r.code == 1){
                $.each(r.data,function(i,item){
                    friendArray.addFriend(item);
                });
                params.friendState = 2;
                friendView.initFriendPanel(friendArray.getAll());
                params.friendState = 3;
                baseView.changePanel(1);
            }else{
                alert(r.msg);
            }
        }

        function getError(data){
            alert("出错了");
        }

        return{
            params: params,
            initFriend: initFriend
        }
});
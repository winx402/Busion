/**
 * Created by wangwenxiang on 16-1-13.
 */
/**
 * Created by wangwenxiang on 16-1-11.
 */
define(['network/ajax','data/array/friendArray','view/friendView','view/menu_bottom_base','view/baseView'],
    function(ajax,friendArray,friendView,baseView,base){
            /**
             * 好友面板状态
             * 0-未初始化，无数据
             * 1-正在获取数据
             * 2-数据已经获取，正在绘制面板
             * 3-绘制完成
             */
           window.friendState = 0;

        /**
         * 当friendState不等于3时，初始化好友面板
         *
         */
        function initFriend(){
            if (window.friendState == 0){
                getData();
            }
        }

        function getData(){
            window.friendState = 1;
            ajax.ajaxFunction('user/getAllFriend',null,getDataSuccess,getError)
        }

        function getDataSuccess(data){
            var r = eval(data);
            if(r.code == 1){
                $.each(r.data,function(i,item){
                    friendArray.addFriend(item);
                });
                window.friendState = 2;
                friendView.initFriendPanel(friendArray.getAll());
                window.friendState = 3;
                baseView.changePanel(1);
            }else{
                window.friendState = 0;
                base.setErrorTimer(r.msg);
            }
        }

        function getError(data){
            window.friendState = 0;
            base.setErrorTimer("获取好友信息出错");
        }

        var getUserAndAddFriend = function (userId) {
            var user = friendArray.getUserById(userId);
            if (user == null){
                var param = {
                    userId : userId
                };
                ajax.ajaxFunction('user/getUserAsFriend',param,getUserAndAddFriendSuccess,getError)
            }
        };

        function getUserAndAddFriendSuccess(data){
            var r = eval(data);
            if(r.code == 1 && window.friendState!=0){
                friendArray.addFriend(r.data);
                friendView.addFriend(r.data);
            }else{
                base.setErrorTimer(r.msg);
            }
        }

        return{
            initFriend: initFriend,
            getUserAndAddFriend : getUserAndAddFriend,
            getUserAndAddFriendSuccess : getUserAndAddFriendSuccess
        }
});
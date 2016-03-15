/**
 * Created by wangwenxiang on 16-1-14.
 */

define(['network/ajax','data/array/talkingArray','data/array/friendArray','data/array/userArray','require','view/baseView',
        'data/array/organizationArray','view/organizationView','view/modalView','data/myData'],
    function(ajax,talkingArray,friendArray,userArray,require,baseView,organizationArray,organizationView,modalView,myData){

    /**
     * 通过id获取用户的基本信息
     * 1-从talkingArray中查找
     * 2-从friendArray中查找
     * 3-从userArray中查找
     * 4-都没有的话ajax获取,并添加进userArray
     * @param id
     */
    var getUser = function (id) {
        var user = talkingArray.getUserById(id);
        if(user != null){
            return user;
        }
        user = friendArray.getUserById(id);
        if(user != null){
            return user;
        }
        user = userArray.getUserById(id);
        return user;
    }

        /**
         * ajax获取用户的基本信息
         * @param ids 用户id的集合字符串,用户逗号隔开
         */
        var ajaxGetUser = function(ids){
            var param = {
                ids : ids
            }
            ajax.ajaxFunction('user/getUsers',param,getUserSuccess,getUserError);
        }

        function getUserSuccess (data){
            var r = eval(data);
            if(r.code == 1){
                $.each(r.data,function(i,item){
                    userArray.addUser(item);
                    require("view/windowView").addUnGetUserInfo(item);
                });
            }else{
                baseView.setErrorTimer("获取用户数据失败");
            }
        }

        /**
         * 获取用户列表
         * @param orgId
         */
        var getOrgUserList = function(org){
            org.isLoadUser = 2;
            var params = {
                id : org.id
            }
            ajax.ajaxFunction('user/getOrgUserList',params,getOrgUserListSuccess,getUserError);
        }

        /**
         * 获取所有组织的用户列表
         * @param orgId
         */
        var getAllOrgUserList = function(id){
            var params = {
                id : id
            }
            ajax.ajaxFunction('user/getOrgUserList',params,getAllOrgUserListSuccess,getUserError);
        }

        function getAllOrgUserListSuccess(data){
            var r = eval(data);
            if(r.code == 1){
                var ordIds = [];
                var userList = [];
                var noUser = [];
                $.each(r.data.rows,function(i,item){
                    var id = item.organization_user_user;
                    ordIds.push(id);
                    var user = getUser(id);
                    if(user == null){
                        user = {
                            user_id : id,
                            user_name : "null",
                            user_photo : null,
                            load : false
                        }
                        noUser.push(id);
                    }
                    userList.push(user);
                });
                organizationArray.setAllOrgUserList(r.data.orgId,ordIds); //将用户数据添加到
                organizationView.addOrgUserList(r.data.orgId,userList);
                if (noUser.length != 0){
                    ajaxGetUser(noUser.join(","));
                }
            }else{
                baseView.setErrorTimer("获取用户数据失败");
            }
        }

        function getOrgUserListSuccess(data){
            var r = eval(data);
            if(r.code == 1){
                require("view/windowView").addOrgUserList(r.data.orgId,r.data.rows);
            }else{
                baseView.setErrorTimer("获取用户数据失败");
            }
        }

        function getUserError (data){
            baseView.setErrorTimer("获取用户数据失败");
        }

        /**
         * 获取用户详细信息
         * @param orgId
         */
        var getUserInfo = function(user_id){
            var params = {
                userId : user_id
            }
            ajax.ajaxFunction('user/getUserInfo',params,getUserInfoSuccess,getUserError);
        }

        function getUserInfoSuccess(data){
            var r = eval(data);
            if(r.code == 1){
                modalView.addFriendInfo(r.data);
            }else{
                baseView.setErrorTimer("获取用户数据失败");
            }
        }

        /**
         * 获取用户详细信息
         * @param orgId
         */
        var updateUserDesc = function(params){
            ajax.ajaxFunction('user/updateUserDesc',params,updateUserDescSuccess,updateUserDescError);
        }

        function updateUserDescSuccess(data){
            var r = eval(data);
            if(r.code == 1){
                baseView.setErrorTimer("个人资料更新成功");
                myData.updateUserDescInfo(r.data);
            }else{
                baseView.setErrorTimer(r.msg);
            }
        }

        function updateUserDescError(data){
            baseView.setErrorTimer("系统错误");
        }

    return{
        getUser: getUser,
        ajaxGetUser : ajaxGetUser,
        getOrgUserList : getOrgUserList,
        getAllOrgUserList : getAllOrgUserList,
        getUserInfo : getUserInfo,
        updateUserDesc : updateUserDesc
    }
});
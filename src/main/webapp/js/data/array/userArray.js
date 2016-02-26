/**
 * Created by wangwenxiang on 16-1-13.
 */
define(['jquery'],function($){
    /**
     * 所有好友数据
     */
    var userArray = [];

    var addUser = function(item){
        var user = {
            user_id: item.user_id,
            user_name: item.user_name,
            user_photo: item.user_photo,
        }
        userArray.push(user)
    }

    var getUserById = function(id){
        var user = null;
        $.each(userArray,function(i,item){
            if(item.user_id == id){
                user = item;
                return;
            }
        })
        return user;
    }

    return{
        addUser: addUser,
        getUserById: getUserById
    }
});
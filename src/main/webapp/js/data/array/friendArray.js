/**
 * Created by wangwenxiang on 16-1-13.
 */
define(['jquery'],function($){
    /**
     * 所有好友数据
     */
    var friendArray = [];

    /**
     * 添加一个一个好友信息
     * @param item
     */
    var addFriend = function(item){
        var user = {
            user_id: item.user_id,
            user_desc: item.user_description,
            user_name: item.user_name,
            friend_mark: item.friend_mark,
            user_photo: item.user_photo,
            user_sex: item.user_sex,
            user_message_attention: item.user_message_attention
        }
        friendArray.push(user)
    }

    var getAll = function(){
        return friendArray;
    }

    /**
     * 通过id获取用户基本信息
     * 返回一个基本信息对象
     * @param id
     * @returns {*}
     */
    var getUserById = function(id){
        var user = null;
        $.each(friendArray,function(i,item){
            if(item.user_id == id){
                user = item;
                return;
            }
        })
        return user;
    }

    return{
        addFriend: addFriend,
        getAll: getAll,
        getUserById : getUserById
    }
});
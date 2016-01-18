/**
 * Created by wangwenxiang on 16-1-13.
 */
/**
 * Created by wangwenxiang on 16-1-11.
 */
define(['jquery','network/ajax'],function($,ajax){
    /**
     * 所有好友数据
     */
    var friendArray = [];

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

    return{
        addFriend: addFriend,
        getAll: getAll
    }
});
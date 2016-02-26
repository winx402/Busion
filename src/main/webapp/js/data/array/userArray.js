/**
 * Created by wangwenxiang on 16-1-13.
 */
define(['jquery'],function($){
    /**
     * 用户数据
     * 用户数据一般放在talking和friend的Array中
     * 但是还有一些用户的数据是不在上面两个地方的,比如群成员
     * 为了避免每次用时都ajax重新获取,将临时用户的数据都放在这里
     * 只存放用户id,用户名,头像
     */
    var userArray = [];

    /**
     * 添加一条临时用户数据
     * @param item
     */
    var addUser = function(item){
        var user = {
            user_id: item.user_id,
            user_name: item.user_name,
            user_photo: item.user_photo,
        }
        userArray.push(user)
    }

    /**
     * 通过id获取一个用户的基本数据
     * 没有的话返回null
     * @param id
     * @returns {*}
     */
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
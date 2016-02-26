/**
 * Created by wangwenxiang on 16-1-14.
 */

define(['network/ajax','data/array/talkingArray','data/array/friendArray','data/array/userArray'],
    function(ajax,talkingArray,friendArray,userArray){

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

    return{
        getUser: getUser
    }
});
/**
 * Created by wangwenxiang on 16-1-11.
 */
define(['network/ajax'],function(ajax){
    /**
     * 所有会话面板数据
     */
    var personalTalkingArray = []; //个人talking数据
    var orgTalkingArray = []; //组织talking数据

    var getAllPersonalTalking = function(){
        return personalTalkingArray;
    }

    var getAllOrgTalking = function(){
        return orgTalkingArray;
    }

    /**
     * 添加一条用户的talking
     * @param item
     */
    var addPersonalTalking = function(item){
        var talking = {
            user_id: item.user_id,
            name: item.user_name,
            user_photo: item.user_photo,
            user_description: item.user_description,
            count: item.count, //未读消息条数
            unread_message: []
        }
        personalTalkingArray.push(talking);
    }

    /**
     * 添加一条组织的talking
     * @param item
     */
    var addOrgTalking = function(item){
        var talking = {
            organization_id: item.organization_user_organization,
            name: item.organization_name,
            organization_logo: item.organization_logo,
            count: item.count, //未读消息条数
            unread_message: []
        }
        orgTalkingArray.push(talking);
    }

    /**
     * 通过type和id获取talking
     * @param type
     * @param id
     * @returns {*}
     */
    var getTalkingByTypeId = function(type,id){
        var talking = null;
        if (type == "org"){
            $.each(orgTalkingArray,function(i,item){
                if(item.organization_id == id){
                    talking = item;
                    return;
                }
            })
        }else {
            $.each(personalTalkingArray,function(i,item){
                if(item.user_id == id){
                    talking = item;
                    return;
                }
            })
        }
        return talking;
    }

    /**
     * 通过id获取用户基本信息
     * 返回一个基本信息对象
     * @param id
     * @returns {*}
     */
    var getUserById = function(id){
        var user = null;
        $.each(personalTalkingArray,function(i,item){
            if(item.user_id == id){
                var param = {
                    user_id : item.user_id,
                    user_name : item.name,
                    user_photo : item.user_photo
                }
                user = param;
                return;
            }
        })
        return user;
    }

    /**
     * 删除用户的未读消息条数
     * @param id
     */
    var removeCount = function (type,id) {
        if (type == "user"){
            $.each(personalTalkingArray,function(i,item){
                if(item.user_id == id){
                    item.count = 0;
                    return;
                }
            })
        }else if(type == "org"){
            $.each(orgTalkingArray,function(i,item){
                if(item.organization_id == id){
                    item.count = 0;
                    return;
                }
            })
        }
    }

    return{
        getAllPersonalTalking:getAllPersonalTalking,
        getAllOrgTalking : getAllOrgTalking,
        addPersonalTalking : addPersonalTalking,
        addOrgTalking : addOrgTalking,
        getTalkingByTypeId : getTalkingByTypeId,
        getUserById : getUserById,
        removeCount : removeCount
    }
});
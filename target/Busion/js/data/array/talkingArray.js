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

    var addPersonalTalking = function(item){
        var talking = {
            user_id: item.user_id,
            user_name: item.user_name,
            user_photo: item.user_photo,
            account: item.account //未读消息条数
        }
        personalTalkingArray.push(talking);
    }

    var addOrgTalking = function(item){
        var talking = {
            organization_id: item.organization_user_organization,
            organization_name: item.organization_name,
            organization_logo: item.organization_logo,
            account: item.account //未读消息条数
        }
        orgTalkingArray.push(talking);
    }

    return{
        getAllPersonalTalking:getAllPersonalTalking,
        getAllOrgTalking : getAllOrgTalking,
        addPersonalTalking : addPersonalTalking,
        addOrgTalking : addOrgTalking
    }
});
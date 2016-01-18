/**
 * Created by wangwenxiang on 16-1-14.
 */

define(['network/ajax','view/baseView'],function(ajax,baseView){

    var myInfo={
        infoState: 0,
        user_id: 0,
        user_mail: null,
        user_phone: null,
        user_name: null,
        user_desc: null,
        user_photo: null,
        user_birthday: null,
        user_sex: null,
        user_message_attention: null
    }

    var initMyInfo = function(){
        myInfo.infoState = 1;
        ajax.ajaxFunction("user/getMyInfo",null,initMyInfoSuccess,initMyInfoError);
    }

    var initMyInfoSuccess = function(data){
        var r = eval(data);
        if(r.code == 1){
            var user = r.data;
            myInfo.infoState = 2;
            myInfo.user_id = user.user_id;
            myInfo.user_mail = user.user_mail;
            myInfo.user_phone = user.user_photo;
            myInfo.user_name = user.user_name;
            myInfo.user_desc = user.user_description;
            myInfo.user_photo = user.user_photo;
            myInfo.user_sex = user.user_sex;
            myInfo.user_message_attention = user.user_message_attention;
            baseView.initMainPanel(myInfo);
        }else {
            baseView.showErrorMsg(r.msg);
        }
    }

    var initMyInfoError = function(){
        baseView.showErrorMsg("系统错误");
    }

    return{
        initMyInfo: initMyInfo
    }
});
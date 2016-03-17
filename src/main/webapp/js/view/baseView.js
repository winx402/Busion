/**
 * Created by wangwenxiang on 16-1-11.
 */

define(['jquery'],function($){

    /**
     * 全局计时器
     * @type {null}
     */
    var timer = null;

    /**
     * 设置并显示错误信息
     * @param msg
     */
    var showErrorMsg = function(msg){
        $(".error-msg").text(msg);
        $(".error-msg").animate({'margin-top':'20px'},300);
    }

    /**
     * 隐藏错误信息
     */
    var hideErrorMsg = function(){
        $(".error-msg").animate({'margin-top':'-50px'},300);
    }

    /**
     * 修改错误信息并定时恢复
     * @param errorMsg
     */
    var setErrorTimer = function(errorMsg){
        clearInterval(timer);
        showErrorMsg(errorMsg);
        timer = setTimeout(hideErrorMsg,3000);
    }

    /**
     * 初始化主面板
     * @param msg
     */
    var initMainPanel = function(myInfo){
        if(myInfo.user_photo != null && myInfo.user_photo != ""){
            $(".my-info img").attr('src',myInfo.user_photo);
        }
        $(".my-name").text(myInfo.user_name);
        if(myInfo.user_desc != null && myInfo.user_desc != null){
            $(".my-desc").text(myInfo.user_desc);
        }
        $(".body-loading").css("display","none");
        $(".left-base").css("display","block");
        $(".my-info").animate({'margin': '15px 0px 80px 20px'},1000);
    }

    var updateMyDesc = function(userDesc){
        $(".my-desc").text(userDesc);
    }

    return{
        showErrorMsg: showErrorMsg,
        setErrorTimer: setErrorTimer,
        initMainPanel: initMainPanel,
        updateMyDesc : updateMyDesc
    }
})
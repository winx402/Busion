/**
 * Created by wangwenxiang on 16-1-11.
 */

define(['jquery'],function($){
    /**
     * 初始化talking面板
     * 初始化时,所有数据从后台获取,都是未读取的聊天记录
     * @param personalTalking
     * @param orgTalking
     */
    var initTalkingPanel = function(personalTalking,orgTalking){
        $(".my-talking").children("li").remove();
        var html = "";
        $.each(personalTalking,function(i,item){
            html = html+"<li class='talking-li' _type='user' _id='"+item.user_id+"' id='user_"+item.user_id+"'>";
            if(item.user_photo == null || item.user_photo == ""){
                html = html+"<img src='../img/photo.jpg'>";
            }else{
                html = html+"<img src='"+item.user_photo+"'>";
            }
            html = html+"<div class='name-desc'><div class='talking-name'>"+item.name+"</div>";
            if(item.user_description == null || item.user_description == ""){
                html = html+"<div class='talking-desc'>该用户没有说明</div>";
            }else{
                html = html+"<div class='talking-desc'>"+item.user_description+"</div>";
            }
            html = html+"</div><span class='unread-count'>"+item.count+"</span></li>"
        })
        $.each(orgTalking,function(i,item){
            html = html+"<li class='talking-li' _type='org' _id='"+item.organization_id+"' id='org_"+item.organization_id+"'>";
            html = html+"<i class='fa "+item.organization_logo+"'></i><div class='name-desc'>";
            html = html+"<div class='talking-content'>"+item.name+"</div></div>";
            html = html+"<span class='unread-count'>"+item.count+"</span></li>";
        })
        $(".my-talking").append(html);
    }

    /**
     * 将talking面板的未读消息取消掉
     * @param type
     * @param id
     */
    var removeUnreadCount = function (type,id) {
        $("#"+type+"_"+id).find(".unread-count").text("");
    }

    return{
        initTalkingPanel: initTalkingPanel,
        removeUnreadCount : removeUnreadCount
    }
})
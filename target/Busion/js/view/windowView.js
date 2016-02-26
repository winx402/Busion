/**
 * Created by wangwenxiang on 16-1-11.
 * 窗口右边的显示面板,聊天,信息
 */

define(['jquery','data/userData'],function($,userData){

    /**
     *
     * @param type
     * @param id
     */
    var showWindow = function(type,id,name){
        var w = $("#window-"+type+"-"+id);
        if(w.length==0){
            w = initWindow(type,id,name);
        }
        $(".right-base").removeClass("right-selected");
        w.addClass("right-selected");
        return w;
    }

    function initWindow(type,id,name){
        var html = "<div class='right-base' id='window-"+type+"-"+id+"'>";
        html = html+"<div class='right-top'>"+name+"</div><div class='right-body'><div class='talking-body'>";
        html = html+" </div>";
        if(type == "org"){
            html = html+"<div class='something-list'><div>用户列表</div><div>共享文件</div>";
            html = html+"<ul class='user-list list-selected'></ul>";
            html = html+"<ul class='file-list'></ul></div>";
        }else{
            html = html+"<div class='something-list'><div>文件列表</div>";
            html = html+"<ul class='file-list list-selected'></ul></div>";
        }
        html = html+"</div><div>";
        html = html+"<div class='right-send'>发送</div>";
        html = html+"<div class='right-box'>";
        html = html+"<i class='fa fa-smile-o'></i>";
        html = html+"<i class='fa fa-file-image-o'></i>";
        html = html+"<i class='fa fa-file-o'></i>";
        html = html+"</div><textarea class='right-input' type='text' placeholder='请输入...'></textarea>";
        html = html+"</div></div>";
        $(".error-msg").before(html);
        return $("#window-"+type+"-"+id);
    }

    /**
     * 给聊天面板添加一个系统消息
     * @param w 面板
     * @param message 消息
     */
    var readingMessage = function(w,message){
        w.find(".talking-body").append("<li class='notice'>"+message+"</li>");
    }

    var addUserUnreadTalking = function (data) {
        var id = data.userId;
        var user = userData.getUser(id); //获取用户的基本资料,id,名字,头像
        var rows = data.rows;
        var html = "";
        if(user == null){
            $.each(rows,function(i,item){
                html = html+"<li class='li-left' id='unget-user-"+id+"'>";
                html = html + "<img src='../img/photo.jpg' alt='头像' class='photo'>";
                html = html + "<div class='chat'>"+item.message_content+"</div></li>"
            })
        }else {
            var photo = user.user_photo;
            if(photo == null || photo == "")
                photo = "../img/photo.jpg";
            $.each(rows,function(i,item){
                html = html+"<li class='li-left'>";
                html = html + "<img src='"+photo+"' alt='头像' class='photo'>";
                html = html + "<div class='chat'>"+item.message_content+"</div></li>"
            })
        }
        $("#window-user-"+id).find(".talking-body").append(html);

    }

    return{
        showWindow : showWindow,
        readingMessage : readingMessage,
        addUserUnreadTalking : addUserUnreadTalking
    }
})
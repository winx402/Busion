/**
 * Created by wangwenxiang on 16-1-11.
 * 窗口右边的显示面板,聊天,信息
 */

define(['jquery','data/userData'],function($,userData){

    /**
     * 通过type,id,name将聊天面板展示出来
     * 如果面板已经存在,则设置为显示状态
     * 如果面板不存在,则通过initWindow来创建一个信息的面板
     * @param type 面板类型,用户\组织,不同的类型界面不一样
     * @param id 相应类型的编号
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

    /**
     * 创建一个聊天面板,并返回
     * @param type
     * @param id
     * @param name
     * @returns {*|jQuery|HTMLElement}
     */
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

    /**
     * 将用户的未读消息绘制到聊天窗口上
     * 获取用户的基本信息,id,name,photo
     * 如果本地没有基本信息,则先用户默认信息替代并标示
     * 再ajax获取基本数据,通过标示将数据替换上去
     * @param data
     */
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
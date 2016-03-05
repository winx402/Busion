/**
 * Created by wangwenxiang on 16-1-11.
 * 窗口右边的显示面板,聊天,信息
 */

define(['jquery','data/userData'],function($,userData){
    /**
     * 存放每一个实例化窗口的基本信息
     * showTime : 聊天面板最后一次显示的时间
     * lastTime : 上一条消息的时间
     * @type {Array}
     */
    var windows = [];
    /**
     * 标示目前正在显示的聊天面板的type和id
     * @type {null}
     */
    window.TypeAndId = null;
    /**
     * 通过type,id,name将聊天面板展示出来
     * 如果面板已经存在,则设置为显示状态
     * 如果面板不存在,则通过initWindow来创建一个信息的面板
     * @param type 面板类型,用户\组织,不同的类型界面不一样
     * @param id 相应类型的编号
     */
    var showWindow = function(type,id,name){
        if(window.TypeAndId == (type+id)){
            return;
        }
        var w = $("#window-"+type+"-"+id);
        if(w.length==0){
            w = initWindow(type,id,name);
        }
        $(".right-base").removeClass("right-selected");
        w.addClass("right-selected");
        window.TypeAndId = type+id;
        return w;
    }

    /**
     * 创建一个聊天面板,然后添加进入windows,并返回这个窗口
     * @param type
     * @param id
     * @param name
     * @returns {*|jQuery|HTMLElement}
     */
    function initWindow(type,id,name){
        var w = null;
        var html = "<div class='right-base' id='window-"+type+"-"+id+"'>";
        html = html+"<div class='right-top'>"+name+"</div><div class='right-body'><div class='talking-body'>";
        //html = html+"<li class='li-right'><img src='../img/photo.jpg' alt='头像' class='photo'><div class='chat'>hello</div></li>";
        html = html+" </div>";
        if(type == "org"){
            w = {  //新建一个窗口的基本信息,然后添加进入windows数组
                type : "org",
                id : id,
                showTime : null,
                lastTime : null,
                isLoadUser : 1,
                userList : [],
                isLoadFile : 1,
                fileList : []
            }
            html = html+"<div class='something-list'><div>用户列表</div><div>共享文件</div>";
            html = html+"<ul class='user-list list-selected'></ul>";
            html = html+"<ul class='file-list'></ul></div>";
        }else if(type == "user"){
            w = {  //新建一个窗口的基本信息,然后添加进入windows数组
                type : "user",
                id : id,
                showTime : null,
                lastTime : null,
                isLoadFile : 1,
                fileList : []
            }
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
        windows.push(w);
        if(type == "org"){
            userData.getOrgUserList(w);
        }
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
                html = html+"<li class='li-left'>";
                html = html + "<img src='../img/photo.jpg' alt='头像' class='photo unget-userPhoto-"+id+"'>";
                html = html + "<div class='chat'>"+item.message_content+"</div></li>"
            })
        }else {
            var photo = user.user_photo;
            if(photo == null || photo == "")
                photo = "img/photo.jpg";
            $.each(rows,function(i,item){
                html = html+"<li class='li-left'>";
                html = html + "<img src='"+photo+"' alt='头像' class='photo'>";
                html = html + "<div class='chat'>"+item.message_content+"</div></li>"
            })
        }
        $("#window-user-"+id).find(".talking-body").append(html);

    }

    /**
     * 将组织的未读消息绘制到聊天窗口上
     * 获取发言用户的基本信息,id,name,photo
     * 如果本地没有基本信息,则先用默认信息替代并标示
     * 再ajax获取基本数据,通过标示将数据替换上去
     * @param data
     */
    var addOrgUnreadTalking = function (data) {
        var id = data.orgId;
        var rows = data.rows;
        var html = "";
        var noLoadId = [];  //本地没有基本数据的用户id数组
        $.each(rows,function(i,item){
            var user = userData.getUser(item.org_message_user);
            if(user == null){
                noLoadId.push(item.org_message_user);
                html = html+"<li class='li-left'>";
                html = html+"<img src='../img/photo.jpg' alt='头像' class='photo unget-userPhoto-"+id+"'>";
                html = html+"<div class='chatBox'>";
                html = html+"<div class='chatName unget-userName-"+item.org_message_user+"'>null</div>";
                html = html+"<br><div class='chatCon'>"+item.org_message_content+"</div>";
                html = html+"</div></li>";
            }else {
                html = html+"<li class='li-left'>";
                if(user.user_photo == null || user.user_photo == ""){
                    html = html+"<img src='../img/photo.jpg' alt='头像' class='photo'>";
                }else{
                    html = html+"<img src='../"+user.user_photo+"' alt='头像' class='photo'>";
                }
                html = html+"<div class='chatBox'>";
                html = html+"<div class='chatName'>"+user.user_name+"</div>";
                html = html+"<br><div class='chatCon'>"+item.org_message_content+"</div>";
                html = html+"</div></li>";
            }
        });
        html = html+"<li class='notice'>以上"+rows.length+"条为未读消息</li>";
        $("#window-org-"+id).find(".talking-body").append(html);
        if(noLoadId.length > 0){
            var ids = [];
            for(var i=0;i<noLoadId.length;i++) { //去除重复id
                var items=noLoadId[i];
                if($.inArray(items,ids)==-1) {
                    ids.push(items);
                }
            }
            userData.ajaxGetUser(ids.join(","));
        }
    }

    /**
     * 将页面上未显示的用户信息用正确信息替换上去
     * @param user
     */
    var addUnGetUserInfo = function (user){
        $(".unget-userName-"+user.user_id).text(user.user_name);
        if(user.user_photo != null && user.user_photo != ""){
            $(".unget-userPhoto-"+user.user_id).attr('src','../'+user.user_photo);
        }
    }

    /**
     * 通过type和id获取相应窗口的数据
     * @param id
     */
    var getWindowData = function (type,id) {
        $.each(windows, function(i,item){
            if(item.type == type && item.id == id){
                return item;
            }
        });
        return null;
    }

    var addOrgUserList = function(orgId,items){
        var orgWindow = $("#window-org-"+orgId);
        if(orgWindow.length > 0){
            var html = "";
            var userIds = [];
            $.each(items, function(i,item){
                var user = userData.getUser(item.organization_user_user);
                if(user == null){
                    userIds.push(item.organization_user_user);
                    html = html+"<li><i class='fa fa-user'></i>&nbsp;<span class='unget-userName-"+item.organization_user_user+"'>null</span></li>";
                }else{
                    html = html+"<li><i class='fa fa-user'></i>&nbsp;"+user.user_name+"</li>";
                }
            });
        }

        orgWindow.find(".user-list").html(html);
        if(userIds.length > 0){
            userData.ajaxGetUser(userIds.join(","));
        }
    }

    return{
        addUnGetUserInfo : addUnGetUserInfo,
        showWindow : showWindow,
        readingMessage : readingMessage,
        addUserUnreadTalking : addUserUnreadTalking,
        addOrgUnreadTalking : addOrgUnreadTalking,
        getWindowData : getWindowData,
        addOrgUserList : addOrgUserList
    }
})
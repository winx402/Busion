/**
 * Created by wangwenxiang on 16-1-11.
 */

define(['jquery','bootstrap','data/myData'],function($,bootstrap,myData){

    var initFriendModal = function (user) {
        if (user != null){
            if(user.user_photo == null){
                $(".user-info-modal .user_photo").attr('src','../img/photo.jpg');
            }else {
                $(".user-info-modal .user_photo").attr('src','../'+user.user_photo);
            }
            $(".user-info-modal .user-name").text(user.user_name);
            $(".user-info-modal .modal-body").empty();
            $(".user-info-modal .modal-footer .myself-friend").attr('_id',user.user_id).attr("disabled",true);
            $(".user-info-modal .modal-footer .creat-user-talking").attr('_id',user.user_id);
            var me = myData.getMyInfo();
            var myself_friend = $(".user-info-modal .modal-footer .myself-friend");
            if (me.user_id == user.user_id){
                myself_friend.addClass("change-my-info").removeClass("add-friend").text("修改资料").attr('disabled',false);
                $(".user-info-modal .modal-footer .creat-user-talking").attr('disabled',true);
            }else {
                myself_friend.addClass("add-friend");
                myself_friend.removeClass("change-my-info");
                myself_friend.text("添加好友");
                myself_friend.attr('disabled',true);
                $(".user-info-modal .modal-footer .creat-user-talking").attr('disabled',false);
            }
            $(".user-info-modal").modal('show');
            return true;
        }
        return false;
    };

    var addFriendInfo = function (user) {
        var html = "<table>";
        if(user.user_phone != null){
            html = html+"<tr><td valign='top'>电话:</td><td>"+user.user_phone+"</td></tr>";
        }
        if(user.user_mail != null){
            html = html+"<tr><td valign='top'>邮箱:</td><td>"+user.user_mail+"</td></tr>"
        }
        if(user.user_description != null){
            html = html+"<tr><td valign='top'>说明:</td><td>"+user.user_description+"</td></tr></table>";
        }else{
            html = html+"<tr><td valign='top'>说明:</td><td>该用户没有说明</td></tr></table>";
        }
        var orgPath = user.orgPath;
        html = html+"<ul>"
        $.each(orgPath,function(i,item){
            html = html+"<li>"+item+"</li>";
        });
        html = html + "</ul>";
        $(".user-info-modal .modal-body").append(html);
        if(user.isFriend == 0){
            $(".user-info-modal .modal-footer .add-friend").attr('_id',user.user_id).attr("disabled",false);
        }
    };

    var initOrgModal = function (org) {
        if (org != null){
            $(".org-info-modal .org-logo").empty();
            $(".org-info-modal .org-logo").prepend("<i class='fa "+org.organization_logo+"'></i>");
            $(".org-info-modal .org-name").text(org.organization_name);
            $(".org-info-modal .modal-body").empty();
            $(".org-info-modal .org-manage").attr('_id',org.organization_id);
            if(org.organization_user_manage == 1){
                $(".org-info-modal .org-manage").attr('disabled',false);
            }else{
                $(".org-info-modal .org-manage").attr('disabled',true);
            }
            $(".org-info-modal .creat-org-talking").attr('_id',org.organization_id);
            $(".org-info-modal").modal('show');
            return true;
        }
        return false;
    };

    var addOrgInfo = function (org){
        var html = "<table><tr><td valign='top'>简介:</td>";
        if(org.organization_desc == null){
            html = html+"<td>该部门没有说明</td>";
        }else{
            html = html+"<td>"+org.organization_desc+"</td>";
        }
        html = html+"</tr><tr><td valign='top'>公告:</td>";
        if(org.organization_notice == null){
            html = html+"<td>无公告</td>";
        }else {
            html = html+"<td>"+org.organization_notice+"</td>";
        }
        html = html+"</tr></table>";
        $(".org-info-modal .modal-body").append(html);
    };

    var initMyInfoModal = function (user) {
        if (user != null){
            if(user.user_photo == null){
                $(".user-info-change-modal .user_photo").attr('src','../img/photo.jpg');
            }else {
                $(".user-info-change-modal .user_photo").attr('src','../'+user.user_photo);
            }
            $(".user-info-change-modal .user-name").text(user.user_name);
            if (user.user_desc != null){
                $(".user-info-change-modal .my-desc-input").text(user.user_desc);
            }else {
                $(".user-info-change-modal .my-desc-input").text();
            }
            $(".user-info-change-modal .modal-footer .update-user-info").attr('disabled',true);
            $(".user-info-change-modal").modal('show');
            return true;
        }
        return false;
    };

    var initAddFriendModal = function (user) {
        if (user != null){
            $(".add-friend-request .user_photo").attr('src','../img/photo.jpg');
            $(".add-friend-request .user_photo").addClass('unget-userPhoto-'+user.user_id);
            $(".add-friend-request .user-name").addClass("unget-userName-"+user.user_id);
            if (user.message_isRead <= 1){
                $(".add-friend-request .modal-body").text("请求添加你为好友!");
                $(".add-friend-request .reject-friend-request").attr('_id',user.message_id).attr('disabled',false);;
                $(".add-friend-request .agree-friend-request").attr('_id',user.message_id).attr('disabled',false);
            }else if(user.message_isRead == 2){
                $(".add-friend-request .modal-body").text("已拒绝好友请求");
                $(".add-friend-request .reject-friend-request").attr('disabled',true);
                $(".add-friend-request .agree-friend-request").attr('disabled',true);
            }else if(user.message_isRead == 3){
                $(".add-friend-request .modal-body").text("已同意好友请求");
                $(".add-friend-request .reject-friend-request").attr('disabled',true);
                $(".add-friend-request .agree-friend-request").attr('disabled',true);
            }
            $(".add-friend-request").modal('show');
            require("data/userData").getUserAndPutToHtml(user.user_id);
        }
    };

    var initSysMessageModal = function (message) {
        if (message != null){
            $(".sys-message .modal-body").text(message.message_content);
            $(".sys-message").modal('show');
        }
    };

    return{
        initFriendModal : initFriendModal,
        addFriendInfo : addFriendInfo,
        initOrgModal : initOrgModal,
        addOrgInfo : addOrgInfo,
        initMyInfoModal : initMyInfoModal,
        initAddFriendModal : initAddFriendModal,
        initSysMessageModal : initSysMessageModal
    }
});
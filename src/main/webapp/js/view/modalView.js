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
            $(".user-info-modal .modal-footer .add-friend").attr('_id',user.user_id).attr("disabled",true);
            $(".user-info-modal .modal-footer .creat-talking").attr('_id',user.user_id);
            var me = myData.getMyInfo();
            if (me.user_id == user.user_id){
                $(".user-info-modal .modal-footer .creat-talking").attr('disabled',true);
            }else {
                $(".user-info-modal .modal-footer .creat-talking").attr('disabled',false);

            }
            $(".user-info-modal").modal('show');
            return true;
        }
        return false;
    }
    
    var addFriendInfo = function (user) {
        var html = "<table>";
        if(user.user_phone != null){
            html = html+"<tr><td valign='top'>电话:</td><td>"+user.user_phone+"</td> </tr>";
        }
        if(user.user_mail != null){
            html = html+"<tr> <td valign='top'>邮箱:</td> <td>"+user.user_mail+"</td> </tr>"
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
    }
    return{
        initFriendModal : initFriendModal,
        addFriendInfo : addFriendInfo
    }
})
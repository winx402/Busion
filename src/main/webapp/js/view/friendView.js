/**
 * Created by wangwenxiang on 16-1-11.
 */

define(['jquery'],function($){
    /**
     * 初始化好友面板
     * @param friendArray
     */
    var initFriendPanel = function(friendArray){
        $(".my-friend").children("li").remove();
        $.each(friendArray,function(i,item){
            var html = "<li _id='"+item.user_id+"'>";
            if(item.user_photo == null || item.user_photo == ""){
                html = html+"<img src='../img/photo.jpg'>";
            }else{
                html = html+"<img src='"+item.user_photo+"'>";
            }
            html = html+"<div class='name-desc'>";
            if(item.friend_mark == null || item.friend_mark == ""){
                html = html+"<div class='talking-name'>"+item.user_name+"</div>";
            }else{
                html = html+"<div class='talking-name'>"+item.friend_mark+"&nbsp;("+item.user_name+")</div>";
            }
            if(item.user_desc == null || item.user_desc == ""){
                html = html+"<div class='talking-desc'>该用户没有说明</div>";
            }else{
                html = html+"<div class='talking-desc'>"+item.user_desc+"</div>";
            }
            html = html+"</div></li>";
            $(".my-friend input").after(html);
        })
    }

    return{
        initFriendPanel: initFriendPanel
    }
})
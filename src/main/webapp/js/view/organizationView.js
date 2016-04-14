/**
 * Created by wangwenxiang on 16-1-11.
 */

define(['jquery','require'],function($,require){
    /**
     * 切换我的组织和所有组织
     * 0-我的组织,1-所有组织
     */
    var changeOrganization = function(index){
        $(".organization-menu").removeClass("organization-selected").eq(index).addClass("organization-selected");
    }

    /**
     * 显示面板
     * 0-我的组织,1-所有组织,2-loading
     */
    var showOrganization = function(index){
        $(".organization-option").removeClass("select").eq(index).addClass("select");
    }

    /**
     * 初始化我的组织面板
     */
    var initMyOrganizationPanel = function(myOrg){
        $(".organization-myOrg .organization-body").children("div").remove();
        var html = "";
        $.each(myOrg,function(i,item){
            html = html+"<div class='organization-name my-org' _index='"+item.organization_id+"'>";
            html = html+"<span class='my-org-click' _index='"+item.organization_id+"'><i class='fa "+item.organization_logo+"'></i><br>"+item.organization_name+"</span>";
            html = html+"<div class='org-talking' _id="+item.organization_id+">发送消息</div></div>";
        });
        $(".organization-myOrg .organization-body").append(html);
    }

    /**
     * 初始化所有组织面板
     * 将组织数据绘制到面板上面
     */
    var initAllOrganizationPanel = function(org){
        $(".organization-allOrg .organization-body").children("div").remove();
        var html = "";
        var allOrg = org.org;
        var load = org.load;
        var list = org.list;
        if (allOrg.length == 0 && load==2 && list.length==0){
            html = html+"<div class='organization-noOrg'>无内容</div>"
        }else{
            $.each(allOrg,function(i,item){
                html = html+"<div class='organization-name all-org' _index='"+item.organization_id+"' _name='"+item.organization_name+"'>";
                html = html+"<span><i class='fa "+item.organization_logo+"'></i><br>"+item.organization_name+"</span></div>";
            });
            if(load == 1){
                html = html+"<div class='organization-name load-org-user'>";
                html = html+"<span><i class='fa fa-spinner fa-pulse'></i><br>加载用户...</span></div>";
            }else if(list.length == 0){
                html = html+"<div class='organization-name no-org-user'>";
                html = html+"<span><i class='fa fa-user-times'></i><br>没有成员</span></div>";
            }else {
                var userData = require("data/userData");
                var noUser = [];
                $.each(list,function(i,item){
                    var user = userData.getUser(item);
                    if(user == null){
                        noUser.push(item);
                        html = html+"<div class='organization-name all-org-user' _index='"+user.user_id+"'>";
                        html = html+"<span><img class='photo user-click unget-userPhoto-"+item+"' _id='"+user.user_id+"' src='../img/photo.jpg'><br><span class='unget-userName-"+item+"'>null</span></span></div>";
                    }else {
                        html = html+"<div class='organization-name all-org-user' _index='"+user.user_id+"'>";
                        if (user.user_photo == null){
                            html = html+"<span><img  class='user-click' _id='"+user.user_id+"' src='../img/photo.jpg'><br>"+user.user_name+"</span></div>";
                        }else{
                            html = html+"<span><img  class='user-click' _id='"+user.user_id+"' src='../"+user.user_photo+"'><br>"+user.user_name+"</span></div>";
                        }
                    }
                });
                if (noUser.length > 0){
                    userData.ajaxGetUser(noUser.join(","));
                }
            }
        }
        $(".organization-allOrg .organization-body").append(html);
    };

    var addOrgUserList = function (id,userList) {
        var nowId = $(".guide-now").attr("_index");
        if(nowId == id){
            var html = "";
            $.each(userList,function(i,item){
                if(item.load == false){
                    html = html+"<div class='organization-name all-org-user' _index='"+item.user_id+"'>";
                    html = html+"<span><img class='photo user-click unget-userPhoto-"+item.user_id+"' _id='"+item.user_id+"' src='../img/photo.jpg'><br><span class='unget-userName-"+item.user_id+"'>null</span></span></div>";
                }else {
                    html = html+"<div class='organization-name all-org-user' _index='"+item.user_id+"'>";
                    if (item.user_photo == null){
                        html = html+"<span><img class='user-click' _id='"+item.user_id+"' src='../img/photo.jpg'><br>"+item.user_name+"</span></div>";
                    }else{
                        html = html+"<span><img class='user-click' _id='"+item.user_id+"' src='../"+item.user_photo+"'><br>"+item.user_name+"</span></div>";
                    }
                }
            });
            if(html == ""){
                html = html+"<div class='organization-name no-org-user'>";
                html = html+"<span><i class='fa fa-user-times'></i><br>没有成员</span></div>";
            }
            $(".load-org-user").remove();
            $(".organization-allOrg .organization-body").append(html);
        }
    }

    /**
     * 绘制所有组织顶部的导航
     * 添加
     */
    var addOrganizationGuide = function (id,name){
        $(".guide-now").removeClass("guide-now");
        var html = "<i class='fa fa-chevron-right'></i>";
        html = html+"<a class='guide-point guide-now' _index='"+id+"'>"+name+"</a>"
        $(".organization-guide").append(html);
    }

    /**
     * 绘制所有组织顶部的导航
     * 减少
     */
    var delOrganizationGuide = function (point){
        point.nextAll().remove();
        point.addClass("guide-now");
    }


    /**
     * 是否展示面板
     */
    var showPanel =function(org){
        if(window.nowBottom==2){
            if(window.organizationState == org){
                showOrganization(org);
            }
        }
    }

    return{
        changeOrganization : changeOrganization,
        showOrganization : showOrganization,
        initMyOrganizationPanel : initMyOrganizationPanel,
        showPanel : showPanel,
        initAllOrganizationPanel : initAllOrganizationPanel,
        delOrganizationGuide : delOrganizationGuide,
        addOrganizationGuide : addOrganizationGuide,
        addOrgUserList : addOrgUserList
    }
})
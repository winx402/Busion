/**
 * Created by wangwenxiang on 16-1-11.
 */

define(['jquery'],function($){
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
            html = html+"<span><i class='fa "+item.organization_logo+"'></i><br>"+item.organization_name+"</span>";
            html = html+"<div>发送消息</div></div>";
        })
        $(".organization-myOrg .organization-body").append(html);
    }

    /**
     * 初始化所有组织面板
     * 将组织数据绘制到面板上面
     */
    var initAllOrganizationPanel = function(allOrg){
        $(".organization-allOrg .organization-body").children("div").remove();
        var html = "";
        if (allOrg.length == 0){
            html = html+"<div class='organization-noOrg'>无内容</div>"
        }else{
            $.each(allOrg,function(i,item){
                html = html+"<div class='organization-name all-org' _index='"+item.organization_id+"' _name='"+item.organization_name+"'>";
                html = html+"<span><i class='fa "+item.organization_logo+"'></i><br>"+item.organization_name+"</span></div>";
            })
        }
        $(".organization-allOrg .organization-body").append(html);
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
        addOrganizationGuide : addOrganizationGuide
    }
})
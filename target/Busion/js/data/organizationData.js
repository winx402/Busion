/**
 * Created by wangwenxiang on 16-1-11.
 */
define(['network/ajax','data/array/organizationArray','view/organizationView','view/baseView'],
    function(ajax,orgArray,orgView,baseView){
        /**
         * 组织面板状态
         * 0-未初始化，无数据
         * 1-正在获取数据
         * 2-数据已经获取，正在绘制面板
         * 3-绘制完成
         */
        window.myOrganizationState = 0;
        window.allOrganizationState = 0;

    /**
     * 初始化数据
     * @param org
     */
    var init = function (org) {
        if (org == 0){
            if (window.myOrganizationState == 0){
                getData(0);
            }
        }else if (org == 1){
            if (window.allOrganizationState == 0){
                getData(1);
            }
        }
    }

    /**
     * ajax获取数据
     * @param org
     */
    function getData(org){
        if (org == 0){
            window.myOrganizationState = 1;
            ajax.ajaxFunction('organization/getMyOrganization',null,getMyOrganizationSuccess,getMyError);
        }else if (org == 1){
            window.allOrganizationState = 1;
            ajax.ajaxFunction('organization/getAllOrganization',null,getAllOrganizationSuccess,getAllError)
        }
    }

        /**
         * ajax获取我的组织信息成功
         * @param data
         */
    function getMyOrganizationSuccess(data){
        var r = eval(data);
        if(r.code == 1){
            $.each(r.data,function(i,item){
                orgArray.addMyOrganization(item);
            });
            window.myOrganizationState = 2;
            orgView.initMyOrganizationPanel(orgArray.getAll());
            window.myOrganizationState = 3;
            orgView.showPanel(0);
        }else{
            window.myOrganizationState = 0;
            baseView.setErrorTimer(r.msg);
        }
    }

        /**
         * ajax获取所有组织信息成功
         * @param data
         */
        function getAllOrganizationSuccess(data){
            var r = eval(data);
            if(r.code == 1){
                $.each(r.data,function(i,item){
                    orgArray.addAllOrganization(item);
                });
                window.allOrganizationState = 2;
                orgView.initAllOrganizationPanel(orgArray.getAllOrg(1));
                window.allOrganizationState = 3;
                orgView.showPanel(1);
            }else{
                window.allOrganizationState = 0;
                baseView.setErrorTimer(r.msg);
            }
        }

        /**
         * 获取组织信息失败
         * @param data
         */
        function getMyError(){
            window.myOrganizationState = 0;
            baseView.setErrorTimer("获取我的组织信息出错");
        }

        /**
         * 获取组织信息失败
         * @param data
         */
        function getAllError(){
            window.allOrganizationState = 0;
            baseView.setErrorTimer("获取所有组织信息出错");
        }

    return{
        init : init
    }
});
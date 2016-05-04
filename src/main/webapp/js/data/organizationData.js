/**
 * Created by wangwenxiang on 16-1-11.
 */
define(['network/ajax','data/array/organizationArray','view/organizationView','view/baseView','view/modalView','data/array/talkingArray'],
    function(ajax,orgArray,orgView,baseView,modalView,talkingArray){
        /**
         * 组织面板状态
         * 0-未初始化，无数据
         * 1-正在获取数据
         * 2-数据已经获取，正在绘制面板
         * 3-绘制完成
         */
        window.myOrganizationState = 0;
        window.allOrganizationState = 0;

        var organizationArray = [];

        var getOrgData = function(orgId){
            var org = orgArray.getOrgData(orgId);
            if (org != null){
                return org;
            }
            $.each(organizationArray,function(i,item){
                if (item.organization_id == orgId){
                    org = {
                        organization_id: item.organization_id,
                        organization_name: item.organization_name,
                        organization_logo: item.organization_logo
                    }
                }
            });
            if (org != null){
                return org;
            }
            org = talkingArray.getOrgData(orgId);
            if (org != null){
                return org;
            }
            return {
                organization_id : orgId
            }
        };

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
    };

        function addOrgData(org){
            var org = {
                organization_id : org.organization_id,
                organization_name : org.organization_name,
                organization_logo : org.organization_logo,
                organization_desc : org.organization_desc,
                organization_notice : org.organization_notice
            };
            organizationArray.push(org);
            return org;
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

        /**
         * ajax获取数据
         * @param org
         */
        function getOrgInfo(orgId){
            var params = {
                orgId : orgId
            };
            ajax.ajaxFunction('organization/getOrgInfo',params,getOrgInfoSuccess,getAllError);
        }

        function getOrgInfoSuccess(data){
            var r = eval(data);
            if(r.code == 1){
                modalView.addOrgInfo(r.data);
            }else{
                baseView.setErrorTimer("获取所有组织信息出错");
            }
        }

        var getOrgAjax = function(orgId){
            var params = {
                orgId : orgId
            };
            ajax.ajaxFunction('organization/getOrgInfo',params,getOrgAjaxSuccess,getAllError)
        };

        function getOrgAjaxSuccess(data){
            var r = eval(data);
            if (r.code == 1){
                var org = addOrgData(r.data);
                orgView.addUnGetOrgInfo(org);
            }else {
                baseView.setErrorTimer("获取组织信息出错");
            }
        }

    return{
        init : init,
        getOrgInfo : getOrgInfo,
        getOrgData : getOrgData,
        getOrgAjax : getOrgAjax
    }
});
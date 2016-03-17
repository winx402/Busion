/**
 * Created by wangwenxiang on 16-1-8.
 */
define(["jquery","view/menu_bottom_base",'data/organizationData','view/organizationView','data/array/organizationArray','data/array/talkingArray','data/windowData',
        'view/windowView','view/talkingView','data/userData','view/modalView'],
    function($,menu_bottom_base,orgData,orgView,orgArray,talkingArray,windowData,windowView,talkingView,userData,modalView){

        /**
         * 面板状态
         * 0-我的组织,1-所有组织
         */
        window.organizationState = 0;

        var allOrgName = $(".organization-allOrg .organization-name");
        /**
         * 点击底部按钮切换面板
         */
        $(".menu-bottom li").eq(2).click(function(){
            var index = 2;
            if(window.nowBottom != index){
                $(".menu-top").text("组织");
                //menu_bottom_base.changeBottom(index,window.organizationState);
                menu_bottom_base.changeBottom(index,3);
                initOrganization(window.organizationState);
            }
        });

        /**
         * 点击我的组织
         */
        $(".organization-menu").eq(0).click(function(){
            if (window.organizationState != 0){
                window.organizationState=0;
                orgView.changeOrganization(0)
            }
            initOrganization(0);
        });

        /**
         * 点击所有组织
         */
        $(".organization-menu").eq(1).click(function(){
            if (window.organizationState != 1){
                window.organizationState=1;
                orgView.changeOrganization(1)
            }
            initOrganization(1);
        });

        /**
         * 点击所有组织下的具体组织
         */
        $(document).on('click','.all-org',function(){
            var id = $(this).attr("_index");
            var name = $(this).attr("_name");
            orgView.addOrganizationGuide(id,name);
            var org = orgArray.getAllOrg(id);
            orgView.initAllOrganizationPanel(org);
            if(id!=1 && org.load == 1){
                userData.getAllOrgUserList(id);
            }
        });

        /**
         * 点击我的组织下的具体组织
         */
        $(document).on('click','.my-org-click',function(){
            var id = $(this).attr("_index");
            var org = orgArray.getMyOrg(id);
            if(modalView.initOrgModal(org)){
                orgData.getOrgInfo(id);
            }
        });

        /**
         * 点击所有组织下的导航栏
         */
        $(document).on('click','.guide-point',function(){
            var id = $(this).attr("_index");
            orgView.delOrganizationGuide($(this));
            var org = orgArray.getAllOrg(id);
            orgView.initAllOrganizationPanel(org);
            if(id!=1 && org.load == 1){
                userData.getAllOrgUserList(id);
            }
        });

        /**
         * 点击我的组织进行聊天
         */
        $(document).on('click','.org-talking',function(){
            var id = $(this).attr("_id");
            var org = orgArray.getOrgById(id);
            var w = windowView.showWindow("org",id,org.organization_name);
            var talking = talkingArray.getTalkingByTypeId("org",id);
            if(talking!=null && talking.count > 0){ //如果有未读消息
                windowData.getUnreadMessage("org",id);
            }else {
                if (talking == null){
                    var o = {
                        organization_user_organization: id,
                        organization_name: org.organization_name,
                        organization_logo: org.organization_logo,
                        count: 0, //未读消息条数
                    }
                    talkingArray.addOrgTalking(o);
                    talkingView.addTalkingPanel("org",o);
                }else {
                    talkingView.upTalkingPanel("org",id);
                }
            }
        });

        /**
         * 点击组织弹窗进行聊天
         */
        $(document).on('click','.creat-org-talking',function(){
            $(".org-info-modal").modal('hide');
            var id = $(this).attr("_id");
            var org = orgArray.getOrgById(id);
            var w = windowView.showWindow("org",id,org.organization_name);
            var talking = talkingArray.getTalkingByTypeId("org",id);
            if(talking!=null && talking.count > 0){ //如果有未读消息
                windowData.getUnreadMessage("org",id);
            }else {
                if (talking == null){
                    var o = {
                        organization_user_organization: id,
                        organization_name: org.organization_name,
                        organization_logo: org.organization_logo,
                        count: 0, //未读消息条数
                    }
                    talkingArray.addOrgTalking(o);
                    talkingView.addTalkingPanel("org",o);
                }else {
                    talkingView.upTalkingPanel("org",id);
                }
            }
        });

        /**
         * 根据面板状态加载数据,展示数据
         */
        function initOrganization(index){
            var state = index==0?window.myOrganizationState:window.allOrganizationState;
            if (state != 3){
                orgView.showOrganization(2);
                orgData.init(index);
            }else {
                orgView.showOrganization(index);
            }
        }
    });
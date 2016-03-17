/**
 * Created by wangwenxiang on 16-1-8.
 */
define(["jquery","view/menu_bottom_base",'data/myData','view/modalView'],function($,menu_bottom_base,myData,modalView){

    var old_desc = null;

    /**
     * 点击底部按钮切换面板
     */
    $(".menu-bottom li").eq(3).click(function(){
        var index = 3;
        if(window.nowBottom != index){
            $(".menu-top").text("设置");
            menu_bottom_base.changeBottom(index,3);
        }
    });

    /**
     * 退出按钮
     */
    $('.btn-danger').click(function(){
        window.location.href="signout";
    });

    /**
     * 修改个人资料按钮
     */
    $(document).on('click','.change-my-info',function(){
        $(".modal").modal('hide');
        var myInfo = myData.getMyInfo();
        if(myInfo != null && modalView.initMyInfoModal(myInfo)){
            $(".user-info-change-modal").slideToggle("fast", function(){
                $(".my-desc-input").focus();
                old_desc = myInfo.user_desc;
            });
        }
    });

    $(".my-desc-input").bind('input propertychange',function(){
        var newValue = $(this).val();
        var dis = $(".update-user-info").attr("disabled");
        if(newValue!=old_desc){
            if(dis == "disabled"){
                $(".update-user-info").attr("disabled",false);
            }
        }else {
            if(dis != "disabled"){
                $(".update-user-info").attr("disabled",true);
            }
        }
    });

    /**
     * 修改个人资料按钮
     */
    $(document).on('click','#change-org-list',function(){
        $("#manage-org-modal").modal('show');

    });



});
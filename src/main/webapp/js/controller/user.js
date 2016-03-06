/**
 * Created by wangwenxiang on 16-1-11.
 */

define(['jquery','bootstrap'],function($,bootstrap){

    /**
     * 点击talking面板下用户头像查看用户信息
     */
    $(document).on('click','.user-click',function(){
        $(".user-info-modal").modal('show');
    });

    return{

    }
})
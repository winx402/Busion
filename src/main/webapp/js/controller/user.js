/**
 * Created by wangwenxiang on 16-1-11.
 */

define(['jquery','bootstrap','data/userData'],function($,bootstrap,userData){

    /**
     * 点击talking面板下用户头像查看用户信息
     */
    $(document).on('click','.user-click',function(){
        $(".user-info-modal").modal('show');
        var user_id = $(this).attr("_id");

    });

    return{

    }
})
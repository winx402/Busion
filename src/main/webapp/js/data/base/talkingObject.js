/**
 * Created by wangwenxiang on 16-1-11.
 */

define(function(){
    /**
     * 定义talking面板的基础对象
     */
    var talking = {
        type : null,  //消息类型：user、org、system
        id : null,  //userId,orgId
        haveMessage : false, //是否未读
        photo : null, //头像图片
        name : null, //name
        content : null  //内容
    }

    return{
        getNewTalking : talking
    }
});
/**
 * Created by wangwenxiang on 16-1-13.
 */
/**
 * Created by wangwenxiang on 16-1-11.
 */
define(['network/ajax'],function(ajax){
    var params={
        /**
         * 会话面板状态
         * 0-未初始化，无数据
         * 1-正在获取数据
         * 2-数据已经获取，正在绘制面板
         * 3-绘制完成
         */
        talkingState: 0,
        /**
         * 所有好友数据
         */
        talkingArray: []
    }

    return{
        params: params
    }
});
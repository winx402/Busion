/**
 * Created by wangwenxiang on 16-1-13.
 */
/**
 * Created by wangwenxiang on 16-1-11.
 */
define(['network/ajax','data/array/organizationArray'],function(ajax,orgArray){
    var params={
        /**
         * 组织面板状态
         * 0-未初始化，无数据
         * 1-正在获取数据
         * 2-数据已经获取，正在绘制面板
         * 3-绘制完成
         */
        organizationState: 0
    }

    return{
        params: params
    }
});
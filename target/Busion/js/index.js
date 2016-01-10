/**
 * Created by wangwenxiang on 15-12-10.
 */
$(function(){
    $("body").changeCSS({});
});

(function($) {
    $.fn.changeCSS = function(options) {
        var settings = $.extend();
        return this.each(function() {
            $("#cuntomBox").mouseenter(mouseOverCustom);
            $("#cuntomBox").mouseleave(mouseOutCustom);
        });
    }
})(jQuery);

function mouseOverCustom(){
    $("#customT").stop();
    $("#customT").animate({'right':'0px'},300);
}

function mouseOutCustom(){
    $("#customT").stop();
    $("#customT").animate({'right':'-51px'},300);
}
/**
 *
 * Created by wangwenxiang on 15-12-11.
 */

/**
 * 全局状态step
 * 0-填写邮箱
 * 1-邮箱后台验证通过，并返回
 * @type {number}
 */
var step = 0;
/**
 * 全局记时器
 * 方便清空并覆盖上一次的记时
 */
var timer = null;
/**
 *
 * @type {number}
 */
var count = 60;
/**
 *
 */
var codeTimer = null;
/**
 * 注册类型
 * 0-邮箱，1-手机
 */
var registerType = 0;
/**
 * 用户点击获取验证码，验证用户邮箱格式或者手机号码
 *  格式错误则提示
 *  格式正确则ajax发送验证码
 */

function checkMailorPhone(){
    var value = $("#mail-phone").val().replace(/\ +/g,"");
    $("#mail-phone").val(value);
    if(value == "" || value == null){
        errorTimer((registerType==0?"邮箱":"手机号码")+"不能为空");
        return;
    }
    if((registerType == 0 && !(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))) ||
        (registerType == 1 && !(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(value)))){
        errorTimer((registerType==0?"邮箱":"手机号码")+"格式错误");
    }else {
        submitMailorPhoneAjax(value);
    }
}

/**
 * 切换注册类型
 */
function changeRegisterType(type){
    if(registerType == type){
        return;
    }else{
        registerType = type;
    }
    if(type == 1){
        $("#register-type").html("手机&nbsp;<span class=\"caret\"></span>");
    }else{
        $("#register-type").html("邮箱&nbsp;<span class=\"caret\"></span>");
    }
}


/**
 * 修改错误信息
 * @param errorMsg
 */
function writeError(errorMsg){
    $(".box-current .error-msg").html(errorMsg);
}

$(document).ready(function(){
})

/**
 * 修改错误信息并定时恢复
 * @param errorMsg
 */
function errorTimer(errorMsg){
    writeError(errorMsg);
    clearInterval(timer);
    timer = setInterval(function(){
        writeError("&nbsp;")
    },3000)
}

/**
 * ajax注册第一步
 * ajax提交用户邮箱，验证邮箱是否可用，发送验证码
 * @param mail
 */
function submitMailorPhoneAjax(value) {
    step = 0;
    checkTimeOut();
    var params = {
        registerType : registerType,
        account : value
    }
    $.ajax({
        type : "POST",
        url: "../user/register1",
        data : params,
        success: function back(data){
            var r = eval(data);
            var code = r.code;
            if (code == 1) { //邮箱验证通过，按钮进入倒计时状态
                step = 1;
            }else {
                errorTimer(r.msg);
                recoverCheck();
            }
        },
        error: function back(data){
            errorTimer("系统错误");
            recoverCheck();
        }
    });
}

/**
 * 设置60秒不可按
 */
function checkTimeOut(){
    errorTimer("验证码已发送，请注意查看"+(registerType==0?"邮箱":"手机"));
    count = 60;
    $("#register-button").attr("disabled","disabled");
    codeTimer = setInterval(function(){
        count--;
        $("#register-button").text(count);
        if(count == 0){
            recoverCheck();
        }
    },999)
}
/**
 *恢复按钮可按
 */
function recoverCheck(){
    clearInterval(codeTimer);
    $("#register-button").text("发送验证信息").removeAttr("disabled");
}

/**
 *监听验证码输入框，当输入4个字符时进入下一步
 */
$("#randomCode").bind('input propertychange',function(){
    if(step == 1 && $(this).val().length == 4){
        $(".box-current .btn-primary").removeAttr("disabled");
    }else{
        $(".box-current .btn-primary").attr("disabled","disabled");
    }
})

/**
 * ajax注册第二步
 * 将验证码传入后台并验证，返回结果
 */
function checkCodeAjax(){
    if (step != 1){
        return;
    }
    var params = {
        registerType : registerType,
        code : $("#randomCode").val()
    }
    $.ajax({
        type : "POST",
        url: "../user/register2",
        data : params,
        success: function back(data){
            var r = eval(data);
            var code = r.code;
            if (code == 1) { //验证码通过
                step = 2;
                nextStep();
            }else {
                errorTimer(r.msg);
            }
        },
        error: function back(data){
            errorTimer("系统错误");
        }
    });
}

/**
 * 成功完成当前步骤并进入下一步
 * 改变布局样式
 */
function nextStep(){
    var nowChoosing = $(".step-choosing");
    nowChoosing.children("span").removeClass("glyphicon-star-empty").addClass("glyphicon-star");
    nowChoosing.removeClass("step-choosing").addClass("step-choosed").next("div").addClass("step-choosing");
    var nowBox = $(".box-current");
    nowBox.removeClass("box-current").next("div").addClass("box-current");
}

function checkuserInfo(){
    var user_name = $("#user_name").val().replace(/\ +/g,"");
    var user_password = $("#user_password").val().replace(/\ +/g,"");
    var user_password1 = $("#user_password1").val().replace(/\ +/g,"");
    $("#user_name").val(user_name);
    $("#user_password").val(user_password);
    $("#user_password1").val(user_password1);
    if(user_name == null || user_name == ""){
        errorTimer("用户名不能为空");
        $("#user_name").focus();
    }else if(user_password == null || user_password == ""){
        errorTimer("密码不能为空");
        $("#user_password").focus();
    }else if(user_password.length < 6){
        errorTimer("密码不能低于6位");
        $("#user_password").focus();
    }else if(user_password1 != user_password){
        errorTimer("两次密码必须相同");
        $("#user_password1").focus();
    }else{
        submitUserInfoAjax(user_name,user_password);
    }
}
/**
 * ajax注册第三步
 * 将验证码传入后台并验证，返回结果
 */
function submitUserInfoAjax(user_name,user_password){
    if (step != 2){
        return;
    }
    var params = {
        registerType : registerType,
        user_name : user_name,
        user_password : user_password
    }
    $.ajax({
        type : "POST",
        url: "../user/register3",
        data : params,
        success: function back(data){
            var r = eval(data);
            var code = r.code;
            if (code == 1) { //验证码通过
                step = 3;
                var d = r.data;
                var mail = eval(d).account;
                $("#show-mail").text(mail);
                nextStep();
            }else {
                errorTimer(r.msg);
            }
        },
        error: function back(data){
            errorTimer("系统错误");
        }
    });
}
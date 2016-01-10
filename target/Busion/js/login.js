/**
 * 全局记时器
 * 方便清空并覆盖上一次的记时
 */
var timer = null;
/**
 * 修改错误信息
 * @param errorMsg
 */
function writeError(errorMsg){
    $("#errorMsg").html(errorMsg);
}

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

function loginCheck(){
    var account = $("#account").val().replace(/\ +/g,"");
    var password = $("#password").val().replace(/\ +/g,"");
    if(account == "" || account == null){
        $("#account").focus();
        errorTimer("请输入邮箱或者手机");
    }else if(password == "" || account == null){
        $("#password").focus();
        errorTimer("请输入密码");
    }else if(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(account)){
        loginAjax(0,account,password);
    }else if(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(account)){
        loginAjax(1,account,password);
    }else {
        $("#account").focus();
        errorTimer("请输入正确的邮箱或者手机");
    }
}

/**
 * ajax登陆
 */
function loginAjax(loginType,account,password) {
    loginDisabled();
    var params = {
        loginType : loginType,
        account : account,
        password : password
    }
    $.ajax({
        type : "POST",
        url: "../user/userLogin",
        data : params,
        success: function back(data){
            var r = eval(data);
            var code = r.code;
            if (code == 1) { //登陆成功
                location.href="../../";
                loginEnabled();
            }else {
                errorTimer(r.msg);
                loginEnabled();
            }
        },
        error: function back(data){
            errorTimer("系统错误");
            loginEnabled();
        }
    });
}

/**
 * 设置登陆不可按
 */
function loginDisabled(){
    $("#loginButton").attr("disabled","disabled").text("Landing on");
}

/**
 * 设置登陆不可按
 */
function loginEnabled(){
    $("#loginButton").removeAttr("disabled").text("Login");
}
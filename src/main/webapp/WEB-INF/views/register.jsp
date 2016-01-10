<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>用户注册</title>
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <style type="text/css">
        *{margin: 0px;padding: 0px}
        body{padding-top: 54px;height: 100%}
        .navbar{padding-left: 5%;padding-right: 5%;}
        #register-title{font-family: 微软雅黑;font-size: 30px;color: #666;margin: 20px 0px;padding-left: 15%}
        #register-box{width: 100%;padding: 0px 13%;border-bottom: 2px solid #eee;}
        #register-box .step{width: 33.3%;float: left;text-align: center;font-size: 20px;color: #999}
        #register-box .step span{font-size: 18px}
        #register-box .step-choosed{color: #7ac23c;}
        #register-box .step-choosing{margin-bottom: -2px;border-bottom: 2px solid #f40;padding-bottom: 2px;color: #f40}
        .box{display: none;width: 74%;margin: 20px 13%;height: auto;padding: 5% 23%;text-align: center}
        .box .input-group{margin-bottom: 25px}
        .box-current .error-msg{color: firebrick;font-size: 14px;margin-bottom: 10px}
        .box-current{display: block}
        .clear{clear: both}
    </style>
</head>
<body>
<nav class="navbar navbar-fixed-top navbar-inverse">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">
                <span class="glyphicon glyphicon-home" aria-hidden="true"></span>&nbsp;首页
            </a>
        </div>
        <ul class="nav navbar-nav navbar-right">

            <li>
                <a href="#" data-toggle="modal">
                    <span class="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;登录
                </a>
            </li>
        </ul>
    </div>
</nav>

<div id="register-title">用户注册</div>

<div id="register-box">
    <div class="step step-choosing">
        <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
        填写用户邮箱
    </div>
    <div class="step">
        <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
        设置账号信息
    </div>
    <div class="step">
        <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
        完成注册
    </div>
    <div class="clear"></div>
</div>

<div class="box box-current">
    <div class="error-msg">&nbsp;</div>
    <div class="input-group">
        <div class="input-group-btn">
            <button type="button" class="btn btn-default dropdown-toggle" id="register-type" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">邮箱 <span class="caret"></span></button>
            <ul class="dropdown-menu">
                <li><a href="#" onclick="changeRegisterType(0)">邮箱</a></li>
                <li><a href="#" onclick="changeRegisterType(1)">手机</a></li>
            </ul>
        </div>
        <input type="text" class="form-control" placeholder="请填写邮箱或手机号码" aria-describedby="sizing-addon2"
            id="mail-phone" />
    </div>
    <div class="input-group">
        <input type="text" class="form-control" placeholder="请输入4位验证码" id="randomCode">
        <span class="input-group-btn">
            <button class="btn btn-default" type="button" onclick="checkMailorPhone()" id="register-button">发送验证信息</button>
        </span>
    </div>
    <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off"
        style="width: 80%" disabled onclick="checkCodeAjax()">
        下一步
    </button>
</div>
<div class="box">
    <div class="error-msg">&nbsp;</div>
    <div class="input-group">
        <span class="input-group-addon">真实姓名</span>
        <input type="text" id="user_name" maxlength="10" class="form-control" placeholder="请填写个人昵称" aria-describedby="sizing-addon2">
    </div>
    <div class="input-group">
        <span class="input-group-addon">设置密码</span>
        <input type="password" maxlength="16" id="user_password" class="form-control" placeholder="请填写用户密码" aria-describedby="sizing-addon2">
    </div>
    <div class="input-group">
        <span class="input-group-addon">确认密码</span>
        <input type="password" maxlength="16" id="user_password1" class="form-control" placeholder="请确认密码" aria-describedby="sizing-addon2">
    </div>
    <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off"
            style="width: 80%" onclick="checkuserInfo()">
        下一步
    </button>
</div>
<div class="box">
     恭喜！你已经完成了注册<br>你的登陆账号是<font color="#dc143c" id="show-mail"> 123@qq.com</font><br>请<a href="loginPage">登陆</a>
</div>

<script src="../js/jquery.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../js/register.js"></script>
</body>
</html>

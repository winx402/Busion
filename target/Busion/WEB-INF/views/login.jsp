<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Login</title>
	<link href="../css/bootstrap.min.css" rel="stylesheet">
	<style type="text/css">
		*{margin: 0px;padding: 0px}
		body{padding-top: 54px;height: 100%;background-image: url("../img/Login.jpg");
			-moz-background-size:100% 140%; /* 老版本的 Firefox */background-size:100% 145%;
			background-repeat:no-repeat;}
		.container{width: 400px; background: #000; opacity: 0.8; margin-top: 40px; padding-bottom: 20px;color: #fff}
		.container #errorMsg{margin: 5px 0px;font-family: 微软雅黑;font-size: 12px;color: firebrick;text-align: center}
		.container .input-group{margin: 0px 0px 15px}
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
					<span class="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;注册
				</a>
			</li>
		</ul>
	</div>
</nav>
	<h1 align="center" style="margin-top: 100px; color: #fff">Welcome To Custom System !</h1>
	<div class="container">
		<div id="errorMsg">&nbsp;</div>
			<div class="input-group">
				<span class="input-group-addon" id="basic-addon">
					<span class="glyphicon glyphicon-user" aria-hidden="true"></span>
				</span>
				<input type="text" class="form-control" id="account"
					placeholder="mail or phoneNumber" aria-describedby="basic-addon1"/>
			</div>

			<div class="input-group">
				<span class="input-group-addon" id="basic-addon1">
					<span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
				</span>
				<input type="password" class="form-control" id="password"
					placeholder="password" aria-describedby="basic-addon1"/>
			</div>
			<div class="checkbox">
				<label>
					<input type="checkbox" value="remember-me">
					Remember me
				</label>
				<a href="registerPage" style="float: right">Sign up</a>
			</div>
			<button class="btn btn-lg btn-primary btn-block" onclick="loginCheck()" id="loginButton">Login
			</button>
	</div>
	<!-- /container -->
	<script src="../js/jquery.min.js"></script>
	<script src="../js/bootstrap.min.js"></script>
	<script src="../js/login.js"></script>
</body>
</html>
package com.wang.controller;

import com.alibaba.fastjson.JSONObject;
import com.wang.domain.AllOrganization;
import com.wang.domain.Organization;
import com.wang.domain.User;
import com.wang.model.Mail;
import com.wang.model.PhoneMessage;
import com.wang.serivce.MessageService;
import com.wang.serivce.OrgMessageService;
import com.wang.serivce.OrganizationService;
import com.wang.serivce.UserService;
import com.wang.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.MessagingException;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * Created by wangwenxiang on 15-12-7.
 */
@Controller
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private MessageService messageService;

    @Autowired
    private OrgMessageService orgMessageService;

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private AllOrganization allOrganization;
    /**
     * 用户登陆
     * 验证用户是否存在
     * 验证用户是否正常
     * 验证用户密码
     * @param account 用户账号
     * @param password 用户密码
     * @return
     */
    @RequestMapping("userLogin")
    @ResponseBody
    public JSONObject userLogin(String account,String password,HttpSession session){
        int loginType = 0;
        if (!StringUtil.checkEmail(account)){
            if (!StringUtil.checkPhoneNumber(account))
                return AjaxReturn.Data2Ajax(0,"登陆错误",null);
            loginType = 1;
        }
        User user = userService.getUserByAccount(loginType,account);
        if (user == null){
            return AjaxReturn.Data2Ajax(0,"该账号没有注册",null);
        }
        if (user.getUser_state() == 0){
            return AjaxReturn.Data2Ajax(0,"该账号已经冻结",null);
        }
        if (password.equals(user.getUser_password())){
            user.setUser_password(null);
            session.setAttribute("user",user);
            return AjaxReturn.Data2Ajax(1,null,null);
        }else{
            return AjaxReturn.Data2Ajax(0,"密码错误",null);
        }
    }

    /**
     * 用户注册第一步，获取用户邮箱或者手机号码
     * 验证用户邮箱、手机格式
     * 验证数据库是否已经注册
     * 产生数字验证码，存入session和application
     * @param request 通过request获取全局变量application和session
     * @param account 获取用户邮箱
     * @return 返回结果
     */
    @RequestMapping("register1")
    @ResponseBody
    public JSONObject register1(HttpServletRequest request,String account){
        int registerType = 0;
        if (!StringUtil.checkEmail(account)){
            if (!StringUtil.checkPhoneNumber(account)){
                return AjaxReturn.Data2Ajax(0,"格式错误",null);
            }
            registerType = 1;
        }
        int haveAccount = userService.checkMailorPhone(registerType,account);
        if(haveAccount!=0){
            if (haveAccount == -1)
                return AjaxReturn.Data2Ajax(0,"注册类型错误",null);
            return AjaxReturn.Data2Ajax(0,"该"+(registerType==0?"邮箱":"手机号码")+"已经被注册",null);
        }
        HttpSession session = request.getSession();
        String code = StringUtil.getRandomCode(4);
        if (registerType == 0){
            String content = "hello，MailCode："+code;
            Mail mail = new Mail("registerCode",account,content);
            try {
                MailSender.send(mail);
            }catch (MessagingException me){
                return AjaxReturn.Data2Ajax(0,"服务器异常",null);
            }

        }else if (registerType == 1){
            PhoneMessage phoneMessage = new PhoneMessage(account,code,"注册验证");
            PhoneSender.send(phoneMessage);
        }
        session.setAttribute("registerAccount",account);
        session.setAttribute("register"+account,code);
        return AjaxReturn.Data2Ajax(1,null,null);
    }

    /**
     * 用户注册第二步，验证邮箱、手机验证码
     * 从session中获取第一步中的邮箱、手机
     * 通过邮箱获取application中的code并验证
     * @param code 用户填写的验证码
     * @return json
     */
    @RequestMapping("register2")
    @ResponseBody
    public JSONObject register2(HttpSession session, String code){
        if (code == null || "".equals(code)){
            return AjaxReturn.Data2Ajax(0,"验证码未知错误",null);
        }
        Object account = session.getAttribute("registerAccount");
        if (account == null || "".equals(account)){
            return AjaxReturn.Data2Ajax(0,"请按步骤进行",null);
        }
        String session_code = session.getAttribute("register"+account).toString();
        if (code.equals(session_code)){
            session.removeAttribute("register"+account);
            session.setAttribute("registered"+account,true);
            return AjaxReturn.Data2Ajax(1,null,null);
        }
        return AjaxReturn.Data2Ajax(0,"验证码错误",null);
    }

    /**
     * 注册第三步，填写真实姓名和密码，存入数据库
     * 验证前两步是否合法
     * @param request request
     * @param user_name 用户真实姓名、昵称
     * @param user_password 用户密码
     * @return json
     */
    @RequestMapping("register3")
    @ResponseBody
    public JSONObject register3(HttpServletRequest request,String user_name,String user_password){
        if(user_name == null || "".equals(user_name) || user_password == null || "".equals(user_password)){
            return AjaxReturn.Data2Ajax(0,"用户信息错误",null);
        }
        HttpSession session = request.getSession();
        Object account= session.getAttribute("registerAccount");
        if(account == null || "".equals(account)){
            return AjaxReturn.Data2Ajax(0,"非法用户",null);
        }
        session.removeAttribute("registerAccount");
        Object isTrue =session.getAttribute("registered"+account.toString());
        if(isTrue == null || !(Boolean) isTrue){
            return AjaxReturn.Data2Ajax(0,"用户验证失败",null);
        }
        session.removeAttribute("registered"+account.toString());
        User user = new User();
        int registerType = 0;
        if (!StringUtil.checkEmail(account.toString())){
            if (!StringUtil.checkPhoneNumber(account.toString())){
                return AjaxReturn.Data2Ajax(0,"格式错误",null);
            }
            registerType = 1;
        }
        if (registerType == 0){
            user.setUser_mail(account.toString());
        }else if (registerType == 1){
            user.setUser_phone(account.toString());
        }
        user.setUser_name(user_name);
        user.setUser_password(user_password);
        user.setUser_join_time(new Date());
        if(userService.addUser(registerType,user) == 1){
            JSONObject jb = new JSONObject();
            jb.put("account",account);
            return AjaxReturn.Data2Ajax(1,"success",jb);
        }else{
            return AjaxReturn.Data2Ajax(0,"系统错误",null);
        }
    }

    /**
     * 修改密码
     * 用户已经登陆
     * @param session 用户session
     * @param oldPassword 用户填写的旧密码
     * @param newPassword 用户填写的新密码
     * @return json
     */
    @RequestMapping("changePassword")
    @ResponseBody
    public JSONObject changePassword(HttpSession session,String oldPassword,String newPassword){
        Object o = session.getAttribute("user");
        if (o == null){
            return AjaxReturn.Data2Ajax(0,"未登陆",null);
        }
        if(newPassword == null || "".equals(newPassword)){
            return AjaxReturn.Data2Ajax(0,"新密码错误",null);
        }
        int userId = ((User)o).getUser_id();  //获取用户id
        if (userService.updatePasswordByUserId(userId,oldPassword,newPassword)){
            return AjaxReturn.Data2Ajax(1,null,null);
        }else {
            return AjaxReturn.Data2Ajax(0,"原密码错误",null);
        }
    }

    /**
     * 获取自己的所有的好友
     * @param session
     * @return
     */
    @RequestMapping("getAllFriend")
    @ResponseBody
    public JSONObject getAllFriend(HttpSession session){
        User user = (User)session.getAttribute("user");
        if(user == null){
            return AjaxReturn.Data2Ajax(0,"未登陆",null);
        }
        List<HashMap<String,Object>> list = userService.getAllFriend(user.getUser_id());
        return AjaxReturn.Data2Ajax(1,null,list);
    }

    /**
     * 通过session获取自己的基本信息
     * @param session
     * @return
     */
    @RequestMapping("getMyInfo")
    @ResponseBody
    public JSONObject getMyInfo(HttpSession session){
        User user = (User)session.getAttribute("user");
        if(user == null){
            return AjaxReturn.Data2Ajax(0,"未登陆",null);
        }
        return AjaxReturn.Data2Ajax(1,null,user);
    }

    /**
     * 获取我的未读消息-只获取未读消息的条数以及发送者的基本信息,不获取消息具体内容
     * 个人消息-根据个人消息表的消息状态确定是否为未读
     * 组织消息-根据用户-组织关系表确定哪些消息是未读的
     */
    @RequestMapping("getMyUnReadTalking")
    @ResponseBody
    public JSONObject getMyUnReadTalking(HttpSession session){
        User user = (User)session.getAttribute("user");
        if (user == null ){
            return AjaxReturn.Data2Ajax(0,"未登陆",null);
        }
        int userId = user.getUser_id();
        JSONObject jo = new JSONObject();
        //获取个人消息
        jo.put("personalTalking",messageService.getMyUnReadTalking(userId));
        jo.put("orgTalking",orgMessageService.getMyUnReadTalking(userId));
        return AjaxReturn.Data2Ajax(1,null,jo);
    }

    @RequestMapping("getOrgUserList")
    @ResponseBody
    public JSONObject getOrgUserList(int id){
        JSONObject js = new JSONObject();
        js.put("orgId",id);
        js.put("rows",userService.getOrgUserList(id));
        return AjaxReturn.Data2Ajax(1,null,js);
    }

    /**
     * 批量获取用户的基本信息
     * @param ids 用户Id集合
     * @return
     */
    @RequestMapping("getUsers")
    @ResponseBody
    public JSONObject getUsers(String ids){
        return AjaxReturn.Data2Ajax(1,null,userService.getUsers(ids));    }

    @RequestMapping("getUserInfo")
    @ResponseBody
    public JSONObject getUserInfo(HttpSession session,int userId){
        User user = (User)session.getAttribute("user");
        if (user == null){
            return AjaxReturn.Data2Ajax(0,"未登陆",null);
        }
        HashMap<String,Object> u = userService.getUserInfo(user.getUser_id(),userId);
        List<Integer> orgs = organizationService.getMyOrganizationId(userId);
        List<String> orgPath = allOrganization.parserOrgId(orgs);
        u.put("orgPath",orgPath);
        if (user.getUser_id() == userId){
            u.put("isFriend",1);
        }
        return AjaxReturn.Data2Ajax(1,null,u);
    }

//    @RequestMapping("addFriend")
//    public JSONObject addFriend(HttpSession session,int userId){
//        User user = (User)session.getAttribute("user");
//        if (user == null){
//            return AjaxReturn.Data2Ajax(0,"未登陆",null);
//        }
//
//    }
}

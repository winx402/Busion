/**
 * Created by wangwenxiang on 16-1-11.
 */
define("base/talkingObject",function(talkingObject){

    var talkingArray = [];

    function addTalking(String){
        var talking = talkingObject.getNewTalking;
        var json = eval(String);
        var type = json.type;
        talking.type = type;
        talking.id = json.id;
        talking.haveMessage = true;
        talking.photo = json.photo;
        talking.name = json.name;
        if(type != "org"){
            talking.content = json.content;
        }
        talkingArray.add(talking);
    }
});
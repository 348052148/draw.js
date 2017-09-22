/**
 * 游戏消息协议
 * head {type action id}
 * body {content length }
 * floot {}
 */
var GameUtils = {
    'TYPE':{
        'POSITION':1,
        'CHAT':2,
        'USER':3
    },
    'ACTION':{
        'ADDUUID':100,
        'DELUUID':101
    },
    'chatMessage':function (id,text) {
        return {
            'head':{'type':this.CHAT,'action':'text','fromid':id,'toid':null},
            'body':{'content':text,'length':text.length},
            'floot':{'meta':null}
        };
    },
    'parseMessage':function (message) {
        return JSON.parse(message);
        // var message_arr = message.split("|");
        // var headInfo = message_arr[0].split("&");
        // var bodyInfo = message_arr[1].split("&");
        // var flootInfo = message_arr[2].split("&");
        // return {
        //     'head':{'type':headInfo[0],'action':headInfo[1],'fromid':headInfo[2],'toid':headInfo[3]},
        //     'body':{'content':bodyInfo[0],'length':bodyInfo[1]},
        //     'floot':{'meta':flootInfo[0]}
        // };
    },
    'inverseMessage':function (message) {
        return JSON.stringify(message);
        // return message['head']['type']+"&"+message['head']['action']+"&"+message['head']['fromid']+"&"+message['head']['toid']+"|"+
        //     message['body']['content']+"&"+message['body']['length']+"|"+
        //     message['floot']['meta']+"";
    },
    'send':function (messageInfo,wsocket) {
        wsocket.send(this.inverseMessage(messageInfo));
    },
    'UUID':function () {
        return parseInt(Math.random()*10000);
    },
    'inArray':function (val,array) {
        for (var i=0;i<array.length;i++){
            if(val == array[i]){
                return true;
            }
        }
        return false;
    }
};

function Filter() {
    this.filterConnect = function (event,ws) {

    };

    this.filterClose = function (event,ws) {

    };

    this.filterMessage = function (event,ws) {

    };

    this.filterError = function (event,ws) {

    };
}

/**
 * webSocket重载类
 * @constructor
 */
function SocketClient() {

    Filter.call(this);

    var wsSocket = null;

    var wsOption = "";

    var that = this;

    this.setServerOption = function (option) {
        wsOption = "ws://"+option.ip+":"+option.port;
    };

    //自己管理
    this.run = function (backfunc) {
        wsSocket = new WebSocket(wsOption);
        this.connection(function (event,wsocket) {

            that.filterConnect(event,wsocket);

            that.message(function (event,wsocket) {
                that.filterMessage(event,wsocket);
                backfunc(event,wsocket);
            });

            that.error(function () {
                that.filterError(event,wsocket);
            });

            that.close(function () {
                that.filterClose(event,wsocket);
            });
        });
    };

    this.connection = function (backfunc) {
        wsSocket.onopen=backfunc;
    };

    this.message = function (backfunc) {
        wsSocket.onmessage=backfunc;
    };

    this.error = function (backfunc) {
        wsSocket.onerror=backfunc;
    };

    this.close = function (backfunc) {
        wsSocket.onclose=backfunc;
    };

    this.closeSocket = function () {
        wsSocket.close();
    };

    this.send=function(message){
        wsSocket.send(message);
    };

}



//游戏对象抽象模型
function QRoles(scene,id) {
    var scene = scene;
    var id = id;
    this.x = 0;
    this.y = 0;
    this.updatePosition=function(pos){
        this.x = pos.x;
        this.y = pos.y;
    };
    //发送Chat消息
    this.chatText=function(text){
        var mesg = GameUtils.chatMessage(id,text);
        console.log(mesg);
        scene.broadcastMessage(mesg);
        // socketServer.socketPool().broadcastMessageFilterId([id],mesg);
    };
    this.UUID = function () {
        return id;
    };
}

//非继承关系
function NQScene(socketSocket) {
    //socket 基础类
    var socketSocket = socketSocket;

    var rolesLst = new Array();

    var that =this;

    this.addRoles = function (roles) {
        if(!(roles.UUID() in rolesLst)){
            rolesLst[roles.UUID()] = roles;
        }
    };

    this.deleteRoles=function (uuid) {
        if((uuid in rolesLst)) {
            delete rolesLst[uuid];
        }
    };

    this.findRoles = function (uuid) {
        return  rolesLst[uuid];
    };

    this.findRolesLst = function () {
        return rolesLst;
    };

    this.run = function (backfunc) {
        socketSocket.run(backfunc);
    };

    this.error=function (backfunc) {
        socketSocket.error(backfunc);
    };

    this.close=function(backfunc){
        socketSocket.close(backfunc);
    };

    //重载filter
    socketSocket.filterConnect=function (event,ws) {
        // that.addRoles(new QRoles(this,uuid));
        // console.log('ADDROLES'+uuid);
    };

    socketSocket.filterClose=function (event,ws) {
        // that.deleteRoles(uuid);
    };

    socketSocket.filterError =function(event,ws){
        // that.deleteRoles(uuid);
    };

    socketSocket.filterMessage=function(event,ws){
        var messageInfo = GameUtils.parseMessage(event.data);
        if(messageInfo['head']['type'] == GameUtils.TYPE.USER && messageInfo['head']['action'] == GameUtils.ACTION.ADDUUID){
            scene.addRoles(new QRoles(scene,messageInfo['body']['content']));
            console.log(scene.findRolesLst());
        }
    };
}
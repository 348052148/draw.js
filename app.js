// var net = require('net');
// var server = net.createServer(function(socket){
//     socket.on('data',function (data) {
//        console.log(data.toString());
//         socket.write("HTTP/1.1 200 OK\n");
//         socket.write("Date: Sat, 31 Dec 2005 23:59:59 GMT\n");
//         socket.write("Content-Type: text/html;charset=ISO-8859-1\n");
//         socket.write("\n");
//         socket.write("\n");
//         socket.end('123213');
//     });
//
//     // socket.write('恭喜你连接成功');
//     // socket.end(0);
// }).on('error',function (err) {
//     console.log(err);
// });
// server.on('connection',function () {
//     console.log('connction');
// });
// server.on('listening',function () {
//    console.log('listening...');
// });
// server.on('close',function () {
//    console.log('close');
// });
// server.listen(function () {
//     console.log('open server on',server.address());
// });gp
//构建游戏服务器
var websocket = require('ws').Server;

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
        'DELUUID':101,
        'CHATTEXT':102
    },
    'chatMessage':function (id,text) {
        return {
            'head':{'type':this.TYPE.CHAT,'action':this.ACTION.CHATTEXT,'fromid':id,'toid':null},
            'body':{'content':text,'length':text.length},
            'floot':{'meta':null}
        };
    },
    'userAddMessage':function (id) {
        return {
            'head':{'type':this.TYPE.USER,'action':this.ACTION.ADDUUID,'fromid':id,'toid':null},
            'body':{'content':id,'length':id.length},
            'floot':{'meta':null}
        };
    },
    'userDelMessage':function (id) {
        return {
            'head':{'type':this.TYPE.USER,'action':this.ACTION.DELUUID,'fromid':id,'toid':null},
            'body':{'content':id,'length':id.length},
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

//socket 线程池对象
function SocketPool() {
    /**
     * {id:UUID,socket:wSocket}
     * @type {Array}
     */
    var ClientSocketLst = new Array();
    
    this.add=function (wsocket) {
        ClientSocketLst.push({'id':wsocket.uuid,'socket':wsocket});
        return wsocket.uuid;
    };
    
    this.delete =function (id) {
        for(var i=0;i<ClientSocketLst.length;i++){
            if(ClientSocketLst[i].id == id){
                ClientSocketLst.splice(i,1);
                console.log(ClientSocketLst);
                return ClientSocketLst;
            }
        }
        return ClientSocketLst;
    };

    this.isExists=function (id) {
       for(var i=0;i<ClientSocketLst.length;i++){
           if(ClientSocketLst[i].id == id){
               return true;
           }
       }
       return false;
    };

    this.findSocketById=function (id) {
        for(var i=0;i<ClientSocketLst.length;i++){
            if(ClientSocketLst[i].id == id){
                return ClientSocketLst[i];
            }
        }
        return false;
    };

    this.poolLength = function () {
        return ClientSocketLst.length;
    };

    this.socketLst = function(){
        return ClientSocketLst;
    };

    //send消息byID
    this.disposeMessage =function (id,messageInfo) {
        messageInfo.head.toid = id;
        this.findSocketById(id).socket.send(GameUtils.inverseMessage(messageInfo));
    };

    //广播消息filter ID
    this.broadcastMessageFilterId = function (ids,messageInfo) {
        for(var i=0;i<ClientSocketLst.length;i++){
            if(!GameUtils.inArray(ClientSocketLst[i].id,ids)){
                console.log('FS'+ClientSocketLst[i].id);
                this.disposeMessage(ClientSocketLst[i].id,messageInfo);
            }
        }
    };

    //广播消息
    this.broadcastMessage=function (messageInfo) {
        for(var i=0;i<ClientSocketLst.length;i++){
                this.disposeMessage(ClientSocketLst[i].id,messageInfo);
        }
    };

    //单个id进行消息接受
    this.receiveMessageById = function (id,backfunc) {
        this.findSocketById(id).socket.message(backfunc)
    };

    this.receiveMessage = function (backfunc) {
        for(var i=0;i<ClientSocketLst.length;i++){
            ClientSocketLst[i].socket.message(backfunc);
        }
    };

    this.closeClientSockt=function (id,backfunc) {
        this.findSocketById(id).socket.close(backfunc);
    };

    this.errorClientSockt=function (id,backfunc) {
        this.findSocketById(id).socket.error(backfunc);
    };

}

/**
 * client Socket
 * @constructor
 */
function SocketClient(wsocket) {
    var ws = wsocket;

    this.uuid = GameUtils.UUID();
    
    this.send = function (message) {
        return ws.send(message);
    };

    this.message = function (backfunc) {
        // backfunc.call(this);
        // backfunc.prototype.socket = this;
        ws.uuid = this.uuid;
        ws.on('message',backfunc);
    };

    this.close = function(backfunc){
        // backfunc.call(this);
        ws.uuid = this.uuid;
        ws.on('close',backfunc);
    };

    this.error = function (backfunc) {
        // backfunc.call(this);
        ws.uuid = this.uuid;
        ws.on('error',backfunc);
    };
    this.test =function () {
        console.log('TEST');
    }
}

function Filter() {
    this.filterConnect = function (uuid) {

    };

    this.filterClose = function (uuid) {

    };

    this.filterError = function (uuid) {

    };
}

/**
 * webSocket重载类
 * @constructor
 */
function SocketServer() {

    Filter.call(this);

    var socketPool = new SocketPool();

    var wsServer = null;

    var wsOption = {};

    var that = this;

    this.setServerOption = function (option) {
        wsOption = option;
    };

    //自己管理
    this.run = function (backfunc) {
        wsServer = new websocket(wsOption);
        this.connection(function (ws) {
            var uuid = socketPool.add(new SocketClient(ws));
            that.filterConnect(uuid);
            console.log('CONNECTION:'+uuid);
            socketPool.receiveMessageById(uuid,backfunc);
            //删除指定socketClient
            socketPool.closeClientSockt(uuid,function () {
                console.log('DELETE-CLOSE:'+uuid);
                socketPool.delete(this.uuid);
                //广播删除消息
                that.filterClose(uuid);
            });
            socketPool.errorClientSockt(uuid,function () {
                console.log('ERROR-CLOSE:'+uuid);
                socketPool.delete(this.uuid);
                //广播删除消息
                that.filterError();
            });
        });
    };

    this.connection = function (backfunc) {
        wsServer.on('connection',backfunc);
    };

    this.message = function (backfunc) {
        socketPool.receiveMessage(backfunc);
    };

    this.error = function (backfunc) {
        wsServer.on('error',backfunc);
    };

    this.close = function (backfunc) {
        wsServer.on('close',backfunc);
    };

    this.closeServer = function () {
        wsServer.close();
    };

    this.socketPoolLength = function () {
       return socketPool.poolLength();
    };

    this.socketPool=function(){
        return socketPool;
    };


    //广播消息filter ID
    this.broadcastMessageFilterId = function (ids,messageInfo) {
        socketPool.broadcastMessageFilterId(ids,messageInfo);
    };

    //广播消息
    this.broadcastMessage=function (messageInfo) {
        socketPool.broadcastMessage(messageInfo);
    };
    //给指定id发送消息
    this.disposeMessage = function (id,messageInfo) {
        socketPool.disposeMessage(id,messageInfo);
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
//场景 限制了单socket
function QScene() {
    //socket 基础类
    SocketServer.call(this);

    var rolesLst = new Array();

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

    //重载filter
    this.filterConnect=function (uuid) {
        this.addRoles(new QRoles(this,uuid));
    };

    this.filterClose=function (uuid) {
        this.deleteRoles(uuid);
    };

    this.filterError =function(uuid){
        this.deleteRoles(uuid);
    };

}

//非继承关系
function NQScene(socketServer) {
    //socket 基础类
    var socketServer = socketServer;

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
        socketServer.run(backfunc);
    };

    this.error=function (backfunc) {
        socketServer.error(backfunc);
    };

    this.close=function(backfunc){
        socketServer.close(backfunc);
    };

    //给自己广播消息
    this.broadcastMessageSelf=function(id){
        var socketLst = socketServer.socketPool().socketLst();
        for(var i =0 ; i<socketLst.length;i++){
            if(id != socketLst[i].id){
                socketServer.disposeMessage(id,GameUtils.userAddMessage(socketLst[i].id));
            }
        }
    };

    //重载filter
    socketServer.filterConnect=function (uuid) {
        that.addRoles(new QRoles(this,uuid));
        console.log('ADDROLES'+uuid);
        socketServer.broadcastMessageFilterId([uuid],GameUtils.userAddMessage(uuid));
        that.broadcastMessageSelf(uuid);
    };

    socketServer.filterClose=function (uuid) {
        that.deleteRoles(uuid);
        socketServer.broadcastMessageFilterId([uuid],GameUtils.userDelMessage(uuid));
    };

    socketServer.filterError =function(uuid){
        that.deleteRoles(uuid);
        socketServer.broadcastMessageFilterId([uuid],GameUtils.userDelMessage(uuid));
    };


}

//多进程
var cluster = require('cluster');
var  numCPUs = require('os').cpus().length;
if (cluster.isMaster) {

    // 衍生工作进程。
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    console.log( "PID:"+process.pid);

    cluster.on('exit', function(worker, code, signal) {
        console.log("工作进程"+worker.process.pid+"已退出");
    });

}else{
    //运行实例 所有操作根据uuid来进行
    socketServer = new SocketServer();

    socketServer.setServerOption({port:8181});

    scene = new NQScene(socketServer);

    scene.run(function (message) {
        console.log("接受消息:"+message + "PID:"+process.pid);

        if(message){
            // console.log(this);
            scene.findRoles(this.uuid).chatText(message);
        }

    });

    scene.error(function () {

    });

    scene.close(function () {

    });

    console.log("工作进程"+process.pid+"已启动");
}




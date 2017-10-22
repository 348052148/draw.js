
//canvas上下文
/**
 * 基本类库整理 v.1.0
 *
 */

function BObject(){
    this.name='BObject';
    this.toString=function(){
        return 'BObject Object';
    };
    this.UUID = BUtils.uuid();
}

function BActions(BContext){
    BObject.call(this);
    this.scale=function(x,y){
        return BContext.scale(x,y);
    };
    this.rotate=function(angle,corePos){
        BContext.translate(corePos.x,corePos.y);
        BContext.rotate(angle);
        BContext.translate(-corePos.x,-corePos.y);
    };
    this.translate=function(x,y){

       return BContext.translate(x,y);

    };
    this.transform=function(m11,m12,m21,m22,dx,dy){
        return BContext.transform(m11,m12,m21,m22,dx,dy);
    };
    this.setTransform=function(m11,m12,m21,m22,dx,dy){
        return BContext.setTransform(m11,m12,m21,m22,dx,dy);
    };
    this.resetTransform = function () {
        return BContext.resetTransform();
    };
}



//图形抽象
//本画笔不提供渐变和阴影
function BPaint(BContext) {
    BObject.call(this);
    this.context = BContext;
    //墨水设置
    this.setColor = function (color) {
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
    };

    this.setGlobalAlpha = function (gAlpha) {
      this.context.globalAlpha =  gAlpha;
    };


    //---------------------路径绘图----------------------------
    this.stroke=function(){
        return this.context.stroke();
    };
    //起始一条路径，或重置当前路径
    this.beginPath=function(){
        this.context.beginPath();
    };
    //把路径移动到画布中的指定点，不创建线条
    this.moveTo=function(x,y){
        return this.context.moveTo(x,y);
    };
    //创建从当前点回到起始点的路径
    this.closePath=function(){
        return this.context.closePath();
    };
    //添加一个新点，然后在画布中创建从该点到最后指定点的线条
    this.lineTo=function(){
        this.context.lineTo(x,y);
    };
    //从原始画布剪切任意形状和尺寸的区域
    this.clip=function(){
        return this.context.clip();
    };
    //创建二次贝塞尔曲线
    this.quadraticCurveTo=function(cpx,xpy,x,y){
        return this.context.quadraticCurveTo(cpx,cpy,x,y);
    };
    //创建三次方贝塞尔曲线
    this.bezierCurveTo=function(){
        return this.context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
    };
    //创建弧/曲线（用于创建圆形或部分圆）
    this.arc=function(x,y,radius,startAnglr,endAngle,antclockwise){
        return this.context.arc(x,y,radius,startAnglr,endAngle,antclockwise);
    };
    //创建两切线之间的弧/曲线
    this.arcTo=function(x1,y1,x2,y2,radius){
        return this.context.arcTo(x1,y1,x2,y2,radius);
    };
    //如果指定的点位于当前路径中，则返回 true，否则返回 false
    this.isPointInPath=function(){
        return this.context.isPointInPath(x,y);
    };

    //-------------------------------直接绘图-----------------------------------
    this.rect=function(x,y,w,h){
        return this.context.rect(x,y,w,h);
    };
    //绘制“被填充”的矩形
    this.fillRect=function(x,y,w,h){
        return this.context.fillRect(x,y,w,h);
    };
    //绘制矩形（无填充）
    this.strokeRect=function(x,y,w,h){
        return this.context.strokeRect(x,y,w,h);
    };
    //在给定的矩形内清除指定的像素
    this.clearRect=function(x,y,w,h){
        return this.context.clearRect(x,y,w,h);
    };
    //-----------------------------笔触设置--------------------------------------------
    //设置或返回线条的结束端点样式
    this.lineCap=function(val){
        this.context.lineCap=val;
    };
    //设置或返回两条线相交时，所创建的拐角类型
    this.lineJoin=function(val){
        this.context.lineJoin=val;
    };
    //设置或返回当前的线条宽度
    this.lineWidth=function(val){
        this.context.lineWidth=val;
    };
    //设置或返回最大斜接长度
    this.miterLimit=function(val){
        this.context.miterLimit=val;
    };
    this.setLineDash =function (val) {
        this.context.setLineDash(val);
    };
    this.getLineDash = function () {
        return this.context.getLineDash();
    };
    this.lineDasgOffset = function (val) {
        this.context.lineDasgOffset = val;
    };
    //------------------------------书写文字------------------------------------------------
    //设置或返回文本内容的当前字体属性
    this.font=function(font){
        this.context.font=font;
    };
    //设置或返回文本内容的当前对齐方式
    this.textAlign=function(textAlign){
        this.context.textAlign=textAlign;
    };
    //设置或返回在绘制文本时使用的当前文本基线
    this.textBaseline=function(textBaseline){
        this.context.textBaseline=textBaseline;
    };
    //在画布上绘制“被填充的”文本
    this.fillText=function(text,x,y,maxWidth){
        return this.context.fillText(text,x,y,maxWidth);
    };
    //文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。
    this.direction = function (val) {
        this.context.direction = val;
    };
    //在画布上绘制文本（无填充）
    this.strokeText=function(text,x,y,maxWidth){
        return this.context.strokeText(text,x,y,maxWidth);
    };
    //返回包含指定文本宽度的对象
    this.measureText=function(text){
        return this.context.measureText(text);
    };
    //---------------------------绘制图片------------------------------------------------
    this.drawImage=function(elem,x,y,w,h){
        this.context.drawImage(elem,x,y,w,h);
    };
    this.drawImageCut=function(elem,sx,sy,swidth,sheight,x,y,width,height){
        this.context.drawImage(elem,sx,sy,swidth,sheight,x,y,width,height);
    };

    //----------------------------数据截取--------------------------------------
    this.createImageData=function(){
        return this.context.createImageData(sw,sh);
    };
    this.getImageData=function(){
        return this.context.getImageData(sx,sy,sw,sh);
    };
    this.putImageData=function(){
        return this.context.putImageData(data,dx,dy,dirtyX,dirtyY,dirtyWidth,dirtyHeight);
    };

}




/**
 * 游戏引擎 Draw.js v.1.0
 */

var BUtils={
    uuid:function(){
        return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
    },
    S4:function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    },
    rayCasting:function(p, poly) {
        var px = p.x,
            py = p.y,
            flag = false;

        for(var i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
            var sx = poly[i].x,
                sy = poly[i].y,
                tx = poly[j].x,
                ty = poly[j].y;

            // 点与多边形顶点重合
            if((sx === px && sy === py) || (tx === px && ty === py)) {
                return 'on'
            }

            // 判断线段两端点是否在射线两侧
            if((sy < py && ty >= py) || (sy >= py && ty < py)) {
                // 线段上与射线 Y 坐标相同的点的 X 坐标
                var x = sx + (py - sy) * (tx - sx) / (ty - sy);

                // 点在多边形的边上
                if(x === px) {
                    return 'on'
                }

                // 射线穿过多边形的边界
                if(x > px) {
                    flag = !flag
                }
            }
        }

        // 射线穿过多边形边界的次数为奇数时点在多边形内
        return flag ? 'in' : 'out';
    },
    rectPos:function (x,y,width,height) {
        var ploye = [
            {x:x,y:y},
            {x:x,y:y+height},
            {x:x+width,y:y+height},
            {x:x+width,y:y}
        ];
        return ploye;
    },
    polygonPos:function (position_arr) {
        ploye = [];
        for (pos in position_arr){
            ploye.push({x:pos[0],y:pos[1]});
        }
        return ploye;
    }
};
//-------------------全局对象。一个游戏之一一个Game
var BGame={
    BContext:null,
    width:0,
    height:0,
    fps:0,
    canvasObj:null,
    canvasId:BUtils.uuid(),
    init:function(){

        var that = this;

        this.BContext=document.getElementById(this.canvasId).getContext("2d");


        //-----------------------------事件-------------------------------------------


        this.canvasObj.addEventListener('click',function (e) {
            // alert('单击');
            for(var eventinfo in that.eventLoop){
                event = that.eventLoop[eventinfo];
                var ploye = BUtils.rectPos(event.obj.X()+event.obj.coreOffsetX,event.obj.Y()+event.obj.coreOffsetY,event.obj.width,event.obj.height);
                if(BUtils.rayCasting({x:e.offsetX,y:e.offsetY},ploye)!= 'out'){
                    event.func(e);
                }
            }

        });

        this.canvasObj.addEventListener('dblclick',function (e) {
           // alert('双击');
            for(var eventinfo in that.eventLoop){
                event = that.eventLoop[eventinfo];
                var ploye = BUtils.rectPos(event.obj.X()+event.obj.coreOffsetX,event.obj.Y()+event.obj.coreOffsetY,event.obj.width,event.obj.height);
                if(BUtils.rayCasting({x:e.offsetX,y:e.offsetY},ploye)!= 'out'){
                    event.func(e);
                }
            }

        });

        document.addEventListener('keydown',function (e) {
            // alert('按下');
        });

        document.addEventListener('keyup',function (e) {
           // alert('按起');
        });

        this.canvasObj.addEventListener('mousedown',function (e) {
            // alert('鼠标按下');
            // console.log(that.eventLoop);

            for(var eventinfo in that.eventLoop){
                event = that.eventLoop[eventinfo];
                if(event.event != 'mousedown') continue;
                var ploye = BUtils.rectPos(event.obj.X()+event.obj.coreOffsetX,event.obj.Y()+event.obj.coreOffsetY,event.obj.width,event.obj.height);
                if(BUtils.rayCasting({x:e.offsetX,y:e.offsetY},ploye)!= 'out'){
                    event.func(e,event.obj);
                }
            }

            return false;
        });

        this.canvasObj.addEventListener('mouseup',function (e) {
            // alert('鼠标按起');
            for(var eventinfo in that.eventLoop){
                event = that.eventLoop[eventinfo];
                if(event.event != 'mouseup') continue;
                var ploye = BUtils.rectPos(event.obj.X()+event.obj.coreOffsetX,event.obj.Y()+event.obj.coreOffsetY,event.obj.width,event.obj.height);
                if(BUtils.rayCasting({x:e.offsetX,y:e.offsetY},ploye)!= 'out'){
                    event.func(e);
                }
            }

        });

        this.canvasObj.addEventListener('mousemove',function (e) {
            //鼠标进入事件
            for(var eventinfo in that.eventLoop){
                event = that.eventLoop[eventinfo];
                if(event.event != 'mousemove' && event.event != 'mouseover') continue;

                var ploye = BUtils.rectPos(event.obj.X()+event.obj.coreOffsetX,event.obj.Y()+event.obj.coreOffsetY,event.obj.width,event.obj.height);

                if(BUtils.rayCasting({x:e.offsetX,y:e.offsetY},ploye)!= 'out'){
                    if(event.event == 'mousemove')
                    event.func(e);
                }else{
                    if(event.event == 'mouseover')
                    event.func(e);
                }
            }
        });


    },

    createWindow:function(x,y,w,h,borderStyle,ele,fps){
        var canvas=document.createElement("canvas");
        canvas.style.left=x+'px';
        canvas.style.top=y+'px';
        canvas.width=w;
        canvas.height=h;
        this.width=w;
        this.height=h;
        canvas.style.border=borderStyle;
        canvas.id=this.canvasId;
        if(fps == undefined || fps == null) fps=1000/60;
        this.fps=fps;
        ele.appendChild(canvas);
        this.canvasObj = canvas;
    },
    end:function(){},
    toDataURL:function () {
        return this.canvasObj.toDataURL();
    },
    toBlob:function () {
        return this.canvasObj.toBlob();
    },
    mozGetAsFile:function () {
        return this.canvasObj.mozGetAsFile();
    },
    mozFetchAsStream:function () {
        return this.canvasObj.mozFetchAsStream();
    },
    eventLoop: []
};

//todo 游戏引擎对象
//--------------------------------------基础类-----------------------------------------------------
//event
function BEvent(){
    BObject.call(this);

    this.on = function(eventType,func){
        BGame.eventLoop[eventType+this.UUID] = {func:func,obj:this,event:eventType};
    };
    
    this.emit = function(eventType) {
        BGame.eventLoop[eventType+this.UUID].func(BGame.eventLoop[eventType+this.UUID].obj);
    };
}


//容器对象
function BContainer(){
    BObject.call(this);
    BMove.call(this);
    this.nodeList = new Array();
    this.parentNode = null;
    this.z_index = 0;
    this.addChild=function(container){
        this.nodeList.push({uuid:container.UUID,node:container});
        container.setParentNode(this);
        this.z_index ++;
    };
    this.setParentNode = function (container) {
        this.parentNode = container;
    };
    this.getParentNode = function () {
        return this.parentNode;
    };
    this.removeChild=function(container){
        for(var i=0;i<this.nodeList.length;i++)
        {
            if(this.nodeList[i].uuid == container.UUID){
                this.nodeList.splice(i,1);
                break;
            }

        }
    };
    //设置层级
    this.setZindex = function(val){
        this.getParentNode().nodeList[val] = {uuid:this.UUID,node:this};
        this.getParentNode().removeChild(this);
    };
    this.topDraw=function(){
        for(var i=0;i<this.nodeList.length;i++){

            if(this.nodeList[i] == null || this.nodeList[i] == undefined){
                continue;
            }

            //如果是活跃节点
            if(this.nodeList[i].node.isActive){
                BGame.BContext.save();
				this.nodeList[i].node.transform();
                this.nodeList[i].node.draw();
                BGame.BContext.restore();
            }

            if(this.nodeList[i].node.actions!=undefined && this.nodeList[i].node.actions!=null){
                this.nodeList[i].node.actions();
            }

            //判断是否为非point属性 设置基础属性
            if(this.x != undefined){
                this.nodeList[i].node.setBasePosition({x:this.x(),y:this.y()});
            }
        }
    };
}
function BDraw(){
    //是否活跃
    this.isActive = true;

    this.Paint = new BPaint(BGame.BContext);

    BObject.call(this);

    this.draw=function(){

    }
}


//点对象 抽象x,y
function BPoint(){
    BObject.call(this);
    //
    this.real_x = 0;
    this.real_y = 0;

    //继承坐标偏移
    this.baseX=0;
    this.baseY=0;
    //中心点坐标偏移
    this.coreOffsetX = 0;
    this.coreOffsetY = 0;
    //坐标
    this.posX=0;
    this.posY=0;
    this.oldPosX=99999;
    this.oldPosY=99999;

    //设置继承坐标
    this.setBasePosition=function(pos) {
        this.baseX = pos.x;
        this.baseY = pos.y;
    };

    // 设置中心点偏移 用于坐标中心点设置
    this.setCoreOffsetPosition = function (pos) {
        this.coreOffsetY = pos.y;
        this.coreOffsetX = pos.x;
    };

    //设置基础坐标
    this.setPosition=function(pos){
        if(this.oldPosX==99999) {
            this.oldPosX = pos.x * this.multiple.width;
        }else{
            this.oldPosX= this.posX;
        }
        if(this.oldPosY==99999){
            this.oldPosY= pos.y * this.multiple.height;
        }else{
            this.oldPosY= this.posY;
        }
        this.posX = pos.x;
        this.posY = pos.y;
    };

    //实际坐标X
    this.X = function () {
        return this.real_x;
    };
    //实际坐标Y
    this.Y = function () {
        return this.real_y;
    };

}

//面积
function BVolume() {

    this.width = 0;

    this.height = 0;

    //宽度
    this.setWidth = function (width) {
       this.width = width;
    };

    this.setHeight = function (height) {
       this.height = height;
    }

}

//transform 用于构建复杂世界坐标
function BTransform(){
    BVolume.call(this);
    BPoint.call(this);
    this.scaleX = 1;
    this.scaleY = 1;
    this.angle = 0;
    this.translateX = 0;
    this.translateY = 0;

    this.corePos = {x:0,y:0};

    //论如何构建世界坐标
    this.multiple = {width:1,height:1};

    this.deviation = {x:0,y:0};

    this.action = new BActions(BGame.BContext);

    this.transform = function () {
        //重置上下文环境
        this.action.resetTransform();

        this.action.scale(this.scaleX,this.scaleY);
        this.action.rotate(this.angle,{x:this.corePos.x+this.x(),y:this.corePos.y+this.y()});
        this.action.translate(this.translateX,this.translateY);
    };

    this.clearTransform = function () {
        // this.action.translate(-this.translateX,-this.translateY);
        // this.action.rotate(0,{x:this.corePos.x+this.x(),y:this.corePos.y+this.y()});
        // this.action.resetTransform();
        // BGame.BContext.rotate(0);
        // this.action.rotate(0,{x:this.corePos.x+this.x(),y:this.corePos.y+this.y()});
    };


    this.scale=function(x,y){
        this.scaleX=x;
        this.multiple.width = 1 / this.scaleX;
        this.scaleY=y;
        this.multiple.height = 1 / this.scaleY;
    };


    this.rotate = function (angle) {
        this.angle = angle;
    };

    //尽量不使用
    this.translate = function (x,y) {
        this.translateX = x;
        this.translateY = y;
    };

    //设置中心点 width / 2  1 ---- 2
    this.setCorePos = function (pos) {
        this.corePos = {x:pos*this.width,y:this.height*pos};
        this.setCoreOffsetPosition({x:-this.corePos.x,y:-this.corePos.y});
    };

    //--------------坐标------------------

    //基础坐标+中心点偏移+父节点继承坐标 = 真实坐标
    this.x = function(){
        return this.posX + this.coreOffsetX + this.baseX;
    };

    this.y = function() {
        return this.posY + this.coreOffsetY +  this.baseY;
    };

    this.realX = function () {
        return this.real_x;
    };

    this.realY = function () {
        return this.real_y;
    };

    //设置精准的世界坐标 依绘图
    this.setPos = function (pos) {

        var incX = pos.x- this.real_x;
        var incY = pos.y - this.real_y;

        //记录真实坐标
        this.real_x = pos.x;
        this.real_y = pos.y;

        //设置基础坐标
        this.setPosition({x:this.posX   + (this.multiple.width*incX),y:this.posY  + (this.multiple.height*incY)});
    };

    //宽度
    this.getWidth = function (width) {
        return this.width / this.multiple.width;
    };

    this.getHeight = function (height) {
       return  this.height / this.multiple.height;
    }
}

//对象克隆
function BClone(){
    BObject.call(this);
    this.clone=function(){
        var o, obj;
        obj=this;
        if (obj.constructor == Object){
            o = new obj.constructor();
        }else{
            o = new obj.constructor(obj.valueOf());
        }
        for(var key in obj){
            if ( o[key] != obj[key] ){
                if ( typeof(obj[key]) == 'object' ){
                    // o[key] = this.clone(obj[key]); //这里屏蔽了深层复制
                }else{
                    o[key] = obj[key];
                }
            }
        }
        o.toString = obj.toString;
        o.valueOf = obj.valueOf;
        return o;
    }
}
/*动作执行类**/
function BMove(){
    BObject.call(this);
    this.acObj= new Array();
    this.isActionActive  = true;
    this.actions=function(){
        if(!this.isActionActive) return false;
        if(this.acObj!=undefined && this.acObj!=null){
            for(uid in this.acObj){
                if(this.acObj[uid].isActive){
                    this.acObj[uid].executed(this);
                    this.acObj[uid].draw(this);
                }
            }
        }
    };
    this.runAction=function(action){
        if(!this.acObj[action.UUID]){

            this.acObj[action.UUID] = action;
        }
        action.isActive = true;

    };

    this.stopAction = function (action) {
        action.isActive = false;
    };

    //移除
    this.removeAction = function (action) {
        
    };

    this.stopALLAction=function(){
        this.isActionActive = false;
    }
}

//-----------------------------基本继承节点--------------------------------------------------

function BNode(){
    BContainer.call(this);
    BDraw.call(this);
    BClone.call(this);
    // BMove.call(this);
    BTransform.call(this);
    BSchedule.call(this);

    BEvent.call(this);

    //设置中心点
    // this.corePos.x = this.width/2;
    // this.corePos.y = this.height/2;

}
//-----------------------------------场景精灵---------------------------------------------------
//场景 切换场景
function  BScene(){
    BNode.call(this);

    //这里配置width
    this.width = BGame.width;
    this.height = BGame.height;

    this.draw=function(){
        this.Paint.clearRect(0,0,this.width,this.height);
        this.topDraw();
    };

    this.toString=function(){
        return 'BScene Object';
    };
}
function BLayer(){
    BNode.call(this);
    // this.addChild=function (container) {
    //     BNode.addChild(container);
    //     this.setWidth(this.parentNode.width);
    //     this.setHeight(this.parentNode.height);
    // };
    this.draw=function(){
        this.topDraw();
    };
    this.toString=function(){
        return 'BLayer Object';
    };
}
//申明一个精灵。然后一系列的操作 width 和 height 只是事实上的约束
function  BSprite(w,h){
    BNode.call(this);
    this.width = w;
    this.height = h;
    this.call=function(){
        alert('call');
    };
    this.toString=function(){
        return 'BSprite Object';
    };
}
/*
 start	默认。文本在指定的位置开始。
 end	文本在指定的位置结束。
 center	文本的中心被放置在指定的位置。
 left	文本左对齐。
 right	文本右对齐。
*/
function BTextSprite(){
    BSprite.call(this,0,0);

    this.maxWidth=2000;

    this.color = '#000';

    this.tobj = {};

    //设置内容
    this.setText=function(text){
        this.tobj.text=text;
        this.width=this.Paint.measureText(this.tobj.text).width;
    };
    //设置样式
    this.setFontStyle = function(fontStyle){
        this.tobj.font = fontStyle;
    };
    //设置对齐方式
    this.setAlign = function (align) {
        this.tobj.align = align;
    };

    this.setColor = function(color){
        this.color = color;
    };

    this.draw=function(){

        this.Paint.setColor(this.color);

        if(this.tobj.font!=undefined && this.tobj.font!=null)
            this.Paint.font(this.tobj.font);
        if(this.tobj.align!= undefined && this.tobj.align!=null)
            this.Paint.textAlign(this.tobj.align);
        if(this.tobj.style=='stroke'){
            this.Paint.strokeText(this.tobj.text,this.x(),this.y(),this.maxWidth);
        }else{
            this.Paint.fillText(this.tobj.text,this.x(),this.y(),this.maxWidth);
        }
    };
}


function BImageSprite(){
    BSprite.call(this);
    this.width=100;
    this.height=100;
    this.imgInfo={
        'model':'normal', /*normal change cut*/
        'elem':null,
        'sx':0,
        'sy':0,
        'swidth':0,
        'sheight':0
    };
    this.setImageData=function(elem){
        this.imgInfo.elem=elem;
        this.width=elem.width;
        this.height=elem.height;
    };
    this.draw=function(){

        if(this.imgInfo.model == 'normal'){
            this.Paint.drawImage(this.imgInfo.elem,this.x(),this.y(),this.width,this.height);
        }else if(this.imgInfo.model == 'cut'){
            this.Paint.drawImageCut(this.imgInfo.elem,this.imgInfo.sx,this.imgInfo.sy,this.imgInfo.swidth,this.imgInfo.sheight,this.x(),this.y(),this.width,this.height);
        }else{

        }
    };

}


//导演类
function BDirector(){
    BObject.call(this);
    this.game;
    this.sceneList=new Array();
    this.runScene=null;
    this.isRun = false;
    this.addScene=function(scene){
        this.sceneList.push({scene:scene,sceneId:BUtils.uuid()});
        if(this.runScene==null){
            this.runScene=this.sceneList[0].scene;
        }
    };
    this.popScene=function(){
        return this.sceneList.pop();
    };
    this.switchScene=function(scene){
        this.runScene=scene;
        this.flushScene();
    };
    this.switchSceneAdd=function(scene){
        this.runScene=scene;
        this.addScene(scene);
        this.flushScene();
    };
    this.switchSceneId=function(sceneId){
        for(var i=0;i<this.sceneList.length;i++){
            if(this.sceneList[i].sceneId==sceneId){
                this.runScene=this.sceneList[i].scene;
                this.flushScene();
                break;
            }
        }
    };
    this.init=function(game){
        this.game=game;
    };

    //主刷新循环
    this.run=function(){
        var scene=this.runScene;
        //兼容
        if(!window.requestAnimationFrame){
            var lastTime = 0;
            window.requestAnimationFrame = function(callback){
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0,16.7-(currTime - lastTime));
                var id  = window.setTimeout(function(){
                    callback(currTime + timeToCall);
                },timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            }
        }
        if(!this.isRun){
            BFrame.scene = scene;
            BFrame();
            this.isRun = true;
        }
        // this.flushId=setInterval(function(){
        //     //todo 状态保存
        //     BGame.BContext.save();
        //     scene.draw();
        //     //todo 状态恢复
        //     BGame.BContext.restore();
        // },this.game.fps);
    };
    this.stop=function(){
        // clearInterval(this.flushId);

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
        cancelAnimationFrame(BFrame.frameID)
        this.isRun = false;
    };
    this.flushScene=function(){
        this.stop();
        this.run();
    };
}

//kelent
function BFrame(time) {
    BGame.fps = 1000/(time-BFrame.preTime);
    BFrame.preTime = time;
    //todo 状态保存
    BGame.BContext.save();
    BFrame.scene.draw();
    //todo 状态恢复
    BGame.BContext.restore();

    BFrame.frameID = window.requestAnimationFrame(BFrame);
}

//调度器
function BSchedule(){
    BObject.call(this);
    this.scheduleList=new Array();
    this.schedule=function(func,time){
        var sid=BUtils.uuid();
        this.scheduleList.push({schedule:setInterval(function(){
            func();
        },time),sid:sid});
        return sid;
    };
    this.schedulerUpdate=function(func){
        var sid=BUtils.uuid();
        this.scheduleList.push({schedule:setInterval(function(){
            func();
        },BGame.fps),sid:sid});
        return sid;
    };
    this.scheduleOnce=function(func,time){
        var sid=BUtils.uuid();
        this.scheduleList.push({schedule:setTimeout(function(){
            func();
        },time),sid:sid});
        return sid;
    };
    this.stopSchedule=function(sid){
        for(var i=0;i<this.scheduleList.length;i++){
            if(this.scheduleList[i].sid==sid){
                clearInterval(this.scheduleList[i].schedule);
                break;
            }
        }
    };
}

//----------------------------动作类---------------------------------------
//动作
function BAction() {
    BObject.call(this);
    BDraw.call(this);
    //是否处于活跃状态
    this.isActive = true;
    this.executed=function(obj){

    };
    this.toString=function(){
        return 'BAction Objext';
    };
}

//动画构造类
//数据来源 image canvas
function BAnimateFrame() {
    BAction.call(this);
    this.frameData = null;
    this.draw=function(obj){
        obj.transform();
        this.bimage.drawImageCut(this.frameData.frameSource,this.frameData.x,this.frameData.y,this.frameData.width,this.frameData.height,obj.x(),obj.y(),this.frameData.width,this.frameData.height);
    };
}
function BAnimate(speed) {
    BAction.call(this);
    BSchedule.call(this);
    this.animateFrame = new Array();
    this.speed = (speed)?speed:1000;
    //自动创建AnimateFrame
    this.splitImage = function(w,image){
        for(var i=0;i<w;i++){
            this.animateFrame.push({x:i*(image.width/w),y:0,width:image.width/w,height:image.height,frameSource:image});
        }
    };
    //自动创建AnimateFrame
    this.splitImageLattice = function(w,h,image){
        for(var i=0;i<h;i++){
            for(var j=0;j<w;j++){
                this.animateFrame.push({x:j*(image.width/w),y:i*image.height/h,width:image.width/w,height:image.height/h,frameSource:image});
            }
        }
    };

    this.addAnimateFrame = function (animateFrame) {

    };

    this.index =0;

    var that = this;

    this.draw=function(obj){
        obj.transform();
        var currentTexture = this.animateFrame[this.index];
        this.Paint.drawImageCut(currentTexture.frameSource,currentTexture.x,currentTexture.y,currentTexture.width,currentTexture.height,obj.x(),obj.y(),currentTexture.width,currentTexture.height);
    };

    this.schedule(function () {
        that.index ++;
        if(that.index>=that.animateFrame.length) that.index=0;
    },this.speed);
}

//todo 连续移动
function BTrajectory() {
    BAction.call(this);
    this.posLst = new Array();
    this.join=function(x,y,speed){
        this.posLst.push({
            x:x,
            y:y,
            speed:speed,
            flag:false
        });
        return this;
    };
    this.executed=function(obj){
        var pos = {};
        var failLen = 0;
        for(var i=0;i<this.posLst.length;i++){
            if(!this.posLst[i].flag){
                pos = this.posLst[i];
                var xSpeed = (pos.x-obj.X()>0)?pos.speed:-pos.speed;
                var ySpeed = (pos.y-obj.Y()>0)?pos.speed:-pos.speed;
                if(obj.X()>=pos.x-pos.speed && obj.X()<=pos.x+pos.speed){
                    xSpeed = 0;
                }
                if(obj.Y()>=pos.y-pos.speed && obj.Y() <= pos.y+pos.speed){
                    ySpeed = 0;
                }
                if(xSpeed ==0 && ySpeed == 0) this.posLst[i].flag = true;

                obj.setPos({x:obj.X()+xSpeed,y:obj.Y()+ySpeed});
                //obj.setPosition({x:obj.posX/obj.multiple.width+xSpeed,y:obj.posY/obj.multiple.height+ySpeed});

                break;
            }else {
                failLen ++;
            }
        }
        if(failLen == this.posLst.length) this.isActive = false;
        //

    };
}

//todo 超某方向移动
function BMoveTo(mx,my,speed){
    BAction.call(this);
    this.executed=function(obj){
        var xSpeed = (mx > obj.X())?speed:-speed;
        var ySpeed = (my > obj.Y())?speed:-speed;
        //证明已到
        if(obj.X()>=mx-speed && obj.X() <= mx + speed){
            xSpeed = 0;
        }
        if(obj.Y()>=my - speed && obj.Y() <= my + speed){
            ySpeed = 0;
        }

        if(xSpeed == 0 && ySpeed ==0) this.isActive = false;

        obj.setPos({x:obj.X()+xSpeed,y:obj.Y()+ySpeed});
    };
}




//todo 弹力球
function bollMove(lx,ly){
    BAction.call(this);
    this.xflag=1;
    this.yflag=1;

    //预判
    if(lx < 0) this.xflag = 1; else this.xflag=0;

    if(ly <0) this.yflag = 1; else this.yflag =0;

    this.executed=function(obj){

        if(obj.Y() >= BGame.height ){
            this.yflag=1;
        }
        if(obj.X()>= BGame.width ){
            this.xflag=1;
        }

        if(obj.X()<=0){
            this.xflag=0;
        }
        if(obj.Y()<=0){
            this.yflag=0;
        }
        if(this.xflag==0){
            obj.setPos({x:obj.X()+Math.abs(lx),y:obj.Y()});
            // obj.setPos({x:obj.x()+Math.abs(lx),y:obj.y()});
        }
        if(this.xflag==1){
            // obj.setPos({x:obj.x()-Math.abs(lx),y:obj.y()});
            obj.setPos({x:obj.X()-Math.abs(lx),y:obj.Y()});
        }
        if(this.yflag==0){
            // obj.setPos({x:obj.x(),y:obj.y()+Math.abs(ly)});
            obj.setPos({x:obj.X(),y:obj.Y()+Math.abs(ly)});
        }
        if(this.yflag==1){
            // obj.setPos({x:obj.x(),y:obj.y()-Math.abs(ly)});
            obj.setPos({x:obj.X(),y:obj.Y()-Math.abs(ly)});
        }
    }
}
//todo 旋转
function BRotate(speed) {
    BAction.call(this);

    this.executed=function(obj){
        obj.rotate(obj.angle+speed);
        if(obj.angle==1) obj.angle = 0;

    }
}

function BJump(height) {
    BAction.call(this);
    
    this.executed = function (obj) {
        var dist_posX = obj.Y() - height;

    }
}


//资源管理器
function BExplorer(director){
    BObject.call(this);
    this.director = director;
    this.IMG = {};
    this.loadImages =function (sources,func,callback) {
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for (var src in sources) {
            numImages++;
        }

        for (var src in sources) {

            this.IMG[src] = new Image();

            //图片执行完成
            this.IMG[src].onload = function(){
                //当所有图片加载完成时，执行回调函数callback
                if (++loadedImages >= numImages) {
                    callback();
                }

                //重绘一个进度条
                func(loadedImages,numImages);
            };

            this.IMG[src].src = sources[src];
        }
    } 
}
//-----------------------------------UI高级类-----------------------------------------------
//todo UI
function BProgressBar() {
    BNode.call(this);

    this.totalNumber = 0;
    this.currentNumber = 0;
    this.lineWidth = 10;

    this.backColor = "#eee";

    this.textColor ="#000";

    this.fontColor = "#000";

    this.fontStyle = {};

    //设置
    this.setLength = function (len) {
      this.totalNumber = len;
    };

    this.setVal = function (num) {
        this.currentNumber = num;
    };

    //设置底色
    this.setbackColor = function (color) {
        this.backColor = color;
    };
    //设置前色
    this.setfontColor = function (color) {
        this.fontColor = color;
    };

    this.setTextColor = function (color) {
        this.textColor =   color;
    };

    //设置进度条大小
    this.setRound = function(width){
        this.lineWidth = width;
    };

    this.setFontStyle = function (fontStyle) {
        this.fontStyle = fontStyle;
    };

    //绘图
    this.draw=function(){

        var ctx = BGame.BContext;
        //设置样式
        ctx.lineCap="round";
        ctx.lineJoin="round";
        ctx.lineWidth=this.lineWidth;
        //设置字体样式
        ctx.font = this.fontStyle;
        ctx.fillStyle = this.textColor;
        ctx.fillText('加 载 : '+this.currentNumber+' / '+this.totalNumber,this.x(),this.y());
        ctx.save();
        ctx.strokeStyle=this.backColor;
        ctx.beginPath();
        ctx.moveTo(this.x(),this.y()+this.height);
        ctx.lineTo(this.x()+this.width,this.y()+this.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.restore();
        ctx.strokeStyle=this.fontColor;
        ctx.moveTo(this.x(),this.y()+this.height);
        ctx.lineTo(this.currentNumber/this.totalNumber*this.width+this.x(),this.y()+this.height);
        ctx.stroke();

        // this.topDraw();
    };
    
}

function BImageButton() {
    BNode.call(this);

    this.backgoundImage = {};

    this.text = 'button';
    this.fontSize = 14;
    this.textWidth = this.Paint.measureText(this.text).width;

    this.setBackGroundImage = function (image) {
        this.backgoundImage = image;
        this.width=image.width;
        this.height=image.height;
    };


    this.setText = function(text){
        this.text = text;
        this.textWidth = this.Paint.measureText(text).width;
    };


    this.draw=function(){

        this.Paint.drawImage(this.backgoundImage,this.x(),this.y(),this.width,this.height);
        //设置按钮文字
        this.Paint.font(this.fontSize+'px Arial');
        this.Paint.fillText(this.text,this.x()+(this.width-this.textWidth-this.fontSize)/2,this.y()+(this.height+this.fontSize)/2);

    };
}
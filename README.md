# Draw.js
一个基于h5 canvas实现的简单游戏引擎。

## demo
#### 创建一个画布
```javascript
    BGame.createWindow(0,0,1200,700,'1px solid #eee',document.getElementById('canvas'));
    BGame.init();
```
#### 创建一个导演
```javascript
    var director= new BDirector();
    director.init(BGame);
```
#### 布置一个场景
```javascript
    var scene =new BScene();
```
#### 绘制一个精灵
```javascript
    var rectSprite = new BSprite(100,100);

    rectSprite.draw = function () {
        this.transform();
        //画笔对象 
        this.Paint.fillRect(this.x(),this.y(),100,100);
    };
    //设置坐标中心点
    rectSprite.setCorePos(0.5);
    //设置位置 坐标系为右上角 0,0
    rectSprite.setPos({x:100,y:100});
    //设置scale属性
    rectSprite.setScale(0.5,0.5);
```
#### 添加精灵到场景中
```javascript
    scene.addChild(rectSprite)
```
#### 导演开始工作
```javascript
    director.run();
```

详细demo见源码。

#### 欢迎大家进行交流。邮箱: 34852148@qq.com

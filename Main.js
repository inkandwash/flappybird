import { DataStore } from "./js/base/DataStore";
//游戏开始入口，初始化整个游戏的元素

import { Resources } from "./js/base/Resourse";
import { ResourceLoader } from "./js/base/ResourseLoad";
import { Sprite } from "./js/base/Sprite";
import { Director } from "./js/Director";
import { playbgm } from "./js/music";
import { Birds } from "./js/player/Birds";
import { Score } from "./js/player/Score";
import { StartButton } from "./js/player/StartButton";
import { Background } from "./js/runtime/Background";
import { Land } from "./js/runtime/Land";
import wxapi from "./js/WxApi";

export class Main{//定义main类
   constructor(){//构造函数，初始化数据 new的时候调用该方法
     console.log("游戏开始");
     //初始化过程中用的的数据
     this.canvas=wx.createCanvas();//获取canvas
     this.ctx=this.canvas.getContext("2d");//获取ctx
     this.loader=new ResourceLoader();//创建资源加载器实例对象
     //console.log(this.loader);
     //获取变量池(单例模式)
     this.store=DataStore.getInstance();
     //获取导演(单例模式)
     this.director=Director.getInstance();
     //调用ResourceLoader的onloaded方法 确保图片已经加载完成
     this.loader.onloaded().then(map=>this.onResourceLoaded(map));
   }
   //图片加载完成后 
   onResourceLoaded(map){
     //将游戏数据保存到变量池
     //使用属性的方式保存数据 而不是调用datastore中的put保存数据 put保存的数据会在游戏结束时销毁 这些数据在游戏结束时不会销毁
     this.store.res=map;
     this.store.canvas=this.canvas;
     this.store.ctx=this.ctx;
     //playbgm();
     //wxapi.createUserInfoButton();
     //wxapi.getUserInfo();
     wxapi.getTelInfo();
     this.init();//调用初始化游戏方法
     
   }
   //初始化游戏数据
   init(){
     this.director.isGameOver=false;
    //将游戏数据初始化 保存到变量池中
    //使用DataStore的put保存 因为这些数据在游戏结束后会被销毁
    this.store
             .put("background",new Background())
             .put("land",new Land())
             .put("pipes",[])//pipes是多个水管 每次出现时一组组出现
             .put("birds", new Birds())
             .put("startButton",new StartButton())
             .put("score",new Score())
             
     //先调用一次出界水管的方法
     this.director.createPipes();
     //调用导演run方法来运行程序
     this.director.run();
     this.addEvent();
   }

   //监听点击事件
   addEvent(){
     //手机报错addEventListener is not a function
     //  this.canvas.addEventListener("touchstart",()=>{
     //需要使用wx提供的api
     wx.onTouchStart(e => {
       //console.log(e);
       let {clientX,clientY}=e.touches[0];
       if(this.director.isGameOver){
         //游戏结束 单击重新开始按钮 游戏重启
         let land=Sprite.getImage("land")
         let btn=Sprite.getImage("startButton")
         //定义重新开始按钮啊矩形范围
         let startX=(this.canvas.width-btn.width)/2; //矩形起点x坐标
         let startY=(this.canvas.height-btn.height)/2;//矩形起点y坐标
         let endX=startX+btn.width;
         let endY=startY+btn.height;
         //判断触摸点是否在矩形范围内
         if(
           clientX>startX &&
           clientX<endX   &&
           clientY>startY &&
           clientY<endY
          ){
           this.init();
        }else{
          //wxapi.showKeyboard();
        } 
       }else{
          this.director.birdsUp();
       }
     })
   }

}
import { DataStore } from "./js/base/DataStore";
//游戏开始入口，初始化整个游戏的元素

import { Resources } from "./js/base/Resourse";
import { ResourceLoader } from "./js/base/ResourseLoad";
import { Director } from "./js/Director";
import { Birds } from "./js/player/Birds";
import { Background } from "./js/runtime/Background";
import { Land } from "./js/runtime/Land";

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
     this.init();//调用初始化游戏方法
     
   }
   //初始化游戏数据
   init(){
    //将游戏数据初始化 保存到变量池中
    //使用DataStore的put保存 因为这些数据在游戏结束后会被销毁
    this.store
             .put("background",new Background())
             .put("land",new Land())
             .put("pipes",[])//pipes是多个水管 每次出现时一组组出现
             .put("birds", new Birds())
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
     wx.onTouchStart((result) => {
       //console.log(11);
       if(this.director.isGameOver){

       }else{
          this.director.birdsUp();
       }
     })
   }
}
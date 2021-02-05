import { DataStore } from "../base/DataStore";
//地板图

import { Sprite } from "../base/Sprite"

export class Land extends Sprite{
  constructor(){
     //获取地板图片对象
     let img=Sprite.getImage("land");
     let canvas=DataStore.getInstance().canvas;
     let w=canvas.width;
     let h=canvas.height;
     let y=h-img.height;//在画布上的起点的y坐标
     //重写父类构造
     super(img,0,0,img.width,img.height,0,y,img.width,img.height);
  }
  //重写父类draw方法 实现地板移动修改
  draw(){
    this.x=this.x-2;//使地板图在画布上的坐标向左偏移2个像素
    //重置地板this.x的值 防止地板断层
    if(this.x< DataStore.getInstance().canvas.width-this.srcW){
      this.x=0;
    }
    super.draw();//重写draw方法
  }
}
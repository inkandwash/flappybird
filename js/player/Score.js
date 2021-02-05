//得分
//得分不是一个图片 不需要继承Sprite

import { DataStore } from "../base/DataStore";

export class Score{
  constructor(){
    this.scoreNumber=0;//积分器
    this.dataStore=DataStore.getInstance();
    this.ctx=this.dataStore.ctx;
    this.canAdd=true;
  }
  //画分数
  draw(){
    this.ctx.font="25px 微软雅黑";
    this.ctx.color="red";
    this.ctx.fillText(
      this.scoreNumber,
      this.dataStore.canvas.width/2,
      this.dataStore.canvas.height/9
    )
  }

}
import { DataStore } from "../base/DataStore";
//重新开始按钮

import { Sprite } from "../base/Sprite";

export class StartButton extends Sprite{
  constructor(){
    let img=Sprite.getImage('startButton');
    let canvas=DataStore.getInstance().canvas;
    let w=canvas.width;
    let h=canvas.height;
    let x=(w-img.width) /2;
    let y=(h-img.height) /2;
    super(img,0,0,img.width,img.height,x,y,img.width,img.height);
  }
  
}
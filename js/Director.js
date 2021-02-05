//导演类
//控制游戏逻辑
import { DataStore } from "./base/DataStore";
import { UpPipe } from "./runtime/UpPipe";
import { DownPipe } from "./runtime/DownPipe";


export class Director{
  constructor(){
    //获取变量池 方便获取或修改其中保存的变量
    this.dataStore=DataStore.getInstance();
  }

  //导演也必须是一个单例
  static getInstance(){
    if(!Director.instance){
      Director.instance=new Director();
    }
    return Director.instance;
  }
  //创建水管
  createPipes(){
    //设置水管初始位置高度范围
    let minTop=this.dataStore.canvas.height/8;
    let maxTop=this.dataStore.canvas.height/2;
    let top=minTop+Math.random()*(maxTop-minTop);
    //创建一组上下水管 存入变量池的pipes数组中
    this.dataStore.get("pipes").push(new UpPipe(top))
    this.dataStore.get("pipes").push(new DownPipe(top))
  }
  //小鸟向上飞
  birdsUp(){
    for(let i=0;i<3;i++){
      this.dataStore.get("birds").y[i]=this.dataStore.get("birds").birdsY[i];
    }
    this.dataStore.get("birds").time=0;//重置自由落体时间
    
  }
  //判断小鸟和某一个水管是否相撞
  isStrike(bird,pipe){
     let strike=true;//假设相撞
     if(
       bird.right<pipe.left||
       bird.left>pipe.right||
       bird.bottom<pipe.top||
       bird.top>pipe.bottom
     ){
       //没有相撞
       strike=false;
     }
     return strike;
  }
  //判断游戏结束的条件
  check(){
    //游戏结束的条件：撞天 撞地 撞水管
    let pipes=this.dataStore.get('pipes')
    let birds=this.dataStore.get('birds')
    let land=this.dataStore.get('land')
    //撞天(小鸟的birdsY坐标小于0) 撞地(小鸟的birdsY坐标+自身的高大于地板的位置)
    if(birds.birdsY[0]<0||birds.birdsY[0]+birds.clippingHeight[0]>land.y){
      this.isGameOver=true;
      return;
    }
    //判断小鸟与水管是否相撞
    let birdsBorder={
        top:birds.birdsY[0],
        botton:birds.birdsY[0]+birds.clippingHeight[0],
        left:birds.birdsX[0],
        right:birds.birdsX[0]+birds.clippingWidth[0]
    } 
    //遍历水管 获取每一根水管的四边
    for(let i=0;i<pipes.length;i++){
      let p=pipes[i];
      let pipesBorder={
          top:p.y,
          bottom:p.y+p.height,
          left:p.x,
          right:p.x+p.width
      }
      //判断小鸟和每一根水管的位置关系
      if(this.isStrike(birdsBorder,pipesBorder)){
        this.isGameOver=true;
        return;
      }
    }
  }
  //程序运行的方法
  run(){
    //先检查游戏有没有结束
    this.check();
    if(!this.isGameOver){
       //从变量池中获取图片并将其渲染在屏幕上
    this.dataStore.get("background").draw();
   
    //获取水管数组  
    let pipes= this.dataStore.get("pipes");
    //删除出界的水管 条件水管x坐标小于水管的宽度的负值
    if(pipes[0].x<-pipes[0].w && pipes.length==4){
      //删除上下两个水管shift两次
       pipes.shift();
       pipes.shift();
    }
    //添加下一组水管 条件当前只有一组水管且已经越过中线
    if(pipes[0].x<this.dataStore.canvas.width/2 &&pipes.length==2){
         this.createPipes();
    }
    pipes.forEach(pipe=>{//遍历水管数组 获取里面每一个水管对象
        pipe.draw();
    })

    this.dataStore.get("birds").draw();
    this.dataStore.get("land").draw();
    this.id= requestAnimationFrame(()=>this.run())
   
    }else{//游戏结束
       cancelAnimationFrame(this.id);
    }
  } 
}
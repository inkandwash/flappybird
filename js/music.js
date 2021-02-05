// export let playbgm=function(){
//   let audio=wx.createInnerAudioContext();
//   audio.src="audio/bgm.mp3";
//   audio.autoplay=true;//设置自动播放
//   audio.loop=true;//循环播放
//   //手动调用播放方法
//   //audio.play();

// }

function playMusic(src="",loop=false){
  return function(){
    let audio = wx.createInnerAudioContext();
    audio.src = src;
    audio.loop = loop;
    audio.play();
  }
}
let bgm = "https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2020/03/20/20a_Lang/01.mp3";
export let playbgm = playMusic(bgm, true);

export let boom = playMusic("audio/boom.mp3");

export let bullet = playMusic("audio/bullet.mp3");
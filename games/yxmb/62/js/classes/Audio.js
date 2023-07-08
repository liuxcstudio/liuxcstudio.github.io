(function(){var Audio={mute:false,buzzGroup:null,list:{},play:function(id,resumePlay){if(this.list[id]&&!this.mute){if(!resumePlay){this.list[id].setTime(0);}
this.list[id].play();}},pause:function(id){this.list[id].pause();},pauseAll:function(){buzz.all().pause();}}
window.Audio=Audio;})();
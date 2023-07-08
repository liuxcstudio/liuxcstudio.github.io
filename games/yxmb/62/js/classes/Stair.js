(function(){var Stair=function(cfg){this.name='';this.prop=null;Stair.superclass.constructor.call(this,cfg);}
my.inherit(Stair,my.Sprite);Stair.prototype.init=function(){this.width=256;this.height=128;this.x=my.Math.random(10,313);var stairTypes=['stair_friable','stair_moveable','stair_stable_01','stair_stable_02','stair_stable_03','stair_stable_04','stair_stable_05'];var name=stairTypes[my.Math.random(0,6)];if(name=='stair_moveable'){this.speedX=my.Math.random(10,20)/100;if(my.Math.random(0,1)){this.speedX=-this.speedX;}
this.update=this.__moveableUpdate;}
var anim=new my.Animation({image:my.ImageManager.get(name),frames:getStairFrames(name),loop:false});anim.init();this.name=name;this.anim=anim;Stair.superclass.init.call(this);}
Stair.prototype.__moveableUpdate=function(deltaTime){if((this.x<0&&this.speedX<0)||(this.x>322&&this.speedX>0)){this.speedX=-this.speedX;}
if(this.prop&&this.lastX!=0){this.prop.x+=(this.x-this.lastX);}
Stair.superclass.update.call(this,deltaTime);}
window.Stair=Stair;})();
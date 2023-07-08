(function(){var DisplayObject=function(cfg){this.x=0;this.y=0;this.width=0;this.height=0;this.alpha=1;this.rotation=0;this.flipX=false;this.flipY=false;this.scaleX=1;this.scaleY=1;this.visible=true;DisplayObject.superclass.constructor.call(this,cfg);}
my.inherit(DisplayObject,my.Component);DisplayObject.prototype.onshow=my.fn;DisplayObject.prototype.onhide=my.fn;DisplayObject.prototype.onupdate=my.fn;DisplayObject.prototype.onrender=my.fn;DisplayObject.prototype.ondraw=my.fn;DisplayObject.prototype.show=function(){this.visible=true;this.onshow();}
DisplayObject.prototype.hide=function(){this.visible=false;this.onhide();}
DisplayObject.prototype.update=function(deltaTime){if(this.onupdate){this.onupdate();}}
DisplayObject.prototype.__transform=function(context){context.translate(this.x,this.y);if(this.alpha<1){context.globalAlpha=this.alpha;}
if(this.rotation%360>0){var offset=[this.width/2,this.height/2];context.translate(offset[0],offset[1]);context.rotate(this.rotation%360/180*Math.PI);context.translate(-offset[0],-offset[1]);}
if(this.flipX||this.flipY){context.translate(this.flipX?this.width:0,this.flipY?this.height:0);context.scale(this.flipX?-1:1,this.flipY?-1:1);}
if(this.scaleX!=1||this.scaleY!=1){context.scale(this.scaleX,this.scaleY);}}
DisplayObject.prototype.render=function(context){if(!this.visible||this.alpha<=0){return false;}
context.save();this.__transform(context);this.draw(context);context.restore();this.onrender();}
DisplayObject.prototype.draw=function(context){this.ondraw();}
DisplayObject.prototype.destory=function(){this.onshow=this.onhide=this.onupdate=this.onrender=this.ondraw=null;DisplayObject.superclass.destory.call(this);}
my.DisplayObject=DisplayObject;})();
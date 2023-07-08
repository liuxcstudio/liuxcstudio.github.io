(function(){var DisplayObjectContainer=function(cfg){this.__childs=[];DisplayObjectContainer.superclass.constructor.call(this,cfg);}
my.inherit(DisplayObjectContainer,my.DisplayObject);DisplayObjectContainer.prototype.init=function(){var childs=this.__childs,child;for(var i=0,len=childs.length;i<len;i++){child=childs[i];if(!child.initialized){child.init();}}
DisplayObjectContainer.superclass.init.call(this);}
DisplayObjectContainer.prototype.appendChild=function(child){this.addChildAt(child,this.__childs.length);}
DisplayObjectContainer.prototype.prependChild=function(child){this.addChildAt(child,0);}
DisplayObjectContainer.prototype.addChildAt=function(child,index){child.parent=this;this.__childs.splice(index,0,child);}
DisplayObjectContainer.prototype.removeChild=function(child){var childs=this.__childs;for(var i=0,len=childs.length;i<len;i++){if(childs[i]==child){this.removeChildAt(i);break;}}}
DisplayObjectContainer.prototype.removeChildAt=function(index){var child=this.__childs.splice(index,1);if(child){child.parent=null;}}
DisplayObjectContainer.prototype.removeAll=function(){this.__childs.length=0;}
DisplayObjectContainer.prototype.getChildAt=function(index){return this.__childs[index];}
DisplayObjectContainer.prototype.getChilds=function(){return this.__childs;}
DisplayObjectContainer.prototype.update=function(deltaTime){var childs=this.__childs;for(var i=0,len=childs.length;i<len;i++){if(childs[i]){childs[i].update(deltaTime);}}
DisplayObjectContainer.superclass.update.call(this);}
DisplayObjectContainer.prototype.draw=function(context){var childs=this.__childs;for(var i=0,len=childs.length;i<len;i++){childs[i].render(context);}
DisplayObjectContainer.superclass.draw.call(this);}
DisplayObjectContainer.prototype.destoryChilds=function(){var childs=this.__childs;for(var i=0,len=childs.length;i<len;i++){childs[0].destory();}}
DisplayObjectContainer.prototype.destory=function(){this.destoryChilds();this.__childs=null;DisplayObjectContainer.superclass.destory.call(this);}
my.DisplayObjectContainer=DisplayObjectContainer;})();
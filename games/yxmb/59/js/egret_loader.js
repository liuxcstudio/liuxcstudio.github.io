egret_h5={};egret_h5.prefix="";egret_h5.loadScript=function(list,callback){var loaded=0;var loadNext=function(){egret_h5.loadSingleScript(egret_h5.prefix+list[loaded],function(){loaded++;if(loaded>=list.length){callback();}
else{loadNext();}})};loadNext();}
egret_h5.loadSingleScript=function(src,callback){var s=document.createElement('script');if(s.hasOwnProperty("async")){s.async=false;}
s.src=src;s.addEventListener('load',function(){this.removeEventListener('load',arguments.callee,false);callback();},false);document.body.appendChild(s);}
egret_h5.startGame=function(){var canvas=document.getElementById(egret.StageDelegate.canvas_name);context=egret.MainContext.instance;context.rendererContext=new egret.HTML5CanvasRenderer(canvas);context.touchContext=new egret.HTML5TouchContext(canvas);context.deviceContext=new egret.HTML5DeviceContext();context.netContext=new egret.HTML5NetContext();var container=new egret.EqualToFrame();var content=egret.Browser.getInstance().isMobile?new egret.FixedWidth():new egret.NoScale();var policy=new egret.ResolutionPolicy(container,content);egret.StageDelegate.getInstance().setDesignSize(480,800,policy);context.stage=new egret.Stage(canvas.width,canvas.height);egret.MainContext.instance.rendererContext.texture_scale_factor=1;context.run();var rootClass;if(document_class){rootClass=egret.getDefinitionByName(document_class);}
if(rootClass){var rootContainer=new rootClass();if(rootContainer instanceof egret.DisplayObjectContainer){context.stage.addChild(rootContainer);}
else{throw new Error("文档类必须是egret.DisplayObjectContainer的子类!");}}
else{throw new Error("找不到文档类！");}}
egret_h5.preloadScript=function(list,prefix){if(!egret_h5.preloadList){egret_h5.preloadList=[];}
egret_h5.preloadList=egret_h5.preloadList.concat(list.map(function(item){return prefix+item;}))}
egret_h5.startLoading=function(){var list=egret_h5.preloadList;egret_h5.loadScript(list,egret_h5.startGame);}
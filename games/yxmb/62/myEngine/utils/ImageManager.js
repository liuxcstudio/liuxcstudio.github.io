(function(){var ImageManager={__loadList:{},__loadImage:function(item,callback){var image=new Image();image.onload=function(){ImageManager.__loadList[item.id]=image;callback();}
image.src=item.src;},load:function(images,statechange,__index){__index=__index||0;if(images[__index]){ImageManager.__loadImage(images[__index],function(){ImageManager.load(images,statechange,__index+1);});}
statechange(__index);},get:function(id){return this.__loadList[id];}}
my.ImageManager=ImageManager;})();
;$.extend({HLidiom:function(params,data){var helang={config:{},els:{},selectedArr:[],selectArr:[],listData:[],addSelect:function(){},delSelect:function(){},randomSort:function(){return Math.random()>.5?-1:1;},setSelect:function(){var selectStr="";this.selectArr.forEach(function(v,i){selectStr+='<div><div class="item" data-index="'+i+'">'+v+'</div></div>';});this.els.select.html(selectStr);},setPass:function(val){this.els.pass.html(val);},setGold:function(val){this.els.gold.html(val);},setSelected:function(){var selectedStr="";for(var i=0;i<4;i++){if(this.selectedArr[i]&&this.selectedArr[i].txt){selectedStr+='<div><div class="item" data-index="'+i+'">'+this.selectedArr[i].txt+'</div></div>';}else{selectedStr+='<div><div class="item"></div></div>';}}
this.els.selected.html(selectedStr);},setSelectedData:function(j,v){for(var i=0;i<4;i++){if(!this.selectedArr[i]||!this.selectedArr[i].txt){this.selectedArr[i]={index:j,txt:v};break;}}
this.setSelected();},nextPass:function(){if(this.config.pass>=(this.listData.length-1)){alert('恭喜通关');return;}
var db=this.listData[this.config.pass];db[1]=db[1].split("").sort(this.randomSort);this.selectArr=db[1];this.selectedArr=[];this.setSelect();this.setSelected();if(this.config.pass>0){this.config.gold=this.config.gold+5;}
this.setGold(this.config.gold);this.setPass(this.config.pass+1);this.els.img.css("background-image","url(img/"+db[0]+")");},verify:function(){var str="";for(var i=0;i<4;i++){if(this.selectedArr[i]&&this.selectedArr[i].txt){str+=this.selectedArr[i].txt}}
if(str==this.listData[this.config.pass][2]){alert('解释：'+this.listData[this.config.pass][3]);this.config.pass++;this.nextPass();}},reminder:function(){if(this.config.gold<10){alert("没有足够的金币");return;}
var sed=-1;for(var x=0;x<4;x++){if(!this.selectedArr[x]||!this.selectedArr[x].txt){sed=x;break;}}
var s=-1,st=this.listData[this.config.pass][2].charAt(sed);for(var y=0;y<this.selectArr.length;y++){if(this.selectArr[y]==st){s=y;break;}}
this.setSelectedData(s,st);this.selectArr[s]='';this.setSelect();this.verify();this.config.gold=this.config.gold-10;this.setGold(this.config.gold);},init:function(){this.config={pass:params.pass||0,gold:params.gold||10};this.listData=data;this.els={pass:$("#hl-pass"),gold:$("#hl-gold"),select:$("#hl-select"),selected:$("#hl-selected"),img:$("#hl-img"),reminder:$("#hl-reminder"),about:$("#hl-about")};this.nextPass();this.els.select.on("click",".item",function(){var i=$(this).data("index"),t=$(this).html();helang.setSelectedData(i,t);helang.selectArr[i]='';helang.setSelect();helang.verify();});this.els.selected.on("click",".item",function(){var i=$(this).data("index"),t=$(this).html();helang.selectArr[helang.selectedArr[i].index]=t;helang.selectedArr[i]={};helang.setSelect();helang.setSelected();helang.verify();});this.els.reminder.click(function(){helang.reminder();});this.els.about.click(function(){helang.about();});},about:function(){alert('小Q博客：www.xiaoqbk.com');}};helang.init();}});
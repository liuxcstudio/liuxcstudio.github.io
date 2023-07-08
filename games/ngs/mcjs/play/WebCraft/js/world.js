function World(sx,sy,sz)
{this.blocks=new Array(sx);for(var x=0;x<sx;x++)
{this.blocks[x]=new Array(sy);for(var y=0;y<sy;y++)
{this.blocks[x][y]=new Array(sz);}}
this.sx=sx;this.sy=sy;this.sz=sz;this.players={};}
World.prototype.createFlatWorld=function(height)
{this.spawnPoint=new Vector(this.sx/2+0.5,this.sy/2+0.5,height);for(var x=0;x<this.sx;x++)
for(var y=0;y<this.sy;y++)
for(var z=0;z<this.sz;z++)
this.blocks[x][y][z]=z<height?BLOCK.DIRT:BLOCK.AIR;}
World.prototype.createFromString=function(str)
{var i=0;for(var x=0;x<this.sx;x++){for(var y=0;y<this.sy;y++){for(var z=0;z<this.sz;z++){this.blocks[x][y][z]=BLOCK.fromId(str.charCodeAt(i)-97);i=i+1;}}}}
World.prototype.getBlock=function(x,y,z)
{if(x<0||y<0||z<0||x>this.sx-1||y>this.sy-1||z>this.sz-1)return BLOCK.AIR;return this.blocks[x][y][z];}
World.prototype.setBlock=function(x,y,z,type)
{this.blocks[x][y][z]=type;if(this.renderer!=null)this.renderer.onBlockChanged(x,y,z);}
World.prototype.toNetworkString=function()
{var blockArray=[];for(var x=0;x<this.sx;x++)
for(var y=0;y<this.sy;y++)
for(var z=0;z<this.sz;z++)
blockArray.push(String.fromCharCode(97+this.blocks[x][y][z].id));return blockArray.join("");}
if(typeof(exports)!="undefined")
{World.prototype.loadFromFile=function(filename)
{var fs=require("fs");try{fs.lstatSync(filename);var data=fs.readFileSync(filename,"utf8").split(",");this.createFromString(data[3]);this.spawnPoint=new Vector(parseInt(data[0]),parseInt(data[1]),parseInt(data[2]));return true;}catch(e){return false;}}
World.prototype.saveToFile=function(filename)
{var data=this.spawnPoint.x+","+this.spawnPoint.y+","+this.spawnPoint.z+","+this.toNetworkString();require("fs").writeFileSync(filename,data);}
exports.World=World;}
function Vector(x,y,z)
{this.x=x;this.y=y;this.z=z;}
Vector.prototype.add=function(vec)
{return new Vector(this.x+vec.x,this.y+vec.y,this.z+vec.z);}
Vector.prototype.sub=function(vec)
{return new Vector(this.x-vec.x,this.y-vec.y,this.z-vec.z);}
Vector.prototype.mul=function(n)
{return new Vector(this.x*n,this.y*n,this.z*n);}
Vector.prototype.length=function()
{return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);}
Vector.prototype.distance=function(vec)
{return this.sub(vec).length();}
Vector.prototype.normal=function()
{if(this.x==0&&this.y==0&&this.z==0)return new Vector(0,0,0);var l=this.length();return new Vector(this.x/l,this.y/l,this.z/l);}
Vector.prototype.dot=function(vec)
{return this.x*vec.x+this.y*vec.y+this.z*vec.z;}
Vector.prototype.toArray=function()
{return[this.x,this.y,this.z];}
Vector.prototype.toString=function()
{return "( "+this.x+", "+this.y+", "+this.z+" )";}
function lineRectCollide(line,rect)
{if(line.y!=null)
return rect.y>line.y-rect.size/2&&rect.y<line.y+rect.size/2&&rect.x>line.x1-rect.size/2&&rect.x<line.x2+rect.size/2;else
return rect.x>line.x-rect.size/2&&rect.x<line.x+rect.size/2&&rect.y>line.y1-rect.size/2&&rect.y<line.y2+rect.size/2;}
function rectRectCollide(r1,r2)
{if(r2.x1>r1.x1&&r2.x1<r1.x2&&r2.y1>r1.y1&&r2.y1<r1.y2)return true;if(r2.x2>r1.x1&&r2.x2<r1.x2&&r2.y1>r1.y1&&r2.y1<r1.y2)return true;if(r2.x2>r1.x1&&r2.x2<r1.x2&&r2.y2>r1.y1&&r2.y2<r1.y2)return true;if(r2.x1>r1.x1&&r2.x1<r1.x2&&r2.y2>r1.y1&&r2.y2<r1.y2)return true;return false;}
if(typeof(exports)!="undefined")
{exports.Vector=Vector;}
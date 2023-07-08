;(function(exports){'use strict';if(!exports.ASN1){exports.ASN1={};}
if(!exports.Enc){exports.Enc={};}
if(!exports.PEM){exports.PEM={};}
var ASN1=exports.ASN1;var Enc=exports.Enc;var PEM=exports.PEM;ASN1.ELOOPN=102;ASN1.ELOOP="uASN1.js Error: iterated over "+ASN1.ELOOPN+"+ elements (probably a malformed file)";ASN1.EDEEPN=60;ASN1.EDEEP="uASN1.js Error: element nested "+ASN1.EDEEPN+"+ layers deep (probably a malformed file)";ASN1.CTYPES=[0x30,0x31,0xa0,0xa1];ASN1.VTYPES=[0x01,0x02,0x05,0x06,0x0c,0x82];ASN1.parse=function parseAsn1Helper(buf){function parseAsn1(buf,depth,eager){if(depth.length>=ASN1.EDEEPN){throw new Error(ASN1.EDEEP);}
var index=2;var asn1={type:buf[0],lengthSize:0,length:buf[1]};var child;var iters=0;var adjust=0;var adjustedLen;if(0x80&asn1.length){asn1.lengthSize=0x7f&asn1.length;asn1.length=parseInt(Enc.bufToHex(buf.slice(index,index+asn1.lengthSize)),16);index+=asn1.lengthSize;}
if(0x00===buf[index]&&(0x02===asn1.type||0x03===asn1.type)){if(asn1.length>1){index+=1;adjust=-1;}}
adjustedLen=asn1.length+adjust;function parseChildren(eager){asn1.children=[];while(iters<ASN1.ELOOPN&&index<(2+asn1.length+asn1.lengthSize)){iters+=1;depth.length+=1;child=parseAsn1(buf.slice(index,index+adjustedLen),depth,eager);depth.length-=1;index+=(2+child.lengthSize+child.length);if(index>(2+asn1.lengthSize+asn1.length)){if(!eager){console.error(JSON.stringify(asn1,ASN1._replacer,2));}
throw new Error("Parse error: child value length ("+child.length
+") is greater than remaining parent length ("+(asn1.length-index)
+" = "+asn1.length+" - "+index+")");}
asn1.children.push(child);}
if(index!==(2+asn1.lengthSize+asn1.length)){throw new Error("premature end-of-file");}
if(iters>=ASN1.ELOOPN){throw new Error(ASN1.ELOOP);}
delete asn1.value;return asn1;}
if(-1!==ASN1.CTYPES.indexOf(asn1.type)){return parseChildren(eager);}
asn1.value=buf.slice(index,index+adjustedLen);if(-1!==ASN1.VTYPES.indexOf(asn1.type)){return asn1;}
try{return parseChildren(true);}
catch(e){asn1.children.length=0;return asn1;}}
var asn1=parseAsn1(buf,[]);var len=buf.byteLength||buf.length;if(len!==2+asn1.lengthSize+asn1.length){throw new Error("Length of buffer does not match length of ASN.1 sequence.");}
return asn1;};ASN1._replacer=function(k,v){if('type'===k){return '0x'+Enc.numToHex(v);}
if(v&&'value'===k){return '0x'+Enc.bufToHex(v.data||v);}
return v;};PEM.parseBlock=PEM.parseBlock||function(str){var der=str.split(/\n/).filter(function(line){return!/-----/.test(line);}).join('');return{der:Enc.base64ToBuf(der)};};Enc.base64ToBuf=function(b64){return Enc.binToBuf(atob(b64));};Enc.binToBuf=function(bin){var arr=bin.split('').map(function(ch){return ch.charCodeAt(0);});return 'undefined'!==typeof Uint8Array?new Uint8Array(arr):arr;};Enc.bufToHex=function(u8){var hex=[];var i,h;var len=(u8.byteLength||u8.length);for(i=0;i<len;i+=1){h=u8[i].toString(16);if(h.length%2){h='0'+h;}
hex.push(h);}
return hex.join('').toLowerCase();};Enc.numToHex=function(d){d=d.toString(16);if(d.length%2){return '0'+d;}
return d;};}('undefined'!==typeof window?window:module.exports));
window["bigint-mod-arith"]=function(){function abs(a){return(a>=0)?a:-a;}
function eGcd(a,b){if(typeof a==='number')
a=BigInt(a);if(typeof b==='number')
b=BigInt(b);if(a<=0n||b<=0n)
throw new RangeError('a and b MUST be > 0');let x=0n;let y=1n;let u=1n;let v=0n;while(a!==0n){const q=b/a;const r=b%a;const m=x-(u*q);const n=y-(v*q);b=a;a=r;x=u;y=v;u=m;v=n;}
return{g:b,x:x,y:y};}
function toZn(a,n){if(typeof a==='number')
a=BigInt(a);if(typeof n==='number')
n=BigInt(n);if(n<=0n){throw new RangeError('n must be > 0');}
const aZn=a%n;return(aZn<0n)?aZn+n:aZn;}
function modInv(a,n){const egcd=eGcd(toZn(a,n),n);if(egcd.g!==1n){throw new RangeError(`${a.toString()} does not have inverse modulo ${n.toString()}`);}else{return toZn(egcd.x,n);}}
function modPow(b,e,n){if(typeof b==='number')
b=BigInt(b);if(typeof e==='number')
e=BigInt(e);if(typeof n==='number')
n=BigInt(n);if(n<=0n){throw new RangeError('n must be > 0');}else if(n===1n){return 0n;}
b=toZn(b,n);if(e<0n){return modInv(modPow(b,abs(e),n),n);}
let r=1n;while(e>0){if((e%2n)===1n){r=r*b%n;}
e=e/2n;b=b**2n%n;}
return r;}
function bytesToBigInt(bytes){return BigInt("0x"+Array.from(bytes,byte=>{return('0'+(byte&0xFF).toString(16)).slice(-2);}).join(''));}
function bigIntToBytes(bigInt){let hex=bigInt.toString(16);let bytes=[];for(let c=0;c<hex.length;c+=2){bytes.push(parseInt(hex.substr(c,2),16));}
return bytes;}
return{bigIntToBytes,bytesToBigInt,modPow};}();
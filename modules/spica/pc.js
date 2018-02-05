((e,t)=>{const r=require("./model.js"),s=require("./shader.js"),n=require("./texture.js"),i=require("./motion.js"),a=require("./meta.js"),c=require("./resource.js"),o=require("./package.js"),u=function(){this.files=[]};Object.defineProperty(u.prototype,"allFiles",{get:function(){let e=[];return this.files.forEach(r=>{t.is(r,u)?r.allFiles.forEach(t=>{e.push(t)}):r&&e.push(r)}),e}}),u.prototype.load=function(e){const l=this;return t.async(function(){let t=e.subreader();if(l.magic=e.readString(2),!/^[A-Z]{2}$/.test(l.magic))throw new Error("Invalid magic for PC: "+l.magic);const r=e.readUint16();let s=[],n=0;for(;n<=r;)s.push(e.readUint32()),++n;let i=[],a=0;for(;a<r;){let e=s[a],r=s[a+1]-s[a];i.push(t.subreader(e,r)),++a}this.next(i)}).all(function(e){t.async(function(){t.async(function(){switch(l.guessFileType(e)){case"model":this.next(new r(e));break;case"motion":this.next(new i(e));break;case"shader":this.next(new s(e));break;case"texture":this.next(new n(e));break;case"meta":this.next(new a(e));break;case"package":this.next(new o(e));break;case"resource":this.next(new c(e));break;case"pc":{let t=new u;t.load(e).resolve(t).pipe(this);break}case"empty":this.next(null);break;case"unknown":throw new Error("Unknown file format");default:throw new Error("Invalid file format")}}).catch(this)}).then(function(e,t){e?l.files.push(e):l.files.push(t),this.next(t)}).pipe(this)})},u.prototype.guessFileType=function(e){if(0===e.available)return"empty";if(e.available>=2){let t=e.getUint32(),r=e.getString(2);switch(t){case 353509655:return"model";case 352588307:return 0===e.subreader(8).readUint32()?"shader":"texture";case 393216:return"motion";case 65536:return"package"}switch(r){case"PC":case"PS":return"pc"}}let t=e.getString(32);return/^[A-Z0-9]+$/i.test(t)?"meta":"resource"},module.exports=u})(0,this.$);
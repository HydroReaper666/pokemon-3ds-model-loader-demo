var mewUtil=require("mew_util"),Memory=function(e,t){if(Object.defineProperty(this,"options",{configurable:!1,writable:!1,enumerable:!1,value:mewUtil.advancedMerge({"!defaultValue":{},config:{"!aliasField":"options","!aliasDeprecated":!0},options:{"!valueType":"object","!defaultValue":{}},factory:{"!aliasField":"plugin","!aliasDeprecated":!0},plugin:{"!valueType":"string"},enableCache:{"!valueType":"boolean","!defaultValue":!0},cacheTimeout:{"!valueType":"number","!defaultValue":12e5}},t)}),this.options.enableCache&&(this.cache=new mewUtil.CachePool(this.options.cacheTimeout)),this.options.plugin){var i=mewUtil.plugin(this.options.plugin,e.workingPath);if(!mewUtil.isKindOf(i,Function))throw new Error("Memory plugin is invalid, it should be a function");this.implementation=i(this.options.options)}if(!this.cache&&!this.implementation)throw new Error("Memory should be cachable or implemented")};Object.defineProperty(Memory.prototype,"working",{enumerable:!0,get:function(){return!this.implementation||this.implementation.working}}),Memory.prototype.has=function(e,t){return this.implementation?this.implementation.has?this.implementation.has(e,t):mewUtil.async.reject(new Error("Memory does not support content existing lookup")):mewUtil.async.resolve(this.cache.has(e))},Memory.prototype.search=function(){var e=null,t=null;arguments.length>1?(e=arguments[0],t=arguments[1]):t=arguments[0],t||(t=function(e,t){return!0});var i=this;return mewUtil.async(function(){if(i.working){if(i.implementation){if(!i.implementation.search)return this.reject(new Error("Memory does not support content search"));i.implementation.search(e,t).pipe(this)}else if(i.cache){var n=null,o=null;e&&("string"==typeof e?n=mewUtil.compile(e):"object"==typeof e&&(Array.isArray(e)||(e=[e]),o=mewUtil.ruler.object.addRules(o,e))),this.next(i.cache.fetch(function(e,i){return n?!!mewUtil.execute(n,i,{})&&t():o?!!mewUtil.ruler.object.match(o,i)&&t():t()}))}}else this.reject(new Error("Memory is not working"))})},Memory.prototype.forget=function(e){var t=this;return t.cache&&Date.now()-t.cache.lastClearDate>2*t.options.cacheTimeout&&t.cache.clearExpired(),mewUtil.async(function(){if(t.working)if(t.cache){var i=t.cache.pool[e];t.cache.pool.hasOwnProperty(e)&&delete t.cache.pool[e],this.next(i)}else this.next(null);else this.reject(new Error("Memory is not working"))}).then(function(i){t.implementation?t.implementation.forget?t.implementation.forget(e).pipe(this):this.reject(new Error("Memory does not support content forget")):this.next(i)})},Memory.prototype.recall=function(e,t,i,n){var o=this;return o.cache&&(new Date).getTime()-o.cache.lastClearDate>2*o.options.cacheTimeout&&o.cache.clearExpired(),mewUtil.async(function(){o.working?o.cache?o.implementation?this.next(o.cache.get(e,t,null,n)):this.next(o.cache.get(e,t,i,n)):this.next():this.reject(new Error("Memory is not working"))}).then(function(r){r?(this.pool.cached=!0,this.next(r)):o.implementation?o.implementation.recall?o.implementation.recall(e,t,i,n).pipe(this):this.reject(new Error("Memory does not support content recall")):this.next(null)}).then(function(i){i&&o.cache&&(this.pool.cached?t&&o.cache.refresh(e,n):o.cache.put(e,i,n)),this.next(i)})},Memory.prototype.remember=function(e,t,i){var n=this;return n.cache&&Date.now()-n.cache.lastClearDate>2*n.options.cacheTimeout&&n.cache.clearExpired(),mewUtil.async(function(){n.working?n.implementation?n.implementation.remember?n.implementation.remember(e,t,i).pipe(this):this.reject(new Error("Memory does not support content remember")):this.next(t):this.reject(new Error("Memory is not working"))}).then(function(t){n.cache&&n.cache.put(e,t,i),this.next(t)})},module.exports=Memory;
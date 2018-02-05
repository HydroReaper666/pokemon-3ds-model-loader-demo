var isInMSYS=function(){return process.env.MSYSTEM_CHOST&&/(\-|^)(mingw|msys)(\-|$)/.test(process.env.MSYSTEM_CHOST)},isMSYS=function(){return"msys"===process.platform},isWindows=function(){return"win32"===process.platform},isDarwin=function(){return"darwin"===process.platform},isMacOS=function(){return"darwin"===process.platform},isLinux=function(){return"linux"===process.platform},isAndroid=function(){return!1},isIOS=function(){return!1},ifOSIs=function(){var i=Array.prototype.slice.call(arguments,0);return 1===i.length&&i[0].constructor===Array&&(i=i[0]),i.filter(function(i){return module.exports["is"+i[0].toUpperCase()+i.slice(1)]()}).length>0},isPosixPathOS=function(i){return!(isWindows()&&i&&isInMSYS())},getOSName=function(){return isWindows()?"windows":isMSYS()?"msys":isMacOS()?"macos":isLinux()?"linux":isAndroid()?"android":isIOS?"ios":"unknown"};module.exports={isInMSYS:isInMSYS,isMSYS:isMSYS,isWindows:isWindows,isMacOS:isMacOS,isLinux:isLinux,isAndroid:isAndroid,isIOS:isIOS,isIos:isIOS,isMacos:isMacOS,isDarwin:isDarwin,isPosixPathOS:isPosixPathOS,ifOSIs:ifOSIs,getOSName:getOSName};
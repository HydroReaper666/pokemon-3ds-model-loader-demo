var $=global.$["!space"]("query"),installSwitcher=function(e){return e.hasOwnProperty("!use")||(e["!use"]=function(e){$["!use"](e)},e.hasOwnProperty("!space")||(e["!space"]=function(e){return $["!space"](e)})),e};$["!space"]("jquery",function(){return installSwitcher(require("./jquery-1.12.1.js"))}),$["!space"]("jquery2",function(){return installSwitcher(require("./jquery-2.2.1.js"))});var space=$.meta("query","space");space||(space="jquery"),$["!use"](space);
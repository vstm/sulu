define([],function(){"use strict";var a={instanceName:null,url:null},b=function(a){return['<div class="resource-locator">','<span id="'+a.ids.url+'" class="grey-font">',a.url?a.url:"","/</span>",'   <input type="text" id="'+a.ids.input+'" class="form-element"/>','<span class="show pointer small-font" id="',a.ids.toggle,'">','   <span class="icon-history icon"></span>',"   <span>",a.showHistoryText,"</span>","</span>",'<div class="loader" id="',a.ids.loader,'"></div>',"</div>"].join("")},c=function(a){return"#"+this.options.ids[a]},d=function(){this.options.ids={url:"resource-locator-"+this.options.instanceName+"-url",input:"resource-locator-"+this.options.instanceName+"-input",toggle:"resource-locator-"+this.options.instanceName+"-toggle",loader:"resource-locator-"+this.options.instanceName+"-loader"},this.options.showHistoryText=this.sandbox.translate("public.show-history"),this.sandbox.dom.html(this.$el,b(this.options)),h.call(this),g.call(this)},e=function(){var a=this.sandbox.dom.createElement("<div/>");this.sandbox.dom.html(c.call(this,"loader"),a),this.sandbox.start([{name:"loader@husky",options:{el:a,size:"16px",color:"#666666"}}])},f=function(){this.sandbox.stop(c.call(this,"loader")+" > div")},g=function(){this.sandbox.dom.on(this.$el,"data-changed",function(a,b){h.call(this,b)}.bind(this)),this.sandbox.dom.on(c.call(this,"edit"),"click",i.bind(this)),this.sandbox.dom.on(c.call(this,"toggle"),"click",m.bind(this)),this.sandbox.dom.on(c.call(this,"input"),"change",j.bind(this)),this.sandbox.dom.on(c.call(this,"input"),"change",function(){this.sandbox.emit("sulu.content.changed")}.bind(this)),this.sandbox.dom.on(c.call(this,"input"),"focusout",function(){this.$el.trigger("focusout")}.bind(this))},h=function(a){a||(a=this.sandbox.dom.data(this.$el,"value"),a||(a=""));var b=a.split("/");this.sandbox.dom.val(c.call(this,"input"),b.pop()),this.sandbox.dom.html(c.call(this,"tree"),b.join("/")+"/")},i=function(){this.sandbox.dom.removeAttr(c.call(this,"input"),"readonly")},j=function(){var a=this.sandbox.dom.val(c.call(this,"input"));this.sandbox.dom.data(this.$el,"value","/"+a)},k=function(a){var b=['<ul class="resource-locator-history">'];return this.sandbox.util.foreach(a,function(a){b.push('<li><span class="url">'+a.resourceLocator+'</span><span class="date">'+this.sandbox.date.format(a.created)+"</span></li>")}.bind(this)),b.push("</ul>"),b.join("")},l=function(a){var b=this.sandbox.dom.createElement("<div/>");this.sandbox.dom.append(this.$el,b),this.sandbox.start([{name:"overlay@husky",options:{el:b,container:b,title:this.sandbox.translate("public.url-history"),openOnStart:!0,removeOnClose:!0,instanceName:"url-history",data:a}}])},m=function(){e.call(this),this.sandbox.util.load(this.options.historyApi).then(function(a){f.call(this);var b=k.call(this,a._embedded);l.call(this,b)}.bind(this))};return{historyClosed:!0,initialize:function(){this.options=this.sandbox.util.extend({},a,this.options),d.call(this)}}});
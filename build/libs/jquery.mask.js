!function(e){var t,n,a,r=(n=document.createElement("input"),a="onpaste",n.setAttribute(a,""),("function"==typeof n[a]?"paste":"input")+".mask"),i=navigator.userAgent,o=/iphone/i.test(i),c=/android/i.test(i);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&((n=this.createTextRange()).collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(n,a){var i,l,s,u,f;return!n&&this.length>0?e(this[0]).data(e.mask.dataName)():(a=e.extend({placeholder:e.mask.placeholder,completed:null},a),i=e.mask.definitions,l=[],s=f=n.length,u=null,e.each(n.split(""),function(e,t){"?"==t?(f--,s=e):i[t]?(l.push(RegExp(i[t])),null===u&&(u=l.length-1)):l.push(null)}),this.trigger("unmask").each(function(){function h(e){for(;f>++e&&!l[e];);return e}function d(e,t){var n,r;if(!(0>e)){for(n=e,r=h(t);f>n;n++)if(l[n]){if(!(f>r&&l[n].test(k[r])))break;k[n]=k[r],k[r]=a.placeholder,r=h(r)}p(),v.caret(Math.max(u,e))}}function m(e,t){var n;for(n=e;t>n&&f>n;n++)l[n]&&(k[n]=a.placeholder)}function p(){v.val(k.join(""))}function g(e){var t,n,r=v.val(),i=-1;for(t=0,pos=0;f>t;t++)if(l[t]){for(k[t]=a.placeholder;pos++<r.length;)if(n=r.charAt(pos-1),l[t].test(n)){k[t]=n,i=t;break}if(pos>r.length)break}else k[t]===r.charAt(pos)&&t!==s&&(pos++,i=t);return e?p():s>i+1?(v.val(""),m(0,f)):(p(),v.val(v.val().substring(0,i+1))),s?t:u}var v=e(this),k=e.map(n.split(""),function(e){return"?"!=e?i[e]?a.placeholder:e:void 0}),b=v.val();v.data(e.mask.dataName,function(){return e.map(k,function(e,t){return l[t]&&e!=a.placeholder?e:null}).join("")}),v.attr("readonly")||v.one("unmask",function(){v.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){var e;clearTimeout(t),b=v.val(),e=g(),t=setTimeout(function(){p(),e==n.length?v.caret(0,e):v.caret(e)},10)}).bind("blur.mask",function(){g(),v.val()!=b&&v.change()}).bind("keydown.mask",function(e){var t,n,a,r=e.which;8===r||46===r||o&&127===r?(n=(t=v.caret()).begin,0==(a=t.end)-n&&(n=46!==r?function(e){for(;--e>=0&&!l[e];);return e}(n):a=h(n-1),a=46===r?h(a):a),m(n,a),d(n,a-1),e.preventDefault()):27==r&&(v.val(b),v.caret(0,g()),e.preventDefault())}).bind("keypress.mask",function(t){var n,r,i,o=t.which,s=v.caret();t.ctrlKey||t.altKey||t.metaKey||32>o||o&&(0!=s.end-s.begin&&(m(s.begin,s.end),d(s.begin,s.end-1)),n=h(s.begin-1),f>n&&(r=String.fromCharCode(o),l[n].test(r)&&(function(e){var t,n,r,i;for(t=e,n=a.placeholder;f>t;t++)if(l[t]){if(r=h(t),i=k[t],k[t]=n,!(f>r&&l[r].test(i)))break;n=i}}(n),k[n]=r,p(),i=h(n),c?setTimeout(e.proxy(e.fn.caret,v,i),0):v.caret(i),a.completed&&i>=f&&a.completed.call(v))),t.preventDefault())}).bind(r,function(){setTimeout(function(){var e=g(!0);v.caret(e),a.completed&&e==v.val().length&&a.completed.call(v)},0)}),g()}))}})}(jQuery);
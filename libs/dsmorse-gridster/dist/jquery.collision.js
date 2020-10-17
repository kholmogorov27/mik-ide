/*! gridster.js - v0.8.0 - 2018-07-24 - * https://dsmorse.github.io/gridster.js/ - Copyright (c) 2018 ducksboard; Licensed MIT */ !function(a,b){"use strict";"object"==typeof exports?module.exports=b(require("jquery")):"function"==typeof define&&define.amd?define("gridster-collision",["jquery","gridster-coords"],b):a.GridsterCollision=b(a.$||a.jQuery,a.GridsterCoords)}(this,function(a,b){"use strict";function c(b,c,e){this.options=a.extend(d,e),this.$element=b,this.last_colliders=[],this.last_colliders_coords=[],this.set_colliders(c),this.init()}var d={colliders_context:document.body,overlapping_region:"C"};c.defaults=d;var e=c.prototype;return e.init=function(){this.find_collisions()},e.overlaps=function(a,b){var c=!1,d=!1;return(b.x1>=a.x1&&b.x1<=a.x2||b.x2>=a.x1&&b.x2<=a.x2||a.x1>=b.x1&&a.x2<=b.x2)&&(c=!0),(b.y1>=a.y1&&b.y1<=a.y2||b.y2>=a.y1&&b.y2<=a.y2||a.y1>=b.y1&&a.y2<=b.y2)&&(d=!0),c&&d},e.detect_overlapping_region=function(a,b){var c="",d="";return a.y1>b.cy&&a.y1<b.y2&&(c="N"),a.y2>b.y1&&a.y2<b.cy&&(c="S"),a.x1>b.cx&&a.x1<b.x2&&(d="W"),a.x2>b.x1&&a.x2<b.cx&&(d="E"),c+d||"C"},e.calculate_overlapped_area_coords=function(b,c){var d=Math.max(b.x1,c.x1),e=Math.max(b.y1,c.y1),f=Math.min(b.x2,c.x2),g=Math.min(b.y2,c.y2);return a({left:d,top:e,width:f-d,height:g-e}).coords().get()},e.calculate_overlapped_area=function(a){return a.width*a.height},e.manage_colliders_start_stop=function(b,c,d){for(var e=this.last_colliders_coords,f=0,g=e.length;g>f;f++)-1===a.inArray(e[f],b)&&c.call(this,e[f]);for(var h=0,i=b.length;i>h;h++)-1===a.inArray(b[h],e)&&d.call(this,b[h])},e.find_collisions=function(b){for(var c=this,d=this.options.overlapping_region,e=[],f=[],g=this.colliders||this.$colliders,h=g.length,i=c.$element.coords().update(b||!1).get();h--;){var j=c.$colliders?a(g[h]):g[h],k=j.isCoords?j:j.coords(),l=k.get(),m=c.overlaps(i,l);if(m){var n=c.detect_overlapping_region(i,l);if(n===d||"all"===d){var o=c.calculate_overlapped_area_coords(i,l),p=c.calculate_overlapped_area(o);if(0!==p){var q={area:p,area_coords:o,region:n,coords:l,player_coords:i,el:j};c.options.on_overlap&&c.options.on_overlap.call(this,q),e.push(k),f.push(q)}}}}return(c.options.on_overlap_stop||c.options.on_overlap_start)&&this.manage_colliders_start_stop(e,c.options.on_overlap_start,c.options.on_overlap_stop),this.last_colliders_coords=e,f},e.get_closest_colliders=function(a){var b=this.find_collisions(a);return b.sort(function(a,b){return"C"===a.region&&"C"===b.region?a.coords.y1<b.coords.y1||a.coords.x1<b.coords.x1?-1:1:(a.area<b.area,1)}),b},e.set_colliders=function(b){"string"==typeof b||b instanceof a?this.$colliders=a(b,this.options.colliders_context).not(this.$element):this.colliders=a(b)},a.fn.collision=function(a,b){return new c(this,a,b)},c});
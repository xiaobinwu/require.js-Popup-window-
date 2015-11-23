
require.config({
　　　paths: {
　　　　　"tabview": "js/tabview",
　　　　　"animate": "js/animate",
　　　　　"treeview": "js/treeview"
　　　}
　});

// 另一种则是直接改变基目录（baseUrl）。
// require.config({
// 　　　　baseUrl: "js/lib",
// 　　　　paths: {
// 　　　　　　"jquery": "jquery.min",
// 　　　　　　"underscore": "underscore.min",
// 　　　　　　"backbone": "backbone.min"
// 　　　　}
// });


require(['tabview','treeview'],function(a,b){ 
	var tab = new a.tabview();
	var tree = new b.treeview();
	alert(tab.name);
	alert(tab.animate);
	alert(tab.dec);
	alert(tree.name);
});
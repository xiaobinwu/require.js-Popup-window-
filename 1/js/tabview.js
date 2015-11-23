define(['animate'],function(a){
	function tabview(){ 
		this.name= 'tabview';
		this.animate = a.animate.name;
		this.dec = a.dec;
	} 
	return { tabview:tabview };
})
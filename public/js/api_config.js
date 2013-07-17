(function(){

	// spwidget from jQuery object
	var spwidget = function(){
		return $.apply($, arguments);
	};
	spwidget.defaults = {"cario_key": "3988dd17a946f7e75d76f6e0a841854a", "site_id":"5192f4656173b12ce300008d", 
			"player_id":"5192f5826173b12cfd0000dc", "columns":4,
			"no_image_width":60, "no_image_height":60};
  window.SprocketWidget = spwidget;
	
}());
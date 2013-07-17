// Use jquery instead of $, other library also use $ sign.
(function($){

  var rewardlist = {
		init: function(this_obj, options){
	  	var defaults = {
		 		columns:0,
				init_rows:0,
				load_more_rows:0,
				page_rows:0,
				page_cols:0,
		 		image_width:80, 
		 		image_height:80
	   	}
		  // Overwrite default options, and merge them into "options". 
	    this.options = $.extend({}, defaults, options);
			this.setup(this_obj, this.options);
		},

		setup: function(this_obj, options){
			// reward list
		  var element = '<img src="images/bluequestionmarkbutton_60x60.jpg" width="' + options.image_width + '" height="'+ options.image_height + '" alt="Bluequestionmarkbutton 60x60">';
		 	var rewards_list = new Array();
			for (i=0; i<options.total_elements; i++){
					rewards_list[i]=element;
			}				

			// load init html.		
			if ( options.loadmore_mode == true ){
				var table_content = '<div id="reward-list-widget">\
															<table border="1px" class="rl-table-style"></table></br>\
															<div style="text-align:center;"><button class="rl-load-more">Load More</button></br>\
															</div>';
				this_obj.append(table_content);
				this.init_load_more_table(rewards_list, options.columns, options.init_rows);
			} else if  ( options.pagination_mode == true )  {
				var page_elements_number = options.page_rows * options.page_cols;
				var max_page_number = Math.floor(rewards_list.length / page_elements_number); // start from page0
				var table_content = '<div id="reward-list-widget">\
															<table border="1px" class="rl-table-style"></table></br>\
															<div style="text-align:center;"><button class="rl-previous">Previous</button><button class="rl-next">Next</button></div>\
															<div style="text-align:center;" class="pagination"></div>\
														 </div>';
				this_obj.append(table_content);							 
				for(i = 0; i <= max_page_number; i++ ){
					$(".pagination").append("<button class='pagination-button' value='" + i + "'>" + i + "</button>");
				}
				this.show_page(rewards_list, options.page_rows, options.page_cols);
			}
						
			$(".rl-load-more").bind( "click", function(){
	  		rewardlist.load_more(rewards_list, options.columns, options.load_more_rows);
			});
			
			$(".rl-next").bind( "click", function(){
				rewardlist.next(rewards_list, options.page_rows, options.page_cols);
		  });
			
			$(".rl-previous").bind( "click", function(){
				rewardlist.previous(rewards_list, options.page_rows, options.page_cols);
		  });
			
			$(".pagination-button").bind( "click", function(){
				var clicked_page_number = parseInt($(this).attr("value"));
				var clicked_page_class = "page" + clicked_page_number;
				console.log(clicked_page_number);
				$('#reward-list-widget  table tr').hide();
				$('#reward-list-widget  table tr.'+ clicked_page_class +'').show();	
		  });
			
		},
		
		init_load_more_table: function(rewards_list, columns, init_rows){			
			//every four rewards list in a row.
			$.each(rewards_list,function(key,val){
				if(key < init_rows * columns){
					if(key % columns == 0){
						$('#reward-list-widget table').append('<tr><td class="rl-cell"><a href="#" class="hint" rel="popover" data-content="It is so simple to create a tooltop for my website!" data-original-title="Twitter Bootstrap Popover">' + val + '</a></td></tr>');
					}
					else{
						$('#reward-list-widget table tr:last').append('<td class="rl-cell"><a href="#" class="hint" rel="popover" data-content="It is so simple to create a tooltop for my website!" data-original-title="Twitter Bootstrap Popover">' + val + '</a></td>');
					}		
				}
			});	
		},
		
 	 	load_more: function(rewards_list, columns, load_more_rows){
	 		// get current 
	 		// caculate rest 
	 		// load once more
	 		var current_index = $(".rl-cell").length;
	 		var total_length = rewards_list.length;
	 		var end_index = current_index + load_more_rows * columns;
	
	 		// get index of start and end of one load more. 
	 		start = current_index; 
	 		end = (end_index > total_length) ?  total_length : end_index;
			
			console.log(start);
			console.log(end);
	 		//every four rewards list in a row.
	 		$.each(rewards_list,function(key,val){
	 			if(key < end & key >= start){
	 				if(key % columns == 0){
	 					$('#reward-list-widget table').append('<tr><td class="rl-cell"><a href="#" class="hint" rel="popover" data-content="It is so simple to create a tooltop for my website!" data-original-title="Twitter Bootstrap Popover">' + val + '</a></td></tr>');
	 				}
	 				else{
	 					$('#reward-list-widget table tr:last').append('<td class="rl-cell"><a href="#" class="hint" rel="popover" data-content="It is so simple to create a tooltop for my website!" data-original-title="Twitter Bootstrap Popover">' + val + '</a></td>');
	 				}		
	 			}
	 		});	
	
	 		//hide 
	 		if(end >= total_length){
	 			$(".rl-load-more").hide();
	 		}
 		},
		
		show_page: function(rewards_list, page_rows, page_cols){
			//every four rewards list in a row.
			var page_elements = page_rows * page_cols;
			
			$.each(rewards_list,function(key,val){
				if(key % page_cols == 0){
					var current_page = Math.floor(key / page_elements)
					$('#reward-list-widget table').append('<tr class="page' + current_page + '"><td class="rl-cell"><a href="#" class="hint" rel="popover" data-content="It is so simple to create a tooltop for my website!" data-original-title="Twitter Bootstrap Popover">' + val + '</a></td></tr>');
				}
				else{
					$('#reward-list-widget table tr:last').append('<td class="rl-cell"><a href="#" class="hint" rel="popover" data-content="It is so simple to create a tooltop for my website!" data-original-title="Twitter Bootstrap Popover">' + val + '</a></td>');
				}	
			});
			
			$('#reward-list-widget table tr').not('#reward-list-widget table tr.page0').hide();	
		},
		
		next: function(rewards_list, page_cols, page_rows){
			//get current page from class, and show next.
			var current_page = $("#reward-list-widget table tr:visible:first").attr('class');
			var next_page_number = parseInt(current_page.replace("page", "")) + 1;
			var next_page_class = "page" + next_page_number;
			// stop nexting if reach max page.
			var page_elements = page_rows * page_cols;
			var max_page_number = Math.floor(rewards_list.length / page_elements);
		
			if (next_page_number <= max_page_number){
				$('#reward-list-widget table tr').show();	
				$('#reward-list-widget table tr').not('#reward-list-widget table tr.'+ next_page_class +'').hide();	
			}
			console.log($("#reward-list-widget table tr:visible:first").attr('class'));
		},
		
		previous: function(rewards_list, page_cols, page_rows){
			//get current page from class, and show pre page number.
			var current_page = $("#reward-list-widget table tr:visible:first").attr('class');
			var pre_page_number = parseInt(current_page.replace("page", "")) - 1;
			//if pre page is page0 and above, show it.
			if (pre_page_number >= 0){
				var pre_page_class = "page" + pre_page_number;
				$('#reward-list-widget table tr').show();	
				$('#reward-list-widget table tr').not('#reward-list-widget table tr.'+ pre_page_class +'').hide();	
			}
			console.log($("#reward-list-widget table tr:visible:first").attr('class'));
		},

  }
	
  $.fn.rewardlist = function() {
		console.log(arguments[0]);		
		rewardlist.init($(this),arguments[0]);
	}

}(jQuery));


$(document).ready(function(){
	
	//Not only bind on one .rl-load-more, but all the .rl-load-more.
  // $(document).on("click", ".rl-load-more" ,function(){
  // 		rewardlist.load_more(rewards_list, options.columns, options.load_more_rows);
  // });
		
	$("table").popover({
		selector: ".hint",
		trigger: 'click',
		placement: 'bottom'	
	});
});




//var diff = $(old_array).not(new_array).get(); 
//columns = typeof columns !== 'undefined' ? columns : 4; 


// SprocketWidget can find element like $ sign. alias for jquery.
// var spwidget = function(){
// 	return $.apply($, arguments);
// };
//  window.SprocketWidget = spwidget;	
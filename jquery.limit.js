(function($){
		
	$.fn.limit = function(options){
		
		var config = {
			max: 2000,
			debug: false,
			counter: null,
			elementSelector: 'limit-count',
			updateView: null,
		};
		
		if(options)
		{
			$.extend(config, options);
		}
				
		var methods = {
			init: function()
			{
				methods.log('Initializing');
				
				// Get initial character count in textbox
				el.bind('keyup.limit', methods.update);
				
				// CountElement needs to be an element wrapped in a jquery object
				if(typeof config.counter === 'function')
				{
					config.counter.call(this, config);
				}else
				{

					countElement = $('<span />').addClass(config.elementSelector);
					
					el.after(countElement);
				}
				
				methods.update();
																
				methods.log('Terminating');
			},
			count: function()
			{
				// Split textarea value into array and return the count - 1
				return textareaValue.split(/[\S\s\W]+?/g).length - 1;
			},
			update: function()
			{				
				// Set global variables
				textareaValue = el.val();
				count = methods.count();
				remaining = config.max - count;
				
				methods.log(count);
								
				if(methods.check())
				{
					el.val(methods.replace());
				}
				
				methods.updateView();
				
			},
			replace: function()
			{
				return textareaValue.substr(0, config.max);	
			},
			check: function()
			{
				result = !(config.max >= count);
				methods.log('Over Limit? '+result);
				return result;	
			},
			updateView: function(){
				
				if(typeof config.updateView === 'function')
				{
					config.updateView.call();
				}else
				{
					text = remaining+((remaining == 1)? ' Character Remains' : ' Characters Remain');
					countElement.text(text);
				}	
				
				methods.log('Updating View');
			},
			log: function(data)
			{
				if(config.debug) console.log(data);
			}
		};
		
		return this.each(function(i){

			el = $(this);
			limit = parseInt(el.data('limit'));
			
			if(limit > 0)
			{
				config.max = limit;
			}
			
			methods.log(config);							
			methods.init();

		});

	}
		
})(jQuery);
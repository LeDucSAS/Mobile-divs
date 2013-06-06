var omniscient = {};

jQuery(function($) {
	
	  /********************/
	 /*  Initialisation  */
	/********************/

	initializeAll();

	$('.dropme').sortable({
	    connectWith: '.dropme'
	    ,cursor: 'pointer'
	    ,stop: function(event, ui){
	    	console.log(ui);
	    	actualizeAll($('.dropme'));
	    }
	}).droppable({
	    accept: '.button',
	    activeClass: 'highlight'
	});

	  /******************/
	 /*  User actions  */
	/******************/
	$(".movable").mouseenter(function(event){
		var inputTarget = $(this).parent().attr("data-associatedSaveVar"),
		    index = $(this).attr("data-position"),
		    posX = $(this).offset().top,
		    posY = $(this).offset().left,
		    name = omniscient[inputTarget][index].name,
		    position = omniscient[inputTarget][index].position,
		    duration = omniscient[inputTarget][index].duration,
		    content = $(".mainSpecimen").clone();

		content.removeClass("mainSpecimen");
		content.find(".positionContainer").text(position);
		content.find(".nameContainer").text(name);
		content.find(".durationContainer").text(duration);
		content.css({
			position: "absolute",
			top: posX+70,
			left: posY+($(this).width()/2)-32
		});

		$(this).append(content);
	});
	$(".movable").mouseleave(function(event){
		$(".hoverWindow:not(.mainSpecimen)").remove();
	});
	$(".movable").mousedown(function(event){
		$(".hoverWindow:not(.mainSpecimen)").remove();
	});




	  /***********************/
	 /*  Usefull functions  */
	/***********************/

	function updateDataPosition(target){
		target.find(".movable").each(function(){
			var index = $(this).index();
			$(this).attr("data-position", index);
		});
	}

	function updateWidth(target){
		target.find(".movable").each(function(){
			var width = $(this).attr("data-duration");
			$(this).css({
				"width" : width
			});
		});
	}

	function saveState(target){
		// Get where to stock info into omniscient 
		saveTo = target.attr("data-associatedSaveVar");
		// Reinitialize it
		omniscient[saveTo] = [];
		// For each 
		target.find(".movable").each(function(){
			var index = $(this).index();
			var name = $(this).attr("data-name");
			var position = $(this).attr("data-position");
			var duration = $(this).attr("data-duration");
			omniscient[saveTo][index] = {
				"name" : name,
				"position" : position,
				"duration" : duration
			};
		});
	}



	/* About initialization */
	function initializeAll(){
		actualizeAll($(".dropme"));
		coloringDiv();
	}
	function actualizeAll(target){
		target.each(function(){
			var newInfo = $(this).attr("data-associatedSaveVar");
			omniscient[newInfo] = {};
			updateDataPosition($(this));
			updateWidth($(this));
			saveState($(this));

			displayJsonInfos();
		});
	}


	function displayJsonInfos(){
		$(".displayp").empty();
		dumpThis(omniscient.dropme1, $("#displayInfos1"));
		dumpThis(omniscient.dropme2, $("#displayInfos2"));
	}

	function dumpThis(obj, output) {
	    var out = '';
	    for (var i in obj) {
	        out += i;
	        out +=" -- " + obj[i].duration;
	        out +=" : " + obj[i].position;
	        out +=" : " + obj[i].name;
	        out += "<br />";
	    }
		output.append(out);
	}
	
	  /***********************/
	 /*  Useless functions  */
	/***********************/
	function coloringDiv(){
		/* Pour faire joli parce que c'est beau */
		$(".dropme .movable").each(function(event){
			$(this).css({
				"background-color": "rgb(" +
				Math.ceil((Math.random() * 255))+","+
				Math.ceil((Math.random() * 255))+","+
				Math.ceil((Math.random() * 255))+")"
			});
		});
	}
});
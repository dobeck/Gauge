var Gauge = (function(){
	
	var tip, no, yes;
	var results = {
			no:5,
			yes:5
		}
	var tipPos = {
			min:-125,
			max:125
		}
	
	return {
		
		setTip : function() {
		
			var sum = results.no + results.yes;
			var dissLevel = ((results.no*100)/sum*250)/100;
			tip.animate({rotate : (tipPos.min+dissLevel)+'deg'}, 2000); 
			setTimeout(function(){
				Gauge.unblockButtons();
			}, 2200);
			
		},
		
		increaseResults : function() {
			results.yes++
			Gauge.setTip()
		},
		
		decreaseResults : function() {
			results.no++;
			Gauge.setTip()
		},
		
		resetTip : function() {
			tip.css({
				'transform':'rotate('+tipPos.min+'deg)',
				'-webkit-transform':'rotate('+tipPos.min+'deg)',
				'-moz-transform':'rotate('+tipPos.min+'deg)',
				'-o-transform':'rotate('+tipPos.min+'deg)'
			});
		},
		
		blockButtons : function() {
			no.addClass('disabled');
			yes.addClass('disabled');
		},
		
		unblockButtons : function() {
			no.removeClass('disabled');
			yes.removeClass('disabled');
		},
		
		action : function() {
		
			no.click(function(){
				if($(this).hasClass('disabled')) return false;
				Gauge.blockButtons();
				Gauge.resetTip();
				Gauge.decreaseResults();
				return false;
			});
			
			yes.click(function(){
				if($(this).hasClass('disabled')) return false;
				Gauge.blockButtons();
				Gauge.resetTip();
				Gauge.increaseResults();
				return false;
			});
		
		},
		
		enable : function(opts) {
		
			tip = opts.tip;
			no = opts.no;
			yes = opts.yes;
			
			this.action();
		
		}
		
	}	
	
})();

$(document).ready(function(){
	Gauge.enable({
		tip : $('div.tip'),
		no : $('a.no'),
		yes : $('a.yes'),
	})
});
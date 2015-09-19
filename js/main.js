$(document).ready(function() {
    

    var masterurl = "https://spreadsheets.google.com/feeds/list/18wSsuoh49ZMTeFRDEv7oDPWBrxf-4AWDYVIpfTle3b0/default/public/values?alt=json";
	$.getJSON(masterurl, function(data) {
		data = clean_google_sheet_json(data);

		ctmphtml = $("#content-template").html();
		contenttemplate = Handlebars.compile(ctmphtml);

		$.each(data, function() {
			var currentsec = '#' + this.section + '-section';
			var currenthtml = contenttemplate(this);
			$(currentsec).append(currenthtml);
		});

		$('#fullpage').fullpage({
    	anchors: ['coverPage', 'navPage', 'sections']
    	});
	});
});

function clean_google_sheet_json(data){
	var formatted_json = [];
	var elem = {};
	var real_keyname = '';
	$.each(data.feed.entry, function(i, entry) {
		elem = {};
		$.each(entry, function(key, value){
			// fields that were in the spreadsheet start with gsx$
			if (key.indexOf("gsx$") == 0) 
			{
				// get everything after gsx$
				real_keyname = key.substring(4); 
				elem[real_keyname] = value['$t'];
			}
		});
		formatted_json.push(elem);
	});
	return formatted_json;
}

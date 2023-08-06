'use strict';

window.onload=init();

function init() {
	console.log("Init Load Success");
	loadUploadedFileData();
}

function loadUploadedFileData() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/csv/tutorials");

    xhr.onload = function() {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        if(xhr.status == 200) {
			if (response.length>0){
				console.log("Data load success")
				var output = response.map(i => "<tr><td>" + i.id + "</td><td>" + i.title + "</td><td>" + i.description + "</td><td>" + i.published + "</td></tr>");
               $("#studentdata").html(output);
			}
        } else {
          	console.log("Data not loaded successfull")
        }
    }

    xhr.send();
}


		
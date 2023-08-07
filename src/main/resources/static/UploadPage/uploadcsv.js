'use strict';

var singleUploadForm = document.querySelector('#singleUploadForm');
var singleFileUploadInput = document.querySelector('#singleFileUploadInput');
var singleFileUploadError = document.querySelector('#singleFileUploadError');
var singleFileUploadSuccess = document.querySelector('#singleFileUploadSuccess');
var rowItem = document.querySelector('#studentdata')

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
				console.log(rowItem);
				rowItem.innerHTML = output;
//				document.getElementById("studentdata").appendChild(output)
//               $("#studentdata").html(output);
//				document.querySelector('#studentdata').innerHTML(output)
			}
        } else {
          	console.log("Data not loaded successfull")
        }
    }

    xhr.send();
}

function uploadSingleFile(file) {
    var formData = new FormData();
    formData.append("file", file);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/csv/upload");

    xhr.onload = function() {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        if(xhr.status == 200) {
            singleFileUploadError.style.display = "none";
            singleFileUploadSuccess.innerHTML = "<p>File Uploaded Successfully.</p><p>DownloadUrl : <a href='" + response.fileDownloadUri + "' target='_blank'>" + response.fileDownloadUri + "</a></p>";
            singleFileUploadSuccess.style.display = "block";
            loadUploadedFileData();
        } else {
            singleFileUploadSuccess.style.display = "none";
            singleFileUploadError.innerHTML = "<p>"+(response && response.message)+"<p>" || "Some Error Occurred";
            singleFileUploadSuccess.style.display = "block";

        }
    }

    xhr.send(formData);
}

singleUploadForm.addEventListener('submit', function(event){
    var files = singleFileUploadInput.files;
    if(files.length === 0) {
        singleFileUploadError.innerHTML = "Please select a file";
        singleFileUploadError.style.display = "block";
    }
    uploadSingleFile(files[0]);
    event.preventDefault();
}, true);



		
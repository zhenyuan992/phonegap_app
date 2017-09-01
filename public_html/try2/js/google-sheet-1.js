// Variable to hold request
var request;
// Bind to the submit event of our form
$("#fooo").click(function () {
    // Abort any pending request
    //alert("im hehethethre :)");
    if (request) {
        //alert("need to abort");
        request.abort();
    }
    // setup some local variables
    var $form = $("#formtry");
    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");
    // Serialize the data in the form
    var serializedData = $form.serialize();
    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);
    // Fire off the request to /form.php
    //alert("before senigng");
    request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbxT3Y6AQb-7CCObAMhphdiIZJYTTUO1om7uR0zjuSTHEzYEOIXb/exec",
        type: "post",
        data: serializedData
    });
    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR) {
        // Log a message to the console
        console.log("Hooray, it worked!");
        console.log(response);
        console.log(textStatus);
        console.log(jqXHR);
        uploadFile();

    });
    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown) {
        // Log the error to the console
        console.error(
                "The following error occurred: " +
                textStatus, errorThrown
                );
        alert("some error happened :( \n" +
                textStatus.toString() + errorThrown.toString());
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
//    request.always(function () {
//        // Reenable the inputs
//        $inputs.prop("disabled", false);
//    });
    // Prevent default posting of form
    //event.preventDefault();
});

function _base64ToArrayBuffer(base64) {
    base64 = base64.split('data:image/png;base64,').join('');
    var binary_string =  window.atob(base64),
        len = binary_string.length,
        bytes = new Uint8Array( len ),
        i;

    for (i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

function uploadFile() {
    var lalala = "SDyNJ4RmLfUAA"+"AAAAAB3dXrWpHO";
    lalala +="Hjv6y8-LZYm9U";
    var what_about_this = lalala+"8genfx-KiGsXc"+"rsxKxMyTWRX";
    var dbx = new Dropbox({accessToken: what_about_this});
    //var img_data = localStorage.getItem("10image");
    var file_name = $("#phototime").html();
    file_name += ".png";
    //$output_file = base64_to_jpeg(localStorage.getItem("10image"), $output_file);
    var dataa = localStorage.getItem("10image");
    try {
        var imageData = _base64ToArrayBuffer(dataa);
    //$dataa = window.atob("iVBORw0KGgoAAAANSUhEUgAAACMAAAAaCAIAAACyznJrAAABPElEQVRIie2UP4qFMBDGx+WBZ5FXiBfxHLG2zRG8R3oLu2hpqa2ihSKCVmmEWGULWWE1b/zDbuevCvGb+SZjMgAPDw84lFIhhFJKCEEpxaTqHJxzbXjTNKumaZo/cPqUZSNDjF6GYex3KaXv99uyLNu2sTIB5nk2TXNd42KMIAiklEi9F7p3SBiGiFNRFKtTURRInq9DJ9d1l7YEQbD/2nWddn3KaZ8Racs0TXihmJPv+5udpVjHcfbisizXdZZlF5wIIXtRkiRt254v/xTL/78UcuYx/YIQwjlf7vS/OGknwiWn5UkNw4DLjm/5SaSUB07GD57nxXF8Y6JUVQUAfd9fC7txIzjnyLBf2XYviiKtjlL6abLVdQ0A4zheqg8AQHsmxphSKk1TbcjhgfRo51ue50opxtidjAAA8A0d3VRsOLdMxQAAAABJRU5ErkJggg==");
    } catch (err){
        alert("error in base 64 decode here" +err.message);
    }
//var fileInput = document.getElementById('file-upload');
    //var file = //fileInput.files[0];
    alert("im uploading to dropbox"); //data:image/png;base64,
    dbx.filesUpload({path: '/' + "photos_from_photo_print/" + file_name.replace(/\s+/, "") , contents: imageData })
            .then(function (response) {
                //var results = document.getElementById('results');
                //results.appendChild(document.createTextNode('File wahaha uploaded!'));
                alert("file uploaded to dropbox and googlesheets");
                console.log(response);
                window.location.href = "../index.html";
            })
            .catch(function (error) {
                alert(" errorrr dropbox");
                console.error(error);
                //var results = document.getElementById('results');
                //results.appendChild(document.createTextNode("something failed:" + error.toString()));
            });
    //alert("im here!!");
    //window.location.href = "try1.html";
    return false;
}
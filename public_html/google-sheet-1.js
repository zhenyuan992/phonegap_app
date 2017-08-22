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
        alert("successfully google\n now  for dropbox :)");
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

function base64_to_jpeg($base64_string, $output_file) {
    // open the output file for writing
    $ifp = fopen( $output_file, 'wb' ); 

    // split the string on commas
    // $data[ 0 ] == "data:image/png;base64"
    // $data[ 1 ] == <actual base64 string>
    $data = explode( ',', $base64_string );

    // we could add validation here with ensuring count( $data ) > 1
    fwrite( $ifp, base64_decode( $data[ 1 ] ) );

    // clean up the file resource
    fclose( $ifp ); 

    return $output_file; 
}
function uploadFile() {
    alert("im uploading to dropbox ");
    var ACCESS_TOKEN = "SDyNJ4RmLfUAAAAAAAB3dXrWpHOHjv6y8-LZYm9U8genfx-KiGsXcrsxKxMyTWRX";
    var dbx = new Dropbox({accessToken: ACCESS_TOKEN});
    //var img_data = localStorage.getItem("10image");
    var file_name = $("#phototime").html();
    file_name += ".png";
    //$output_file = base64_to_jpeg(localStorage.getItem("10image"), $output_file);
    //$dataa = localStorage.getItem("10image");
    //$dataa = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $dataa));
    //var fileInput = document.getElementById('file-upload');
    //var file = //fileInput.files[0];
    alert("im uploading to dropbox 2"); //data:image/png;base64,
    dbx.filesUpload({path: '/' + "photos_from_photo_print/" + file_name.replace(/\s+/, "") , contents: "iVBORw0KGgoAAAANSUhEUgAAACMAAAAaCAIAAACyznJrAAABPElEQVRIie2UP4qFMBDGx+WBZ5FXiBfxHLG2zRG8R3oLu2hpqa2ihSKCVmmEWGULWWE1b/zDbuevCvGb+SZjMgAPDw84lFIhhFJKCEEpxaTqHJxzbXjTNKumaZo/cPqUZSNDjF6GYex3KaXv99uyLNu2sTIB5nk2TXNd42KMIAiklEi9F7p3SBiGiFNRFKtTURRInq9DJ9d1l7YEQbD/2nWddn3KaZ8Racs0TXihmJPv+5udpVjHcfbisizXdZZlF5wIIXtRkiRt254v/xTL/78UcuYx/YIQwjlf7vS/OGknwiWn5UkNw4DLjm/5SaSUB07GD57nxXF8Y6JUVQUAfd9fC7txIzjnyLBf2XYviiKtjlL6abLVdQ0A4zheqg8AQHsmxphSKk1TbcjhgfRo51ue50opxtidjAAA8A0d3VRsOLdMxQAAAABJRU5ErkJggg=="})
            .then(function (response) {
                //var results = document.getElementById('results');
                //results.appendChild(document.createTextNode('File wahaha uploaded!'));
                alert("file uplaoded to dropbox");
                console.log(response);
            })
            .catch(function (error) {
                alert(" errorrr dropbox");
                console.error(error);
                //var results = document.getElementById('results');
                //results.appendChild(document.createTextNode("something failed:" + error.toString()));
            });
    return false;
}
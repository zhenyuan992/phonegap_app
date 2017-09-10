// Variable to hold request
var request;
// Bind to the submit event of our form
function submit_orders(stringg) {
    alert(stringg);
}
function add_personal_details_into_invisform(orderid) {

    var pDetails = localStorage.getItem("personalData");
    var pDe = JSON.parse(pDetails);
    var html_input_text = "";
    html_input_text += "<input id='name' name='name' type='text' value='" + pDe.name + "'>";
    html_input_text += "<input id='email' name='email' type='email' value='" + pDe.email + "'>";
    html_input_text += "<input id='phone' name='phone' type='tel' value='" + pDe.phone + "'>";
    html_input_text += "<input id='address1' name='address1' type='text' value='" + pDe.addr1 + "'>";
    html_input_text += "<input id='address2' name='address2' type='text' value='" + pDe.addr2 + "'>";
    html_input_text += "<input id='postalcode' name='postalcode' type='number' value='" + pDe.postal + "'>";
    //html_input_text += "<input type='radio' name='photosize' value='" + localStorage.getItem("7size") + "' checked>";
    //html_input_text += "<input id='quantity' name='quantity' type='number' value='" + localStorage.getItem("8qty") + "'>";
    //html_input_text += "<textarea id='message' name='message' rows='5'>" + localStorage.getItem("9message") + "</textarea>";
    //photo_time += "Q" + localStorage.getItem("8qty") + "R" + localStorage.getItem("7size");
    html_input_text += "<input id='orderid' name='orderid' type='text' value='" + orderid + "'>";
    //var html_list = "<div id='phototime'>" + photo_time + " </div>";
    $$("#formtry").html(html_input_text);
    return true;
}
function submit_invisform_to_google() {
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
        alert(response.text + "\n" + textStatus + "\n" + jqXHR.text);
        alert("finished google upload, now for dropbox");
        //uploadFile();
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

}

function _base64ToArrayBuffer(base64) {
    base64 = base64.split('data:image/png;base64,').join('');
    var binary_string = window.atob(base64),
            len = binary_string.length,
            bytes = new Uint8Array(len),
            i;

    for (i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
var lalala = "SDyNJ4RmLfUAA" + "AAAAAB3dXrWpHO";
lalala += "Hjv6y8-LZYm9U";
var what_about_this = lalala + "8genfx-KiGsXc" + "rsxKxMyTWRX";
var ethethet = "SDyNJ4RmLfUAAAAAAAB3jix_WM1mXlBcbvYAOmyZQnaHgnRmyUNAAPViThORBhep";
function create_dropbox_folder(folder_name) {
    var dbx = new Dropbox({accessToken: ethethet});
    dbx.filesCreateFolder({path: '/' + "photos_from_photo_print/" + folder_name.replace(/\s+/, ""),
        autorename: true}).then(function (response) {
        //var results = document.getElementById('results');
        //results.appendChild(document.createTextNode('File wahaha uploaded!'));
        alert("folder created");
        console.log(response);
    })
            .catch(function (error) {
                alert(" errorrr dropbox");
                console.error(error);
            });
}
function upload_pic(folder_name, pic_name, imageData) {
    alert("uploading pic" + pic_name);
    var dbx = new Dropbox({accessToken: ethethet});
    //var sucess = false;
    var responsee;
    try {
        dbx.filesUpload({path: '/' + "photos_from_photo_print/" + folder_name.replace(/\s+/, "") + "/" + pic_name.replace(/\s+/, ""),
            contents: imageData})
                .then(function (response) {
                    alert("pic " + pic_name + " is uploaded.");
                    responsee = response;
                    return true;
                })
                .catch(function (error) {
                    alert("pic " + pic_name + " is errorrr: dropbox");
                    console.error(error);
                    alert("error" + error);
                    return wrgwrgwr;
                });
        return true;
    } catch (err) {
        alert("pic upload is errorrr: dropbox");
        return false;
    }
    //alert("(responsee.name === pic_name)" + (responsee.name === pic_name));
    //return (responsee.name === pic_name);
}
function storage_to_imagefile(dataa) {
    try {
        var imageData = _base64ToArrayBuffer(dataa);
        return imageData;
    } catch (err) {
        alert("error in base 64 decode here" + err.message);
        return false;
    }
}
function uploadFile() { // NOT USED!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    var dbx = new Dropbox({accessToken: what_about_this});
    //var img_data = localStorage.getItem("10image");
    var file_name = $("#phototime").html();
    file_name += ".png";
    var dataa = localStorage.getItem("10image");
    try {
        var imageData = _base64ToArrayBuffer(dataa);
    } catch (err) {
        alert("error in base 64 decode here" + err.message);
    }
    alert("im uploading to dropbox"); //data:image/png;base64,
    dbx.filesUpload({path: '/' + "photos_from_photo_print/" + file_name.replace(/\s+/, ""),
        contents: imageData})
            .then(function (response) {
                alert("file uploaded to dropbox");
                console.log(response);
                return true;
            })
            .catch(function (error) {
                alert(" errorrr dropbox");
                return false;
                console.error(error);
            });
    return false;
}
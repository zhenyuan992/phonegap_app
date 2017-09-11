var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {dynamicNavbar: true});
var storedPersonalData;
var orderDetails;
var orderList;
var picData;
// keys in localStorage:
//"personalData" json of personal data,
//"orderDetails" json of order details
//"orderList" binary list of present orders.
// "order0","pic0", "order1","pic1",.... "order1" contains "orderDetails"
myApp.onPageInit('about', function (page) {
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});
myApp.onPageInit('form_order', function (page) {
    // try2_form_order.html // specify the photosize, quantity, message 
    $$('.get-order').on('click', function () {
        orderDetails = myApp.formGetData('my-form-order');
        //alert(orderDetails.quantity);
        mainView.router.load({url: "try2_form_pic.html"});
    });
});
function list_order_template(orderN, size, qty, msg) {//given some inputs, return the proper list view html
    var html_string = "<li>";
    //html_string += "size" + size + qty + name;
    html_string += '<div class="item-content">';
    html_string += '<div class="item-media" ' + '>';
    html_string += '<img src="images/no_image.png" width="60" id="media' + orderN + '"></div> ';
    html_string += '<div class="item-inner"><div class="item-title-row">';
    html_string += '<div class="item-title">Quantity: ' + qty + ' pieces</div>';
    html_string += '<div class="item-after"><span>Remove </span><icon class="f7-icons remove_pic" id="ord' + orderN + '">close_round</icon>' + '</div>';
    html_string += '</div>';
    html_string += '<div class="item-subtitle" id="mediaaa">size=' + size + '</div>';
    html_string += '<div class="item-text">message=' + msg + '</div></div></div>';
    return html_string + "</li>";
}

function return_html_in_summary_list() {
    var html_list = "<ul>";
    var order_number = 1;
    for (i = 0; i < orderList.length; i++) {
        if (orderList[i] === 1) {
            var orderD = localStorage.getItem("order" + i.toString());
            var orderD1 = JSON.parse(orderD);
            html_list += list_order_template(order_number, orderD1.photosize, orderD1.quantity, orderD1.message);
            order_number += 1;
        }
    }
    return html_list + "</ul>";
}
function return_html_personal_details() {
    var html_list = "<ul>";
    html_list += '<li><div class="item-content"><div class="item-title">Name:</div><div class="item-content" >' + storedPersonalData.name + '</div></div></li>';
    html_list += '<li><div class="item-content"><div class="item-title">Email:</div><div class="item-content" >' + storedPersonalData.email + '</div></div></li>';
    html_list += '<li><div class="item-content"><div class="item-title">Contact number:</div><div class="item-content" >' + storedPersonalData.phone + '</div></div></li>';
    html_list += '<li><div class="item-content"><div class="item-title">Address:</div><div class="list-block inset">'
            + '<ul><li class="item-content">'
            + storedPersonalData.addr1 + '</li><li class="item-content">' + storedPersonalData.addr2 + '</li><li class="item-content">' + storedPersonalData.postal
            + '</li></ul>'
            + '</div></div></li>'; //ends list block
    return html_list + "</ul>";
}
function add_images_to_sumlist() {
    var order_number = 1;
    for (i = 0; i < orderList.length; i++) {
        if (orderList[i] === 1) {
            var img_data = localStorage.getItem("pic" + i.toString());
            $$('#media' + order_number).attr('src', img_data);
            order_number += 1;
        }
    }
}
function update_sum_lists() {
    var html_list = return_html_in_summary_list();
    $$("#all-orders").html(html_list);
    add_images_to_sumlist();//and links to remove
    $$("#all-p-details").html(return_html_personal_details());
}
function count_orders() {
    var order_count = 0;
    for (i = 0; i < orderList.length; i++) {
        if (orderList[i] === 1) {
            order_count += 1;
        }
    }
    return order_count;
}
function add_remove_js(){
    $$('.remove_pic').on('click', function () {
        var remove_id = $(this).attr("id");
        //alert("clicked:" + remove_id);
        alert("Removing 1 order!");
        if (count_orders()>1){
            var order_number = 1;
            for (i = 0; i < orderList.length; i++) {
                if (orderList[i] === 1) {
                    if (("ord" + order_number) === (remove_id)) {
                        orderList[i] = 0;
                    }
                    order_number += 1;
                }
            }
            update_sum_lists();
            add_remove_js();
        } else{
            alert("You have no more orders!!");
            orderList = false;
            mainView.router.load({
            url: "try2_form_order.html"
        });
        }
    });
}
myApp.onPageInit('form_sum', function (page) {
    // alter the list view to display thumbnail of orders
    update_sum_lists();
    add_remove_js();
    $$('.add-order').on('click', function () {
        alert("im going to add new order");
        mainView.router.load({
            url: "try2_form_order.html"
        });
    });
    $$('.cancel-orders').on('click', function () {
        mainView.router.back({
            url: "try2.html",
            force: true
        });
    });
    $$('.submit-order').on('click', function () {
        if (!Date.now) {
            Date.now = function now() {
                return new Date().getTime();
            };
        }
        var orderID = Date.now();
        if (add_personal_details_into_invisform(orderID)) {
            submit_invisform_to_google();
        }
        var good = true;
        for (i = 0; i < orderList.length; i++) {
            if (orderList[i] === 1) {
                var dataa = localStorage.getItem("pic" + i.toString());
                var orderD = localStorage.getItem("order" + i.toString());
                var orderD1 = JSON.parse(orderD); // quantity photosize message
                var image_data = storage_to_imagefile(dataa);
                var pic_file_name = "pic" + i.toString() + "_Q" + orderD1.quantity + "_" + orderD1.photosize + ".png";
                if (!upload_pic("order_id" + orderID, pic_file_name, image_data)) {
                    good = false;
                }
            }
        }
        alert("have submitted all orders, going back home page\nhave files been sent?" + good);
        if (good) {
            mainView.router.back({
                url: "try2.html",
                force: true
            });
        } else {
            alert("not yet done!!");
        }
    });
});

myApp.onPageInit('form_order_pic', function (page) {
//try2_form_pic.html must have json orderDetails inside
    var file_sizeee;
    var finalWidth = 1024; // The desired width for final image output 250 187 1000 748
    var finalHeight = 850;
    $('.image-editor').cropit();
    $$('.get-order-pic').on('click', function () {
        if (file_sizeee > 1) {
            var sizeRatio = finalHeight / finalWidth,
                    newWidth = $('.image-editor').width(),
                    //newHeight = newWidth * sizeRatio,
                    newZoom = finalWidth / newWidth;
            $('.image-editor').cropit('exportZoom', newZoom);
            var imageData = $('.image-editor').cropit('export', {
                originalSize: false,
                quality: 1
            });
            var current_count;
            if (orderList) {
                current_count = orderList.length;
                orderList.push(1);
            } else {
                current_count = 0;
                orderList = [1];
            }
            try {
                localStorage.setItem("pic" + current_count.toString(), imageData);
                localStorage.setItem("order" + current_count.toString(), JSON.stringify(orderDetails));
                var myClass = $(this).attr("class");
                //alert(myClass[25]);
                if (myClass[25] === "2") {
                    mainView.router.load({url: "try2_form_summary.html"});
                } else if (myClass[25] === "1") {
                    mainView.router.load({url: "try2_form_order.html"});
                } else {
                    return eorrrer;
                }
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("please choose a photo before submission.");
        }
    });

    $('.rotate-cw').click(function () {
        $('.image-editor').cropit('rotateCW');
    });
    $('.rotate-ccw').click(function () {
        $('.image-editor').cropit('rotateCCW');
    });
    window.URL = window.URL || window.webkitURL;
    var elBrowse = document.getElementById("real-pic"),
            elPreview = document.getElementById("preview2"),
            useBlob = false && window.URL;
    function readImage(file) {
        var reader = new FileReader();
        // Once a file is successfully readed:
        reader.addEventListener("load", function () {
            var image = new Image();
            image.addEventListener("load", function () {
                // Concatenate our HTML image info 
                var selected_size = "4";//localStorage.getItem("7size");
                selected_size = orderDetails.photosize;
                file_sizeee = image.width;
                var wrong_size = "";
                // 10cm10 is 945pix, 15cm 1417, 7.5cm 709px, 5cm 472px,
                if (selected_size === "4R") {
                    if (image.width < 800) {
                        wrong_size = "<tr><th>WARNING!!</th><th> Image should be 1050x1500 to have good quality</th></tr>";
                    }
                } else if (selected_size === "5R") {
                    if (image.width < 1800) {
                        wrong_size = "<tr><th>WARNING!!</th><th> Image should be 1200x1800 to have good quality</th></tr>";
                    }
                } else if (selected_size === "3R") {
                    if (image.width < 800) {
                        wrong_size = "<tr><th>WARNING!!</th><th> Image should be 400x600 to have good quality</th></tr>";
                    }
                } else if (selected_size === "6R") {
                    if (image.width < 2100) {
                        wrong_size = "<tr><th>WARNING!!</th><th> Image should be 1500x2100 to have good quality</th></tr>";
                    }
                }
                var imageInfo = "<div class='content-block'> <table>" +
                        "<tr><th>File Name</th><th>" + file.name + "</th></tr>" +
                        "<tr><th>Image dimension</th><th>" + image.width + "×" + image.height + "</th></tr>" +
                        "<tr><th>Image size</th><th>" + Math.round(file.size / 1024) + "KB" + "</th></tr>" +
                        wrong_size +
                        "</table></div>";
                // Finally append our created image and the HTML info string to our `#preview` 
                elPreview.innerHTML = imageInfo;
                if (useBlob) {
                    // Free some memory for optimal performance
                    window.URL.revokeObjectURL(image.src);
                }
            });
            image.src = useBlob ? window.URL.createObjectURL(file) : reader.result;
        });
        // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
        reader.readAsDataURL(file);
    }
    elBrowse.addEventListener("change", function () {
        var files = this.files;
        // Let's create an empty `errors` String to collect eventual errors into:
        var errors = "";
        if (!files) {
            errors += "File upload not supported by your browser.";
        }
        if (files && files[0]) {
            // Iterate over every File object in the FileList array
            var i = files.length - 1;
            // Let's refer to the current File as a `file` variable
            // https://developer.mozilla.org/en-US/docs/Web/API/File
            var file = files[i];
            // Test the `file.name` for a valid image extension:
            // (pipe `|` delimit more image extensions)
            // The regex can also be expressed like: /\.(png|jpe?g|gif)$/i
            if ((/\.(png|jpeg|jpg|gif)$/i).test(file.name)) {
                // SUCCESS! It's an image!
                // Send our image `file` to our `readImage` function!
                readImage(file);
            } else {
                errors += file.name + " Unsupported Image extension\n";
            }
        }
        if (errors) {
            alert("error in loading image:" + errors);
        }
    });
});

myApp.onPageInit('form_personal_details', function (page) {
    // Do something here for "about" page
    myApp.params.swipeBackPage = false;
    if (checkConnection() && CheckBrowser()) {
        // continue
        $$('.get-storage-data').on('click', function () {
            var check_fields = ["name", "email", "phone", "addr1", "postal"];
            var passed_checks = true;
            for (var i = 0; ((i < check_fields.length) && passed_checks); i++) {
                var valuee = $$("#" + check_fields[i]).val();
                if (!valuee) {
                    alert("Please input a value for: " + check_fields[i]);
                    passed_checks = false;
                } else if (i === 1) {
                    if (!validateEmail(valuee)) {
                        alert("Please input a valid email address");
                        passed_checks = false;
                    }
                } else if (i === 2) {
                    if (!valuee.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,8}$/im)) {
                        alert("Please input a valid phone number \n (no letters) ");
                        passed_checks = false;
                    }
                }
            }
            if (passed_checks) {
                storedPersonalData = myApp.formGetData('my-form-pd');
                if (storedPersonalData) {
                    //alert(JSON.stringify(storedData));
                    localStorage.setItem("personalData", JSON.stringify(storedPersonalData));
                    mainView.router.load({url: "try2_form_order.html"});
                    //alert(storedData.name);//JSON.stringify(storedData));
                } else {
                    alert('local storage doesnt apply, im going back.');
                    mainView.router.back(reload = true);
                }
            }
        });
    } else {
        alert("im going back");
        mainView.router.back(reload = true);
    }
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var dynamicPageIndex = 0;
var connectionStatus = false;
function createContentPage() {
    mainView.router.loadContent('<!-- Top Navbar-->' + '<div class="navbar">' + '  <div class="navbar-inner">' + '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' + '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' + '  </div>' + '</div>' + '<div class="pages">' + '  <!-- Page, data-page contains page name-->' + '  <div data-page="dynamic-pages" class="page">' + '    <!-- Scrollable page content-->' + '    <div class="page-content">' + '      <div class="content-block">' + '        <div class="content-block-inner">' + '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' + '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' + '        </div>' + '      </div>' + '    </div>' + '  </div>' + '</div>');
    return;
}
function checkConnection() {
    connectionStatus = navigator.onLine ? 'online' : 'offline';
    if (connectionStatus === "online") {
        //alert(connectionStatus);
        return true;
    } else if (connectionStatus === "offline") {
        alert("You are " + connectionStatus + ". Please connect to the internet via Wifi or 3G or 4G");
        return false;
    }
}
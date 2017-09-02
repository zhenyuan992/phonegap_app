var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {dynamicNavbar: true});
var storedPersonalData;
var orderDetails;
var picData;
myApp.onPageInit('about', function (page) {
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});
myApp.onPageInit('form_order', function (page) {
    //alert("im in new page");
    $$('.get-order').on('click', function () {
        orderDetails = myApp.formGetData('form_order');
        mainView.router.load({url: "try2_form_pic.html"});
    });
});
myApp.onPageInit('form_order_pic', function (page) {
    
    //$(function () {
        $('.image-editor').cropit();
        $('.export').click(function () {
            var imageData = $('.image-editor').cropit('export', {
                originalSize: true,
                quality: 1
            }
            );
            //$('.hidden-image-data').val(imageData);
            //$('#result-data').text(imageData);
            localStorage.setItem("10image", imageData);
            window.location.href = "try1_page3.html";
        });
        $('.rotate-cw').click(function () {
            $('.image-editor').cropit('rotateCW');
        });
        $('.rotate-ccw').click(function () {
            $('.image-editor').cropit('rotateCCW');
        });
    //});
    alert("im in new page");
    $$('.get-order').on('click', function () {
        orderDetails = myApp.formGetData('form_order');
        mainView.router.load({url: "try2_form_pic.html"});
    });
});



myApp.onPageInit('form_personal_details', function (page) {
    // Do something here for "about" page
    if (checkConnection() && CheckBrowser()) {
        //continue
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
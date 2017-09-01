var myApp = new Framework7();
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {dynamicNavbar: true});
myApp.onPageInit('about', function (page) {
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

myApp.onPageInit('form', function (page) {
    // Do something here for "about" page
    if (checkConnection() && CheckBrowser() ) {
        //continue
        $$('.get-storage-data').on('click', function () {
            var check_fields = ["name", "email", "phone"];
            var passed_checks = true;
            for (var i = 0; i < check_fields.length; i++) {
                var valuee = $$("#" + check_fields[i]).val();
                if (!valuee) {
                    alert("Please input a value for: " + check_fields[i]);
                    passed_checks = false;
                }
                if (i === 1) {
                    if (!validateEmail(valuee)) {
                        alert("Please input a valid email address");
                        passed_checks = false;
                    }
                }
            }
            if (passed_checks) {
                var storedData = myApp.formGetData('my-form');
                if (storedData) {
                    alert(JSON.stringify(storedData));
                    alert(storedData.name);//JSON.stringify(storedData));
                } else {
                    alert('There is no stored data for this form yet. Try to change any field');
                }
            }
        });
    } else {
        alert("im going back");
        mainView.router.back(reload=true);
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
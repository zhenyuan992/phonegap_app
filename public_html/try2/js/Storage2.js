function SaveItem() {
    alert("in storage");
    localStorage.clear();
    var name = document.forms.ShoppingList.name.value;
    var email = document.forms.ShoppingList.email.value;
    var phone = document.forms.ShoppingList.phone.value;
    var addr1 = document.forms.ShoppingList.address1.value;
    var addr2 = document.forms.ShoppingList.address2.value;
    var postal = document.forms.ShoppingList.postalcode.value;
    localStorage.setItem("1name", name);
    localStorage.setItem("2email", email);
    localStorage.setItem("3phone", phone);
    localStorage.setItem("4addr1", addr1);
    localStorage.setItem("5addr2", addr2);
    localStorage.setItem("6postal", postal);
    SavePicInfo();
    alert("savedd!!");
    window.location.href = "try2_page2.html";
}
function SavePicInfo(){
    var size = document.forms.ShoppingList.photosize.value;
    var qty = document.forms.ShoppingList.quantity.value;
    var message = document.forms.ShoppingList.message.value;
    localStorage.setItem("7size", size);
    localStorage.setItem("8qty", qty);
    localStorage.setItem("9message", message);
}
function ClearAll() {
    localStorage.clear();
    doShowAll();
}
// dynamically draw the table
function doShowAll() {
    if (CheckBrowser()) {
        var key = "";
        var list = "<tr><th>Name</th><th>Value</th></tr>\n";
        var i = 0;
        for (i = 0; i <= localStorage.length - 1; i++) {
            key = localStorage.key(i);
            list += "<tr><td>" + key + "</td>\n<td>"
                    + localStorage.getItem(key) + "</td></tr>\n";
        }
        if (list === "<tr><th>Name</th><th>Value</th></tr>\n") {
            list += "<tr><td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
        }
        document.getElementById('list').innerHTML = list;
    } else {
        alert('Your browser do not support local storage:(');
    }
}

/*
 * Checking the browser compatibility.
 */
function CheckBrowser() {
    if ('localStorage' in window && window['localStorage'] !== null) {
        // we can use localStorage object to store data
        return true;
    } else {
        //alert("Your browser is not supported :(, please contact us via email.")
        return false;
    }
}
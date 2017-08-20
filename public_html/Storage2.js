function SaveItem() {
    localStorage.clear();
    var name = document.forms.ShoppingList.name.value;
    var email = document.forms.ShoppingList.email.value;
    var phone = document.forms.ShoppingList.phone.value;
    var addr1 = document.forms.ShoppingList.address1.value;
    var addr2 = document.forms.ShoppingList.address2.value;
    var postal = document.forms.ShoppingList.postalcode.value;
    var size = document.forms.ShoppingList.photosize.value;
    var qty = document.forms.ShoppingList.quantity.value;
    var message = document.forms.ShoppingList.message.value;
    localStorage.setItem("key1", name);
    localStorage.setItem("key2", email);
    localStorage.setItem("key3", phone);
    localStorage.setItem("key4", addr1);
    localStorage.setItem("key5", addr2);
    localStorage.setItem("key6", postal);
    localStorage.setItem("key7", size);
    localStorage.setItem("key8", qty);
    localStorage.setItem("key9", message);
    //doShowAll();
    alert("im here!");
    window.location.href = "try1_page2.html";
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
        if (list == "<tr><th>Name</th><th>Value</th></tr>\n") {
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
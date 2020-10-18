
function dropDownClicked() {
    document.getElementById("profileDropdown").classList.toggle("show");
}
//Got help from here.
//https://www.w3schools.com/howto/howto_js_dropdown.asp

window.onclick = function(event) {
    if (!event.target.matches('.avatar')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

var request = new XMLHttpRequest();

request.responseType = 'json';
request.open('GET', 'https://private-anon-2f317f3893-wad20postit.apiary-mock.com/users/1');
request.send();

request.onload = function () {
    let user = request.response;
    document.getElementById("nameUser").innerText = user.firstname + " " + user.lastname;
    document.getElementById("emailUser").innerText = user.email;
    document.getElementById("avatarIco").src = user.avatar;
}
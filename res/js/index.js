$("#avatarIco").click(function () {
    $("#profileDropdown").toggle()
});

$("body").click(function(event ){
    var $target = $(event.target);
    if(!$target.parents().is(".dropdown-content") && !$target.is(".dropdown-content") && !$target.is(".avatar")){
        $("body").find(".dropdown-content").hide();
    }
});
let request = new XMLHttpRequest();

request.responseType = 'json';
request.open('GET', 'https://private-anon-2f317f3893-wad20postit.apiary-mock.com/users/1');
request.send();

request.onload = function () {
    let user = request.response;
    $("#nameUser").text(user.firstname + " " + user.lastname);
    $("#emailUser").text(user.firstname + " " + user.email);
    $("#avatarIco").attr("src", user.avatar);
};
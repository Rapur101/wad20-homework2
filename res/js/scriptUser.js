//Task 1
$("#avatarIco").click(function() {
    $("#profileDropdown").toggle()
});

$("body").click(function(event) {
    const target = $(event.target);
    if (!target.parents().is(".dropdown-content") && !target.is(".dropdown-content") && !target.is(".avatar")) {
        $(".dropdown-content").hide();
    }
});

$.getJSON("https://private-anon-2f317f3893-wad20postit.apiary-mock.com/users/1", function(response) {
    const user = response;
    $("#nameUser").text(user.firstname + " " + user.lastname);
    $("#emailUser").text(user.firstname + " " + user.email);
    $("#avatarIco").attr("src", user.avatar);
}).fail(function() {
    console.log("Failed to fetch user information!");
})
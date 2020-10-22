$("#avatarIco").click(function () {
    $("#profileDropdown").toggle()
});

$("body").click(function(event ){
    var $target = $(event.target);
    if(!$target.parents().is(".dropdown-content") && !$target.is(".dropdown-content") && !$target.is(".avatar")){
        $("body").find(".dropdown-content").hide();
    }
});

let userRequest = new XMLHttpRequest()
let browseRequest = new XMLHttpRequest();

userRequest.responseType = 'json';
userRequest.open('GET', 'https://private-anon-2f317f3893-wad20postit.apiary-mock.com/users/1');
userRequest.send();

browseRequest.responseType = 'json';
browseRequest.open('GET', 'https://private-anon-4dfe848681-wad20postit.apiary-mock.com/profiles');
browseRequest.send();

browseRequest.onload = function () {
    let data = browseRequest.response;
    createItems(data);
};

userRequest.onload = function () {
    let user = userRequest.response;
    $("#nameUser").text(user.firstname + " " + user.lastname);
    $("#emailUser").text(user.firstname + " " + user.email);
    $("#avatarIco").attr("src", user.avatar);
};

const createItems = function (data) {
    const users = $('.browse-users');

    data.forEach(function(index, elem){
        const element = data[elem];
        const user = $('<div class="browse-user"></div>');
        const avatar = $(`<div class="browse-image-container"><img src="${element.avatar}"></div>`);
        const name = $(`<p class="browse-user-text">${element.firstname} ${element.lastname}</p>`);
        const button = $('<button class="browse-follow-button">Follow</button>');
        users.prepend(user);
        user.prepend(avatar);
        user.append(name);
        user.append(button);
    });

    $('.browse-follow-button').click(function(event){
        const button = $(event.currentTarget);

        if (button.hasClass('was-pressed')) {
            button.removeClass('was-pressed');
            button.text('Follow');
        } else {
            button.addClass('was-pressed');
            button.text('Followed');
        }
    });
}

//Task 3

const displayUsers = function(data) {
    const users = $('.browse-users');

    for (element of data) {
        const user = $('<div class="browse-user"></div>');
        const avatar = $(`<div class="browse-image-container"><img src="${element.avatar}"></div>`);
        const name = $(`<p class="browse-user-text">${element.firstname} ${element.lastname}</p>`);
        const button = $('<button class="browse-follow-button">Follow</button>');
        users.prepend(user);
        user.prepend(avatar);
        user.append(name);
        user.append(button);
    };

    $('.browse-follow-button').click(function() {
        const button = $(this);

        if (button.hasClass('was-pressed')) {
            button.removeClass('was-pressed');
            button.text('Follow');
        } else {
            button.addClass('was-pressed');
            button.text('Followed');
        }
    });
}

$.getJSON("https://private-anon-4dfe848681-wad20postit.apiary-mock.com/profiles", function(response) {
    displayUsers(response);
}).fail(function() {
    console.log("Failed to fetch users!");
})
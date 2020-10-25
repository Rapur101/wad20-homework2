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




//Task 2

const displayPosts = function(data) {
    const mainFeed = $('.main-container');

    for (post of data) {
        const postOwner = post.author;
        const postMedia = post.media;

        const postDiv = $('<div class="post"></div>');
        const postAuthor = $(`<div class="post-author"><span class="post-author-info">` +
            `<img src="${postOwner.avatar}" alt="Post author"><small>${postOwner.firstname} ` +
            `${postOwner.lastname}</small></span><small>${post.createTime}</small></div>`);
        postDiv.append(postAuthor);


        const postImage = $(`<div class="post-image"></div>`);
        if (postMedia !== null && postMedia.type === "image")
            postImage.append($(`<img src="${postMedia.url}" alt=""></img>`));
        else if (postMedia !== null && postMedia.type === "video")
            postImage.append($(`<video width="320" height="240" controls>` +
                `<source src="${postMedia.url}" type="video/mp4">` +
                `Your browser does not support the video tag.</video>`));
        postDiv.append(postImage);


        const postTitle = $(`<div class="post-title"></div>`);
        postDiv.append(postTitle);
        if (post.text !== null)
            postTitle.append($(`<h3>${post.text}</h3>`));


        const postLikes = $(`<div class="post-actions"><button type="button" name="like" class="like-button">${post.likes}</button></div>`)
        postDiv.append(postLikes);

        mainFeed.append(postDiv);
    }

    $('.like-button').click(function() {
        $(this).hasClass('liked') ? $(this).removeClass('liked') : $(this).addClass('liked');
    });
}

$.getJSON("https://private-anon-a878d01bcd-wad20postit.apiary-mock.com/posts", function(response) {
    displayPosts(response);
}).fail(function() {
    console.log("Failed to fetch posts!");
})



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
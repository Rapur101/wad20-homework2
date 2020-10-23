$("#avatarIco").click(function() {
    $("#profileDropdown").toggle()
});

$("body").click(function(event) {
    var $target = $(event.target);
    if (!$target.parents().is(".dropdown-content") && !$target.is(".dropdown-content") && !$target.is(".avatar")) {
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

browseRequest.onload = function() {
    let data = browseRequest.response;
    createItems(data);
};

userRequest.onload = function() {
    let user = userRequest.response;
    $("#nameUser").text(user.firstname + " " + user.lastname);
    $("#emailUser").text(user.firstname + " " + user.email);
    $("#avatarIco").attr("src", user.avatar);
};

const createItems = function(data) {
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

    $('.browse-follow-button').click(function(event) {
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


//Task 2
let postsRequest = new XMLHttpRequest();

postsRequest.responseType = 'json';
postsRequest.open('GET', 'https://private-anon-a878d01bcd-wad20postit.apiary-mock.com/posts');
postsRequest.send();

postsRequest.onload = function() {
    let data = postsRequest.response;
    createPosts(data);
};


const createPosts = function(data) {
    const mainFeed = $('.main-container');

    for (post of data) {
        const postOwner = post.author;
        const postMedia = post.media;

        const postDiv = $('<div class="post"></div>');
        const postAuthor = $(`<div class="post-author"><span class="post-author-info">` +
            `<img src="${postOwner.avatar}" alt="Post author"><small>${postOwner.firstname} ` +
            `${postOwner.lastname}</small></span><small>${post.createTime}</small></div>`);
        postDiv.append(postAuthor);


        if (postMedia !== null) {
            let postView = null;
            if (postMedia.type === "image") {
                postView = $(`<div class="post-image"><img src="${postMedia.url}" alt=""></div>`);
            } else postView = $(`<div class="post-image"><video width="320" height="240" controls>` +
                `<source src="${postMedia.url}" type="video/mp4">` +
                `Your browser does not support the video tag.</video></div>`);
            postDiv.append(postView);
        }

        if (post.text !== null) {
            const postTitle = $(`<div class="post-title"><h3>${post.text}</h3></div>`);
            postDiv.append(postTitle);
        }

        const postLikes = $(`<div class="post-actions"><button type="button" name="like" class="like-button">${post.likes}</button></div>`)
        postDiv.append(postLikes);


        $('.like-button').click(function(event) {
            const button = $(event.currentTarget);

            if (button.hasClass('liked')) {
                button.removeClass('liked');
            } else button.addClass('liked');
        });

        mainFeed.append(postDiv);
    }


}
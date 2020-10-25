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
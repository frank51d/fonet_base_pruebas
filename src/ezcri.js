$(document).ready(function () {
    $('.navbar-toggler, .overlay').on('click', function () {
        $('.mobileMenu, .overlay').toggleClass('open');
    });
});

$(document).ready(function () {
    $('.menuBtn').on('click', function () {
        $('.mobileMenu, .overlay').toggleClass('open');
    });
});

$(document).ready(function () {
    $('.dropdown-item').on('click', function () {
        $('.mobileMenu, .overlay').toggleClass('open');
    });
});

console.log("working ezcri")

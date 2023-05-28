$(function () {
    $("#header").load("header.html", function () {
        $("#film-link").removeClass("text-white");
        $("#film-link").addClass("text-secondary");
    });
    $("#footer").load("footer.html");
}) 
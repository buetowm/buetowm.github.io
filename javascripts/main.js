document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('octocat').addEventListener("click", function () { alert('hi!') });

    var innerElements = document.querySelectorAll('.inner p');
    for(var i = 0, len = innerElements.length; i < len; i++)
    {
        innerElements[i].addEventListener("click", function () { alert('hi!') });
    }

    var mainbottom = 30;
    var navElements = document.querySelectorAll('nav > ul > li > a');
    var navImgs = document.querySelectorAll('nav img');

    $(window).on('scroll', function () {
        stop = Math.round($(window).scrollTop());
        var below = stop > mainbottom;
        var mini = navElements[0].classList.contains('navMin');
        if (below && !mini) {

            for (var i = 0, len = navElements.length; i < len; i++)
                navElements[i].classList.add("navMin");

            for (var i = 0, len = navImgs.length; i < len; i++)
                navImgs[i].classList.add("navMin");
        }
        else if(!below && mini){

            for (var i = 0, len = navElements.length; i < len; i++)
                navElements[i].classList.remove("navMin");

            for (var i = 0, len = navImgs.length; i < len; i++)
                navImgs[i].classList.remove("navMin");

        }
    });
    
});
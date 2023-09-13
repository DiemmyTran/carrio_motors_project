$(document).ready(function() {
    $('#carouselExampleCaptions').on('slide.bs.carousel', function (event) {
        var previousSlide = $(event.from);
        var welcomeTitlePrevious = previousSlide.find('.welcome-title');
        welcomeTitlePrevious.removeClass('fadeInUp');

        var activeSlide = $(event.relatedTarget);
        var welcomeTitleActive = activeSlide.find('.welcome-title');
        welcomeTitleActive.addClass('fadeInUp');
    });
});


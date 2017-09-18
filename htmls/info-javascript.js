$('.info-btn').mouseover(function () {
    var newSrc = $(this).find('img').attr('src').replace('closed','open');
    $(this).find('img').attr('src',newSrc);
});
$('.info-btn').mouseleave(function () {
    var newSrc = $(this).find('img').attr('src').replace('open','closed');
    $(this).find('img').attr('src',newSrc);
})


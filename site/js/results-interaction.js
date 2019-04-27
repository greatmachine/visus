$('.accordion-item').on('click', function(){
     $(this).parent().find('.active').removeClass('active');
     $(this).removeClass('collapsed').addClass('active');
     $(this).siblings().addClass('collapsed');
});

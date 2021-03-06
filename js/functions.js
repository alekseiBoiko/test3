$(function(){
  changeHamburger();
  fixHeader();
  scrollButtons();
  drawSlider();
  turnonFancybox();
  sortIsotope();
  animBlock ();
  wow();
  }
);

function fixHeader() {
  let header = $('.header'), //хедер
      headerHeight = header.innerHeight(), // высота хедера
      content = $('body'); //контентная часть

  $(window).scroll(function() { //событие скролла страницы
    let windowScroll = $(this).scrollTop(); //скроллим от верха страницы
    if (windowScroll >= headerHeight) { //условие в котором смотрим просклорили страницу на высоту хедера или нет, если да:
      header.addClass('header_fixed'); //довешиваем класс на хедер
      content.css({ //довешиваем отступ на контент
        'padding-top': headerHeight
      })
    } 
    else { //в противном случае все удаляем
      header.removeClass('header_fixed');
      content.css({
        'padding-top': '0'
      })
    }
  })
};

function scrollButtons() {
  'use strict;';
  let window = $('body,html'),
      headerHeight = $('.header').innerHeight(),
      aboutHolder = $('.about').offset().top,
      workHolder = $('.works').offset().top;

  $('.logo-btn').on('click', function (event) {
    event.preventDefault();
    window.animate(       {
        scrollTop: window.offset().top
      }, 600
    );
  });

  $(".nav").on("click","a", function (event) {
    event.preventDefault();
    let navId = $(this).attr('href'),
        blockTop = $(navId).offset().top;            
    window.animate({scrollTop: blockTop - headerHeight}, 600);
  });

  $('.welcome-button').on('click', function (event) {
    event.preventDefault();
    window.animate(       {
        scrollTop: aboutHolder - headerHeight
      }, 600
    );
  });
  
  $('.about-button').on('click', function (event) {
    event.preventDefault();
    window.animate(
      {
        scrollTop: workHolder - headerHeight
      }, 600
    );
  });

}; 

function drawSlider() {
  $('.slick-slider-team').slick({
      
      slidesToShow: 4,
      infinite: true,
      dots: true,
      slidesToScroll: 2,
      slide: 'li',
      arrows: false,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }

      ]
    });
  
    $('.slick-slider-clients').slick({
      infinite: true,
      dots: true,
      slidesToShow: 5,
      slidesToScroll: 3,
      slide: 'li',
      arrows: false,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        }
      ]  
  });  

  $('.slick-slider-testimonials').slick({
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    slide: 'li',
    arrows: false
});  
};

function changeHamburger() {
  $('.menu-btn').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('menu-btn_active');
    $('.nav').toggleClass('nav_active');
  })
};

function turnonFancybox() {
  $("[data-fancybox]").fancybox();
};

function sortIsotope() {
  
  var $list = $('.works-list').isotope({
    itemSelector: '.works-item',
    percentPosition: true,
    layoutMode: 'fitRows'
  });
  
  $list.imagesLoaded().progress(function(){
    $list.isotope('layout');
  });
  
  $('.filter-list').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  // use filterFn if matches value
  // filterValue = filterFns[ filterValue ] || filterValue;
  $('.works-list').isotope({ filter: filterValue });
  });
  
  // change is-checked class on buttons
  $('.filter-list').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.filter-active').removeClass('filter-active');
      $( this ).addClass('filter-active');
    });
  });
};

function animBlock () {
  let animItems = document.querySelectorAll('._anim-items');  // получаем массив с классами, содержащими ._anim-items
  if (animItems.length > 0) {
    window.addEventListener('scroll',animOnScroll);
    function animOnScroll () {
      for (let index = 0; index < animItems.length; index++) {

        let animItem = animItems[index],  // назначаем переменную для элемента массива
            animItemHeight = animItem.offsetHeight, // для высоты элемента
            animItemOffset = offset(animItem).top, //  для верхней координаты элемента в документе
            animStart = 4, // для доли элемента, после скролла которой происходит анимация
            animItemPoint = window.innerHeight - animItemHeight / animStart;  // для точки прохождения доли элемента

        if (animItemHeight > window.innerHeight) { // вариант на случай, когда высота элемента выше окна
          animItemPoint = window.innerHeight  - window.innerHeight / animStart;
        }

        if ((pageYOffset > animItemOffset - animItemPoint) && (pageYOffset < animItemOffset + animItemHeight)) { // условие для события добавления класса
          animItem.classList.add('_active');
        }
        else {
            if (!animItem.classList.contains('_anim-no-hide')){ // прописываем класс при котором анимация не повторяется
            animItem.classList.remove('_active');               // в остальных случаях видимый класс убираем
            }
        }     
      }
    }

    function offset (el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
  }
};

function wow() {
  new WOW().init();
};

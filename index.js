


function Search(){
    $('.disappear').fadeOut("slow", function(){
        $(".disappear").addClass("d-none");
        $(".disappear").replaceWith('<input class="form-control" style="float: right; padding: 0; margin-top: 0; margin-bottom: auto;text-align: center;" type="text" placeholder="Search" aria-label="Search"  id="srch" data-bind="event: {keydown: onChange}, value: valor">').removeClass("d-none").fadeIn("slow");
    });

    }

// keep track of previous scroll position
let prevScrollPos = window.scrollY;

window.addEventListener('scroll', function() {
  // current scroll position
  const currentScrollPos = window.scrollY;

  if (prevScrollPos > currentScrollPos) {
    // user has scrolled up
    document.querySelector('.navbar').addClass('show');
  } else {
    // user has scrolled down
    document.querySelector('.navbar').removeClass('show');
  }

  // update previous scroll position
  prevScrollPos = currentScrollPos;
});


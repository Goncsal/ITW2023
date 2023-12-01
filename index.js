


function Search(){
    $('.disappear').fadeOut("slow", function(){
        $(".disappear").addClass("d-none");
        $(".disappear").replaceWith("<form><input type='text' id='username' name='username' placeholder='Search' class='form-control'></form>").removeClass("d-none").fadeIn("slow");
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
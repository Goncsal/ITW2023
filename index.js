


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

function randomly(){
  
  var list = ["920", "1920", "201189", "78167", "76001", "1628", "1629346", "2544", "2565", "980", "1628427", "1628396", "1631323", "2544", "2544", "2544", "2544", "2544", "2544", "2544", "203110", "1630535","201939", "406", "201935"]
  var l = './playerDetail.html?id='
  var elemlength = list.length;
  var randomnum = Math.floor(Math.random()*elemlength);
  var link = l + list[randomnum];

  $("#random").attr("href", link);
}

(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          
        }
        else{
          alert('Review Submetida!:D')
        }

        form.classList.add('was-validated')
        
      }, false)
    })
})()
 

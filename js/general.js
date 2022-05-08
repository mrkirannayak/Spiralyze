/*---------------------------------------------------------------------*/
(function ($) {
  /*================= Global Variable Start =================*/
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  var IEbellow9 = !$.support.leadingWhitespace;
  var iPhoneAndiPad = /iPhone|iPod/i.test(navigator.userAgent);
  var isIE =
    navigator.userAgent.indexOf("MSIE") !== -1 ||
    navigator.appVersion.indexOf("Trident/") > 0;
  function isIEver() {
    var myNav = navigator.userAgent.toLowerCase();
    return myNav.indexOf("msie") != -1
      ? parseInt(myNav.split("msie")[1])
      : false;
  }
  //if (isIEver () == 8) {}

  var jsFolder = "js/";
  var cssFolder = "css/";
  var ww = document.body.clientWidth,
    wh = document.body.clientHeight;
  var mobilePort = 767,
    ipadView = 1024,
    wideScreen = 1600;

  /*================= Global Variable End =================*/

  //css3 style calling
  document.write(
    '<link rel="stylesheet" type="text/css" href="' +
      cssFolder +
      'animate.css">'
  );

  /*================= On Document Load Start =================*/
  $(document).ready(function () {
    $("body").removeClass("noJS").addClass("hasJS");
    $(this).scrollTop(0);
    getWidth();

    //Set Element to vertical center using padding
    $.fn.verticalAlign = function () {
      return this.css(
        "padding-top",
        ($(this).parent().height() - $(this).height()) / 2 + "px"
      );
    };

    setTimeout(function () {
      $("#loading").fadeOut();
      $(".vCenter").each(function () {
        $(this).verticalAlign();
      });
    }, 800);

    if ($(".carouselBlock").length) {
      $(".carouselBlock").owlCarousel({
        loop: true,
        autoplay: false,
        autoplayTimeout: 3000,
        smartSpeed: 1200,
        margin: 0,
        nav: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 1,
          },
        },
      });
    }

    // Back to Top function
    if ($("#backtotop").length) {
      $(window).scroll(function () {
        if ($(window).scrollTop() > 120) {
          $("#backtotop")
            .fadeIn("250")
            .css("display", "block")
            .addClass("active");
        } else {
          $("#backtotop").fadeOut("250").removeClass("active");
        }
      });
      $("#backtotop").click(function () {
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          "200"
        );
        return false;
      });
    }

    if ($(".litebox").length) {
      $(".litebox").liteBox();
    }

    // For device checking
    if (isMobile == false) {
    }

    /*================= On Document Load and Resize Start =================*/
    $(window)
      .on("resize", function () {
        ww = document.body.clientWidth;
        wh = document.body.clientHeight;

        $(".vCenter").each(function () {
          $(this).verticalAlign();
        });

        if ($("body").hasClass("mobilePort")) {
          $("body").removeClass("wob");
        }

        //$('.container').resize(function(){});
      })
      .trigger("resize");
    /*================= On Document Load and Resize End =================*/

    /*Navigation */
    if ($("#nav").length) {
      if ($(".toggleMenu").length == 0) {
        $("#mainNav").prepend(
          '<a href="#" class="toggleMenu"><span class="iconBar"></span></a>'
        );
      }
      $(".toggleMenu").click(function () {
        $(this).toggleClass("active");
        $("#nav").slideToggle();
        return false;
      });
      $("#nav li a").each(function () {
        if ($(this).next().length) {
          $(this).parent().addClass("parent");
        }
      });
      $("#nav li.parent").each(function () {
        if ($(this).has(".menuIcon").length <= 0)
          $(this).append('<i class="menuIcon">&nbsp;</i>');
      });
      dropdown("nav", "hover", 1);
      adjustMenu();
    }
  });
  /*================= On Document Load End =================*/

  /*================= On Window Resize Start =================*/
  $(window).bind("resize orientationchange", function () {
    getWidth();
    adjustMenu();
    $(".vCenter").each(function () {
      $(this).verticalAlign();
    });
  });

  /*================= On Window Resize End =================*/

  /*================= On Window Load Start =================*/
  $(window).load(function () {});
  /*================= On Document Load End =================*/

  function getWidth() {
    ww = document.body.clientWidth;
    if (ww > wideScreen) {
      $("body").removeClass("device").addClass("desktop widerDesktop");
    }
    if (ww > mobilePort && ww <= wideScreen) {
      $("body").removeClass("device widerDesktop").addClass("desktop");
    }
    if (ww <= mobilePort) {
      $("body").removeClass("desktop widerDesktop").addClass("device");
    }
    if (ww > 767 && ww < 1025) {
      $("body").addClass("ipad");
    } else {
      $("body").removeClass("ipad");
    }
  }
})(jQuery);

//full name validation
document.querySelector("#firstName").addEventListener("blur", (event) => {
  let err = document.querySelector(".error");
  err.innerText = "";
  try {
    //if field empty
    if (event.target.validity.valueMissing)
      throw event.target.validationMessage;
    else if (event.target.validity.patternMismatch) {
      //event.target.setCustomValidity("Enter A valid name");
      throw "First Name is required!";
    } else {
      err.innerText = "";
    }
  } catch (messg) {
    err.innerText = messg;
  }
});

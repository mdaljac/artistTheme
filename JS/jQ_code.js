$(document).ready(function () {
    $("input:radio").remove();

    smoothScroll(400);
    clientsSelect();
    
	$(".artist-mail").fitText(1, { minFontSize: '30px', maxFontSize: '62px' });
	$("header h1").fitText(1.1, { minFontSize: '30px', maxFontSize: '60px' });

    $(document).on("scroll", function () {

        var all_progress = $("#skills").find("progress");
		var wheight = $(document).height();
		
        if (window.scrollY*1.8 > wheight*0.3) {

			$("#skills").css("opacity", 1);
            $(document).off("scroll");

            all_progress.each(function () {

                var progress = this;
                var setSkill = $(this).val();

                var i = 0;
                var int = setInterval(run, 7);
                function run() {

                    progress.value = i;
                    i++;
                    if (progress.value == setSkill) clearInterval(int);
                }
            });
        };
    });

    $("div[class^='thumb_unit']").on("click", function () {

        //Ajax

        //$.ajaxSetup({ cache: true });
        var char = $(this).attr("class");
        var num = char[char.length - 1];
        var title = $(this).find("strong").text();
        var spinner = '<div class="loader">Loading...</div>';
        var newHTML = "includes/work_" + num + ".html";
        $(".work_title").html("<h4>" + title + "</h4>");

        $(".work_belt").css("left", "-100%");
        $(".work_load").load(newHTML); //$(".work_load").html(spinner).load(newHTML);
        $("#work_container").css("display", "block");
        $("#thumb_container").css("visibility", "hidden");
    });
    $(".work_return").on("click", function () {

        $("#work_container").hide(400);
        $(".work_belt").css("left", "0%");
        $("#thumb_container").css("visibility", "visible");
    });
});

function smoothScroll(duration){

    $("a[href^='#']").on("click", function (evt) {

        var target = $( $(this).attr("href") ); //this je link a, al pošto se ponovno ide u DOM, uzima se h3 sa id-em about

        if (target.length) {
            evt.preventDefault(); //link da ne preusmjerava nigdje
            $("html, body").animate({

                scrollTop: target.offset().top

            }, duration);
        }
    });
};

function clientsSelect(){

    $(".client_unit").first().addClass("active_client");
    $("img[class^='client_logo").first().addClass("active_client");
    $(".mobile_nav span").first().addClass("active_client");

    $("img[class^='client_logo'], .mobile_nav span").on("click", function () {

        $this = $(this);
        $siblings = $this.parent().children();
        $position = $siblings.index($this);
        $currentSelected = $this.parent().find(".active_client").removeClass("active_client");
        $this.addClass("active_client");

        $(".clients_belt").find(".active_client").removeClass("active_client");
        $(".clients_belt").children().eq($position).addClass("active_client");

    });
    $(".next_control, .back_control").on("click", function () {

        $this = $(this);

        if ($this.hasClass("next_control")) {
            if ($(".logos .active_client").index() < ($(".logos").children().length - 1)) {
                $(".logos").find(".active_client").removeClass("active_client").next().addClass("active_client");
                $(".clients_belt").find(".active_client").removeClass("active_client").next().addClass("active_client");

            } else {
                $(".logos").find(".active_client").removeClass("active_client");
                $(".clients_belt").find(".active_client").removeClass("active_client");
                $("img[class^='client_logo").first().addClass("active_client");
                $(".client_unit").first().addClass("active_client");
            }
        } else {

            $(".logos").find(".active_client").removeClass("active_client").prev().addClass("active_client");
            $(".clients_belt").find(".active_client").removeClass("active_client").prev().addClass("active_client");
            
            if ($(".logos .active_client").index() < 0)
            {
                $(".logos").find(".active_client").removeClass("active_client");
                $(".clients_belt").find(".active_client").removeClass("active_client");
                $("img[class^='client_logo").last().addClass("active_client");
                $(".client_unit").last().addClass("active_client");
            }
        }
    });
};

$.fn.fitText = function( kompressor, options ) {

        // Setup options
        var compressor = kompressor || 1,
            settings = $.extend({
              'minFontSize' : Number.NEGATIVE_INFINITY,
              'maxFontSize' : Number.POSITIVE_INFINITY
            }, options);

        return this.each(function(){

          // Store the object
          var $this = $(this);

          // Resizer() resizes items based on the object width divided by the compressor * 10
          var resizer = function () {
            $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
          };

          // Call once to set.
          resizer();

          // Call on resize. Opera debounces their resize by default.
          $(window).on('resize.fittext orientationchange.fittext', resizer);

        });

      };
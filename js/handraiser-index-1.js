!(function () {
  if (
    ((window.scrollToSlide = function (e) {
      var t = $(".header"),
        n = "none" === t.css("display") ? 0 : t.outerHeight(),
        o = $(
          "form.en__component--page > .slide-wrapper:nth-of-type(".concat(
            e,
            ")"
          )
        );
      o.show(),
        $("html, body").animate({ scrollTop: o.offset().top - (n - 1) }, 800),
        analytics("scroll", "to slide " + e);
    }),
    (window.analytics = function (e, t) {
      "undefined" != typeof dataLayer &&
        dataLayer.push({
          event: "en_event",
          event_action: e,
          event_label: t,
          event_category: "EN_petition",
        });
    }),
    (window.facebook = function (e) {
      void 0 !== window.fbq && window.fbq("track", e);
    }),
    (window.progressTracker = {
      setComplete: function (e) {
        $(".progress-bar .progress-bar__circle")
          .eq(e - 1)
          .removeClass("progress-bar__circle--incomplete"),
          $(".progress-bar .progress-bar__circle")
            .eq(e - 1)
            .addClass("progress-bar__circle--complete");
      },
      setIncomplete: function (e) {
        $(".progress-bar .progress-bar__circle")
          .eq(e - 1)
          .removeClass("progress-bar__circle--complete"),
          $(".progress-bar .progress-bar__circle")
            .eq(e - 1)
            .addClass("progress-bar__circle--incomplete");
      },
    }),
    $(".fb-preview").length)
  ) {
    var e = $('meta[property="og:title"]').attr("content"),
      t = $('meta[property="og:description"]').attr("content"),
      n = $('meta[property="og:image"]').attr("content");
    $(".fb-preview__image").append('<img src="'.concat(n, '">')),
      $(".fb-preview__text").append(
        '<p class="fb-preview__title">'
          .concat(e, '</p><p class="fb-preview__description">')
          .concat(t, "</p>")
      );
  }
  $(".btn-facebook-js").on("click", function () {
    var e = window.location.href.split("?")[0];
    (e = e.slice(0, -1) + "1?utm_source=facebook_share"),
      window.open(
        "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(e),
        "_blank",
        "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250,top=300,left=300"
      ),
      analytics("share", "facebook"),
      progressTracker.setComplete(3);
  }),
    $(".btn-whatsapp-js").on("click", function () {
      var e = window.location.href.split("?")[0];
      e = e.slice(0, -1) + "1?utm_source=whatsapp_share";
      var t = $(this).data("text") + " " + e;
      window.open(
        "https://api.whatsapp.com/send?text=" + encodeURIComponent(t),
        "_blank"
      ),
        analytics("share", "whatsapp"),
        progressTracker.setComplete(3);
    }),
    $(".btn-twitter-js").on("click", function () {
      var e = window.location.href.split("?")[0];
      e = e.slice(0, -1) + "1?utm_source=twitter_share";
      var t = $(this).data("text") + " " + e;
      window.open(
        "https://twitter.com/share?url=" + encodeURIComponent(t),
        "_blank",
        "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250,top=300,left=300"
      ),
        analytics("share", "twitter"),
        progressTracker.setComplete(3);
    });
  var o = $(".opt-out-warning");
  o.length &&
    o.each(function () {
      var e = $(this),
        t = e.attr("data-for");
      e.insertAfter(".en__field--" + t),
        $('input[name="supporter.questions.' + t + '"]').on(
          "change",
          function () {
            "N" === this.value
              ? (e.show(),
                $(
                  '.en__field--opt-in input[value="N"] + label, .en__field--reprieve-us-opt-in input[value="N"] + label'
                ).addClass("is-selected"))
              : (e.hide(),
                $(
                  '.en__field--opt-in input[value="N"] + label, .en__field--reprieve-us-opt-in input[value="N"] + label'
                ).removeClass("is-selected"));
          }
        );
    }),
    $(".fa-read-more").each(function () {
      $(this).hasClass("fa-read-more-desktop")
        ? $(
            '<div class="fa-read-more-toggle toggle-desktop">Read more<span></span><span></span></div>'
          ).insertBefore($(this))
        : $(
            '<div class="fa-read-more-toggle">Read more<span></span><span></span></div>'
          ).insertBefore($(this));
    }),
    $(".fa-read-more-toggle").on("click", function () {
      $(this).toggleClass("open"), $(this).next().slideToggle();
    }),
    $(".btn-donate").on("click", function () {
      var e = $(this);
      window.open(e.data("href"), "_blank"),
        analytics("donate", e.data("label"));
    }),
    (window.enOnValidate = function () {
      var e = $("#en__field_supporter_emailAddress");
      return e.val(e.val().trim()), !0;
    }),
    (window.enOnSubmit = function () {
      analytics("form", "submitted");
      var e = !1;
      return (
        "undefined" != typeof fieldName && "" !== fieldName
          ? (e =
              "Y" ===
              $(
                'input[name="supporter.questions.' + fieldName + '"]:checked'
              ).val())
          : $('input[name="supporter.questions.609164"]').length
          ? (e =
              "Y" ===
              $('input[name="supporter.questions.609164"]:checked').val())
          : $('input[name="supporter.questions.619627"]').length &&
            (e =
              "Y" ===
              $('input[name="supporter.questions.619627"]:checked').val()),
        analytics("optin", e.toString()),
        e && facebook("Lead"),
        !0
      );
    }),
    $(document).ready(function () {
      "1" !== window.location.pathname.slice(-1) &&
        progressTracker.setComplete(1),
        $(".en__errorHeader").text().trim().length &&
          $("form.en__component--page").addClass("has-errors");
      var e = $(
        ".en__field--text, .en__field--password, .en__field--email, .en__field--telephone, .en__field--number"
      );
      if (
        (e.each(function () {
          var e = $(this),
            t = e.find("input"),
            n = e.find("label");
          t.after(n),
            t.on("input", function () {
              $(this).val()
                ? $(this).next("label").addClass("shrink")
                : $(this).next("label").removeClass("shrink");
            });
        }),
        $(
          ".en__component--formblock .en__mandatory .en__field__element--text"
        ).each(function () {
          var e = $(this).find(".en__field__label");
          e.html(e.html() + '<span style="color:#ff0000;"> *</span>');
        }),
        $("form.en__component--page > .en__component--row").each(function (e) {
          var t = $(this),
            n = t.find(".slide-background").attr("src"),
            o = $('<div class="slide-wrapper"></div>');
          $(".slide-background").length > 1 &&
            t.find(".slide-background").length &&
            o.css("background-image", "url(".concat(n, ")")),
            t.wrap(o);
        }),
        1 === $(".slide-background").length)
      ) {
        var t = $(".slide-background").attr("src");
        $('form:not([action*="/petition/2"])').css(
          "background-image",
          "url(".concat(t, ")")
        );
      }
      e.each(function () {
        var e = $(this).find("input"),
          t = $(this).find("label");
        e.val() &&
          (t.css("transition", "none").addClass("shrink"),
          setTimeout(function () {
            return t.css("transition", "");
          }, 200));
      });
    }),
    $(window).on("load", function () {
      "1" !== window.location.pathname.slice(-1) &&
        facebook("CompleteRegistration");
    });
})();

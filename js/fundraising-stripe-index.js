!(function () {
  function e(e, n) {
    n || (n = window.location.href), (e = e.replace(/[\[\]]/g, "\\$&"));
    var t = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(n);
    if (!t) return "";
    if (!t[2]) return "";
    return decodeURIComponent(t[2].replace(/\+/g, " "))
      .replace(/&/g, "&amp;")
      .replace(/[<]/g, "&lt;")
      .replace(/"/g, "&quot;")
      .replace(/[>]/g, "&gt;")
      .substring(0, 30);
  }
  if (
    ((window.scrollToSlide = function (e) {
      var n = $(".header"),
        t = "none" === n.css("display") ? 0 : n.outerHeight(),
        a = $(
          "form.en__component--page > .slide-wrapper:nth-of-type(".concat(
            e,
            ")"
          )
        );
      a.show(),
        $("html, body").animate({ scrollTop: a.offset().top - (t - 1) }, 800),
        analytics("scroll", "to slide " + e);
    }),
    (window.analytics = function (e, n) {
      "undefined" != typeof dataLayer &&
        ("purchase" === e
          ? dataLayer.push({
              event: "en_purchase",
              value: pageJson.amount,
              currency: pageJson.currency,
              items: [
                {
                  item_id: pageJson.transactionType,
                  item_name: pageJson.pageName,
                  item_category: pageJson.recurring ? "recurring" : "single",
                  price: pageJson.amount,
                  quantity: 1,
                },
              ],
              event_category: "EN_donation",
            })
          : dataLayer.push({
              event: "en_event",
              event_action: e,
              event_label: n,
              event_category: "EN_donation",
            }));
    }),
    (window.facebook = function (e) {
      var n =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
      void 0 !== window.fbq && window.fbq("track", e, n);
    }),
    $(".fb-preview").length)
  ) {
    var n = $('meta[property="og:title"]').attr("content"),
      t = $('meta[property="og:description"]').attr("content"),
      a = $('meta[property="og:image"]').attr("content");
    $(".fb-preview__image").append('<img src="'.concat(a, '">')),
      $(".fb-preview__text").append(
        '<p class="fb-preview__title">'
          .concat(n, '</p><p class="fb-preview__description">')
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
      analytics("share", "facebook");
  }),
    $(".btn-whatsapp-js").on("click", function () {
      var e = window.location.href.split("?")[0];
      e = e.slice(0, -1) + "1?utm_source=whatsapp_share";
      var n = $(this).data("text") + " " + e;
      window.open(
        "https://api.whatsapp.com/send?text=" + encodeURIComponent(n),
        "_blank"
      ),
        analytics("share", "whatsapp");
    }),
    $(".btn-twitter-js").on("click", function () {
      var e = window.location.href.split("?")[0];
      e = e.slice(0, -1) + "1?utm_source=twitter_share";
      var n = $(this).data("text") + " " + e;
      window.open(
        "https://twitter.com/intent/tweet?text=" + encodeURIComponent(n),
        "_blank"
      ),
        analytics("share", "twitter");
    });
  var o = $(".opt-out-warning");
  o.length &&
    o.each(function () {
      var e = $(this),
        n = e.attr("data-for");
      e.insertAfter(".en__field--" + n),
        $('input[name="supporter.questions.' + n + '"]').on(
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
    });
  for (
    var i = [["en__field--firstName", "en__field--lastName"]], r = 0;
    r < i.length;
    r++
  )
    $("." + i[r][0]).before($('<div class="two-col">')),
      $(".two-col")
        .eq(r)
        .append($("." + i[r][0])),
      $(".two-col")
        .eq(r)
        .append($("." + i[r][1]));
  for (var s = ["en__field--title"], l = 0; l < s.length; l++)
    $("." + s[l]).addClass("half-width-field");
  $(".fa-read-more").each(function () {
    $(
      '<div class="fa-read-more-toggle">Read more<span></span><span></span></div>'
    ).insertBefore($(this));
  }),
    $(".fa-read-more-toggle").on("click", function () {
      $(this).toggleClass("open"), $(this).next().slideToggle();
    }),
    $("#en__field_supporter_emailAddress").length &&
      ((window.enOnValidate = function () {
        var e = $("#en__field_supporter_emailAddress");
        return e.val(e.val().trim()), !0;
      }),
      (window.enOnSubmit = function () {
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
      }));
  var c = function () {
      var n = function () {
          return $("#en__field_transaction_othamt1").is(":checked")
            ? "" !== $('input[name="transaction.donationAmt.other"]').val()
              ? $('input[name="transaction.donationAmt.other"]').val()
              : $('input[name="transaction.donationAmt"]:checked').val()
            : $('input[name="transaction.donationAmt"][value!="other"]:checked')
                .length
            ? $('input[name="transaction.donationAmt"]:checked').val()
            : "" !== $('input[name="transaction.donationAmt.other"]').val()
            ? $('input[name="transaction.donationAmt.other"]').val()
            : "0";
        },
        t = function () {
          return "GBP" ===
            $('input[name="transaction.paycurrency"]:checked').val()
            ? ($(".currency-symbol").html("&pound;"),
              (sessionStorage.faDonateCurrency = "GBP"),
              $('.en__field--NOT_TAGGED_7 input[value="Monthly"]')
                .parent()
                .removeClass("hide"),
              "Â£")
            : ($(".currency-symbol").html("$"),
              (sessionStorage.faDonateCurrency = "USD"),
              $('.en__field--NOT_TAGGED_7 input[value="One-off"]').prop(
                "checked",
                !0
              ),
              $('.en__field--NOT_TAGGED_7 input[value="Monthly"]')
                .parent()
                .addClass("hide"),
              "$");
        },
        a = function () {
          var e = n();
          return (
            (e = parseFloat(e)),
            $(
              '.en__field--NOT_TAGGED_6 .en__field__input--radio:not([value="1"]) + label'
            ).each(function () {
              var n = $(this),
                t = parseFloat(n.prev('input[type="radio"]').val());
              n.find(".total-with-upsell").html((e * t).toFixed(2));
            }),
            (sessionStorage.faDonateAmount = e),
            e
          );
        },
        o = function () {
          var e = $('input[name="supporter.NOT_TAGGED_7"]:checked').val();
          return (
            "Monthly" === e
              ? ($('input[name="transaction.othamt1"]')
                  .prop("checked", !1)
                  .trigger("change"),
                $(".en__field--othamt1").hide())
              : "One-off" === e && $(".en__field--othamt1").show(),
            (sessionStorage.faDonateType = e),
            e
          );
        },
        i = function () {
          return (
            "Monthly" !== sessionStorage.faDonateType ||
            ((sessionStorage.faDonateStripePageID = window.location.pathname
              .split("page/")[1]
              .split("/")[0]),
            "undefined" != typeof rsmPageUrl
              ? (window.location.href = rsmPageUrl + window.location.search)
              : console.log("ERROR: No RSM page defined for monthly donations"),
            !1)
          );
        },
        r = function () {
          $('.en__field--paycurrency input[type="radio"]').on(
            "change",
            function () {
              t();
            }
          ),
            t(),
            $(
              'input[name="transaction.donationAmt"], input[name="transaction.donationAmt.other"]'
            ).change(function () {
              a();
            }),
            a(),
            $('input[name="supporter.NOT_TAGGED_7"]').change(function () {
              o();
            }),
            o(),
            $(".en__field--NOT_TAGGED_6 .en__field__input--radio").on(
              "click",
              function () {
                var e, t, a;
                (e = parseFloat($(this).val())),
                  (t = n()),
                  (a = ((t = parseFloat(t)) * e).toFixed(2)),
                  $(
                    'input[name="transaction.donationAmt"][value="other"]'
                  ).prop("checked", !0),
                  $('input[name="transaction.donationAmt.other"]').val(a),
                  (sessionStorage.faDonateAmount = a),
                  (window.enOnSubmit = function () {
                    return i();
                  }),
                  $(".en__submit button").click();
              }
            ),
            (window.enOnSubmit = function () {
              return showUpsell && n() < upsellThreshhold
                ? ($(
                    '.en__field--NOT_TAGGED_6 .en__field__input--radio:not([value="1"]) + label'
                  ).each(function () {
                    $(this)
                      .find(".upsell-amount-to-add")
                      .html(
                        ((n() * $(this).prev().val()).toFixed(2) - n()).toFixed(
                          2
                        )
                      );
                  }),
                  $(".en__component--widgetblock, .amount-form").hide(),
                  $(".upsell-ask").fadeIn(),
                  !1)
                : i();
            });
        };
      (this.triggerUpdatedDonationAmount = function () {
        a();
      }),
        (this.init = function () {
          $(".en__component--row:first-of-type").prepend(
            $(
              '<div class="mob-hero"><img src="' +
                $(".slide-background").attr("src") +
                '"/></div>'
            )
          ),
            $(
              '.en__field--donationAmt .en__field__input--radio:not([value="other"]) + label'
            ).each(function () {
              $(this).prepend($('<span class="currency-symbol"></span>'));
            }),
            $(
              '.en__field--NOT_TAGGED_6 .en__field__input--radio:not([value="1"]) + label'
            ).each(function () {
              $(this).html(
                $(
                  '<span>Add <span class="currency-symbol"></span><span class="upsell-amount-to-add"></span></span>'
                )
              ),
                $(this).append(
                  $(
                    '<br/><span style="font-weight: normal; font-size: 18px;">(<span class="currency-symbol"></span><span class="total-with-upsell"></span> in total)</span>'
                  )
                );
            }),
            $(
              'input[name="transaction.paycurrency"][value="GBP"] + label'
            ).html("&pound;"),
            "monthly" === e("frequency")
              ? $('label:contains("Monthly donation")')
                  .parent()
                  .find('input[type="radio"]')
                  .prop("checked", !0)
              : "one-off" === e("frequency") &&
                $('label:contains("One-off donation")')
                  .parent()
                  .find('input[type="radio"]')
                  .prop("checked", !0),
            r();
        });
    },
    p = function () {
      var e = sessionStorage.faDonateType,
        n = sessionStorage.faDonateCurrency,
        t = sessionStorage.faDonateAmount,
        a = { GBP: "&pound;", USD: "$" },
        o = function (e) {
          "paypal" ===
          $(
            '.en__field--fa-fundraising-cash-card-or-paypal input[type="radio"]:checked'
          ).val()
            ? ($(
                'select[name="transaction.paymenttype"] option[value="paypal"]'
              ).prop("selected", !0),
              $(".en__field--paymenttype").hide(),
              $(".payment-icons").hide())
            : ($(
                'select[name="transaction.paymenttype"] option[value="visa"]'
              ).prop("selected", !0),
              $(".en__field--paymenttype").show(),
              $(".payment-icons").show());
        },
        i = function (e) {
          for (var n = "", t = 0; t < e.length; t++)
            $('[name="' + e[t] + '"]').attr("disabled", !0),
              $('[name="' + e[t] + '"]')
                .closest(".en__field")
                .hide(),
              setTimeout(function () {
                $('[name="' + e[t] + '"]')
                  .closest(".en__field")
                  .addClass("en__hidden");
              }, 2e3),
              (n += e[t]),
              t + 1 !== e.length && (n += ",");
          $(".en__hiddenFields").val(n);
        };
      this.init = function () {
        $(".currency-symbol").html("&pound;"),
          "One-off" === e &&
            "NaN" !== t &&
            $(".en__submit button").html("Donate " + a[n] + t + " now"),
          $(".en__field--taxdeductible").length &&
            ($(".en__field--taxdeductible").hasClass("en__mandatory") &&
              $(".en__field--taxdeductible > label").html(
                $(".en__field--taxdeductible > label").html() +
                  '<span style="color:#ff0000;"> *</span>'
              ),
            $(".en__field--taxdeductible > label").after(
              $(
                '<img class="giftaid-logo" src="https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/2214/Screenshot+2020-09-11+at+13.55.35.png?v=1599834016000"><div style="clear:both;"></div><p>If you are a UK taxpayer, with Gift Aid your donation of <strong>' +
                  a[n] +
                  sessionStorage.faDonateAmount +
                  "</strong> would be worth <strong>" +
                  a[n] +
                  (1.25 * sessionStorage.faDonateAmount).toFixed(2) +
                  "</strong> at no extra cost to you. Do you want us to claim Gift Aid on your donation?</p>"
              )
            ),
            $(".en__field--taxdeductible .en__field__element--radio").after(
              $(
                '<p style="margin-top:15px;">Note:Â if you pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all of your donations in that tax year. it is your responsibility to pay any difference.</p>'
              )
            )),
          "Monthly" === e
            ? ($(".show-one-off").hide(),
              $(".en__field--paymenttype").hide(),
              $(
                'select[name="transaction.paymenttype"] option[value="PDD"]'
              ).prop("selected", !0),
              i([
                "supporter.questions.757192",
                "transaction.ccnumber",
                "transaction.ccvv",
                "transaction.ccexpire",
              ]),
              $('[name="transaction.recurrpay"').val("Y"),
              (window.enOnSubmit = function () {
                return (
                  $(".payment-form").hide(), $(".dd-confirmation").fadeIn(), !1
                );
              }))
            : "One-off" === e &&
              ($(".show-monthly").hide(),
              i([
                "supporter.creditCardHolderName",
                "supporter.bankAccountNumber",
                "supporter.bankRoutingNumber",
                "transaction.recurrfreq",
                "transaction.recurrstart",
                "transaction.recurrpay",
              ]),
              $('[name="supporter.creditCardHolderName"]').val("ONE-OFF"),
              $('[name="transaction.recurrstart"]').val("ONE-OFF"),
              $('[name="transaction.recurrpay"]').val("N"),
              $(
                '.en__field--fa-fundraising-cash-card-or-paypal input[type="radio"]'
              ).change(function () {
                o();
              }),
              o(),
              (window.enOnSubmit = function () {
                $(".en__errorList").empty(), $(".en__errorHeader").remove();
                var e = setInterval(function () {
                  $(".en__errorList li").length > 0 &&
                    ($("body,html").animate(
                      {
                        scrollTop:
                          $(".en__errorList").offset().top -
                          $(".header").outerHeight(),
                      },
                      300
                    ),
                    clearInterval(e));
                }, 250);
                return !0;
              }));
      };
    };
  $(function () {
    $(".amount-step").length &&
      ((window.faAmountStep = new c()), faAmountStep.init()),
      $(".details-step").length &&
        "One-off" === sessionStorage.faDonateType &&
        ($(
          '.en__field--human-rights-defender-badge input[type="radio"][value="N"]'
        ).prop("checked", !0),
        $(".en__field--human-rights-defender-badge").hide()),
      $(".payment-step").length &&
        ((window.faPaymentStep = new p()), faPaymentStep.init());
    var e = $(
      ".en__field--text, .en__field--password, .en__field--email, .en__field--telephone, .en__field--number"
    );
    if (
      (e.each(function () {
        var e = $(this),
          n = e.find("input"),
          t = e.find("label");
        n.after(t),
          n.on("input", function () {
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
        var n = $(this),
          t = n.find(".slide-background").attr("src"),
          a = $('<div class="slide-wrapper"></div>');
        $(".slide-background").length > 1 &&
          n.find(".slide-background").length &&
          a.css("background-image", "url(".concat(t, ")")),
          n.wrap(a);
      }),
      1 === $(".slide-background").length)
    ) {
      var n = $(".slide-background").attr("src");
      $('form:not([action*="/petition/2"])').css(
        "background-image",
        "url(".concat(n, ")")
      );
    }
    $(".slide-content").each(function () {
      var e = $('<div class="content-border">');
      $(this).append(e),
        $(this)
          .find("> *:not(.header-text, .en__component--widgetblock)")
          .each(function () {
            $(this).appendTo(e);
          });
    }),
      $(".en__errorHeader").text().trim().length &&
        ($("form.en__component--page").addClass("has-errors"),
        $(".slide-wrapper").first().show()),
      e.each(function () {
        var e = $(this).find("input"),
          n = $(this).find("label");
        e.val() &&
          (n.css("transition", "none").addClass("shrink"),
          setTimeout(function () {
            return n.css("transition", "");
          }, 200));
      });
  }),
    $(window).on("load", function () {
      $(".amount-step").length && analytics("seen", "amount step"),
        $(".details-step").length && analytics("seen", "details step"),
        $(".payment-step").length && analytics("seen", "payment step"),
        $(".post-action").length &&
          (analytics("form", "submitted"),
          analytics("seen", "post action step"),
          analytics("purchase"),
          facebook("CompleteRegistration"),
          pageJson &&
            facebook("Purchase", {
              currency: pageJson.currency,
              value: pageJson.amount,
            }));
    });
})();

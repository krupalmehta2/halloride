(function ($) {
  "use strict";

  if (!$) {
    throw new Error("Hallo's interactive navigation requires jQuery. Check the configured jQuery script source.");
  }

  const config = window.HALLO_CONFIG || {};
  const appUrl = config.appUrl || "https://play.google.com/store/apps/details?id=com.hallo.app";
  const supportEmail = config.supportEmail || "hallorideapp@gmail.com";
  const emailJs = config.emailJs || {};
  const pathname = window.location.pathname.replace(/index\.html$/, "").replace(/\.html$/, "");
  const path = pathname === "" || pathname === "/" ? "/" : pathname.endsWith("/") ? pathname : pathname + "/";

  $(".wordmark").each(function () {
    const $wordmark = $(this);
    $wordmark.empty().append($("<img>", {
      src: "assets/images/logo.png",
      alt: "Hallo ride sharing",
      decoding: "async"
    }));
  });

  $("[data-download]").attr("href", appUrl);
  $("[data-support-email]").attr("href", "mailto:" + supportEmail).text(supportEmail);
  $("[data-year]").text(new Date().getFullYear());

  if (config.siteUrl) {
    const canonicalUrl = config.siteUrl.replace(/\/+$/, "") + path;
    $("link[rel='canonical']").remove();
    $("<link>", { rel: "canonical", href: canonicalUrl }).appendTo("head");
    $("meta[property='og:url']").remove();
    $("<meta>", { property: "og:url", content: canonicalUrl }).appendTo("head");
    if (!$("meta[property='og:image']").length) {
      $("<meta>", { property: "og:image", content: config.siteUrl.replace(/\/+$/, "") + "/assets/images/og-image.svg" }).appendTo("head");
    }
  }

  const $menu = $(".primary-nav");
  const $toggle = $(".menu-toggle");
  $toggle.on("click", function () {
    const expanded = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", String(!expanded)).attr("aria-label", expanded ? "Open menu" : "Close menu");
    $menu.toggleClass("is-open", !expanded);
  });
  $menu.find("a").on("click", function () {
    $menu.removeClass("is-open");
    $toggle.attr("aria-expanded", "false").attr("aria-label", "Open menu");
  });
  $(document).on("keydown", function (event) {
    if (event.key === "Escape" && $menu.hasClass("is-open")) {
      $menu.removeClass("is-open");
      $toggle.attr("aria-expanded", "false").attr("aria-label", "Open menu").trigger("focus");
    }
  });

  const $form = $("#contact-form");
  $form.on("submit", async function (event) {
    event.preventDefault();
    const form = this;
    const $status = $("#form-status");
    $status.attr("role", "alert").text("");
    if (!form.checkValidity()) {
      form.reportValidity();
      $status.text("Please complete each required field and check the consent box.");
      return;
    }
    if ($(form).find("[name='website']").val()) {
      $status.text("Your message could not be sent. Please try again.");
      return;
    }
    if (!emailJs.serviceId || !emailJs.templateId || !emailJs.publicKey) {
      $status.text("The contact email service is not configured yet. Please try again later.");
      return;
    }
    if (!window.emailjs || typeof window.emailjs.sendForm !== "function") {
      console.error("EmailJS browser SDK did not load.");
      $status.text("The contact service is temporarily unavailable. Please try again later.");
      return;
    }

    const $submit = $form.find("[type='submit']");
    $submit.prop("disabled", true);
    $status.attr("role", "status").text("Sending your message…");
    try {
      await window.emailjs.sendForm(
        emailJs.serviceId,
        emailJs.templateId,
        form,
        { publicKey: emailJs.publicKey }
      );
      form.reset();
      $status.text("Your message was sent. Thank you for contacting Hallo.");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      $status.attr("role", "alert").text("We couldn't send your message. Please try again later.");
    } finally {
      $submit.prop("disabled", false);
    }
  });

  if (config.siteUrl && config.analyticsId && localStorage.getItem("hallo-analytics-consent") === "granted") {
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(config.analyticsId);
    tag.onload = function () {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", config.analyticsId);
      $("[data-download]").on("click", function () {
        window.gtag("event", "app_download_click", { destination: appUrl });
      });
    };
    document.head.appendChild(tag);
  }
})(window.jQuery);

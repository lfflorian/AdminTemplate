/*!

 =========================================================
 * Light Bootstrap Dashboard - v2.0.1
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

var searchVisible = 0;
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;
var mobile_menu_visible = 0,
    mobile_menu_initialized = false,
    toggle_initialized = false,
    bootstrap_nav_initialized = false,
    $sidebar,
    isWindows;

jQuery(document).ready(function() {
    var window_width = jQuery(window).width();

    // check if there is an image set for the sidebar's background
    lbd.checkSidebarImage();

    // Init navigation toggle for small screens
    if (window_width <= 991) {
        lbd.initRightMenu();
    }

    //  Activate the tooltips
    jQuery('[rel="tooltip"]').tooltip();

    //      Activate regular switches
    if (jQuery("[data-toggle='switch']").length != 0) {
        jQuery("[data-toggle='switch']").bootstrapSwitch();
    }

    jQuery('.form-control').on("focus", function() {
        jQuery(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function() {
        jQuery(this).parent(".input-group").removeClass("input-group-focus");
    });

    // Fixes sub-nav not working as expected on IOS
    jQuery('body').on('touchstart.dropdown', '.dropdown-menu', function(e) {
        e.stopPropagation();
    });
});

// activate collapse right menu when the windows is resized
jQuery(window).resize(function() {
    if (jQuery(window).width() <= 991) {
        lbd.initRightMenu();
    }
});

var lbd = {
    misc: {
        navbar_menu_visible: 0
    },
    checkSidebarImage: function() {
        $sidebar = jQuery('.sidebar');
        var image_src = $sidebar.data('image');
        //CORREGUIR EST PARTE
        //image_src = "imagen.png";

        if (image_src !== undefined) {
            var sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>'
            $sidebar.append(sidebar_container);
        } else if (mobile_menu_initialized == true) {
            // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
            $sidebar_wrapper.find('.navbar-form').remove();
            $sidebar_wrapper.find('.nav-mobile-menu').remove();

            mobile_menu_initialized = false;
        }
    },

    initRightMenu: function() {
        var $sidebar_wrapper = jQuery('.sidebar-wrapper');

        if (!mobile_menu_initialized) {

            var $navbar = jQuery('nav').find('.navbar-collapse').first().clone(true);

            var nav_content = '';
            var mobile_menu_content = '';

            //add the content from the regular header to the mobile menu
            $navbar.children('ul').each(function() {

                var content_buff = jQuery(this).html();
                nav_content = nav_content + content_buff;
            });

            nav_content = '<ul class="nav nav-mobile-menu">' + nav_content + '</ul>';

            var $navbar_form = jQuery('nav').find('.navbar-form').clone(true);

            var $sidebar_nav = $sidebar_wrapper.find(' > .nav');

            // insert the navbar form before the sidebar list
            var $nav_content = jQuery(nav_content);
            $nav_content.insertBefore($sidebar_nav);
            $navbar_form.insertBefore($nav_content);

            jQuery(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function(event) {
                event.stopPropagation();

            });

            mobile_menu_initialized = true;
        } else {
            console.log('window with:' + jQuery(window).width());
            if (jQuery(window).width() > 991) {
                // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
                $sidebar_wrapper.find('.navbar-form').remove();
                $sidebar_wrapper.find('.nav-mobile-menu').remove();

                mobile_menu_initialized = false;
            }
        }

        if (!toggle_initialized) {
            var $toggle = jQuery('.navbar-toggler');

            $toggle.click(function() {

                if (mobile_menu_visible == 1) {
                    jQuery('html').removeClass('nav-open');

                    jQuery('.close-layer').remove();
                    setTimeout(function() {
                        $toggle.removeClass('toggled');
                    }, 400);

                    mobile_menu_visible = 0;
                } else {
                    setTimeout(function() {
                        $toggle.addClass('toggled');
                    }, 430);


                    main_panel_height = jQuery('.main-panel')[0].scrollHeight;
                    $layer = jQuery('<div class="close-layer"></div>');
                    $layer.css('height', main_panel_height + 'px');
                    $layer.appendTo(".main-panel");

                    setTimeout(function() {
                        $layer.addClass('visible');
                    }, 100);

                    $layer.click(function() {
                        jQuery('html').removeClass('nav-open');
                        mobile_menu_visible = 0;

                        $layer.removeClass('visible');

                        setTimeout(function() {
                            $layer.remove();
                            $toggle.removeClass('toggled');

                        }, 400);
                    });

                    jQuery('html').addClass('nav-open');
                    mobile_menu_visible = 1;

                }
            });

            toggle_initialized = true;
        }
    }
}



// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};
/********************* Helpers ****************/
// Event Tracking.
function trackingTags(tags) {  
  ga('send', {
    hitType: 'event',
    eventCategory: 'GA_test_category',
    eventAction: tags,
    eventLabel: 'GA_test_label'
  });

  FS.event(tags);

}

function errorMessage(messageTxt) {
  if (!messageTxt || messageTxt == undefined) {
    messageTxt = 'Something went wrong.  Please try refreshing the page or sent us an email if it continues.';
    console.log('No Error text included.');
  };
  new Noty({
      text: messageTxt,
      type: 'error',
      theme: 'nest',
      timeout: 4000
  }).show();  
}

function noticeMessage(messageTxt) {
    new Noty({
        text: messageTxt,
        //type: 'error',
        theme: 'nest',
        timeout: 3000
    }).show();  
}

async function fetchRemoteJSON(url = '') {
  let response = await fetch(url)
                  .catch(error => {
                    console.error(error);
                    return false;
                  });
  try {
    return await response.json();
  } catch(error) {
    console.error(error);
    return false;
  }
}

/*************  Specific navigation called vertical Nav *************/
function verticalNavHelper(element) {
  //$(element).parent().find('.full_track_listing').toggleClass('show_full_track_listing');
  element.parentElement.querySelector('.full_track_listing').classList.toggle('show_full_track_listing');
  //$(element).toggleClass('trigger_active');
  element.classList.toggle('trigger_active');

  trackingTags('verticalnav-programclick')

  /*
  $(element).parent().mouseleave(function(){
    $('.vertical_listing').find('.show_full_track_listing').removeClass('show_full_track_listing');
    $('.vertical_listing').find('.trigger_active').removeClass('trigger_active');
  }); */
  element.parentElement.addEventListener('mouseleave', mouseOut);

  function mouseOut() {
    element.parentElement.querySelector('.show_full_track_listing').classList.remove('show_full_track_listing');
    element.parentElement.querySelector('.trigger_active').classList.remove('trigger_active');
      element.parentElement.removeEventListener('mouseleave', mouseOut);      
  };

}


/************ Things that need to wait till after the DOM is loaded. **************/



//jQuery(document).ready(function($) {
var callback = function(){
  
  /*
  $('.popup_trigger').click(function(){
    verticalNavHelper(this);
  });

  $('[data-hjtag]').click(function(e) {
    trackingTags( $(this).data('hjtag') );
  });
  */
  // Vertical nav
  document.querySelectorAll('.popup_trigger').forEach( function(element) {
    element.addEventListener('click', () => {
      verticalNavHelper(element);
    });
  });

  // Tracking Tags for any element with data-hjtag="bah"
  document.querySelectorAll('[data-hjtag]').forEach( function(element) {
    trackingTags(element.dataset.hjtag);
  });


  // Disable right click menu.  Ideal for download buttons.
  // $('#disableContextMenu').bind('contextmenu',function() { return false; });
  let div_disabled_menu = document.querySelectorAll('#disableContextMenu');
  div_disabled_menu.forEach( element => {
    element.addEventListener( "contextmenu", e => {
      e.preventDefault();
    });
  });



  /*************** Network Conditions Logging *******************/
  if (navigator.connection) {
  navigator.connection.addEventListener('change', logNetworkInfo);

  function logNetworkInfo() {
    // Network type that browser uses
    // log('         type: ' + navigator.connection.type);

    // Effective bandwidth estimate
    /*
    console.log('     downlink: ' + navigator.connection.downlink + 'Mb/s');

    // Effective round-trip time estimate
    console.log('          rtt: ' + navigator.connection.rtt + 'ms');

    // Upper bound on the downlink speed of the first network hop
    console.log('  downlinkMax: ' + navigator.connection.downlinkMax + 'Mb/s');

    // Effective connection type determined using a combination of recently
    // observed rtt and downlink values: ' +
    console.log('effectiveType: ' + navigator.connection.effectiveType);
    
    // True if the user has requested a reduced data usage mode from the user
    // agent.
    console.log('     saveData: ' + navigator.connection.saveData);
    */

    try {
    FS.event("network", {
      "type_str"      :  navigator.connection.type,
      "downlink_str"    : navigator.connection.downlink + 'Mb/s',
      "rtt_str"     : navigator.connection.rtt + 'ms',
      "downlinkMax_str" : navigator.connection.downlinkMax + 'Mb/s',
      "effectiveType_str" : navigator.connection.effectiveType,
      "saveData_bool"   : navigator.connection.saveData,
    });
    } catch(error){console.log('FS was not defined to log network info to.')};

    try {

    /*
      const client = new KeenTracking({
        projectId: '5d41b4d8c9e77c0001229b10',
        writeKey: 'FF84C4837CE211BC012694FFFEFD116113E4EBB66C5C80FD1E0DFC2E12408D881D87B25479D1B29F447E72C16DD43FF85ADC916C8A61894A75584670A095094FF67B73CCAD05571ACC70B8A29D22BD212C3FD4FA492B22EFE1063C3EE3A59C50'
      });

      client.recordEvent('network', {

        {if logged_in}
        "ee_user_id"  : {logged_in_member_id},
        "member_group": {logged_in_group_id},
        "member_group_name" : "{logged_in_group_title}",
        {/if}

        "downlink" : navigator.connection.downlink,
        "rtt" : navigator.connection.rtt,
        "effectiveType" : navigator.connection.effectiveType,


        "timestamp"   : new Date().toISOString(), // for Keen time parser.
        "user_agent"  : "${keen.user_agent}", // for keen user agent add-on
        "ip_address"  : "${keen.ip}",
        "keen": {
          "addons": [
            {
              "name":'keen:ua_parser',
              "input":{"ua_string":'user_agent'},
              "output":'parsed_user_agent'
            },
            {
              "name":'keen:date_time_parser',
              "input":{"date_time":'keen.timestamp'},
              "output":'timestamp_info'
            },
            {
              "name" : "keen:ip_to_geo",
              "input" : {
                "ip" : "ip_address"
              },
              "output" : "ip_geo_info"
            }        
          ]
        }    
      });

    */
    } catch(error){console.log('Keen not able to log network info.', error)};

  }

  //logNetworkInfo();
  }


  // New Tippy.  This one is for backwards compatiblity with old one until HTML is updated.
  let oldTippy = tippy('.tippy', {
    content: (reference) => reference.getAttribute('title'),
    animation : "scale-subtle",
    arrow: true,
    delay: [1000, 200],
  });
  let newTippy = tippy('[data-tippy-content]', {
    animation : "scale-subtle",
    arrow: true,
    delay: [1000, 200],  
  });

  // Modal
  MicroModal.init();


//});// End of Jquery.

// On ready stuff.  Leave here at the bottom.
};
if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}
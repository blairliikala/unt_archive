
// Get all the form values.
var form           = document.getElementById('event_form').elements;
var radios         = {}; // For radio boxes.
var form_valid     = false;
const div_loading  = document.querySelector('#loadingIndicator');
const submitbutton = document.querySelector('#submit');
const pathArray    = window.location.pathname.split('/');


// Fields that should be validated.
var inputfields = {
  'roomview_id'         : form.roomview_id,
  'entry_date'          : form.entry_date,
  'expriation_date'     : form.expiration_date,
  'archive_change_deadline' : form.archive_change_deadline,
  'title'               : form.title,
};


// EE Generated array of instrument IDs and Names.  Used to try and match Roomview data to EE data.
const ee_instrument_array = [
{exp:channel:entries channel="college_instruments" }
  {
    title: '{title}',
    id: '{entry_id}'
  },
{/exp:channel:entries}

];

// EE Generated array of ensemble IDs and Names.  Used to try and match Roomview data to EE data.
const ee_ensemble_array = [
{exp:channel:entries channel="ensembles" }
  {
    title: '{title}',
    id: '{entry_id}'
  },
{/exp:channel:entries}

];



$(document).ready(function() {

  // Apply Date Picker.
  /////////// Importing Roomview Events.
  var dateSelect = flatpickr("#roomview_date_select", {
    minDate: new Date().fp_incr(15), // Move booking out 2 weeks.
    onChange: function(selectedDates, dateStr, instance) {
      let year        = moment(instance.parseDate(dateStr)).year() * 1;
      let month       = moment(instance.parseDate(dateStr)).month() * 1 + 1;
      let day         = moment(instance.parseDate(dateStr)).date() * 1;
      let requestDate = moment().year(instance.parseDate(dateStr)).month(instance.parseDate(dateStr)).date(instance.parseDate(dateStr));
      roomviewEvents(requestDate, day, month, year);
    }
  });


  /////////// Manually selecting a date.
  /*
  var manualDate = flatpickr("#entry_date", {
    minDate: new Date().fp_incr(15),
    enableTime: true,
    dateFormat:'n/d/Y h:i K',
    onChange: function(selectedDates, dateStr, instance) {

      let estimatedExpiration = moment(instance.parseDate(dateStr)).add(1, 'hour');
      form.expiration_date.value = moment(estimatedExpiration).format('M/DD/YYYY h:mmA');

      changeDeadlineAction(instance.parseDate(dateStr));
    }
  }); 
  */

	// Run immediately.
	formLogic();

  // If the roomview ID is filled in then disable synced fields.
  if (form.roomview_id.value !='') {
    disableSyncFields();
  }

	$('#event_form').on('change', formLogic);
  $('#event_form').on('submit', event => {
    console.log('form submitted...');
    event.preventDefault();
    submitHandler();
  });

});


function formLogic() {
  changeDeadlineAction();

	getRadioValues();
  roomActions();

  getRadioValues();
  typeActions();

  getRadioValues();

  calculateFee();
  copyHiddenAudioFields();
  copyHiddenVideoFields();

  validate();
  submitButtonControl();
}




/*********************** Selecting Events from Roomview ***********************/
async function roomviewEvents(requestDate, day, month, year) {

  // Get matching events from Roomview as JSON.
  let eventArray = await getRoomviewResults(day,month,year);

  // If no results from Roomview (it returns a string at the moment).
  if (eventArray == undefined) {
    document.querySelector('#roomviewResults').innerHTML = '<h2 class="roomview_results_header">No Results for that day.</h2>';
  } else {

    // Make the HTML list.
    let html = '<table class="roomview_events"><thead><tr><td></td><td>Name</td><td>Hall</td><td>Time</td></thead>';

    eventArray.forEach( (event, index) => {
      html += "<tr>";
      html += '<td><button class="basic_button eventSelect" id="id_'+event.event+'" data-index="'+index+'" >Select</button></td><td>'+event.title+'</td><td>'+event.room_number+'</td><td>'+event.am_time+'</td>';
      html += "</tr>";
    });

    html +="</table>";

    // Add HTML to DOM.
    document.querySelector('#roomviewResults').innerHTML = html;

    // Attach event listner for auto-fill.
    $('.eventSelect').on('click', function(e) {
      e.preventDefault();
      autofill(this, eventArray);
    }); 
    return;
  }
}
async function getRoomviewResults(day,month,year) {

  let url = '/sys/roomview.php?day='+day+'&month='+month+'&year='+year;
  let data;

  showLoadingIndicator(true);
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        showLoadingIndicator(false);
        return Promise.reject({
          status: response.status,
          statusText: response.statusText
        })
      }
    })
    .then (data => {
      showLoadingIndicator(false);
      return data;
    })
    .catch(error => {
      console.log('error is', error);
      showLoadingIndicator(false);
    });
}
async function autofill(element, eventArray) {
  let i = element.dataset.index; // The event's inedex that was clicked.

  let roomviewID = eventArray[i].event;  // is this line needed?

  let start = moment( eventArray[i].made_for + ' ' + eventArray[i].am_time ).format('M/DD/YYYY h:mmA');
  let end   = moment( eventArray[i].made_for + ' ' + eventArray[i].ex_time ).format('M/DD/YYYY h:mmA');
  changeDeadlineAction( eventArray[i].made_for + ' ' + eventArray[i].am_time );

  // Figure out what EE room ID it is based on Roomview ID.
  let roomID;
  switch (eventArray[i].room_id) {
    // Winspear
    case '60':
      roomID = 3266;
      break;

    // Kenton
    case '20':
      roomID = 3269;
      break;

    // Lyric
    case '64':
      roomID = 3270;
      break;

    // Recital
    case '30':
      roomID = 3268;
      break;

    // Main Aud
    case '49':
      roomID = 7432;
      break;

    // Voertman
    case '16':
      roomID = 3267;    
      break;

    default:
      roomID = 0;
  }
  
  let type;
  switch (eventArray[i].type) {
      
    case '1' : // DMA
      type = '8780';
      break;

    case '3' : // MM
      type = '8779';
      break;

    case '4' : // SR
      type = '8789';
      break;

    case '7' : // Faculty
      type = '8784';
      break;

    case '9' : // GAC
      type = '8781';
      break;

    case '10' : // Ensemble    
      type = '8783';
      break;

    case '6' : // NonDegree  
    case '14' : // Collaborative Event    
      type = '8788';
      break;

    case '5' : // Junior    
      type = '8787';
      break;

    // Guest, external...
    default:
      type = '8786'; // Guest
  }  

  // Update the fields.  Call logic functions if needed.
  form.roomview_id.value      = eventArray[i].event;
  form.entry_date.value       = start;
  form.expiration_date.value  = end;
  form.archive_roomview_json_dump.value = JSON.stringify(eventArray[i]);

  document.getElementById('hall_'+roomID).setAttribute('checked', true);
  roomActions();

  document.getElementById('type_'+type).setAttribute('checked', true);
  typeActions(type);

  //Title
  if (eventArray[i].title2 != null) {
    form.title.value = eventArray[i].title2;
  } else {
    form.title.value = eventArray[i].title;
  }

  // Set to read-only.
  form.expiration_date.setAttribute('readonly',true);
  form.EUID.setAttribute('readonly', true);
  form.email.setAttribute('readonly', true);

  matchPrimaryInstrument(eventArray[i].instrument);
  matchEnsemble(eventArray[i].title); // This is tricky as there isn't a good returned field for ensemble.

  // Attempt to make a title.
  let titleDiv = form.title.value;
  if (eventArray[i].type == 'COM Ensemble') {
    titleDiv.value = eventArray[i].title;
  } else {
    titleDiv.value = eventArray[i].title + ' ' + eventArray[i].instrument;
  }


  getRadioValues();

  calculateFee();
  copyHiddenAudioFields();
  copyHiddenVideoFields();

  validate();
  submitButtonControl();


  // Check for duplciates.
  let dup = checkForDuplicate();

}
//******************************************************************************




//********************************** Actions ********************************//
function getRadioValues() {
  // For Radio boxes, they aren't registered in Elements.
  radios = {
    "type"  : document.querySelector('input[name="archive_recital_type[data][]"]:checked'),
    "room"  : document.querySelector('input[name="room[data][]"]:checked'),
    "audio" : document.querySelector('input[name="service_audio[rows][new_row_0][col_id_67]"]:checked'),
    "video" : document.querySelector('input[name="service_video[rows][new_row_0][col_id_70]"]:checked'),
  }
}
function changeDeadlineAction(startDate) {
  // Only work if the change deadline field is blank.
  if (form.archive_change_deadline.value == "") {
    startDate = form.entry_date.dataset.iso8601;
    let deadline = getDeadline(startDate); // Get the actual date/time of deadline.
    form.archive_change_deadline.value = moment(deadline).format('M/DD/YYYY h:mmA'); // set it.
    document.querySelector('#deadline_relative_time').innerHTML = moment(deadline).fromNow(); // show relative date.
  }
}
function getDeadline(startDate) {
  let deadline  = moment(startDate).subtract(15, 'days');
  deadline      = moment(deadline).hour('23').minute('59');
  return deadline;
}
function getMinBookingDate(startDate) {
  let deadline  = moment(startDate).add(15, 'days');
  deadline      = moment(deadline).hour('23').minute('59');
  return deadline;
}
async function checkForDuplicate() {
  let duplicate = await duplicateFetch();
  if (duplicate.length > 0) {
    new Noty({
        text: '<strong>Duplicate</strong><br /><br />This is a duplicate of <a style="color:white" href="/events/edit/'+duplicate[0].conflict_entry_id+'">'+duplicate[0].conflict_entry_id+'</a>',
        type: 'error',
        theme: 'nest',
        timeout: 30000
    }).show();
    form_valid = false;
    return true;
  } else {
    return false;
  }
  function duplicateFetch() {
    let url = '/events/event_duplication_check/'+form.roomview_id.value;
    let data;

    showLoadingIndicator(true);
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          showLoadingIndicator(false);
          return Promise.reject({
            status: response.status,
            statusText: response.statusText
          })
        }
      })
      .then (data => {
        showLoadingIndicator(false);
        return data;
      })
      .catch(error => {
        console.log('error is', error);
        showLoadingIndicator(false);
      });
    }
}

function roomActions(hallID) {

  if (hallID == undefined) {
    if (radios.room != null) {
      hallID = radios.room.value;
    }
  }


  hallID = hallID * 1 //make a number!

  /****************** Video Support Logic ***************/
  // Winspear & Voertman.
  const videoSupport  = ['3266', '3267'];
  const fieldname     = 'room[data][]';
  const videoDiv      = document.querySelector('#video_request')
  const videoOptions  = document.querySelectorAll('.validateVideo');

  // If no video option is checked, then check no video.
  if (radios.video == null) {
    //document.querySelector('#service_video_novideo').checked = true;
    form.service_video_novideo.checked = true;
  }


  if ( videoSupport.indexOf(form[fieldname].value) >= 0 ) {
    // Video is supported in the selected hall.
    [].forEach.call(videoOptions, function(div) {
      div.classList.remove = 'no_select';
      div.removeAttribute('disabled', false);
    });
    videoDiv.classList.remove('no_select');
  } else {
    // Video is not supported in this hall.
    [].forEach.call(videoOptions, function(div) {
      div.classList.add = 'no_select';
      div.setAttribute('disabled', true);
    });
    form.service_video_novideo.checked = true; //Set the video option to none.
    videoDiv.classList.add('no_select');
  }

  //************** Show Helper Message **************//
  // Hide all messages
  let allElems = document.querySelectorAll('.helper_message_halls');
  for (var i = 0; i < allElems.length; i++) {
    allElems[i].classList.add('hidden');
  }

  // Match the EE hall ID (comes from the form's value parameter), if true then show the message.
  switch(hallID) {
    case 3266 :
      document.querySelector('#helper_winspear').classList.remove('hidden');
      break;
    case 3267 :
      document.querySelector('#helper_voertman').classList.remove('hidden');
      break;
    case 3269 :
      document.querySelector('#helper_kenton').classList.remove('hidden');
      break;
    default :
      document.querySelector('#helper_default').classList.remove('hidden');
  }
}

function typeActions(typeID) {
    // If Type is blank.
    if (typeID == null) {
      // If an option is selected at all.
      if (radios.type != null) {
        typeID = radios.type.value;
      } else {
        return;
      }
    }

    typeID = typeID * 1; //make number.

    //************** Show/Hide Ensemble and Instrument List. **************//
    switch (typeID) {

      // Ensemble
      case 8783:
        document.querySelector('#select_ensemble').classList.remove('hidden');
        document.querySelector('#select_instrument').classList.add('hidden');
        //document.querySelector('#video_live_ens').classList.remove('hidden'); // Show Ensemble Live stream.
      break;

      // SR, NonDeg, Masters, JR, GAC, DMA, studio
      case 8789: case 8788: case 8779: case 8787: case 8781: case 8780: case 8790:
        document.querySelector('#select_ensemble').classList.add('hidden');
        document.querySelector('#select_instrument').classList.remove('hidden');
        //document.querySelector('#video_live_ens').classList.add('hidden'); // hide Ensemble Live stream.
      break;

      default:
        document.querySelector('#select_ensemble').classList.add('hidden');
        document.querySelector('#select_instrument').classList.add('hidden');
    }


    //************** Change Audio recording fees accordingly.  **************//

    // DMA, Ensemble, Faculty, GAC, Masters, SR
    const coursefee = ['8780','8783','8784','8781','8779','8789'];
    const fieldname = 'archive_recital_type[data][]';

    let noFee = document.getElementById('service_audio_nofee');
    let fee   = document.getElementById('service_audio_fee');

    if ( coursefee.indexOf(form[fieldname].value) >= 0 ) {
      // Is a degree recital. No Fee.
      noFee.setAttribute('checked', true);
      noFee.removeAttribute('disabled');
      noFee.classList.remove('no_select');
      fee.setAttribute('disabled', true);
      fee.classList.add('no_select');
      fee.removeAttribute('checked');

    } else {
      // Fee required.
      noFee.setAttribute('disabled', true);
      noFee.classList.add('no_select');
      noFee.removeAttribute('checked');
      fee.setAttribute('checked', true);
      fee.removeAttribute('disabled');
      fee.classList.remove('no_select');
    }


    //************** Show Helper Message **************//
    // Hide all messages
    let allElems = document.querySelectorAll('.helper_message_type');
    for (var i = 0; i < allElems.length; i++) {
      allElems[i].classList.add('hidden');
    }

    switch(typeID) {
      case 8780 : case 8784 : case 8781 : case 8779 : case 8789 :
        document.querySelector('#helper_dma').classList.remove('hidden');
        break;

      // Faculty
      case 8784 :
        document.querySelector('#helper_faculty').classList.remove('hidden');
        break;

      // Guest
      case 8786 :
        document.querySelector('#helper_guest').classList.remove('hidden');
        break;

      // All others.
      default :
        document.querySelector('#helper_nondegree').classList.remove('hidden');

    }
    
}
function calculateFee() {
  var mydata = $('[data-price]:checked');
  var total = 0;

  mydata.each( function(i,elm){
    total = total + $(mydata[i]).data('price');
  });

  if (form.archive_extra_amount_due != null) {
    const extraFee = form.archive_extra_amount_due.dataset.price;
    if (extraFee != null) {
      total = total + (extraFee*1);
    } 
  }

  // Update field.
  form.amount_due.value = total;

  // Show message on submit button.
  if (total*1 > 0) {
    document.querySelector('.submit_paymsg').classList.remove('hidden');
    form.status.value = 'NeedsPayment';
    form.archive_charege_paid.value = ""; // blank the paid if they add-on video.
  } else {
    document.querySelector('.submit_paymsg').classList.add('hidden');
    form.status.value = 'Scheduled';
  }
}
function validate() {

  let validated = [];

  for (var item in inputfields) {
    if (inputfields[item].value == '') {
      styleValidated(false, "#"+inputfields[item].id);
      validated.push(false);
    } else {
      styleValidated(true, "#"+inputfields[item].id);
    }
  };

  // Radios already an object.
  for (var item in radios) {
    if (radios[item] == null) {
      try {
        styleValidated(false, "#"+radios[item].id);
      } catch(error) {};
      validated.push(false);
    } else {
      styleValidated(true, "#"+radios[item].id);
    }
  };

  if (form.EUID.value != '' && form.email.value !== '') {
    styleValidated(true, "#"+form.EUID.id);
  } else {
    styleValidated(false, "#"+form.EUID.id);
    validated.push(false);
  }

  if (form.archive_guest_artist_disclaimer.checked) {
    styleValidated(true, "#"+form.archive_guest_artist_disclaimer.id);
  } else {
    styleValidated(false, "#"+form.archive_guest_artist_disclaimer.id);
    validated.push(false);
  }

  if (validated.length > 0) {
    form_valid = false;
  } else {
    form_valid = true;
  }
}


/////////////////////////// Misc Functions ///////////////////////////
function matchPrimaryInstrument(instrumentNameString) {
  let match = '';
  for (var i = 0; i < ee_instrument_array.length; i++) {
    if ( ee_instrument_array[i].title.includes(instrumentNameString) ) {
      match = ee_instrument_array[i];
    }
  }
  if (match != '') {
    document.querySelector('#instrument_'+match.id).setAttribute('selected', true);
    styleValidated(true, '#archive_instrument');
  }
}

function matchEnsemble (ensembleNameString) {
  let match = '';
  for (var i = 0; i < ee_ensemble_array.length; i++) {
    if ( ee_ensemble_array[i].title.includes(ensembleNameString) ) {
      match = ee_ensemble_array[i];
    }
  }
  if (match != '') {
    document.querySelector('#ensemble_'+match.id).setAttribute('selected', true);
    styleValidated(true, '#archive_ensemble');
  }   
}


function disableSyncFields() {
  // Input Fields.
  let syncedFields = [
    form.entry_date,
    form.expiration_date,
    form.title,
    form.EUID,
    form.email
  ];
  syncedFields.forEach( element => {
    element.setAttribute('readonly', true);
  });


  // Use the class of the radio field.
  let radioFields = [
    ".archive_recital_type",
    ".room",
  ];

  // Loop over each class (each radio field)
  for (var item in radioFields) {
    // get the radio field.
    let fields = document.querySelectorAll(radioFields[item]); 

    // Loop over the radio field.
    for (const field of fields ) {
      // If the radio field is not checked, then disable it.  Readonly does not work.
      if (!field.checked) {
        field.setAttribute('disabled', true);
      }
    }
  }
}



function copyHiddenVideoFields() {
  if (radios.video) {
    form.video_hidden_name.value      = radios.video.dataset.name;
    form.video_hidden_shortname.value = radios.video.dataset.shortname;  
  }
}
function copyHiddenAudioFields() {
  if (radios.audio) {
    form.audio_hidden_name.value      = radios.audio.dataset.name;
    form.audio_hidden_shortname.value = radios.audio.dataset.shortname;
  }
}
function showLoadingIndicator(toggle) {
  toggle ? div_loading.classList.remove('hidden') : div_loading.classList.add('hidden');
  //div_loading.classList.toggle('hidden');
}
function styleValidated(bool, id) {
  if (bool) {
    document.querySelector(id).parentNode.classList.add('validated');
  } else {
    document.querySelector(id).parentNode.classList.remove('validated');
  }
}
function styleErrored(bool, id) {
 
  if(bool) {
    document.querySelector(id).parentNode.classList.add('errored');
  } else {
    document.querySelector(id).parentNode.classList.remove('errored');
  }
}
function submitButtonControl() {
  if (form_valid) {
    //submitbutton.removeAttribute('disabled');
    submitbutton.classList.add('heartbeat', 'submit_validated');
  } else {
    //submitbutton.setAttribute('disabled', true);
    submitbutton.classList.remove('heartbeat', 'submit_validated');
  }
}



/*********************** Submit ***********************/
async function submitHandler(){

  if (form_valid == true) {

    showLoadingIndicator(true);

    let jquery_form = $('#event_form');
    let formSeralized = jquery_form.serialize();
    let action = jquery_form.attr('action');

    /*
    console.log('Submit Successful (but disabled)');
    showLoadingIndicator(false);
    new Noty({
        text: 'Success!  Except the form is in test mode and did not submit.',
        type: 'error',
        theme: 'nest',
        timeout: 5000
    }).show(); 
    */


    axios.post(action, formSeralized)
      .then(function (response) {

        let total2 = form.amount_due.value; // Couldnt' get Total var here...?

        // Hide loading.
        showLoadingIndicator(false);

        // If they pay, redirect.
        if (total2*1 > 0) {
          // EE creates and returns and entry ID if all goes well.
          let entry_id = response.data.entry_id;

          console.log(response);
  
          // Need a popup just incase redirect does not work.
          window.location.replace("/chargecheckout/"+entry_id);

        } else {

          // Payment is not required.  Show conformation that details were saved.
          showLoadingIndicator(false);
          new Noty({
              text: 'Event Details Saved.',
              type: 'success',
              theme: 'nest',
              timeout: 5000
          }).show(); 
        }

      })
      .catch(function (error) {
        console.log(error);
        new Noty({
            text: 'There was an error trying to save event details.<br />Refresh the page and try again?',
            type: 'error',
            theme: 'nest',
            timeout: 5000
        }).show();        
      });

  } else {
    console.log('Submit click aborted due to the form having errors.');
    new Noty({
        text: 'The form has some missing fields.  Please check and try again.',
        type: 'error',
        theme: 'nest',
        timeout: 5000
    }).show();     
  }

};
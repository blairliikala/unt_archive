[
{exp:channel:entries
  channel="faculty"
  backspace="1"
  disable="member_data|categories|pagination"
  limit="1000"
  backspace="1"
  offset="0"
}
{
  "title"           : {exp:ce_str:ing json_encode html_entity_decode}{title}{/exp:ce_str:ing},
  "faculty_short_bio" : {if faculty_short_bio}{exp:ce_str:ing json_encode html_entity_decode}{faculty_short_bio}{/exp:ce_str:ing}{if:else}""{/if},
  "thumbURL"        : "{site_url}{if faculty_photo}{exp:ce_img:pair src="{faculty_photo}" width="400" height="225" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}{if faculty_photo==""}{exp:ce_img:pair src="/images/default.png" width="400" height="306" crop="225"}{made}{/exp:ce_img:pair}{/if}",
  "appointments"    : [ {faculty_appointments backspace='1'}"{faculty_appointments:appointment_title}",{/faculty_appointments} ],
  "instruments"     : [ {faculty_view_instruments backspace='1'}"{faculty_view_instruments:title}",{/faculty_view_instruments} ],
  "ensembles"       : [ {parents backspace="1" field="ensemble_faculty"}"{parents:title}",{/parents} ],
  "areas"           : [ {parents backspace="1" field="performance_chair"}"{parents:title}",{/parents} ],

  "objectID"        : "{entry_id}"
},{/exp:channel:entries}
]
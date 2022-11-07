{!-- Do not add caching to Low_Search tag! --}
[
{exp:low_search:results
  query="{segment_3}"
  keywords:inflect="yes"
  collection="1"
  orderby_sort="date|desc"
}
{if no_results}{/if}
{
  {if count==1}
  "performance"     : "{total_queries} Queries :: {memory_usage} of Memory :: {elapsed_time} :: Seconds to Build.",
  {/if}
  "entry_id"        : "{entry_id}",
  "id"              : "{entry_id}",
  "title"           : {exp:ce_str:ing json_encode html_entity_decode}{title}{/exp:ce_str:ing},
  
  "start"  : "{entry_date format="{DATE_ISO8601}"}",
  "end"    : "{expiration_date format="{DATE_ISO8601}"}",    
  "date_start_human"      : "{entry_date format='%F %j, %Y'} ",
  "date_start_human_time" : "{entry_date format='%g:%i%a'} CST",
  "date_end_human"        : "{expiration_date format='%Y %F %j'}",

  "roomview_details_id" : "{roomview_details_id}",
  "roomview_id"     : "{roomview_id}",

  "email" : "{archive_email_notifications}",
  "archive_booking_full_name": "{archive_booking_full_name}",

  "performers"      : [
    {exp:tag:tags orderby='tag_name' sort='asc' tag_group_id='3' backspace='1' entry_id='{entry_id}'}"{exp:ce_str:ing json_encode}{tag}{exp:ce_str:ing json_encode}", {/exp:tag:tags}
  ],
  "ensemble"        : [{related_ensembles_v2 backspace='2'}"{related_ensembles_v2:title}", {/related_ensembles_v2}],
  "instrument"      : [{archive_instrument backspace='2'}"{archive_instrument:title}", {/archive_instrument}],
  "recitaltype"     : [{archive_recital_type backspace='2'}"{archive_recital_type:title}", {/archive_recital_type}],

  {!-- FullCalendar Specific --}
  "resourceId" : {if room}{room limit="1"}"{room:entry_id}"{/room}{if:else}""{/if},
  "className"   : "{if related_ensembles_v2}ensemble{/if} {if archive_instrument}instrument{/if} {archive_recital_type}{archive_recital_type:url_title}{/archive_recital_type}",
  "editable" : false,


  {!--
  "program" : [
    {ondemand_chapters_grid backspace='1'}
      {
        "name_of_piece"     : {if ondemand_chapters_grid:name_of_piece}{exp:ce_str:ing html_entity_decode json_encode}{ondemand_chapters_grid:name_of_piece}{/exp:ce_str:ing}{if:else}""{/if},
        "name_of_composer"  : {if ondemand_chapters_grid:name_of_composer}{exp:ce_str:ing html_entity_decode json_encode}{ondemand_chapters_grid:name_of_composer}{/exp:ce_str:ing}{if:else}""{/if},
        "name_of_arranger"  : {if ondemand_chapters_grid:name_of_arranger}{exp:ce_str:ing html_entity_decode json_encode}{ondemand_chapters_grid:name_of_arranger}{/exp:ce_str:ing}{if:else}""{/if}
      },{/ondemand_chapters_grid}
  ],
  --}

  "hall"            : "{room:title}",
  {!--"thumbURL"        : "{site_url}{if ondemand_image}{exp:ce_img:pair src="{ondemand_image}" width="400" height="225" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}{if ondemand_image==""}{if related_ensembles_v2:default_picture}{exp:ce_img:pair src="{related_ensembles_v2:default_picture}" width="400" height="225" crop="yes"}{made}{/exp:ce_img:pair}{if:else}{if '{room:room_primary_image:server_path}'!=''}{exp:ce_img:pair src="{room:room_primary_image:server_path}" width="400" height="225" crop="yes"}{made}{/exp:ce_img:pair}{if:else}{exp:ce_img:pair src="/images/default.png" width="400" height="306" crop="225"}{made}{/exp:ce_img:pair}{/if}{/if}{/if}",--}
  "thumbURL" : "{if ondemand_image}{exp:ce_img:pair src="{ondemand_image}" width="544" height="306" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif archive_default_image}{exp:ce_img:pair src="{archive_default_image}" width="544" height="306" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif related_ensembles_v2 AND '{related_ensembles_v2:default_picture}'}{exp:ce_img:pair src="{related_ensembles_v2:default_picture}" width="544" height="306" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif archive_faculty_notificaiton AND '{archive_faculty_notificaiton:faculty_photo:server_path}'}{exp:ce_img:pair src="{archive_faculty_notificaiton:faculty_photo:server_path}" width="544" height="306" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif '{room:room_primary_image:server_path}'}{exp:ce_img:pair src="{room:room_primary_image:server_path}" width="544" height="306" crop="yes" save_type="jpg"  fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:else}{exp:ce_img:pair src="/images/default.png" width="544" height="306" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}",



  "ondemand_video"  : "{if global_streaming}Yes{if:else}No{/if}"
}{if count < total_results},{/if}
{/exp:low_search:results}
]
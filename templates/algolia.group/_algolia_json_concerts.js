{!--
  start_on="August 1st, 2017"
  stop_before="today"
--}

[
{exp:channel:entries
  channel="live"
  status="open|scheduled"
  show_future_entries="yes"
  show_expired="yes"
  backspace="1"
  disable="member_data|categories|pagination"
  limit="100"
  backspace="1"
  offset="0"
}
{

  {!--
  {if count=='1'}
  "performance"     : "{total_queries} Queries :: {memory_usage} of Memory :: {elapsed_time} :: Seconds to Build.",
  {/if}
  --}
  
  "title"           : {exp:ce_str:ing json_encode html_entity_decode}{entry_date format='%F %j, %Y'} {title}{/exp:ce_str:ing},
  "date"            : {entry_date},
  "expiration"      : {expiration_date},
  "starttime"       : "{entry_date format='%g:%i%a'} CST",
  "status"          : "{status}",
  "live_featured"   : {if live_stream}true{if:else}false{/if},
  "performers"      : [
    {exp:tag:tags orderby='tag_name' sort='asc' tag_group_id='3' backspace='1' entry_id='{entry_id}'}{exp:ce_str:ing json_encode}"{tag}{exp:ce_str:ing json_encode}", {/exp:tag:tags}
  ],
  "ensemble"        : [{related_ensembles_v2 backspace='2'}"{related_ensembles_v2:title}", {/related_ensembles_v2}],
  "instrument"      : [{archive_instrument backspace='2'}"{archive_instrument:title}", {/archive_instrument}],
  "recitaltype"     : [{archive_recital_type backspace='2'}"{archive_recital_type:title}", {/archive_recital_type}],
  "program" : [
    {ondemand_chapters_grid backspace='1'}
      {
        "name_of_piece"     : {if ondemand_chapters_grid:name_of_piece}{exp:ce_str:ing html_entity_decode json_encode}{ondemand_chapters_grid:name_of_piece}{/exp:ce_str:ing}{if:else}""{/if},
        "name_of_composer"  : {if ondemand_chapters_grid:name_of_composer}{exp:ce_str:ing html_entity_decode json_encode}{ondemand_chapters_grid:name_of_composer}{/exp:ce_str:ing}{if:else}""{/if},
        "name_of_arranger"  : {if ondemand_chapters_grid:name_of_arranger}{exp:ce_str:ing html_entity_decode json_encode}{ondemand_chapters_grid:name_of_arranger}{/exp:ce_str:ing}{if:else}""{/if}
      },{/ondemand_chapters_grid}
  ],
  "hall"            : "{room:title}",
  "thumbURL"        : "{site_url}{if ondemand_image}{exp:ce_img:pair src="{ondemand_image}" width="400" height="255" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif archive_default_image}{exp:ce_img:pair src="{archive_default_image}" width="400" height="255" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif related_ensembles_v2 AND '{related_ensembles_v2:default_picture}'}{exp:ce_img:pair src="{related_ensembles_v2:default_picture}" width="400" height="255" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif archive_faculty_notificaiton AND '{archive_faculty_notificaiton:faculty_photo:server_path}'}{exp:ce_img:pair src="{archive_faculty_notificaiton:faculty_photo:server_path}" width="400" height="255" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif '{room:room_primary_image:server_path}'}{exp:ce_img:pair src="{room:room_primary_image:server_path}" width="400" height="255" crop="yes" save_type="jpg"  fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:else}{exp:ce_img:pair src="/images/default.png" width="400" height="255" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}",
  "ondemand_video"  : "{if global_streaming}Yes{if:else}No{/if}",
  "objectID"        : "{entry_id}"
},{/exp:channel:entries}
]


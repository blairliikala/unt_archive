[
{exp:channel:entries
  status="open"
  channel="live"
  backspace="1"
  orderby="date"
  show_expired="yes"
  sort="desc"
  disable="categories|member_data|pagination"
  limit='20'
  cache="yes"
  refresh="10000"  
}
{if no_results}{/if}
{
  {if count=='1'}
    "performance"  : "{total_queries} Queries :: {memory_usage} of Memory :: {elapsed_time} :: Seconds to Build.",
  {/if}

  "entry_id"        : "{entry_id}",
  "sequence"        : {if archive_ical_increment}{archive_ical_increment}{if:else}1{/if},
  "date"            : "{entry_date}",
  "date_human"      : "{entry_date format='%F %j, %Y'}",
  "time"            : "{entry_date format='%g:%i%a'} CST",
  "room"            : "{room limit='1'}{room:title}{/room}",

  "thumbURL"        : "{site_url}{if ondemand_image}{exp:ce_img:pair src="{ondemand_image}" width="400" height="225" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif archive_default_image}{exp:ce_img:pair src="{archive_default_image}" width="400" height="225" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif '{related_ensembles_v2:default_picture}'}{exp:ce_img:pair src="{related_ensembles_v2:default_picture}" width="400" height="225" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif '{archive_faculty_notificaiton:faculty_photo:server_path}' }{exp:ce_img:pair src="{archive_faculty_notificaiton:faculty_photo:server_path}" width="400" height="225" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif '{room:room_primary_image:server_path}' }{exp:ce_img:pair src="{room:room_primary_image:server_path}" width="400" height="225" crop="yes" save_type="jpg"  fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:else}{exp:ce_img:pair src="/images/default.png" width="400" height="225" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}",
  "largeURL"        : "{site_url}{if ondemand_image}{exp:ce_img:pair src="{ondemand_image}" width="1280" height="720" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif archive_default_image}{exp:ce_img:pair src="{archive_default_image}" width="1280" height="720" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif '{related_ensembles_v2:default_picture}'}{exp:ce_img:pair src="{related_ensembles_v2:default_picture}" width="1280" height="720" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif '{archive_faculty_notificaiton:faculty_photo:server_path}' }{exp:ce_img:pair src="{archive_faculty_notificaiton:faculty_photo:server_path}" width="1280" height="720" crop="yes" save_type="jpg" fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:elseif '{room:room_primary_image:server_path}' }{exp:ce_img:pair src="{room:room_primary_image:server_path}" width="1280" height="720" crop="yes" save_type="jpg"  fallback_image="/images/default.png"}{made}{/exp:ce_img:pair}{if:else}{exp:ce_img:pair src="/images/default.png" width="1280" height="720" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}",

  {!-- Previous
  "thumbURL"        : "{site_url}{if ondemand_image}{exp:ce_img:pair src="{ondemand_image}" width="400" height="225" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}{if ondemand_image==""}{if related_ensembles_v2:default_picture}{exp:ce_img:pair src="{related_ensembles_v2:default_picture}" width="400" height="225" crop="yes"}{made}{/exp:ce_img:pair}{if:else}{if '{room:room_primary_image:server_path}'!=''}{exp:ce_img:pair src="{room:room_primary_image:server_path}" width="400" height="225" crop="yes"}{made}{/exp:ce_img:pair}{if:else}{exp:ce_img:pair src="/images/default.png" width="400" height="306" crop="yes"}{made}{/exp:ce_img:pair}{/if}{/if}{/if}",
  "largeURL"        : "{site_url}{if ondemand_image}{exp:ce_img:pair src="{ondemand_image}" width="1280" height="720" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}{if ondemand_image==""}{if related_ensembles_v2:default_picture}{exp:ce_img:pair src="{related_ensembles_v2:default_picture}" width="1280" height="720" crop="yes"}{made}{/exp:ce_img:pair}{if:else}{if '{room:room_primary_image:server_path}'!=''}{exp:ce_img:pair src="{room:room_primary_image:server_path}" width="1280" height="720" crop="yes"}{made}{/exp:ce_img:pair}{if:else}{exp:ce_img:pair src="/images/default.png" width="1280" height="720" crop="yes"}{made}{/exp:ce_img:pair}{/if}{/if}{/if}",
  --}
  
  "link_entry"      : "{site_url}/downloads/item/{entry_id}",
  {if global_streaming}
    "link_play_video" : "{site_url}/ media/playvideo/{entry_id}",
  {/if}

  {!-- Ensemble->Faculty relationship. --}
  "email_ensemble_faculty" : "{if related_ensembles_v2}{related_ensembles_v2 backspace='1'}{related_ensembles_v2:ensemble_faculty}{related_ensembles_v2:ensemble_faculty:faculty_email}{if related_ensembles_v2:ensemble_faculty:count < related_ensembles_v2:ensemble_faculty:total_results},{/if}{/related_ensembles_v2:ensemble_faculty},{/related_ensembles_v2}{/if}",

  {!-- Faculty relationship --}
  "email_faculty_selection" : "{archive_faculty_notification}{archive_faculty_notification:faculty_email}{if archive_faculty_notification:count < archive_faculty_notification:total_results},{/if}{/archive_faculty_notification}",

  {!-- Input field in the entry --}
  "email_per_entry" : "{archive_email_notifications}",


  "title"           : {exp:ce_str:ing json_encode html_entity_decode}{title}{/exp:ce_str:ing}

},{/exp:channel:entries}
]
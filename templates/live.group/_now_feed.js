{!-- Careful adding caching to Low_Search tag! --}
[
{exp:low_search:results
  query="{segment_3}"
  keywords:inflect="yes"
  collection="1"
  cache="yes"
  referesh="60"
}
{!-- child:room="3269|3268|3267|3266" --}

{!-- leave no_results as empty array --}
{if no_results}{/if}

{
  {if count==1}
  "performance"     : "{total_queries} Queries :: {memory_usage} of Memory :: {elapsed_time} :: Seconds to Build.",
  {/if}
  "entry_id"        : "{entry_id}",
  "status"          : "{status}",
  "title"           : {exp:ce_str:ing json_encode html_entity_decode}{title}{/exp:ce_str:ing},
  "start"           : "{entry_date format="{DATE_ISO8601}"}",
  "end"             : "{expiration_date format="{DATE_ISO8601}"}",    
  "date_start_human"        : "{entry_date format='%F %j, %Y'} ",
  "date_start_human_time"   : "{entry_date format='%g:%i%a'} CST",
  "date_end_human"          : "{expiration_date format='%Y %F %j'}",
  "date_end_human_time"     : "{expiration_date format='%g:%i%a'} CST",

  {room}
  "room_enable_live_streaming": "{room:room_enable_live_streaming}",  
  "helo_url"                  : "{room:room_helo_url}",
  "room_enable_elemental"     : "{room:room_enable_elemental}",
  "room_enable_haivision"     : "{room:room_enable_haivision}",
  "room_elemental_event_id"   : "{room:room_elemental_event_id}",
  "room_haivision_channel_id" : "{room:room_haivision_channel_id}",
  "hall"                      : "{room:title}",
  "room_entry_id"             : "{room:entry_id}",
  {/room}

  "archive_mux_live_id"         : "{archive_mux_id}",
  "archive_mux_playback_key"    : "{archive_mux_playback_key}",
  "archive_mux_vod_playback_id" : "{archive_mux_vod_playback_id}", 
  "archive_mux_asset_id"        : "{archive_mux_asset_id}",

  "day_of_week"       : "{entry_date format='%l'}",
  "date_relative"     : "{entry_date:relative}",
  "ensemble"          : [{related_ensembles_v2 backspace='2'}"{related_ensembles_v2:title}", {/related_ensembles_v2}],
  "instrument"        : [{archive_instrument backspace='2'}"{archive_instrument:title}", {/archive_instrument}],
  "recitaltype"       : [{archive_recital_type backspace='2'}"{archive_recital_type:title}", {/archive_recital_type}],
  "featured" 		      : {if live_stream}true{if:else}false{/if},
  "global_streaming"  : {if global_streaming}true{if:else}false{/if},
  "chapters" : [ {ondemand_chapters_grid backspace="1"} {
      "piece"         : {if ondemand_chapters_grid:name_of_piece}{exp:ce_str:ing nl2br json_encode}{exp:char_limit total="100" exact="no"}{ondemand_chapters_grid:name_of_piece}{/exp:char_limit}{/exp:ce_str:ing}{if:else}""{/if},
      "movements"     : {if ondemand_chapters_grid:movements}{exp:ce_str:ing nl2br json_encode}{ondemand_chapters_grid:movements}{/exp:ce_str:ing}{if:else}""{/if},
      "composer"      : {if ondemand_chapters_grid:name_of_composer}{exp:ce_str:ing json_encode}{exp:char_limit total="100" exact="no"}{ondemand_chapters_grid:name_of_composer}{/exp:char_limit}{/exp:ce_str:ing}{if:else}""{/if},
      "arranger"      : {if ondemand_chapters_grid:name_of_arranger}{exp:ce_str:ing json_encode}{exp:char_limit total="100" exact="no"}{ondemand_chapters_grid:name_of_arranger}{/exp:char_limit}{/exp:ce_str:ing}{if:else}""{/if},
      "performers"    : {if ondemand_chapters_grid:performers}{exp:ce_str:ing json_encode}{ondemand_chapters_grid:performers}{/exp:ce_str:ing}{if:else}""{/if},
      "marker"        : "{exp:timetoseconds:convert time='{ondemand_chapters_grid:chapter_location_human}'}",
      "markerhuman"   : "{ondemand_chapters_grid:chapter_location_human}",
      "rowid"         : "{ondemand_chapters_grid:field_row_count}",
      "prefixedrowid" : "row-{ondemand_chapters_grid:field_row_count}"
    },{/ondemand_chapters_grid}
  ],
  "performers" : [
    {exp:tag:tags orderby='tag_name' sort='asc' tag_group_id='3' backspace='1' entry_id='{entry_id}'}"{exp:ce_str:ing json_encode}{tag}{exp:ce_str:ing json_encode}", {/exp:tag:tags}
  ],  
  "program"      : "{if concert_program}{site_url}{concert_program}{/if}",
  "thumbURL_small" : "{if ondemand_image}{site_url}{exp:ce_img:pair src="{ondemand_image}" width="256" height="144" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}{if ondemand_image ==""}{if related_ensembles_v2 AND '{related_ensembles_v2:default_picture}'}{related_ensembles_v2 limit='1'}{site_url}{exp:ce_img:pair src="{related_ensembles_v2:default_picture}" width="256" height="144" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/related_ensembles_v2}{if:else}{if archive_faculty_notificaiton AND '{archive_faculty_notificaiton:faculty_photo:server_path}' }{site_url}{exp:ce_img:pair src="{archive_faculty_notificaiton:faculty_photo:server_path}" width="256" height="144" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{if:else}{if '{room:room_primary_image:server_path}' }{site_url}{exp:ce_img:pair src="{room:room_primary_image:server_path}" width="256" height="144" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{if:else}{site_url}{exp:ce_img:pair src="/images/default.png" width="256" height="144" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}{/if}{/if}{/if}",
  "thumbURL_med"       : "{if ondemand_image}{site_url}{exp:ce_img:pair src="{ondemand_image}" width="640" height="360" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}{if ondemand_image ==""}{if related_ensembles_v2 AND '{related_ensembles_v2:default_picture}'}{related_ensembles_v2 limit='1'}{site_url}{exp:ce_img:pair src="{related_ensembles_v2:default_picture}" width="640" height="360" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/related_ensembles_v2}{if:else}{if archive_faculty_notificaiton AND '{archive_faculty_notificaiton:faculty_photo:server_path}' }{site_url}{exp:ce_img:pair src="{archive_faculty_notificaiton:faculty_photo:server_path}" width="640" height="360" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{if:else}{if '{room:room_primary_image:server_path}' }{site_url}{exp:ce_img:pair src="{room:room_primary_image:server_path}" width="640" height="360" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{if:else}{exp:ce_img:pair src="/images/default.png" width="640" height="360" crop="yes" save_type="jpg"}{site_url}{made}{/exp:ce_img:pair}{/if}{/if}{/if}{/if}",
  "thumbFeatured_360"  : "{if ondemand_image}{site_url}{exp:ce_img:pair src="{ondemand_image}" width="640" height="360" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}{if ondemand_image ==""}{if related_ensembles_v2 AND '{related_ensembles_v2:default_picture}'}{related_ensembles_v2 limit='1'}{site_url}{exp:ce_img:pair src="{related_ensembles_v2:default_picture}" width="640" height="360" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/related_ensembles_v2}{/if}{/if}",
  "thumbFeatured_1080" : "{if ondemand_image}{site_url}{exp:ce_img:pair src="{ondemand_image}" width="1920" height="1080" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}{if ondemand_image ==""}{if related_ensembles_v2 AND '{related_ensembles_v2:default_picture}'}{related_ensembles_v2 limit='1'}{site_url}{exp:ce_img:pair src="{related_ensembles_v2:default_picture}" width="1920" height="1080" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/related_ensembles_v2}{/if}{/if}"
}{if count < total_results},{/if}
{/exp:low_search:results}
]


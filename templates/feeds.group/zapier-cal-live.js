[
{exp:channel:entries
  status="livestream|Scheduled"
  search:live_stream="yes"
  show_expired="no"
  show_future_entries="yes"
  backspace="1"
  orderby="date"
  sort="asc"
  disable="categories|member_data|pagination"
}
{if no_results}{/if}
{
  {if count=='1'}
    "performance"  : "{total_queries} Queries :: {memory_usage} of Memory :: {elapsed_time} :: Seconds to Build.",
  {/if}

  "entry_id"        : "{entry_id}",
  "sequence"        : {if archive_ical_increment}{archive_ical_increment}{if:else}1{/if},
  "date"            : "{entry_date}",
  "date_atom"       : "{entry_date format='%Y-%m-%dT%H:%i:%s%Q'}",
  "date_human"      : "{entry_date format='%M %j, %Y'}",
  "time"            : "{entry_date format='%g:%i%a'} CST",
  "date_end_atom"   : "{expiration_date format='%Y-%m-%dT%H:%i:%s%Q'}",
  "room"            : "{room limit='1'}{room:title}{/room}",
  "title"           : {exp:ce_str:ing json_encode html_entity_decode}{title}: {room limit='1'}{room:url_title}{/room} [live]{/exp:ce_str:ing},
  "description"     : "{exp:ce_str:ing html_entity_decode}{related_ensembles_v2 backspace="2"}{related_ensembles_v2:title}, {/related_ensembles_v2}{/exp:ce_str:ing}.  Concert streams begin about 15 minutes before the start of the concert.  UNT is in the Central timezone.",
  "thumbURL"        : "{site_url}{if ondemand_image}{exp:ce_img:pair src='{ondemand_image}' width='548' height='452' crop='yes'}{made}{/exp:ce_img:pair}{if:else}{related_ensembles_v2 limit='1'}{exp:ce_img:pair src='{related_ensembles_v2:default_picture}' width='548' height='452' crop='yes' save_type='jpg'}{made}{/exp:ce_img:pair}{if related_ensembles_v2:no_results}{exp:ce_img:pair src='/images/default.png' width='548' height='452' crop='yes' save_type='jpg' fallback_src='/images/default.png'}{made}{/ce_img:pair}{/if}{/related_ensembles_v2}{/if}",
  "imgURL"          : "{site_url}{if ondemand_image}{exp:ce_img:pair src='{ondemand_image}' width='1920' height='1080' crop='yes'}{made}{/exp:ce_img:pair}{if:else}{related_ensembles_v2 limit='1'}{exp:ce_img:pair src='{related_ensembles_v2:default_picture}' width='1920' height='1080' crop='yes' save_type='jpg'}{made}{/exp:ce_img:pair}{if related_ensembles_v2:no_results}{exp:ce_img:pair src='/images/default.png' width='1920' height='1080' crop='yes' save_type='jpg' fallback_src='/images/default.png'}{made}{/ce_img:pair}{/if}{/related_ensembles_v2}{/if}",
  "categories"  : [
  {exp:ce_str:ing html_entity_decode}
    {if related_ensembles_v2}{related_ensembles_v2 backspace='1'}"{related_ensembles_v2:title}",{/related_ensembles_v2},{/if}
    {if archive_instrument}{archive_instrument backspace='1'}"{archive_instrument:title}",{/archive_instrument},{/if}
    {!--{exp:tag:tags orderby='tag_name' sort='asc' tag_group_id='3|2|7' backspace='1' entry_id='{entry_id}'}{exp:ce_str:ing json_encode}{tag}{exp:ce_str:ing json_encode},{/exp:tag:tags}--}
    {if related_ensembles_v2}{related_ensembles_v2 limit='1' backspace='1'}"{related_ensembles_v2:ensemble_performance_area:title}",{/related_ensembles_v2},{/if}
    {if archive_recital_type}{archive_recital_type backspace='1'}"{archive_recital_type:title}",{/archive_recital_type}{/if}        
  {/exp:ce_str:ing}
  ],

  "program" : [
    {ondemand_chapters_grid backspace='1'}
      {
        "name_of_piece"     : {if ondemand_chapters_grid:name_of_piece}{exp:ce_str:ing html_entity_decode json_encode}{ondemand_chapters_grid:name_of_piece}{/exp:ce_str:ing}{if:else}false{/if},
        "name_of_composer"  : {if ondemand_chapters_grid:name_of_composer}{exp:ce_str:ing html_entity_decode}"{ondemand_chapters_grid:name_of_composer}"{/exp:ce_str:ing}{if:else}false{/if},
        "name_of_arranger"  : {if ondemand_chapters_grid:name_of_arranger}{exp:ce_str:ing html_entity_decode}"{ondemand_chapters_grid:name_of_arranger}"{/exp:ce_str:ing}{if:else}false{/if},
        "marker_human"      : {if ondemand_chapters_grid:chapter_location_human}"{ondemand_chapters_grid:chapter_location_human}"{if:else}false{/if},
        "marker_seconds"    : {if ondemand_chapters_grid:chapter_location_human}"{exp:timetoseconds:convert time='{ondemand_chapters_grid:chapter_location_human}'}"{if:else}false{/if}
      },{/ondemand_chapters_grid}
  ],

  "program_pdf" : {if concert_program}"{site_url}{concert_program}"{if:else}false{/if},

  {!-- Live stream specific fields --}
  "youtube_id"          : "{archive_live_stream_youtube_id}",

  "live_composer_meta"  : [
    {archive_composer_meta backspace='1'}
      {
        "name_of_composer"  : {if archive_composer_meta:name_of_composer}{exp:ce_str:ing html_entity_decode json_encode}{archive_composer_meta:name_of_composer}{/exp:ce_str:ing}{if:else}false{/if},
        "photos"            : {if archive_composer_meta:photos}{archive_composer_meta:photos limit='1'}"{site_url}{archive_composer_meta:photos:url}"{/archive_composer_meta:photos}{if:else}false{/if},
        "description"       : {if archive_composer_meta:description}{exp:ce_str:ing strip_html json_encode html_entity_decode}{archive_composer_meta:description}{/exp:ce_str:ing}{if:else}false{/if}
      },{/archive_composer_meta}
  ],

  "live_performer_bio"  : [
    {archive_performer_bio backspace='1'}
      {
        "name_of_person"  : {if archive_performer_bio:name_of_person}{exp:ce_str:ing html_entity_decode json_encode}{archive_performer_bio:name_of_person}{/exp:ce_str:ing}{if:else}false{/if},
        "photos"          : {if archive_performer_bio:photos}{archive_performer_bio:photos limit='1'}"{site_url}{archive_performer_bio:photos:url}"{/archive_performer_bio:photos}{if:else}false{/if},
        "description"     : {if archive_performer_bio:description}{exp:ce_str:ing html_entity_decodestrip_html json_encode}{archive_performer_bio:description}{/exp:ce_str:ing}{if:else}false{/if}
      },{/archive_performer_bio}
  ],

  "performer_faculty" : [
    {archive_performer_faculty backspace='1'}
      {
        "name"        : "{archive_performer_faculty:title}",
        "short_bio"   : {if archive_performer_faculty:faculty_short_bio}{exp:ce_str:ing json_encode html_entity_decode}{archive_performer_faculty:faculty_short_bio}{/exp:ce_str:ing}{if:else}false{/if},
        "photo"       : {if archive_performer_faculty:faculty_photo}{archive_performer_faculty:faculty_photo limit='1'}"{archive_performer_faculty:faculty_photo:url}""{/archive_performer_faculty:faculty_photo}{if:else}false{/if},
        "appointment" : {if archive_performer_faculty:faculty_appointments}{exp:ce_str:ing html_entity_decode strip_html json_encode}{archive_performer_faculty:faculty_appointments backspace='2'}{archive_performer_faculty:faculty_appointments:appointment_title}, {/archive_performer_faculty:faculty_appointments}{/exp:ce_str:ing}{if:else}false{/if}
    },{/archive_performer_faculty}
  ],

  "videoURL" : "https://54edc27ad2b3c.streamlock.net:443/live/apps/smil:{room}{room:url_title}{/room}.smil/playlist.m3u8?DVR"

},{/exp:channel:entries}
]
[
{exp:channel:entries
  channel='live'
  show_expired="yes"
  status="open"
  limit="10"

}

  {ondemand_chapters_grid}
  {ondemand_chapters_grid:audio_file backspace="1"}
  {
    "concert_title"   : {exp:ce_str:ing json_encode html_entity_decode}{entry_date format='%F %j, %Y'} {title}{/exp:ce_str:ing},
    "concert_entry_id"        : {entry_id},
    "cocnert_link"            : {exp:ce_str:ing json_encode}{site_url}/downloads/item/{entry_id}{/exp:ce_str:ing},
    "concert_date"            : {entry_date},
    "concert_starttime"       : "{entry_date format='%g:%i%a'} CST",

    {!--
    "concert_hall"    : "{room:title}",
    "concert_performers"      : [
      {exp:tag:tags orderby='tag_name' sort='asc' tag_group_id='3' backspace='1' entry_id='{entry_id}'}"{exp:ce_str:ing json_encode}{tag}{exp:ce_str:ing json_encode}", {/exp:tag:tags}
    ],
    "ensemble"        : [{related_ensembles_v2 backspace='2'}"{related_ensembles_v2:title}", {/related_ensembles_v2}],
    "instrument"      : [{archive_instrument backspace='2'}"{archive_instrument:title}", {/archive_instrument}],
    "recitaltype"     : [{archive_recital_type backspace='2'}"{archive_recital_type:title}", {/archive_recital_type}],
    --}

    "thumbURL"        : "{site_url}{if ondemand_image}{exp:ce_img:pair src="{ondemand_image}" width="400" height="225" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}{if ondemand_image==""}{if related_ensembles_v2:default_picture}{exp:ce_img:pair src="{related_ensembles_v2:default_picture}" width="400" height="225" crop="yes"}{made}{/exp:ce_img:pair}{if:else}{if '{room:room_primary_image:server_path}'!=''}{exp:ce_img:pair src="{room:room_primary_image:server_path}" width="400" height="225" crop="yes"}{made}{/exp:ce_img:pair}{if:else}{exp:ce_img:pair src="/images/default.png" width="400" height="306" crop="225"}{made}{/exp:ce_img:pair}{/if}{/if}{/if}",
    "ondemand_video"  : "{if global_streaming}Yes{if:else}No{/if}",

    "piece"           : {if ondemand_chapters_grid:name_of_piece}{exp:ce_str:ing json_encode}{ondemand_chapters_grid:name_of_piece}{/exp:ce_str:ing}{if:else}""{/if},
    "composer"        : {if ondemand_chapters_grid:name_of_composer}{exp:ce_str:ing json_encode}{ondemand_chapters_grid:name_of_composer}{/exp:ce_str:ing}{if:else}""{/if},
    "arranger"        : {if ondemand_chapters_grid:name_of_arranger}{exp:ce_str:ing json_encode}{ondemand_chapters_grid:name_of_arranger}{/exp:ce_str:ing}{if:else}""{/if},
    "file_id"         : {ondemand_chapters_grid:audio_file:file_id},
    "chaptertime"     : {if ondemand_chapters_grid:chapter_location_human}{exp:timetoseconds:convert time='{ondemand_chapters_grid:chapter_location_human}'}{if:else}""{/if},
    "movement"        : "{if total_results > 1}mv. {count}{/if}",
    "audiofile"       : "{exp:paths:getpath path_type='relative' url_path='{ondemand_chapters_grid:audio_file:url}'}",

    "objectID"        : "{ondemand_chapters_grid:audio_file:file_id}"

  },{/ondemand_chapters_grid:audio_file}
  {if ondemand_chapters_grid:count < ondemand_chapters_grid:total_rows},{/if}{/ondemand_chapters_grid}
  {if count < total_results},{/if}{/exp:channel:entries}

]
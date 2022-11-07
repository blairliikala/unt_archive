{

{exp:low_search:results
  query="{segment_3}"
  keywords:lang="en"
  keywords:inflect="yes"
  keywords:mode="any"
  collection="1"
  limit="5"
  show_expired="yes"
}

{if low_search_no_results}
  "results" : false,
  "entries" : [
{/if}

{if count=="1"}
  "results" : true,
  "entries" : [
{/if}
  {ondemand_chapters_grid}
  {ondemand_chapters_grid:audio_file backspace="1"}
  {
    "title"           : {exp:ce_str:ing json_encode}{entry_date format='%Y %F %j'} {title}{/exp:ce_str:ing},
    "link"            : {exp:ce_str:ing json_encode}{site_url}/downloads/item/{entry_id}{/exp:ce_str:ing},
    "piece"           : {if ondemand_chapters_grid:name_of_piece}{exp:ce_str:ing html_entity_decode json_encode}{ondemand_chapters_grid:name_of_piece}{/exp:ce_str:ing}{if:else}""{/if},
    "composer"        : {if ondemand_chapters_grid:name_of_composer}{exp:ce_str:ing html_entity_decode json_encode}{ondemand_chapters_grid:name_of_composer}{/exp:ce_str:ing}{if:else}""{/if},
    "arranger"        : {if ondemand_chapters_grid:name_of_arranger}{exp:ce_str:ing html_entity_decode json_encode}{ondemand_chapters_grid:name_of_arranger}{/exp:ce_str:ing}{if:else}""{/if},
    "filename"        : "{ondemand_chapters_grid:audio_file:filename}",
    "entry_id"        : {entry_id},
    "file_id"         : {ondemand_chapters_grid:audio_file:file_id},
    "chaptertime"     : {exp:timetoseconds:convert time='{ondemand_chapters_grid:chapter_location_human}'},
    "movement"        : "{if total_results > 1}mv. {count}{/if}",
    "waveformFileID"  : "{ondemand_chapters_grid:audio_file:file_id}",
    "audiofile"       : "{exp:paths:getpath path_type='relative' url_path='{ondemand_chapters_grid:audio_file:url}'}",
    "image"           : "{if ondemand_image}{exp:ce_img:pair src='{ondemand_image}' width='640' height='360' crop='yes' save_type='jpg'}{made}{/exp:ce_img:pair}{if:else}{if '{room:room_primary_image:server_path}'!=''}{exp:ce_img:pair src='{room:room_primary_image:server_path}' width='544' height='306' crop='yes' save_type='jpg'}{made}{/exp:ce_img:pair}{if:else}{exp:ce_img:pair src='/images/default.png' width='544' height='306' crop='yes' save_type='jpg'}{made}{/exp:ce_img:pair}{/if}{/if}"
  },{/ondemand_chapters_grid:audio_file}
  {if ondemand_chapters_grid:count < ondemand_chapters_grid:total_rows},{/if}{/ondemand_chapters_grid}
  {if count < total_results},{/if}{/exp:low_search:results}
]
}
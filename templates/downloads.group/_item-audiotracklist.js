{!--
  Caching was being applied to non-open entries causing issues when posting to open.

  {exp:ce_cache:it for="48 hours"}

--}  

{exp:channel:entries
  channel="live" 
  status="open|pending|waitingforreview|LiveStream|pendingvideo|pendingaudio|scheduled|needspayment" 
  show_expired="yes"
  show_future_entries="yes"
  disable="categories|pagination|member_data|relationships" 
  entry_id="{segment_3}"
  limit="1"
  cache="yes"
  refresh="10000"
}
{
  "items" : [
    {ondemand_chapters_grid backspace="1"}
    {ondemand_chapters_grid:audio_file}
    {
      "performance"   : "{total_queries} Queries :: {memory_usage} of Memory :: {elapsed_time} :: Seconds to Build.",
      "title"         : "{entry_date format="%F %j, %Y"} {title}",
      "year"          : "{entry_date format='%Y'}",
      "piece"         : {if ondemand_chapters_grid:name_of_piece}{exp:ce_str:ing json_encode}{exp:char_limit total="75" exact="no"}{ondemand_chapters_grid:name_of_piece}{/exp:char_limit}{/exp:ce_str:ing}{if:else}""{/if},
      "composer"      : {if ondemand_chapters_grid:name_of_composer}{exp:ce_str:ing json_encode}{exp:char_limit total="75" exact="no"}{ondemand_chapters_grid:name_of_composer}{/exp:char_limit}{/exp:ce_str:ing}{if:else}""{/if},
      "arranger"      : {if ondemand_chapters_grid:name_of_arranger}{exp:ce_str:ing json_encode}{exp:char_limit total="75" exact="no"}{ondemand_chapters_grid:name_of_arranger}{/exp:char_limit}{/exp:ce_str:ing}{if:else}""{/if},
      "filename"      : "{ondemand_chapters_grid:audio_file:filename}",
      "waveformFileID": "{ondemand_chapters_grid:audio_file:file_id}",       
      "file_id"       : "{ondemand_chapters_grid:audio_file:file_id}",
      "entry_id"      : "{entry_id}",
      "createM4aURL"  : "{path=downloads/_preview2}/{entry_id}/{ondemand_chapters_grid:row_id}",
      "movement"      : "{if total_results > 1}mv. {count}{/if}",
      "m4a_real"      : "{exp:paths:getpath path_type="relative" url_path="{ondemand_chapters_grid:audio_file:url}"}",

      {!-- Used for streaming. --}
      "m4a"           : "{exp:link_vault:url
                                  url='{exp:paths:getpath path_type="absolute" url_path="{ondemand_chapters_grid:audio_file:url}"}'
                                  parse="inward"                                  
                                  cf:title="{ondemand_chapters_grid:name_of_piece}"
                                  cf:album="{entry_date format="%M %d, %Y"} {title}"
                                  cf:artist="{related_ensembles_v2 backspace="2"}{related_ensembles_v2:title}, {/related_ensembles_v2}"
                                  cf:composer="{ondemand_chapters_grid:name_of_composer}"
                                  cf:year="{entry_date format="%Y"}"
                                  cf:page="{segment_1}/item/{entry_id}"                    
                                  cf:type="preview"
                                  cf:recitaltype="{archive_recital_type backspace='2'}{archive_recital_type:title}, {/archive_recital_type}"
                                  cf:member_group="{logged_in_group_id}"
                                  cf:category=""
                                  cf:accesstime="{current_time format='%Y-%m-%d'}"
                                }",

      {!-- This is for when the entry is not open.  --}
      "wav"           : "{ondemand_chapters_grid:audio_file:url}",


      {!-- Actual URL --}
      {!--"dlm4a2"         : "{exp:paths:getpath path_type="relative" url_path="{ondemand_chapters_grid:audio_file:url}"}",--}

      {!-- Protected URL --}
      "dlm4a"        : "{exp:link_vault:download_link
                            url_only="true"
                            file_path='{exp:paths:getpath path_type="server" serverpath="{ondemand_chapters_grid:audio_file:server_path}" parse="inward"}' 
                            entry_id="{entry_id}" 
                            parse="inward"
                            cf:title="{ondemand_chapters_grid:name_of_piece}"
                            cf:album="{entry_date format="%M %d, %Y"} {title}"
                            cf:artist="{related_ensembles_v2 backspace="2"}{related_ensembles_v2:title}, {/related_ensembles_v2}"
                            cf:composer="{ondemand_chapters_grid:name_of_composer}"
                            cf:year="{entry_date format="%Y"}"
                            cf:page="{segment_1}/item/{entry_id}"
                            cf:type="download m4a"
                            cf:member_group="{logged_in_group_id}"
                            cf:recitaltype="{archive_recital_type backspace='2'}{archive_recital_type:title}, {/archive_recital_type}"
                            cf:category=""
                            cf:accesstime="{current_time format='%Y-%m-%d'}"                            
                  }",

      {!-- Actual URL --}                  
      {!--"dlwav2"     : "{ondemand_chapters_grid:audio_file:url}",--}

      {!-- Protected URL --}      
      "dlwav"          : "{exp:link_vault:download_link
                            url_only="true"
                            file_path='{ondemand_chapters_grid:audio_file:server_path}' 
                            entry_id="{entry_id}" 
                            parse="inward"
                            cf:title="{ondemand_chapters_grid:name_of_piece}"
                            cf:album="{entry_date format="%M %d, %Y"} {title}"
                            cf:artist="{related_ensembles_v2 backspace="2"}{related_ensembles_v2:title}, {/related_ensembles_v2}"
                            cf:composer="{ondemand_chapters_grid:name_of_composer}"
                            cf:year="{entry_date format="%Y"}"
                            cf:page="{segment_1}/item/{entry_id}"
                            cf:type="download wav"
                            cf:member_group="{logged_in_group_id}"
                            cf:recitaltype="{archive_recital_type backspace='2'}{archive_recital_type:title}, {/archive_recital_type}"
                            cf:category=""
                            cf:accesstime="{current_time format='%Y-%m-%d'}"                            
                  }"
    },{/ondemand_chapters_grid:audio_file}{/ondemand_chapters_grid}
  ]
}

{/exp:channel:entries}
{!--{/exp:ce_cache:it}--}

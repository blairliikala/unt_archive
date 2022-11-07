{!-- Do not add caching to Low_Search tag! --}
{!-- Return entries by room.  Used mostly for encoders. --}
[
{exp:low_search:results
  query="{segment_3}"
  keywords:inflect="yes"
  collection="1"
  backspace="1"
}

{

  {if count==1}
  "performance"     : "{total_queries} Queries :: {memory_usage} of Memory :: {elapsed_time} :: Seconds to Build.",
  {/if}


  "title"                     : "{title}",
  "live_stream_enabled"       : {if room_enable_live_streaming}{room_enable_live_streaming}{if:else}false{/if},
  "entry_id"                  : "{entry_id}",
  "room_helo_url"             : "{room_helo_url}",
  "room_enable_elemental"     : {if room_enable_elemental}true{if:else}false{/if},
  "room_enable_haivision"     : {if room_enable_haivision}true{if:else}false{/if},  
  "room_elemental_event_id"   : "{room_elemental_event_id}",
  "room_haivision_channel_id" : "{room_haivision_channel_id}",
  {!--"room_aja_record_url"       : "{room_aja_record_url}",--}
  "room_mux_encoding"         : "{room_mux_encoding:value}",
  "room_kipro_obj"             : [

    {room_ki_pro_recorders backspace="1"}
      {
        "url" : "{room_ki_pro_recorders:ki_pro_url}",
        "change_filename" : {if room_ki_pro_recorders:change_filename == "true"}{room_ki_pro_recorders:change_filename}{if:else}false{/if},
        "auto_start_stop" : {if room_ki_pro_recorders:auto_start_stop == "true"}{room_ki_pro_recorders:auto_start_stop}{if:else}false{/if}
      },{/room_ki_pro_recorders}

  ]

},{/exp:low_search:results}
]
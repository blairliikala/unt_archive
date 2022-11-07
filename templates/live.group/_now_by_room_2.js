{!-- Do not add caching to Low_Search tag! --}
{!-- Return entries by room.  Used mostly for encoders. --}
[
{exp:channel:entries
  channel="rooms"
  backspace="1"
  disable="categories|category_fields|pagination|member_data"
  status="open"
  show_expired="yes"
  show_future_entries="yes"

}
{!--
  entry_id="3269|3268|3267"  
  child:room="3269|3268|3267|3266"
--}
{if no_results}{/if}
{

  {if count==1}
  "performance"     : "{total_queries} Queries :: {memory_usage} of Memory :: {elapsed_time} :: Seconds to Build.",
  {/if}


  "entries" : [
  {parents limit="1" status="scheduled" field="room" show_future_entries="yes" orderby="date" sort="asc"  disable="categories|category_fields|pagination|member_data"}
  {
    "entry_id"                : "{parents:entry_id}",
    "title"                   : {exp:ce_str:ing json_encode html_entity_decode}{parents:title}{/exp:ce_str:ing},
    "start"                   : "{parents:entry_date format="{DATE_ISO8601}"}",
    "end"                     : "{parents:expiration_date format="{DATE_ISO8601}"}",    
    "date_start_human"        : "{parents:entry_date format='%F %j, %Y'} ",
    "date_start_human_time"   : "{parents:entry_date format='%g:%i%a'} CST",
    "date_end_human"          : "{parents:expiration_date format='%Y %F %j'}",
    "date_end_human_time"     : "{parents:expiration_date format='%g:%i%a'} CST"    
  }{if parents:count < parents:total_results},{/if}{/parents}
  ],

  "title"                     : "{title}",
  "live_stream_enabled"       : {if room_enable_live_streaming}{room_enable_live_streaming}{if:else}false{/if},
  "helo_url"                  : "{room_helo_url}",
  "room_elemental_event_id"   : "{room_elemental_event_id}",
  "room_haivision_channel_id" : "{room_haivision_channel_id}",
  "room_aja_record_url"       : "{room_aja_record_url}"

},{/exp:channel:entries}
]
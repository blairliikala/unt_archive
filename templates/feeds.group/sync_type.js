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
  "performance"       : "{total_queries} Queries :: {memory_usage} of Memory :: {elapsed_time} :: Seconds to Build.",
  {/if}

  "entry_id"          : "{entry_id}",
  "title"             : {exp:ce_str:ing json_encode html_entity_decode}{title}{/exp:ce_str:ing},

  "sync_id"           : "{if sync_roomview_id}{sync_roomview_id}{if:else}0{/if}",
  "rooms_roomview_id" : "{if rooms_roomview_id}{rooms_roomview_id}{if:else}0{/if}",
  "type_course_fee_cover" : {if type_course_fee_cover}{type_course_fee_cover}true{/type_course_fee_cover}{if:else}false{/if}


}{if count < total_results},{/if}
{/exp:low_search:results}
]
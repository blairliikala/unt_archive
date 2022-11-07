{!--

For Zapier.

https://recording.music.unt.edu/feeds/concert-item-scheduling?status=scheduled&show_future_entries=yes&range-to:entry_date=+15%20days#
--}

[
{exp:low_search:results
  query="{segment_3}"
  keywords:inflect="yes"
  collection="1"
  orderby_sort="date|desc"
  status="scheduled"
  show_future_entries="yes"
  range-to:entry_date="+20 days"  
}
{if no_results}{/if}
{
  "id"              : "{entry_id}",
  "title"           : {exp:ce_str:ing json_encode html_entity_decode}{room:room_abbreviation}: {title}{/exp:ce_str:ing},
  "start"  			     : "<?php print( date('c', strtotime('-1 hour', strtotime( '{entry_date format='{DATE_ISO8601}'}' )))) ?>",
  "end"    			     : "{expiration_date format="{DATE_ISO8601}"}"
}{if count < total_results},{/if}
{/exp:low_search:results}
]
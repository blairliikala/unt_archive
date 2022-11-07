{!-- Do not add caching to Low_Search tag! --}
{!--

Returns entries that are marked as needing payment, regardless of the time.

--}

[

{exp:low_search:results
  query="{segment_3}"
  keywords:inflect="yes"
  collection="1"
  orderby_sort="date|desc"

  status="scheduled"
  channel="live"
  backspace="1"
  orderby="date"
  show_expired="no"
  show_future_entries="yes"
  sort="desc"
  disable="categories|member_data|pagination"
  search:archive_email_notifications="NOT IS_EMPTY"
}
{if no_results}{/if}

{!-- Make sure the email field has a value. --}

{
  {if count=='1'}
    "performance"  : "{total_queries} Queries :: {memory_usage} of Memory :: {elapsed_time} :: Seconds to Build.",
  {/if}

  "entry_id"        : "{entry_id}",
  "sequence"        : {if archive_ical_increment}{archive_ical_increment}{if:else}1{/if},
  "date_human"      : "{entry_date format='%M %j, %Y'}",
  "time"            : "{entry_date format='%g:%i%a'} CST",
  "screenname"      : "{archive_booking_full_name}",

  "title"           : {exp:ce_str:ing json_encode html_entity_decode}{title}{/exp:ce_str:ing},
  "ensemble"        : [{related_ensembles_v2 backspace='2'}"{related_ensembles_v2:title}", {/related_ensembles_v2}],
  "instrument"      : [{archive_instrument backspace='2'}"{archive_instrument:title}", {/archive_instrument}],
  "recitaltype"     : [{archive_recital_type backspace='2'}"{archive_recital_type:title}", {/archive_recital_type}],
  "hall"            : "{room:title}",
  "thumbURL"        : "{site_url}{if ondemand_image}{exp:ce_img:pair src="{ondemand_image}" width="400" height="225" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}{if ondemand_image==""}{if related_ensembles_v2:default_picture}{exp:ce_img:pair src="{related_ensembles_v2:default_picture}" width="400" height="225" crop="yes"}{made}{/exp:ce_img:pair}{if:else}{if '{room:room_primary_image:server_path}'!=''}{exp:ce_img:pair src="{room:room_primary_image:server_path}" width="400" height="225" crop="yes"}{made}{/exp:ce_img:pair}{if:else}{exp:ce_img:pair src="/images/default.png" width="400" height="306" crop="225"}{made}{/exp:ce_img:pair}{/if}{/if}{/if}",

  {!-- The primary person getting the email --}
  "archive_email_notifications" : "{archive_email_notifications}",

  "title"           : {exp:ce_str:ing json_encode html_entity_decode}{title}{/exp:ce_str:ing}

},{/exp:low_search:results}
]
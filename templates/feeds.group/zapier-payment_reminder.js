{!--

Returns entries that are marked as needing payment, regardless of the time.

--}

[
{exp:channel:entries
  status="Needspayment"
  channel="live"
  backspace="1"
  orderby="date"
  show_expired="no"
  show_future_entries="yes"
  sort="desc"
  disable="categories|member_data|pagination"
  search:archive_email_notifications="NOT IS_EMPTY"
  cache="yes"
  refresh="10000"  
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

  "payment_url"     : "https://recording.music.unt.edu/chargecheckout/{entry_id}",

  {!-- The primary person getting the email --}
  "archive_email_notifications" : "{archive_email_notifications}",

  "title"           : {exp:ce_str:ing json_encode html_entity_decode}{title}{/exp:ce_str:ing}

},{/exp:channel:entries}
]
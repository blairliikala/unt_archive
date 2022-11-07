{!--

Returns entries where the chartstring field has data.

--}

[
{exp:channel:entries
  status="Scheduled|Needspayment"
  channel="live"
  backspace="1"
  orderby="date"
  show_expired="yes"
  show_future_entries="yes"
  sort="desc"
  disable="categories|member_data|pagination"
  search:archive_billing_chart_string="NOT IS_EMPTY"
  cache="yes"
  refresh="10000"
}
{if no_results}{/if}

{!-- Make sure the email field has a value. --}

{
  {if count=='1'}
    "performance"  : "{total_queries} Queries :: {memory_usage} of Memory :: {elapsed_time} :: Seconds to Build.",
  {/if}

  "entry_id"        : "{entry_id}{if archive_ical_increment}{archive_ical_increment}{if:else}1{/if}",
  "date_human"      : "{entry_date format='%M %j, %Y'}",
  "time"            : "{entry_date format='%g:%i%a'} CST",
  "room"            : "{room}{room:title}{/room}",
  "euid"            : "{archive_euid}",
  "email"           : "{archive_email_notifications}",
  "services"        : "{service_audio}{if service_audio:cost > 0}{service_audio:option_name}: ${service_audio:cost}.00{/if}{/service_audio} {service_video}{if service_video:cost > 0}{service_video:option_name}: ${service_video:cost}.00{/if}{/service_video}",
  "chartstring"     : "{archive_billing_chart_string}",
  "title"           : {exp:ce_str:ing json_encode html_entity_decode}{title}{/exp:ce_str:ing}

},{/exp:channel:entries}
]
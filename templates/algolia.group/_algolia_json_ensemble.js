[
{exp:channel:entries
  channel="ensembles"
  backspace="1"
  disable="member_data|categories|pagination"
  limit="1000"
  backspace="1"
  offset="0"
}
{
  "title"           : {exp:ce_str:ing json_encode html_entity_decode}{title}{/exp:ce_str:ing},
  "ensemble_description" : {if ensemble_description}{exp:ce_str:ing json_encode html_entity_decode}{ensemble_description}{/exp:ce_str:ing}{if:else}""{/if},
  "conductor_name"  : {if conductor_name}{exp:ce_str:ing json_encode html_entity_decode}{conductor_name}{/exp:ce_str:ing}{if:else}""{/if},
  "thumbURL"        : "{site_url}{if default_picture}{exp:ce_img:pair src="{default_picture}" width="400" height="225" crop="yes" save_type="jpg"}{made}{/exp:ce_img:pair}{/if}{if default_picture==""}{exp:ce_img:pair src="/images/default.png" width="400" height="306" crop="225"}{made}{/exp:ce_img:pair}{/if}",
  "area"            : [ {ensemble_performance_area backspace='1'}"{ensemble_performance_area:title}",{/ensemble_performance_area} ],
  "faculty"         : [ {ensemble_faculty backspace='1'}"{ensemble_faculty:title}",{/ensemble_faculty} ],
  "objectID"        : "{entry_id}"
},{/exp:channel:entries}
]
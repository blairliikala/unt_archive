[

{if segment_3 !=''}

{exp:channel:entries
	channel="live"
	show_expired="yes"
	show_future_entries="yes"
	status="open|closed|waitingforreview|Scheduled|Needspayment|pending"
	disable="categories|member_data|pagination|relationships"
	search:roomview_id="{segment_3}"
	backspace="1"
	dynamic="no"
}

{
	"conflict" : true,
	"conflict_entry_id" : "{entry_id}"
},{/exp:channel:entries}

{if:else}

{
	"conflict" : false
}

{/if}

]
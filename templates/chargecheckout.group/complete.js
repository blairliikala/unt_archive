[
{exp:charge:info
    hash="{segment_3}" 
    status="open|closed|Needspayment|Scheduled"
}
{if no_results}{/if}

{
    "amount_currency_formatted" : "{amount_currency_formatted}",
    "customer_id"               : "{customer_id}",
    "payment_id"                : "{payment_id}",
    "mode"                      : "{mode}",
    "type"                      : "{type}",
    "card_last4"                : "{card_last4}",
    "hash"                      : "{segment_3}"
}


{/exp:charge:info}
]
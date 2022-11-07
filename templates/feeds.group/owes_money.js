[
{exp:query sql="SELECT * FROM exp_member_data_field_29 WHERE m_field_id_29 !=''" backspace="1"}
	{

		"member_id" : {member_id},
		"owed" : "{m_field_id_29}",
		{exp:member:custom_profile_data member_id="{member_id}"}
		"username" : "{username}"
		{/exp:member:custom_profile_data}
	},{/exp:query}
]
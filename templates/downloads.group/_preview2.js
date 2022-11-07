{!-- This makes use of a custom plugin, "compressed_audio" that will render the m4a before showing the page --} 
{exp:channel:entries
  channel="live"
  show_expired="yes" 
  disable="categories|pagination|member_data"
  limit="1" 
  dynamic="off" 
  entry_id="{segment_3}"
  status="open|pending|waitingforreview|pendingvideo|pendingaudio|livestream"
}
{
{if status=="open"}
  {ondemand_chapters_grid row_id="{segment_4}"}
    {ondemand_chapters_grid:audio_file backspace="1"}

        {exp:ce_img:pair
          src='{archive_default_image}'
          width='900'
          height='900'
          crop='yes' 
          quality='70' 
          save_type='jpg' 
          parse="inward" 
          fallback_src="/images/default_square.png"
        }

          {exp:compressed_audio:get_preview_link
              parse="inward"
              file_path='{ondemand_chapters_grid:audio_file:server_path}'
              url_path="{ondemand_chapters_grid:audio_file:url}"
              title="{ondemand_chapters_grid:name_of_piece}"
              album="{entry_date format="%M %d, %Y"} {title}"
              artist="{title}"
              composer="{ondemand_chapters_grid:name_of_composer}"
              arranger="{ondemand_chapters_grid:name_of_arranger}"
              author="UNT Recording Services"
              year="{entry_date format='%Y'}"
              track="{ondemand_chapters_grid:row_count}"
              general="Made by UNT Recording Services"
              copyright="{current_time format='%Y'}"
              genre="Classical"
              artwork="{made}"
              filetype="m4a"
            }
            {if '{preview_url}' ==""}
              "result" : 0
            {if:else}
              "result" : 1
            {/if}
            {/exp:compressed_audio:get_preview_link}
            
          {/exp:ce_img:pair}
        ,{/ondemand_chapters_grid:audio_file}
  {/ondemand_chapters_grid}

{if:else}
  "result" : 1
{/if}
}
{/exp:channel:entries}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Dtos
{
    public class MessageForCreationDto
    {
        public int SenderId  { get; set; }
        public int RecipientId { get; set; }
        public DateTime SentDate { get; set; }
        public string Content { get; set; }

        public MessageForCreationDto()
        {
            SentDate = DateTime.Now;
        }
    }
}

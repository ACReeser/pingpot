using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pingpot.Models
{
    public class ElevensesModel
    {
        [JsonProperty("elevenses")]
        public bool Elevenses { get; set; }
    }
}
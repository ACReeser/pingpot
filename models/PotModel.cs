using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pingpot.Models
{
    public class PotModel
    {
        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }

        public string office { get; set; }

        public string heatLevel { get; set; }

        public int cupsLeft { get; set; }
    }
}
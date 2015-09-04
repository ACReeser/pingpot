using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pingpot.Models
{
    public class SuppliesModel
    {
        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }

        public string office { get; set; }

        public double creamerPercent { get; set; }
        public double coffeePercent { get; set; }
        public double sugarPercent { get; set; }
    }
}
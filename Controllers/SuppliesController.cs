using pingpot.Classes;
using pingpot.Models;
using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace pingpot.Controllers
{
    public class SuppliesController : ApiController
    {
        
        public static bool HasCheckedDB = false;

        private SQLiteAsyncConnection db;
        public SuppliesController()
        {
            if (!HasCheckedDB)
                CheckDB();
        }

        private async void CheckDB()
        {
            db = new SQLiteAsyncConnection(Constants.DBLocation);
            if (db.Table<PotModel>() == null)
            {
                await db.CreateTableAsync<SuppliesModel>();
                await db.InsertAsync(new SuppliesModel()
                {
                    office = "main",
                });
            }
            HasCheckedDB = true;
        }

        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, GetSupplies());
        }

        private async Task<SuppliesModel> GetSupplies()
        {
            return await db.Table<SuppliesModel>().Where(p => p.office == "main").FirstOrDefaultAsync();
        }

        public HttpResponseMessage Post([FromUri] string supplyType)
        {
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        private bool ValidateType(string supplyType)
        {
            switch (supplyType)
            {
                case "creamer":
                case "coffee":
                case "sugar":
                    return true;
                default:
                    return false;
            }
        }
    }
}
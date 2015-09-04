using pingpot.Classes;
using pingpot.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using SQLite;

namespace pingpot.Controllers
{
    public class PotController : ApiController
    {
        public static bool HasCheckedDB = false;

        private SQLiteConnection db;
        private SQLiteAsyncConnection asyncDB;
        public PotController()
        {
            db = new SQLiteConnection(Constants.DBLocation);
            asyncDB = new SQLiteAsyncConnection(Constants.DBLocation);

            if (!HasCheckedDB)
                CheckDB();
        }

        private async void CheckDB()
        {
            int tableCount = db.ExecuteScalar<int>("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='PotModel'");
            if (tableCount < 1)
            {
                CreateTable();
            }
            HasCheckedDB = true;
        }
        
        private void CreateTable()
        {
            db.CreateTable<PotModel>();
            db.Insert(new PotModel()
            {
                office = "main",
            });
        }

        // GET api/<controller>
        public async Task<HttpResponseMessage> Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, await GetCurrentPot());
        }

        private async Task<PotModel> GetCurrentPot()
        {
            return await asyncDB.Table<PotModel>().Where(p => p.office == "main").FirstOrDefaultAsync();
        }

        // POST api/<controller>
        public async Task<HttpResponseMessage> Post([FromBody] PotModel potStatusUpdate, int id)
        {
            potStatusUpdate.Id = id;
            return Request.CreateResponse(HttpStatusCode.OK, await SetPot(potStatusUpdate));
        }

        private async Task<PotModel> SetPot(PotModel potStatusUpdate)
        {
            await asyncDB.UpdateAsync(potStatusUpdate);
            return await GetCurrentPot();
        }

    }

}
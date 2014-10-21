using pingpot.Classes;
using pingpot.Models;
using pingpot.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pingpot.Controllers
{
    public class SuppliesController : ApiController
    {
        public SupplyRepository supplies = new SupplyRepository();

        public class SuppliesResponse
        {
            public object creamer;
            public object coffee;
            public object sugar;

            public SuppliesResponse()
            {
                this.creamer = Cache.Store.ListRange("creamer", 0, -1).Select(v => (string)v);
                this.coffee = Cache.Store.ListRange("coffee", 0, -1).Select(v => (string)v);
                this.sugar = Cache.Store.ListRange("sugar", 0, -1).Select(v => (string)v);
            }
        }

        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, new SuppliesResponse());
        }

        public HttpResponseMessage Post([FromUri] string supplyType)
        {
            if (ValidateType(supplyType))
            {
                string upFirst = Cache.Store.ListLeftPop(supplyType);
                Cache.Store.ListRightPush(supplyType, upFirst);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
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
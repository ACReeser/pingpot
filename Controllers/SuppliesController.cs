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
                
        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, supplies.Get());
        }

        public HttpResponseMessage Post(SupplyModel model)
        {
            supplies.Add(model);

            return Request.CreateResponse(HttpStatusCode.OK, model);
        }
    }
}
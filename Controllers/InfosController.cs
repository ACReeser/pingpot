using pingpot.Classes;
using pingpot.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pingpot.Controllers
{
    public class InfosController : ApiController
    {
        static InfosController()
        {
        }

        // GET api/<controller>
        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, Cache.Store.ListRange("creamer", 0, -1).Select(c => c.ToString()));
        }

        // POST api/<controller>
        [HttpPost]
        [Route("infos/creamer")]
        public HttpResponseMessage GetCreamer()
        {
            
            return Request.CreateResponse(HttpStatusCode.OK, Cache.Store.ListRange("creamer", 0, -1));
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}
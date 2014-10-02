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
        public static ElevensesModel Elevenses { get; set; }

        static InfosController()
        {
            Elevenses = new ElevensesModel();
        }

        // GET api/<controller>
        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, Elevenses);
        }

        // POST api/<controller>
        [HttpPost]
        [Route("infos/1")]
        public HttpResponseMessage FlipElevenses()
        {
            Elevenses.Elevenses = !Elevenses.Elevenses;
            return Request.CreateResponse(HttpStatusCode.OK, Elevenses);
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
using pingpot.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace pingpot.Controllers
{
    public class PotController : ApiController
    {
        public class PotResponse
        {
            public int? cupsLeft { get; set; }
            public Nullable<Heat> heat { get; set; }

            public PotResponse()
            {
                this.cupsLeft = (int)Cache.Store.StringGet("cupsLeft");
                this.heat = (Heat)Enum.Parse(typeof(Heat), (string)Cache.Store.StringGet("heat"));
            }
        }

        // GET api/<controller>
        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, new PotResponse());
        }

        // POST api/<controller>
        public HttpResponseMessage Post([FromBody] PotResponse potStatusUpdate)
        {
            if (potStatusUpdate.cupsLeft.HasValue)
                Cache.Store.StringSet("cupsLeft", potStatusUpdate.cupsLeft.Value);
            if (potStatusUpdate.heat.HasValue)
                Cache.Store.StringSet("heat", potStatusUpdate.heat.Value.ToString("F"));

            return Request.CreateResponse(HttpStatusCode.OK, new PotResponse());
        }

    }

}
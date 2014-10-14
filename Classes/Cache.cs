using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pingpot.Classes
{
    public static class Cache
    {
        //get redis from https://github.com/rgl/redis/downloads
        //this client is https://github.com/StackExchange/StackExchange.Redis/tree/master/Docs
        private static ConnectionMultiplexer redis {get;set;}
        public static IDatabase Store { get; set; }

        static Cache()
        {
            redis = ConnectionMultiplexer.Connect("localhost:6379");
            Store = redis.GetDatabase();
            Store.KeyDelete("creamer");
            Store.ListLeftPush("creamer", "Landon");
            Store.ListLeftPush("creamer", "Ben");
            Store.ListLeftPush("creamer", "Alex");
        }

    }
}
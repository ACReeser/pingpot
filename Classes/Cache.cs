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
            if (!Store.KeyExists("userCount"))
            {
                Bootstrap();
            }
        }

        private static void Bootstrap()
        {
            AddUserAndQueueAll(1, "Alex");
            AddUserAndQueueAll(2, "Ben");
            Store.StringIncrement("userCount");
            Store.StringIncrement("userCount");
        }

        private static void AddUserAndQueueAll(int userID, string username)
        {
            Store.StringSet("user_"+userID, username);
            Store.ListLeftPush("coffee" , username);
            Store.ListLeftPush("creamer", username);
            Store.ListLeftPush("sugar"  , username);
        }

    }
}
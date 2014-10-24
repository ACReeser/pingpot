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
            redis = ConnectionMultiplexer.Connect("127.0.0.1:6379");
            Store = redis.GetDatabase();
            NukeBackend();
            if (!Store.KeyExists("userCount"))
            {
                Bootstrap();
            }
        }

        private static void NukeBackend()
        {
            Store.KeyDelete(new RedisKey[]{"userCount", "coffee", "creamer", "sugar", "userCount"});
        }

        private static void Bootstrap()
        {
            AddUserAndQueueAll(1, "Alex");
            AddUserAndQueueAll(2, "Ben");
            AddUserAndQueueAll(3, "Brian");
            AddUserAndQueueAll(4, "Cory");
            AddUserAndQueueAll(5, "John");
            AddUserAndQueueAll(6, "Landon");

            Store.StringSet("heat", Heat.Cold.ToString("F"));
            Store.StringSet("cupsLeft", 0);
        }

        private static void AddUserAndQueueAll(int userID, string username)
        {
            Store.StringSet("user_"+userID, username);
            Store.ListRightPush("coffee" , username);
            Store.ListRightPush("creamer", username);
            Store.ListRightPush("sugar", username);
            Store.StringIncrement("userCount");
        }

    }
}
using pingpot.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;

namespace pingpot.Repositories
{
    public class SupplyRepository : IRepository<SupplyModel>
    {
        static Queue<SupplyModel> supplies = new Queue<SupplyModel>();

        public ICollection<SupplyModel> Get()
        {
            return supplies.ToList();
        }

        public SupplyModel Add(SupplyModel model)
        {
            supplies.Enqueue(model);
            return model;
        }

        public SupplyModel Get(int id)
        {
            return supplies.Dequeue();
        }

        public SupplyModel Update(int id, Newtonsoft.Json.Linq.JObject changeValues)
        {
            throw new NotImplementedException();
        }

        public SupplyModel Update(int id, SupplyModel updatedModel)
        {
            throw new NotImplementedException();
        }
    }
}
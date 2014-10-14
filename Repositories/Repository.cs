using Newtonsoft.Json.Linq;
using pingpot.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;

namespace pingpot.Repositories
{
    public class Repository<T>:IRepository<T> where T : IEntity
    {
        internal static Collection<T> items = new Collection<T>();

        public ICollection<T> Get()
        {
            return items;
        }

        public T Get(int id)
        {

            return items.FirstOrDefault(c => c.ID == id);
        }

        public T Add(T model)
        {
            if (items.Any(c => c.ID == model.ID))
                throw new InvalidOperationException(String.Format("Duplicate Key ({0}) found in in repository of type ({1})", model.ID, model.GetType().Name));

            items.Add(model);

            return model;
        }

        public T Update(int id, JObject changeValues)
        {
            T modelFromRepo = Get(id);

            return modelFromRepo;
        }

        public T Update(int id, T updatedModel)
        {
            if (items.Any(c => c.ID == id))
                throw new KeyNotFoundException(String.Format("ID:{0} does not exist for Type:{1}", id, typeof(T).Name));

            return updatedModel;
        }
    }
}

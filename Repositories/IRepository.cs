using pingpot.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;

namespace pingpot.Repositories
{
    public interface IRepository<T> where T : IEntity
    {
        ICollection<T> Get();
        T Add(T model);
        T Get(int id);
        T Update(int id, Newtonsoft.Json.Linq.JObject changeValues);
        T Update(int id, T updatedModel);
    }
}

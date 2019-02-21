using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    class DatingRepository : IDatingRepository
    {

        private readonly DataContext _db;

        public DatingRepository(DataContext db)
        {
            _db = db;
        }

        public void Add<T>(T entity) where T : class
        {
            _db.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _db.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _db.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _db.Users.Include(p => p.Photos).ToListAsync();

            return users;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _db.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _db.Photos.FirstOrDefaultAsync(p => p.UserId == id);
            return photo;
        }

        public async Task<ICollection<Photo>> GetUserPhotos(int id)
        {
            return await _db.Photos.Where(p => p.UserId == id).ToListAsync();
        }
    }
}

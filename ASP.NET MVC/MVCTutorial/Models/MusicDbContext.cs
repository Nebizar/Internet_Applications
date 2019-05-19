using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MVCTutorial.Models
{
    public class MusicDbContext : DbContext
    {
        public DbSet<Song> Songs { get; set; }

        public MusicDbContext() : base("DefaultConnection") { }

        public System.Data.Entity.DbSet<MVCTutorial.Models.Genre> Genres { get; set; }
    }
}
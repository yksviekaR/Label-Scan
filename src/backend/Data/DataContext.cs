using CodeApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CodeApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "codeApiNeo.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");

        public string DbPath { get; }

        public DbSet<Items> Items { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<UserSnacks> UserSnacks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Items>()
                .HasData(
                    new Items { id_i = 1, ItemName = "expItem1", Barcode = "1234562", Description = "expItem1Description", EnergyValue = 123, Fat = 123, ofWhichSaturates = 123, Carbohydrates = 123, ofWhichSugars = 123, Protein = 123, Salt = 123, Fiber = 123, Mass = 123 },
                    new Items { id_i = 2, ItemName = "expItem2", Barcode = "3856343", Description = "expItem2Description", EnergyValue = 23.3, Fat = 23.7, ofWhichSaturates = 1.5, Carbohydrates = 65.3, ofWhichSugars = 11, Protein = 24, Salt = 87, Fiber = 123, Mass = 123 },
                    new Items { id_i = 3, ItemName = "expItem3", Barcode = "2137420", Description = "expItem3Description", EnergyValue = 1.23, Fat = 12.3, ofWhichSaturates = 13.3, Carbohydrates = 54.9, ofWhichSugars = 0.4, Protein = 3.2, Salt = 0.04, Fiber = 2, Mass = 7 }
                );
            modelBuilder.Entity<Users>()
                .HasData(
                    new Users { id_u = 1, Username = "expUser1", Password = "1234" },
                    new Users { id_u = 2, Username = "expUSer2", Password = "4321" }
                );
            modelBuilder.Entity<UserSnacks>()
                .HasData(
                    new UserSnacks { Id_s = 1, Id_u = 2, SnackName = "expSnack1", EnergyValue = 123, Fat = 123, ofWhichSaturates = 123, Carbohydrates = 123, ofWhichSugars = 123, Protein = 123, Salt = 123, Fiber = 123, Mass = 123, Ingredients = "[{ItemName = 'expItem1', Barcode = '1234562', Dose = 123}, {ItemName = 'expItem2', Barcode = '3856343', Dose = 123}, {ItemName = 'expItem2', Barcode = '2137420', Dose = 123}]" },
                    new UserSnacks { Id_s = 2, Id_u = 2, SnackName = "expSnack2", EnergyValue = 23.3, Fat = 23.7, ofWhichSaturates = 1.5, Carbohydrates = 65.3, ofWhichSugars = 11, Protein = 24, Salt = 87, Fiber = 123, Mass = 123, Ingredients = "[{ItemName = 'expItem1', Barcode = '1234562', Dose = 123}, {ItemName = 'expItem2', Barcode = '3856343', Dose = 123}, {ItemName = 'expItem2', Barcode = '2137420', Dose = 123}]" },
                    new UserSnacks { Id_s = 3, Id_u = 1, SnackName = "expSNack3", EnergyValue = 1.23, Fat = 12.3, ofWhichSaturates = 13.3, Carbohydrates = 54.9, ofWhichSugars = 0.4, Protein = 3.2, Salt = 0.04, Fiber = 2, Mass = 7, Ingredients = "[{ItemName = 'expItem1', Barcode = '1234562', Dose = 123}, {ItemName = 'expItem2', Barcode = '3856343', Dose = 123}, {ItemName = 'expItem2', Barcode = '2137420', Dose = 123}]" }
                );

            modelBuilder.Entity<Users>()
                .HasMany(o => o.userSnacks)
                .WithOne(oi => oi.users)
                .HasForeignKey(oi => oi.Id_u);
             
                
        }
    }
}

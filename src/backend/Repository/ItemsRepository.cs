using CodeApi.Data;
using CodeApi.Dto;
using CodeApi.Interfaces;
using CodeApi.Models;

namespace CodeApi.Repository
{
    public class ItemsRepository : IItemsRepository
    {
        private readonly DataContext _context;

        public ItemsRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateItem(Items items)
        {
            _context.Add(items);

            return Save();
        }

        public bool DeleteItem(Items items)
        {
            _context.Remove(items);
            return Save();
        }

        public Items GetItem(int id_i)
        {
            return _context.Items.Where(p => p.id_i == id_i).FirstOrDefault();
        }

        public Items GetItemByBarcode(string barcode)
        {
            return _context.Items.Where(p => p.Barcode == barcode).FirstOrDefault();
        }

        public Items GetItemByName(string ItemName)
        {
            return _context.Items.Where(p => p.ItemName.ToLower() == ItemName.ToLower()).FirstOrDefault();
        }

        public ICollection<Items> GetItems()
        {
            return _context.Items.OrderBy(p => p.id_i).ToList();
        }

        public Items GetItemsTrimToUpper(ItemsDto itemCreate)
        {
            return GetItems().Where(c => c.ItemName.Trim().ToUpper() == itemCreate.ItemName.TrimEnd().ToUpper()).FirstOrDefault();
        }

        public bool ItemExists(int id_i)
        {
            return _context.Items.Any(p => p.id_i == id_i);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateItem(Items items)
        {
            _context.Update(items);
            return Save();
        }
    }
}

using CodeApi.Dto;
using CodeApi.Models;

namespace CodeApi.Interfaces
{
    public interface IItemsRepository
    {
        ICollection<Items> GetItems();

        Items GetItem(int id_i);

        Items GetItemByName(string ItemName);

        Items GetItemByBarcode(string Barcode);

        Items GetItemsTrimToUpper(ItemsDto itemCreate);

        bool ItemExists(int id_i);

        bool CreateItem(Items items);

        bool UpdateItem(Items items);

        bool DeleteItem(Items items);

        bool Save();
    }
}

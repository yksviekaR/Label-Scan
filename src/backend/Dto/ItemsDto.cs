using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeApi.Dto
{
    public class ItemsDto
    { 
        public int id_i { get; set; }
        public string ItemName { get; set; }
        public string Barcode { get; set; }
        public string Description { get; set; }
        public double EnergyValue { get; set; }
        public double Fat { get; set; }
        public double ofWhichSaturates { get; set; }
        public double Carbohydrates { get; set; }
        public double ofWhichSugars { get; set; }
        public double Protein { get; set; }
        public double Salt { get; set; }
        public double Fiber { get; set; }
        public double Mass { get; set; }
    }
}

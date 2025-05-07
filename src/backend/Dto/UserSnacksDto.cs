namespace CodeApi.Dto
{
    public class UserSnacksDto
    {
        public int Id_s { get; set; }
        public int Id_u { get; set; }
        public string SnackName { get; set; }
        public double EnergyValue { get; set; }
        public double Fat { get; set; }
        public double ofWhichSaturates { get; set; }
        public double Carbohydrates { get; set; }
        public double ofWhichSugars { get; set; }
        public double Protein { get; set; }
        public double Salt { get; set; }
        public double Fiber { get; set; }
        public double Mass { get; set; }
        public string Ingredients { get; set; }
    }
}

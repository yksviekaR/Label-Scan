using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CodeApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    id_i = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ItemName = table.Column<string>(type: "TEXT", nullable: false),
                    Barcode = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    EnergyValue = table.Column<double>(type: "REAL", nullable: false),
                    Fat = table.Column<double>(type: "REAL", nullable: false),
                    ofWhichSaturates = table.Column<double>(type: "REAL", nullable: false),
                    Carbohydrates = table.Column<double>(type: "REAL", nullable: false),
                    ofWhichSugars = table.Column<double>(type: "REAL", nullable: false),
                    Protein = table.Column<double>(type: "REAL", nullable: false),
                    Salt = table.Column<double>(type: "REAL", nullable: false),
                    Fiber = table.Column<double>(type: "REAL", nullable: false),
                    Mass = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.id_i);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id_u = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id_u);
                });

            migrationBuilder.CreateTable(
                name: "UserSnacks",
                columns: table => new
                {
                    Id_s = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Id_u = table.Column<int>(type: "INTEGER", nullable: false),
                    SnackName = table.Column<string>(type: "TEXT", nullable: false),
                    EnergyValue = table.Column<double>(type: "REAL", nullable: false),
                    Fat = table.Column<double>(type: "REAL", nullable: false),
                    ofWhichSaturates = table.Column<double>(type: "REAL", nullable: false),
                    Carbohydrates = table.Column<double>(type: "REAL", nullable: false),
                    ofWhichSugars = table.Column<double>(type: "REAL", nullable: false),
                    Protein = table.Column<double>(type: "REAL", nullable: false),
                    Salt = table.Column<double>(type: "REAL", nullable: false),
                    Fiber = table.Column<double>(type: "REAL", nullable: false),
                    Mass = table.Column<double>(type: "REAL", nullable: false),
                    Ingredients = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSnacks", x => x.Id_s);
                    table.ForeignKey(
                        name: "FK_UserSnacks_Users_Id_u",
                        column: x => x.Id_u,
                        principalTable: "Users",
                        principalColumn: "id_u",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "id_i", "Barcode", "Carbohydrates", "Description", "EnergyValue", "Fat", "Fiber", "ItemName", "Mass", "Protein", "Salt", "ofWhichSaturates", "ofWhichSugars" },
                values: new object[,]
                {
                    { 1, "1234562", 123.0, "expItem1Description", 123.0, 123.0, 123.0, "expItem1", 123.0, 123.0, 123.0, 123.0, 123.0 },
                    { 2, "3856343", 65.299999999999997, "expItem2Description", 23.300000000000001, 23.699999999999999, 123.0, "expItem2", 123.0, 24.0, 87.0, 1.5, 11.0 },
                    { 3, "2137420", 54.899999999999999, "expItem3Description", 1.23, 12.300000000000001, 2.0, "expItem3", 7.0, 3.2000000000000002, 0.040000000000000001, 13.300000000000001, 0.40000000000000002 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "id_u", "Password", "Username" },
                values: new object[,]
                {
                    { 1, "1234", "expUser1" },
                    { 2, "4321", "expUSer2" }
                });

            migrationBuilder.InsertData(
                table: "UserSnacks",
                columns: new[] { "Id_s", "Carbohydrates", "EnergyValue", "Fat", "Fiber", "Id_u", "Ingredients", "Mass", "Protein", "Salt", "SnackName", "ofWhichSaturates", "ofWhichSugars" },
                values: new object[,]
                {
                    { 1, 123.0, 123.0, 123.0, 123.0, 2, "[{ItemName = 'expItem1', Barcode = '1234562', Dose = 123}, {ItemName = 'expItem2', Barcode = '3856343', Dose = 123}, {ItemName = 'expItem2', Barcode = '2137420', Dose = 123}]", 123.0, 123.0, 123.0, "expSnack1", 123.0, 123.0 },
                    { 2, 65.299999999999997, 23.300000000000001, 23.699999999999999, 123.0, 2, "[{ItemName = 'expItem1', Barcode = '1234562', Dose = 123}, {ItemName = 'expItem2', Barcode = '3856343', Dose = 123}, {ItemName = 'expItem2', Barcode = '2137420', Dose = 123}]", 123.0, 24.0, 87.0, "expSnack2", 1.5, 11.0 },
                    { 3, 54.899999999999999, 1.23, 12.300000000000001, 2.0, 1, "[{ItemName = 'expItem1', Barcode = '1234562', Dose = 123}, {ItemName = 'expItem2', Barcode = '3856343', Dose = 123}, {ItemName = 'expItem2', Barcode = '2137420', Dose = 123}]", 7.0, 3.2000000000000002, 0.040000000000000001, "expSNack3", 13.300000000000001, 0.40000000000000002 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserSnacks_Id_u",
                table: "UserSnacks",
                column: "Id_u");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "UserSnacks");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}

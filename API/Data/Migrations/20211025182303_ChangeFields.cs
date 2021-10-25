using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class ChangeFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Patients");

            migrationBuilder.RenameColumn(
                name: "JSONDescription",
                table: "DocumentationTypes",
                newName: "JsonDescription");

            migrationBuilder.AddColumn<int>(
                name: "Sex",
                table: "Patients",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sex",
                table: "Patients");

            migrationBuilder.RenameColumn(
                name: "JsonDescription",
                table: "DocumentationTypes",
                newName: "JSONDescription");

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Patients",
                type: "TEXT",
                nullable: true);
        }
    }
}

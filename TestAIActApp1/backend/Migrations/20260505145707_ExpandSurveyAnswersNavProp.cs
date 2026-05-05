using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ExpandSurveyAnswersNavProp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SurveyResponseId",
                table: "SurveyAnswer",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SurveyAnswer_SurveyResponseId",
                table: "SurveyAnswer",
                column: "SurveyResponseId");

            migrationBuilder.AddForeignKey(
                name: "FK_SurveyAnswer_SurveyResponse_SurveyResponseId",
                table: "SurveyAnswer",
                column: "SurveyResponseId",
                principalTable: "SurveyResponse",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SurveyAnswer_SurveyResponse_SurveyResponseId",
                table: "SurveyAnswer");

            migrationBuilder.DropIndex(
                name: "IX_SurveyAnswer_SurveyResponseId",
                table: "SurveyAnswer");

            migrationBuilder.DropColumn(
                name: "SurveyResponseId",
                table: "SurveyAnswer");
        }
    }
}

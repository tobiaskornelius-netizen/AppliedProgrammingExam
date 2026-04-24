using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddDepartmentsAndSurveys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "department_id",
                table: "AITool",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Department",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    company_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Department", x => x.id);
                    table.ForeignKey(
                        name: "FK_Department_Company_company_id",
                        column: x => x.company_id,
                        principalTable: "Company",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SurveyToken",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    token = table.Column<string>(type: "text", nullable: false),
                    label = table.Column<string>(type: "text", nullable: false),
                    company_id = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    expires_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    is_active = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyToken", x => x.id);
                    table.ForeignKey(
                        name: "FK_SurveyToken_Company_company_id",
                        column: x => x.company_id,
                        principalTable: "Company",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SurveyResponse",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    survey_token_id = table.Column<int>(type: "integer", nullable: false),
                    department = table.Column<string>(type: "text", nullable: false),
                    submitted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyResponse", x => x.id);
                    table.ForeignKey(
                        name: "FK_SurveyResponse_SurveyToken_survey_token_id",
                        column: x => x.survey_token_id,
                        principalTable: "SurveyToken",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SurveyAnswer",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    response_id = table.Column<int>(type: "integer", nullable: false),
                    question_key = table.Column<string>(type: "text", nullable: false),
                    answer_value = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyAnswer", x => x.id);
                    table.ForeignKey(
                        name: "FK_SurveyAnswer_SurveyResponse_response_id",
                        column: x => x.response_id,
                        principalTable: "SurveyResponse",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RiskAssessment_tool_id",
                table: "RiskAssessment",
                column: "tool_id");

            migrationBuilder.CreateIndex(
                name: "IX_AITool_department_id",
                table: "AITool",
                column: "department_id");

            migrationBuilder.CreateIndex(
                name: "IX_Department_company_id",
                table: "Department",
                column: "company_id");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyAnswer_response_id",
                table: "SurveyAnswer",
                column: "response_id");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyResponse_survey_token_id",
                table: "SurveyResponse",
                column: "survey_token_id");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyToken_company_id",
                table: "SurveyToken",
                column: "company_id");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyToken_token",
                table: "SurveyToken",
                column: "token",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AITool_Department_department_id",
                table: "AITool",
                column: "department_id",
                principalTable: "Department",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_RiskAssessment_AITool_tool_id",
                table: "RiskAssessment",
                column: "tool_id",
                principalTable: "AITool",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AITool_Department_department_id",
                table: "AITool");

            migrationBuilder.DropForeignKey(
                name: "FK_RiskAssessment_AITool_tool_id",
                table: "RiskAssessment");

            migrationBuilder.DropTable(
                name: "Department");

            migrationBuilder.DropTable(
                name: "SurveyAnswer");

            migrationBuilder.DropTable(
                name: "SurveyResponse");

            migrationBuilder.DropTable(
                name: "SurveyToken");

            migrationBuilder.DropIndex(
                name: "IX_RiskAssessment_tool_id",
                table: "RiskAssessment");

            migrationBuilder.DropIndex(
                name: "IX_AITool_department_id",
                table: "AITool");

            migrationBuilder.DropColumn(
                name: "department_id",
                table: "AITool");
        }
    }
}

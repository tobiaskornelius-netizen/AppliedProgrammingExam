using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddComplianceGovernanceFeatures : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add new columns to existing AITool table
            migrationBuilder.AddColumn<string>(
                name: "transparency_status",
                table: "AITool",
                type: "text",
                nullable: false,
                defaultValue: "Not Required");

            migrationBuilder.AddColumn<string>(
                name: "oversight_owner",
                table: "AITool",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "last_audit_date",
                table: "AITool",
                type: "timestamp with time zone",
                nullable: true);

            // Create the new RiskAssessment table
            migrationBuilder.CreateTable(
                name: "RiskAssessment",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tool_id = table.Column<int>(type: "integer", nullable: false),
                    q1_critical_sector = table.Column<bool>(type: "boolean", nullable: false),
                    q2_human_interaction = table.Column<bool>(type: "boolean", nullable: false),
                    q3_automated_decisions = table.Column<bool>(type: "boolean", nullable: false),
                    assessment_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiskAssessment", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "RiskAssessment");

            migrationBuilder.DropColumn(name: "transparency_status", table: "AITool");
            migrationBuilder.DropColumn(name: "oversight_owner", table: "AITool");
            migrationBuilder.DropColumn(name: "last_audit_date", table: "AITool");
        }
    }
}

using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("AITool")]
public class AITool
{
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [Column("vendor")]
    public string Vendor { get; set; } = string.Empty;

    [Column("type")]
    public string Type { get; set; } = string.Empty;

    [Column("risk_level")]
    public string RiskLevel { get; set; } = string.Empty;

    [Column("personal_data")]
    public bool PersonalData { get; set; }

    [Column("company_id")]
    public int CompanyId { get; set; }

    [Column("transparency_status")]
    public string TransparencyStatus { get; set; } = "Not Required";

    [Column("oversight_owner")]
    public string? OversightOwner { get; set; }

    [Column("last_audit_date")]
    public DateTime? LastAuditDate { get; set; }

    [Column("department_id")]
    public int? DepartmentId { get; set; }
}

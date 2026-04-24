using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("ComplianceReport")]
public class ComplianceReport
{
    [Column("id")]
    public int Id { get; set; }

    [Column("company_id")]
    public int CompanyId { get; set; }

    [Column("risk_score")]
    public int RiskScore { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

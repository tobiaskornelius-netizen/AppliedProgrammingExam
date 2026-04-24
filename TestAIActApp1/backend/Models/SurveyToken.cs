using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("SurveyToken")]
public class SurveyToken
{
    [Column("id")]
    public int Id { get; set; }

    [Column("token")]
    public string Token { get; set; } = string.Empty;

    [Column("label")]
    public string Label { get; set; } = string.Empty;

    [Column("company_id")]
    public int CompanyId { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("expires_at")]
    public DateTime? ExpiresAt { get; set; }

    [Column("is_active")]
    public bool IsActive { get; set; } = true;
}

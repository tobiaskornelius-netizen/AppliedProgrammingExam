using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("SurveyResponse")]
public class SurveyResponse
{
    [Column("id")]
    public int Id { get; set; }

    [Column("survey_token_id")]
    public int SurveyTokenId { get; set; }

    [Column("department")]
    public string Department { get; set; } = string.Empty;

    [Column("submitted_at")]
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
}

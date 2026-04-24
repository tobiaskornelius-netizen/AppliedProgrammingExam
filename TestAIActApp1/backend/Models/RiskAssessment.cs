using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("RiskAssessment")]
public class RiskAssessment
{
    [Column("id")]
    public int Id { get; set; }

    [Column("tool_id")]
    public int ToolId { get; set; }

    [Column("q1_critical_sector")]
    public bool Q1_CriticalSector { get; set; }

    [Column("q2_human_interaction")]
    public bool Q2_HumanInteraction { get; set; }

    [Column("q3_automated_decisions")]
    public bool Q3_AutomatedDecisions { get; set; }

    [Column("assessment_date")]
    public DateTime AssessmentDate { get; set; } = DateTime.UtcNow;
}

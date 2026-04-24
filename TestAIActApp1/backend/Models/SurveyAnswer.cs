using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("SurveyAnswer")]
public class SurveyAnswer
{
    [Column("id")]
    public int Id { get; set; }

    [Column("response_id")]
    public int ResponseId { get; set; }

    [Column("question_key")]
    public string QuestionKey { get; set; } = string.Empty;

    [Column("answer_value")]
    public string AnswerValue { get; set; } = string.Empty;
}

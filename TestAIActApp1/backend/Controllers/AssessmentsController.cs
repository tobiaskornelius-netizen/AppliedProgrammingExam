using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

public class AssessmentRequest
{
    public int ToolId { get; set; }
    public bool Q1 { get; set; }
    public bool Q2 { get; set; }
    public bool Q3 { get; set; }
}

[ApiController]
[Route("api/assessments")]
public class AssessmentsController : ControllerBase
{
    private readonly AppDbContext _db;

    public AssessmentsController(AppDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AssessmentRequest req)
    {
        var tool = await _db.AITools.FindAsync(req.ToolId);
        if (tool is null) return NotFound();

        string calculatedRisk;
        if (req.Q1 && req.Q3)
            calculatedRisk = "Unacceptable";
        else if (req.Q1 && !req.Q3)
            calculatedRisk = "High";
        else if (req.Q2 && !req.Q1)
            calculatedRisk = "Limited";
        else
            calculatedRisk = "Low";

        tool.RiskLevel = calculatedRisk;
        tool.TransparencyStatus = calculatedRisk is "Limited" or "High" or "Unacceptable"
            ? "Pending"
            : "Not Required";

        var assessment = new RiskAssessment
        {
            ToolId = req.ToolId,
            Q1_CriticalSector = req.Q1,
            Q2_HumanInteraction = req.Q2,
            Q3_AutomatedDecisions = req.Q3,
            AssessmentDate = DateTime.UtcNow
        };

        _db.RiskAssessments.Add(assessment);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Create), new { id = assessment.Id }, assessment);
    }
}

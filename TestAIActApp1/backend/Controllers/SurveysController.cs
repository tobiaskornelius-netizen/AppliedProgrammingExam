using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/surveys")]
public class SurveysController : ControllerBase
{
    private readonly AppDbContext _db;

    public SurveysController(AppDbContext db)
    {
        _db = db;
    }

    // Admin: create a new invite token
    [HttpPost("tokens")]
    public async Task<IActionResult> CreateToken([FromBody] CreateTokenRequest req)
    {
        var token = new SurveyToken
        {
            Token = Guid.NewGuid().ToString(),
            Label = req.Label,
            CompanyId = 1,
            CreatedAt = DateTime.UtcNow,
            ExpiresAt = req.ExpiresAt,
            IsActive = true
        };
        _db.SurveyTokens.Add(token);
        await _db.SaveChangesAsync();
        return Ok(token);
    }

    // Admin: list all tokens with response counts
    [HttpGet("tokens")]
    public async Task<IActionResult> GetTokens()
    {
        var tokens = await _db.SurveyTokens
            .Where(t => t.CompanyId == 1)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();

        var tokenIds = tokens.Select(t => t.Id).ToList();
        var responseCounts = await _db.SurveyResponses
            .Where(r => tokenIds.Contains(r.SurveyTokenId))
            .GroupBy(r => r.SurveyTokenId)
            .Select(g => new { TokenId = g.Key, Count = g.Count() })
            .ToListAsync();

        var countMap = responseCounts.ToDictionary(x => x.TokenId, x => x.Count);

        var result = tokens.Select(t => new
        {
            t.Id,
            t.Token,
            t.Label,
            t.CreatedAt,
            t.ExpiresAt,
            t.IsActive,
            ResponseCount = countMap.GetValueOrDefault(t.Id, 0)
        });

        return Ok(result);
    }

    // Admin: deactivate a token
    [HttpDelete("tokens/{id}")]
    public async Task<IActionResult> DeactivateToken(int id)
    {
        var token = await _db.SurveyTokens.FindAsync(id);
        if (token == null) return NotFound();
        token.IsActive = false;
        await _db.SaveChangesAsync();
        return Ok(token);
    }

    // Public: validate token before showing questionnaire
    [HttpGet("validate/{token}")]
    public async Task<IActionResult> ValidateToken(string token)
    {
        var t = await _db.SurveyTokens
            .FirstOrDefaultAsync(x => x.Token == token && x.IsActive);

        if (t == null)
            return Ok(new { valid = false, reason = "Token not found or inactive." });

        if (t.ExpiresAt.HasValue && t.ExpiresAt.Value < DateTime.UtcNow)
            return Ok(new { valid = false, reason = "This survey link has expired." });

        return Ok(new { valid = true });
    }

    // Public: anonymous submission
    [HttpPost("submit/{token}")]
    public async Task<IActionResult> Submit(string token, [FromBody] SurveySubmitRequest req)
    {
        var surveyToken = await _db.SurveyTokens
            .FirstOrDefaultAsync(x => x.Token == token && x.IsActive);

        if (surveyToken == null)
            return BadRequest(new { error = "Invalid or inactive survey link." });

        if (surveyToken.ExpiresAt.HasValue && surveyToken.ExpiresAt.Value < DateTime.UtcNow)
            return BadRequest(new { error = "This survey link has expired." });

        var response = new SurveyResponse
        {
            SurveyTokenId = surveyToken.Id,
            Department = req.Department,
            SubmittedAt = DateTime.UtcNow
        };
        _db.SurveyResponses.Add(response);
        await _db.SaveChangesAsync();

        foreach (var answer in req.Answers)
        {
            _db.SurveyAnswers.Add(new SurveyAnswer
            {
                ResponseId = response.Id,
                QuestionKey = answer.Key,
                AnswerValue = answer.Value
            });
        }
        await _db.SaveChangesAsync();

        return Ok(new { success = true });
    }

    // Admin: aggregated results for dashboard
    [HttpGet("results")]
    public async Task<IActionResult> GetResults()
    {
        var totalResponses = await _db.SurveyResponses
            .Join(_db.SurveyTokens, r => r.SurveyTokenId, t => t.Id, (r, t) => new { r, t })
            .Where(x => x.t.CompanyId == 1)
            .CountAsync();

        var byDepartment = await _db.SurveyResponses
            .Join(_db.SurveyTokens, r => r.SurveyTokenId, t => t.Id, (r, t) => new { r, t })
            .Where(x => x.t.CompanyId == 1)
            .GroupBy(x => x.r.Department)
            .Select(g => new { Department = g.Key, Count = g.Count() })
            .OrderByDescending(x => x.Count)
            .ToListAsync();

        // Per-question answer distributions
        var answerDistributions = await _db.SurveyAnswers
            .Join(_db.SurveyResponses, a => a.ResponseId, r => r.Id, (a, r) => new { a, r })
            .Join(_db.SurveyTokens, x => x.r.SurveyTokenId, t => t.Id, (x, t) => new { x.a, t })
            .Where(x => x.t.CompanyId == 1)
            .GroupBy(x => new { x.a.QuestionKey, x.a.AnswerValue })
            .Select(g => new { g.Key.QuestionKey, g.Key.AnswerValue, Count = g.Count() })
            .ToListAsync();

        var questionMap = answerDistributions
            .GroupBy(x => x.QuestionKey)
            .ToDictionary(
                g => g.Key,
                g => g.ToDictionary(x => x.AnswerValue, x => x.Count)
            );

        return Ok(new
        {
            totalResponses,
            byDepartment,
            answerDistributions = questionMap
        });
    }
}

public class CreateTokenRequest
{
    public string Label { get; set; } = string.Empty;
    public DateTime? ExpiresAt { get; set; }
}

public class SurveySubmitRequest
{
    public string Department { get; set; } = string.Empty;
    public Dictionary<string, string> Answers { get; set; } = new();
}

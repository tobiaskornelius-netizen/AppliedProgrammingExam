using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Company> Companies => Set<Company>();
    public DbSet<AITool> AITools => Set<AITool>();
    public DbSet<DataFlow> DataFlows => Set<DataFlow>();
    public DbSet<ComplianceReport> ComplianceReports => Set<ComplianceReport>();
    public DbSet<RiskAssessment> RiskAssessments => Set<RiskAssessment>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<SurveyToken> SurveyTokens => Set<SurveyToken>();
    public DbSet<SurveyResponse> SurveyResponses => Set<SurveyResponse>();
    public DbSet<SurveyAnswer> SurveyAnswers => Set<SurveyAnswer>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Fix missing FK on RiskAssessment
        modelBuilder.Entity<RiskAssessment>()
            .HasOne<AITool>()
            .WithMany()
            .HasForeignKey(r => r.ToolId)
            .OnDelete(DeleteBehavior.Cascade);

        // Department → Company
        modelBuilder.Entity<Department>()
            .HasOne<Company>()
            .WithMany()
            .HasForeignKey(d => d.CompanyId)
            .OnDelete(DeleteBehavior.Cascade);

        // AITool → Department (nullable)
        modelBuilder.Entity<AITool>()
            .HasOne<Department>()
            .WithMany()
            .HasForeignKey(t => t.DepartmentId)
            .OnDelete(DeleteBehavior.SetNull);

        // SurveyToken → Company
        modelBuilder.Entity<SurveyToken>()
            .HasIndex(t => t.Token)
            .IsUnique();
        modelBuilder.Entity<SurveyToken>()
            .HasOne<Company>()
            .WithMany()
            .HasForeignKey(t => t.CompanyId)
            .OnDelete(DeleteBehavior.Cascade);

        // SurveyResponse → SurveyToken
        modelBuilder.Entity<SurveyResponse>()
            .HasOne<SurveyToken>()
            .WithMany()
            .HasForeignKey(r => r.SurveyTokenId)
            .OnDelete(DeleteBehavior.Cascade);

        // SurveyAnswer → SurveyResponse
        modelBuilder.Entity<SurveyAnswer>()
            .HasOne<SurveyResponse>()
            .WithMany()
            .HasForeignKey(a => a.ResponseId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

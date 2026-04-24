import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { ToolList } from './components/tool-list/tool-list';
import { AddEditTool } from './components/add-edit-tool/add-edit-tool';
import { ReportView } from './components/report-view/report-view';
import { DepartmentList } from './components/department-list/department-list';
import { SurveyManagement } from './components/survey-management/survey-management';
import { QuestionnaireForm } from './components/questionnaire-form/questionnaire-form';
import { SubmissionConfirmation } from './components/submission-confirmation/submission-confirmation';
import { UserHome } from './components/user-home/user-home';

export const routes: Routes = [
  // Admin routes (guarded)
  { path: '', component: AdminDashboard, canActivate: [adminGuard] },
  { path: 'tools', component: ToolList, canActivate: [adminGuard] },
  { path: 'tools/add', component: AddEditTool, canActivate: [adminGuard] },
  { path: 'tools/:toolId/edit', component: AddEditTool, canActivate: [adminGuard] },
  { path: 'report', component: ReportView, canActivate: [adminGuard] },
  { path: 'departments', component: DepartmentList, canActivate: [adminGuard] },
  { path: 'surveys', component: SurveyManagement, canActivate: [adminGuard] },

  // User / public routes
  { path: 'user-home', component: UserHome },
  { path: 'survey/:token', component: QuestionnaireForm },
  { path: 'survey/:token/thankyou', component: SubmissionConfirmation },
];

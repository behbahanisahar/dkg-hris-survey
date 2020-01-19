import MainAggregateDashboard from "./features/dashboard/aggregate-dashboard/main-aggregate-dashboard";
import Dashboard from "./features/dashboard/dashboard";
import CompetencyCategoryComponent from "./features/dashboard/indivisual-dashboard/competency-summary-category-detail/competency-category-detail";
import IndividualDashboard from "./features/dashboard/indivisual-dashboard/individual-dashboard/individual-dashboard";
import MainNomination from "./features/nominationForm/components/main-nomination/main-nomination";
import NominationIntroPage from "./features/nominationForm/components/nomination-Intro/nomination-intro";
import FormSurvey from "./features/survey-form/components/main-form/survey-form";
import SurveyIntroPage from "./features/survey-form/components/survey-intro/survey-intro";

export interface RouteTypes {
  exact: boolean;
  path: string;
  component: any;
}
const routes: RouteTypes[] = [
  {
    exact: true,
    path: "/",
    component: Dashboard,
  },
  {
    exact: true,
    path: "/surveyintro",
    component: SurveyIntroPage,
  },
  {
    exact: false,
    path: "/nominationintro",
    component: NominationIntroPage,
  },
  {
    exact: false,
    path: "/nominationform/:itemId",
    component: MainNomination,
  },
  // {
  //   exact: false,
  //   path: "/report",
  //   component: ResponsiveBulletClass,
  // },
  {
    exact: false,
    path: "/competency/:itemId/:categoryId/:lang",
    component: CompetencyCategoryComponent,
  },
  {
    exact: true,
    path: "/dashboard",
    component: Dashboard,
  },
  {
    exact: true,
    path: "/dashboard/:itemId",
    component: IndividualDashboard,
  },
  {
    exact: true,
    path: "/dashboard/viewas/:username",
    component: Dashboard,
  },
  {
    exact: true,
    path: "/surveyform/:itemId",
    component: FormSurvey,
  },
  {
    exact: false,
    path: "/surveyform/:itemId/:userId",
    component: FormSurvey,
  },

  {
    exact: false,
    path: "/surveyintro/:username",
    component: SurveyIntroPage,
  },
  {
    exact: false,
    path: "/nominationintro/:itemId",
    component: NominationIntroPage,
  },
  {
    exact: false,
    path: "/DKDashboard/:username",
    component: MainAggregateDashboard,
  },
  // {
  //   exact: false,
  //   path: "/DKDashboard/:anonymous",
  //   component: MainAggregateDashboard,
  // },
  {
    exact: true,
    path: "/DKDashboard",
    component: MainAggregateDashboard,
  },
];

export default routes;

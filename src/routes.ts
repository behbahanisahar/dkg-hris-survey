import CompetencyCategoryComponent from "./features/dashboard/competency-summary-category-detail/competency-category-detail";
import MainNomination from "./features/nominationForm/components/main-nomination/main-nomination";
import NominationIntroPage from "./features/nominationForm/components/nomination-Intro/nomination-intro";
import MainDashboard from "./features/dashboard/main-dashboard/main-dashboard";
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
    component: NominationIntroPage,
  },
  {
    exact: false,
    path: "/nominationform",
    component: MainNomination,
  },
  // {
  //   exact: false,
  //   path: "/report",
  //   component: ResponsiveBulletClass,
  // },
  {
    exact: false,
    path: "/competency/:itemId/:categoryId",
    component: CompetencyCategoryComponent,
  },
  {
    exact: false,
    path: "/dashboard/:itemId",
    component: MainDashboard,
  },
  {
    exact: false,
    path: "/surveyform",
    component: FormSurvey,
  },
  {
    exact: false,
    path: "/surveyintro",
    component: SurveyIntroPage,
  },
  {
    exact: false,
    path: "/nominationintro",
    component: NominationIntroPage,
  },
];

export default routes;

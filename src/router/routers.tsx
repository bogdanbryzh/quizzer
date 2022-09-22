import { RouteObject } from "react-router-dom";
import AnswersPage from "../pages/AnswersPage";
import HomePage from "../pages/HomePage";
import QuestionsPage from "../pages/QuestionsPage";
import TeamsPage from "../pages/TeamsPage";

export const routers: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "teams",
        element: <TeamsPage />,
      },
      {
        path: "questions",
        element: <QuestionsPage />,
      },
      {
        path: "answers",
        element: <AnswersPage />,
      },
    ],
  },
];

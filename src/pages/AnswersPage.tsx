import { useEffect, useMemo, useState } from "react";
import Table from "../components/Table";
import { AnswerWithTeamAndQuestion, getAnswers } from "../models/answers.model";

function AnswersPage() {
  const [answers, setAnswers] = useState<AnswerWithTeamAndQuestion[]>([]);

  useEffect(() => {
    getAnswers().then(({ data }) => setAnswers(data ?? []));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Відповідь",
        accessor: "text",
      },
      {
        Header: "Команда",
        accessor: "team",
      },
      {
        Header: "Питання",
        accessor: "question",
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      answers.map(({ questions, teams, text }) => ({
        text,
        team: teams.name,
        question: questions.text,
      })),
    [answers]
  );

  return (
    <div>
      <Table columns={columns} data={data} />
      {data.length === 0 && (
        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Нема відповідей ще</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnswersPage;

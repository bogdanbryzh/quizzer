import { useEffect, useMemo, useState } from "react";
import Table from "../components/Table";
import { AnswerWithTeamAndQuestion, getAnswers } from "../models/answers.model";

function AnswersPage() {
  const [answers, setAnswers] = useState<AnswerWithTeamAndQuestion[]>([]);

  const fetchAnswers = () => {
    getAnswers().then(({ data }) => setAnswers(data ?? []));
  };
  useEffect(() => {
    fetchAnswers();
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
      <button className="btn btn-primary w-full" onClick={fetchAnswers}>
        оновити
      </button>
      <Table columns={columns} data={data} />
      {data.length === 0 && (
        <div className="hero">
          <div className="hero-content text-center">
            <h1 className="text-5xl font-bold">Нема відповідей ще</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnswersPage;

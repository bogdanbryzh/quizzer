import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import Table from "../components/Table";
import TableActions from "../components/TableActions";
import {
  createQuestion,
  deleteQuestion,
  getQuestions,
} from "../models/questions.model";
import { Question } from "../types";

type QuestionFormData = {
  text: string;
};

function QuestionsPage() {
  const [quesions, setQuestions] = useState<Question[]>([]);

  const fetchQuestions = () =>
    getQuestions().then(({ data }) => setQuestions(data ?? []));

  const deleteQuestionHandler = (id: string) => {
    deleteQuestion(id).then(() => fetchQuestions());
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Запитання",
        accessor: "text",
      },
      {
        Header: "Дії",
        accessor: "actions",
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      quesions.map(({ id, text }) => ({
        id,
        text,
        actions: (
          <TableActions
            onDelete={() => {
              deleteQuestionHandler(id);
            }}
          />
        ),
      })),
    [quesions]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuestionFormData>({ defaultValues: { text: "" } });

  const submitHandler = handleSubmit((data: QuestionFormData) => {
    createQuestion(data)
      .then(() => reset())
      .then(() => fetchQuestions());
  });

  return (
    <div>
      <form className="form-control mb-4" onSubmit={submitHandler}>
        <div className="input-group -sm:input-group-vertical">
          <input
            type="text"
            className={`${"input input-bordered w-full"} ${
              errors.text && "input-error"
            }`}
            {...register("text", { required: true })}
          />
          <button className="btn" type="submit">
            Створити
          </button>
        </div>
      </form>
      <Table columns={columns} data={data} />
      {data.length === 0 && (
        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Нема питань ще</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionsPage;

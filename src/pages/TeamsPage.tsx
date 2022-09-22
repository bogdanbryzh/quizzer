import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { createTeam, deleteTeam, getTeams } from "../models/team.model";
import { Team } from "../types";
import Table from "../components/Table";
import { generatePin } from "../utils/generatePin";
import TableActions from "../components/TableActions";

type TeamsFormData = {
  name: string;
  pin: string;
};

function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);

  const fetchTeams = () => getTeams().then(({ data }) => setTeams(data ?? []));

  const deleteTeamHandler = (id: string) => {
    deleteTeam(id).then(() => fetchTeams());
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Назва",
        accessor: "name",
      },
      {
        Header: "Пін",
        accessor: "pin",
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
      teams.map(({ id, name, pin }) => ({
        name,
        pin,
        actions: (
          <TableActions
            onDelete={() => {
              deleteTeamHandler(id);
            }}
          />
        ),
      })),
    [teams]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TeamsFormData>({
    defaultValues: {
      name: "",
      pin: generatePin(),
    },
  });

  const submitHandler = handleSubmit((data: TeamsFormData) => {
    createTeam(data)
      .then(() =>
        reset({
          name: "",
          pin: generatePin(),
        })
      )
      .then(() => fetchTeams());
  });

  return (
    <div>
      <form className="form-control mb-4" onSubmit={submitHandler}>
        <div className="input-group -md:input-group-vertical">
          <input
            placeholder="Назва команди"
            className={`${"input input-bordered w-full"} ${
              errors.name && "input-error"
            }`}
            {...register("name", { required: true })}
          />

          <input
            className="input input-bordered"
            disabled
            {...register("pin", { required: true })}
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
              <h1 className="text-5xl font-bold">Нема команд ще</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamsPage;

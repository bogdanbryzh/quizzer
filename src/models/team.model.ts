import { supabase } from "../lib/supabase";
import { Team } from "../types";

export const getTeams = async () => {
  const { count, data, error } = await supabase
    .from<Team>("teams")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (error) console.error(error);

  return {
    data,
    count,
  };
};

export const getTeam = async (id: Team["id"]) => {
  const { data, error } = await supabase
    .from<Team>("teams")
    .select()
    .eq("id", id)
    .single();

  if (error) console.error(error);

  return {
    data,
  };
};

export type InsertTeamData = Omit<Team, "id" | "created_at">;

export const createTeam = async ({ name, pin }: InsertTeamData) => {
  const { data, error } = await supabase
    .from<Team>("teams")
    .insert([{ name, pin }])
    .single();

  if (error) console.error(error);

  return {
    data,
  };
};

export const updateTeam = async (
  id: Team["id"],
  { name, pin }: Partial<InsertTeamData>
) => {
  const { data, error } = await supabase
    .from<Team>("teams")
    .update({ name, pin })
    .match({ id })
    .single();

  if (error) console.error(error);

  return {
    data,
  };
};

export const deleteTeam = async (id: Team["id"]) => {
  const { data, error } = await supabase
    .from<Team>("teams")
    .delete()
    .match({ id })
    .single();

  if (error) console.error(error);

  return {
    data,
  };
};

export const verifyTeam = (team: Team, pin: Team["pin"]) =>
  pin && team.pin === pin;

import Home from "../page";

type GermanInvitationPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

export default async function GermanInvitationPage({ searchParams }: GermanInvitationPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};

  return <Home searchParams={{ ...resolvedSearchParams, aleman: "1" }} />;
}

import Home from "../../page";

type GermanInvitePageProps = {
  params: Promise<{ inviteCode: string }> | { inviteCode: string };
};

export default async function GermanInvitePage({ params }: GermanInvitePageProps) {
  const resolvedParams = await params;

  return <Home searchParams={{ codigo: resolvedParams.inviteCode, aleman: "1" }} />;
}

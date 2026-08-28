import Home from "../page";

type InvitePageProps = {
  params: Promise<{ inviteCode: string }> | { inviteCode: string };
};

export default async function InvitePage({ params }: InvitePageProps) {
  const resolvedParams = await params;

  return <Home searchParams={{ codigo: resolvedParams.inviteCode }} />;
}

import EpisodeCard from "@/components/Card";
import { pb } from "@/lib/pocketbase";
import { Episode } from "@/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: async () => {
    const episodes = (await pb
      .collection("episodes")
      .getFullList({ sort: "date" })) as unknown as Episode;
    const reccuring = (await pb
      .collection("reccuring")
      .getFullList()) as unknown as Episode;
    return { episodes, reccuring };
  },
  component: App,
});

function App() {
  const { episodes, reccuring } = Route.useLoaderData();

  return (
    <div className="flex flex-col  items-center">
      {reccuring &&
        reccuring.map((ep: Episode) => <EpisodeCard key={ep.id} ep={ep} />)}
      <div className="my-5 w-full flex flex-col  items-center">
        {episodes &&
          episodes.map((ep: Episode) => <EpisodeCard key={ep.id} ep={ep} />)}
      </div>
    </div>
  );
}

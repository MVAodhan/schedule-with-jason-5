import { pb } from "@/lib/pocketbase";
import { Episode } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Edit from "@/components/Edit";
import Streamyard from "@/components/Streamyard";
import Website from "@/components/Website";
import Caldendar from "@/components/Calendar";
import Buffer from "@/components/Buffer";
import Discord from "@/components/Discord";
import LinksAndChapters from "@/components/LinksAndChapters";
import CopyText from "@/components/CopyText";
// import { Button } from "@/components/ui/button";
// import { saveEpisode } from "@/lib/utils";

// const getEpisode = createServerFn({ method: "POST" }).handler(
//   async ({ data }) => {
//     let episode;
//     if (data === "building-web-demos") {
//       episode = (await pb
//         .collection("reccuring")
//         .getFirstListItem(`slug="${data}"`)) as unknown as Episode;
//     } else {
//       episode = (await pb
//         .collection("episodes")
//         .getFirstListItem(`slug="${data}"`)) as unknown as Episode;
//     }

//     return episode;
//   }
// );
export const Route = createFileRoute("/episode/$episodeId")({
  loader: async ({ params: { episodeId } }) => {
    let episode;
    if (episodeId === "building-web-demos") {
      episode = (await pb
        .collection("reccuring")
        .getFirstListItem(`slug="${episodeId}"`)) as unknown as Episode;
    } else {
      episode = (await pb
        .collection("episodes")
        .getFirstListItem(`slug="${episodeId}"`)) as unknown as Episode;
    }

    return episode;
  },
  component: RouteComponent,
  notFoundComponent: () => <div>Episode Not found</div>,
});

function RouteComponent() {
  const episode = Route.useLoaderData();

  return (
    <div className="my-5 w-full flex flex-col  items-center">
      {/* <Button onClick={() => saveEpisode(episode)}>Save</Button> */}
      <Tabs defaultValue="edit">
        <TabsList>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="streamyard">Streamyard</TabsTrigger>
          <TabsTrigger value="website">Website</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="buffer">Buffer</TabsTrigger>
          <TabsTrigger value="discord">Discord</TabsTrigger>
          <TabsTrigger value="links">Links & Chapters</TabsTrigger>
          <TabsTrigger value="copy-btns">Copy Text</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <Edit episode={episode} />
        </TabsContent>
        <TabsContent value="streamyard">
          <Streamyard episode={episode} />
        </TabsContent>
        <TabsContent value="website">
          <Website episode={episode} />
        </TabsContent>
        <TabsContent value="calendar">
          <Caldendar episode={episode} />
        </TabsContent>
        <TabsContent value="buffer">
          <Buffer episode={episode} />
        </TabsContent>
        <TabsContent value="discord">
          <Discord episode={episode} />
        </TabsContent>
        <TabsContent value="links">
          <LinksAndChapters episode={episode} />
        </TabsContent>
        <TabsContent value="copy-btns">
          <CopyText episode={episode} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

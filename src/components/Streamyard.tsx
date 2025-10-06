import { Card, CardContent, CardHeader } from "./ui/card";
import { Episode } from "@/types";
import { Textarea } from "./ui/textarea";
import { returnNZSTString, returnPSTString, updateEpisode } from "@/lib/utils";

import { Button } from "./ui/button";

import { Clipboard } from "lucide-react";
import { Input } from "./ui/input";
import { useRef } from "react";

const Streamyard = ({ episode }: { episode: Episode }) => {
  const ytLinkRef = useRef<HTMLInputElement | null>(null);
  const updateYoutubeLink = async () => {
    if (ytLinkRef.current?.value !== null) {
      updateEpisode(episode, {
        youtube_link: ytLinkRef.current!.value,
      });
    }
  };
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>{episode.title}</CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Textarea defaultValue={episode.description} />
            <Clipboard
              onClick={() => {
                navigator.clipboard.writeText(episode.description);
              }}
            />
          </div>
          <div className="flex w-full gap-2  py-5 justify-around">
            <div>
              <div className="font-semibold italic text-md">NZ Date</div>
              <div>{returnNZSTString(episode.date)}</div>
            </div>
            <div>
              <div className="font-semibold italic text-md">US Date</div>
              <div>{returnPSTString(episode.date)}</div>
            </div>
          </div>
          <div className="w-full">
            <div>Youtube Link</div>
            <Input defaultValue={episode.youtube_link} ref={ytLinkRef} />
          </div>
          <Button
            className="w-full"
            onClick={() => {
              updateYoutubeLink();
            }}
          >
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Streamyard;

import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Episode } from "@/types";
import { Textarea } from "./ui/textarea";
import { returnNZSTString, returnPSTString, updateEpisode } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

import { Input } from "./ui/input";
import { Clipboard } from "lucide-react";

const Website = ({ episode }: { episode: Episode }) => {
  const [websiteScheduled, setWebsiteScheduled] = useState<boolean>(
    episode.website ? episode.website : false
  );

  const updateWebsiteStatus = async () => {
    updateEpisode(episode, { website: websiteScheduled });
  };

  const returnID = () => {
    const segs = episode.youtube_link.split("=");
    return segs[1];
  };
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>{episode.title}</CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="row-span-2 flex flex-col gap-2">
            <div>
              <div className=" text-md"> Name</div>
              <div>{episode.guest_name}</div>
            </div>
            {episode.guest_twitter && (
              <div>
                <div className=" text-md">Twitter</div>
                <div>{episode.guest_twitter}</div>
              </div>
            )}
          </div>

          <div className="col-span-2">
            <div className=" text-md">Description</div>
            <Textarea defaultValue={episode.description} />
          </div>
          <div>
            <div className="f text-md">NZ Date</div>
            <div>{returnNZSTString(episode.date)}</div>
          </div>
          <div>
            <div className=" text-md">US Date</div>
            <div>{returnPSTString(episode.date)}</div>
          </div>
        </div>
        <div className="w-full py-2">
          <div>Youtube ID</div>
          <div className="flex gap-2">
            <Input defaultValue={returnID()} />
            <Button
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(returnID());
              }}
            >
              <Clipboard />
            </Button>
          </div>
        </div>
        <div className="mt-2 flex flex-col">
          <div>
            <div>Entered in Sanity</div>
            <Checkbox
              defaultChecked={websiteScheduled}
              onCheckedChange={() => setWebsiteScheduled((prev) => !prev)}
            />
          </div>
          <Button
            onClick={() => {
              updateWebsiteStatus();
            }}
          >
            Update website status
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Website;

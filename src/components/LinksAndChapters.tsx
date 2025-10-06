import { useRef, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Episode, ListLink } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Save } from "lucide-react";
import LinkList from "./LinkList";
import { nanoid } from "nanoid";
import { updateEpisode } from "@/lib/utils";

const LinksAndChapters = ({ episode }: { episode: Episode }) => {
  const chaptersRef = useRef<HTMLTextAreaElement | null>(null);
  const labelRef = useRef<HTMLInputElement | null>(null);
  const valueRef = useRef<HTMLInputElement | null>(null);

  const [links, setLinks] = useState<ListLink[]>(
    episode.links ? episode.links : []
  );

  const addLink = () => {
    setLinks([
      ...links,
      {
        id: nanoid(),
        label: labelRef.current?.value!,
        value: valueRef.current?.value!,
      },
    ]);
    labelRef.current!.value = "";
    valueRef.current!.value = "";
  };

  const updateLinks = () => {
    updateEpisode(episode, { links });
  };

  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          {episode.title}
          <Label>Chapters</Label>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Textarea ref={chaptersRef} defaultValue={episode.chapters} />
          <Button>Save Chapters</Button>
        </CardContent>
      </Card>
      <div className="w-full grid grid-cols-2">
        <LinkList links={links} setLinks={setLinks} />
        <Card>
          <CardContent>
            <div className="flex flex-col gap-2 pt-2">
              <Input placeholder="label" ref={labelRef} />
              <Input placeholder="value" ref={valueRef} />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col gap-2 w-full">
              <Button className="w-full" variant="outline" onClick={addLink}>
                <Plus className="h-4 w-4 mr-2" />
                Add Link
              </Button>
              <Button onClick={updateLinks}>
                <Save className="h-4 w-4 mr-2" />
                Save Links
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LinksAndChapters;

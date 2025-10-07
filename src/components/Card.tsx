import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Episode } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  resetEpisode,
  resetUnique,
  returnNZSTString,
  returnPSTString,
} from "@/lib/utils";

export default function EpisodeCard({ ep }: { ep: Episode }) {
  return (
    <div className="w-3/5">
      <Card>
        <CardHeader>
          <div className="w-full flex justify-end gap-5 mb-5">
            <Link to="/episode/$episodeId" params={{ episodeId: ep.slug }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762V10.4q0 .275-.162.475t-.413.3q-.4.15-.763.388T18 12.1l-5.4 5.4q-.275.275-.437.638T12 18.9V21q0 .425-.288.713T11 22zm8-1v-1.65q0-.2.075-.387t.225-.338l5.225-5.2q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.2 5.2q-.15.15-.337.225T16.65 22H15q-.425 0-.712-.287T14 21m6.575-4.6l.925-.975l-.925-.925l-.95.95zM14 9h4l-5-5l5 5l-5-5v4q0 .425.288.713T14 9"
                />
              </svg>
            </Link>
            <Dialog>
              <DialogTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <div className="flex flex-col gap-2">
                      <span className="text-orange-500">Reset</span>
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    This will reset {ep.title}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <Button
                    type="button"
                    variant="secondary"
                    className="bg-orange-500 hover:bg-orange-200 text-black"
                    onClick={() => {
                      if (ep.type === "reccuring") {
                        resetEpisode(ep);
                      } else {
                        resetUnique(ep);
                      }
                    }}
                  >
                    Reset
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CardTitle>{ep.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            Guest Name: {ep.guest_name}
            <div className="flex flex-col gap-2">
              <span>US Date: {ep ? returnPSTString(ep!.date) : ""}</span>
              <span>NZ Date: {ep ? returnNZSTString(ep.date) : ""}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

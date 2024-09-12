import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(
    "https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/playlist",
    () => {
      return HttpResponse.json([
        {
          id: 1,
          title: "Painted in Blue",
          description: "Neo-Soul",
        },
        {
          id: 2,
          title: "Tidal Drift",
          description: "Ambient",
        },
      ]);
    }
  ),
];

export const server = setupServer(...handlers);

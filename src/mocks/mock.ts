import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(
    "https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/playlist",
    () => {
      return HttpResponse.json([
        {
          "id": 1,
          "title": "Painted in Blue",
          "artist": "Soul Canvas",
          "genre": "Neo-Soul",
          "duration": "5:55",
          "cover": "https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/images/albumn4.webp"
        },
        {
          "id": 2,
          "title": "Tidal Drift",
          "artist": "Echoes of the Sea",
          "genre": "Ambient",
          "duration": "8:02",
          "cover": "https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/images/albumn6.webp"
        },
      ]);
    }
  ),
];

export const server = setupServer(...handlers);

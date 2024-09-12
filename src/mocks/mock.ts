import { setUpServer } from 'msw/node';
import { http, HttpResponse } from 'msw';


export const handlers = [
  http.get(
    'https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/playlist', (req, res, ctx) => {
    return HttpResponse.json([
        {
          id: 1,
          title: "",
          description: ""
        },
      ])
  })
];

export const server = setUpServer(...handlers);

import { createFileRoute } from "@tanstack/react-router";
import { clientIpFromRequest, fetchGeoapifyIp } from "@/lib/geoapify-server";

export const Route = createFileRoute("/api/geolocation/ip")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const clientIp = clientIpFromRequest(request);
        const result = await fetchGeoapifyIp(clientIp);
        return Response.json(result, {
          headers: { "Cache-Control": "private, max-age=300" },
        });
      },
    },
  },
});

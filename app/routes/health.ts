/**
 * Health check.
 *
 * The platform probes this path to decide whether the app is actually serving,
 * and the template declares it as `runtime.healthPath`. It is a resource route
 * — no component, just a response — which is the whole argument for this shape:
 * one process answers both the pages and the API, so there is no second server
 * to start, proxy to, or keep alive.
 */
export function loader() {
  return Response.json(
    { status: 'ok', service: 'business-website', time: new Date().toISOString() },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

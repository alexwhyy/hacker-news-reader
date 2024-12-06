export function loader() {
  return new Response("Not Found", { status: 404 });
}

export default function NotFoundPage() {
  return (
    <div className="p-5">
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

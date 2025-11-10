export function PointageHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Pointage du Jour</h1>
      <p className="text-lg text-gray-600">
        {new Date().toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}

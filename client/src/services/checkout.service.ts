export async function checkoutService(values: {
  name: string;
  surname: string;
  lastname: string;
  date: Date;
  hour: string;
  service: string;
}) {
  const response = await fetch("http://localhost:3000/v1/api/payments", {
    method: "POST",
    body: JSON.stringify(values),
  });
  return await response.json();
}

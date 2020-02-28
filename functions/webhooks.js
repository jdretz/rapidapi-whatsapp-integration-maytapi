export async function handler(event, context) {
  const body = JSON.parse(event.body)
  console.log(body)
  return {
      statusCode: 200,
      body: 'webhook received',
  }
}
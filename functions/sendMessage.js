const axios = require('axios')

const headers = {
  "content-type":"application/json",
  "x-rapidapi-host":"maytapi-whatsapp.p.rapidapi.com",
  "x-rapidapi-key": process.env.RAPIDAPI_KEY || 'hardcode apikey for testing',
  "accept":"application/json"
}

export async function handler(event, context) {
  const body = JSON.parse(event.body)
  const { phone, name, countryCallingCode } = body
  console.log(phone, name, countryCallingCode)

  try {
    const response = await axios({
        "method":"POST",
        "url":"https://maytapi-whatsapp.p.rapidapi.com/PHONE_ID/sendMessage",
        "headers": headers,
        "data":{
            "to_number": `+${countryCallingCode}${phone}`,
            "type":"text",
            "message": `Thanks for signing up ${name}. Let us know if you have any questions!`
        }
    })

    console.log(response.data)

    return {
        statusCode: 200,
        body: 'message sent',
      }
  } catch (err) {
    console.log(err)
    return { statusCode: 500, body: err.toString() }
  }
}
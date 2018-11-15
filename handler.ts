import * as aws from "aws-sdk";

const ses = new aws.SES();
const myEmail = process.env.EMAIL;
const myDomain = process.env.DOMAIN;

function generateResponse(code: number, payload: any) {
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "x-requested-with",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(payload)
  };
}

function generateError(code: number, err: any) {
  console.log(err);
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": myDomain,
      "Access-Control-Allow-Headers": "x-requested-with",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(err.message)
  };
}

interface IEmailParams {
  email: string;
  name: string;
  content: string;
}

function generateEmailParams(body: string): aws.SES.SendEmailRequest {
  const { email, name, content } = JSON.parse(body) as IEmailParams;

  if (!(email && name && content)) {
    throw new Error(
      "Missing parameters! Make sure to add parameters 'email', 'name', 'content'."
    );
  }

  if (!myEmail) {
    throw new Error("Source email is not configured in environment variables.");
  }

  return {
    Source: myEmail,
    Destination: { ToAddresses: [myEmail] },
    ReplyToAddresses: [email],
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `Message sent from email ${email} by ${name} \nContent: ${content}`
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: `${myDomain} contact form`
      }
    }
  };
}

module.exports.send = async (event: any) => {
  try {
    const emailParams = generateEmailParams(event.body);
    const data = await ses.sendEmail(emailParams).promise();
    return generateResponse(200, data);
  } catch (err) {
    return generateError(500, err);
  }
};

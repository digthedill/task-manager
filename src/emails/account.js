const sgMail = require("@sendgrid/mail");

//privatitize the API key!

sgMail.setApiKey(process.env.SG_APIKEY);

const sendWelcomeEmail = (email, name) => {
  console.log("sent welcome email!");
  sgMail.send({
    to: email,
    from: "digthedill@gmail.com",
    subject: "Welcome to Task Manager",
    text: `Welcome to the app, ${name}. Let me know how you get along with organizing your tasks`,
  });
};

const goodbyeEmail = (email, name) => {
  console.log("Deleted user email sent");
  sgMail.send({
    to: email,
    from: "digthedill@gmail.com",
    subject: `${name}, you will be missed`,
    text: `Beep Beep. User12439.... oh I mean ${name}. We at THE TASK CONTENT MANAGER , will miss you deeply. I can't believe you deleted your account. `,
  });
};

module.exports = { sendWelcomeEmail, goodbyeEmail };

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENGRID_API_KEY);

const sendingVerifyCode = (email, token) => {
  const msg = {
    to: email,
    from: "ahmedsaad3117@gmail.com",
    subject: `Welcome to Bosta uptime monitoring - please verify your account`,
    text: `Verification code `,
    html: `<h1>Welcome to Bosta uptime monitoring</h1> 
       <br>
      or Click here to activet your acount
      <a href="http://localhost:${process.env.PORT}/users/confirm-email/?email=${email}&token=${token}">Click here</a>
      `,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error.response.body,"ERrrrrr");
    });
};

module.exports = {
  sendingVerifyCode,
};


//https://account.mapbox.com/confirm-email/?account=ahmedsaad3117&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFobWVkc2FhZDMxMTdAZ21haWwuY29tIiwiZXhwIjoxNjQ5ODc3MTkzfQ.iqx9JuHrSv5Lx4GUUbpNaLcYcu5IfQOQf3pf6c2TEzA&utm_campaign=New+signups+-+verify+account%27s+email+address&utm_content=Signup+Confirmation+Email&utm_medium=email_action&utm_source=customer.io
/**
 * HTML email template for new contact message notification
 */
const newMessageEmailTemplate = (name, email, message) => {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouveau message de contact</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f4f4f4;
          border-radius: 8px;
          padding: 30px;
        }
        .header {
          background-color: #edff20;
          color: #191919;
          padding: 20px;
          border-radius: 8px 8px 0 0;
          text-align: center;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 0 0 8px 8px;
        }
        .field {
          margin-bottom: 20px;
        }
        .label {
          font-weight: bold;
          color: #555;
        }
        .value {
          margin-top: 5px;
          padding: 10px;
          background-color: #f9f9f9;
          border-left: 3px solid #edff20;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          color: #888;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Nouveau message de contact</h1>
        </div>
        <div class="content">
          <p>Vous avez reçu un nouveau message depuis votre portfolio :</p>
          
          <div class="field">
            <div class="label">Nom :</div>
            <div class="value">${name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email :</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Message :</div>
            <div class="value">${message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          <p>Ce message a été envoyé depuis votre portfolio.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = newMessageEmailTemplate;

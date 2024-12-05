const OTP_Verf = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #fff;
    }
    .header {
      padding: 20px;
      text-align: center;
    }
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 20px;
    }
    .logo img {
      width: 40px;
      height: 40px;
    }
    .logo-text {
      color: #4263EB;
      font-size: 24px;
      font-weight: bold;
    }
    .banner {
      background-color: #4263EB;
      color: white;
      padding: 40px 20px;
      text-align: center;
    }
    .banner h1 {
      font-size: 24px;
      margin: 0;
      margin-bottom: 20px;
    }
    .banner h2 {
      font-size: 32px;
      margin: 0;
    }
    .content {
      padding: 20px;
    }
    .greeting {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .otp-container {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 30px 0;
    }
    .otp-digit {
      width: 50px;
      height: 50px;
      border: 2px solid #4263EB;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      color: #4263EB;
    }
    .info-text {
      color: #666;
      margin-bottom: 30px;
    }
    .verify-button {
      display: inline-block;
      background-color: #FF5722;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="banner">
      <h2>Verify Your E-Mail Address</h2>
    </div>
    <div class="content">
      <div class="greeting">Hello {{ .name }},</div>
     
     <p>Your OTP code for authentication is: {{ .Token }} </p>
      <p class="info-text">Please enter this code to complete your authentication process. This code will expire in 3minutes.</p>
    </div>
    <p>If you didn't request this code, please ignore this email.</p>
    <p>Best regards,<br>Munch.in Team</p>
  </div>
</body>
</html>
`;

module.exports = {OTP_Verf}
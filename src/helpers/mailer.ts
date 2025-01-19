import nodemailer from "nodemailer";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create token

    let mailOptions: any;
    if (emailType === "VERIFY") {
      const verifyEmailToken = jwt.sign(
        { id: userId },
        process.env.VERIFY_EMAIL_TOKEN_SECRET!,
        {
          expiresIn: "1d",
        }
      );

      await User.findByIdAndUpdate(userId, {
        verifyToken: verifyEmailToken,
        verifyTokenExpiry: Date.now() + 10 * 24 * 3600000,
      });

      const verifyEmailHtmlTemplate = `<p>Click &nbsp;<b><a href=${process.env.DOMAIN}/verifyemail?token=${verifyEmailToken}>here</a></b>
      &nbsp; to Verify your email or copy and paste the link below in your browser.<br /><b> ${process.env.DOMAIN}/verifyemail?token=${verifyEmailToken}</b></p>`;

      mailOptions = {
        from: `<Lyrical> ${process.env.EMAIL}`,
        to: email,
        subject: "Verify your email",
        html: verifyEmailHtmlTemplate,
      };
    } else if (emailType === "RESET") {
      const resetPasswordToken = jwt.sign(
        { id: userId },
        process.env.RESET_PASSWORD_TOKEN_SECRET!,
        {
          expiresIn: "1d",
        }
      );

      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: resetPasswordToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });

      const resetPasswordHtmlTemplate = `<p>Click &nbsp;<b><a href=${process.env.DOMAIN}/resetpassword?token=${resetPasswordToken}>here</a></b>
      &nbsp;to Reset your password or copy and paste the link below in your browser. <br><b> ${process.env.DOMAIN}/resetpassword?token=${resetPasswordToken}</b></p>`;

      mailOptions = {
        from: `<Lyrical> ${process.env.EMAIL}`,
        to: email,
        subject: "Reset your password",
        html: resetPasswordHtmlTemplate,
      };
    }

    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailresponse = await transport.sendMail(mailOptions);

    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

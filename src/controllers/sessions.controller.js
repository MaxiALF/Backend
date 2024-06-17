import users from "../data/mongo/users.mongo.js";
import service from "../services/users.service.js";
import customError from "../utils/errors/customError.js";
import errors from "../utils/errors/errors.js";
import crypto from "crypto";
import { createTransport } from "nodemailer";
import env from "../utils/env.util.js";
import { createHash } from "../utils/hash.util.js";

class SessionsController {
  constructor() {
    this.service = service;
  }

  register = async (req, res, next) => {
    const { email, name, verifiedCode, _id } = req.user;
    await this.service.register({ email, name, verifiedCode, _id });
    try {
      return res.success201({ Mesagge: "Registered!", id: _id });
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const user = req.user._id;
      await users.update(user, { last_connection: new Date() });
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .success200("Logged in!");
    } catch (error) {
      return next(error);
    }
  };

  google = async (req, res, next) => {
    try {
      return res.success200("Logged in with Google!");
    } catch (error) {
      return next(error);
    }
  };

  gitHub = async (req, res, next) => {
    try {
      return res.success200("Logged in with Github!");
    } catch (error) {
      return next(error);
    }
  };

  me = async (req, res, next) => {
    try {
      const user = {
        email: req.user.email,
        role: req.user.role,
        photo: req.user.photo,
      };
      return res.success200(user);
    } catch (error) {
      return next(error);
    }
  };

  signout = async (req, res, next) => {
    try {
      const user = req.user._id;
      await users.update(user, { last_connection: new Date() });
      return res.clearCookie("token").success200("Signed out!");
    } catch (error) {
      return next(error);
    }
  };

  badauth = (req, res, next) => {
    try {
      return res.error401();
    } catch (error) {
      return next(error);
    }
  };

  verifyAccount = async (req, res, next) => {
    try {
      const { email, verifiedCode } = req.body;
      const user = await service.readByEmail(email);
      if (user.verifiedCode === verifiedCode) {
        await service.update(user._id, { verified: true });
        return res.json({
          statusCode: 200,
          message: "verified user!",
        });
      } else {
        customError.new(errors.token);
      }
    } catch (error) {
      return next(error);
    }
  };

  password = async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await service.readByEmail(email);
      if (!user) {
        return res.error404("User not found");
      }
      const token = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;
      await service.update(user._id, {
        resetPasswordToken: token,
        resetPasswordExpires: user.resetPasswordExpires,
      });
      const transporter = createTransport({
        service: "Gmail",
        auth: { user: env.GOOGLE_EMAIL, pass: env.GOOGLE_PASSWORD },
      });
      const mailOpt = {
        to: user.email,
        from: `MAX POWER PARTS <${env.GOOGLE_EMAIL}>`,
        subject: "Password Reset",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
             <head>
              <meta charset="UTF-8">
              <meta content="width=device-width, initial-scale=1" name="viewport">
              <meta name="x-apple-disable-message-reformatting">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta content="telephone=no" name="format-detection">
              <title>Empty template</title><!--[if (mso 16)]>
                <style type="text/css">
                a {text-decoration: none;}
                </style>
                <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG></o:AllowPNG>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
              <style type="text/css">
            #outlook a {
              padding:0;
            }
            .es-button {
              mso-style-priority:100!important;
              text-decoration:none!important;
            }
            a[x-apple-data-detectors] {
              color:inherit!important;
              text-decoration:none!important;
              font-size:inherit!important;
              font-family:inherit!important;
              font-weight:inherit!important;
              line-height:inherit!important;
            }
            .es-desk-hidden {
              display:none;
              float:left;
              overflow:hidden;
              width:0;
              max-height:0;
              line-height:0;
              mso-hide:all;
            }
            @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:18px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } .h-auto { height:auto!important } }
            @media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
            </style>
             </head>
             <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
              <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#FFFFFF"><!--[if gte mso 9]>
                  <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#ffffff" origin="0.5, 0" position="0.5, 0"></v:fill>
                  </v:background>
                <![endif]-->
               <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF">
                 <tr>
                  <td valign="top" style="padding:0;Margin:0">
                   <table class="es-header" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                     <tr>
                      <td align="center" style="padding:0;Margin:0">
                       <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:350px">
                         <tr>
                          <td align="left" bgcolor="#110a0a" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-color:#110a0a">
                           <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:310px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" bgcolor="#110202" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#ffd966;font-size:14px">Reset Password</p></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table>
                   <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                     <tr>
                      <td align="center" style="padding:0;Margin:0">
                       <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:350px">
                         <tr>
                          <td align="left" bgcolor="#110a0a" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-color:#110a0a">
                           <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td valign="top" align="center" style="padding:0;Margin:0;width:310px">
                               <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#333333" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#333333" role="presentation">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://eemjqqy.stripocdn.email/content/guids/CABINET_f30a8e626954a5489effbd3d287a44ffb9ace214282da428375e4c7e6b3d2a97/images/8256069_nGE.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="150"></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table>
                   <table class="es-footer" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                     <tr>
                      <td align="center" style="padding:0;Margin:0">
                       <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:350px">
                         <tr>
                          <td align="left" bgcolor="#110a0a" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-color:#110a0a">
                           <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:310px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#ffd966;font-size:14px">ATENTION!</p></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                         <tr>
                          <td align="left" bgcolor="#110a0a" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-color:#110a0a">
                           <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:310px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="left" bgcolor="#110a0a" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#ffd966;font-size:14px">&nbsp;You are receiving this because you (or someone else) have requested the reset of the password for your account.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#ffd966;font-size:14px">&nbsp;Please click on the following link, or paste this into your browser to complete the process:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<br></p></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                         <tr>
                          <td align="left" bgcolor="#110a0a" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-color:#110a0a">
                           <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:310px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#0b5394;font-size:14px"><span style="color:#0000CD"></span>&nbsp;http://${req.headers.host}/auth/reset/${token}&nbsp;&nbsp;<br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#0b5394;font-size:14px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#0b5394;font-size:14px"><br></p></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                         <tr>
                          <td align="left" bgcolor="#999999" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-color:#999999">
                           <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:310px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#ffffff;font-size:14px">If you did not request this, please ignore this email and your password will remain unchanged</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#ffffff;font-size:14px"><br></p></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table>
              </div>
             </body>
            </html>`,
      };
      await transporter.sendMail(mailOpt);
      res.status(200).success200("Recovery email sent");
    } catch (error) {
      return next(error);
    }
  };

  resetPassword = async (req, res, next) => {
    const { token } = req.params;
    const { password, email } = req.body;
    try {
      const user = await service.readByEmail(email, {
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
      if (!user) {
        return res
          .status(400)
          .error400("Password reset token is invalid or has expired");
      }
      const verify = createHash(password, user.password);
      user.password = verify;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await service.update(
        user._id,
        {
          password: user.password,
          resetPasswordToken: undefined,
          resetPasswordExpires: undefined,
        },
        { new: true }
      );
      res.status(200).success200("Password has been reset");
    } catch (error) {
      return next(error);
    }
  };
}

export default SessionsController;
const controller = new SessionsController();
const {
  register,
  login,
  google,
  gitHub,
  me,
  signout,
  badauth,
  verifyAccount,
  verifiedCode,
  password,
  resetPassword,
} = controller;
export {
  register,
  login,
  google,
  gitHub,
  me,
  signout,
  badauth,
  verifyAccount,
  verifiedCode,
  password,
  resetPassword,
};

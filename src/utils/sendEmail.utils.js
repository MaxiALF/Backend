import { createTransport } from "nodemailer";
import env from "./env.util.js";

export default async function sendEmail(data) {
  try {
    console.log(data);
    const transport = createTransport({
      service: "gmail",
      port: env.PORT,
      auth: { user: env.GOOGLE_EMAIL, pass: env.GOOGLE_PASSWORD },
    });
    await transport.sendMail({
      from: `MAX POWER PARTS <${env.GOOGLE_EMAIL}>`,
      to: data.email,
      subject: `USUARIO REGISTRADO!`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="und" style="padding:0;Margin:0">
       <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta content="telephone=no" name="format-detection">
        <title>New Template</title><!--[if (mso 16)]>
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
      .ExternalClass {
        width:100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height:100%;
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
      @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c { text-align:center!important } .es-m-txt-r { text-align:right!important } .es-m-txt-l { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; padding:10px 0px 10px 0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social td { display:inline-block!important } table.es-social { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
      @media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
      </style>
       </head>
       <body style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
        <div dir="ltr" class="es-wrapper-color" lang="und" style="background-color:#CCCCCC"><!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
              <v:fill type="tile" color="#cccccc"></v:fill>
            </v:background>
          <![endif]-->
         <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#CCCCCC">
           <tr style="border-collapse:collapse">
            <td valign="top" style="padding:0;Margin:0">
             <table cellpadding="0" cellspacing="0" class="es-header" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
               <tr style="border-collapse:collapse">
                <td align="center" style="padding:0;Margin:0">
                 <table class="es-header-body" cellspacing="0" cellpadding="0" align="center" bgcolor="#040101" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#040101;width:600px" role="none">
                   <tr style="border-collapse:collapse">
                    <td align="left" bgcolor="#040101" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-color:#040101">
                     <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr style="border-collapse:collapse">
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr style="border-collapse:collapse">
                            <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://i.gifer.com/7efs.gif" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="100"></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
               <tr style="border-collapse:collapse">
                <td align="center" style="padding:0;Margin:0">
                 <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#040101;width:600px" cellspacing="0" cellpadding="0" bgcolor="#040101" align="center" role="none">
                   <tr style="border-collapse:collapse">
                    <td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:40px;padding-right:40px">
                     <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr style="border-collapse:collapse">
                        <td valign="top" align="center" style="padding:0;Margin:0;width:520px">
                         <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr style="border-collapse:collapse">
                            <td align="left" style="padding:0;Margin:0"><h1 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:30px;font-style:normal;font-weight:normal;color:#ffd966">Bienvenido a Max Power Parts!</h1></td>
                           </tr>
                           <tr style="border-collapse:collapse">
                            <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:20px;font-size:0">
                             <table width="5%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                               <tr style="border-collapse:collapse">
                                <td style="padding:0;Margin:0;border-bottom:2px solid #999999;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td>
                               </tr>
                             </table></td>
                           </tr>
                           <tr style="border-collapse:collapse">
                            <td align="left" style="padding:0;Margin:0;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#ffffff;font-size:16px">En hora buena ${data.name.toUpperCase()}!.</p></td>
                           </tr>
                           <tr style="border-collapse:collapse">
                            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#ffffff;font-size:14px">Tu cuenta ha sido creada satisfactoriamente. Ahora es de suma importancia que realices la verificación de tu cuenta con el codigo de activación que aparece a continuación:</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#ffffff;font-size:14px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#ffffff;font-size:14px">Codigo: ${
                              data.verifiedCode
                            }<br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#ffffff;font-size:14px"></p></td>
                           </tr>
                           <tr style="border-collapse:collapse">
                            <td align="center" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px"><span class="es-button-border" style="border-style:solid;border-color:#4A7EB0;background:#ffd966;border-width:0px;display:inline-block;border-radius:25px;width:auto"><a href="http://localhost:8080/api/login" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#ffffff;font-size:18px;display:inline-block;background:#ffd966;border-radius:25px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;padding:10px 25px;mso-padding-alt:0;mso-border-alt:10px solid #ffd966">Verificar</a></span></td>
                           </tr>
                           <tr style="border-collapse:collapse">
                            <td align="center" style="padding:0;Margin:0;padding-right:5px;padding-top:20px;padding-bottom:20px;font-size:0">
                             <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                               <tr style="border-collapse:collapse">
                                <td style="padding:0;Margin:0;border-bottom:1px solid #ffffff;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td>
                               </tr>
                             </table></td>
                           </tr>
                           <tr style="border-collapse:collapse">
                            <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#990000;font-size:14px">IMPORTANTE!!:&nbsp;</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:21px;color:#990000;font-size:14px">&nbsp;Asegurate de ingresar bien el codigo de verificación, ya que si tu cuenta no se verifica correctamente, no podrás acceder a la aplicación.</p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
               <tr style="border-collapse:collapse">
                <td align="center" style="padding:0;Margin:0">
                 <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#EFEFEF;width:600px">
                   <tr style="border-collapse:collapse">
                    <td align="left" style="padding:0;Margin:0;padding-bottom:15px;padding-left:20px;padding-right:20px">
                     <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr style="border-collapse:collapse">
                        <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                         <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr style="border-collapse:collapse">
                            <td esdev-links-color="#333333" align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:18px;color:#333333;font-size:12px">Este mail es automatico y no debe ser respondido.<br>Copyright 2024 MaxPowerParts. Todos los derechos reservados.&nbsp;</p></td>
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
    });
  } catch (error) {
    throw error;
  }
}

module.exports = ({name,orderId,total ,transcation,items,title,status}) => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <style type="text/css">
      @media screen and (max-device-width: 480px) {
        .background {
          padding: 0px;
        }
        .header {
          max-width: 482px;
          border-bottom: 8px solid #F8F8F8;
        }
        .footer {
          border-bottom: 8px solid #F8F8F8;
        }
      }
      @media (min-device-width: 480px) {
        .background {
          padding: 24px;
        }
        .header {
          border-top: 1px solid #DFE0E1;
          max-width: 530px;
          padding-top: 24px;
        }
      }
    </style>
    <title>Order Confirmed</title>
  </head>
  <body>

    <!-- header -->
    <div>
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" style="min-width: 100%;">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

          <!--[if !mso]>

<!-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge">

          <!--<![endif]-->
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title></title>

          <!--[if (gte mso 9)|(IE)]>
<style type="text/css">
table {border-collapse: collapse;}
</style>
<![endif]-->
        </head>
        <body style="margin: 0; padding: 0; background-color: #ffffff;">
          <div class="page--webkit" style="max-width: 600px; margin: 0 auto;">

            <!--[if (gte mso 9)|(IE)]>
<table width="600" align="center">
<tr>
<td>
<![endif]-->
            <table class="page__container" align="center" cellspacing="0" cellpadding="0" style="border-spacing: 0; font-family: sans-serif; color: #4c4c4b; margin: 0 auto; width: 100%; max-width: 600px;" width="100%">
              <tr>
                <td colspan="3" style="padding: 0;">
                  <img src="https://blogapi.s3.us-west-2.amazonaws.com/uploads/6435751d-ef15-4da7-8c90-c4cdbfe8d7c7-WhatsApp_Image_2022-08-20_at_21.09.33-removebg-preview.png" height="1px" style="border: 0;">
                </td>
              </tr>
              <tr class="logo">
                <td class="logo__padding" style="padding: 33px 0px; width: 36.75%; max-width: 220.5px;" width="36.75%"></td>
                <td class="logo__container" style="padding: 33px 0px; width: 26.5%; max-width: 159px;" width="26.5%">
                  <a href="https://link.everlane.com/click/5df6d689e7b48900293055e7/aHR0cHM6Ly93d3cuZXZlcmxhbmUuY29tP3Byb2ZpbGU9NWRmNWE4YzQ3YWNlNWEwZTliN2EyY2E3/5df5a8c47ace5a0e9b7a2ca7Bd2214f20" class="logo__link" style="display: block;">
                    <img src="https://blogapi.s3.us-west-2.amazonaws.com/uploads/6435751d-ef15-4da7-8c90-c4cdbfe8d7c7-WhatsApp_Image_2022-08-20_at_21.09.33-removebg-preview.png" class="logo__image" style="border: 0; width: 100%; min-width: 159px; height: auto;">
                  </a>
                </td>
                <td class="logo__padding" style="padding: 33px 0px; width: 36.75%; max-width: 220.5px;" width="36.75%"></td>
              </tr>

              <!-- EMAIL BODY -->
              <tr>
                <td colspan="3" style="padding: 0;">

                  <!-- END HEADER -->
          </div>
          <div class="header" style="background: #FFF; color: #4c4c4b; padding-bottom: 24px; margin-bottom: 8px; font-family: 'Avenir Medium', arial, helvetica, sans-serif; margin: 0px auto;">
            <div style="text-align: center; font-size: 24px; margin-bottom: 16px"> ${title}, <br /> ${name}. </div>
            <div style="text-align: center; font-size: 14px; color: #808284"> Review your order information below. </div>
          </div>

          <!-- main content -->
          <div class="background" style="max-width: 482px; background: #F8F8F8; font-family: 'Avenir Medium', arial, helvetica, sans-serif; margin: 0px auto; ">

            <!-- summary / items / order and date -->
            <div style="max-width: 482px; background: #FFF; margin-bottom: 8px ">

              <!-- order info  -->
              <div style=" border-bottom: 1px solid #DFE0E1 ">
                <table cellspacing="0 " cellpadding="0 " border="0 " width="100% " style="width: 100%!important; padding:16px ">
                  <tbody>
                    <tr>
                      <td>
                        <span style="font-family: 'Avenir Medium', arial, helvetica, sans-serif; display: block; color: #4c4c4b; font-size: 14px; font-weight: 500; ">
December 16, 2019
</span>
                      </td>
                      <td>
                        <span style="font-family: 'Avenir Medium', arial, helvetica, sans-serif; display: block; color: #808284; font-size: 14px; text-align: right; ">
Order: ${orderId}
</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- AVAILABLE ITEMS -->

              <!-- 'ITEMS' // 'Status: Shipping Soon' -->
              <div style="font-size: 14px ">
                <table height="52 " cellspacing="0 " cellpadding="0 " border="0 " width="100% " style="width: 100%!important; padding:16px ">
                  <tbody>
                    <tr>
                      <td>
                        <span style="font-family: 'Avenir Medium', arial, helvetica, sans-serif; display: block; color: #4c4c4b; font-weight: 500; ">
Items
</span>
                      </td>
                      <td>
                        <span style="font-family: 'Avenir Medium', arial, helvetica, sans-serif; display: block; color: #4c4c4b; font-size: 14px; text-align: right; ">
Status: <span style="color:#182677 ">${status}</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- summary / items -->
              
            <!-- summary / shipping address -->
            <div style="max-width: 482px; background: #FFF; padding: 0px 16px; margin-bottom:8px ">
              <div style="padding: 16px 0px; border-bottom: 1px solid #DFE0E1 ">
                <span style="display: block; color: #4c4c4b; font-weight: 500; font-size: 14px; ">Shipping Address</span>
              </div>
              <span style="padding: 16px 0px; display: block; font-size: 14px; color: #808284; ">${name} <br /> 600 Montgomery St <br />  San Franscisco, CA 94111 <br /> (650) 655-6500 </span>
            </div>

            <!-- summary / shipping method -->
            <div style="max-width: 482px; background: #FFF; padding: 0px 16px; margin-bottom:8px ">
              <div style="padding: 16px 0px; border-bottom: 1px solid #DFE0E1 ">
                <span style="display: block; color: #4c4c4b; font-weight: 500; font-size: 14px; ">   Shipping Method</span>
              </div>
              <span style="padding: 16px 0px; display: block; font-size: 14px; color: #808284;"><span style="color: #4c4c4b ">Express Shipping.</span> 2 business days.</span>
            </div>

            <!-- summary / payment method -->
            <div style="max-width: 482px; background: #FFF; padding: 0px 16px; margin-bottom:8px ">
              <div style="padding: 16px 0px; border-bottom: 1px solid #DFE0E1 ">
                <span style="display: block; color: #4c4c4b; font-weight: 500; font-size: 14px; ">Payment Summary</span>
              </div>
              <div style="padding: 16px 0px; border-bottom: 1px solid #DFE0E1 ">

                <!-- Store credit only -->

                <!-- START Payment Method: Credit Card  -->

                <!-- Billed To -->
                <span style="display: block; font-size: 14px; color: #4c4c4b; margin-bottom:8px"> Transaction No</span>

                <!-- CC Logo / Number -->
                <div style="font-size: 14px; color: #808284; ">
                  <img alt="visa" src="https://everlane.s3.amazonaws.com/static/payment_method_icons/visa.png" style="height: 20px; margin-top: -4px; margin-right: 1px; vertical-align: middle;" />

                  <!-- CC Number -->
${transcation}                </div>

                <!-- Payment Method: PayPal -->

                <!-- Payment Method: Cash -->

                <!-- Payment Method: Afterpay -->

                <!-- Payment Method: Alipay -->

                <!-- Payment Method: Stripe -->

                <!-- END Payment Method: Credit Card -->
              </div>

              <!-- adjustments credit_card -->
              <div style="padding: 8px 0px; border-bottom: 1px solid #DFE0E1 ">
                <table border="0 " cellspacing="0 " cellpadding="0 " width="100% " style="width: 100%!important; ">
                  <tbody>
                    <tr>
                      <td style="padding: 4px 0px; font-family: 'Avenir Medium', arial, helvetica, sans-serif; color: #808284; font-size: 14px; ">Subtotal</td>
                      <td style="padding: 4px 0px; font-family: 'Avenir Medium', arial, helvetica, sans-serif; color: #4C4C4B; font-size: 14px; text-align: right; ">${total}</td>
                    </tr>

                    <!-- Shipping Logic-->

                    <!-- Adjustments with Free Shipping -->

                    <!-- Adjustments, no Free Shipping -->
                    <tr>
                      <td style="padding: 4px 0px; font-family: 'Avenir Medium', arial, helvetica, sans-serif; color: #808284; font-size: 14px; ">
                        Total Items </td>
                      <td style="padding: 4px 0px; font-family: 'Avenir Medium', arial, helvetica, sans-serif; color: #4C4C4B; font-size: 14px; text-align: right; ">
                        ${items}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="padding: 12px 0px; color: #4C4C4B ">
                <table border="0 " cellspacing="0 " cellpadding="0 " width="100% " style="width: 100%!important; ">
                  <tbody>
                    <tr>
                      <td style="font-family: 'Avenir Medium', arial, helvetica, sans-serif; font-weight: 500; font-size: 14px; ">Total</td>
                      <td style="font-family: 'Avenir Medium', arial, helvetica, sans-serif; font-weight: 500; font-size: 14px; text-align: right; ">${total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- order cancellation -->
            <div style="max-width: 482px; background: #FFF; padding: 16px; margin-bottom: 8px;">
              <table cellspacing="0 " cellpadding="0 " border="0 " width="100% " style="width: 100%!important; ">
                <tbody>
                  <tr>
                    <td>
                      <span style="margin-bottom: 4px; font-family: 'Avenir Medium', arial, helvetica, sans-serif;
display: inline-block; color: #4c4c4b; font-size: 14px; font-weight: 500; ">
Need to change something?
</span>
                      <br>
                      <span style="font-family: 'Avenir Medium', arial, helvetica, sans-serif;
display: inline-block; color: #808284;font-size: 14px; ">
You can cancel within one hour.
</span>
                    </td>
                    <td>
                      <a href="#">
                        <div style="font-family: 'Avenir Medium', arial, helvetica, sans-serif;font-size:14px; float: right;max-height: 32px; width: 120px; border: 1px solid #CB5332; color: #CB5332; text-align:center; padding: 5px 0; ">
                          <span>Review Order</span>
                        </div>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!--FOOTER -->
            <div class="footer" style="max-width: 482px; background: #FFF; color: #808284; font-size:12px; padding: 16px;">
              <span style="font-weight: 500; display: block; margin-bottom: 4px ">Returns</span>
              <span style="display:block; margin-bottom: 1em ">We accept returns within 60 days of purchase. Please ensure that items are unworn, unwashed, and
undamaged. Note: All items must be returned with any original packaging, including any tags the item came with. Underwear outside of one return must be unopened with all seals intact. Bodysuits must have protective hygienic liner attached. Exclusions: Digital and physical gift cards cannot be returned. </span>
              <span style="display:block; margin-bottom: 1em ">If you would like to start a return please visit your account <a href="https://link.everlane.com/click/5df6d689e7b48900293055e7/aHR0cHM6Ly93d3cuZXZlcmxhbmUuY29tL2FjY291bnQvb3JkZXJzP3Byb2ZpbGU9NWRmNWE4YzQ3YWNlNWEwZTliN2EyY2E3/5df5a8c47ace5a0e9b7a2ca7C487d3f8e" style="color: #4C4C4B; text-decoration: none ">Orders & Returns</a> page.</span>
       
            </div>
          </div>
          <div>

            <!-- BEGIN FOOTER -->

            <!-- END: EMAIL BODY -->

            <!-- FOOTER -->
            <body style="margin: 0; padding: 0; background: #ffffff">
              <div style="padding-top:24px; padding-bottom: 32px; margin: 0 auto">
                <p style="font-family: 'Avenir Next', 'Helvetica Neue', helvetica, arial, sans-serif; font-size: 11.5px; line-height: 2em; letter-spacing: 0.02em; color: #9a9c9f; text-align: center; margin: 0;">
                  2170 Folsom St., San Francisco, CA 94110
                  <br> Everlane SF / NY &#169; 2019 Everlane, Inc. All Rights Reserved.
                  <br>
                  <a href="https://link.everlane.com/click/5df6d689e7b48900293055e7/aHR0cHM6Ly93d3cuZXZlcmxhbmUuY29tL3ByaXZhY3k_cHJvZmlsZT01ZGY1YThjNDdhY2U1YTBlOWI3YTJjYTc/5df5a8c47ace5a0e9b7a2ca7B8edf7590" style="color: #9a9c9f; display: inline; text-decoration: none;">Privacy Policy</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://link.everlane.com/click/5df6d689e7b48900293055e7/aHR0cHM6Ly93d3cuZXZlcmxhbmUuY29tL3Rlcm1zP3Byb2ZpbGU9NWRmNWE4YzQ3YWNlNWEwZTliN2EyY2E3/5df5a8c47ace5a0e9b7a2ca7Baf7bd052" style="color: #9a9c9f; display: inline; text-decoration: none;">Terms of Service</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                  <a target="_blank" href="#" style="color: #9a9c9f; display: inline; text-decoration: none;">Unsubscribe</a>
                </p>
              </div>
            </body>

            <!-- END: FOOTER -->

            <!--[if (gte mso 9)|(IE)]>
</td>
</tr>
</table>
<![endif]-->
          </div>
        </body>
      </html>
    `;
}
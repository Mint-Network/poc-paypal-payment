const braintree = require("braintree");
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cookieParser = require('cookie-parser')
var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "29n4xvhjx2hwkvrt",
  publicKey: "n69qcb4jczkk5dv7",
  privateKey: "ad5e16c39754a6629ec8625bcd53b193"
});

app.post('/checkout', async(req,res) => {
  const nonceFromTheClient = req.body.payment_method_nonce;
  const deviceDataFromTheClient = req.body.deviceData;
  const amount = req.body.amount;
  
  console.log(res);
  
  await gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonceFromTheClient,
    deviceData: deviceDataFromTheClient,
    options: {
      submitForSettlement: true
    }
  }).then(result => {
    console.log(result);
    res.send(result);
  });  
});

app.listen(4001,  function(){
  console.log('Listening on port 4001'); //Listening on port 4001
});
















/* response */
/*
{
  "success": true,
  "transaction": {
    "accountFundingTransaction": false,
    "acquirerReferenceNumber": null,
    "addOns": [],
    "additionalProcessorResponse": null,
    "amount": "5.00",
    "amountRequested": "5.00",
    "androidPayCard": {
      "bin": "401288",
      "cardType": "Visa",
      "commercial": "Unknown",
      "countryOfIssuance": "Unknown",
      "debit": "Unknown",
      "durbinRegulated": "Unknown",
      "expirationMonth": "09",
      "expirationYear": "2025",
      "globalId": null,
      "googleTransactionId": "AH2Ejtd8ICgsw7P3CY_g-iOPS6P6L7DmzCG3gru4uYbbip0w9rMv_MopEONWbdQGdCdx1XaSbBtLWmWcMQCSt-lxbgRpNyqz1odQDtqc3iiSbaBW0j6d99O886qtr3opMTxWWXXhRDoT",
      "graphQLId": null,
      "healthcare": "Unknown",
      "imageUrl": "https://assets.braintreegateway.com/payment_method_logo/android_pay_card.png?environment=sandbox",
      "isNetworkTokenized": false,
      "issuingBank": "Unknown",
      "last4": "1881",
      "payroll": "Unknown",
      "prepaid": "No",
      "productId": "Unknown",
      "sourceCardLast4": "9338",
      "sourceCardType": "Visa",
      "sourceDescription": "Visa 9338",
      "token": null,
      "virtualCardLast4": "1881",
      "virtualCardType": "Visa"
    },
    "applePayCard": {},
    "authorizationAdjustments": [],
    "authorizationExpiresAt": "2021-11-26T10:38:00Z",
    "authorizedTransactionGlobalId": null,
    "authorizedTransactionId": null,
    "avsErrorResponseCode": null,
    "avsPostalCodeResponseCode": "I",
    "avsStreetAddressResponseCode": "I",
    "billing": {
      "company": null,
      "countryCodeAlpha2": null,
      "countryCodeAlpha3": null,
      "countryCodeNumeric": null,
      "countryName": null,
      "extendedAddress": null,
      "firstName": null,
      "id": null,
      "lastName": null,
      "locality": null,
      "postalCode": null,
      "region": null,
      "streetAddress": null
    },
    "channel": null,
    "createdAt": "2021-11-19T10:38:00Z",
    "creditCard": {
      "accountBalance": null,
      "accountType": null,
      "bin": null,
      "cardType": null,
      "cardholderName": null,
      "commercial": "Unknown",
      "countryOfIssuance": "Unknown",
      "customerLocation": null,
      "debit": "Unknown",
      "durbinRegulated": "Unknown",
      "expirationDate": "/",
      "expirationMonth": "",
      "expirationYear": "",
      "globalId": null,
      "graphQLId": null,
      "healthcare": "Unknown",
      "imageUrl": "https://assets.braintreegateway.com/payment_method_logo/unknown.png?environment=sandbox",
      "issuingBank": "Unknown",
      "last4": null,
      "maskedNumber": "null******null",
      "payroll": "Unknown",
      "prepaid": "Unknown",
      "productId": "Unknown",
      "token": null,
      "uniqueNumberIdentifier": null,
      "venmoSdk": false
    },
    "currencyIsoCode": "USD",
    "customFields": "",
    "customer": {
      "company": null,
      "email": null,
      "fax": null,
      "firstName": null,
      "id": null,
      "lastName": null,
      "phone": null,
      "website": null
    },
    "cvvResponseCode": "I",
    "debitNetwork": null,
    "descriptor": {
      "name": null,
      "phone": null,
      "url": null
    },
    "disbursementDetails": {
      "disbursementDate": null,
      "fundsHeld": null,
      "settlementAmount": null,
      "settlementBaseCurrencyExchangeRate": null,
      "settlementCurrencyExchangeRate": null,
      "settlementCurrencyIsoCode": null,
      "success": null
    },
    "discountAmount": null,
    "discounts": [],
    "disputes": [],
    "escrowStatus": null,
    "gatewayRejectionReason": null,
    "globalId": "dHJhbnNhY3Rpb25fNTE2MGM4ZDQ",
    "graphQLId": "dHJhbnNhY3Rpb25fNTE2MGM4ZDQ",
    "id": "5160c8d4",
    "installmentCount": null,
    "installments": [],
    "localPayment": {},
    "masterMerchantAccountId": null,
    "merchantAccountId": "radicalhash",
    "merchantAddress": {
      "locality": "Braintree",
      "phone": "5555555555",
      "postalCode": "02184",
      "region": "MA",
      "streetAddress": ""
    },
    "merchantIdentificationNumber": "123456789012",
    "merchantName": "DESCRIPTORNAME",
    "networkResponseCode": "XX",
    "networkResponseText": "sample network response text",
    "networkTransactionId": "020211119103800",
    "orderId": null,
    "partialSettlementTransactionGlobalIds": [],
    "partialSettlementTransactionIds": [],
    "paymentInstrumentType": "android_pay_card",
    "paymentReceipt": {
      "amount": "5.00",
      "currencyIsoCode": "USD",
      "globalId": "dHJhbnNhY3Rpb25fNTE2MGM4ZDQ",
      "id": "5160c8d4",
      "merchantAddress": [],
      "merchantIdentificationNumber": "123456789012",
      "merchantName": "DESCRIPTORNAME",
      "pinVerified": false,
      "processingMode": null,
      "processorAuthorizationCode": "2YT836",
      "processorResponseCode": "1000",
      "processorResponseText": "Approved",
      "terminalIdentificationNumber": "00000001",
      "type": "sale"
    },
    "paypalAccount": {},
    "paypalHereDetails": {},
    "pinVerified": false,
    "planId": null,
    "processedWithNetworkToken": false,
    "processingMode": null,
    "processorAuthorizationCode": "2YT836",
    "processorResponseCode": "1000",
    "processorResponseText": "Approved",
    "processorResponseType": "approved",
    "processorSettlementResponseCode": "",
    "processorSettlementResponseText": "",
    "purchaseOrderNumber": null,
    "recurring": false,
    "refundGlobalIds": [],
    "refundId": null,
    "refundIds": [],
    "refundedInstallments": [],
    "refundedTransactionGlobalId": null,
    "refundedTransactionId": null,
    "responseEmvData": null,
    "retriedTransactionGlobalId": null,
    "retriedTransactionId": null,
    "retrievalReferenceNumber": "1234567",
    "retryGlobalIds": [],
    "retryIds": [],
    "samsungPayCard": {},
    "scaExemptionRequested": null,
    "serviceFeeAmount": null,
    "settlementBatchId": null,
    "shipping": {
      "company": null,
      "countryCodeAlpha2": null,
      "countryCodeAlpha3": null,
      "countryCodeNumeric": null,
      "countryName": null,
      "extendedAddress": null,
      "firstName": null,
      "id": null,
      "lastName": null,
      "locality": null,
      "postalCode": null,
      "region": null,
      "streetAddress": null
    },
    "shippingAmount": null,
    "shipsFromPostalCode": null,
    "status": "submitted_for_settlement",
    "statusHistory": [],
    "subMerchantAccountId": null,
    "subscription": {
      "billingPeriodEndDate": null,
      "billingPeriodStartDate": null
    },
    "subscriptionId": null,
    "taxAmount": null,
    "taxExempt": false,
    "terminalIdentificationNumber": "00000001",
    "threeDSecureInfo": null,
    "type": "sale",
    "updatedAt": "2021-11-19T10:38:00Z",
    "visaCheckoutCard": {},
    "voiceReferralNumber": null
  }
}
*/
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import BraintreeDropIn from 'react-native-braintree-dropin-ui';
 import CurrencyInput from 'react-native-currency-input';
 import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image } from 'react-native';

 export default class BraintreeDropInComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: 0
        };
    }

    initBraintreeDropIn = () => {
        let res = BraintreeDropIn.show({
            clientToken: 'sandbox_d5xt4jp3_29n4xvhjx2hwkvrt',
            merchantIdentifier: 'applePayMerchantIdentifier',
            googlePayMerchantId: 'googlePayMerchantId',
            countryCode: 'US',    //apple pay setting
            currencyCode: 'USD',   //apple pay setting
            merchantName: 'Your Merchant Name for Apple Pay',
            orderTotal:'Total Price',
            googlePay: true,
            applePay: false,
            vaultManager: false,
            payPal: true, 
            cardDisabled: false,
            darkTheme: true,
            orderTotal: (this.state.amount).toString()
        }).then(async(result) => {

            console.log(result);

            try {
                const response = await fetch('http://192.168.29.98:4001/checkout', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        payment_method_nonce: result.nonce,
                        deviceData: result.deviceData,
                        amount: (this.state.amount).toString()
                    })
                });
                const json = await response.json();
                console.log(json);
            } catch (error) {
                console.error(error);
            }
        }).catch((error) => {
            console.log(error)
            if (error.code === 'USER_CANCELLATION') {
                // update your UI to handle cancellation
            } else {
                // update your UI to handle other errors
            }
        });
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1}}>
              <View>                
              <CurrencyInput
                    style={styles.inputBasic}
                    value={this.state.amount}
                    onChangeValue={(amount) => {this.setState({ amount }) } }
                    prefix="$"
                    delimiter=","
                    separator="."
                    precision={2}
                    onChangeText={(formattedValue) => {
                        console.log(formattedValue); // $2,310.46
                    }}
                />                  
                <Button
                      title="Pay Now"
                      color="#f194ff"
                      onPress={this.initBraintreeDropIn}
                /> 
              </View>
          </SafeAreaView>
        );
    }
}




const styles = StyleSheet.create({
    button: {
      padding: 16,
      borderRadius: 6,
      backgroundColor: '#ddd',
      flexGrow: 1,
      alignItems: 'center',
      margin: 4,
      justifyContent: 'center',
    },
    buttonsWrapper: {
      flexDirection: 'row',
      marginTop: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 16,
    },
    inputBasic: {
      marginVertical: 8,
      fontSize: 18,
      borderWidth: 1,
      borderColor: '#cdcdcd',
      paddingHorizontal: 12,
      height: 54,
    },
    inputMask: {
      fontSize: 18,
    },
    inputMaskContainer: {
      borderColor: '#cdcdcd',
      height: 54,
      marginVertical: 8,
      paddingHorizontal: 12,
      justifyContent: 'center',
      borderWidth: 1,
    },
    label: {
      fontSize: 20,
      marginBottom: 16,
      fontWeight: 'bold',
      marginTop: 24,
      textAlign: 'center',
    },
    screenContainer: {
      flex: 1,
    },
});
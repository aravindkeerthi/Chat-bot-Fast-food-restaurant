const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("Welcome"),
    ITEM_1: Symbol("item_1"),
    TYPE_1: Symbol("type_1"),
    SAUSE_TYPE: Symbol("Sause_type"),
    TYPE_2: Symbol("type_2"),
    SIZE: Symbol("Size"),
    ICECREAM:  Symbol("icecream"),
    CONFIRM: Symbol("Confirm")

});

module.exports = class ShwarmaOrder extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;        
        this.sItem1= "";
        this.sType1= "";
        this.sSausetype= "";
        this.sItem2= "";
        this.sType2= "";
        this.sSize= "";
        this.sPrize = 0;
        this.sICECREAM = "";
        this.sConfirm = "";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
          case OrderState.WELCOMING:
            this.stateCur = OrderState.ITEM_1;
            aReturn.push("Welcome to Aravind's Fast Food.");
            aReturn.push("Please type 1 for Loaded Wrap, 2 for Hot Bowl?");
            break;
        case OrderState.ITEM_1:
           if(sInput!= 1 && sInput!= 2){
            this.stateCur = OrderState.ITEM_1;
            aReturn.push("please enter a valid number either 1 or 2?");
          }
          else if(sInput == 1){
            this.stateCur = OrderState.TYPE_1;
            this.sItem1 = "Loaded wrap";                  
            aReturn.push("What type of chicken would you like (slow-cooked or crispy)?");
            }
            else{
              this.stateCur = OrderState.TYPE_2;
              this.sItem2 = "Hot bowl";                
              aReturn.push("What type of bowl would you like (chilli or broccoli)?");
            }   
            break;
        case OrderState.TYPE_1:
          if(sInput!= "slow-cooked" && sInput!= "crispy"){
            this.stateCur = OrderState.TYPE_1;
            aReturn.push("please enter a valid chicken type either slow-cooked or crispy ?");
           }
           else if(sInput == "slow-cooked"){
              this.stateCur = OrderState.SAUSE_TYPE;
              this.sType1 = "slow-cooked";
              this.sPrize += 11;
              aReturn.push("What sause type would you like(habenaro or cilantro)?");
            }
            else{
              this.stateCur = OrderState.SAUSE_TYPE;
              this.sType1 = "crispy";
              this.sPrize += 12;
              aReturn.push("What sause type would you like(habenaro or cilantro)?");
            }
            break;
        case OrderState.SAUSE_TYPE:
          if(sInput!= "habenaro" && sInput!= "cilantro"){
            this.stateCur = OrderState.SAUSE_TYPE;
            aReturn.push("please enter a valid sause type either habenaro or cilantro?");
           }
           else if(sInput == "habenaro"){
              this.stateCur = OrderState.CONFIRM;
              this.sSausetype = "habenaro";
              this.sPrize += 3;
              aReturn.push("Would you like to Order anything else?");
            }
            else{
              this.stateCur = OrderState.CONFIRM;
              this.sSausetype = "cilantro";
              this.sPrize += 4;
              aReturn.push("Would you like to Order anything else?");
            }
            break;
        case OrderState.TYPE_2:
          if(sInput!= "chilli" && sInput!= "broccoli"){
            this.stateCur = OrderState.TYPE_2;
            aReturn.push("please enter a valid bowl type either chilli or broccoli?");
           }
           else if(sInput == "chilli"){
              this.stateCur = OrderState.SIZE;
              this.sType2 = "chilli";
              this.sPrize += 7;
              aReturn.push("What size would you like(regular or large)?");
            }
            else{
              this.stateCur = OrderState.SIZE;
              this.sType2 = "broccoli";
              this.sPrize += 8;
              aReturn.push("What size would you like(regular or large)?");
            }
            break;
        case OrderState.SIZE:
          if(sInput!= "regular" && sInput!= "large"){
            this.stateCur = OrderState.SIZE;
            aReturn.push("please enter a valid size either regular or large?");
           }
           else if(sInput == "regular"){
              this.stateCur = OrderState.CONFIRM;
              this.sSize = "regular";
              this.sPrize += 3;
              aReturn.push("Would you like to Order anything else?");     
            }
            else{
              this.stateCur = OrderState.CONFIRM;
              this.sSize = "large";
              this.sPrize += 7;
              aReturn.push("Would you like to Order anything else?");
            }
            break;   
        case OrderState.CONFIRM:
          if(sInput!= "yes" && sInput!= "no"){
            this.stateCur = OrderState.CONFIRM;
            aReturn.push("please enter either yes or no to proceed further with the order?");
           }            
            else if(sInput == "yes"){
              this.stateCur = OrderState.ITEM_1;
              aReturn.push("Please type 1 for Loaded Wrap, 2 for Hot Bowl?");
            }
            else{
              this.stateCur = OrderState.ICECREAM;
              aReturn.push("Would you like to have Vanilla Icecream for the order?");
              // this.sICECREAM = "Icecream";
            }
            break;
        case OrderState.ICECREAM:
          if(sInput!= "yes" && sInput!= "no"){
            this.stateCur = OrderState.ICECREAM;
            aReturn.push("please enter either yes or no for the icecream?");
           }
          else if(sInput == "yes"){
            this.stateCur = OrderState.PAYMENT;
            this.sICECREAM = "Icecream";
            this.sPrize += 2;
            aReturn.push("Thank-you for your order of");
            aReturn.push(`${this.sItem1} ${this.sType1} ${this.sSausetype}  ${this.sItem2} ${this.sType2} ${this.sSize} with a Vanilla ${this.sICECREAM} and Total Cost of ${this.sPrize} `);
            aReturn.push(`Please pay for your order here`);
            aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`) ;}          
          else{
            this.stateCur = OrderState.PAYMENT;
            //this.sPrize;
            // if(sInput.toLowerCase() != "no"){
            //     this.sICECREAM = sInput;
            // }
            aReturn.push("Thank-you for your order of");
            aReturn.push(`${this.sItem1} ${this.sType1} ${this.sSausetype}  ${this.sItem2} ${this.sType2} ${this.sSize} with a Total Cost of ${this.sPrize} `);
            aReturn.push(`Please pay for your order here`);
            aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`) ;
            }
            break;
        case OrderState.PAYMENT:
            console.log(sInput);
            console.log(sInput.purchase_units[0]);
            const infor = sInput.purchase_units[0];
        const address = infor.shipping.address.address_line_1 + ' ' + infor.shipping.address.admin_area_2 +' '+ infor.shipping.address.admin_area_1 +' '+ infor.shipping.address.postal_code +' '+ infor.shipping.address.country_code;

            this.isDone(true);
            let d = new Date();
            d.setMinutes(d.getMinutes() + 20);
            aReturn.push(`Your order will be delivered at ${d.toTimeString()} to ${address}`);
            break;
        }
      return aReturn;
    }
    renderForm(sTitle = "-1", sAmount = "-1"){
      // your client id should be kept private
      if(sTitle != "-1"){
        this.sItem = sTitle;
      }
      if(sAmount != "-1"){
        this.sPrize = sAmount;
      }
      const sClientID = process.env.SB_CLIENT_ID || 'put your client id here for testing ... Make sure that you delete it before committing'
      return(`
      <!DOCTYPE html>
  
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Ensures optimal rendering on mobile devices. -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <!-- Optimal Internet Explorer compatibility -->
      </head>
      
      <body>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script
          src="https://www.paypal.com/sdk/js?client-id=${sClientID}"> // Required. Replace SB_CLIENT_ID with your sandbox client ID.
        </script>
        Thank you ${this.sNumber} for your ${this.sItem1} order of $${this.sPrize}.
        <div id="paypal-button-container"></div>
  
        <script>
          paypal.Buttons({
              createOrder: function(data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: '${this.sPrize}'
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function(details) {
                  // This function shows a transaction success message to your buyer.
                  $.post(".", details, ()=>{
                    window.open("", "_self");
                    window.close(); 
                  });
                });
              }
          
            }).render('#paypal-button-container');
          // This function displays Smart Payment Buttons on your web page.
        </script>
      
      </body>
          
      `);
  
    }
}
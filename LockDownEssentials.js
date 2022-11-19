const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    ITEM: Symbol("item"),
    BROOM: Symbol("broom"),
    SHOVELS: Symbol("snow shovels"),
    GARBAGE: Symbol("garbage"),
    CONTAINERS: Symbol("recycling containers"),
    BULBS: Symbol("light bulbs"),
    CLEANERS: Symbol("household cleaners"),
    CLOTHS: Symbol("car cloth"),
    HEADLAMPS: Symbol("geeky headlamps"),
    BUDS: Symbol("ear buds"),
    CHECKOUT: Symbol("checkout items"),
    FINAL: Symbol("final"),
});

module.exports = class LockDownEssentials extends Order{
    constructor(sNumber, sUrl){
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sProducts = "";
        this.sPrice = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.ITEM;
                aReturn.push("Welcome to Aravind's Hardware Store.");
                aReturn.push(`Tap to get the List of items for Sale:`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                aReturn.push("Input the letter for the respective item you want to purchase");

                break;
            case OrderState.ITEM:
                if (sInput.toLowerCase() == "b") {
                    this.sProducts += "Broom";
                    this.sPrice += 4.49;
                } else if (sInput.toLowerCase() == "s") {
                    this.sProducts += "Shovel";
                    this.sPrice += 10.49;
                } else if (sInput.toLowerCase() == "g") {
                    this.sProducts += "Garbage";
                    this.sPrice += 3.99;
                } else if (sInput.toLowerCase() == "r") {
                    this.sProducts += "Containers";
                    this.sPrice += 6.49;
                } else if (sInput.toLowerCase() == "l") {
                    this.sProducts += "Bulbs";
                    this.sPrice += 7.60;
                } else if (sInput.toLowerCase() == "h") {
                    this.sProducts += "Cleaners";
                    this.sPrice += 5.99;
                } else {
                    aReturn.push("select from the list of items available");
                    this.stateCur = OrderState.ITEM;
                    break;
                }
                aReturn.push("Kindly select an upsell item!!!");
                this.stateCur = OrderState.CHECKOUT;
                break;
            
            case OrderState.CHECKOUT:
                if (sInput.toLowerCase() == "c") {
                    this.sProducts == "car clothes";
                    this.sPrice += 2.6;
                } else if (sInput.toLowerCase() == "gh") {
                    this.sProducts == "Geeky head lamps";
                    this.sPrice += 7.5;
                } else if (sInput.toLowerCase() == "e") {
                    this.sProducts == "Ear buds";
                    this.sPrice += 9.74;
                } else {
                    this.stateCur = OrderState.CHECKOUT;
                    aReturn.push("Please type as per the menu provided");
                    break;
                }
                aReturn.push("Do you want to order more? (y or n)");
                this.stateCur = OrderState.FINAL;
                break;
                
                case OrderState.FINAL:
                if (sInput.toLowerCase() == "y") {
                    this.stateCur = OrderState.ITEM;
                    aReturn.push("Input the letter for the respective item you want to purchase");
                    break;
                } else if (sInput.toLowerCase() == "n") {
                    aReturn.push("Thank-you for your order");
                    this.sPrice += 0.13 * this.sPrice;
                    aReturn.push(`Total order is $ ${Math.round(this.sPrice)}`);
                    aReturn.push(
                    `we will text you when we are ready to meet you at curbside.`
                    );
                    this.isDone(true);
                    break;
                } else {
                    this.stateCur = OrderState.FINAL;
                    aReturn.push("Please input y or n only....");
                }
                break;
        }
        return aReturn;
    }
    renderForm(){
      // your client id should be kept private
      return(`
      <html>
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type" />
    <style type="text/css">
      ol {
        margin: 0;
        padding: 0;
      }
      table td,
      table th {
        padding: 0;
      }
      .c9 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 130.5pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c3 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 78pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c13 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 344.2pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c5 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 81pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c10 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 54.8pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c4 {
        -webkit-text-decoration-skip: none;
        color: #000000;
        font-weight: 700;
        text-decoration: underline;
        vertical-align: baseline;
        text-decoration-skip-ink: none;
        font-size: 16pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c12 {
        -webkit-text-decoration-skip: none;
        color: #000000;
        font-weight: 700;
        text-decoration: underline;
        vertical-align: baseline;
        text-decoration-skip-ink: none;
        font-size: 15pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c6 {
        color: #000000;
        font-weight: 700;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 12pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c17 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 14pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c2 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 12pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c21 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 15pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c0 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: left;
        height: 11pt;
      }
      .c15 {
        color: #000000;
        font-weight: 700;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 13pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c16 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      .c18 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: center;
      }
      .c7 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1;
        text-align: center;
      }
      .c1 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1;
        text-align: left;
      }
      .c14 {
        border-spacing: 0;
        border-collapse: collapse;
        margin-right: auto;
      }
      .c20 {
        background-color: #ffffff;
        max-width: 468pt;
        padding: 72pt 72pt 72pt 72pt;
      }
      .c11 {
        height: 0pt;
      }
      .c8 {
        height: 11pt;
      }
      .c19 {
        height: 26pt;
      }
      .title {
        padding-top: 0pt;
        color: #000000;
        font-size: 26pt;
        padding-bottom: 3pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      .subtitle {
        padding-top: 0pt;
        color: #666666;
        font-size: 15pt;
        padding-bottom: 16pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      li {
        color: #000000;
        font-size: 11pt;
        font-family: "Arial";
      }
      p {
        margin: 0;
        color: #000000;
        font-size: 11pt;
        font-family: "Arial";
      }
      h1 {
        padding-top: 20pt;
        color: #000000;
        font-size: 20pt;
        padding-bottom: 6pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h2 {
        padding-top: 18pt;
        color: #000000;
        font-size: 16pt;
        padding-bottom: 6pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h3 {
        padding-top: 16pt;
        color: #434343;
        font-size: 14pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h4 {
        padding-top: 14pt;
        color: #666666;
        font-size: 12pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h5 {
        padding-top: 12pt;
        color: #666666;
        font-size: 11pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h6 {
        padding-top: 12pt;
        color: #666666;
        font-size: 11pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        font-style: italic;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
    </style>
  </head>
  <body class="c20 doc-content">
    <p class="c18">
      <span class="c4">Welcome to Aravind&rsquo;s Hardware Store</span>
    </p>
    <p class="c18 c8"><span class="c4"></span></p>
    <p class="c16">
      <span class="c17"
        >Please find the below products or Items available for Curbside
        pickup:</span
      >
    </p>
    <p class="c0"><span class="c17"></span></p>
    <a id="t.2e458131d2ccefc5b290f5eb05175d831615ddf2"></a><a id="t.0"></a>
    <table class="c14">
      <tr class="c19">
        <td class="c13" colspan="4" rowspan="1">
          <p class="c7"><span class="c15">Available Items for Sale</span></p>
        </td>
      </tr>
      <tr class="c11">
        <td class="c10" colspan="1" rowspan="1">
          <p class="c1"><span class="c6">Sr. No</span></p>
        </td>
        <td class="c9" colspan="1" rowspan="1">
          <p class="c1"><span class="c6">Item</span></p>
        </td>
        <td class="c5" colspan="1" rowspan="1">
          <p class="c1"><span class="c6">Input letter</span></p>
        </td>
        <td class="c3" colspan="1" rowspan="1">
          <p class="c1"><span class="c6">Price</span></p>
        </td>
      </tr>
      <tr class="c11">
        <td class="c10" colspan="1" rowspan="1">
          <p class="c7"><span class="c2">1</span></p>
        </td>
        <td class="c9" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">Broom</span></p>
        </td>
        <td class="c5" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">b</span></p>
        </td>
        <td class="c3" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">4.49</span></p>
        </td>
      </tr>
      <tr class="c11">
        <td class="c10" colspan="1" rowspan="1">
          <p class="c7"><span class="c2">2</span></p>
        </td>
        <td class="c9" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">Snow shovels</span></p>
        </td>
        <td class="c5" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">s</span></p>
        </td>
        <td class="c3" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">10.49</span></p>
        </td>
      </tr>
      <tr class="c11">
        <td class="c10" colspan="1" rowspan="1">
          <p class="c7"><span class="c2">3</span></p>
        </td>
        <td class="c9" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">Garbage</span></p>
        </td>
        <td class="c5" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">g</span></p>
        </td>
        <td class="c3" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">3.99</span></p>
        </td>
      </tr>
      <tr class="c11">
        <td class="c10" colspan="1" rowspan="1">
          <p class="c7"><span class="c2">4</span></p>
        </td>
        <td class="c9" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">Recycling Containers</span></p>
        </td>
        <td class="c5" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">r</span></p>
        </td>
        <td class="c3" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">6.49</span></p>
        </td>
      </tr>
      <tr class="c11">
        <td class="c10" colspan="1" rowspan="1">
          <p class="c7"><span class="c2">5</span></p>
        </td>
        <td class="c9" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">Light bulbs</span></p>
        </td>
        <td class="c5" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">l</span></p>
        </td>
        <td class="c3" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">7.60</span></p>
        </td>
      </tr>
      <tr class="c11">
        <td class="c10" colspan="1" rowspan="1">
          <p class="c7"><span class="c2">6</span></p>
        </td>
        <td class="c9" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">Household Cleaners</span></p>
        </td>
        <td class="c5" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">h</span></p>
        </td>
        <td class="c3" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">5.99</span></p>
        </td>
      </tr>
    </table>
    <p class="c0"><span class="c4"></span></p>
    <p class="c0"><span class="c4"></span></p>
    <p class="c0"><span class="c4"></span></p>
    <a id="t.d83e249718f69b537a274ddac60b2dcb7fe90e6c"></a><a id="t.1"></a>
    <table class="c14">
      <tr class="c19">
        <td class="c13" colspan="4" rowspan="1">
          <p class="c7"><span class="c15">Upsell Item for Sale</span></p>
        </td>
      </tr>
      <tr class="c11">
        <td class="c10" colspan="1" rowspan="1">
          <p class="c1"><span class="c6">Sr. No</span></p>
        </td>
        <td class="c9" colspan="1" rowspan="1">
          <p class="c1"><span class="c6">Item</span></p>
        </td>
        <td class="c5" colspan="1" rowspan="1">
          <p class="c1"><span class="c6">Input letter</span></p>
        </td>
        <td class="c3" colspan="1" rowspan="1">
          <p class="c1"><span class="c6">Price</span></p>
        </td>
      </tr>
      <tr class="c11">
        <td class="c10" colspan="1" rowspan="1">
          <p class="c7"><span class="c2">1</span></p>
        </td>
        <td class="c9" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">Car Cloth</span></p>
        </td>
        <td class="c5" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">c</span></p>
        </td>
        <td class="c3" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">2.6</span></p>
        </td>
      </tr>
      <tr class="c11">
        <td class="c10" colspan="1" rowspan="1">
          <p class="c7"><span class="c2">2</span></p>
        </td>
        <td class="c9" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">Geeky Headlamps</span></p>
        </td>
        <td class="c5" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">gh</span></p>
        </td>
        <td class="c3" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">7.5</span></p>
        </td>
      </tr>
      <tr class="c11">
        <td class="c10" colspan="1" rowspan="1">
          <p class="c7"><span class="c2">3</span></p>
        </td>
        <td class="c9" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">Ear buds</span></p>
        </td>
        <td class="c5" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">e</span></p>
        </td>
        <td class="c3" colspan="1" rowspan="1">
          <p class="c1"><span class="c2">9.74</span></p>
        </td>
      </tr>
    </table>
    <p class="c0"><span class="c4"></span></p>
    <p class="c0"><span class="c4"></span></p>
    <p class="c0"><span class="c4"></span></p>
    <p class="c16"><span class="c12">Signature:</span></p>
    <p class="c16"><span class="c21">Aravind Keerthi</span></p>
  </body>
</html> `);
  
    }
}

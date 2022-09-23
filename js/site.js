function getValues() {
  let loanAmount = parseInt(document.getElementById("loanAmount").value);
  let term = parseInt(document.getElementById("term").value);
  let interestRate = parseFloat(document.getElementById("interestRate").value);

  let payments = generatePayments(loanAmount, term, interestRate);
  displayPayments(payments);
}

function generatePayments(loanAmount, term, interestRate) {
  //this is where the math goes

  let mRate = interestRate / 1200;
  let totalMonthlyPayment =
    (loanAmount * mRate) / (1 - Math.pow(1 + mRate, -term));
  let totalInterest = 0;
  let balance = loanAmount;
  let interestPayment = 0;
  let index = 1;

  let payments = [];

  for (index = 1; index <= term; index++) {
    interestPayment = balance * mRate;
    totalInterest += interestPayment;
    principalPayment = totalMonthlyPayment - interestPayment;
    balance -= principalPayment;

    payments.push({
      month: index,
      payment: totalMonthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      totalInterest: totalInterest,
      balance: balance,
    });
  }
  return payments;
}

function displayPayments(payments) {
  let paymentTemplate = document.getElementById("statTemplate");
  let paymentBody = document.getElementById("rateBody");

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  for (let index = 0; index < payments.length; index++) {
    let paymentNode = document.importNode(paymentTemplate.content, true);
    let paymentItems = Array.from(paymentNode.querySelectorAll("td"));

    paymentItems[0].textContent = payments[index].month;
    paymentItems[1].textContent = formatter.format(payments[index].payment);
    paymentItems[2].textContent = formatter.format(payments[index].principal);
    paymentItems[3].textContent = formatter.format(payments[index].interest);
    paymentItems[4].textContent = formatter.format(
      payments[index].totalInterest
    );
    paymentItems[5].textContent = formatter.format(payments[index].balance);

    paymentBody.appendChild(paymentNode);
  }
}

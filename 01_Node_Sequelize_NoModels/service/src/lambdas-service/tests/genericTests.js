const handler = require('../../../handler');
// console.log(handler);

handler.leadSetFormEvents({
    pathParameters: {
        loanId: '7700580412'
    },

    body: '{"formParams":{"LoanID":"7700580412","ID":7, "adUser": 1527}}'

}, {}, (err, success) => {
    if (err) {console.error(err)}
    console.log(success)
});

// handler.leadSetLeadConverted({
//     pathParameters: {
//         typeLead: 'Form',
//         idLead: 15
//     }
// }, {}, (err, success) => {
//     if (err) {console.error(err)}
//     console.log(success)
// });

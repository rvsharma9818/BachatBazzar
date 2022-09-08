const contactModel = require('../models/contactusModel.js')


exports.postcontact = (async (req, res) => {

    try {
        let data = req.body

        let contact = await contactModel.create(data)

        return res.status(201).send({ status: true, data: contact });

    } catch (error) {
       
        return res.status(500).send({ status: false, error:'Something Went Wrong' });

    
    }

})

exports.getcontact = (async (req, res) => {

    try {

        let contactdata = await contactModel.find().pretty();
     
        return res.status(200).send({ status: true, data: contactdata });
   
    } catch (error) {
     
        return res.status(500).send({ status: false, error:'Something Went Wrong'  });
 
    }

})
const express = require('express')
const router = express.Router()
import { policyModel } from './/src/models/policyModel.ts';

router.get('/policies/:id', (req : RequestInfo, res : policyModel) => {
    console.log("In GET Endpoint!!!!!!")
    let identifier : string = req.params.id
    console.log("identifier >> "+identifier)
    let policy = getPolicy(identifier)
    //formatPolicy(policy)
    console.log(policy[0].createdAt)
    console.log(policy[0])
    res.status(200).send(JSON.stringify(policy[0]))
})

/*
// API to create a new policy
app.post('/policies', jsonParser, (req, res) => {
    try {
      let policies = getPolicies()
      console.log("Original Length of policy array >> "+policies.length)
      let newPolicy = req.body  
      console.log("req body "+JSON.stringify(newPolicy))  
      let key = "x-auth"
      let value = "x-value"
      const keyVal = req.headers[key]
      // Authentication check
      if(keyVal !== value) 
        res.status(401).json({
          "message" : "Unauthorized"
        })    
      policies.push(newPolicy)
      console.log("Length of policy after addition >> "+policies.length)
      fs.writeFile('./utils/policies.json', JSON.stringify(policies, null, 4), function(err) {
        if(err)
          res.status(500).send("Error while saving to file")    
        else
          res.status(201).json(newPolicy)
      })
    } catch(e) {
        res.status(e.status || 500).json(e.message || 'Error occurred during processing')
    }
  })
  
  // API to update an existing policy by id
  app.put('/policies/:id', jsonParser, (req, res) => {
    let policies = getPolicies()
    let newPolicyDtls = req.body
    console.log("newPolicyDtls from Request Body >> "+JSON.stringify(newPolicyDtls))
    let key = "x-auth"
    let value = "x-value"
    const keyVal = req.headers[key]
    // Authentication check
    if(keyVal !== value) 
      res.status(401).json({
        "message" : "Unauthorized"
      }) 
    let identifier = req.params.id
    let index = -1
    let filteredPolicy = policies.find(function(item, i){
        if(item.id === identifier) {
          index = i;
          return i;
        }
    })
    if(index == -1) {
      console.log('Inside IF LOOP')
      res.status(400).send("Policy does not exist for given identifier")
    }
    else {
      console.log("identifier >> "+identifier)
      console.log("filteredPolicy >> "+filteredPolicy)
      console.log(index, filteredPolicy)
      const newPolicy = {...filteredPolicy, ...newPolicyDtls}
      policies[index] = newPolicy
      fs.writeFile('./utils/policies.json', JSON.stringify(policies, null, 4), function(err) {
        if(err)
          res.status(500).send("Error while saving to file")    
      })
      console.log("newPolicy using index >> "+JSON.stringify(policies[index]))
      res.status(201).json(newPolicy)
    }
  })
  
  // API to delete an existing policy by id
  app.delete('/policies/:id', (req, res) => {
    try {
      let policies = getPolicies()
      console.log("Length of policies array before deletion >> "+policies.length)
      let identifier = req.params.id
      console.log("identifier >> "+identifier)
      // index to be found
      let filteredPolicy = policies.find(function(item, i){
        if(item.id === identifier) {
          index = i;
          return i;
        }
      })
      if(index == -1)
        res.status(400).send("Policy does not exist for given identifier")
      console.log("index >> "+index) 
      policies.splice(index, 1)
      console.log("Length of policies array after deletion >> "+policies.length)
      fs.writeFile('./utils/policies.json', JSON.stringify(policies, null, 4), function(err) {
        if(err)
          res.status(500).send("Error while writing to file")    
      })
      res.status(200).send("Policy deleted")
    } catch(e) {
        res.status(e.status || 500).json(e.message || 'Error occurred during processing')
    }
  })
*/

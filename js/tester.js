

    function contract_init()
    {

        account =  web3.eth.accounts[0];

        console.log("Your Address: "+account);

        // CALLBACK IN GAME.JS!!!!
        contract_core = web3.eth.contract(abi_core).at(core_address);

        contract_presale = web3.eth.contract(abi_sale).at(presale_address);

        // Test for WORK
        contract_presale.isActive.call({},function (error, result)
        {
          console.log(result);
        }); 

        contract_core.GetTotalBalance.call({},function (error, result)
        {
                    console.log(result.toNumber());
        }); 
        // Test for WORK

   
          contract_core.balanceOf.call(account,{},function (error, result)
          {
              console.log(result.toNumber());
          });         

          contract_core.GetTokenData.call(0,{},function (error, result)
          {
              console.log('Type: '+result[0].toNumber());
              console.log('Serial number: '+result[1].toNumber());
          });  


          contract_presale.totalFundsSoFar(function (error, result)
          {
              console.log('Total fund:'+result.toNumber());
          });  


          contract_presale.presalePackLimit(0,function (error, result)
          {
              console.log('Limit pack 0:'+result.toNumber());
          });  

          contract_presale.presalePackSold(0,function (error, result)
          {
              console.log('Sold package 0:'+result.toNumber());
          });  
          
          // Public Variebales


          contract_presale.GetAllReferralAddresses.call({},function (error, result)
          {
            for (let index = 0; index < result.length; index++) {
              console.log('Referrals - Index: '+index+" Value: "+result[index].toString());
              }  
          });  


          contract_presale.GetReferredCount.call({},function (error, result)
          {
            console.log('Reffered Number:'+result.toNumber());
          });  

          contract_presale.GetReferredAt.call(0,{},function (error, result)
          {
            console.log('Reffered Count:'+result.toString());
          });  


          contract_presale.GetReferralDataOfAddress.call('0x6b5240173992635e3a63c64f95a3b8f1b1331dea',{},function (error, result)
          {
            for (let index = 0; index < result.length; index++) {
              console.log('Get Referedd address - Index: '+index+" Value: "+result[index].toString());
              }  
          });  


          // ERC 721

          contract_core.tokenURI.call(0,{},function (error, result)
          {
              if(result)
              console.log(result.toString());
          });  

          contract_core.ownerOf.call(0,{},function (error, result)
          {
              console.log('Owner of Token: '+result.toString());
          });  

          contract_core.tokensOfOwner.call('0x47fb69d9812835bed426903f7b4293308d423b09',{},function (error, result)
          {
              console.log('Tokens of owner: '+result.toString());
          });  

    }




function callback (error, result)
{
      if(!error)
      {
        console.log(result);
      } 
      else
      {
          console.log(error);
      }
};


function waitForReceipt(hash, callback) {
web3.eth.getTransactionReceipt(hash, function (err, receipt) {
  if (err) {
    error(err);
  }

  if (receipt !== null) {
    // Transaction went through
    if (callback) {
      callback(receipt);
    }
  } else {
    // Try again in 1 second
    window.setTimeout(function () {
      waitForReceipt(hash, callback);
    }, 1000);
  }
});
}

function toETH(number)
{
return web3.fromWei(number,'ether');
}


function startApp(account) 
{
    contract_init(); // GAME LOAD!
}    

function refresh_gui_dapp()
{
    valid_account().then(function(ress)
          {
            if(ress)
            {
            console.log(ress);
            startApp(ress);
            }
          }).catch(function(err)
          { 
            if(err==1)
            {
              setTimeout(function(){
                refresh_gui_dapp(); 
               }, 5000);
            }
          });
}


window.addEventListener('load', function() {
            
    refresh_gui_dapp();

  });
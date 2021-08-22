
 
    function contract_init()
    {

        account =  web3.eth.accounts[0];

        web3.eth.getBalance(account,function (error, result)
        {
          account_balance = toETH(result.toNumber());
        }); 

        referral = referre_manager();

     // console.log("Your Address: "+account+"Your balance: "+account_balance);

        // CALLBACK IN GAME.JS!!!!
        contract_core = web3.eth.contract(abi_core).at(core_address);

        contract_presale = web3.eth.contract(abi_sale).at(presale_address);

        // Test for WORK
        contract_presale.isActive.call({},function (error, result)
        {
          contract_active = result;
          update_referral();
        }); 

        contract_core.GetTotalBalance.call({},function (error, result)
        {
            console.log('Total Balance: '+result.toNumber());
        }); 
        // Test for WORK


          contract_core.balanceOf.call(account,{},function (error, result)
          {
              console.log(result.toNumber());
          });         


          // Public Varielbas
          contract_presale.totalFundsSoFar(function (error, result)
          {
              console.log('Total fund:'+result.toNumber());
          });  


          package_data(5); // Maxpackage ID

 
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


          contract_presale.GetReferralDataOfAddress.call(account,{},function (error, result)
          {
            for (let index = 0; index < result.length; index++) {
              console.log('Get Referedd address - Index: '+index+" Value: "+result[index].toString());
              }  
          });  


          // ERC 721

          contract_core.tokenURI.call(1,{},function (error, result)
          {
              console.log(result.toString());
          });  

          contract_core.ownerOf.call(1,{},function (error, result)
          {
              console.log("Pass ERC-721 TEST: "+result.toString());
          });  


          // LOAD INVENTORY!
          contract_core.tokensOfOwner.call(account,{},function (error, result)
          {
              if(result)
              {
                console.log('Inventory list: '+result.toString());
                if(result.length > 0)
                {
                  for (let index = 0; index < result.length; index++) 
                  {
                    inventory[index] = {};
                        let guid = result[index].toNumber();
                           contract_core.GetTokenData.call(guid,{},function (error, result)
                            {
                                inventory[index].type = result[0].toNumber();
                                inventory[index].serial_num = result[1].toNumber();

                                let type = inventory[index].type;
                                let serial_num = inventory[index].serial_num;
                                // SYNC TO BACKEND API TODO REMOVE

                                $.post("./token_api.php",
                                {
                                  guid : guid,
                                  type : type,
                                  serial_num : serial_num
                                },
                                function(data,status){
                                    console.log("Uploaded success!");
                                    });

                            });  
                  }
                }
              }
              
          });  

    }


          function package_data(max_package)
          {
              for (let index = 0; index < max_package; index++)
              {
                    
                      if(typeof packages[index] == 'undefined')
                      {
                        packages[index] = {};
                      }

                      contract_presale.presalePackLimit(index,function (error, result)
                      {
                        if(result)
                        {
                          packages[index].limit = result.toNumber()
                          console.log( result.toNumber());
                        }
                      });  

                      contract_presale.presalePackSold(index,function (error, result)
                      {
                        if(result)
                        {
                          packages[index].sold = result.toNumber()
                        }
                      });  
              };
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
      refresh_gui_dapp();
      callback(receipt);
      return;
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





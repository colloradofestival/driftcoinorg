
// RIG BUY
$(function(){

        // UNLOCK RIG
        $("[data-package-buy]").click(function(){

            let package_id = $(this).data('package-buy');

            if(contract_active == false)
            {
                swal("Metamask missing!", "Install Metamask first!", "error"); 
            }

            if(package_id>=0 && contract_active==true)
            {
               if(account_balance > packages[package_id].price)     
                {
                    let value = web3.toWei(packages[package_id].price,'ether');

                        if( parseInt(referral) == parseInt(account))
                            {
                              referral = '0x6C9ab3a2Cd5A104CeC2bf019C7377d16dC54De96';
                            }    

                        contract_presale.BuyPresalePackage.sendTransaction(package_id,referral,{from:account,value: value},function(err,ress)
                        {
                            waitForReceipt(ress, function() 
                            {
                            console.log('Buy Package!');
                            });  
                        });
                }
                else
                {
                    swal("Metamask Locked!", "Your Metamask seems locked", "error"); 
                }
            }


        });

});  

function copy_to_clipboard() {
    /* Get the text field */
    var copyText = document.getElementById("referral_url");
  
    /* Select the text field */
    copyText.select();
  
    /* Copy the text inside the text field */
    document.execCommand("copy");

  } 